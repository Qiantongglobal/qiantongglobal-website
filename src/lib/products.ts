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
  /**
   * 中文品名。中文界面显示这一项，英文界面仍用 name。
   * 口径优先取工厂《CE认证产品资源》清单的中文列（客户拿证书核对时不会歧义），
   * 清单未收录的 4 项按国内医械通用名补齐。
   * 英文名仍是报价、PI、单证的唯一依据，两者不要互相翻译回写。
   */
  nameZh: string;
  /** URL slug，由英文品名生成，一经发布不要改动（已索引的地址） */
  slug: string;
  /**
   * 单品产品图（public/products/sku/*.webp）。
   * 只挂经老板逐张确认可用的真实产品图：不用 AI 生成图、不用品类配图冒充
   * 单品，医疗器械不能图不对货。
   * 2026-11-19 老板提供 6 张 1920x1920 抠好的白底实拍（AN-001 / RP-004 /
   * SU-002 / UR-002 / UR-003 / UR-006）：其中 AN-001、UR-003 替换目录里的
   * 低分辨率旧图，其余 4 张补齐此前回落到编号卡的 SKU。这批保留白底，
   * 图卡底色同步改纯白；不转透明底，避免白色/透明器械被抠穿或留下白方块。
   * 其余 6 张透明底实拍来源：
   *  1) 《Qiantong Global - Product Catalogue 2026》第 4 页的 3 张（按该页
   *     印刷的 SKU 编号一一对应）；
   *  2) 《Product Catalogue (Updated Ver.)-260121》（驼人）P12 / P16 / P19 的
   *     3 张，用户确认 SKU 对应关系后裁切。TUORen logo 位于每页右上角，属
   *     页面级元素，产品照片框与之不重叠，边缘 flood-fill 抠成透明底。
   * 没有合格实拍的 SKU 一律留空，详情页回落到编号展示。
   */
  image?: string;
  /** 源图像素尺寸，写进 <img width/height>，避免加载时布局跳动 */
  imageW?: number;
  imageH?: number;
  /** 用途与场景，英文两句话以内 */
  application: string;
  /**
   * 用途与场景的中文版。与英文严格等价，不添加原文没有的尺寸、材质、期限。
   * 报价、PI、单证仍以英文 application 为准。
   */
  applicationZh: string;
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
  /**
   * 渲染缩放，用来拉平五张图的「视觉体量」。
   * 原图取景逻辑不同（单品特写 / 竖立袋体 / 散落套装 / 盘绕管路 / 细长输液器），
   * 各自的非透明像素填充率落在 17%~53%，直接丢进同一个框里，最满的一张
   * 视觉面积是最空的一张的 1.9 倍。系数按「实体包围盒面积」反推：
   * 缩最满的、放最空的，把极差压到 1.5 倍以内。超过 1.07 会被容器裁掉。
   */
  imageScale?: number;
  /** 源图像素尺寸，写进 <img width/height> 让浏览器加载前就能推断布局 */
  imageW: number;
  imageH: number;
}

/**
 * 品名的其他语言翻译（zh 在 Sku.nameZh 上，en 用 Sku.name，均不在此表）。
 * 口径：各国药典/行业通用的标准器械名词，短名词优先，避免长定语。
 * 缺失的语种或条目一律回落到英文标准品名（买家按英文名询价，不会出现空字符串）。
 * 这些译名建议由母语经销商抽查一遍后再大范围投放。
 */
/**
 * 品名的其他语言翻译（zh 在 Sku.nameZh 上，en 用 Sku.name，均不在此表）。
 * 口径：各国药典/行业通用的标准器械名词，短名词优先，避免长定语。
 * 缺失的语种或条目一律回落到英文标准品名（买家按英文名询价，不会出现空字符串）。
 * 变音符号必须写全（ä é í ú ç ã ê 等）——剥掉重音在母语客户眼里就是错字。
 * 这些译名建议由母语经销商抽查一遍后再大范围投放。
 */
export const skuNamesByLang: Record<string, Record<string, string>> = {
  de: {
    "QG-AN-001": "Verstärkter Endotrachealtubus",
    "QG-AN-002": "Doppellumen-Endobronchialtubus",
    "QG-AN-003": "Tracheostomietubus",
    "QG-AN-004": "Larynxmaske (LMA)",
    "QG-AN-005": "Endotrachealtubus",
    "QG-AN-006": "Guedel-Tubus",
    "QG-AN-007": "Anästhesiemaske",
    "QG-AN-008": "Anästhesie-Set",
    "QG-AN-009": "Anästhesienadel",
    "QG-AN-010": "Epiduralkatheter",
    "QG-AN-011": "LOR-Spritze",
    "QG-AN-012": "Atemkreis-Set",
    "QG-AN-013": "HME-Filter",
    "QG-AN-014": "Beatmungsbeutel",
    "QG-AN-015": "Geschlossenes Absaugsystem",
    "QG-UR-001": "Urinmengen-Messbeutel",
    "QG-UR-002": "Blasenkatheter-Set",
    "QG-UR-003": "Urinbeutel",
    "QG-UR-004": "Kolostomiebeutel",
    "QG-UR-006": "Bettschutzeinlage",
    "QG-SU-001": "OP-Kittel",
    "QG-SU-002": "OP-Set",
    "QG-SU-003": "Absauggriff",
    "QG-SU-004": "Verbindungsschlauch",
    "QG-SU-005": "ZVK-Set",
    "QG-SU-006": "Drucktransducer (IBP)",
    "QG-RP-001": "Medizinische Gesichtsmaske",
    "QG-RP-002": "Einmalhandschuhe, Nitril",
    "QG-RP-003": "Sauerstoffbrille",
    "QG-RP-004": "Sauerstoffmaske",
    "QG-RP-005": "Absaugkatheter",
    "QG-RT-001": "Thermoplastische Fixationsmaske",
    "QG-RT-002": "Elastomere Infusionspumpe",
    "QG-RT-003": "Enterales Ernährungsset",
    "QG-RT-004": "IV-Verweilkanüle",
  },
  fr: {
    "QG-AN-001": "Sonde d'intubation renforcée",
    "QG-AN-002": "Sonde endobronchique à double lumière",
    "QG-AN-003": "Sonde de trachéotomie",
    "QG-AN-004": "Masque laryngé (LMA)",
    "QG-AN-005": "Sonde d'intubation",
    "QG-AN-006": "Canule de Guedel",
    "QG-AN-007": "Masque d'anesthésie",
    "QG-AN-008": "Kit d'anesthésie",
    "QG-AN-009": "Aiguille d'anesthésie",
    "QG-AN-010": "Cathéter épidural",
    "QG-AN-011": "Seringue LOR",
    "QG-AN-012": "Circuit respiratoire",
    "QG-AN-013": "Filtre HME",
    "QG-AN-014": "Insufflateur manuel",
    "QG-AN-015": "Sonde d'aspiration en circuit fermé",
    "QG-UR-001": "Poche urinaire avec mesure",
    "QG-UR-002": "Kit de sondage vésical",
    "QG-UR-003": "Poche à urines",
    "QG-UR-004": "Poche de colostomie",
    "QG-UR-006": "Alèse absorbante",
    "QG-SU-001": "Blouse chirurgicale",
    "QG-SU-002": "Kit opératoire",
    "QG-SU-003": "Poignée d'aspiration",
    "QG-SU-004": "Tuyau de raccordement",
    "QG-SU-005": "Kit de cathétérisme veineux central",
    "QG-SU-006": "Capteur de pression (IBP)",
    "QG-RP-001": "Masque médical",
    "QG-RP-002": "Gants d'examen en nitrile",
    "QG-RP-003": "Lunettes à oxygène",
    "QG-RP-004": "Masque à oxygène",
    "QG-RP-005": "Sonde d'aspiration",
    "QG-RT-001": "Masque de contention thermoplastique",
    "QG-RT-002": "Perfuseur élastomérique",
    "QG-RT-003": "Kit de nutrition entérale",
    "QG-RT-004": "Cathéter veineux périphérique",
  },
  es: {
    "QG-AN-001": "Tubo endotraqueal reforzado",
    "QG-AN-002": "Tubo endobronquial de doble luz",
    "QG-AN-003": "Tubo de traqueostomía",
    "QG-AN-004": "Mascarilla laríngea (LMA)",
    "QG-AN-005": "Tubo endotraqueal",
    "QG-AN-006": "Cánula de Guedel",
    "QG-AN-007": "Mascarilla de anestesia",
    "QG-AN-008": "Kit de anestesia",
    "QG-AN-009": "Aguja de anestesia",
    "QG-AN-010": "Catéter epidural",
    "QG-AN-011": "Jeringa LOR",
    "QG-AN-012": "Circuito respiratorio",
    "QG-AN-013": "Filtro HME",
    "QG-AN-014": "Bolsa de reanimación",
    "QG-AN-015": "Sonda de aspiración cerrada",
    "QG-UR-001": "Bolsa medidora de orina",
    "QG-UR-002": "Kit de sondaje vesical",
    "QG-UR-003": "Bolsa de orina",
    "QG-UR-004": "Bolsa de colostomía",
    "QG-UR-006": "Protector absorbente",
    "QG-SU-001": "Bata quirúrgica",
    "QG-SU-002": "Kit quirúrgico",
    "QG-SU-003": "Mango de aspiración",
    "QG-SU-004": "Tubo de conexión",
    "QG-SU-005": "Kit de catéter venoso central",
    "QG-SU-006": "Transductor de presión (IBP)",
    "QG-RP-001": "Mascarilla quirúrgica",
    "QG-RP-002": "Guantes de nitrilo",
    "QG-RP-003": "Gafas nasales",
    "QG-RP-004": "Mascarilla de oxígeno",
    "QG-RP-005": "Sonda de aspiración",
    "QG-RT-001": "Mascarilla termoplástica",
    "QG-RT-002": "Bomba elastomérica",
    "QG-RT-003": "Equipo de nutrición enteral",
    "QG-RT-004": "Catéter venoso periférico",
  },
  it: {
    "QG-AN-001": "Tubo endotracheale rinforzato",
    "QG-AN-002": "Tubo endobronchiale a doppio lume",
    "QG-AN-003": "Cannula di tracheostomia",
    "QG-AN-004": "Maschera laringea (LMA)",
    "QG-AN-005": "Tubo endotracheale",
    "QG-AN-006": "Cannula di Guedel",
    "QG-AN-007": "Maschera per anestesia",
    "QG-AN-008": "Kit di anestesia",
    "QG-AN-009": "Ago per anestesia",
    "QG-AN-010": "Catetere epidurale",
    "QG-AN-011": "Siringa LOR",
    "QG-AN-012": "Circuito respiratorio",
    "QG-AN-013": "Filtro HME",
    "QG-AN-014": "Reanimatore manuale",
    "QG-AN-015": "Aspiratore a circuito chiuso",
    "QG-UR-001": "Sacca urinometro",
    "QG-UR-002": "Kit cateterismo vescicale",
    "QG-UR-003": "Sacca per urina",
    "QG-UR-004": "Sacca per colostomia",
    "QG-UR-006": "Protezione assorbente",
    "QG-SU-001": "Abito chirurgico",
    "QG-SU-002": "Kit chirurgico",
    "QG-SU-003": "Manico di aspirazione",
    "QG-SU-004": "Tubo di collegamento",
    "QG-SU-005": "Kit catetere venoso centrale",
    "QG-SU-006": "Trasduttore di pressione (IBP)",
    "QG-RP-001": "Mascherina chirurgica",
    "QG-RP-002": "Guanti in nitrile",
    "QG-RP-003": "Occhialini nasali",
    "QG-RP-004": "Maschera per ossigeno",
    "QG-RP-005": "Catetere di aspirazione",
    "QG-RT-001": "Maschera termoplastica",
    "QG-RT-002": "Pompa elastomerica",
    "QG-RT-003": "Set per nutrizione enterale",
    "QG-RT-004": "Cannula endovenosa",
  },
  pt: {
    "QG-AN-001": "Sonda endotraqueal reforçada",
    "QG-AN-002": "Sonda endobrônquica de dupla luz",
    "QG-AN-003": "Sonda de traqueostomia",
    "QG-AN-004": "Máscara laríngea (LMA)",
    "QG-AN-005": "Sonda endotraqueal",
    "QG-AN-006": "Cânula de Guedel",
    "QG-AN-007": "Máscara de anestesia",
    "QG-AN-008": "Kit de anestesia",
    "QG-AN-009": "Agulha de anestesia",
    "QG-AN-010": "Cateter epidural",
    "QG-AN-011": "Seringa LOR",
    "QG-AN-012": "Circuito respiratório",
    "QG-AN-013": "Filtro HME",
    "QG-AN-014": "Ressuscitador manual",
    "QG-AN-015": "Aspiração em circuito fechado",
    "QG-UR-001": "Bolsa medidora de urina",
    "QG-UR-002": "Kit de cateterismo vesical",
    "QG-UR-003": "Bolsa de urina",
    "QG-UR-004": "Bolsa de colostomia",
    "QG-UR-006": "Protetor absorvente",
    "QG-SU-001": "Avental cirúrgico",
    "QG-SU-002": "Kit cirúrgico",
    "QG-SU-003": "Cabo de aspiração",
    "QG-SU-004": "Tubo de conexão",
    "QG-SU-005": "Kit de cateter venoso central",
    "QG-SU-006": "Transdutor de pressão (IBP)",
    "QG-RP-001": "Máscara médica",
    "QG-RP-002": "Luvas de nitrilo",
    "QG-RP-003": "Óculos nasais",
    "QG-RP-004": "Máscara de oxigênio",
    "QG-RP-005": "Sonda de aspiração",
    "QG-RT-001": "Máscara termoplástica",
    "QG-RT-002": "Bomba elastomérica",
    "QG-RT-003": "Equipo de nutrição enteral",
    "QG-RT-004": "Cateter intravenoso",
  },
  el: {
    "QG-AN-001": "Ενισχυμένος ενδοτραχειακός σωλήνας",
    "QG-AN-002": "Ενδοβρογχικός σωλήνας διπλού αυλού",
    "QG-AN-003": "Κανύλα τραχειοστομίας",
    "QG-AN-004": "Λαρυγγική μάσκα (LMA)",
    "QG-AN-005": "Ενδοτραχειακός σωλήνας",
    "QG-AN-006": "Κανύλα Guedel",
    "QG-AN-007": "Μάσκα αναισθησίας",
    "QG-AN-008": "Σετ αναισθησίας",
    "QG-AN-009": "Βελόνη αναισθησίας",
    "QG-AN-010": "Καθετήρας επισκληριδίου",
    "QG-AN-011": "Σύριγγα LOR",
    "QG-AN-012": "Αναπνευστικό κύκλωμα",
    "QG-AN-013": "Φίλτρο HME",
    "QG-AN-014": "Ανταναπνευστικός ασκός",
    "QG-AN-015": "Κλειστό σύστημα αναρρόφησης",
    "QG-UR-001": "Σακούλα μέτρησης ούρων",
    "QG-UR-002": "Σετ καθετηριασμού ουροδόχου κύστεως",
    "QG-UR-003": "Σακούλα ούρων",
    "QG-UR-004": "Σακούλα κολοστομίας",
    "QG-UR-006": "Απορροφητικό υπόστρωμα",
    "QG-SU-001": "Χειρουργική ποδιά",
    "QG-SU-002": "Χειρουργικό σετ",
    "QG-SU-003": "Λαβή αναρρόφησης",
    "QG-SU-004": "Σωλήνας σύνδεσης",
    "QG-SU-005": "Σετ κεντρικού φλεβικού καθετήρα",
    "QG-SU-006": "Αισθητήρας πίεσης (IBP)",
    "QG-RP-001": "Ιατρική μάσκα",
    "QG-RP-002": "Γάντια νιτριλίου",
    "QG-RP-003": "Ρινικές κάνουλες οξυγόνου",
    "QG-RP-004": "Μάσκα οξυγόνου",
    "QG-RP-005": "Καθετήρας αναρρόφησης",
    "QG-RT-001": "Θερμοπλαστική μάσκα ακτινοθεραπείας",
    "QG-RT-002": "Ελαστομερής αντλία έγχυσης",
    "QG-RT-003": "Σετ εντερικής σίτισης",
    "QG-RT-004": "Ενδοφλέβιος καθετήρας",
  },
};

/** 按界面语言取品名：中文用 nameZh，其余一律英文标准品名 */
export function skuName(sku: Sku, lang: string): string {
  return skuNamesByLang[lang]?.[sku.code] ?? (lang === "zh" ? sku.nameZh : sku.name);
}

/**
 * 用途描述的 de/fr/es/it/pt/el 译文（zh 在 Sku.applicationZh 上，en 用 Sku.application）。
 * 译文与英文原文严格等价，未添加原文没有的尺寸、材质、期限等声明。
 * 【未审校】长句专业表述尚未经母语审校，上线前建议请各语种经销商抽查；
 * 发现问题只需改本表，渲染层无需变动。
 */
export const skuApplicationsByLang: Record<string, Record<string, string>> = {
  de: {
    "QG-AN-001": "Verstärkter Luftweg für Fälle, in denen der Tubus dem Knicken widerstehen muss, etwa bei Kopf-Hals-Operationen oder in Bauchlage auf der Intensivstation.",
    "QG-AN-002": "Ermöglicht eine unabhängige Beatmung beider Lungenflügel während thoraxchirurgischer Eingriffe, mit getrennten Lumina für links- oder rechtsbronchiale Platzierung.",
    "QG-AN-003": "Hält den Luftweg über den vorderen Hals stabil bei Patienten, die langfristig beatmet werden müssen oder eine Verlegung der oberen Atemwege umgehen müssen.",
    "QG-AN-004": "Supraglottischer Luftweg für kurze Eingriffe und Notfallreanimation, Platzierung ohne direkte Sicht auf die Stimmbänder.",
    "QG-AN-005": "Standard-Luftweg mit Manschette für Allgemeinanästhesie und mechanische Beatmung im OP und auf der Intensivstation.",
    "QG-AN-006": "Oropharyngealer Luftweg, der bei bewusstlosen Patienten während Einleitung und Aufwachphase die Zunge vom Luftweg fernhält.",
    "QG-AN-007": "Gesichtsmaske zur Präoxygenierung und inhalativen Einleitung, Anschluss an den Beatmungskreis über einen Standardanschluss.",
    "QG-AN-008": "Einmal-Set, das den Verbrauchsmaterialbedarf für Spinal-, Epidural- oder Allgemeinanästhesie in einem sterilen Pack vereint.",
    "QG-AN-009": "Spinal- und Epiduralnadeln für die Regionalanästhesie, geliefert in der für jeden Eingriff gewünschten Stärke und Nadelspitzenform.",
    "QG-AN-010": "Wird durch eine Epiduralnadel vorgeschoben und ermöglicht eine kontinuierliche Analgesie bei Geburt, postoperativen Schmerzen und thoraxchirurgischen Eingriffen.",
    "QG-AN-011": "Verlust-Widerstand-Spritze (LOR) zur Identifikation des Epiduralraums während der Katheterplatzierung.",
    "QG-AN-012": "Verbindet das Anästhesie- oder Beatmungsgerät mit dem Patienten, in Ausführungen für Erwachsene und Kinder.",
    "QG-AN-013": "Erhält die Luftwegfeuchtigkeit und filtert die ausgeatmete Luft, wo ein Beatmungskreis im Einsatz ist.",
    "QG-AN-014": "Selbstaufblasender Beatmungsbeutel für die Beatmung, wenn kein Beatmungsgerät verfügbar ist; Einsatz bei Reanimation und Patiententransport.",
    "QG-AN-015": "Ermöglicht tracheales Absaugen ohne Trennung des Kreissystems und senkt so das Kreuzinfektionsrisiko bei beatmeten Patienten.",
    "QG-RP-001": "Dreilagiger Mund-Nasen-Schutz für den klinischen Routineeinsatz, in Karton- und Bulk-Verpackung.",
    "QG-RP-002": "Puderfreie Nitrilhandschuhe für Untersuchung und Eingriff, im vollständigen Größensortiment.",
    "QG-RP-003": "Nasenbrille für die Sauerstofftherapie mit niedrigem Fluss auf Station und in der Ambulanz.",
    "QG-RP-004": "Einfache Sauerstoffmaske und Maske mit Reservoir für höhere Flussraten und Notfälle.",
    "QG-RP-005": "Einmalkatheter zum Entfernen von Sekreten aus den Atemwegen, mit Daumenventil zur Steuerung.",
    "QG-RT-001": "Individuell geformte Fixationsmaske, die den Patienten in Planung und Bestrahlung der Radiotherapie in reproduzierbarer Position hält.",
    "QG-RT-002": "Mechanische Pumpe, die ohne Stromzufuhr eine Infusion mit fester Rate abgibt; eingesetzt für kontinuierliche Analgesie und Chemotherapie außerhalb des Krankenhauses.",
    "QG-RT-003": "Ernährungsset für die enterale Ernährung, verbindet den Nährlösungsbehälter mit einer Magensonde oder PEG-Sonde.",
    "QG-RT-004": "Peripherer Venenverweilkatheter für kurzfristige Gefäßzugänge, mit Injektionsport und Flügeln zur Fixierung.",
    "QG-SU-001": "Steriler Kittel für das OP-Team, in verstärkter und Standardausführung für unterschiedlich starke Flüssigkeitsbelastung.",
    "QG-SU-002": "Eingriffs-Set, das Kittel, Abdeckungen und das Verbrauchsmaterial einer Operation in einer sterilen Abfolge vereint.",
    "QG-SU-003": "Griff für die intraoperative Absaugung, anschließbar an die OP-Absaugleitung und verschiedene Spitzen.",
    "QG-SU-004": "Flexibler Schlauch zum Anschluss von Absaug-, Spül- oder Gasleitungen im sterilen Bereich.",
    "QG-SU-005": "Set für zentralvenösen Zugang, mit Katheter, Führungsdraht, Dilatator und dem Material für die Platzierung.",
    "QG-SU-006": "Einmal-Drucktransducer für die kontinuierliche arterielle oder venöse Druckmessung im OP und auf der Intensivstation.",
    "QG-UR-001": "Stündliche Messung der Urinausscheidung für Intensivmedizin und postoperative Überwachung, montiert am Patientenbett.",
    "QG-UR-002": "Steriles Set für die Harnkatheterisierung, mit Katheter, Auffangbeutel und dem Verbrauchsmaterial für den Eingriff.",
    "QG-UR-003": "Auffangbeutel für Station und häusliche Pflege, mit Auslasshahn zum Entleeren ohne Abtrennen des Katheters.",
    "QG-UR-004": "Stomabeutel für die postoperative und dauerhafte Stomaversorgung, in entleerbaren und geschlossenen Ausführungen.",
    "QG-UR-006": "Saugfähige Unterlagen für die Inkontinenzversorgung sowie als Schutzlage auf Betten, Fahrwagen und Untersuchungsliegen.",
  },
  fr: {
    "QG-AN-001": "Sonde renforcée par fil métallique pour les cas où la sonde doit résister à la flexion, notamment en chirurgie tête et cou ou en décubitus ventral en réanimation.",
    "QG-AN-002": "Permet une ventilation indépendante de chaque poumon pendant la chirurgie thoracique, avec des lumières séparées pour une mise en place bronchique gauche ou droite.",
    "QG-AN-003": "Assure une voie respiratoire stable par la face antérieure du cou chez les patients nécessitant une ventilation prolongée ou le contournement d'une obstruction des voies aériennes supérieures.",
    "QG-AN-004": "Dispositif supraglottique pour les interventions courtes et la réanimation d'urgence, mis en place sans visualisation directe des cordes vocales.",
    "QG-AN-005": "Sonde à ballonnet standard pour l'anesthésie générale et la ventilation mécanique au bloc et en réanimation.",
    "QG-AN-006": "Canule oropharyngée qui maintient la langue à l'écart des voies aériennes chez le patient inconscient, pendant l'induction et le réveil.",
    "QG-AN-007": "Masque facial pour la préoxygénation et l'induction inhalatoire, raccordé au circuit respiratoire par un raccord standard.",
    "QG-AN-008": "Kit à usage unique regroupant le consommable pour une rachianesthésie, une anesthésie péridurale ou générale en un seul pack stérile.",
    "QG-AN-009": "Aiguilles rachidiennes et péridurales pour l'anesthésie locorégionale, fournies dans le calibre et le biseau demandés pour chaque geste.",
    "QG-AN-010": "Introduite dans une aiguille de péridurale pour assurer une analgésie continue lors de l'accouchement, des douleurs postopératoires et des gestes thoraciques.",
    "QG-AN-011": "Seringue à perte de résistance utilisée pour repérer l'espace péridural pendant la mise en place du cathéter.",
    "QG-AN-012": "Relie le respirateur d'anesthésie ou le ventilateur au patient, en versions adulte et pédiatrique.",
    "QG-AN-013": "Préserve l'humidité des voies aériennes et filtre le gaz expiré lorsque le circuit respiratoire est en usage.",
    "QG-AN-014": "Ballon autoremplisseur pour ventiler en l'absence de respirateur, utilisé en réanimation et lors des transports de patients.",
    "QG-AN-015": "Permet l'aspiration trachéale sans ouvrir le circuit, réduisant le risque d'infection croisée chez les patients ventilés.",
    "QG-RP-001": "Masque médical à trois plis pour l'usage clinique courant, en boîte ou en vrac.",
    "QG-RP-002": "Gants en nitrile non poudrés pour l'examen et les gestes, dans une gamme complète de tailles.",
    "QG-RP-003": "Lunettes nasales pour l'oxygénothérapie à faible débit en service et en consultation.",
    "QG-RP-004": "Masque simple et masque à réservoir pour l'oxygénothérapie à débit élevé et l'urgence.",
    "QG-RP-005": "Sonde d'aspiration à usage unique pour dégager les sécrétions des voies aériennes, avec valve à commande par le pouce.",
    "QG-RT-001": "Masque de contention moulé utilisé en préparation et traitement par radiothérapie pour maintenir le patient dans une position reproductible.",
    "QG-RT-002": "Pompe mécanique délivrant une perfusion à débit fixe sans alimentation électrique, utilisée pour l'analgésie continue et la chimiothérapie en dehors de l'hôpital.",
    "QG-RT-003": "Kit de nutrition entérale, reliant le réservoir de nutrition à une sonde nasogastrique ou de gastrostomie.",
    "QG-RT-004": "Cathéter veineux périphérique pour un accès vasculaire de courte durée, avec robinet d'injection et ailettes de fixation.",
    "QG-SU-001": "Blouse stérile pour l'équipe opératoire, en version renforcée et standard selon le niveau d'exposition aux liquides.",
    "QG-SU-002": "Kit opératoire combinant blouse, champs et consommable d'une intervention en une seule séquence stérile.",
    "QG-SU-003": "Poignée d'aspiration peropératoire, se raccordant à la tubulure d'aspiration du bloc et à une gamme d'embouts.",
    "QG-SU-004": "Tubulure souple pour raccorder aspiration, irrigation ou lignes de gaz dans le champ stérile.",
    "QG-SU-005": "Kit d'accès veineux central, comprenant cathéter, guide, dilatateur et le consommable de pose.",
    "QG-SU-006": "Capteur de pression à usage unique pour la surveillance continue des pressions artérielles ou veineuses au bloc et en réanimation.",
    "QG-UR-001": "Mesure horaire de la diurèse en soins critiques et surveillance postopératoire, fixée au lit du patient.",
    "QG-UR-002": "Kit stérile pour le sondage vésical, regroupant la sonde, la poche de recueil et le consommable du geste.",
    "QG-UR-003": "Poche de recueil pour le service hospitalier et les soins à domicile, avec robinet de vidange permettant de la vider sans déconnecter la sonde.",
    "QG-UR-004": "Poche pour stomie pour la prise en charge postopératoire et au long cours, en versions vidangeable et fermée.",
    "QG-UR-006": "Alèses absorbantes pour la prise en charge de l'incontinence et comme protection sur les lits, brancards et tables d'examen.",
  },
  es: {
    "QG-AN-001": "Vía aérea reforzada con espiral para casos en que el tubo debe resistir acodamientos, como cirugía de cabeza y cuello o decúbito prono en cuidados intensivos.",
    "QG-AN-002": "Permite ventilación independiente de cada pulmón durante cirugía torácica, con luces separadas para colocación bronquial derecha o izquierda.",
    "QG-AN-003": "Mantiene una vía aérea estable a través de la cara anterior del cuello en pacientes que requieren ventilación prolongada o el bypass de una obstrucción de vía aérea superior.",
    "QG-AN-004": "Dispositivo supraglótico para procedimientos cortos y reanimación de urgencia, se coloca sin visualización directa de las cuerdas vocales.",
    "QG-AN-005": "Vía aérea estándar con balón para anestesia general y ventilación mecánica en quirófano y cuidados intensivos.",
    "QG-AN-006": "Cánula orofaríngea que mantiene la lengua alejada de la vía aérea en pacientes inconscientes durante inducción y recuperación.",
    "QG-AN-007": "Mascarilla facial para preoxigenación e inducción inhalatoria, se conecta al circuito respiratorio por una conexión estándar.",
    "QG-AN-008": "Kit de un solo uso que agrupa el material para anestesia espinal, epidural o general en un envase estéril.",
    "QG-AN-009": "Agujas espinales y epidurales para anestesia regional, suministradas en el calibre y punta solicitados para cada procedimiento.",
    "QG-AN-010": "Se introduce a través de una aguja epidural para administrar analgesia continua en parto, dolor postoperatorio y procedimientos torácicos.",
    "QG-AN-011": "Jeringa de pérdida de resistencia usada para identificar el espacio epidural durante la colocación del catéter.",
    "QG-AN-012": "Conecta el equipo de anestesia o el ventilador al paciente, en configuraciones adulto y pediátrico.",
    "QG-AN-013": "Conserva la humedad de la vía aérea y filtra el gas espirado donde se usa el circuito respiratorio.",
    "QG-AN-014": "Bolsa autoinflable para ventilar cuando no hay ventilador disponible, en reanimación y transporte de pacientes.",
    "QG-AN-015": "Permite aspiración traqueal sin abrir el circuito, reduciendo el riesgo de infección cruzada en pacientes ventilados.",
    "QG-RP-001": "Mascarilla quirúrgica de tres capas para uso clínico habitual, en caja o a granel.",
    "QG-RP-002": "Guantes de nitrilo sin polvo para exploración y procedimientos, en tallas completas.",
    "QG-RP-003": "Gafas nasales para oxigenoterapia a bajo flujo en planta y consultas externas.",
    "QG-RP-004": "Mascarilla simple y con reservorio para terapias de mayor flujo y uso de emergencia.",
    "QG-RP-005": "Sonda de aspiración de un solo uso para despejar secreciones de la vía aérea, con válvula de control por pulgar.",
    "QG-RT-001": "Mascarilla de inmovilización moldeada usada en planificación y tratamiento de radioterapia para mantener al paciente en una posición reproducible.",
    "QG-RT-002": "Bomba mecánica que administra perfusión a ritmo fijo sin alimentación eléctrica, usada para analgesia continua y quimioterapia fuera del hospital.",
    "QG-RT-003": "Equipo para nutrición enteral, conecta el contenedor de nutrición a una sonda nasogástrica o de gastrostomía.",
    "QG-RT-004": "Catéter venoso periférico para acceso vascular de corta duración, con llave de inyección y aletas de fijación.",
    "QG-SU-001": "Bata estéril para el equipo quirúrgico, en versión reforzada y estándar según el nivel de exposición a líquidos.",
    "QG-SU-002": "Kit quirúrgico que combina bata, campos y el material de una intervención en una única secuencia estéril.",
    "QG-SU-003": "Mango de aspiración intraoperatoria, se conecta a la tubuladura de aspiración del quirófano y a distintas puntas.",
    "QG-SU-004": "Tubuladura flexible para conectar aspiración, irrigación o líneas de gas dentro del campo estéril.",
    "QG-SU-005": "Kit de acceso venoso central, incluye catéter, guía, dilatador y material de implantación.",
    "QG-SU-006": "Transductor de presión de un solo uso para monitorización continua de presión arterial o venosa en quirófano y cuidados intensivos.",
    "QG-UR-001": "Medición horaria de la diuresis en cuidados críticos y monitorización postoperatoria, montada a la cabecera.",
    "QG-UR-002": "Kit estéril para sondaje vesical, agrupa sonda, bolsa colectora y material del procedimiento.",
    "QG-UR-003": "Bolsa colectora para planta y atención domiciliaria, con llave de drenaje para vaciar sin desconectar la sonda.",
    "QG-UR-004": "Bolsa de ostomía para el manejo postoperatorio y a largo plazo del estoma, en versiones drenable y cerrada.",
    "QG-UR-006": "Protegecamas absorbentes para la atención de la incontinencia y como capa protectora en camas, carros y camillas de exploración.",
  },
  it: {
    "QG-AN-001": "Via aerea rinforzata con spirale metallica per i casi in cui il tubo deve resistere alla piegatura, come chirurgia testa-collo o posizione prona in terapia intensiva.",
    "QG-AN-002": "Consente la ventilazione indipendente di ciascun polmone durante la chirurgia toracica, con lumi separati per il posizionamento bronchico destro o sinistro.",
    "QG-AN-003": "Mantiene una via aerea stabile attraverso la parte anteriore del collo nei pazienti che richiedono ventilazione prolungata o il superamento di un'ostruzione delle vie aeree superiori.",
    "QG-AN-004": "Dispositivo sopraglottico per procedure brevi e rianimazione d'emergenza, posizionato senza visualizzazione diretta delle corde vocali.",
    "QG-AN-005": "Via aerea standard con cuffia per anestesia generale e ventilazione meccanica in sala operatoria e terapia intensiva.",
    "QG-AN-006": "Cannula orofaringea che tiene la lingua lontana dalla via aerea nei pazienti incoscienti durante induzione e risveglio.",
    "QG-AN-007": "Maschera facciale per preossigenazione e induzione inalatoria, si collega al circuito respiratorio tramite connettore standard.",
    "QG-AN-008": "Kit monouso che raggruppa i consumabili per anestesia spinale, epidurale o generale in una confezione sterile.",
    "QG-AN-009": "Aghi spinali ed epidurali per anestesia regionale, forniti nel calibro e nella punta richiesti per ogni procedura.",
    "QG-AN-010": "Viene fatta avanzare attraverso un ago epidurale per garantire analgesia continua nel parto, nel dolore post-operatorio e nelle procedure toraciche.",
    "QG-AN-011": "Siringa a perdita di resistenza usata per identificare lo spazio epidurale durante il posizionamento del catetere.",
    "QG-AN-012": "Collega il respiratore per anestesia o il ventilatore al paziente, in versioni adulto e pediatrica.",
    "QG-AN-013": "Preserva l'umidità delle vie aeree e filtra il gas esalato dove il circuito respiratorio è in uso.",
    "QG-AN-014": "Ambù autoespandente per ventilare quando non è disponibile un ventilatore, usato in rianimazione e trasporto pazienti.",
    "QG-AN-015": "Consente l'aspirazione tracheale senza aprire il circuito, riducendo il rischio di infezione incrociata nei pazienti ventilati.",
    "QG-RP-001": "Mascherina chirurgica a tre strati per uso clinico ordinario, in scatola o sfusa.",
    "QG-RP-002": "Guanti in nitrile senza polvere per esami e procedure, in gamma completa di taglie.",
    "QG-RP-003": "Occhialini nasali per ossigenoterapia a basso flusso in reparto e ambulatorio.",
    "QG-RP-004": "Maschera semplice e con serbatoio per ossigenoterapia a flusso elevato e uso d'emergenza.",
    "QG-RP-005": "Catetere monouso per liberare le vie aeree dalle secrezioni, con valvola a comando del pollice.",
    "QG-RT-001": "Maschera di immobilizzazione modellata usata in pianificazione e trattamento radioterapico per mantenere il paziente in posizione riproducibile.",
    "QG-RT-002": "Pompa meccanica che eroga infusione a portata fissa senza alimentazione elettrica, usata per analgesia continua e chemioterapia fuori ospedale.",
    "QG-RT-003": "Set per nutrizione enterale, collega il contenitore della nutrizione a un sondino nasogastrico o di gastrostomia.",
    "QG-RT-004": "Cannula venosa periferica per accesso vascolare di breve durata, con porta di iniezione e alette di fissaggio.",
    "QG-SU-001": "Casacca sterile per l'equipe chirurgica, in versione rinforzata e standard per diversi livelli di esposizione ai liquidi.",
    "QG-SU-002": "Kit operatorio che combina casacca, campi e consumabili di un intervento in un'unica sequenza sterile.",
    "QG-SU-003": "Manico di aspirazione intraoperatoria, collegabile alla tubazione aspirazione della sala e a diverse punte.",
    "QG-SU-004": "Tubo flessibile per collegare aspirazione, irrigazione o linee gas nel campo sterile.",
    "QG-SU-005": "Kit per accesso venoso centrale, comprende catetere, guida, dilatatore e materiali di posizionamento.",
    "QG-SU-006": "Trasduttore di pressione monouso per il monitoraggio continuo della pressione arteriosa o venosa in sala operatoria e terapia intensiva.",
    "QG-UR-001": "Misurazione oraria della diuresi in terapia intensiva e monitoraggio post-operatorio, montata al capezzale.",
    "QG-UR-002": "Kit sterile per cateterismo vescicale, raggruppa catetere, sacca raccoglitrice e consumabili della procedura.",
    "QG-UR-003": "Sacca raccoglitrice per reparto e assistenza domiciliare, con rubinetto di svuotamento che consente di svuotarla senza scollegare il catetere.",
    "QG-UR-004": "Sacca per stomia per la gestione post-operatoria e a lungo termine, in versione drenabile e chiusa.",
    "QG-UR-006": "Assorbenti per l'assistenza all'incontinenza e come strato protettivo su letti, carrelli e lettini di visita.",
  },
  pt: {
    "QG-AN-001": "Via aérea reforçada com espiral para casos em que o tubo deve resistir à dobra, como cirurgia de cabeça e pescoço ou decúbito ventral em cuidados intensivos.",
    "QG-AN-002": "Permite ventilação independente de cada pulmão durante cirurgia torácica, com lúmens separados para posicionamento brônquico direito ou esquerdo.",
    "QG-AN-003": "Mantém via aérea estável pela face anterior do pescoço em pacientes que necessitam de ventilação prolongada ou de contornar uma obstrução das vias aéreas superiores.",
    "QG-AN-004": "Dispositivo supraglótico para procedimentos curtos e reanimação de emergência, inserido sem visualização direta das cordas vocais.",
    "QG-AN-005": "Via aérea padrão com balonete para anestesia geral e ventilação mecânica no bloco operatório e cuidados intensivos.",
    "QG-AN-006": "Cânula orofaríngea que mantém a língua afastada da via aérea em pacientes inconscientes durante indução e recuperação.",
    "QG-AN-007": "Máscara facial para pré-oxigenação e indução inalatória, conecta-se ao circuito respiratório por uma conexão padrão.",
    "QG-AN-008": "Kit de uso único que agrupa os consumíveis para raquianestesia, peridural ou anestesia geral em uma embalagem estéril.",
    "QG-AN-009": "Agulhas para raquianestesia e peridural, fornecidas no calibre e ponta solicitados para cada procedimento.",
    "QG-AN-010": "É avançada através de agulha peridural para proporcionar analgesia contínua no parto, na dor pós-operatória e em procedimentos torácicos.",
    "QG-AN-011": "Seringa de perda de resistência usada para identificar o espaço peridural durante a colocação do cateter.",
    "QG-AN-012": "Conecta o aparelho de anestesia ou o ventilador ao paciente, nas versões adulto e pediátrico.",
    "QG-AN-013": "Preserva a umidade das vias aéreas e filtra o gás expirado onde o circuito respiratório está em uso.",
    "QG-AN-014": "Bolsa autoinflável para ventilar quando não há ventilador disponível, em reanimação e transporte de pacientes.",
    "QG-AN-015": "Permite aspiração traqueal sem abrir o circuito, reduzindo o risco de infecção cruzada em pacientes ventilados.",
    "QG-RP-001": "Máscara cirúrgica de três camadas para uso clínico rotineiro, em caixa ou a granel.",
    "QG-RP-002": "Luvas de nitrilo sem pó para exame e procedimentos, em gama completa de tamanhos.",
    "QG-RP-003": "Óculos nasais para oxigenoterapia de baixo fluxo em enfermaria e ambulatório.",
    "QG-RP-004": "Máscara simples e com reservatório para terapias de maior fluxo e uso de emergência.",
    "QG-RP-005": "Sonda de aspiração de uso único para desobstruir as vias aéreas de secreções, com válvula de controle pelo polegar.",
    "QG-RT-001": "Máscara de imobilização moldada usada no planejamento e tratamento radioterápico para manter o paciente em posição reprodutível.",
    "QG-RT-002": "Bomba mecânica que administra perfusão a ritmo fixo sem energia elétrica, usada para analgesia contínua e quimioterapia fora do hospital.",
    "QG-RT-003": "Equipo para nutrição enteral, conecta o recipiente de nutrição a uma sonda nasogástrica ou de gastrostomia.",
    "QG-RT-004": "Cateter venoso periférico para acesso vascular de curta duração, com porta de injeção e aletas de fixação.",
    "QG-SU-001": "Avental estéril para a equipe cirúrgica, nas versões reforçada e padrão para diferentes níveis de exposição a líquidos.",
    "QG-SU-002": "Kit cirúrgico que combina avental, campos e consumíveis de uma intervenção em uma única sequência estéril.",
    "QG-SU-003": "Cabo de aspiração intraoperatória, conectável à tubulação de aspiração do bloco e a várias pontas.",
    "QG-SU-004": "Tubo flexível para conectar aspiração, irrigação ou linhas de gás dentro do campo estéril.",
    "QG-SU-005": "Kit de acesso venoso central, incluindo cateter, fio-guia, dilatador e materiais de implantação.",
    "QG-SU-006": "Transdutor de pressão de uso único para monitorização contínua da pressão arterial ou venosa no bloco e em cuidados intensivos.",
    "QG-UR-001": "Medição horária do débito urinário em cuidados críticos e monitorização pós-operatória, montada à cabeceira.",
    "QG-UR-002": "Kit estéril para sondagem vesical, agrupa sonda, bolsa coletora e consumíveis do procedimento.",
    "QG-UR-003": "Bolsa coletora para enfermaria e cuidados domiciliares, com torneira de drenagem para esvaziar sem desconectar a sonda.",
    "QG-UR-004": "Bolsa de ostomia para manejo pós-operatório e de longo prazo do estoma, nas versões drenável e fechada.",
    "QG-UR-006": "Protegecolchões absorventes para cuidados com incontinência e como camada protetora em camas, macas e mesas de exame.",
  },
  el: {
    "QG-AN-001": "Αεραγωγός ενισχυμένος με σύρμα για περιπτώσεις που ο σωλήνας πρέπει να αντιστέκεται στη κάμψη, όπως χειρουργική κεφαλής και τραχήλου ή πρηνής θέση σε ΜΕΘ.",
    "QG-AN-002": "Επιτρέπει ανεξάρτητο αερισμό κάθε πνεύμονα κατά τη θωρακική χειρουργική, με χωριστά τμήματα για αριστερή ή δεξιά βροχική τοποθέτηση.",
    "QG-AN-003": "Διατηρεί σταθερό αεραγωγό μέσω της πρόσθιας επιφάνειας του τραχήλου σε ασθενείς που χρειάζονται παρατεταμένο αερισμό ή παράκαμψη απόφραξης των ανώτερων αεραγωγών.",
    "QG-AN-004": "Υπεργλωτδικός αεραγωγός για σύντομες επεμβάσεις και επείγουσα αναζωογόνηση, τοποθετείται χωρίς απευθείας ορατότητα των φωνητικών χορδών.",
    "QG-AN-005": "Τυπικός αεραγωγός με μπαλόνι για γενική αναισθησία και μηχανικό αερισμό σε χειρουργείο και ΜΕΘ.",
    "QG-AN-006": "Στοματοφαρυγγικός αεραγωγός που κρατά τη γλώσσα μακριά από τον αεραγωγό σε ασθενείς χωρίς συνείδηση κατά την εισαγωγή και την ανάνηψη.",
    "QG-AN-007": "Προσωπική μάσκα για προοξυγόνωση και εισπνεόμενη εισαγωγή αναισθησίας, συνδέεται με τον αναπνευστικό κύκλο μέσω τυπικής σύνδεσης.",
    "QG-AN-008": "Σετ μιας χρήσης που ομαδοποιεί τα αναλώσιμα για οσφυϊκή, επικουρική ή γενική αναισθησία σε ένα αποστειρωμένο πακέτο.",
    "QG-AN-009": "Βελόνες οσφυϊκής και επικουρικής αναισθησίας για περιφερειακή αναισθησία, διατίθενται στο εύρος και στην άκρη που ζητείται για κάθε επέμβαση.",
    "QG-AN-010": "Προωθείται μέσω βελόνης επικουρικής αναισθησίας για συνεχή αναλγησία στον τοκετό, σε μετεγχειρητικό πόνο και σε θωρακικές επεμβάσεις.",
    "QG-AN-011": "Σύριγγα απώλειας αντίστασης που χρησιμοποιείται για τον εντοπισμό του επικουρικού χώρου κατά την τοποθέτηση του καθετήρα.",
    "QG-AN-012": "Συνδέει τη μηχανή αναισθησίας ή τον αναπνευστήρα με τον ασθενή, σε εκδοχές για ενήλικες και παιδιά.",
    "QG-AN-013": "Διατηρεί την υγρασία του αεραγωγού και φιλτράρει τον εκπνεόμενο αέρα όπου χρησιμοποιείται αναπνευστικός κύκλος.",
    "QG-AN-014": "Αυτοαναπτυσσόμενος ασκός για αερισμό όταν δεν είναι διαθέσιμος αναπνευστήρας, σε αναζωογόνηση και μεταφορά ασθενών.",
    "QG-AN-015": "Επιτρέπει τραχειακή αναρρόφηση χωρίς διακοπή του κύκλου, μειώνοντας τον κίνδυνο διασταυρούμενης λοίμωξης σε αεριζόμενους ασθενείς.",
    "QG-RP-001": "Ιατρική μάσκα τριών στρωμάτων για συνηθισμένη κλινική χρήση, σε κούτα και χύμα.",
    "QG-RP-002": "Γάντια νιτριλίου χωρίς πούδρα για εξέταση και επεμβάσεις, σε πλήρες φάσμα μεγεθών.",
    "QG-RP-003": "Ρινικοί καθετήρες για οξυγονοθεραπεία χαμηλής ροής σε θαλάμο και εξωτερικά ιατρεία.",
    "QG-RP-004": "Απλή μάσκα οξυγόνου και μάσκα με δεξαμενή για θεραπεία υψηλότερης ροής και επείγουσα χρήση.",
    "QG-RP-005": "Καθετήρας μιας χρήσης για την αφαίρεση εκκρίσεων από τον αεραγωγό, με βαλβίδα ελέγχου με τον αντίχειρα.",
    "QG-RT-001": "Μάσκα ακινητοποίησης που διαμορφώνεται με θερμότητα, χρησιμοποιείται στον προγραμματισμό και τη θεραπεία ακτινοθεραπείας για επαναλήψιμη θέση του ασθενούς.",
    "QG-RT-002": "Μηχανική αντλία που χορηγεί έγχυση σταθερής ροής χωρίς ηλεκτρική τροφοδοσία, για συνεχή αναλγησία και χημειοθεραπεία εκτός νοσοκομείου.",
    "QG-RT-003": "Σετ εντερικής διατροφής, συνδέει το δοχείο τροφής με ρινογαστρικό σωλήνα ή γαστροστομία.",
    "QG-RT-004": "Περιφερειακός φλεβικός καθετήρας για βραχυχρόνια αγγειακή πρόσβαση, με σημείο ένεσης και πτερύγια στερέωσης.",
    "QG-SU-001": "Αποστειρωμένη ποδιά για την χειρουργική ομάδα, σε ενισχυμένη και τυπική έκδοση για διαφορετικά επίπεδα έκθεσης σε υγρά.",
    "QG-SU-002": "Χειρουργικό σετ που συνδυάζει ποδιά, σεντόνια και τα αναλώσιμα μιας επέμβασης σε μία αποστειρωμένη σειρά.",
    "QG-SU-003": "Λαβή αναρρόφησης κατά την επέμβαση, συνδέεται με τον σωλήνα αναρρόφησης του χειρουργείου και διάφορες κορυφές.",
    "QG-SU-004": "Εύκαμπτος σωλήνας για σύνδεση αναρρόφησης, άρδευσης ή γραμμών αερίου μέσα στο αποστειρωμένο πεδίο.",
    "QG-SU-005": "Σετ κεντρικής φλεβικής πρόσβασης, περιλαμβάνει καθετήρα, οδηγό σύρμα, διαστολέα και υλικά τοποθέτησης.",
    "QG-SU-006": "Μετατροπέας πίεσης μιας χρήσης για συνεχή παρακολούθηση αρτηριακής ή φλεβικής πίεσης σε χειρουργείο και ΜΕΘ.",
    "QG-UR-001": "Ωριαία μέτρηση ούρων σε κρίσιμη φροντίδα και μετεγχειρητική παρακολούθηση, τοποθετημένη στο κρεβάτι.",
    "QG-UR-002": "Αποστειρωμένο σετ για καθετηριασμό ουροδόχου κύστης, με καθετήρα, σάκο συλλογής και τα αναλώσιμα της επέμβασης.",
    "QG-UR-003": "Σάκος συλλογής για θαλάμο και οικιακή φροντίδα, με βρύση κένωσης ώστε να αδειάζει χωρίς αποσύνδεση του καθετήρα.",
    "QG-UR-004": "Σάκος στομίας για μετεγχειρητική και μακροχρόνια διαχείριση, σε κενώσιμη και κλειστή έκδοση.",
    "QG-UR-006": "Απορροφητικές στρώσεις για τη φροντίδα ακράτειας και ως προστατευτική στρώση σε κρεβάτια, άμαξες και εξεταστικά τραπέζια.",
  },
};

/**
 * 用途描述按语言取值：先查译文表（zh 走 applicationZh 字段），
 * 缺失的语种或条目一律回落到英文原文。
 */
export function skuApplication(sku: Sku, lang: string): string {
  return skuApplicationsByLang[lang]?.[sku.code] ?? (lang === "zh" ? sku.applicationZh : sku.application);
}

export const categories: Category[] = [
  {
    id: "anesthesia",
    image: "/products/01-anesthesia.webp",
    imageScale: 0.94,
    imageW: 900,
    imageH: 655,
    no: "01",
    name: "Anesthesia & Airway",
    titleKey: "focus_1",
    descKey: "catd_1",
    count: 15,
    skus: [
      {
        code: "QG-AN-001",
        image: "/products/sku/qg-an-001.webp",
        imageW: 800,
        imageH: 303,
        name: "Reinforced Endotracheal Tube",
        nameZh: "加强型气管插管",
        slug: "reinforced-endotracheal-tube",
        application:
          "Wire-reinforced airway for cases where the tube must resist kinking, such as head and neck surgery or prone positioning in intensive care.",
        applicationZh:
          "钢丝加强型气道，用于需要抗折弯的场合，如头颈外科手术或 ICU 俯卧位通气。",
      },
      {
        code: "QG-AN-002",
        image: "/products/sku/qg-an-002.webp",
        imageW: 214,
        imageH: 800,
        name: "Double Lumen Endobronchial Tube",
        nameZh: "双腔支气管插管",
        slug: "double-lumen-endobronchial-tube",
        application:
          "Allows independent ventilation of each lung during thoracic surgery, with separate lumens for left or right bronchial placement.",
        applicationZh:
          "胸科手术中可对两肺分别通气，左右支气管各配独立管腔。",
      },
      {
        code: "QG-AN-003",
        image: "/products/sku/qg-an-003.webp",
        imageW: 500,
        imageH: 477,
        name: "Tracheostomy Tube",
        nameZh: "气管切开插管",
        slug: "tracheostomy-tube",
        application:
          "Maintains a stable airway through the anterior neck for patients who need prolonged ventilation or bypass of an upper airway obstruction.",
        applicationZh:
          "经颈前建立稳定气道，用于需要长期通气、或需绕过上气道梗阻的患者。",
      },
      {
        code: "QG-AN-004",
        image: "/products/sku/qg-an-004.webp",
        imageW: 800,
        imageH: 565,
        name: "Laryngeal Mask Airway (LMA)",
        nameZh: "喉罩气道（LMA）",
        slug: "laryngeal-mask-airway",
        application:
          "Supraglottic airway for short procedures and emergency resuscitation, placed without direct visualisation of the vocal cords.",
        applicationZh:
          "声门上气道，用于短时操作与急救复苏，置入时无需直视声带。",
      },
      {
        code: "QG-AN-005",
        image: "/products/sku/qg-an-005.webp",
        imageW: 482,
        imageH: 800,
        name: "Endotracheal Tube",
        nameZh: "气管插管",
        slug: "endotracheal-tube",
        application:
          "Standard cuffed airway for general anaesthesia and mechanical ventilation in theatre and intensive care.",
        applicationZh:
          "标准带囊气道，用于手术室与 ICU 的全麻及机械通气。",
      },
      {
        code: "QG-AN-006",
        image: "/products/sku/qg-an-006.webp",
        imageW: 800,
        imageH: 217,
        name: "Guedel Airway",
        nameZh: "口咽通气道",
        slug: "guedel-airway",
        application:
          "Oropharyngeal airway that keeps the tongue clear of the airway in unconscious patients during induction and recovery.",
        applicationZh:
          "口咽部气道，防止昏迷患者在诱导与苏醒期间舌体阻塞气道。",
      },
      {
        code: "QG-AN-007",
        image: "/products/sku/qg-an-007.webp",
        imageW: 800,
        imageH: 378,
        name: "Anesthesia Mask",
        nameZh: "麻醉面罩",
        slug: "anesthesia-mask",
        application:
          "Face mask for pre-oxygenation and inhalational induction, connecting to the breathing circuit through a standard port.",
        applicationZh:
          "用于预充氧与吸入诱导，经标准接口与呼吸回路连接。",
      },
      {
        code: "QG-AN-008",
        image: "/products/sku/qg-an-008.webp",
        imageW: 800,
        imageH: 410,
        name: "Anesthesia Kit",
        nameZh: "麻醉套件",
        slug: "anesthesia-kit",
        application:
          "Single-use kit that groups the consumables for a spinal, epidural or general anaesthetic into one sterile pack.",
        applicationZh:
          "一次性套件，将椎管内麻醉、硬膜外或全麻所需耗材集中在一个无菌包内。",
      },
      {
        code: "QG-AN-009",
        image: "/products/sku/qg-an-009.webp",
        imageW: 800,
        imageH: 667,
        name: "Anesthesia Needle",
        nameZh: "麻醉针",
        slug: "anesthesia-needle",
        application:
          "Spinal and epidural needles for regional anaesthesia, supplied in the gauge and tip design requested for each procedure.",
        applicationZh:
          "用于区域麻醉的腰麻针与硬膜外针，按每次操作所需的规格与针尖型号供货。",
      },
      {
        code: "QG-AN-010",
        image: "/products/sku/qg-an-010.webp",
        imageW: 800,
        imageH: 799,
        name: "Epidural Catheter",
        nameZh: "硬膜外导管",
        slug: "epidural-catheter",
        application:
          "Threaded through an epidural needle to deliver continuous analgesia for labour, post-operative pain and thoracic procedures.",
        applicationZh:
          "经硬膜外针置入，用于分娩镇痛、术后镇痛及胸科操作的持续给药。",
      },
      {
        code: "QG-AN-011",
        image: "/products/sku/qg-an-011.webp",
        imageW: 333,
        imageH: 800,
        name: "LOR Syringe",
        nameZh: "LOR 注射器",
        slug: "lor-syringe",
        application:
          "Loss-of-resistance syringe used to identify the epidural space while the catheter is being placed.",
        applicationZh:
          "阻力消失法注射器，用于置管过程中判断硬膜外腔位置。",
      },
      {
        code: "QG-AN-012",
        image: "/products/sku/qg-an-012.webp",
        imageW: 262,
        imageH: 113,
        name: "Breathing Circuit",
        nameZh: "呼吸回路",
        slug: "breathing-circuit",
        application:
          "Connects the anaesthesia machine or ventilator to the patient, in adult and paediatric configurations.",
        applicationZh:
          "连接麻醉机或呼吸机与患者，提供成人及儿童配置。",
      },
      {
        code: "QG-AN-013",
        image: "/products/sku/qg-an-013.webp",
        imageW: 640,
        imageH: 800,
        name: "Heat and Moisture Exchanger (HME)",
        nameZh: "热湿交换器（HME）",
        slug: "heat-and-moisture-exchanger",
        application:
          "Preserves airway humidity and filters exhaled gas where the breathing circuit is in use.",
        applicationZh:
          "在呼吸回路使用中保持气道湿度并过滤呼出气体。",
      },
      {
        code: "QG-AN-014",
        image: "/products/sku/qg-an-014.webp",
        imageW: 800,
        imageH: 551,
        name: "Manual Resuscitator",
        nameZh: "手动复苏器",
        slug: "manual-resuscitator",
        application:
          "Self-inflating bag for ventilation when a ventilator is not available, used in resuscitation and patient transport.",
        applicationZh:
          "无呼吸机时用于通气，适用于复苏与患者转运。",
      },
      {
        code: "QG-AN-015",
        image: "/products/sku/qg-an-015.webp",
        imageW: 490,
        imageH: 800,
        name: "Closed Suction Catheter",
        nameZh: "密闭式吸痰管",
        slug: "closed-suction-catheter",
        application:
          "Allows tracheal suctioning without breaking the circuit, reducing cross-infection risk in ventilated patients.",
        applicationZh:
          "无需断开呼吸回路即可完成气道吸引，降低机械通气患者的交叉感染风险。",
      },
    ],
  },
  {
    id: "urology",
    image: "/products/02-urology.webp",
    imageScale: 1.0,
    imageW: 791,
    imageH: 900,
    no: "02",
    name: "Urology & Incontinence",
    titleKey: "focus_2",
    descKey: "catd_2",
    count: 5,
    skus: [
      {
        code: "QG-UR-001",
        image: "/products/sku/qg-ur-001.webp",
        imageW: 800,
        imageH: 635,
        name: "Precision Urine Meter",
        nameZh: "精密尿袋计量器",
        slug: "precision-urine-meter",
        application:
          "Hourly urine output measurement for critical care and post-operative monitoring, mounted at the bedside.",
        applicationZh:
          "用于重症监护与术后监测的逐小时尿量计量，可挂于床旁。",
      },
      {
        code: "QG-UR-002",
        image: "/products/sku/qg-ur-002.webp",
        imageW: 782,
        imageH: 523,
        name: "Foley Catheter Kit",
        nameZh: "导尿包",
        slug: "foley-catheter-kit",
        application:
          "Sterile kit for urinary catheterisation, grouping the catheter, drainage bag and procedure consumables.",
        applicationZh:
          "无菌导尿套件，含导尿管、引流袋及操作所需耗材。",
      },
      {
        code: "QG-UR-003",
        image: "/products/sku/qg-ur-003.webp",
        imageW: 696,
        imageH: 800,
        name: "Disposable Urine Bag",
        nameZh: "一次性集尿袋",
        slug: "disposable-urine-bag",
        application:
          "Collection bag for ward and home care, with a drain tap for emptying without disconnecting the catheter.",
        applicationZh:
          "用于病房与居家护理的集尿袋，带排放阀，排空时无需断开导尿管。",
      },
      {
        code: "QG-UR-004",
        image: "/products/sku/qg-ur-004.webp",
        imageW: 800,
        imageH: 645,
        name: "Colostomy Bag",
        nameZh: "结肠造口袋",
        slug: "colostomy-bag",
        application:
          "Ostomy pouch for post-operative and long-term stoma management, in drainable and closed formats.",
        applicationZh:
          "用于术后及长期造口护理的造口袋，提供可排放式与封闭式两种形式。",
      },
      {
        code: "QG-UR-006",
        image: "/products/sku/qg-ur-006.webp",
        imageW: 800,
        imageH: 562,
        name: "Disposable Underpads",
        nameZh: "一次性护理垫",
        slug: "disposable-underpads",
        application:
          "Absorbent pads for incontinence care and as a protective layer on beds, trolleys and examination couches.",
        applicationZh:
          "吸水垫，用于失禁护理，也可作为病床、推车与检查床的隔离层。",
      },
    ],
  },
  {
    id: "surgical",
    image: "/products/03-surgical.webp",
    imageScale: 0.92,
    imageW: 900,
    imageH: 594,
    no: "03",
    name: "Surgical & Operating Room",
    titleKey: "focus_3",
    descKey: "catd_3",
    count: 6,
    skus: [
      {
        code: "QG-SU-001",
        image: "/products/sku/qg-su-001.webp",
        imageW: 440,
        imageH: 800,
        name: "Disposable Surgical Gown",
        nameZh: "一次性手术衣",
        slug: "disposable-surgical-gown",
        application:
          "Sterile gown for the operating team, in reinforced and standard versions for different levels of fluid exposure.",
        applicationZh:
          "手术团队用无菌手术衣，提供加强型与标准型，应对不同强度的液体暴露。",
      },
      {
        code: "QG-SU-002",
        image: "/products/sku/qg-su-002.webp",
        imageW: 800,
        imageH: 507,
        name: "Disposable Surgical Kit",
        nameZh: "一次性手术包",
        slug: "disposable-surgical-kit",
        application:
          "Procedure pack that combines gown, drapes and the consumables for one operation in a single sterile sequence.",
        applicationZh:
          "将手术衣、铺单与单台手术耗材按无菌操作顺序集成于一个手术包。",
      },
      {
        code: "QG-SU-003",
        image: "/products/sku/qg-su-003.webp",
        imageW: 800,
        imageH: 746,
        name: "Suction Handle",
        nameZh: "吸引手柄",
        slug: "suction-handle",
        application:
          "Handle for intra-operative suction, connecting to the theatre suction tubing and a selection of tips.",
        applicationZh:
          "术中吸引手柄，与手术室吸引管路及多种吸引头连接。",
      },
      {
        code: "QG-SU-004",
        image: "/products/sku/qg-su-004.webp",
        imageW: 783,
        imageH: 690,
        name: "Connecting Tube",
        nameZh: "连接管",
        slug: "connecting-tube",
        application:
          "Flexible tubing for connecting suction, irrigation or gas lines inside the sterile field.",
        applicationZh:
          "柔性管路，用于无菌区内连接吸引、冲洗或气路。",
      },
      {
        code: "QG-SU-005",
        image: "/products/sku/qg-su-005.webp",
        imageW: 800,
        imageH: 579,
        name: "Central Venous Catheter Kit",
        nameZh: "中心静脉导管套件",
        slug: "central-venous-catheter-kit",
        application:
          "Kit for central venous access, including the catheter, guidewire, dilator and placement consumables.",
        applicationZh:
          "中心静脉置管套件，含导管、导丝、扩张器及置管耗材。",
      },
      {
        code: "QG-SU-006",
        image: "/products/sku/qg-su-006.webp",
        imageW: 220,
        imageH: 221,
        name: "Disposable Pressure Transducer (IBP)",
        nameZh: "一次性压力传感器（IBP）",
        slug: "disposable-pressure-transducer",
        application:
          "Single-use transducer for continuous arterial or venous pressure monitoring in theatre and intensive care.",
        applicationZh:
          "一次性压力传感器，用于手术室与 ICU 的动脉压或静脉压连续监测。",
      },
    ],
  },
  {
    id: "respiratory",
    image: "/products/04-respiratory.webp",
    imageScale: 0.98,
    imageW: 900,
    imageH: 546,
    no: "04",
    name: "Respiratory & Protective",
    titleKey: "focus_4",
    descKey: "catd_4",
    count: 5,
    skus: [
      {
        code: "QG-RP-001",
        image: "/products/sku/qg-rp-001.webp",
        imageW: 800,
        imageH: 574,
        name: "Medical Face Mask",
        nameZh: "医用口罩",
        slug: "medical-face-mask",
        application:
          "Three-layer face mask for routine clinical use, supplied in boxed and bulk packing.",
        applicationZh:
          "三层医用口罩，适用于常规诊疗场景，提供盒装与散装。",
      },
      {
        code: "QG-RP-002",
        image: "/products/sku/qg-rp-002.webp",
        imageW: 613,
        imageH: 800,
        name: "Nitrile Examination Gloves",
        nameZh: "一次性丁腈检查手套",
        slug: "nitrile-examination-gloves",
        application:
          "Powder-free nitrile gloves for examination and procedure use, in a full range of sizes.",
        applicationZh:
          "无粉丁腈检查手套，用于检查与操作，规格齐全。",
      },
      {
        code: "QG-RP-003",
        image: "/products/sku/qg-rp-003.webp",
        imageW: 800,
        imageH: 402,
        name: "Nasal Oxygen Tube",
        nameZh: "鼻氧管",
        slug: "nasal-oxygen-tube",
        application:
          "Nasal cannula for low-flow oxygen therapy on the ward and in outpatient settings.",
        applicationZh:
          "鼻氧管，用于病房与门诊的低流量氧疗。",
      },
      {
        code: "QG-RP-004",
        image: "/products/sku/qg-rp-004.webp",
        imageW: 800,
        imageH: 460,
        name: "Oxygen Mask",
        nameZh: "氧气面罩",
        slug: "oxygen-mask",
        application:
          "Simple and reservoir oxygen mask for higher-flow therapy and emergency use.",
        applicationZh:
          "普通型与储氧型氧气面罩，用于较高流量氧疗及急救。",
      },
      {
        code: "QG-RP-005",
        image: "/products/sku/qg-rp-005.webp",
        imageW: 800,
        imageH: 769,
        name: "Suction Catheter",
        nameZh: "吸痰管",
        slug: "suction-catheter",
        application:
          "Single-use catheter for clearing secretions from the airway, with a thumb control vent.",
        applicationZh:
          "一次性气道吸痰管，带拇指控制阀，用于清除气道分泌物。",
      },
    ],
  },
  {
    id: "radiotherapy",
    image: "/products/05-radiotherapy.webp",
    imageScale: 1.07,
    imageW: 553,
    imageH: 900,
    no: "05",
    name: "Radiotherapy & Infusion",
    titleKey: "focus_5",
    descKey: "catd_5",
    count: 4,
    skus: [
      {
        code: "QG-RT-001",
        image: "/products/sku/qg-rt-001.webp",
        imageW: 800,
        imageH: 441,
        name: "Thermoplastic Radiotherapy Mask",
        nameZh: "热塑性放疗固定膜",
        slug: "thermoplastic-radiotherapy-mask",
        application:
          "Moulded immobilisation mask used in radiotherapy planning and treatment to keep the patient in a reproducible position.",
        applicationZh:
          "热塑成型固定膜，用于放疗定位与治疗，使患者体位保持可重复。",
      },
      {
        code: "QG-RT-002",
        image: "/products/sku/qg-rt-002.webp",
        imageW: 783,
        imageH: 690,
        name: "Elastomeric Infusion Pump",
        nameZh: "弹性体输液泵",
        slug: "elastomeric-infusion-pump",
        application:
          "Mechanical pump that delivers a fixed-rate infusion without power, used for continuous analgesia and chemotherapy outside hospital.",
        applicationZh:
          "无需电源的定速输注泵，用于院外持续镇痛与化疗给药。",
      },
      {
        code: "QG-RT-003",
        image: "/products/sku/qg-rt-003.webp",
        imageW: 800,
        imageH: 751,
        name: "Enteral Feeding Set",
        nameZh: "肠内营养输注器",
        slug: "enteral-feeding-set",
        application:
          "Giving set for enteral nutrition, connecting the feed container to a nasogastric or gastrostomy tube.",
        applicationZh:
          "肠内营养输注管路，连接营养液容器与鼻胃管或胃造瘘管。",
      },
      {
        code: "QG-RT-004",
        image: "/products/sku/qg-rt-004.webp",
        imageW: 580,
        imageH: 365,
        name: "I.V. Cannula",
        nameZh: "静脉留置针",
        slug: "iv-cannula",
        application:
          "Peripheral venous cannula for short-term vascular access, with injection port and wing fixation.",
        applicationZh:
          "外周静脉留置针，用于短期血管通路，带注射口与蝶翼固定。",
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
