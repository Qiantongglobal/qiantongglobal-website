import { useState } from "react";
import { submitInquiry } from "@/lib/inquiry";
import { useLanguage } from "@/components/LanguageSwitcher";

/**
 * Market self-check — sits at the foot of the overview note only.
 *
 * It is not a contact form clone: the buyer ticks the markets they ship into
 * and picks a product family, and the submission arrives in the CRM already
 * structured ("Market self-check — markets: …; product: …"), so the reply can
 * be a document list instead of a sales call. Labels follow the language the
 * note is being read in (en/de/fr); every other UI language falls back to
 * English, which matches the note itself.
 */

type LabelKey =
  | "eyebrow" | "title" | "intro" | "markets" | "product" | "productPh"
  | "name" | "email" | "company" | "consentExtra" | "submit" | "sending"
  | "success" | "error" | "pickMarket" | "pickProduct";

const L: Record<"en" | "de" | "fr", Record<LabelKey, string>> = {
  en: {
    eyebrow: "Market self-check",
    title: "Tell us where you sell — we map the file",
    intro:
      "Tick the markets you ship into and pick a product family. The reply is a document list: what the factory already holds, and what someone in your market has to request or register.",
    markets: "Target markets *",
    product: "Product family *",
    productPh: "Select a product family…",
    name: "Your name *",
    email: "Work email *",
    company: "Company",
    consentExtra: "",
    submit: "Send my check",
    sending: "Sending…",
    success:
      "Thank you — the check is on its way. We reply within one working day with the document list.",
    error:
      "Something went wrong. Please write to Jasonli@qiantongglobal.com directly and we will pick it up from there.",
    pickMarket: "Please tick at least one market.",
    pickProduct: "Please select a product family.",
  },
  de: {
    eyebrow: "Markt-Check",
    title: "Sagen Sie uns, wohin Sie liefern — wir ordnen die Akte",
    intro:
      "Markieren Sie die Märkte, in die Sie liefern, und wählen Sie eine Produktfamilie. Die Antwort ist eine Dokumentenliste: was das Werk bereits hält und was in Ihrem Markt jemand beantragen oder registrieren muss.",
    markets: "Zielmärkte *",
    product: "Produktfamilie *",
    productPh: "Produktfamilie wählen…",
    name: "Ihr Name *",
    email: "Geschäftliche E-Mail *",
    company: "Unternehmen",
    consentExtra: "",
    submit: "Check senden",
    sending: "Wird gesendet…",
    success:
      "Vielen Dank — der Check ist unterwegs. Wir antworten innerhalb eines Arbeitstages mit der Dokumentenliste.",
    error:
      "Etwas ist schiefgelaufen. Bitte schreiben Sie direkt an Jasonli@qiantongglobal.com, wir nehmen es von dort auf.",
    pickMarket: "Bitte mindestens einen Markt markieren.",
    pickProduct: "Bitte eine Produktfamilie wählen.",
  },
  fr: {
    eyebrow: "Vérification marché",
    title: "Dites-nous où vous vendez — nous établissons le dossier",
    intro:
      "Cochez les marchés vers lesquels vous expédiez et choisissez une famille de produits. La réponse est une liste de documents : ce que l'usine détient déjà, et ce que quelqu'un dans votre marché doit demander ou enregistrer.",
    markets: "Marchés cibles *",
    product: "Famille de produits *",
    productPh: "Choisir une famille de produits…",
    name: "Votre nom *",
    email: "E-mail professionnel *",
    company: "Société",
    consentExtra: "",
    submit: "Envoyer ma vérification",
    sending: "Envoi en cours…",
    success:
      "Merci — la vérification est en route. Nous répondons sous un jour ouvré avec la liste des documents.",
    error:
      "Une erreur est survenue. Écrivez directement à Jasonli@qiantongglobal.com et nous prendrons le relais.",
    pickMarket: "Veuillez cocher au moins un marché.",
    pickProduct: "Veuillez choisir une famille de produits.",
  },
};

const MARKETS: Record<"en" | "de" | "fr", { id: string; label: string }[]> = {
  en: [
    { id: "EU/EEA", label: "European Union / EEA" },
    { id: "CH", label: "Switzerland" },
    { id: "GB", label: "Great Britain (England, Scotland, Wales)" },
    { id: "NI", label: "Northern Ireland" },
    { id: "OTHER", label: "Other market" },
  ],
  de: [
    { id: "EU/EEA", label: "Europäische Union / EWR" },
    { id: "CH", label: "Schweiz" },
    { id: "GB", label: "Grossbritannien (England, Schottland, Wales)" },
    { id: "NI", label: "Nordirland" },
    { id: "OTHER", label: "Anderer Markt" },
  ],
  fr: [
    { id: "EU/EEA", label: "Union européenne / AEE" },
    { id: "CH", label: "Suisse" },
    { id: "GB", label: "Grande-Bretagne (Angleterre, Écosse, pays de Galles)" },
    { id: "NI", label: "Irlande du Nord" },
    { id: "OTHER", label: "Autre marché" },
  ],
};

/** The five catalogue families, verbatim from Product Catalogue 2026. */
const FAMILIES: Record<"en" | "de" | "fr", { id: string; label: string }[]> = {
  en: [
    { id: "Anesthesia & Airway", label: "Anesthesia & Airway" },
    { id: "Urology", label: "Urology" },
    { id: "Surgical & OR", label: "Surgical & OR" },
    { id: "Respiratory & Protective", label: "Respiratory & Protective" },
    { id: "Radiotherapy & Infusion", label: "Radiotherapy & Infusion" },
  ],
  de: [
    { id: "Anesthesia & Airway", label: "Anästhesie & Atemwege" },
    { id: "Urology", label: "Urologie" },
    { id: "Surgical & OR", label: "Chirurgie & OP" },
    { id: "Respiratory & Protective", label: "Atmung & Schutz" },
    { id: "Radiotherapy & Infusion", label: "Strahlentherapie & Infusion" },
  ],
  fr: [
    { id: "Anesthesia & Airway", label: "Anesthésie & voies aériennes" },
    { id: "Urology", label: "Urologie" },
    { id: "Surgical & OR", label: "Chirurgie & bloc opératoire" },
    { id: "Respiratory & Protective", label: "Respiratoire & protection" },
    { id: "Radiotherapy & Infusion", label: "Radiothérapie & perfusion" },
  ],
};

export default function SelfCheckForm({
  noteLang,
}: {
  noteLang: "en" | "de" | "fr" | "it";
}) {
  const { t, lang } = useLanguage();
  // Labels follow the language the note is read in; the consent line reuses
  // the site-wide, fully translated privacy string.
  const k = noteLang === "de" ? "de" : noteLang === "fr" ? "fr" : "en";
  const text = L[k];
  const markets = MARKETS[k];
  const families = FAMILIES[k];

  const [picked, setPicked] = useState<string[]>([]);
  const [family, setFamily] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [hint, setHint] = useState("");

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (picked.length === 0) return setHint(text.pickMarket);
    if (!family) return setHint(text.pickProduct);
    setHint("");
    setStatus("sending");

    const marketLabels = picked
      .map((id) => markets.find((m) => m.id === id)?.label || id)
      .join(", ");
    const familyLabel = families.find((f) => f.id === family)?.label || family;

    const result = await submitInquiry({
      name,
      email,
      company,
      message: `Market self-check — target markets: ${marketLabels}. Product family: ${familyLabel}.`,
      product_label: `Market self-check · ${familyLabel}`,
      lang,
      page: "/resources/market-access-at-a-glance",
      privacy_consent: consent ? "true" : "",
      _gotcha: "",
    });
    setStatus(result.ok ? "ok" : "error");
  }

  const field =
    "w-full rounded-none border border-[#DCE5E1] bg-white px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-[#9DB0AA] focus:border-[#0A5B51] focus:outline-none focus:ring-1 focus:ring-[#0A5B51]/30 transition-colors";
  const label = "meta-label block";

  return (
    <section className="mt-14 border border-[#DCE5E1] bg-[#F7FAF9] px-6 py-8 md:px-10 md:py-10">
      <p className="meta-label">{text.eyebrow}</p>
      <h2 className="mt-3 font-display text-[1.35rem] md:text-[1.55rem] leading-[1.3] tracking-[-0.01em] text-foreground [text-wrap:balance]">
        {text.title}
      </h2>
      <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.7] text-muted-foreground">
        {text.intro}
      </p>

      {status === "ok" ? (
        <p className="mt-7 border-l-2 border-[#0A5B51] bg-white px-5 py-4 text-[14.5px] leading-[1.7] text-foreground">
          {text.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-7 space-y-6" noValidate>
          {/* Honeypot: hidden from humans, catnip for bots. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <fieldset>
            <legend className={label}>{text.markets}</legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {markets.map((m) => (
                <label
                  key={m.id}
                  className="flex cursor-pointer items-start gap-3 border border-[#DCE5E1] bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-foreground hover:border-[#B9CFC9] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={picked.includes(m.id)}
                    onChange={() => toggle(m.id)}
                    className="mt-0.5 accent-[#0A5B51]"
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="sc-family" className={label}>
                {text.product}
              </label>
              <select
                id="sc-family"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className={`mt-2 ${field}`}
              >
                <option value="">{text.productPh}</option>
                {families.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sc-company" className={label}>
                {text.company}
              </label>
              <input
                id="sc-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`mt-2 ${field}`}
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="sc-name" className={label}>
                {text.name}
              </label>
              <input
                id="sc-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-2 ${field}`}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="sc-email" className={label}>
                {text.email}
              </label>
              <input
                id="sc-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-2 ${field}`}
                autoComplete="email"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-[1.6] text-muted-foreground">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-[#0A5B51]"
            />
            <span>
              {t("form_privacy_consent")}{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
                {t("form_privacy_policy_link")}
              </a>
              .
            </span>
          </label>

          {hint && <p className="text-[13px] text-[#8F6519]">{hint}</p>}
          {status === "error" && <p className="text-[13px] text-red-700">{text.error}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? text.sending : text.submit}
          </button>
        </form>
      )}
    </section>
  );
}
