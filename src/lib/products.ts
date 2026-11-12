/**
 * 产品数据 —— 严格对齐《Qiantong Global - Product Catalogue 2026》Edition 01
 * 只收录目录内的 35 个 SKU（均为 CE MDR 2017/745 认证产品）。
 *
 * 产品名称保持英文标准品名（与目录、报价、PI 一致，买家按英文名搜索）；
 * application 只描述用途与使用场景，属行业常识层面。
 * 尺寸、材质、灭菌方式、包装等参数一律不写死 —— 由报价环节按规格确认，
 * 避免站点出现与工厂实际能力不符的数字。
 *
 * 品类名称与界面文案走 i18n，随语言切换。
 */

export interface Sku {
  code: string;
  name: string;
  /** URL slug，由英文品名生成，一经发布不要改动（已索引的地址） */
  slug: string;
  /** 用途与场景，英文两句话以内 */
  application: string;
}

export interface Category {
  id: string;
  no: string;
  /** i18n key：品类名 */
  titleKey: string;
  /** i18n key：品类描述 */
  descKey: string;
  /** 品类英文名，用于产品页标题与面包屑 */
  name: string;
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
    name: "Anesthesia & Airway",
    titleKey: "focus_1",
    descKey: "catd_1",
    count: 15,
    skus: [
      {
        code: "QG-AN-001",
        name: "Reinforced Endotracheal Tube",
        slug: "reinforced-endotracheal-tube",
        application:
          "Wire-reinforced airway for cases where the tube must resist kinking, such as head and neck surgery or prone positioning in intensive care.",
      },
      {
        code: "QG-AN-002",
        name: "Double Lumen Endobronchial Tube",
        slug: "double-lumen-endobronchial-tube",
        application:
          "Allows independent ventilation of each lung during thoracic surgery, with separate lumens for left or right bronchial placement.",
      },
      {
        code: "QG-AN-003",
        name: "Tracheostomy Tube",
        slug: "tracheostomy-tube",
        application:
          "Maintains a stable airway through the anterior neck for patients who need prolonged ventilation or bypass of an upper airway obstruction.",
      },
      {
        code: "QG-AN-004",
        name: "Laryngeal Mask Airway (LMA)",
        slug: "laryngeal-mask-airway",
        application:
          "Supraglottic airway for short procedures and emergency resuscitation, placed without direct visualisation of the vocal cords.",
      },
      {
        code: "QG-AN-005",
        name: "Endotracheal Tube",
        slug: "endotracheal-tube",
        application:
          "Standard cuffed airway for general anaesthesia and mechanical ventilation in theatre and intensive care.",
      },
      {
        code: "QG-AN-006",
        name: "Guedel Airway",
        slug: "guedel-airway",
        application:
          "Oropharyngeal airway that keeps the tongue clear of the airway in unconscious patients during induction and recovery.",
      },
      {
        code: "QG-AN-007",
        name: "Anesthesia Mask",
        slug: "anesthesia-mask",
        application:
          "Face mask for pre-oxygenation and inhalational induction, connecting to the breathing circuit through a standard port.",
      },
      {
        code: "QG-AN-008",
        name: "Anesthesia Kit",
        slug: "anesthesia-kit",
        application:
          "Single-use kit that groups the consumables for a spinal, epidural or general anaesthetic into one sterile pack.",
      },
      {
        code: "QG-AN-009",
        name: "Anesthesia Needle",
        slug: "anesthesia-needle",
        application:
          "Spinal and epidural needles for regional anaesthesia, supplied in the gauge and tip design requested for each procedure.",
      },
      {
        code: "QG-AN-010",
        name: "Epidural Catheter",
        slug: "epidural-catheter",
        application:
          "Threaded through an epidural needle to deliver continuous analgesia for labour, post-operative pain and thoracic procedures.",
      },
      {
        code: "QG-AN-011",
        name: "LOR Syringe",
        slug: "lor-syringe",
        application:
          "Loss-of-resistance syringe used to identify the epidural space while the catheter is being placed.",
      },
      {
        code: "QG-AN-012",
        name: "Breathing Circuit",
        slug: "breathing-circuit",
        application:
          "Connects the anaesthesia machine or ventilator to the patient, in adult and paediatric configurations.",
      },
      {
        code: "QG-AN-013",
        name: "Heat and Moisture Exchanger (HME)",
        slug: "heat-and-moisture-exchanger",
        application:
          "Preserves airway humidity and filters exhaled gas where the breathing circuit is in use.",
      },
      {
        code: "QG-AN-014",
        name: "Manual Resuscitator",
        slug: "manual-resuscitator",
        application:
          "Self-inflating bag for ventilation when a ventilator is not available, used in resuscitation and patient transport.",
      },
      {
        code: "QG-AN-015",
        name: "Closed Suction Catheter",
        slug: "closed-suction-catheter",
        application:
          "Allows tracheal suctioning without breaking the circuit, reducing cross-infection risk in ventilated patients.",
      },
    ],
  },
  {
    id: "urology",
    image: "/products/02-urology.webp",
    no: "02",
    name: "Urology & Incontinence",
    titleKey: "focus_2",
    descKey: "catd_2",
    count: 5,
    skus: [
      {
        code: "QG-UR-001",
        name: "Precision Urine Meter",
        slug: "precision-urine-meter",
        application:
          "Hourly urine output measurement for critical care and post-operative monitoring, mounted at the bedside.",
      },
      {
        code: "QG-UR-002",
        name: "Foley Catheter Kit",
        slug: "foley-catheter-kit",
        application:
          "Sterile kit for urinary catheterisation, grouping the catheter, drainage bag and procedure consumables.",
      },
      {
        code: "QG-UR-003",
        name: "Disposable Urine Bag",
        slug: "disposable-urine-bag",
        application:
          "Collection bag for ward and home care, with a drain tap for emptying without disconnecting the catheter.",
      },
      {
        code: "QG-UR-004",
        name: "Colostomy Bag",
        slug: "colostomy-bag",
        application:
          "Ostomy pouch for post-operative and long-term stoma management, in drainable and closed formats.",
      },
      {
        code: "QG-UR-006",
        name: "Disposable Underpads",
        slug: "disposable-underpads",
        application:
          "Absorbent pads for incontinence care and as a protective layer on beds, trolleys and examination couches.",
      },
    ],
  },
  {
    id: "surgical",
    image: "/products/03-surgical.webp",
    no: "03",
    name: "Surgical & Operating Room",
    titleKey: "focus_3",
    descKey: "catd_3",
    count: 6,
    skus: [
      {
        code: "QG-SU-001",
        name: "Disposable Surgical Gown",
        slug: "disposable-surgical-gown",
        application:
          "Sterile gown for the operating team, in reinforced and standard versions for different levels of fluid exposure.",
      },
      {
        code: "QG-SU-002",
        name: "Disposable Surgical Kit",
        slug: "disposable-surgical-kit",
        application:
          "Procedure pack that combines gown, drapes and the consumables for one operation in a single sterile sequence.",
      },
      {
        code: "QG-SU-003",
        name: "Suction Handle",
        slug: "suction-handle",
        application:
          "Handle for intra-operative suction, connecting to the theatre suction tubing and a selection of tips.",
      },
      {
        code: "QG-SU-004",
        name: "Connecting Tube",
        slug: "connecting-tube",
        application:
          "Flexible tubing for connecting suction, irrigation or gas lines inside the sterile field.",
      },
      {
        code: "QG-SU-005",
        name: "Central Venous Catheter Kit",
        slug: "central-venous-catheter-kit",
        application:
          "Kit for central venous access, including the catheter, guidewire, dilator and placement consumables.",
      },
      {
        code: "QG-SU-006",
        name: "Disposable Pressure Transducer (IBP)",
        slug: "disposable-pressure-transducer",
        application:
          "Single-use transducer for continuous arterial or venous pressure monitoring in theatre and intensive care.",
      },
    ],
  },
  {
    id: "respiratory",
    image: "/products/04-respiratory.webp",
    no: "04",
    name: "Respiratory & Protective",
    titleKey: "focus_4",
    descKey: "catd_4",
    count: 5,
    skus: [
      {
        code: "QG-RP-001",
        name: "Medical Face Mask",
        slug: "medical-face-mask",
        application:
          "Three-layer face mask for routine clinical use, supplied in boxed and bulk packing.",
      },
      {
        code: "QG-RP-002",
        name: "Nitrile Examination Gloves",
        slug: "nitrile-examination-gloves",
        application:
          "Powder-free nitrile gloves for examination and procedure use, in a full range of sizes.",
      },
      {
        code: "QG-RP-003",
        name: "Nasal Oxygen Tube",
        slug: "nasal-oxygen-tube",
        application:
          "Nasal cannula for low-flow oxygen therapy on the ward and in outpatient settings.",
      },
      {
        code: "QG-RP-004",
        name: "Oxygen Mask",
        slug: "oxygen-mask",
        application:
          "Simple and reservoir oxygen mask for higher-flow therapy and emergency use.",
      },
      {
        code: "QG-RP-005",
        name: "Suction Catheter",
        slug: "suction-catheter",
        application:
          "Single-use catheter for clearing secretions from the airway, with a thumb control vent.",
      },
    ],
  },
  {
    id: "radiotherapy",
    image: "/products/05-radiotherapy.webp",
    no: "05",
    name: "Radiotherapy & Infusion",
    titleKey: "focus_5",
    descKey: "catd_5",
    count: 4,
    skus: [
      {
        code: "QG-RT-001",
        name: "Thermoplastic Radiotherapy Mask",
        slug: "thermoplastic-radiotherapy-mask",
        application:
          "Moulded immobilisation mask used in radiotherapy planning and treatment to keep the patient in a reproducible position.",
      },
      {
        code: "QG-RT-002",
        name: "Elastomeric Infusion Pump",
        slug: "elastomeric-infusion-pump",
        application:
          "Mechanical pump that delivers a fixed-rate infusion without power, used for continuous analgesia and chemotherapy outside hospital.",
      },
      {
        code: "QG-RT-003",
        name: "Enteral Feeding Set",
        slug: "enteral-feeding-set",
        application:
          "Giving set for enteral nutrition, connecting the feed container to a nasogastric or gastrostomy tube.",
      },
      {
        code: "QG-RT-004",
        name: "I.V. Cannula",
        slug: "iv-cannula",
        application:
          "Peripheral venous cannula for short-term vascular access, with injection port and wing fixation.",
      },
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

/** 扁平化的全部 SKU，带所属品类，用于总览页与 sitemap */
export const allSkus = categories.flatMap((category) =>
  category.skus.map((sku) => ({ sku, category })),
);

export function findCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function findSku(categoryId: string, slug: string) {
  const category = findCategory(categoryId);
  if (!category) return undefined;
  const sku = category.skus.find((s) => s.slug === slug);
  if (!sku) return undefined;
  return { sku, category };
}

/** 同品类其他产品，最多 3 个，用于详情页底部内链 */
export function relatedSkus(category: Category, excludeCode: string, limit = 3): Sku[] {
  return category.skus.filter((s) => s.code !== excludeCode).slice(0, limit);
}

export function skuPath(category: Category, sku: Sku): string {
  return `/products/${category.id}/${sku.slug}`;
}
