/**
 * 产品数据 —— 严格对齐《Qiantong Global - Product Catalogue 2026》Edition 01
 * 只收录目录内的 35 个 SKU（均为 CE MDR 2017/745 认证产品）。
 * 产品名称保持英文标准品名（与目录、报价、PI 一致，买家按英文名搜索）；
 * 品类名称与描述走 i18n，随语言切换。
 */

export interface Sku {
  code: string;
  name: string;
}

export interface Category {
  id: string;
  no: string;
  /** i18n key：品类名 */
  titleKey: string;
  /** i18n key：品类描述 */
  descKey: string;
  count: number;
  skus: Sku[];
  /** 品类配图（public/products/*.webp，透明底、长边 900px） */
  image?: string;
}

export const categories: Category[] = [
  {
    id: "anesthesia",
    image: "/products/01-anesthesia.webp",
    no: "01",
    titleKey: "focus_1",
    descKey: "catd_1",
    count: 15,
    skus: [
      { code: "QG-AN-001", name: "Reinforced Endotracheal Tube" },
      { code: "QG-AN-002", name: "Double Lumen Endobronchial Tube" },
      { code: "QG-AN-003", name: "Tracheostomy Tube" },
      { code: "QG-AN-004", name: "Laryngeal Mask Airway (LMA)" },
      { code: "QG-AN-005", name: "Endotracheal Tube" },
      { code: "QG-AN-006", name: "Guedel Airway" },
      { code: "QG-AN-007", name: "Anesthesia Mask" },
      { code: "QG-AN-008", name: "Anesthesia Kit" },
      { code: "QG-AN-009", name: "Anesthesia Needle" },
      { code: "QG-AN-010", name: "Epidural Catheter" },
      { code: "QG-AN-011", name: "LOR Syringe" },
      { code: "QG-AN-012", name: "Breathing Circuit" },
      { code: "QG-AN-013", name: "Heat and Moisture Exchanger (HME)" },
      { code: "QG-AN-014", name: "Manual Resuscitator" },
      { code: "QG-AN-015", name: "Closed Suction Catheter" },
    ],
  },
  {
    id: "urology",
    image: "/products/02-urology.webp",
    no: "02",
    titleKey: "focus_2",
    descKey: "catd_2",
    count: 5,
    skus: [
      { code: "QG-UR-001", name: "Precision Urine Meter" },
      { code: "QG-UR-002", name: "Foley Catheter Kit" },
      { code: "QG-UR-003", name: "Disposable Urine Bag" },
      { code: "QG-UR-004", name: "Colostomy Bag" },
      { code: "QG-UR-006", name: "Disposable Underpads" },
    ],
  },
  {
    id: "surgical",
    image: "/products/03-surgical.webp",
    no: "03",
    titleKey: "focus_3",
    descKey: "catd_3",
    count: 6,
    skus: [
      { code: "QG-SU-001", name: "Disposable Surgical Gown" },
      { code: "QG-SU-002", name: "Disposable Surgical Kit" },
      { code: "QG-SU-003", name: "Suction Handle" },
      { code: "QG-SU-004", name: "Connecting Tube" },
      { code: "QG-SU-005", name: "Central Venous Catheter Kit" },
      { code: "QG-SU-006", name: "Disposable Pressure Transducer (IBP)" },
    ],
  },
  {
    id: "respiratory",
    image: "/products/04-respiratory.webp",
    no: "04",
    titleKey: "focus_4",
    descKey: "catd_4",
    count: 5,
    skus: [
      { code: "QG-RP-001", name: "Medical Face Mask" },
      { code: "QG-RP-002", name: "Nitrile Examination Gloves" },
      { code: "QG-RP-003", name: "Nasal Oxygen Tube" },
      { code: "QG-RP-004", name: "Oxygen Mask" },
      { code: "QG-RP-005", name: "Suction Catheter" },
    ],
  },
  {
    id: "radiotherapy",
    image: "/products/05-radiotherapy.webp",
    no: "05",
    titleKey: "focus_5",
    descKey: "catd_5",
    count: 4,
    skus: [
      { code: "QG-RT-001", name: "Thermoplastic Radiotherapy Mask" },
      { code: "QG-RT-002", name: "Elastomeric Infusion Pump" },
      { code: "QG-RT-003", name: "Enteral Feeding Set" },
      { code: "QG-RT-004", name: "I.V. Cannula" },
    ],
  },
];

/** 不在 CE 目录内、按单确认认证的外部货源（不与上面 35 个 SKU 混排） */
export const additionalSourcing: string[] = [
  "Surgical drapes",
  "Protective suits",
  "Shoe covers and caps",
  "FFP2 masks",
  "Latex and surgical gloves",
  "Laboratory consumables",
];

export const totalSku = categories.reduce((n, c) => n + c.skus.length, 0);
