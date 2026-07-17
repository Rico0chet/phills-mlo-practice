export type Question = {
  id: number;
  prompt: string;
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  explanation?: string;
};

export const chapter1Page1: Question[] = [
  {
    id: 1,
    prompt: "Which of the following best describes a conventional loan?",
    choices: [
      { key: "A", text: "A loan insured by the FHA" },
      { key: "B", text: "A loan guaranteed by the VA" },
      { key: "C", text: "A loan offered by private lenders and not insured or guaranteed by the government" },
      { key: "D", text: "A USDA-backed rural housing loan" },
    ],
    answer: "C",
    explanation: "Conventional loans are made by private lenders and are not insured or guaranteed by any government agency.",
  },
  {
    id: 2,
    prompt: "Conventional conforming loans must meet the guidelines established by:",
    choices: [
      { key: "A", text: "HUD only" },
      { key: "B", text: "Fannie Mae and Freddie Mac" },
      { key: "C", text: "FHA and VA" },
      { key: "D", text: "CFPB" },
    ],
    answer: "B",
    explanation: "Conforming loans meet the underwriting guidelines set by Fannie Mae and Freddie Mac (the GSEs).",
  },
  {
    id: 3,
    prompt: "What is the primary difference between a conforming and a non-conforming loan?",
    choices: [
      { key: "A", text: "Down payment requirements" },
      { key: "B", text: "Interest rate type" },
      { key: "C", text: "Whether the loan meets GSE guidelines and loan limits" },
      { key: "D", text: "Property location" },
    ],
    answer: "C",
    explanation: "Conforming loans meet GSE guidelines and loan limits; non-conforming loans (such as jumbo) do not.",
  },
  {
    id: 4,
    prompt: "As of 2024, the conforming loan limit for a single-family home in most areas was approximately:",
    choices: [
      { key: "A", text: "$510,400" },
      { key: "B", text: "$650,000" },
      { key: "C", text: "$726,200" },
      { key: "D", text: "$1,000,000" },
    ],
    answer: "C",
    explanation: "For 2024, the baseline conforming loan limit for a one-unit property in most areas was $726,200.",
  },
  {
    id: 5,
    prompt: "Conventional loans generally require a minimum down payment of:",
    choices: [
      { key: "A", text: "0%" },
      { key: "B", text: "1%" },
      { key: "C", text: "3%–5%" },
      { key: "D", text: "20%" },
    ],
    answer: "C",
    explanation: "Conventional loans typically require a minimum down payment of 3% to 5%.",
  },
  {
    id: 6,
    prompt: "Private Mortgage Insurance (PMI) is generally required when the borrower puts down:",
    choices: [
      { key: "A", text: "Less than 5%" },
      { key: "B", text: "Less than 10%" },
      { key: "C", text: "Less than 15%" },
      { key: "D", text: "Less than 20%" },
    ],
    answer: "D",
    explanation: "PMI is generally required on conventional loans when the down payment is less than 20%.",
  },
  {
    id: 7,
    prompt: "PMI primarily protects:",
    choices: [
      { key: "A", text: "The borrower" },
      { key: "B", text: "The seller" },
      { key: "C", text: "The lender" },
      { key: "D", text: "The title company" },
    ],
    answer: "C",
    explanation: "PMI protects the lender against loss if the borrower defaults.",
  },
  {
    id: 8,
    prompt: "A borrower may generally request PMI removal when their loan-to-value (LTV) reaches:",
    choices: [
      { key: "A", text: "95%" },
      { key: "B", text: "90%" },
      { key: "C", text: "85%" },
      { key: "D", text: "80%" },
    ],
    answer: "D",
    explanation: "Borrowers can typically request PMI cancellation once the LTV reaches 80%.",
  },
  {
    id: 9,
    prompt: "Which mortgage provides the greatest payment stability?",
    choices: [
      { key: "A", text: "Adjustable Rate Mortgage (ARM)" },
      { key: "B", text: "Interest-Only Loan" },
      { key: "C", text: "Fixed-Rate Mortgage" },
      { key: "D", text: "Jumbo Loan" },
    ],
    answer: "C",
    explanation: "A fixed-rate mortgage has a stable rate and payment for the life of the loan.",
  },
  {
    id: 10,
    prompt: "A 7/1 ARM typically means:",
    choices: [
      { key: "A", text: "The loan lasts seven years." },
      { key: "B", text: "The interest rate is fixed for seven years before adjusting." },
      { key: "C", text: "Payments are made every seven months." },
      { key: "D", text: "The loan adjusts every seven years immediately." },
    ],
    answer: "B",
    explanation: "In a 7/1 ARM, the rate is fixed for the first 7 years, then adjusts annually.",
  },
  {
    id: 11,
    prompt: "Which loan term usually results in higher monthly payments but lower total interest paid?",
    choices: [
      { key: "A", text: "30-year mortgage" },
      { key: "B", text: "40-year mortgage" },
      { key: "C", text: "15-year mortgage" },
      { key: "D", text: "Interest-only mortgage" },
    ],
    answer: "C",
    explanation: "A 15-year mortgage has higher monthly payments but less total interest over the life of the loan.",
  },
  {
    id: 12,
    prompt: "Conventional loan limits are established annually by:",
    choices: [
      { key: "A", text: "HUD" },
      { key: "B", text: "CFPB" },
      { key: "C", text: "Federal Housing Finance Agency (FHFA)" },
      { key: "D", text: "FHA" },
    ],
    answer: "C",
    explanation: "The FHFA sets conforming loan limits each year.",
  },
  {
    id: 13,
    prompt: "What minimum credit score is typically required for a conforming conventional loan?",
    choices: [
      { key: "A", text: "580" },
      { key: "B", text: "600" },
      { key: "C", text: "620" },
      { key: "D", text: "700" },
    ],
    answer: "C",
    explanation: "A minimum credit score of 620 is generally required for a conforming conventional loan.",
  },
  {
    id: 14,
    prompt: "A debt-to-income (DTI) ratio of ______ is generally considered acceptable for a conventional loan.",
    choices: [
      { key: "A", text: "28%" },
      { key: "B", text: "36%" },
      { key: "C", text: "43%" },
      { key: "D", text: "55%" },
    ],
    answer: "C",
    explanation: "A DTI up to about 43% is generally acceptable for conventional loans.",
  },
  {
    id: 15,
    prompt: "Self-employed borrowers are often required to provide:",
    choices: [
      { key: "A", text: "Military discharge papers" },
      { key: "B", text: "Profit and loss statements and tax returns" },
      { key: "C", text: "Vehicle registration" },
      { key: "D", text: "College transcripts" },
    ],
    answer: "B",
    explanation: "Self-employed borrowers typically must provide P&L statements and tax returns to verify income.",
  },
  {
    id: 16,
    prompt: "Which document verifies that gifted down-payment funds do not have to be repaid?",
    choices: [
      { key: "A", text: "Closing Disclosure" },
      { key: "B", text: "Gift Letter" },
      { key: "C", text: "Promissory Note" },
      { key: "D", text: "HUD-1 Settlement Statement" },
    ],
    answer: "B",
    explanation: "A gift letter documents that the funds are a gift with no expectation of repayment.",
  },
  {
    id: 17,
    prompt: "Which step of the mortgage process involves the lender evaluating risk and deciding whether to approve the loan?",
    choices: [
      { key: "A", text: "Closing" },
      { key: "B", text: "Appraisal" },
      { key: "C", text: "Underwriting" },
      { key: "D", text: "Pre-Approval" },
    ],
    answer: "C",
    explanation: "Underwriting is the risk-evaluation and approval step.",
  },
  {
    id: 18,
    prompt: "What is the primary purpose of a property appraisal?",
    choices: [
      { key: "A", text: "Determine the borrower's credit score" },
      { key: "B", text: "Verify employment" },
      { key: "C", text: "Estimate the property's market value" },
      { key: "D", text: "Calculate closing costs" },
    ],
    answer: "C",
    explanation: "An appraisal provides an independent estimate of the property's market value.",
  },
  {
    id: 19,
    prompt: "Which federal law requires lenders to clearly disclose loan costs and terms?",
    choices: [
      { key: "A", text: "RESPA" },
      { key: "B", text: "ECOA" },
      { key: "C", text: "TILA (Truth in Lending Act)" },
      { key: "D", text: "HMDA" },
    ],
    answer: "C",
    explanation: "TILA requires clear disclosure of loan costs and terms, including the APR.",
  },
  {
    id: 20,
    prompt: "Which federal law prohibits discrimination in lending based on race, religion, sex, marital status, national origin, and other protected characteristics?",
    choices: [
      { key: "A", text: "TILA" },
      { key: "B", text: "ECOA" },
      { key: "C", text: "SAFE Act" },
      { key: "D", text: "FDCPA" },
    ],
    answer: "B",
    explanation: "The Equal Credit Opportunity Act (ECOA) prohibits discrimination in credit transactions.",
  },
];

export type ChapterInfo = {
  number: number;
  title: string;
  pages: number;
};

export const chapters: ChapterInfo[] = [
  { number: 1, title: "Loan Types and Related Products", pages: 6 },
  { number: 2, title: "Regulatory Framework", pages: 7 },
  { number: 3, title: "Loan Processing", pages: 5 },
  { number: 4, title: "Mortgage Mathematics", pages: 1 },
  { number: 5, title: "Ethical Consideration and Compliance", pages: 6 },
  { number: 6, title: "Closing Process", pages: 5 },
  { number: 7, title: "Market Trends and Economic Factors", pages: 3 },
  { number: 8, title: "Customer Service and Communication Skills", pages: 3 },
  { number: 9, title: "Technology in Mortgage Lending", pages: 1 },
  { number: 10, title: "Practice Questions and Answers", pages: 8 },
];

// Registry of loaded question sets. Key format: "chapter-page".
export const questionSets: Record<string, Question[]> = {
  "1-1": chapter1Page1,
};

export function getQuestions(chapter: string, page: string): Question[] | null {
  return questionSets[`${chapter}-${page}`] ?? null;
}

export function getChapter(chapter: string): ChapterInfo | undefined {
  return chapters.find((c) => c.number === Number(chapter));
}
