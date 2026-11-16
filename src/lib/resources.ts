/**
 * Compliance notes — editorial content for the resources section.
 *
 * Written for European and Swiss importers who have to file, label and defend
 * these documents. Everything here describes the rules as written; it is not
 * legal advice and it deliberately avoids recommending any particular
 * representative, laboratory or certification body.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string }
  | { type: "table"; head: [string, string, string]; rows: [string, string, string][] };

/** Languages a note has been written in. English is the source text and is
 *  never listed here — it is the fallback, not a translation. */
export type ArticleLang = "de" | "fr";

export interface ArticleTranslation {
  title: string;
  dek: string;
  tag?: string;
  minutes?: number;
  keyPoints: string[];
  blocks: Block[];
}

export interface Article {
  slug: string;
  no: string;
  title: string;
  dek: string;
  /** ISO date, used for display and for the Article JSON-LD */
  date: string;
  minutes: number;
  tag: string;
  /** Shown in the right-hand rail of the article page */
  keyPoints: string[];
  blocks: Block[];
  /** Written translations. Anything missing falls back to the English text. */
  translations?: Partial<Record<ArticleLang, ArticleTranslation>>;
}

/** Which language a reader is actually going to get for this note. */
export type ResolvedLang = "en" | ArticleLang;

export interface ArticleText {
  lang: ResolvedLang;
  title: string;
  dek: string;
  tag: string;
  minutes: number;
  keyPoints: string[];
  blocks: Block[];
}

/**
 * Pick the text to render for a note. A note translated into German but read
 * by a French visitor must not fall back to French chrome over English body
 * copy silently — the caller gets `lang` back and can show the language line.
 */
export function articleText(article: Article, lang: string): ArticleText {
  const wanted = (lang === "de" || lang === "fr" ? lang : null) as ArticleLang | null;
  const t = wanted ? article.translations?.[wanted] : undefined;
  if (t) {
    return {
      lang: wanted as ArticleLang,
      title: t.title,
      dek: t.dek,
      tag: t.tag ?? article.tag,
      minutes: t.minutes ?? article.minutes,
      keyPoints: t.keyPoints,
      blocks: t.blocks,
    };
  }
  return {
    lang: "en",
    title: article.title,
    dek: article.dek,
    tag: article.tag,
    minutes: article.minutes,
    keyPoints: article.keyPoints,
    blocks: article.blocks,
  };
}

/** Languages this note exists in, English included. */
export function availableLangs(article: Article): ResolvedLang[] {
  const out: ResolvedLang[] = ["en"];
  (["de", "fr"] as ArticleLang[]).forEach((l) => {
    if (article.translations?.[l]) out.push(l);
  });
  return out;
}

/* ---------------------------------------------------------------------------
 * Translations.
 *
 * Terminology is the whole point here, so it follows the regulations rather
 * than the dictionary: Bevollmächtigter (MedDO), Benannte Stelle (MDR),
 * Konformitätserklärung; mandataire, organisme notifié, déclaration de
 * conformité. A literal translation of "authorised representative" reads as a
 * commercial agent in German, which is a different legal animal.
 * ------------------------------------------------------------------------- */

const CH_REP_DE: ArticleTranslation = {
  title: "Wer Ihr CH-REP sein kann — und was die Rolle wirklich verlangt",
  dek: "Jedes Gerät, das von außerhalb in die Schweiz gelangt, braucht einen Schweizer Bevollmächtigten. Die Rolle ist kleiner als die eines Händlers und größer als eine Postadresse.",
  tag: "Schweiz",
  keyPoints: [
    "Der Bevollmächtigte muss in der Schweiz niedergelassen und bei Swissmedic registriert sein.",
    "Name und Adresse stehen auf dem Etikett — die Ernennung ist damit eine Kennzeichnungsentscheidung.",
    "Ein in der Schweiz niedergelassener Importeur kann beide Rollen übernehmen, getrennt gekennzeichnet.",
    "EU-Bevollmächtigter und Schweizer Bevollmächtigter sind zwei getrennte Ernennungen.",
  ],
  blocks: [
    {
      type: "p",
      text: "Ein Schweizer Bevollmächtigter — üblicherweise als CH-REP bezeichnet — ist der Wirtschaftsakteur in der Schweiz, den ein Hersteller außerhalb der Schweiz bestellt, um in seinem Namen zu handeln. Ohne ihn darf ein Gerät nicht in der Schweiz in Verkehr gebracht werden. Der Bevollmächtigte muss in der Schweiz niedergelassen, bei Swissmedic registriert und auf dem Etikett oder in der Gebrauchsanweisung genannt sein.",
    },
    {
      type: "p",
      text: "Die Rolle existiert, weil die Behörde einen Ansprechpartner in ihrem eigenen Rechtsraum braucht, den sie erreichen kann, der die technische Dokumentation vorlegen kann und der für das Gerät einsteht. Das ist ihr ganzer Zweck — und genau das ist der Maßstab, wenn Sie einen Kandidaten prüfen.",
    },
    { type: "h2", text: "Was die Rolle nicht ist" },
    {
      type: "list",
      items: [
        "Keine Postweiterleitungsadresse. Vom Bevollmächtigten wird erwartet, dass er inhaltlich zu dem Gerät antwortet, nicht Briefe weiterleitet.",
        "Nicht der Importeur — auch wenn ein Unternehmen beide Rollen innehaben kann. Dann müssen beide Eigenschaften getrennt auf dem Etikett erscheinen.",
        "Nicht der EU-Bevollmächtigte. Die Ernennung für die EU und die für die Schweiz sind getrennt, nach getrennten Regeln, und die eine erfüllt die andere nicht.",
      ],
    },
    { type: "h2", text: "Kann der Importeur sein eigener Bevollmächtigter sein?" },
    {
      type: "p",
      text: "Ja — sofern der Importeur in der Schweiz niedergelassen ist. Dann steht dasselbe Unternehmen zweimal auf dem Etikett, je einmal in jeder Eigenschaft, mit getrennt benannten Rollen. Das ist bei Schweizer Distributoren, die auch importieren, üblich und spart eine Korrespondenzebene zwischen zwei Unternehmen, die sich sonst gegenseitig auf dem Laufenden halten müssten.",
    },
    { type: "h2", text: "Fünf Punkte, die Sie vor der Ernennung prüfen sollten" },
    {
      type: "list",
      items: [
        "Registrierung. Lassen Sie sich die Swissmedic-Registrierung zeigen und prüfen Sie, ob die von Ihnen gelieferten Gerätefamilien im erfassten Umfang liegen.",
        "Portfolio. Ein Bevollmächtigter, der bereits Geräte Ihrer Art führt, kann sie in der Regel vertreten; einer ohne solche Geräte in der Regel nicht.",
        "Wer unterschreibt. Fragen Sie nach der namentlich benannten Person hinter der Ernennung. Im Alltag ist sie es, an die sich die Behörde Ihrer Kunden wendet.",
        "Dokumentenzugriff. Bestätigen Sie, dass die vollständige technische Dokumentation — bei sterilen Geräten einschließlich der Sterilisationsakte — innerhalb einer Arbeitswoche vorgelegt werden kann.",
        "Beendigung. Fragen Sie, was passiert, wenn die Ernennung endet. Der Name steht auf dem Etikett; eine Kündigung bedeutet also Umkennzeichnung, nicht nur ein Schreiben.",
      ],
    },
    {
      type: "note",
      text: "Praxistipp: Der Name und die Adresse auf dem Etikett, der Name in der Swissmedic-Registrierung und der Name im Ernennungsschreiben müssen dieselbe juristische Person in identischer Schreibweise sein. Eine Abweichung ist das Erste, wonach ein Inspektor sucht.",
    },
    { type: "h2", text: "Wo wir in diesem Bild stehen" },
    {
      type: "p",
      text: "Wir sind Lieferkettenpartner, kein Bevollmächtigter. Wir erstellen die Druckvorlagen und die Etikettentexte, stellen die Unterlagen zusammen, die der Bevollmächtigte benötigt, und halten die Versionen im Gleichlauf, wenn sich ein Gerät oder eine Fabrik ändert. Die Ernennung selbst erfolgt zwischen Ihnen und dem Schweizer Unternehmen: Wir handeln nicht als Bevollmächtigte und bestellen auch keinen in Ihrem Namen.",
    },
  ],
};

const CH_REP_FR: ArticleTranslation = {
  title: "Qui peut être votre mandataire suisse (CH-REP), et ce que ce rôle engage",
  dek: "Tout dispositif entrant en Suisse depuis l'étranger exige un mandataire établi en Suisse. Ce rôle est plus étroit que celui d'un distributeur et plus large qu'une adresse de réexpédition.",
  tag: "Suisse",
  keyPoints: [
    "Le mandataire doit être établi en Suisse et enregistré auprès de Swissmedic.",
    "Son nom et son adresse figurent sur l'étiquette : le nommer est donc une décision d'étiquetage.",
    "Un importateur établi en Suisse peut assumer les deux rôles, mentionnés séparément.",
    "Le mandataire UE et le mandataire suisse sont deux désignations distinctes.",
  ],
  blocks: [
    {
      type: "p",
      text: "Le mandataire suisse — généralement désigné CH-REP — est l'opérateur économique établi en Suisse qu'un fabricant hors de Suisse désigne pour agir en son nom. Sans lui, un dispositif ne peut pas être mis sur le marché suisse. Le mandataire doit être établi en Suisse, enregistré auprès de Swissmedic, et mentionné sur l'étiquette ou dans la notice d'utilisation.",
    },
    {
      type: "p",
      text: "Ce rôle existe parce que l'autorité a besoin, dans son propre ressort, d'un interlocuteur qu'elle peut joindre, qui peut produire la documentation technique et qui répond du dispositif. C'est tout son objet — et c'est le critère à appliquer quand vous évaluez un candidat.",
    },
    { type: "h2", text: "Ce que ce rôle n'est pas" },
    {
      type: "list",
      items: [
        "Pas une adresse de réexpédition du courrier. On attend du mandataire qu'il réponde sur le fond au sujet du dispositif, pas qu'il transmette des lettres.",
        "Pas l'importateur, même si une même société peut cumuler les deux rôles. Dans ce cas, les deux qualités doivent apparaître séparément sur l'étiquette.",
        "Pas le mandataire UE. La désignation pour l'Union et celle pour la Suisse sont distinctes, relèvent de règles distinctes, et l'une ne satisfait pas l'autre.",
      ],
    },
    { type: "h2", text: "L'importateur peut-il être son propre mandataire ?" },
    {
      type: "p",
      text: "Oui — à condition que l'importateur soit établi en Suisse. L'étiquette porte alors deux fois la même société, une fois dans chaque qualité, avec des rôles nommés séparément. C'est courant chez les distributeurs suisses qui importent également, et cela supprime un niveau de correspondance entre deux sociétés qui devraient sinon se tenir mutuellement informées.",
    },
    { type: "h2", text: "Cinq points à vérifier avant de le désigner" },
    {
      type: "list",
      items: [
        "L'enregistrement. Demandez l'enregistrement Swissmedic et vérifiez que les familles de dispositifs que vous fournissez entrent dans le périmètre couvert.",
        "Le portefeuille. Un mandataire qui porte déjà des dispositifs de votre type peut généralement en répondre ; un mandataire qui n'en porte aucun, généralement pas.",
        "Qui signe. Demandez le nom de la personne derrière la désignation. En pratique, c'est elle que l'autorité de vos clients contactera.",
        "L'accès aux documents. Confirmez que la documentation technique complète — y compris le dossier de stérilisation lorsque le dispositif est stérile — peut être produite en une semaine ouvrable.",
        "La sortie. Demandez ce qui se passe si la désignation prend fin. Le nom figure sur l'étiquette : une démission implique donc un ré-étiquetage, pas seulement une lettre.",
      ],
    },
    {
      type: "note",
      text: "Règle pratique : le nom et l'adresse sur l'étiquette, le nom de l'enregistrement Swissmedic et le nom figurant sur la lettre de désignation doivent être la même personne morale, orthographiée de la même façon. Une divergence est la première chose que cherche un inspecteur.",
    },
    { type: "h2", text: "Notre position dans ce dispositif" },
    {
      type: "p",
      text: "Nous sommes un partenaire de la chaîne d'approvisionnement, pas un mandataire. Nous préparons les fichiers d'impression et les textes d'étiquette, nous rassemblons les documents dont le mandataire aura besoin, et nous maintenons les versions alignées lorsqu'un dispositif ou une usine change. La désignation elle-même se fait entre vous et l'entité suisse : nous n'agissons pas comme mandataire et nous n'en désignons pas un en votre nom.",
    },
  ],
};

const DOC_DE: ArticleTranslation = {
  title: "Wie man die Konformitätserklärung eines Lieferanten liest",
  dek: "Eine Seite, vom Hersteller unterschrieben — und rechtlich gewichtiger als das Zertifikat, nach dem üblicherweise gefragt wird. Sechs Punkte, der Reihe nach.",
  tag: "Dokumente",
  keyPoints: [
    "Die Erklärung muss das Gerät, seine Klasse, die angewandten Normen und — soweit beteiligt — die Benannte Stelle benennen.",
    "Zertifikatsdaten und Unterzeichnungsdatum sind zwei verschiedene Dinge.",
    "Das Unterzeichnungsdatum darf nicht vor dem Datum des Zertifikats liegen, auf das es sich stützt.",
    "Nur der Hersteller unterzeichnet eine Konformitätserklärung. Ein Händler kann sie nicht im Namen der Fabrik ausstellen.",
  ],
  blocks: [
    {
      type: "p",
      text: "Die Konformitätserklärung ist die eigene Erklärung des Herstellers, dass das Gerät die Verordnung erfüllt, gestützt auf die auf derselben Seite aufgeführten Nachweise. Sie wird in der Verantwortung des Herstellers unterzeichnet — deshalb ist sie das Dokument, das man zuerst liest und aufbewahrt.",
    },
    { type: "h2", text: "Was darauf stehen muss" },
    {
      type: "list",
      items: [
        "Name und Anschrift des Herstellers sowie, soweit einschlägig, des Bevollmächtigten.",
        "Eine Identifizierung des Geräts, die ausreicht, um die Erklärung den tatsächlich gelieferten Produkten zuzuordnen.",
        "Die Klassifizierung und die angewandte Regel.",
        "Die Normen und gemeinsamen Spezifikationen, mit denen die Konformität nachgewiesen wurde.",
        "Name und Nummer der Benannten Stelle und die Zertifikatsreferenz, sofern eine Benannte Stelle beteiligt war.",
        "Ort und Datum der Erklärung sowie Name und Funktion des Unterzeichners.",
      ],
    },
    { type: "h2", text: "Die beiden Daten sind nicht dasselbe Datum" },
    {
      type: "p",
      text: "Eine Erklärung zeigt in der Regel zwei Datumsangaben, und sie werden regelmäßig als eines gelesen. Ausstellungs- und Gültigkeitsdatum des Zertifikats gehören der Benannten Stelle. Ort und Datum am Seitenfuß gehören der Erklärung selbst. Sie müssen nicht übereinstimmen: Die Erklärung darf nicht vor dem Zertifikat datiert sein, auf das sie sich stützt, und sie muss in dessen Gültigkeitszeitraum fallen. Ein Abstand von mehreren Monaten zwischen beiden ist normal und kein Mangel.",
    },
    {
      type: "note",
      text: "Ist eine Erklärung vor dem Zertifikat datiert, das sie zitiert, ist das Dokument fehlerhaft — unabhängig davon, wie gut das Gerät ist. Die Erklärung wurde auf Grundlage eines Zertifikats unterzeichnet, das es noch nicht gab.",
    },
    { type: "h2", text: "Vier Punkte, bei denen Sie nachfragen sollten" },
    {
      type: "list",
      items: [
        "Ein steriles Gerät, dessen Erklärung an keiner Stelle eine Nummer einer Benannten Stelle enthält.",
        "Normen, die nur als EN ISO 13485 aufgeführt sind — das ist eine Norm für Qualitätsmanagementsysteme, keine Produktnorm.",
        "Eine Herstelleranschrift, die nicht zum Etikett oder zum Zertifikat passt.",
        "Kein Ort, kein Datum oder kein namentlich genannter Unterzeichner.",
      ],
    },
    { type: "h2", text: "Was Sie aufbewahren sollten — und wie lange" },
    {
      type: "p",
      text: "Bewahren Sie genau die Version auf, die Sie erhalten haben, mit dem Eingangsdatum, abgelegt zum jeweiligen Gerät. Wird ein Zertifikat erneuert, sollte die Erklärung neu ausgestellt werden; die frühere ist nicht falsch, sie ist überholt — und beide Versionen zeigen zu können, macht aus einer Rückfrage Ihrer Behörde eine Antwort in zwei Minuten.",
    },
  ],
};

export const articles: Article[] = [
  {
    slug: "ch-rep-switzerland",
    no: "01",
    title: "Who can act as your CH-REP, and what the role really commits you to",
    dek: "Every device entering Switzerland from outside the country needs a Swiss authorised representative. The role is smaller than a distributor and larger than a forwarding address.",
    date: "2026-11-16",
    minutes: 6,
    tag: "Switzerland",
    keyPoints: [
      "The representative must be established in Switzerland and registered with Swissmedic.",
      "Its name and address are printed on the label, so appointing one is a labelling decision.",
      "An importer established in Switzerland can hold both roles, labelled separately.",
      "The EU authorised representative and the Swiss one are separate appointments.",
    ],
    blocks: [
      {
        type: "p",
        text: "A Swiss authorised representative — normally written CH-REP — is the economic operator inside Switzerland that a manufacturer outside Switzerland appoints to act on its behalf. Without one, a device cannot be placed on the Swiss market. The representative has to be established in Switzerland, registered with Swissmedic, and named on the label or in the instructions for use.",
      },
      {
        type: "p",
        text: "The role exists because the authority needs a counterpart in its own jurisdiction that it can reach, that can produce the technical documentation, and that answers for the device. That is the whole purpose of it, and it is the test to apply when you evaluate a candidate.",
      },
      { type: "h2", text: "What the role is not" },
      {
        type: "list",
        items: [
          "Not a mail-forwarding address. The representative is expected to answer questions about the device in substance, not to relay letters.",
          "Not the importer, although one company may hold both roles. If it does, the two capacities have to be shown separately on the label.",
          "Not the EU authorised representative. The EU and Swiss appointments are separate, under separate rules, and one does not satisfy the other.",
        ],
      },
      { type: "h2", text: "Can the importer act as its own representative" },
      {
        type: "p",
        text: "Yes — provided the importer is established in Switzerland. In that case the label carries the same company twice, once in each capacity, with the roles named separately. This is common among Swiss distributors that also import, and it removes one layer of correspondence between two companies that would otherwise have to keep each other informed.",
      },
      { type: "h2", text: "Five things worth checking before you appoint one" },
      {
        type: "list",
        items: [
          "Registration. Ask for the Swissmedic registration and check that the device families you supply fall inside the scope it covers.",
          "Portfolio. A representative that already carries devices of your type can usually answer for them; one that carries none of them usually cannot.",
          "Who signs. Ask for the named person behind the appointment. In practice that is who your customers' authority will contact.",
          "Document access. Confirm that the full technical documentation — including the sterilisation file where the device is sterile — can be produced within a working week.",
          "Exit. Ask what happens if the appointment ends. The label carries their name, so a resignation means re-labelling, not just a letter.",
        ],
      },
      {
        type: "note",
        text: "Practical rule: the name and address on the label, the name on the Swissmedic registration, and the name on the appointment letter must be the same legal entity, spelled the same way. A mismatch is the first thing an inspector looks for.",
      },
      { type: "h2", text: "Where we sit in this" },
      {
        type: "p",
        text: "We are a supply chain partner, not a regulatory representative. We prepare the artwork and the label wording, assemble the documents the representative will need, and keep the versions aligned when a device or a factory changes. The appointment itself is between you and the Swiss entity: we do not act as a representative and we do not appoint one on your behalf.",
      },
    ],
    translations: { de: CH_REP_DE, fr: CH_REP_FR },
  },
  {
    slug: "class-i-sterile-notified-body",
    no: "02",
    title: "Why a Class I sterile device still needs a notified body",
    dek: "Class I is often read as “no notified body involved”. For sterile and measuring devices that reading is wrong, and the label shows whether the manufacturer got it right.",
    date: "2026-11-16",
    minutes: 5,
    tag: "Classification",
    keyPoints: [
      "The suffixes Is and Im modify Class I without changing it.",
      "Sterility is assessed separately, and that assessment involves a notified body.",
      "The notified body's four-digit number appears next to the CE marking.",
      "A sterile Class I DoC with no notified body reference is incomplete.",
    ],
    blocks: [
      {
        type: "p",
        text: "Class I covers non-invasive devices under Rule 1 of Annex VIII. Two suffixes modify it: Is for devices placed on the market in a sterile condition, and Im for devices with a measuring function. Both keep the Class I designation, and both pull a notified body into a process that Class I ordinarily avoids.",
      },
      { type: "h2", text: "Sterility is not a classification question" },
      {
        type: "p",
        text: "Being sterile is a state that has to be demonstrated, not a box ticked on a classification table. A manufacturer supplying a Class I device sterile has to have the sterilisation aspects assessed, and that assessment is carried out by a notified body under the applicable annex. The outcome is a certificate, and the body's four-digit identification number is printed next to the CE marking.",
      },
      {
        type: "p",
        text: "The same logic applies to a measuring function: the numbers on the device have to be shown to mean something, and that demonstration is also a notified body task. A urine meter is the everyday example — Class I by rule, Im by function.",
      },
      { type: "h2", text: "What it looks like on paper" },
      {
        type: "list",
        items: [
          "The certificate names the notified body and its number, the device family inside its scope, the standards applied, and a validity period.",
          "The Declaration of Conformity must reference that certificate. A sterile Class I declaration with no notified body reference is either incomplete or describes a device that is not in fact supplied sterile.",
          "The label carries the four-digit number only when a notified body is involved. Its absence on a product sold as sterile is the inconsistency to look for.",
        ],
      },
      { type: "h2", text: "What to ask a supplier" },
      {
        type: "list",
        items: [
          "The certificate itself, with the device family visible in its scope — not a summary slide.",
          "Validity dates, and whether a surveillance audit is outstanding.",
          "Whether the certificate covers the sterilisation aspects or only the quality system. These are different claims and both appear in supplier packs.",
          "The name of the sterilisation subcontractor and its own certification. If your authority asks who sterilised the batch, an answer is expected within days.",
        ],
      },
      {
        type: "note",
        text: "A quality system certificate and a device certificate are not interchangeable. One says the factory works to a system; the other says this family of devices has been assessed against the regulation.",
      },
    ],
  },
  {
    slug: "reading-a-declaration-of-conformity",
    no: "03",
    title: "How to read a supplier's Declaration of Conformity",
    dek: "One page, signed by the manufacturer, and it carries more legal weight than the certificate people usually ask for. Six things to check, in order.",
    date: "2026-11-16",
    minutes: 6,
    tag: "Documents",
    keyPoints: [
      "The declaration must identify the device, its class, the standards applied and the notified body where one was involved.",
      "The certificate dates and the signing date are two different things.",
      "The signing date must not predate the certificate it relies on.",
      "Only the manufacturer signs a DoC. A trader cannot issue one on the factory's behalf.",
    ],
    blocks: [
      {
        type: "p",
        text: "The Declaration of Conformity is the manufacturer's own statement that the device meets the regulation, supported by the evidence listed on the same page. It is signed under the manufacturer's responsibility, which is why it is the document to read first and the one to keep.",
      },
      { type: "h2", text: "What has to be on it" },
      {
        type: "list",
        items: [
          "The manufacturer's name and address, and the authorised representative's where one applies.",
          "Identification of the device, sufficient to tie the declaration to the products actually shipped.",
          "The classification and the rule applied.",
          "The standards and common specifications used to demonstrate conformity.",
          "The notified body's name and number and the certificate reference, wherever a notified body was involved.",
          "The place and date of the declaration, and the name and function of the signatory.",
        ],
      },
      { type: "h2", text: "The two dates are not the same date" },
      {
        type: "p",
        text: "A declaration usually shows two sets of dates, and they are routinely read as one. The certificate issue date and expiry belong to the notified body. The place and date at the foot of the page belong to the declaration itself. They are not supposed to match: the declaration must not predate the certificate it relies on, and it must fall inside that certificate's validity. A gap of several months between the two is normal and not a defect.",
      },
      {
        type: "note",
        text: "If a declaration is dated before the certificate it cites, the document is defective regardless of how good the device is — the statement was signed on the strength of a certificate that did not yet exist.",
      },
      { type: "h2", text: "Four things that should make you ask again" },
      {
        type: "list",
        items: [
          "A sterile device whose declaration contains no notified body number anywhere.",
          "Standards listed only as EN ISO 13485 — that is a quality system standard, not a product standard.",
          "A manufacturer address that does not match the label or the certificate.",
          "No place, no date, or no named signatory.",
        ],
      },
      { type: "h2", text: "What to keep, and for how long" },
      {
        type: "p",
        text: "Keep the exact version you were given, with the date you received it, filed against the device. When a certificate is renewed the declaration should be reissued; the earlier one is not false, it is superseded, and being able to show both versions is what turns a question from your authority into a two-minute answer.",
      },
    ],
    translations: { de: DOC_DE },
  },
  {
    slug: "importer-obligations-article-13",
    no: "04",
    title: "The importer's obligations — the name on the label is not a formality",
    dek: "Under the MDR the importer is an economic operator with duties of its own, not a channel for someone else's paperwork.",
    date: "2026-11-16",
    minutes: 5,
    tag: "European Union",
    keyPoints: [
      "The importer verifies the CE marking and the declaration before placing a device on the market.",
      "The importer's name and address go on the device, the packaging or the accompanying document.",
      "Complaints, non-conforming devices and recalls have to be recorded and reported.",
      "Changing importers usually means changing labels, not just invoices.",
    ],
    blocks: [
      {
        type: "p",
        text: "Article 13 of the MDR gives the importer a set of duties that sit alongside the manufacturer's. They are not transferred by a purchase order, and they are not satisfied by holding a copy of someone else's certificate. Four of them matter most in day-to-day trading.",
      },
      { type: "h2", text: "Verify before you place on the market" },
      {
        type: "list",
        items: [
          "That the CE marking is affixed and that a Declaration of Conformity exists for the device.",
          "That the manufacturer is identified, and that the authorised representative is named where the manufacturer is outside the Union.",
          "That the device carries the information the regulation requires, in the languages of the member states where it is supplied.",
          "That the unique device identifier, where applicable, is present and legible.",
        ],
      },
      { type: "h2", text: "Your identity goes on the product" },
      {
        type: "p",
        text: "The importer's name, registered trade name or trademark, and postal address have to appear on the device, on its packaging, or in a document accompanying it. This is why the importer's details are printed on the carton next to the manufacturer's: it tells the authority, and the user, who put the device into circulation in that market.",
      },
      { type: "h2", text: "Storage, transport and traceability" },
      {
        type: "p",
        text: "The importer is responsible for the conditions under which the device is stored and transported while it is under its control. For consumables this is rarely dramatic — but heat, humidity and compression damage are exactly the arguments that follow a complaint about a sterile pack that arrived with a compromised seal.",
      },
      { type: "h2", text: "Complaints, records, and cooperation" },
      {
        type: "p",
        text: "The importer keeps a register of complaints, of non-conforming devices and of recalls, informs the manufacturer and the distributor when it considers or has reason to believe a device is not in conformity, and cooperates with authorities on request. Where a distributor or the authorised representative needs a copy of the declaration or the certificate to answer a question, the importer is expected to provide it.",
      },
      { type: "h2", text: "What changes when the importer changes" },
      {
        type: "p",
        text: "Because the importer's identity is printed on the product, a change of importer is a change of artwork. Quantities already packed carry the old name and are not automatically usable by the new entity. When you plan a switch, plan the label with it — the commercial conversation is much easier before the cartons are printed than after.",
      },
    ],
  },
  {
    slug: "three-documents",
    no: "05",
    title: "CE certificate, ISO 13485 and the DoC are three different documents",
    dek: "They arrive in the same PDF pack, they look similar, and they answer three different questions. Confusing them is the most common mistake in supplier due diligence.",
    date: "2026-11-16",
    minutes: 4,
    tag: "Documents",
    keyPoints: [
      "A CE certificate is issued by a notified body about a device family.",
      "ISO 13485 is issued by a certification body about a management system.",
      "The DoC is issued by the manufacturer about a specific device.",
      "None of the three substitutes for the others, and none of them is a certificate of quality.",
    ],
    blocks: [
      {
        type: "p",
        text: "A supplier pack usually contains three documents with three different issuers, three different scopes and three different expiry rules. Reading them as one document — “they have CE” — is how buyers end up with a certificate that covers syringes when they are buying underpads.",
      },
      {
        type: "table",
        head: ["Document", "Issued by", "What it answers"],
        rows: [
          ["CE certificate", "Notified body", "Has this device family been assessed against the regulation, and within what scope and dates?"],
          ["ISO 13485 certificate", "Certification body", "Does the factory operate a quality management system that conforms to the standard?"],
          ["Declaration of Conformity", "Manufacturer", "Does this specific device conform, on the basis of which evidence, signed by whom and when?"],
        ],
      },
      {
        type: "p",
        text: "The distinction that causes most trouble is the first and the second. A CE certificate names a device family and a regulation. An ISO 13485 certificate names a factory and a standard. A factory can hold a valid ISO 13485 certificate and have no CE certificate for the product you are buying; a CE certificate can be valid for one product family and say nothing about another that shares the same production line.",
      },
      { type: "h2", text: "What to ask for, and when" },
      {
        type: "list",
        items: [
          "At first contact: the DoC and the CE certificate for the device you are actually enquiring about, with the scope readable.",
          "Before the purchase order: validity dates on the certificate, and confirmation that no surveillance audit is overdue.",
          "Before shipment: the batch or sterilisation documentation that ties this production run to the certified process.",
          "On renewal: the reissued DoC, because the earlier one is superseded rather than wrong.",
        ],
      },
      {
        type: "note",
        text: "A trader cannot issue a Declaration of Conformity. If the document you are given is signed by the trading company rather than the manufacturer, it is not a DoC — whatever the heading says.",
      },
      { type: "h2", text: "Reading a pack in five minutes" },
      {
        type: "p",
        text: "Match the device name on the DoC to the device you are buying. Match the manufacturer on the DoC to the manufacturer on the certificate. Match the certificate's scope to the device family. Check the certificate's expiry against today's date. If those four matches hold, the pack is coherent and the remaining questions are commercial. If any of them fails, ask again before you quote your own customer.",
      },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function adjacent(slug: string): { prev?: Article; next?: Article } {
  const i = articles.findIndex((a) => a.slug === slug);
  return { prev: articles[i - 1], next: articles[i + 1] };
}

export function formatDate(iso: string, lang: ResolvedLang = "en"): string {
  const d = new Date(iso);
  const locale = lang === "de" ? "de-CH" : lang === "fr" ? "fr-CH" : "en-GB";
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}
