/**
 * Category landing-page copy — approved by the owner on 2026-11-23
 * (Chinese review sheet `output/category-pages-copy-cn-review.md`, section 1
 * of the Respiratory page finalised as Version A).
 *
 * Compliance notes baked into the wording:
 * - no sizes / model enumerations / prices anywhere;
 * - no "FDA certified" / "EC Representative";
 * - CE appears only as a neutral compliance statement ("CE marking under
 *   MDR 2017/745"), factories are described as ISO 13485 — CE certifies the
 *   product, not the factory;
 * - certification coverage is "confirmed per destination before order",
 *   never promised.
 */

export interface CategoryCopySection {
  heading: string;
  body: string;
}

export interface CategoryCopy {
  /** Page H1, e.g. "Anesthesia & Airway Consumables" */
  h1: string;
  /** SEO title without the " | Qiantong Global" suffix */
  seoTitle: string;
  metaDescription: string;
  intro: string;
  sections: CategoryCopySection[];
}

export const categoryCopy: Record<string, CategoryCopy> = {
  anesthesia: {
    h1: "Anesthesia & Airway Consumables",
    seoTitle: "Anesthesia & Airway Consumables — Wholesale & OEM Supply",
    metaDescription:
      "Anesthesia and airway consumables from ISO 13485 partner factories with CE-marked products (MDR 2017/745) — endotracheal tubes, laryngeal masks, breathing circuits, HME filters and more. OEM packaging available.",
    intro:
      "Airway management is the one consumable category a hospital cannot run out of. Qiantong Global supplies distributors and medical wholesalers with a complete anesthesia and airway range from partner factories in China, all manufactured under ISO 13485 quality systems with CE marking under MDR 2017/745.",
    sections: [
      {
        heading: "What the range covers",
        body: "The portfolio spans the full perioperative airway pathway: endotracheal tubes (standard, reinforced and double-lumen), tracheostomy tubes, laryngeal mask airways, oropharyngeal airways, anesthesia masks, breathing circuits, heat and moisture exchangers, manual resuscitators and closed suction catheters. For regional anesthesia, the range includes anesthesia needles, epidural catheters and LOR syringes, plus pre-assembled anesthesia kits that reduce tray-preparation time in theatre.",
      },
      {
        heading: "Built for distributors, not just buyers",
        body: "Every product code ships with documentation you can hand to your own regulatory team: Declaration of Conformity, test reports on request, and consistent labeling across the range. Where your market requires it, we support OEM and private-label packaging, and confirm certification coverage for your specific destination before an order is placed — not after.",
      },
      {
        heading: "Start with the products",
        body: "Each product below links to its own page with application notes and sourcing details. Full technical specifications are shared during quotation, so you can match items against your existing demand before committing to a supplier.",
      },
    ],
  },

  urology: {
    h1: "Urology & Incontinence Consumables",
    seoTitle: "Urology & Incontinence Consumables — Catheters, Urine Bags & Underpads",
    metaDescription:
      "Urine meters, Foley catheter kits, urine collection bags, colostomy bags and disposable underpads from ISO 13485 partner factories, CE-marked products (MDR 2017/745). OEM packaging available.",
    intro:
      "Urology consumables are high-volume, repeat-order items — the kind of category where a reliable supply chain matters more than any single product feature. Qiantong Global supplies wholesalers and hospital procurement teams with a focused urology range from partner factories operating under ISO 13485 quality systems, with CE marking under MDR 2017/745.",
    sections: [
      {
        heading: "What the range covers",
        body: "The category covers urine output measurement for ICU (precision urine meters), indwelling catheterisation (Foley catheter kits), urine collection for ward and home care (disposable urine bags), stoma care (colostomy bags) and incontinence protection (disposable underpads). Together they let a distributor cover a hospital's urology demand from one supplier instead of five.",
      },
      {
        heading: "Why buyers stay",
        body: "Repeat orders in this category live or die on two things: stable quality between batches, and paperwork that never holds up a customs clearance. Our partner factories run batch-controlled production, and every product code is supported with a Declaration of Conformity and export documentation prepared for your market. OEM and private-label packaging is available across the range, with certification coverage confirmed per destination before order.",
      },
      {
        heading: "Start with the products",
        body: "Each product links to its own page with application notes. Technical specifications are provided during quotation — match them against your current demand before committing.",
      },
    ],
  },

  surgical: {
    h1: "Surgical & Operating Room Consumables",
    seoTitle: "Surgical Consumables & OR Supplies — Gowns, Kits, CVC & IBP",
    metaDescription:
      "Disposable surgical gowns, procedure kits, suction accessories, central venous catheter kits and pressure transducers. Wholesale supply from ISO 13485 partner factories, CE-marked products.",
    intro:
      "The operating room consumes more single-use product per procedure than any other department. Qiantong Global supplies this demand with a surgical range covering both the soft goods and the procedural side of the OR, manufactured by partner factories under ISO 13485 quality systems and CE marked under MDR 2017/745.",
    sections: [
      {
        heading: "What the range covers",
        body: "On the protective side: disposable surgical gowns and pre-configured surgical kits that bundle drapes, gowns and accessories into a single sterile pack, cutting preparation time in theatre. On the procedural side: suction handles and connecting tubes, central venous catheter (CVC) kits and disposable pressure transducers for invasive blood pressure (IBP) monitoring — the consumable side of anaesthesia workstations and critical care lines.",
      },
      {
        heading: "Sourcing from one factory group",
        body: "OR consumables are usually bought piecemeal from several suppliers, which means several qualification processes and several sets of paperwork. Our portfolio lets a distributor qualify one supply chain for gowns, kits, suction accessories and vascular access lines at once, with consistent documentation across every product code: Declaration of Conformity, export papers for your destination, and OEM or private-label packaging on request.",
      },
      {
        heading: "Start with the products",
        body: "Each product links to its own page with application notes and sourcing details. Specifications are shared during quotation so you can compare against your current demand.",
      },
    ],
  },

  respiratory: {
    h1: "Respiratory & Protective Consumables",
    seoTitle: "Respiratory & Protective Consumables — Oxygen Therapy, Masks & Gloves",
    metaDescription:
      "Oxygen masks, nasal oxygen tubes, suction catheters, medical face masks and nitrile examination gloves. Wholesale from ISO 13485 partner factories, CE-marked products (MDR 2017/745).",
    intro:
      "Respiratory therapy and protective consumables are the category most exposed to sudden demand spikes — demand can surge without warning, and distributors without a flexible supply chain are the ones who carry the cost. Qiantong Global supplies this category from a group of partner factories in China, so capacity can be spread across sources instead of depending on a single production line.",
    sections: [
      {
        heading: "What the range covers",
        body: "Oxygen therapy consumables (oxygen masks, nasal oxygen tubes), airway clearance (suction catheters), and everyday protection (medical face masks, nitrile examination gloves). The mix is deliberately weighted toward items hospitals reorder weekly, giving distributors a steady baseline volume rather than one-off project sales.",
      },
      {
        heading: "A supply chain built for flexibility",
        body: "All partner factories operate ISO 13485 quality systems with CE marking under MDR 2017/745. Because production sits across multiple factories, seasonal peaks and urgent tenders can be matched to available capacity. Every product code carries a Declaration of Conformity and export documentation for your market; OEM and private-label packaging is available, with certification coverage confirmed per destination before an order is placed.",
      },
      {
        heading: "Start with the products",
        body: "Each product links to its own page with application notes. Specifications are provided during quotation — match them against your demand before committing to a supplier.",
      },
    ],
  },

  radiotherapy: {
    h1: "Radiotherapy & Infusion Consumables",
    seoTitle: "Radiotherapy & Infusion Consumables — Masks, Pumps, Feeding Sets & Cannulas",
    metaDescription:
      "Thermoplastic radiotherapy masks, elastomeric infusion pumps, enteral feeding sets and IV cannulas. Wholesale supply from ISO 13485 partner factories, CE-marked products.",
    intro:
      "Oncology and infusion consumables sit alongside high-value equipment: a linear accelerator is only as usable as the immobilisation masks that go with it, and a chemotherapy ward runs on reliable infusion and nutrition lines. Qiantong Global supplies the consumable side of these departments from partner factories under ISO 13485 quality systems, CE marked under MDR 2017/745.",
    sections: [
      {
        heading: "What the range covers",
        body: "Thermoplastic radiotherapy masks for patient immobilisation during fractionated treatment, elastomeric infusion pumps for ambulatory chemotherapy and pain management, enteral feeding sets for oncology nutrition support, and IV cannulas for everyday vascular access. For distributors already selling radiotherapy equipment, the mask range is a natural consumable annex to an existing product line.",
      },
      {
        heading: "The equipment-consumable lock-in",
        body: "Departments that buy equipment stay loyal to the consumables that keep it running. That is exactly the opportunity in this category: a distributor who supplies masks to a radiotherapy department, or feeding sets to an oncology ward, holds a repeat-order position that casual suppliers cannot reach. We support that position with stable batch quality, full export documentation, and OEM packaging — certification coverage confirmed per destination before order.",
      },
      {
        heading: "Start with the products",
        body: "Each product links to its own page with application notes. Specifications are shared during quotation.",
      },
    ],
  },
};
