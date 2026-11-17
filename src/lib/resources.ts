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
  | {
      type: "table";
      head: string[];
      rows: string[][];
    }
  /** Downloadable assets that belong to the note itself — the printed
   *  one-pagers travel with the web version. */
  | { type: "links"; items: { label: string; href: string }[] };

/** Languages a note has been written in. English is the source text and is
 *  never listed here — it is the fallback, not a translation. Italian is used
 *  for the Switzerland notes (Ticino) and for Italian buyers. */
export type ArticleLang = "de" | "fr" | "it";

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
  /** Overview notes carry a wide comparison table that cannot be read inside
   *  the usual 44rem column; those open with a wider page grid. */
  wide?: boolean;
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
  const wanted = (["de", "fr", "it"].includes(lang) ? (lang as ArticleLang) : null);
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
  (["de", "fr", "it"] as ArticleLang[]).forEach((l) => {
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

const CH_REP_IT: ArticleTranslation = {
  title: "Chi può fare da vostro rappresentante svizzero (CH-REP), e a cosa il ruolo vi impegna",
  dek: "Ogni dispositivo che entra in Svizzera dall'esterno richiede un rappresentante autorizzato stabilito in Svizzera. Il ruolo è più ristretto di quello di un distributore e più ampio di un indirizzo postale.",
  tag: "Svizzera",
  keyPoints: [
    "Il rappresentante deve essere stabilito in Svizzera e registrato presso Swissmedic.",
    "Nome e indirizzo figurano sull'etichetta: nominarlo è quindi una decisione di etichettatura.",
    "Un importatore stabilito in Svizzera può assumere entrambi i ruoli, indicati separatamente.",
    "Il rappresentante UE e quello svizzero sono due nomine distinte.",
  ],
  blocks: [
    {
      type: "p",
      text: "Il rappresentante autorizzato svizzero — di norma indicato come CH-REP — è l'operatore economico stabilito in Svizzera che un fabbricante con sede all'esterno nomina per agire in suo nome. Senza di lui, un dispositivo non può essere messo sul mercato svizzero. Il rappresentante deve essere stabilito in Svizzera, registrato presso Swissmedic e indicato sull'etichetta o nelle istruzioni per l'uso.",
    },
    {
      type: "p",
      text: "Il ruolo esiste perché l'autorità ha bisogno di una controparte nel proprio spazio giuridico, che possa essere contattata, che possa produrre la documentazione tecnica e che risponda del dispositivo. Questo è l'intero scopo del ruolo, ed è il criterio da applicare quando si valuta un candidato.",
    },
    { type: "h2", text: "Ciò che il ruolo non è" },
    {
      type: "list",
      items: [
        "Non un indirizzo di postaresto. Ci si attende che il rappresentante risponda in sostanza alle domande sul dispositivo, non che smisti lettere.",
        "Non l'importatore, anche se una stessa azienda può ricoprire entrambi i ruoli. In tal caso le due qualità vanno indicate separatamente sull'etichetta.",
        "Non il rappresentante UE. Le nomine per l'UE e per la Svizzera sono distinte, disciplinate da regole distinte, e l'una non vale per l'altra.",
      ],
    },
    { type: "h2", text: "L'importatore può essere il rappresentante di se stesso" },
    {
      type: "p",
      text: "Sì — a condizione che l'importatore sia stabilito in Svizzera. In quel caso l'etichetta riporta la stessa azienda due volte, una per ciascuna qualità, con i ruoli indicati separatamente. È prassi comune tra i distributori svizzeri che importano, e elimina un livello di corrispondenza tra due aziende che altrimenti dovrebbero tenersi aggiornate a vicenda.",
    },
    { type: "h2", text: "Cinque punti da verificare prima della nomina" },
    {
      type: "list",
      items: [
        "Registrazione. Fatevi mostrare la registrazione presso Swissmedic e verificate che le famiglie di dispositivi che fornite rientrino nell'ambito coperto.",
        "Portafoglio. Un rappresentante che già tratta dispositivi del vostro tipo può in genere risponderne; uno che non ne tratta alcuno, di regola, no.",
        "Chi firma. Chiedete la persona designata dietro la nomina: in pratica è a lei che l'autorità del vostro cliente si rivolgerà.",
        "Accesso ai documenti. Confermate che la documentazione tecnica completa — per i dispositivi sterili, compresa la documentazione di sterilizzazione — possa essere prodotta entro una settimana lavorativa.",
        "Recesso. Chiedete cosa accade quando la nomina termina. Il nome figura sull'etichetta: la risoluzione significa quindi re-etichettatura, non una semplice lettera.",
      ],
    },
    {
      type: "note",
      text: "Regola pratica: il nome e l'indirizzo sull'etichetta, il nome nella registrazione Swissmedic e il nome nella lettera di nomina devono appartenere alla stessa persona giuridica, scritti allo stesso modo. Una discrepanza è la prima cosa che un ispettore va a cercare.",
    },
    { type: "h2", text: "Dove ci collochiamo noi" },
    {
      type: "p",
      text: "Siamo un partner della filiera, non un rappresentante autorizzato. Prepariamo le grafiche e i testi delle etichette, raccogliamo i documenti che il rappresentante dovrà avere e teniamo allineate le versioni quando cambia un dispositivo o uno stabilimento. La nomina stessa avviene tra voi e l'azienda svizzera: non agiamo come rappresentanti e non ne nominiamo alcuno in vostro nome.",
    },
  ],
};

const SWISSDAMED_DE: ArticleTranslation = {
  title: "Die Registrierung in swissdamed ist jetzt Pflicht — was sich für Hersteller im Ausland ändert",
  dek: "Seit dem 1. Juli 2026 registriert die Schweiz Geräte selbst, statt Meldungen entgegenzunehmen. Die Übergangsfrist endet am 31. Dezember 2026, und die Gebühr fällt pro UDI-DI an, nicht pro Lieferung.",
  tag: "Schweiz",
  keyPoints: [
    "Seit dem 1. Juli 2026 müssen Geräte, Systeme und Behandlungseinheiten in swissdamed registriert sein, bevor sie in Verkehr gebracht werden.",
    "Die Registrierung nimmt der Hersteller oder sein Bevollmächtigter vor; ein Distributor kann sie nicht in eigenem Namen erledigen.",
    "Für Geräte, die bereits im Markt sind, läuft die Übergangsfrist bis zum 31. Dezember 2026.",
    "CHF 200 für die erste UDI-DI, CHF 20 für jede weitere, mit einer Obergrenze pro Kalenderjahr.",
  ],
  blocks: [
    {
      type: "p",
      text: "Die Schweiz hat früher mit Meldungen gearbeitet: ein Formular für bestimmte Gerätegruppen, eingereicht, wenn sich etwas änderte. Seit dem 1. Juli 2026 arbeitet sie mit einem Register. swissdamed — das schweizerische Gegenstück zu EUDAMED — übernimmt: Geräte, Systeme und Behandlungseinheiten werden im Modul UDI Devices registriert, bevor sie in Verkehr gebracht werden.",
    },
    {
      type: "p",
      text: "Der Unterschied ist größer, als er klingt. Eine Meldung war ein Schreiben; eine Registrierung ist ein Datensatz, der zum Etikett, zum Zertifikat und zur UDI passen muss. Eine Abweichung, die früher unsichtbar blieb, ist jetzt ein Eintrag, den jeder abfragen kann.",
    },
    { type: "h2", text: "Wer registriert" },
    {
      type: "p",
      text: "Die Registrierung ist ein Akt des Herstellers, ausgeführt über seinen Schweizer Bevollmächtigten. Ein Importeur kann ein Gerät nicht in eigenem Namen registrieren, und ein Distributor nicht im Namen eines Herstellers. Wenn ein Schweizer Kunde sagt, das Gerät sei „schon registriert“, lautet die richtige Rückfrage: von wem.",
    },
    {
      type: "table",
      head: ["Akteur", "Was er in swissdamed tun kann"],
      rows: [
        ["Hersteller im Ausland, über den CH-REP", "Registriert das Gerät und hält den Eintrag aktuell"],
        ["Bevollmächtigter in der Schweiz", "Registriert im Namen des Herstellers; pflegt auch die Daten der Wirtschaftsakteure"],
        ["Importeur in der Schweiz", "Verknüpft sich mit einem bereits registrierten Gerät; legt keinen Geräteeintrag an"],
        ["Distributor", "Kein eigener Geräteeintrag"],
      ],
    },
    { type: "h2", text: "Was der Zeitplan tatsächlich sagt" },
    {
      type: "list",
      items: [
        "1. Juli 2026 — die Registrierung wird Pflicht für Geräte, Systeme und Behandlungseinheiten, deren Verkaufseinheiten nach diesem Datum in Verkehr gebracht werden.",
        "31. Dezember 2026 — Ende der Übergangsfrist für Geräte, die vor dem Juli bereits im Markt waren.",
        "Keine Übergangsfrist gilt für Geräte, die Gegenstand eines schwerwiegenden Vorkommnisses, einer Field Safety Corrective Action oder eines Trendberichts waren: Sie werden sofort registriert.",
        "Meldungen bleiben in wenigen Ecken bestehen — Sonderanfertigungen, umgepackte oder umetikettierte Geräte und Geräte, die in einer Gesundheitseinrichtung hergestellt und dort verwendet werden.",
      ],
    },
    { type: "h2", text: "Was es kostet" },
    {
      type: "p",
      text: "CHF 200 für die erste UDI-DI und CHF 20 für jede weitere mit dem Status „im Markt“, gedeckelt auf CHF 10.000 pro Kalenderjahr. Die ersten Rechnungen gehen ab Januar 2027 hinaus. Für einen Lieferanten mit breitem Katalog ist die Obergrenze die relevante Zahl, für einen Käufer mit einer einzigen Gerätefamilie die 200 Franken.",
    },
    { type: "h2", text: "Der Teil, den niemand eingepreist hat: 2028" },
    {
      type: "p",
      text: "Am 2. März 2026 haben die EU und die Schweiz ein Paket unterzeichnet, das ein Protokoll zur Änderung des Abkommens über die gegenseitige Anerkennung enthält. Wird es ratifiziert, wäre die CE-Zertifizierung wieder auf beiden Seiten anerkannt — und, das ist der Punkt, die Pflicht zum CH-REP dürfte mit der entsprechenden Änderung der MepV entfallen. Mit einem Inkrafttreten ist nicht vor 2028 zu rechnen, und bis dahin ändert sich nichts.",
    },
    {
      type: "p",
      text: "Daraus ergibt sich eine merkwürdige geschäftliche Lage: Die Rolle ist heute Pflicht und wahrscheinlich befristet. Wer jetzt einen Bevollmächtigten bestellt, entscheidet über die Vertragslaufzeit. Eine fünfjährige Exklusivbestellung, 2026 unterschrieben, kann die Pflicht überleben, für die sie unterschrieben wurde.",
    },
    {
      type: "note",
      text: "Bis zur Ratifizierung gilt Art. 51 MepV ohne Einschränkung: Jedes Gerät von außerhalb der Schweiz braucht einen Bevollmächtigten in der Schweiz, unabhängig von der Klasse — auch Geräte, die noch auf älteren Zertifikaten im Markt sind.",
    },
    { type: "h2", text: "Wo wir in diesem Bild stehen" },
    {
      type: "p",
      text: "Wir bereiten die Registrierungsdaten vor — die UDI-DI, die Basic UDI-DI, die dazu passende Druckvorlage des Etiketts — und halten Zertifikat und Konformitätserklärung des Werks in dem Paket aktuell, das wir übergeben. Die Registrierung selbst nimmt der Hersteller oder sein Bevollmächtigter vor: Wir führen kein Konto und registrieren keine Geräte in fremdem Namen.",
    },
  ],
};

const SWISSDAMED_FR: ArticleTranslation = {
  title: "L'enregistrement dans swissdamed est désormais obligatoire — ce qui change pour un fabricant hors de Suisse",
  dek: "Depuis le 1er juillet 2026, la Suisse enregistre elle-même les dispositifs au lieu de recevoir des notifications. La période transitoire court jusqu'au 31 décembre 2026, et l'émolument se paie par UDI-DI, non par livraison.",
  tag: "Suisse",
  keyPoints: [
    "Depuis le 1er juillet 2026, les dispositifs, systèmes et trousses doivent être enregistrés dans swissdamed avant leur mise sur le marché.",
    "L'enregistrement est fait par le fabricant ou son mandataire ; un distributeur ne peut pas le faire en son propre nom.",
    "Pour les dispositifs déjà sur le marché, la période transitoire court jusqu'au 31 décembre 2026.",
    "200 CHF pour le premier UDI-DI, 20 CHF par UDI-DI supplémentaire, avec un plafond annuel.",
  ],
  blocks: [
    {
      type: "p",
      text: "La Suisse fonctionnait par notifications : un formulaire pour certains groupes de dispositifs, déposé lorsque quelque chose changeait. Depuis le 1er juillet 2026, elle fonctionne par registre. swissdamed — l'équivalent suisse d'EUDAMED — prend le relais : les dispositifs, systèmes et trousses sont enregistrés dans le module UDI Devices avant leur mise sur le marché.",
    },
    {
      type: "p",
      text: "La différence est plus grande qu'elle n'en a l'air. Une notification était une lettre ; un enregistrement est une fiche qui doit correspondre à l'étiquette, au certificat et à l'UDI. Un écart qui restait invisible est désormais une entrée que n'importe qui peut interroger.",
    },
    { type: "h2", text: "Qui l'enregistre" },
    {
      type: "p",
      text: "L'enregistrement est un acte du fabricant, exécuté par son mandataire suisse. Un importateur ne peut pas enregistrer un dispositif en son nom, et un distributeur ne peut pas le faire au nom d'un fabricant. Si un client suisse affirme que le dispositif est « déjà enregistré », la bonne question est : par qui ?",
    },
    {
      type: "table",
      head: ["Opérateur", "Ce qu'il peut faire dans swissdamed"],
      rows: [
        ["Fabricant hors de Suisse, via le CH-REP", "Enregistre le dispositif et tient la fiche à jour"],
        ["Mandataire en Suisse", "Enregistre au nom du fabricant ; tient aussi les données des opérateurs économiques"],
        ["Importateur en Suisse", "Se lie à un dispositif déjà enregistré ; ne crée pas la fiche du dispositif"],
        ["Distributeur", "Aucune fiche de dispositif en son nom"],
      ],
    },
    { type: "h2", text: "Ce que dit réellement le calendrier" },
    {
      type: "list",
      items: [
        "1er juillet 2026 — l'enregistrement devient obligatoire pour les dispositifs, systèmes et trousses dont les unités de vente sont mises sur le marché après cette date.",
        "31 décembre 2026 — fin de la période transitoire pour les dispositifs déjà sur le marché avant juillet.",
        "Aucune période transitoire pour les dispositifs ayant fait l'objet d'un incident grave, d'une action corrective de sécurité ou d'un rapport de tendance : ceux-là s'enregistrent immédiatement.",
        "Les notifications subsistent dans quelques cas — dispositifs sur mesure, dispositifs reconditionnés ou réétiquetés, et dispositifs fabriqués et utilisés au sein d'un établissement de santé.",
      ],
    },
    { type: "h2", text: "Ce que cela coûte" },
    {
      type: "p",
      text: "200 CHF pour le premier UDI-DI et 20 CHF pour chaque UDI-DI supplémentaire au statut « sur le marché », avec un plafond de 10 000 CHF par année civile. Les premières factures partiront en janvier 2027. Pour un fournisseur à large catalogue, le plafond est le chiffre qui compte ; pour un acheteur d'une seule famille de dispositifs, les 200 francs.",
    },
    { type: "h2", text: "La partie que personne n'a intégrée : 2028" },
    {
      type: "p",
      text: "Le 2 mars 2026, l'UE et la Suisse ont signé un paquet comprenant un protocole modifiant l'accord de reconnaissance mutuelle. S'il est ratifié, la certification CE serait de nouveau reconnue de part et d'autre — et, c'est le point, l'obligation de mandataire suisse devrait tomber avec la modification correspondante de l'ODim. L'entrée en vigueur n'est pas attendue avant 2028, et rien ne change d'ici là.",
    },
    {
      type: "p",
      text: "D'où une situation commerciale étrange : le rôle est obligatoire aujourd'hui et probablement temporaire. Nommer un mandataire maintenant, c'est décider d'une durée. Une désignation exclusive de cinq ans signée en 2026 peut survivre à l'obligation qui l'a justifiée.",
    },
    {
      type: "note",
      text: "Jusqu'à la ratification, l'art. 51 ODim s'applique sans réserve : tout dispositif venant de l'étranger exige un mandataire en Suisse, quelle que soit sa classe — y compris les dispositifs encore vendus sur des certificats plus anciens.",
    },
    { type: "h2", text: "Notre place dans tout cela" },
    {
      type: "p",
      text: "Nous préparons les données d'enregistrement — l'UDI-DI, le Basic UDI-DI, le fichier d'étiquette qui doit y correspondre — et nous maintenons à jour le certificat et la déclaration de conformité de l'usine dans le dossier remis. L'enregistrement lui-même est fait par le fabricant ou son mandataire : nous ne détenons pas de compte et nous n'enregistrons aucun dispositif au nom d'autrui.",
    },
  ],
};

const SWISSDAMED_IT: ArticleTranslation = {
  title: "La registrazione in swissdamed è ormai obbligatoria — cosa cambia per un fabbricante extra-Svizzera",
  dek: "Dal 1° luglio 2026 la Svizzera registra essa stessa i dispositivi invece di ricevere notifiche. La transizione termina il 31 dicembre 2026 e l'émolumento si paga per UDI-DI, non per spedizione.",
  tag: "Svizzera",
  keyPoints: [
    "Dal 1° luglio 2026 i dispositivi, i sistemi e le procedure pack devono essere registrati in swissdamed prima della messa sul mercato.",
    "La registrazione è fatta dal fabbricante o dal suo rappresentante; un distributore non può farla in proprio nome.",
    "Per i dispositivi già sul mercato la transizione corre fino al 31 dicembre 2026.",
    "200 CHF per il primo UDI-DI, 20 CHF per ognuno degli altri, con un tetto per anno civile.",
  ],
  blocks: [
    {
      type: "p",
      text: "La Svizzera funzionava a notifiche: un modulo per certi gruppi di dispositivi, presentato quando qualcosa cambiava. Dal 1° luglio 2026 funziona a registro. swissdamed — la controparte svizzera di EUDAMED — subentra: i dispositivi, i sistemi e le procedure pack si registrano nel modulo UDI Devices prima della messa sul mercato.",
    },
    {
      type: "p",
      text: "La differenza è più grande di quanto sembri. Una notifica era una lettera; una registrazione è una scheda che deve corrispondere all'etichetta, al certificato e all'UDI. E una discrepanza che prima restava invisibile è oggi una voce che chiunque può interrogare.",
    },
    { type: "h2", text: "Chi la effettua" },
    {
      type: "p",
      text: "La registrazione è un atto del fabbricante, espletato attraverso il suo rappresentante svizzero. Un importatore non può registrare un dispositivo in proprio nome, né un distributore può farlo per conto di un fabbricante. Se un cliente svizzero dichiara che il dispositivo è «già registrato», la domanda giusta è: da chi.",
    },
    {
      type: "table",
      head: ["Operatore", "Cosa può fare in swissdamed"],
      rows: [
        ["Fabbricante estero, tramite il CH-REP", "Registra il dispositivo e tiene la scheda aggiornata"],
        ["Rappresentante in Svizzera", "Registra per conto del fabbricante; cura anche i dati degli operatori economici"],
        ["Importatore in Svizzera", "Collega se stesso a un dispositivo già registrato; non crea la scheda del dispositivo"],
        ["Distributore", "Nessuna scheda di dispositivo in proprio nome"],
      ],
    },
    { type: "h2", text: "Ciò che il calendario dice davvero" },
    {
      type: "list",
      items: [
        "1° luglio 2026 — la registrazione diventa obbligatoria per dispositivi, sistemi e procedure pack le cui unità di vendita sono messe sul mercato dopo tale data.",
        "31 dicembre 2026 — fine della transizione per i dispositivi già sul mercato prima di luglio.",
        "Nessuna transizione per i dispositivi oggetto di un evento grave, di un'azione correttiva di sicurezza o di un rapporto di tendenza: questi si registrano immediatamente.",
        "Le notifiche sopravvivono in pochi casi — dispositivi su misura, dispositivi riprocessati o rietichettati e dispositivi fabbricati e utilizzati all'interno di una struttura sanitaria.",
      ],
    },
    { type: "h2", text: "Quanto costa" },
    {
      type: "p",
      text: "200 CHF per il primo UDI-DI e 20 CHF per ogni UDI-DI successivo con lo status «sul mercato», con un tetto di 10.000 CHF per anno civile. Le prime fatture partono da gennaio 2027. Per un fornitore con un catalogo ampio il numero che conta è il tetto; per un acquirente con una sola famiglia di dispositivi, i 200 franchi.",
    },
    { type: "h2", text: "La parte che nessuno ha messo a preventivo: il 2028" },
    {
      type: "p",
      text: "Il 2 marzo 2026 l'UE e la Svizzera hanno firmato un pacchetto che comprende un protocollo che modifica l'accordo di mutuo riconoscimento. Se ratificato, la certificazione CE tornerebbe riconosciuta su entrambi i lati — e, questo è il punto, l'obbligo del CH-REP dovrebbe cadere con la modifica corrispondente dell'ODim. L'entrata in vigore non è attesa prima del 2028, e fino ad allora nulla cambia.",
    },
    {
      type: "p",
      text: "Di qui una situazione commerciale singolare: il ruolo oggi è obbligatorio e probabilmente temporaneo. Nominare un rappresentante adesso è anche una decisione sulla durata del contratto. Una nomina esclusiva di cinque anni firmata nel 2026 può sopravvivere all'obbligo che l'ha giustificata.",
    },
    {
      type: "note",
      text: "Fino alla ratifica, l'art. 51 ODim si applica senza riserve: ogni dispositivo proveniente dall'esterno richiede un rappresentante in Svizzera, qualunque sia la sua classe — compresi i dispositivi ancora commercializzati sulla base di certificati più datati.",
    },
    { type: "h2", text: "Dove ci collochiamo noi" },
    {
      type: "p",
      text: "Prepariamo i dati per la registrazione — l'UDI-DI, il Basic UDI-DI e la grafica dell'etichetta che deve corrispondervi — e teniamo aggiornati certificato e dichiarazione di conformità dello stabilimento nel fascicolo che consegniamo. La registrazione la effettua il fabbricante o il suo rappresentante: noi non deteniamo alcun conto e non registriamo dispositivi in nome di altri.",
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
    translations: { de: CH_REP_DE, fr: CH_REP_FR, it: CH_REP_IT },
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
  {
    slug: "uk-ce-marking-indefinite-recognition",
    no: "06",
    title: "The UK dropped the deadline, not the paperwork",
    dek: "In October 2026 Great Britain stopped requiring a UKCA mark alongside CE. Registration, the responsible person and the post-market duties all stayed — and Northern Ireland never left the EU system at all.",
    date: "2026-11-16",
    minutes: 7,
    tag: "United Kingdom",
    keyPoints: [
      "CE certificates under the EU MDR or IVDR are now accepted in Great Britain without an end date.",
      "Registration with the MHRA and a UK Responsible Person are still required before the device is placed on the GB market.",
      "Northern Ireland follows EU rules: CE only, UKCA not accepted, plus UKNI where a UK body assesses.",
      "Devices still certified only under the older EU directives keep their earlier cut-off dates.",
    ],
    blocks: [
      {
        type: "p",
        text: "On 21 October 2026 the MHRA confirmed that medical devices certified under the EU MDR or IVDR can be placed on the Great Britain market on a long-term basis, with no further deadline to obtain a UKCA mark. Read as a headline, the UK has moved back towards the EU. Read as an operating instruction, rather less has changed than the headline suggests.",
      },
      {
        type: "p",
        text: "Great Britain — England, Scotland and Wales — runs its own law, the Medical Devices Regulations 2002. What the announcement removed is the compulsion to hold a second, UK-issued certificate. What it did not remove is the requirement to be registered, to have someone inside the country answerable for the device, and to keep watching the device once it is in use.",
      },
      { type: "h2", text: "What changed, and what it is worth" },
      {
        type: "list",
        items: [
          "CE certificates issued under the EU MDR or IVDR are recognised without an end date. A manufacturer no longer has to budget for a UKCA assessment simply to keep selling into Great Britain.",
          "UKCA remains available as a domestic route. It has become a commercial choice rather than a deadline.",
          "Devices still placed on the market under the older EU directives stay on the earlier timetable: the sooner of the certificate's expiry or 30 June 2028 for general devices.",
          "More than nine in ten devices registered for use in Great Britain are CE marked, which is why the announcement was framed as continuity rather than as reform.",
        ],
      },
      { type: "h2", text: "What the announcement did not touch" },
      {
        type: "table",
        head: ["Requirement", "Who carries it", "Where it is written"],
        rows: [
          [
            "Registration before the device is placed on the market",
            "The manufacturer, or the UK Responsible Person on its behalf",
            "UK MDR 2002, regulation 7A; MHRA registration service",
          ],
          [
            "A UK Responsible Person for any manufacturer outside the UK",
            "The manufacturer appoints one; it must be a single named entity",
            "UK MDR 2002, regulation 7A(2)(a)(ii)",
          ],
          [
            "Technical documentation and the DoC kept available for inspection",
            "The UK Responsible Person holds copies",
            "UK MDR 2002, regulation 7A(3)",
          ],
          [
            "Post-market surveillance and incident reporting",
            "The manufacturer, with the Responsible Person relaying",
            "MHRA guidance, strengthened since June 2025",
          ],
        ],
      },
      {
        type: "p",
        text: "Registration is the point that catches suppliers. It is not approval, and the MHRA says so in its own guidance: it confers no certification and no right to use the agency's name on a label or a brochure. What it does is place the device on a list the authority can act against — which is why a device can be perfectly CE compliant and still not lawfully sellable in Great Britain.",
      },
      { type: "h2", text: "Great Britain is not the United Kingdom" },
      {
        type: "p",
        text: "Northern Ireland is not in the same position. Under the Windsor Framework it continues to apply EU rules: CE marking, the EU MDR, and an authorised representative established in the EU or in Northern Ireland. UKCA is not accepted there. Where a UK approved body carries out the assessment, the device carries UKNI alongside CE.",
      },
      {
        type: "p",
        text: "Two consequences follow for anyone shipping into both. A Northern Ireland customer is, for regulatory purposes, an EU customer. And since 28 May 2026 registration for the Northern Ireland market runs through EUDAMED rather than the MHRA system — custom-made devices excepted.",
      },
      { type: "h2", text: "What to ask before you quote a UK customer" },
      {
        type: "list",
        items: [
          "Which mark is on the device, and under which regulation was it certified? An MDR certificate and an MDD certificate now sit on different timelines.",
          "Who is the UK Responsible Person, and can they produce the registration? Ask for the registration, not for an assurance that it exists.",
          "Is the device registered for Great Britain, or only for Northern Ireland? The two answers come from different systems.",
          "Whose name is on the label? A UKCA-marked device carries the Responsible Person; a CE-marked device carries the EU representative. Confirm which applies before the artwork is signed off.",
          "When does the certificate expire, and is the surveillance audit current? Indefinite recognition of CE is not indefinite validity of a certificate.",
        ],
      },
      {
        type: "note",
        text: "A trading company cannot be a UK Responsible Person, and cannot register a device in a manufacturer's name. If a supplier offers to “handle UK registration” without naming the entity that holds the appointment, that claim is worth checking before the order, not after.",
      },
      { type: "h2", text: "What this means for a Class I sterile device" },
      {
        type: "p",
        text: "For the products most often bought from us — sterile Class I consumables — the CE certificate issued after a notified body assessment of the sterilisation aspects is exactly the certificate Great Britain now accepts. The assessment work is already done. What remains is administrative: a registration, a named responsible person, an English label, and a post-market file that someone actually maintains. Administrative work of that kind is what stops shipments at the border, because it fails quietly.",
      },
      { type: "h2", text: "Where we sit in this" },
      {
        type: "p",
        text: "We supply from factories that hold CE certification under the MDR, and we hand over the certificate, the DoC and the sterilisation documents as the factory issues them. Appointing a UK Responsible Person, registering the device and maintaining the post-market file belong to the manufacturer and to the entity it appoints: we do not act in that capacity, and we do not register devices in anyone's name.",
      },
    ],
  },
  {
    slug: "swissdamed-registration-2026",
    no: "07",
    title: "Switzerland now registers devices itself, and the fee is per UDI-DI",
    dek: "Since 1 July 2026 swissdamed replaces the old notification forms. The transition closes on 31 December 2026 — and the appointment behind the registration has an expiry date of its own.",
    date: "2026-11-16",
    minutes: 5,
    tag: "Switzerland",
    keyPoints: [
      "Since 1 July 2026 devices, systems and procedure packs must be registered in swissdamed before they are placed on the market.",
      "The registration is made by the manufacturer or its Swiss representative; a distributor cannot make it in its own name.",
      "Devices already on the market have until 31 December 2026 to be registered.",
      "CHF 200 for the first UDI-DI, CHF 20 for each further one, capped per calendar year.",
    ],
    blocks: [
      {
        type: "p",
        text: "Switzerland used to run on notifications: a form for certain device groups, filed whenever something changed. Since 1 July 2026 it runs on a register. swissdamed — the Swiss counterpart to EUDAMED — takes over, and devices, systems and procedure packs are registered in its UDI Devices module before they are placed on the market.",
      },
      {
        type: "p",
        text: "The difference is larger than it sounds. A notification was a letter. A registration is a record that has to match the label, the certificate and the UDI — and a mismatch that used to stay invisible is now an entry anyone can query.",
      },
      { type: "h2", text: "Who makes the registration" },
      {
        type: "p",
        text: "Registration is an act of the manufacturer, carried out through its Swiss authorised representative. An importer cannot register a device in its own name, and a distributor cannot register on a manufacturer's behalf. When a Swiss customer says the device is “already registered”, the question worth asking is: by whom.",
      },
      {
        type: "table",
        head: ["Operator", "What it can do in swissdamed"],
        rows: [
          ["Manufacturer outside Switzerland, via the CH-REP", "Registers the device and keeps the entry current"],
          ["Swiss authorised representative", "Registers on the manufacturer's behalf; also maintains the economic-operator records"],
          ["Swiss importer", "Links itself to a device already registered; does not create the device entry"],
          ["Distributor", "No device entry of its own"],
        ],
      },
      { type: "h2", text: "What the timetable actually says" },
      {
        type: "list",
        items: [
          "1 July 2026 — registration becomes mandatory for devices, systems and procedure packs whose sales units are placed on the market after that date.",
          "31 December 2026 — end of the transition for devices that were already on the market before July.",
          "No transition at all for devices that have been the subject of a serious incident, a field safety corrective action or a trend report: those are registered immediately.",
          "Notifications survive in a few corners — custom-made devices, repackaged or relabelled devices, and devices manufactured and used inside a health institution.",
        ],
      },
      { type: "h2", text: "What it costs" },
      {
        type: "p",
        text: "CHF 200 for the first UDI-DI and CHF 20 for each additional one with the status “on the market”, capped at CHF 10,000 per calendar year. The first invoices go out from January 2027. For a supplier with a broad catalogue the cap is the number that matters; for a buyer with a single device family it is the 200 francs.",
      },
      { type: "h2", text: "The part nobody has priced in: 2028" },
      {
        type: "p",
        text: "On 2 March 2026 the EU and Switzerland signed a package that includes a protocol amending the mutual recognition agreement. If it is ratified, CE certification would again be recognised on both sides — and, this is the point, the CH-REP requirement is expected to fall away with the corresponding amendment of the MepV. Entry into force is not expected before 2028, and nothing changes until then.",
      },
      {
        type: "p",
        text: "Which produces an odd commercial situation: the role is mandatory today and probably temporary. Appointing a representative now is also a decision about contract length. A five-year exclusive appointment signed in 2026 can outlive the obligation that justified it.",
      },
      {
        type: "note",
        text: "Until ratification, Article 51 MepV applies without qualification: every device from outside Switzerland needs a representative in Switzerland, whatever its class — including devices still sold on older certificates.",
      },
      { type: "h2", text: "Where we sit in this" },
      {
        type: "p",
        text: "We prepare the registration data — the UDI-DI, the basic UDI-DI, and the label artwork that has to match them — and we keep the factory's certificate and DoC current in the pack we hand over. The registration itself is made by the manufacturer or its representative: we hold no account, and we do not register devices in anyone's name.",
      },
    ],
    translations: { de: SWISSDAMED_DE, fr: SWISSDAMED_FR, it: SWISSDAMED_IT },
  },
  {
    slug: "ce-is-not-a-global-passport",
    no: "08",
    title: "CE is a European answer to a European question",
    dek: "A CE certificate says whether a device may be placed on the European market. A buyer in Riyadh, Toronto or Seoul is asking something else, and the same PDF will not answer it.",
    date: "2026-11-16",
    minutes: 5,
    tag: "Other markets",
    keyPoints: [
      "CE marking is recognised in the EU and the EEA. Outside them it is evidence, not permission.",
      "Most markets require a registration held by an entity established there — and that entity is not the exporter.",
      "Several authorities accept a CE certificate as an input to their own review. None accept it as a substitute for it.",
      "The honest answer to “can you ship to my country” is a list of what the importer must already hold.",
    ],
    blocks: [
      {
        type: "p",
        text: "A CE certificate issued under the MDR is a statement about Europe: the device has been assessed against European requirements and may be placed on the European market. It travels well as evidence. It does not travel as permission.",
      },
      {
        type: "p",
        text: "The confusion is understandable, because the document looks like a passport — a formal paper, an accredited issuer, a number, a validity period. The difference is that a passport is addressed to border posts everywhere, while a certificate is addressed to one legal order.",
      },
      { type: "h2", text: "What other markets actually ask for" },
      {
        type: "table",
        head: ["Market", "What the importer must hold", "What CE does there"],
        rows: [
          ["United States", "FDA establishment registration and device listing; a 510(k) clearance for most Class II devices; a US agent", "Nothing formal: the FDA reviews against its own requirements"],
          ["Canada", "A medical device licence for the device, and an establishment licence for the importer", "Supports the file; does not replace the licence"],
          ["Australia", "An ARTG entry held by an Australian sponsor", "Taken as part of the conformity evidence"],
          ["Saudi Arabia", "An SFDA authorisation with a Saudi authorised representative", "One input among several"],
          ["Brazil", "An ANVISA registration with a Brazilian registration holder", "Considered, but a national dossier is still required"],
          ["Japan", "Approval, and a marketing authorisation holder established in Japan", "Rarely sufficient on its own"],
        ],
      },
      {
        type: "p",
        text: "The pattern is the same in every row: a local entity holds the permission, and the permission is granted under local law. The certificate you already have shortens the work. It does not do the work.",
      },
      { type: "h2", text: "Four questions that keep a quote honest" },
      {
        type: "list",
        items: [
          "Who holds the registration in that country, and is it held for this device — not for a similar one?",
          "Which parts of the file has that authority already accepted, and which will it want re-issued in its own language?",
          "Who is the importer of record, and does it hold the licence the registration depends on?",
          "What happens at the border if the registration lapses between the order and the arrival?",
        ],
      },
      {
        type: "note",
        text: "“We can ship anywhere” is usually wrong in a way that only surfaces at customs. “We ship to the EU, Switzerland and the UK, and for other markets we tell you what your importer has to hold” is shorter, true, and loses only the orders that would have failed later.",
      },
      { type: "h2", text: "What a trading company can honestly promise" },
      {
        type: "p",
        text: "The boundary is simple. We can state what the factory holds, in which scope, and until when. We can prepare the documents a registration needs. We cannot hold a registration in a country where we have no establishment, and we cannot sign as importer of record in a jurisdiction where we are not the importer.",
      },
      {
        type: "p",
        text: "Where a market matters commercially, the workable arrangement is a local partner who holds the registration and an agreed split of the file. That arrangement is worth setting up before the first order rather than after the container has sailed — and it is the reason we quote market by market instead of quoting “worldwide”.",
      },
    ],
  },
  {
    slug: "market-access-at-a-glance",
    no: "09",
    title: "Market access at a glance: one file, five situations",
    dek: "A CE certificate is only ever an answer to one market's question. This page lays the five situations our buyers ship into side by side — what each market accepts, who must be established there, what has to be registered, and what the certificate is actually worth.",
    date: "2026-11-17",
    minutes: 6,
    tag: "Overview",
    wide: true,
    keyPoints: [
      "The EU file is the baseline. Every other market is the baseline plus — or minus — one local role.",
      "Northern Ireland follows EU rules, not Great Britain's: CE only, UKCA not accepted.",
      "In Great Britain a CE certificate now carries over; what remains is administrative.",
      "Outside Europe, CE is evidence for the file — never the whole file.",
    ],
    blocks: [
      {
        type: "p",
        text: "A certificate is only ever an answer to one market's question. Buyers who ship into several markets at once end up maintaining several versions of the same file, and the differences between them are where consignments get stuck. This page lays the five situations side by side. It mirrors the one-page briefing we send with quotations; the printed versions are linked at the end.",
      },
      {
        type: "table",
        head: ["", "European Union (27 + EEA)", "Switzerland", "Great Britain (GB)", "Northern Ireland (NI)", "Other markets"],
        rows: [
          [
            "What the market accepts",
            "CE under the EU MDR or IVDR. Sterile and measuring Class I devices need a notified body.",
            "CE is recognised. A Swiss representative is required until the updated MRA applies — 2028 at the earliest.",
            "CE (MDR/IVDR) recognised indefinitely since 21 October 2026. UKCA is optional.",
            "EU rules continue: CE only. UKCA is not accepted; UKNI is added where a UK body assesses.",
            "National approval. CE is not permission outside Europe.",
          ],
          [
            "Someone established there",
            "EU authorised representative (Art. 11) and a named importer (Art. 13).",
            "Swiss representative (MepV Art. 51). The importer may hold both roles, labelled separately.",
            "UK Responsible Person — one named entity for the whole portfolio.",
            "Representative established in the EU or in Northern Ireland.",
            "Local registration holder or authorised representative.",
          ],
          [
            "Registration before sale",
            "EUDAMED: economic operators and devices, phased in by class.",
            "swissdamed, mandatory since 1 July 2026 (transition ends 31 December 2026). CHF 200 for the first UDI-DI.",
            "MHRA registration before the device is placed on the market.",
            "EUDAMED (since 28 May 2026) instead of the MHRA system.",
            "National registration before import: FDA, Health Canada, TGA, SFDA, ANVISA, PMDA.",
          ],
          [
            "Label languages",
            "Official language(s) of the destination country.",
            "German, French or Italian, by sales region.",
            "English.",
            "English, under EU labelling rules.",
            "Local language requirements, market by market.",
          ],
          [
            "Your CE certificate",
            "The full admission ticket.",
            "Carries over, plus a representative and a registration.",
            "Carries over; what remains is administrative.",
            "The same as the EU — an NI buyer is, for compliance, an EU buyer.",
            "Evidence for the file. Never the whole file.",
          ],
        ],
      },
      {
        type: "h2",
        text: "How to read the table",
      },
      {
        type: "p",
        text: "The EU column is the baseline. Switzerland is the baseline plus one local role plus one registration. Great Britain is the baseline with a lighter paperwork stack on top — since October 2026, a CE certificate accepted indefinitely and a registration with the MHRA. Northern Ireland is not a variant of Great Britain at all: for compliance it is the EU, and the label logic follows. Everything in the last column is a different regime, in which CE is supporting evidence at best.",
      },
      {
        type: "p",
        text: "Two dates are worth keeping in one's head: 31 December 2026, when the swissdamed transition ends in Switzerland, and 30 June 2028, when certificates issued under the old MDD directives stop being accepted in Great Britain.",
      },
      {
        type: "h2",
        text: "What we do",
      },
      {
        type: "list",
        items: [
          "State which documents the manufacturing plant holds, in which scope, and until when.",
          "Prepare the label artwork and the registration data — UDI-DI, basic UDI-DI, and the languages each market needs.",
          "Keep the certificate, the DoC and the label aligned when a device or a factory changes.",
        ],
      },
      {
        type: "h2",
        text: "What stays with you",
      },
      {
        type: "list",
        items: [
          "Appointing representatives, registering devices, holding import licences, signing as importer of record.",
          "A trading company cannot do any of these in your name.",
          "Any supplier who offers to “handle registration” without naming the legal entity is worth checking before the order, not after it.",
        ],
      },
      {
        type: "h2",
        text: "One source per market",
      },
      {
        type: "list",
        items: [
          "European Union: MDR Articles 10, 11 and 13.",
          "Switzerland: MepV Article 51, and Swissmedic's swissdamed pages.",
          "United Kingdom: MHRA, “Regulating medical devices in the UK”.",
          "Other markets: the authority's own import checklist, per country, when an order is real.",
        ],
      },
      {
        type: "h2",
        text: "The printed page",
      },
      {
        type: "p",
        text: "The same table is also available as a single-page A4 landscape PDF, ready to attach to an email or enclose with a quotation:",
      },
      {
        type: "links",
        items: [
          { label: "Market access at a glance (PDF, English)", href: "/files/market-access-one-pager.pdf" },
          { label: "Accès aux marchés en un coup d'œil (PDF, français)", href: "/files/market-access-one-pager-fr.pdf" },
          { label: "Marktzugang auf einen Blick (PDF, Deutsch)", href: "/files/market-access-one-pager-de.pdf" },
        ],
      },
    ],
    translations: {
      de: {
        title: "Marktzugang auf einen Blick: eine Akte, fünf Situationen",
        dek: "Ein CE-Zertifikat ist immer nur die Antwort auf die Frage eines Marktes. Diese Seite stellt die fünf Situationen nebeneinander, in die unsere Käufer liefern — und sagt klar, wer was halten muss.",
        tag: "Überblick",
        minutes: 6,
        keyPoints: [
          "Die EU-Akte ist die Basis. Jeder andere Markt ist die Basis plus — oder minus — eine lokale Rolle.",
          "Nordirland folgt den EU-Regeln, nicht denen Grossbritanniens: nur CE, UKCA wird nicht akzeptiert.",
          "In Grossbritannien gilt ein CE-Zertifikat weiterhin; übrig bleibt Verwaltung.",
          "Außerhalb Europas ist CE ein Nachweis für die Akte — nie die ganze Akte.",
        ],
        blocks: [
          {
            type: "p",
            text: "Ein Zertifikat ist immer nur die Antwort auf die Frage eines Marktes. Wer in mehrere Märkte gleichzeitig liefert, pflegt mehrere Versionen derselben Akte — und in den Unterschieden zwischen ihnen bleiben Sendungen hängen. Diese Seite stellt die fünf Situationen nebeneinander. Sie entspricht der einseitigen Kurzinfo, die wir mit Angeboten senden; die gedruckten Fassungen sind am Ende verlinkt.",
          },
          {
            type: "table",
            head: ["", "Europäische Union (27 + EWR)", "Schweiz", "Grossbritannien (GB)", "Nordirland (NI)", "Andere Märkte"],
            rows: [
              [
                "Was der Markt akzeptiert",
                "CE nach der EU-MDR oder IVDR. Sterile und messtechnische Klasse-I-Produkte benötigen eine Benannte Stelle.",
                "CE wird anerkannt. Ein Bevollmächtigter in der Schweiz bleibt erforderlich, bis das revidierte MRA anwendbar ist — frühestens 2028.",
                "CE (MDR/IVDR) unbefristet anerkannt seit 21. Oktober 2026. UKCA ist optional.",
                "EU-Regeln gelten weiter: nur CE. UKCA wird nicht akzeptiert; UKNI kommt hinzu, wo eine britische Stelle bewertet.",
                "Nationale Zulassung. CE ist außerhalb Europas keine Verkehrszulassung.",
              ],
              [
                "Ansässige Person vor Ort",
                "EU-Bevollmächtigter (Art. 11) und ein namentlich genannter Importeur (Art. 13).",
                "Schweizer Bevollmächtigter (MepV Art. 51). Der Importeur kann beide Rollen innehaben, getrennt gekennzeichnet.",
                "UK Responsible Person — eine namentlich genannte Einheit für das gesamte Portfolio.",
                "Bevollmächtigter mit Sitz in der EU oder in Nordirland.",
                "Lokaler Registrierungsinhaber oder Bevollmächtigter.",
              ],
              [
                "Registrierung vor dem Verkauf",
                "EUDAMED: Wirtschaftsbeteiligte und Produkte, klassenweise eingeführt.",
                "swissdamed, verpflichtend seit 1. Juli 2026 (Übergangsfrist endet am 31. Dezember 2026). CHF 200 für die erste UDI-DI.",
                "MHRA-Registrierung, bevor das Produkt in Verkehr gebracht wird.",
                "EUDAMED (seit 28. Mai 2026) statt des MHRA-Systems.",
                "Nationale Registrierung vor der Einfuhr: FDA, Health Canada, TGA, SFDA, ANVISA, PMDA.",
              ],
              [
                "Etikettensprachen",
                "Amtssprache(n) des Bestimmungslandes.",
                "Deutsch, Französisch oder Italienisch, je nach Verkaufsregion.",
                "Englisch.",
                "Englisch, nach den EU-Kennzeichnungsregeln.",
                "Lokale Sprachanforderungen, Markt für Markt.",
              ],
              [
                "Ihr CE-Zertifikat",
                "Das vollständige Einlassticket.",
                "Gilt weiter — zusätzlich ein Bevollmächtigter und eine Registrierung.",
                "Gilt weiter; übrig bleibt Verwaltung.",
                "Wie in der EU — ein NI-Käufer ist, compliance-mässig, ein EU-Käufer.",
                "Nachweis für die Akte. Nie die ganze Akte.",
              ],
            ],
          },
          {
            type: "h2",
            text: "Wie man die Tabelle liest",
          },
          {
            type: "p",
            text: "Die EU-Spalte ist die Basis. Die Schweiz ist die Basis plus eine lokale Rolle plus eine Registrierung. Grossbritannien ist die Basis mit einem leichteren Papierstapel — seit Oktober 2026 ein unbefristet anerkanntes CE-Zertifikat und eine Registrierung bei der MHRA. Nordirland ist keine Variante Grossbritanniens: compliance-mässig ist es die EU, und die Etikettenlogik folgt. Die letzte Spalte ist ein eigenes Regime, in dem CE höchstens als Nachweis zählt.",
          },
          {
            type: "p",
            text: "Zwei Daten sollte man im Kopf behalten: der 31. Dezember 2026, wenn die Übergangsfrist von swissdamed in der Schweiz endet, und der 30. Juni 2028, wenn nach den alten MDD-Richtlinien ausgestellte Zertifikate in Grossbritannien nicht mehr akzeptiert werden.",
          },
          {
            type: "h2",
            text: "Was wir tun",
          },
          {
            type: "list",
            items: [
              "Ausweisen, welche Dokumente das Fertigungswerk hält — Geltungsbereich und Laufzeit.",
              "Etikettenartwork und Registrierungsdaten vorbereiten: UDI-DI, Basic UDI-DI, die Sprachen des jeweiligen Marktes.",
              "Zertifikat, Konformitätserklärung und Etikett im Einklang halten, wenn Produkt oder Werk wechseln.",
            ],
          },
          {
            type: "h2",
            text: "Was bei Ihnen bleibt",
          },
          {
            type: "list",
            items: [
              "Bevollmächtigte benennen, Produkte registrieren, Einfuhrgenehmigungen halten, als Importeur des Geschäftsverlaufs unterschreiben.",
              "Kein Handelsunternehmen kann dies in Ihrem Namen tun.",
              "Wer „Registrierung übernehmen“ anbietet, ohne die juristische Einheit zu nennen, verdient eine Prüfung vor der Bestellung — nicht danach.",
            ],
          },
          {
            type: "h2",
            text: "Je eine Quelle pro Markt",
          },
          {
            type: "list",
            items: [
              "Europäische Union: MDR Art. 10, 11 und 13.",
              "Schweiz: MepV Art. 51 und die swissdamed-Seiten von Swissmedic.",
              "Grossbritannien: MHRA, „Regulating medical devices in the UK“ (englisch).",
              "Andere Märkte: die Einfuhr-Checkliste der jeweiligen Behörde, sobald ein Auftrag konkret ist.",
            ],
          },
          {
            type: "h2",
            text: "Die gedruckte Seite",
          },
          {
            type: "p",
            text: "Dieselbe Tabelle gibt es auch als einseitige A4-Übersicht im Querformat — zum Anhängen an eine E-Mail oder als Beilage zu einem Angebot:",
          },
          {
            type: "links",
            items: [
              { label: "Marktzugang auf einen Blick (PDF, Deutsch)", href: "/files/market-access-one-pager-de.pdf" },
              { label: "Accès aux marchés en un coup d'œil (PDF, Französisch)", href: "/files/market-access-one-pager-fr.pdf" },
              { label: "Market access at a glance (PDF, Englisch)", href: "/files/market-access-one-pager.pdf" },
            ],
          },
        ],
      },
      fr: {
        title: "Accès aux marchés en un coup d'œil : un dossier, cinq situations",
        dek: "Un certificat CE n'est jamais que la réponse à la question d'un marché. Cette page met côte à côte les cinq situations vers lesquelles nos acheteurs expédient — et dit clairement qui doit détenir quoi.",
        tag: "Vue d'ensemble",
        minutes: 6,
        keyPoints: [
          "Le dossier UE est la base. Tout autre marché, c'est la base plus — ou moins — un rôle local.",
          "L'Irlande du Nord suit les règles de l'UE, pas celles de la Grande-Bretagne : CE uniquement, UKCA non accepté.",
          "En Grande-Bretagne, un certificat CE se reporte désormais ; ce qui reste est administratif.",
          "Hors d'Europe, le CE est une preuve pour le dossier — jamais le dossier entier.",
        ],
        blocks: [
          {
            type: "p",
            text: "Un certificat n'est jamais que la réponse à la question d'un marché. Un acheteur qui expédie vers plusieurs marchés finit par entretenir plusieurs versions du même dossier — et c'est dans leurs différences que les expéditions se bloquent. Cette page met les cinq situations côte à côte. Elle reprend le briefing d'une page que nous joignons aux offres ; les versions imprimées sont en lien à la fin.",
          },
          {
            type: "table",
            head: ["", "Union européenne (27 + AEE)", "Suisse", "Grande-Bretagne (GB)", "Irlande du Nord (NI)", "Autres marchés"],
            rows: [
              [
                "Ce que le marché accepte",
                "CE selon les MDR ou IVDR de l'UE. Les dispositifs stériles et à mesurage de classe I nécessitent un organisme notifié.",
                "Le CE est reconnu. Un mandataire suisse reste requis jusqu'à l'application de l'ALE révisé — 2028 au plus tôt.",
                "CE (MDR/IVDR) reconnu indéfiniment depuis le 21 octobre 2026. Le UKCA est optionnel.",
                "Les règles UE continuent : CE uniquement. Le UKCA n'est pas accepté ; UKNI s'ajoute quand un organisme britannique évalue.",
                "Autorisation nationale. Le CE n'est pas une autorisation hors d'Europe.",
              ],
              [
                "Une personne établie sur place",
                "Mandataire UE (art. 11) et un importateur nommément désigné (art. 13).",
                "Mandataire suisse (ODim art. 51). L'importateur peut cumuler les deux rôles, identifiés séparément.",
                "UK Responsible Person — une entité nommément désignée pour tout le portefeuille.",
                "Mandataire établi dans l'UE ou en Irlande du Nord.",
                "Détenteur de l'enregistrement local ou mandataire local.",
              ],
              [
                "Enregistrement avant la vente",
                "EUDAMED : opérateurs économiques et dispositifs, introduits par classes.",
                "swissdamed, obligatoire depuis le 1er juillet 2026 (fin de la transition : 31 décembre 2026). CHF 200 pour la première UDI-DI.",
                "Enregistrement MHRA avant la mise sur le marché.",
                "EUDAMED (depuis le 28 mai 2026) à la place du système MHRA.",
                "Enregistrement national avant l'importation : FDA, Santé Canada, TGA, SFDA, ANVISA, PMDA.",
              ],
              [
                "Langues de l'étiquetage",
                "Langue(s) officielle(s) du pays de destination.",
                "Allemand, français ou italien, selon la région de vente.",
                "Anglais.",
                "Anglais, selon les règles d'étiquetage UE.",
                "Exigences linguistiques locales, marché par marché.",
              ],
              [
                "Votre certificat CE",
                "Le sésame complet.",
                "Se reporte — plus un mandataire et un enregistrement.",
                "Se reporte ; reste de l'administratif.",
                "Identique à l'UE — un acheteur d'Irlande du Nord est, en conformité, un acheteur UE.",
                "Une preuve pour le dossier. Jamais le dossier entier.",
              ],
            ],
          },
          {
            type: "h2",
            text: "Comment lire le tableau",
          },
          {
            type: "p",
            text: "La colonne UE est la base. La Suisse, c'est la base plus un rôle local plus un enregistrement. La Grande-Bretagne, c'est la base avec une pile de documents plus légère — depuis octobre 2026, un certificat CE reconnu sans limite de durée et un enregistrement auprès de la MHRA. L'Irlande du Nord n'est pas une variante de la Grande-Bretagne : en conformité, c'est l'UE, et la logique d'étiquetage suit. La dernière colonne relève d'un régime différent, où le CE vaut au mieux une preuve.",
          },
          {
            type: "p",
            text: "Deux dates à retenir : le 31 décembre 2026, fin de la période transitoire de swissdamed en Suisse, et le 30 juin 2028, date à laquelle les certificats délivrés sous les anciennes directives MDD cessent d'être acceptés en Grande-Bretagne.",
          },
          {
            type: "h2",
            text: "Ce que nous faisons",
          },
          {
            type: "list",
            items: [
              "Indiquer quels documents l'usine détient — portée et durée.",
              "Préparer maquettes d'étiquetage et données d'enregistrement : UDI-DI, UDI-DI de base, les langues de chaque marché.",
              "Garder certificat, déclaration de conformité et étiquette cohérents quand un dispositif ou une usine change.",
            ],
          },
          {
            type: "h2",
            text: "Ce qui vous revient",
          },
          {
            type: "list",
            items: [
              "Désigner des mandataires, enregistrer les dispositifs, détenir les autorisations d'importation, signer en qualité d'importateur.",
              "Aucune société de négoce ne peut le faire en votre nom.",
              "Qui propose de « gérer l'enregistrement » sans nommer l'entité juridique mérite vérification avant la commande, pas après.",
            ],
          },
          {
            type: "h2",
            text: "Une lecture par marché",
          },
          {
            type: "list",
            items: [
              "Union européenne : MDR art. 10, 11 et 13.",
              "Suisse : ODim art. 51 et les pages swissdamed de Swissmedic.",
              "Royaume-Uni : MHRA, « Regulating medical devices in the UK » (en anglais).",
              "Autres marchés : la liste de contrôle d'importation de l'autorité concernée, dès qu'une commande est concrète.",
            ],
          },
          {
            type: "h2",
            text: "La page imprimée",
          },
          {
            type: "p",
            text: "Le même tableau existe aussi en A4 paysage d'une page — à joindre à un e-mail ou à un devis :",
          },
          {
            type: "links",
            items: [
              { label: "Accès aux marchés en un coup d'œil (PDF, français)", href: "/files/market-access-one-pager-fr.pdf" },
              { label: "Market access at a glance (PDF, anglais)", href: "/files/market-access-one-pager.pdf" },
              { label: "Marktzugang auf einen Blick (PDF, allemand)", href: "/files/market-access-one-pager-de.pdf" },
            ],
          },
        ],
      },
    },
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
