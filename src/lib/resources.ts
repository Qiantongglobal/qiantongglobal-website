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
}

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

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
