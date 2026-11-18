export const CONTACT = {
  address:
    "2nd Floor, Amari Building, Blk. 3, Brgy. San Nicolas, McArthur Highway, Tarlac City",
  salesEmail: "sales@mycreativepanda.com",
  careersEmail: "careers@mycreativepanda.ph",
  landline: "(045) 985-6909",
  mobile: "0917-103-1904",
};

export const CLIENTS = [
  "National Library of the Philippines",
  "City of Caloocan",
  "Landbank Insurance Brokerage",
  "Municipality of Pura",
  "Municipality of Porac",
  "Municipality of Talibon",
  "Jelexei Bakeshop",
  "National Authority for Child Care",
  "TESDA Region III",
  "National Academy of Sports",
];

export const E_SYSTEMS = [
  {
    code: "EBPLS",
    name: "Business Permits & Licensing",
    description:
      "Online business permit applications, assessments and renewals that cut LGU queues from days to minutes.",
  },
  {
    code: "EBIS",
    name: "Barangay Information System",
    description:
      "Resident profiling, clearances and certificates for barangays, all in one secure database.",
  },
  {
    code: "EWBS",
    name: "Water Billing System",
    description:
      "Meter readings, billing and collections for municipal water districts with real-time reports.",
  },
  {
    code: "EHRMIS",
    name: "HR Management Information System",
    description:
      "Personnel records, leave, payroll support and service records for government HR offices.",
  },
  {
    code: "ETRISYS",
    name: "Tricycle Franchise System",
    description:
      "Franchise registration, renewals and permits for tricycle operators and transport offices.",
  },
  {
    code: "ELIS",
    name: "Library Information System",
    description:
      "Cataloguing, circulation and patron management for public and government libraries.",
  },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/e-systems", label: "E-Systems" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;
