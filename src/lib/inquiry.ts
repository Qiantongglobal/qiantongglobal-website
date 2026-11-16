/**
 * 询盘提交通道
 * ------------------------------------------------------------
 * 主通道：CRM 公开接口（crm.qiantongglobal.com/api/site/inquiry）
 *   —— 直接写进 CRM 询盘表，立刻出现在「询盘」模块，并推微信/邮件提醒
 * 备用通道：Formspree（原有通道，保留）
 *   —— CRM 域名不可用（部署中、网络故障、Cloudflare 抽风）时兜底，
 *      至少保证线索进邮箱，不会静默丢失
 *
 * 两条通道都失败才向用户报错。
 */

export const CRM_INQUIRY_ENDPOINT =
  "https://crm.qiantongglobal.com/api/site/inquiry";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgqbjqk";

export type InquiryPayload = Record<string, string>;

export type InquiryResult = {
  ok: boolean;
  via: "crm" | "formspree" | null;
  error?: string;
};

function withTimeout(ms: number): { signal: AbortSignal; done: () => void } {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, done: () => clearTimeout(timer) };
}

async function postJson(url: string, payload: InquiryPayload, timeoutMs: number) {
  const t = withTimeout(timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: t.signal,
    });
    const data = await res.json().catch(() => null);
    return { ok: res.ok, data };
  } finally {
    t.done();
  }
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  // ① CRM
  try {
    const { ok, data } = await postJson(CRM_INQUIRY_ENDPOINT, payload, 12000);
    if (ok && data?.success) return { ok: true, via: "crm" };
  } catch {
    /* 落到 Formspree */
  }

  // ② Formspree 兜底（去掉 CRM 专用字段，避免污染表单记录）
  const { _gotcha, lang, page, product_label, product_code, privacy_consent, ...rest } = payload;
  try {
    const { ok, data } = await postJson(
      FORMSPREE_ENDPOINT,
      { ...rest, _replyto: payload.email, source_page: page || "", lang: lang || "" },
      12000
    );
    if (ok) return { ok: true, via: "formspree" };
    return { ok: false, via: null, error: (data as any)?.error || "" };
  } catch {
    return { ok: false, via: null, error: "" };
  }
}
