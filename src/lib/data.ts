// Central content module. Static brand content used directly by the marketing
// pages, plus seed data written to the database for products/posts/projects.
// Replace PLACEHOLDER contact details with George Mwangi's real business info.

export const company = {
  name: "Raycheki Industrial Safety Solutions",
  shortName: "Raycheki",
  tagline: "Protecting People. Securing Workplaces.",
  // === PLACEHOLDERS — replace with real details ===
  phone: "+254 700 000 000",
  email: "hello@raycheki.com",
  salesEmail: "sales@raycheki.com",
  address: "140 Industrial Parkway, Unit 7, Nairobi, Kenya",
  whatsapp: "254700000000", // digits only, international format
  hours: "Mon–Fri 8:00–18:00 · 24/7 Emergency Response Line",
  // OpenStreetMap embed bbox (replace with your location)
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=36.78%2C-1.31%2C36.86%2C-1.26&layer=mapnik"
};

export const whyChoose = [
  ["Certified Safety Products", "Every item meets ISO, CE and OSHA standards with full documentation and traceability."],
  ["Expert Safety Consultants", "Accredited specialists with deep sector experience across high-risk environments."],
  ["Fast Delivery", "Regional warehousing and logistics for rapid dispatch — often same-day on stock items."],
  ["Industry Compliance", "We keep you ahead of evolving regulations with continuous compliance support."],
  ["Quality Assurance", "Rigorous batch testing and supplier vetting guarantee dependable protection."],
  ["Competitive Pricing", "Enterprise-grade equipment and volume pricing without compromising on standards."]
] as const;

export const industries = [
  ["Construction", "High-rise & site safety", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=70"],
  ["Manufacturing", "Plant floor protection", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=70"],
  ["Oil & Gas", "Hazardous environments", "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=70"],
  ["Mining", "Underground & surface", "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=70"],
  ["Logistics", "Warehouse & transport", "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=70"],
  ["Healthcare", "Clinical safety", "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=70"]
] as const;

export const testimonials = [
  ["Raycheki overhauled our PPE programme across 14 sites. Incident rates dropped sharply within the first quarter.", "David Okafor", "HSE Director, NorthBridge Manufacturing", "DO"],
  ["Their consultants understand oil & gas risk like no other supplier we have worked with. Fast, certified, reliable.", "Sara Lindgren", "Operations Lead, PetroGulf", "SL"],
  ["From audit to equipment supply to training, one partner handled everything. Our compliance scores have never been higher.", "Marcus Reed", "Safety Manager, Apex Mining", "MR"]
] as const;

export const services = [
  ["Safety Consultancy", "Comprehensive risk and compliance advisory delivered by accredited specialists.", ["Risk Assessments", "Compliance Audits", "Safety Planning", "Policy Development"]],
  ["Safety Training", "Accredited, hands-on training programmes for every level of your workforce.", ["Fire Safety Training", "PPE Training", "Workplace Safety Training", "Emergency Response Training"]],
  ["Safety Inspections", "Independent inspections that keep your sites and equipment compliant.", ["Site Safety Audits", "Equipment Inspections", "Compliance Reviews", "Hazard Identification"]],
  ["Occupational Health", "Programmes that protect long-term worker health and wellbeing.", ["Health Surveillance", "Exposure Monitoring", "Wellbeing Programmes", "Incident Investigation"]]
] as const;

export const values = [
  ["01", "Safety First", "Every decision begins with protecting people."],
  ["02", "Integrity", "Honest advice and certified products, always."],
  ["03", "Excellence", "Industrial-grade quality with no shortcuts."],
  ["04", "Partnership", "We succeed when our clients stay incident-free."]
] as const;

export const team = [
  ["George Mwangi", "Founder & CEO", "GM"],
  ["J. Mensah", "Head of Consultancy", "JM"],
  ["L. Petrova", "Training Director", "LP"],
  ["C. Adeyemi", "Logistics Lead", "CA"]
] as const;

export const certs = [
  ["ISO 45001", "Occupational H&S"],
  ["ISO 9001", "Quality Mgmt"],
  ["OSHA", "Aligned"],
  ["CE", "Certified"],
  ["NEBOSH", "Accredited"]
] as const;

// ---- Seed data (written to DB) ----

export const seedCategories = [
  "Head Protection", "Foot Protection", "Hi-Vis", "Hand Protection",
  "Respiratory", "Eyewear", "Ear Defenders", "Height Safety", "Fire Safety", "Medical"
];

export const seedProducts: {
  name: string; category: string; image: string; featured: boolean;
}[] = [
  { name: "Safety Helmets", category: "Head Protection", featured: true, image: "https://images.unsplash.com/photo-1607582544964-1f5b4b3e9c7e?auto=format&fit=crop&w=600&q=70" },
  { name: "Safety Boots", category: "Foot Protection", featured: true, image: "https://images.unsplash.com/photo-1542219550-37153d387c27?auto=format&fit=crop&w=600&q=70" },
  { name: "Reflective Jackets", category: "Hi-Vis", featured: true, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=70" },
  { name: "Safety Gloves", category: "Hand Protection", featured: true, image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=600&q=70" },
  { name: "Respirators", category: "Respiratory", featured: true, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=600&q=70" },
  { name: "Eye Protection", category: "Eyewear", featured: false, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=70" },
  { name: "Hearing Protection", category: "Ear Defenders", featured: false, image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=600&q=70" },
  { name: "Fall Protection Equipment", category: "Height Safety", featured: false, image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=70" },
  { name: "Fire Extinguishers", category: "Fire Safety", featured: true, image: "https://images.unsplash.com/photo-1599256632909-7d44d0afa5ba?auto=format&fit=crop&w=600&q=70" },
  { name: "First Aid Kits", category: "Medical", featured: false, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=70" }
];

export const seedPosts = [
  { title: "Choosing the Right Respirator for Your Worksite", category: "PPE Guides", excerpt: "A practical guide to matching respiratory protection to workplace hazards and exposure levels.", cover: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=70" },
  { title: "2026 Workplace Safety Compliance Checklist", category: "Safety Regulations", excerpt: "Stay ahead of regulatory changes with this essential annual compliance checklist.", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=70" },
  { title: "Fire Extinguisher Types Explained", category: "Fire Safety", excerpt: "Class A to K — understand which extinguisher belongs in each area of your facility.", cover: "https://images.unsplash.com/photo-1599256632909-7d44d0afa5ba?auto=format&fit=crop&w=900&q=70" },
  { title: "Building a Safety-First Culture", category: "Workplace Safety", excerpt: "How leadership behaviour shapes long-term safety outcomes on the floor.", cover: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=70" },
  { title: "5 Steps to an Effective Risk Assessment", category: "Risk Management", excerpt: "A repeatable framework for identifying, evaluating and controlling workplace risk.", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=70" },
  { title: "Extending the Lifespan of Safety Equipment", category: "PPE Guides", excerpt: "Maintenance and storage tips that keep PPE compliant and effective for longer.", cover: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=70" }
];

export const seedProjects = [
  { title: "North Harbour Refinery PPE Rollout", industry: "Oil & Gas", client: "PetroGulf", description: "Full-site PPE standardisation and respiratory programme across a 1,200-worker refinery.", results: [["43%", "Incident drop"], ["1.2k", "Workers equipped"]], image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=70" },
  { title: "Skyline Tower Fall Protection", industry: "Construction", client: "BuildCo", description: "Engineered fall-arrest systems and height-safety training for a 48-storey build.", results: [["0", "Fall incidents"], ["320", "Trained staff"]], image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=70" },
  { title: "Apex Mine Emergency Readiness", industry: "Mining", client: "Apex Mining", description: "Emergency response equipment and certified rescue training for underground crews.", results: [["8 min", "Response time"], ["100%", "Audit pass"]], image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=900&q=70" },
  { title: "Regional Hospital Fire Safety", industry: "Healthcare", client: "MediCare Group", description: "Fire extinguisher supply, signage and evacuation drills across 6 facilities.", results: [["6", "Sites secured"], ["A+", "Compliance grade"]], image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=70" }
];

export const serviceOptions = [
  "PPE & Equipment Supply", "Safety Training", "Risk Assessment",
  "Compliance Audit", "Emergency Response Equipment", "Other"
];

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
