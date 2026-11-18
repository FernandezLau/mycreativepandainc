export type Department = "Technical" | "Support" | "Admin" | "Finance" | "HR" | "Sales & Marketing";

export const DEPARTMENTS: Department[] = [
  "Technical",
  "Support",
  "Admin",
  "Finance",
  "HR",
  "Sales & Marketing",
];

export type Job = {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

const LOCATION = "Onsite • Tarlac City";
const TYPE = "Full-Time";

export const JOBS: Job[] = [
  // Technical (4)
  {
    id: "lead-programmer",
    title: "Lead Programmer",
    department: "Technical",
    location: LOCATION,
    type: TYPE,
    tags: ["PHP / Laravel", "System Architecture", "Team Lead"],
    summary:
      "Own the technical direction of our e-governance platforms and mentor a growing team of developers.",
    responsibilities: [
      "Architect and review modules for EBPLS, EBIS, ETRISYS and other e-systems",
      "Lead code reviews, sprint planning and technical estimates",
      "Mentor junior and assistant developers toward senior roles",
    ],
    qualifications: [
      "5+ years building web-based systems",
      "Strong PHP, MySQL and modern JavaScript",
      "Experience leading a small development team",
    ],
  },
  {
    id: "web-developer",
    title: "Software / Web Developer",
    department: "Technical",
    location: LOCATION,
    type: TYPE,
    tags: ["React / PHP / MySQL", "E-Gov Systems", "REST APIs"],
    summary:
      "Build and ship features for websites and mission-critical systems used by LGUs nationwide.",
    responsibilities: [
      "Develop responsive websites and web-based systems",
      "Integrate CMS platforms and third-party services",
      "Fix bugs and improve performance across live client systems",
    ],
    qualifications: [
      "Graduate of IT, Computer Science or related course",
      "Working knowledge of PHP, MySQL, HTML/CSS and JavaScript",
      "Portfolio or GitHub of past projects is a plus",
    ],
  },
  {
    id: "assistant-developer",
    title: "Assistant Developer",
    department: "Technical",
    location: LOCATION,
    type: TYPE,
    tags: ["HTML / CSS / JS", "Fresh Grads Welcome", "Mentorship"],
    summary:
      "Start your career building real government systems with a dedicated mentor by your side.",
    responsibilities: [
      "Support senior developers on feature work and testing",
      "Convert designs to clean, responsive pages",
      "Document modules and maintain project files",
    ],
    qualifications: [
      "Fresh graduates of IT or Computer Science are welcome",
      "Basic knowledge of HTML, CSS, JavaScript and PHP",
      "Eager to learn and take feedback",
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Technical",
    location: LOCATION,
    type: TYPE,
    tags: ["SQL", "Reporting", "Data Migration"],
    summary:
      "Turn LGU records into clean data and clear reports that help municipalities serve citizens faster.",
    responsibilities: [
      "Clean, migrate and validate client data into our e-systems",
      "Build dashboards and reports for LGU officials",
      "Spot data issues and recommend fixes",
    ],
    qualifications: [
      "Strong Excel and SQL skills",
      "Detail-oriented with a knack for numbers",
      "Background in IT, Statistics or related field",
    ],
  },
  // Support (4)
  {
    id: "system-support",
    title: "System Support Specialist",
    department: "Support",
    location: LOCATION,
    type: TYPE,
    tags: ["E-Gov Systems", "Troubleshooting", "Client Relations"],
    summary:
      "Be the friendly expert LGU staff call when they need help with our systems.",
    responsibilities: [
      "Respond to client tickets, calls and remote sessions",
      "Diagnose and escalate system issues",
      "Keep clear records of support requests",
    ],
    qualifications: [
      "Graduate of IT or related course",
      "Patient communicator in English and Filipino",
      "Basic networking and database knowledge",
    ],
  },
  {
    id: "implementation-officer",
    title: "System Implementation Officer",
    department: "Support",
    location: LOCATION,
    type: TYPE,
    tags: ["Onboarding", "Training", "Field Work"],
    summary:
      "Roll out our e-systems in municipalities and train government staff to use them confidently.",
    responsibilities: [
      "Install and configure systems at client sites",
      "Run hands-on training sessions for LGU personnel",
      "Gather feedback for the development team",
    ],
    qualifications: [
      "Comfortable presenting to groups",
      "Willing to travel to client municipalities",
      "IT background preferred",
    ],
  },
  {
    id: "qa-tester",
    title: "QA Tester",
    department: "Support",
    location: LOCATION,
    type: TYPE,
    tags: ["Manual Testing", "Bug Reports", "Quality"],
    summary: "Make sure every release is solid before it reaches thousands of citizens.",
    responsibilities: [
      "Write and run test cases for new features",
      "Report bugs clearly and verify fixes",
      "Help define release checklists",
    ],
    qualifications: [
      "Sharp eye for detail",
      "Basic understanding of web applications",
      "Experience with testing tools is a plus",
    ],
  },
  {
    id: "technical-support-associate",
    title: "Technical Support Associate",
    department: "Support",
    location: LOCATION,
    type: TYPE,
    tags: ["Hardware / Network", "Helpdesk", "Hosting"],
    summary: "Keep our office, hosting and client equipment running smoothly every day.",
    responsibilities: [
      "Maintain office computers, network and printers",
      "Assist with web hosting and email account setup",
      "Support field teams with equipment needs",
    ],
    qualifications: [
      "Knowledge of PC hardware and networking",
      "Familiar with cPanel and email hosting is a plus",
      "Reliable and resourceful",
    ],
  },
  // Admin (4)
  {
    id: "project-manager",
    title: "Project Manager",
    department: "Admin",
    location: LOCATION,
    type: TYPE,
    tags: ["Agile Delivery", "Stakeholder Mgmt", "E-Gov Projects"],
    summary:
      "Steer government and private projects from kickoff to go-live, on time and within budget.",
    responsibilities: [
      "Plan timelines, resources and deliverables",
      "Coordinate with LGU officials and internal teams",
      "Track progress and report project status",
    ],
    qualifications: [
      "2+ years managing IT or web projects",
      "Excellent organization and communication",
      "Experience with government clients is a plus",
    ],
  },
  {
    id: "administrative-officer",
    title: "Administrative Officer",
    department: "Admin",
    location: LOCATION,
    type: TYPE,
    tags: ["Office Operations", "Documentation", "Procurement Docs"],
    summary: "Keep the Panda office organized and every government document on point.",
    responsibilities: [
      "Prepare bidding and procurement documents",
      "Manage office supplies, schedules and records",
      "Coordinate with suppliers and clients",
    ],
    qualifications: [
      "Graduate of any business-related course",
      "Proficient in MS Office / Google Workspace",
      "Organized and trustworthy",
    ],
  },
  {
    id: "executive-assistant",
    title: "Executive Assistant",
    department: "Admin",
    location: LOCATION,
    type: TYPE,
    tags: ["Calendar Mgmt", "Client Relations", "Coordination"],
    summary: "Support leadership with schedules, meetings and client follow-ups.",
    responsibilities: [
      "Manage calendars, travel and meeting notes",
      "Draft correspondence and reports",
      "Follow up on action items across teams",
    ],
    qualifications: [
      "Excellent written and spoken English",
      "Discreet and highly organized",
      "Prior EA or secretarial experience is a plus",
    ],
  },
  {
    id: "records-officer",
    title: "Records & Documentation Officer",
    department: "Admin",
    location: LOCATION,
    type: TYPE,
    tags: ["Records Mgmt", "Contracts", "Filing Systems"],
    summary: "Own the paper and digital trail behind every project we deliver.",
    responsibilities: [
      "Maintain contracts, permits and project files",
      "Digitize and index company records",
      "Assist with compliance requirements",
    ],
    qualifications: [
      "Detail-oriented and systematic",
      "Comfortable with spreadsheets and scanning tools",
      "Records experience is a plus",
    ],
  },
  // Finance (2)
  {
    id: "finance-executive",
    title: "Finance Executive",
    department: "Finance",
    location: LOCATION,
    type: TYPE,
    tags: ["Billing & Collections", "Financial Reports", "BIR Compliance"],
    summary: "Manage billing, collections and reports across our public and private clients.",
    responsibilities: [
      "Prepare invoices and monitor collections",
      "Produce monthly financial reports",
      "Ensure tax and regulatory compliance",
    ],
    qualifications: [
      "Graduate of Accountancy, Finance or related course",
      "Knowledge of BIR requirements",
      "CPA is an advantage",
    ],
  },
  {
    id: "bookkeeper",
    title: "Bookkeeper",
    department: "Finance",
    location: LOCATION,
    type: TYPE,
    tags: ["Bookkeeping", "Payroll Support", "Excel"],
    summary: "Keep our books accurate, tidy and audit-ready.",
    responsibilities: [
      "Record daily transactions and reconcile accounts",
      "Assist with payroll and government remittances",
      "Organize receipts and supporting documents",
    ],
    qualifications: [
      "Background in Accounting or Bookkeeping",
      "Strong Excel skills",
      "Accurate and reliable",
    ],
  },
  // HR (2)
  {
    id: "hr-officer",
    title: "HR Officer",
    department: "HR",
    location: LOCATION,
    type: TYPE,
    tags: ["Employee Relations", "Policies", "Benefits"],
    summary: "Shape a culture where every Panda can grow, feel supported and do their best work.",
    responsibilities: [
      "Handle onboarding, records and employee concerns",
      "Administer benefits and government contributions",
      "Run engagement activities and policy updates",
    ],
    qualifications: [
      "Graduate of Psychology, HR Management or related course",
      "Knowledge of Philippine labor laws",
      "Warm, fair and confidential",
    ],
  },
  {
    id: "recruitment-associate",
    title: "Recruitment Associate",
    department: "HR",
    location: LOCATION,
    type: TYPE,
    tags: ["Talent Sourcing", "Interviews", "Employer Branding"],
    summary: "Find the next generation of Pandas and give every applicant a great experience.",
    responsibilities: [
      "Screen resumes and schedule interviews",
      "Post openings and source candidates",
      "Keep applicants updated within our 48h promise",
    ],
    qualifications: [
      "Graduate of any course, HR-related preferred",
      "Excellent communication skills",
      "Organized with fast follow-through",
    ],
  },
  // Sales & Marketing (2)
  {
    id: "account-sales-representative",
    title: "Account Sales Representative",
    department: "Sales & Marketing",
    location: LOCATION,
    type: TYPE,
    tags: ["Client Relations", "LGU Sales", "Presentations"],
    summary: "Introduce our e-systems to municipalities and grow long-term client relationships.",
    responsibilities: [
      "Present solutions to LGU officials and private clients",
      "Prepare proposals and quotations",
      "Hit monthly targets and maintain client accounts",
    ],
    qualifications: [
      "Confident presenter and negotiator",
      "Sales experience, ideally B2B or government",
      "Willing to travel",
    ],
  },
  {
    id: "account-executive",
    title: "Account Executive",
    department: "Sales & Marketing",
    location: LOCATION,
    type: TYPE,
    tags: ["Account Mgmt", "Digital Marketing", "Proposals"],
    summary: "Own key accounts and drive campaigns that put My Creative Panda in front of new clients.",
    responsibilities: [
      "Manage a portfolio of client accounts",
      "Plan and run digital marketing campaigns",
      "Coordinate client needs with project teams",
    ],
    qualifications: [
      "2+ years in account management or marketing",
      "Strong writing and social media skills",
      "Results-driven and client-focused",
    ],
  },
];

export function countByDepartment(jobs: Job[] = JOBS): Record<"All" | Department, number> {
  const counts = { All: jobs.length } as Record<"All" | Department, number>;
  for (const d of DEPARTMENTS) counts[d] = jobs.filter((j) => j.department === d).length;
  return counts;
}

export function filterJobs(jobs: Job[], department: "All" | Department, query: string): Job[] {
  const q = query.trim().toLowerCase();
  return jobs.filter((j) => {
    if (department !== "All" && j.department !== department) return false;
    if (!q) return true;
    return [j.title, j.department, j.summary, ...j.tags].some((s) => s.toLowerCase().includes(q));
  });
}
