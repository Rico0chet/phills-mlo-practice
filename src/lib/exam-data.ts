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
  {
    id: 21,
    prompt: "Which loan is most likely to have stricter lending standards due to increased lender risk?",
    choices: [
      { key: "A", text: "FHA Loan" },
      { key: "B", text: "Conforming Conventional Loan" },
      { key: "C", text: "Non-conforming Loan" },
      { key: "D", text: "USDA Loan" },
    ],
    answer: "C",
    explanation: "Non-conforming loans (like jumbo) carry more lender risk and typically have stricter standards.",
  },
  {
    id: 22,
    prompt: "Government-Sponsored Enterprises (GSEs) include:",
    choices: [
      { key: "A", text: "FHA and VA" },
      { key: "B", text: "CFPB and HUD" },
      { key: "C", text: "Fannie Mae and Freddie Mac" },
      { key: "D", text: "USDA and Farmer's Home Administration" },
    ],
    answer: "C",
    explanation: "Fannie Mae and Freddie Mac are the two housing GSEs.",
  },
  {
    id: 23,
    prompt: "Jumbo loans are considered:",
    choices: [
      { key: "A", text: "Conforming loans" },
      { key: "B", text: "Government-backed loans" },
      { key: "C", text: "Non-conforming loans" },
      { key: "D", text: "FHA loans" },
    ],
    answer: "C",
    explanation: "Jumbo loans exceed conforming loan limits and are non-conforming.",
  },
  {
    id: 24,
    prompt: "A borrower wants the lowest possible monthly payment. Which loan term would generally provide that?",
    choices: [
      { key: "A", text: "10 years" },
      { key: "B", text: "15 years" },
      { key: "C", text: "20 years" },
      { key: "D", text: "30 years" },
    ],
    answer: "D",
    explanation: "Longer terms spread payments over more months, lowering the monthly amount.",
  },
  {
    id: 25,
    prompt: "A borrower wants to pay the least amount of interest over the life of the loan. Which option is generally best?",
    choices: [
      { key: "A", text: "15-year fixed" },
      { key: "B", text: "30-year ARM" },
      { key: "C", text: "Interest-only mortgage" },
      { key: "D", text: "30-year fixed" },
    ],
    answer: "A",
    explanation: "A 15-year fixed pays off faster with less total interest.",
  },
  {
    id: 26,
    prompt: "Which borrower is most likely to qualify for the best conventional loan rates?",
    choices: [
      { key: "A", text: "580 credit score" },
      { key: "B", text: "620 credit score" },
      { key: "C", text: "680 credit score" },
      { key: "D", text: "750 credit score" },
    ],
    answer: "D",
    explanation: "Higher credit scores earn the best rates.",
  },
  {
    id: 27,
    prompt: "Which borrower would likely need additional documentation?",
    choices: [
      { key: "A", text: "Full-time teacher" },
      { key: "B", text: "Retired veteran" },
      { key: "C", text: "Self-employed contractor" },
      { key: "D", text: "Government employee" },
    ],
    answer: "C",
    explanation: "Self-employed borrowers must provide extra income documentation (tax returns, P&L).",
  },
  {
    id: 28,
    prompt: "What document helps verify the borrower has enough funds for closing costs?",
    choices: [
      { key: "A", text: "Credit report" },
      { key: "B", text: "Driver's license" },
      { key: "C", text: "Bank statement" },
      { key: "D", text: "Property appraisal" },
    ],
    answer: "C",
    explanation: "Bank statements verify available funds for closing.",
  },
  {
    id: 29,
    prompt: "Which document allows a lender to evaluate payment history and existing debts?",
    choices: [
      { key: "A", text: "Tax return" },
      { key: "B", text: "Credit report" },
      { key: "C", text: "W-2" },
      { key: "D", text: "Appraisal" },
    ],
    answer: "B",
    explanation: "The credit report shows payment history and outstanding debts.",
  },
  {
    id: 30,
    prompt: "During which stage does the borrower officially sign the mortgage documents?",
    choices: [
      { key: "A", text: "Underwriting" },
      { key: "B", text: "Pre-approval" },
      { key: "C", text: "Closing" },
      { key: "D", text: "Processing" },
    ],
    answer: "C",
    explanation: "Loan documents are signed at closing.",
  },
  {
    id: 31,
    prompt: "Why do lenders prefer borrowers with stable employment?",
    choices: [
      { key: "A", text: "To reduce appraisal costs" },
      { key: "B", text: "To demonstrate consistent income" },
      { key: "C", text: "To eliminate PMI" },
      { key: "D", text: "To lower property taxes" },
    ],
    answer: "B",
    explanation: "Stable employment shows consistent income to repay the loan.",
  },
  {
    id: 32,
    prompt: "Which is NOT normally used to verify income?",
    choices: [
      { key: "A", text: "Pay stubs" },
      { key: "B", text: "W-2s" },
      { key: "C", text: "Tax returns" },
      { key: "D", text: "Home inspection" },
    ],
    answer: "D",
    explanation: "A home inspection evaluates the property, not the borrower's income.",
  },
  {
    id: 33,
    prompt: "Conventional loan limits vary because of:",
    choices: [
      { key: "A", text: "Interest rates" },
      { key: "B", text: "Local housing costs" },
      { key: "C", text: "Credit scores" },
      { key: "D", text: "Property taxes" },
    ],
    answer: "B",
    explanation: "Conforming loan limits are adjusted by area based on local housing costs.",
  },
  {
    id: 34,
    prompt: "What happens if a property's appraisal comes in below the purchase price?",
    choices: [
      { key: "A", text: "The lender ignores it." },
      { key: "B", text: "The borrower may need to renegotiate or increase the down payment." },
      { key: "C", text: "The interest rate automatically decreases." },
      { key: "D", text: "PMI is waived." },
    ],
    answer: "B",
    explanation: "A low appraisal typically requires renegotiation or a larger down payment.",
  },
  {
    id: 35,
    prompt: "Which borrower is generally responsible for paying closing costs?",
    choices: [
      { key: "A", text: "Only the lender" },
      { key: "B", text: "The borrower" },
      { key: "C", text: "The appraiser" },
      { key: "D", text: "The title company" },
    ],
    answer: "B",
    explanation: "The borrower is generally responsible for closing costs, though some may be negotiated.",
  },
  {
    id: 36,
    prompt: "Closing costs generally range between:",
    choices: [
      { key: "A", text: "0–1%" },
      { key: "B", text: "1–2%" },
      { key: "C", text: "2–5%" },
      { key: "D", text: "8–10%" },
    ],
    answer: "C",
    explanation: "Closing costs typically run 2–5% of the loan amount.",
  },
  {
    id: 37,
    prompt: "Origination fees are charged for:",
    choices: [
      { key: "A", text: "Home inspections" },
      { key: "B", text: "Loan processing" },
      { key: "C", text: "Property taxes" },
      { key: "D", text: "Hazard insurance" },
    ],
    answer: "B",
    explanation: "Origination fees cover the lender's cost of processing the loan.",
  },
  {
    id: 38,
    prompt: "The Ability-to-Repay Rule requires lenders to:",
    choices: [
      { key: "A", text: "Guarantee approval" },
      { key: "B", text: "Verify the borrower can reasonably repay the loan" },
      { key: "C", text: "Eliminate PMI" },
      { key: "D", text: "Waive appraisals" },
    ],
    answer: "B",
    explanation: "The ATR rule requires lenders to make a good-faith determination of repayment ability.",
  },
  {
    id: 39,
    prompt: "Which law promotes fair access to credit?",
    choices: [
      { key: "A", text: "RESPA" },
      { key: "B", text: "ECOA" },
      { key: "C", text: "HMDA" },
      { key: "D", text: "SAFE Act" },
    ],
    answer: "B",
    explanation: "ECOA (Equal Credit Opportunity Act) promotes fair access to credit.",
  },
  {
    id: 40,
    prompt: "Which borrower would most likely need a gift letter?",
    choices: [
      { key: "A", text: "Someone using inherited money" },
      { key: "B", text: "Someone using personal savings" },
      { key: "C", text: "Someone receiving down-payment money from family" },
      { key: "D", text: "Someone using retirement funds" },
    ],
    answer: "C",
    explanation: "Gift letters document down-payment funds received from family.",
  },
  {
    id: 41,
    prompt: "A borrower has a 760 credit score and 25% down. Which loan feature will they most likely avoid?",
    choices: [
      { key: "A", text: "PMI" },
      { key: "B", text: "Fixed interest" },
      { key: "C", text: "Appraisal" },
      { key: "D", text: "Closing costs" },
    ],
    answer: "A",
    explanation: "With 20%+ down, PMI is not required on a conventional loan.",
  },
  {
    id: 42,
    prompt: "Which borrower would be most likely to use a non-conforming loan?",
    choices: [
      { key: "A", text: "Purchasing a home above conforming loan limits" },
      { key: "B", text: "Veteran buying a home" },
      { key: "C", text: "First-time FHA buyer" },
      { key: "D", text: "USDA rural borrower" },
    ],
    answer: "A",
    explanation: "Loans above conforming limits (jumbo) are non-conforming.",
  },
  {
    id: 43,
    prompt: "A borrower prefers payments that never change. Which mortgage is most appropriate?",
    choices: [
      { key: "A", text: "ARM" },
      { key: "B", text: "Fixed-rate mortgage" },
      { key: "C", text: "Interest-only mortgage" },
      { key: "D", text: "Balloon mortgage" },
    ],
    answer: "B",
    explanation: "A fixed-rate mortgage keeps principal and interest payments constant.",
  },
  {
    id: 44,
    prompt: "Why might someone intentionally choose an ARM?",
    choices: [
      { key: "A", text: "Guaranteed lower lifetime cost" },
      { key: "B", text: "Lower initial monthly payments" },
      { key: "C", text: "No qualification requirements" },
      { key: "D", text: "No interest charges" },
    ],
    answer: "B",
    explanation: "ARMs typically start with a lower introductory rate and payment.",
  },
  {
    id: 45,
    prompt: "Which ratio compares monthly debt obligations to gross monthly income?",
    choices: [
      { key: "A", text: "LTV" },
      { key: "B", text: "APR" },
      { key: "C", text: "DTI" },
      { key: "D", text: "CLTV" },
    ],
    answer: "C",
    explanation: "DTI (debt-to-income) compares monthly debt to gross monthly income.",
  },
  {
    id: 46,
    prompt: "What does a lender primarily evaluate during underwriting?",
    choices: [
      { key: "A", text: "Paint color" },
      { key: "B", text: "Borrower risk" },
      { key: "C", text: "School district" },
      { key: "D", text: "Property taxes only" },
    ],
    answer: "B",
    explanation: "Underwriting is an evaluation of borrower and loan risk.",
  },
  {
    id: 47,
    prompt: "Which item is NOT considered an asset verification document?",
    choices: [
      { key: "A", text: "Investment statement" },
      { key: "B", text: "Savings account statement" },
      { key: "C", text: "Bank statement" },
      { key: "D", text: "Credit report" },
    ],
    answer: "D",
    explanation: "A credit report shows liabilities and history, not assets.",
  },
  {
    id: 48,
    prompt: "Why is a professional appraisal required?",
    choices: [
      { key: "A", text: "To determine insurance premiums" },
      { key: "B", text: "To verify market value" },
      { key: "C", text: "To determine tax rates" },
      { key: "D", text: "To calculate DTI" },
    ],
    answer: "B",
    explanation: "Appraisals verify the property's market value for lending purposes.",
  },
  {
    id: 49,
    prompt: "Which employment history is generally preferred by lenders?",
    choices: [
      { key: "A", text: "Three employers in six months" },
      { key: "B", text: "Two years of stable employment" },
      { key: "C", text: "One month at current job" },
      { key: "D", text: "Seasonal work only" },
    ],
    answer: "B",
    explanation: "Lenders prefer a stable two-year employment history.",
  },
  {
    id: 50,
    prompt: "Borrowers with lower credit scores generally receive:",
    choices: [
      { key: "A", text: "Lower interest rates" },
      { key: "B", text: "Better loan terms" },
      { key: "C", text: "Higher interest rates" },
      { key: "D", text: "Guaranteed approval" },
    ],
    answer: "C",
    explanation: "Lower credit scores mean more risk and higher interest rates.",
  },
  {
    id: 51,
    prompt: "Which type of mortgage insurance is associated with conventional loans?",
    choices: [
      { key: "A", text: "FHA MIP" },
      { key: "B", text: "PMI" },
      { key: "C", text: "VA Funding Fee" },
      { key: "D", text: "USDA Guarantee Fee" },
    ],
    answer: "B",
    explanation: "PMI (private mortgage insurance) is used on conventional loans.",
  },
  {
    id: 52,
    prompt: "Which organization adjusts conforming loan limits each year?",
    choices: [
      { key: "A", text: "CFPB" },
      { key: "B", text: "HUD" },
      { key: "C", text: "FHFA" },
      { key: "D", text: "FHA" },
    ],
    answer: "C",
    explanation: "The FHFA sets annual conforming loan limits.",
  },
  {
    id: 53,
    prompt: "Which is considered a compensating factor when DTI is slightly above guidelines?",
    choices: [
      { key: "A", text: "Stable income" },
      { key: "B", text: "Late payments" },
      { key: "C", text: "Poor credit" },
      { key: "D", text: "Recent bankruptcy" },
    ],
    answer: "A",
    explanation: "Stable income can offset a slightly high DTI.",
  },
  {
    id: 54,
    prompt: "Which stage usually occurs before making an offer on a home?",
    choices: [
      { key: "A", text: "Closing" },
      { key: "B", text: "Underwriting" },
      { key: "C", text: "Pre-approval" },
      { key: "D", text: "Funding" },
    ],
    answer: "C",
    explanation: "Pre-approval typically happens before making an offer.",
  },
  {
    id: 55,
    prompt: "Why do lenders collect tax returns?",
    choices: [
      { key: "A", text: "To verify citizenship" },
      { key: "B", text: "To verify income" },
      { key: "C", text: "To determine home value" },
      { key: "D", text: "To calculate PMI" },
    ],
    answer: "B",
    explanation: "Tax returns are used to verify borrower income.",
  },
  {
    id: 56,
    prompt: "Which loan product generally carries more risk because payments can increase?",
    choices: [
      { key: "A", text: "Fixed-rate mortgage" },
      { key: "B", text: "ARM" },
      { key: "C", text: "15-year mortgage" },
      { key: "D", text: "Conventional conforming loan" },
    ],
    answer: "B",
    explanation: "ARM payments can rise when the rate adjusts.",
  },
  {
    id: 57,
    prompt: "A borrower wants predictable budgeting for the next 30 years. Which feature is most important?",
    choices: [
      { key: "A", text: "Adjustable rate" },
      { key: "B", text: "Fixed interest rate" },
      { key: "C", text: "Interest-only payments" },
      { key: "D", text: "Balloon payment" },
    ],
    answer: "B",
    explanation: "A fixed rate gives predictable long-term payments.",
  },
  {
    id: 58,
    prompt: "Which federal law requires lenders to disclose loan costs before closing?",
    choices: [
      { key: "A", text: "ECOA" },
      { key: "B", text: "TILA" },
      { key: "C", text: "SAFE Act" },
      { key: "D", text: "HMDA" },
    ],
    answer: "B",
    explanation: "TILA requires lenders to disclose loan costs and terms.",
  },
  {
    id: 59,
    prompt: "Which law makes it illegal to discriminate during the lending process?",
    choices: [
      { key: "A", text: "RESPA" },
      { key: "B", text: "ECOA" },
      { key: "C", text: "TILA" },
      { key: "D", text: "Regulation X" },
    ],
    answer: "B",
    explanation: "ECOA prohibits discrimination in credit transactions.",
  },
  {
    id: 60,
    prompt: "What is the primary goal of a Mortgage Loan Originator (MLO)?",
    choices: [
      { key: "A", text: "Sell the highest-interest loan available" },
      { key: "B", text: "Match borrowers with the loan product that best fits their needs" },
      { key: "C", text: "Approve all loan applications" },
      { key: "D", text: "Determine home values" },
    ],
    answer: "B",
    explanation: "An MLO's role is to match borrowers with suitable loan products.",
  },
];

export const chapter1Page2: Question[] = [
  { id: 1, prompt: "Which government-sponsored enterprises (GSEs) establish the guidelines for conforming loans?", choices: [
    { key: "A", text: "FHA, VA, and USDA" },
    { key: "B", text: "Fannie Mae, Farmer Mac, and Freddie Mac" },
    { key: "C", text: "CFPB, HUD, and FHA" },
    { key: "D", text: "Federal Reserve and FDIC" },
  ], answer: "B" },
  { id: 2, prompt: "A conforming loan must meet which of the following requirements?", choices: [
    { key: "A", text: "Only the borrower's income requirements" },
    { key: "B", text: "Only loan amount requirements" },
    { key: "C", text: "Guidelines established by the GSEs" },
    { key: "D", text: "Only property value requirements" },
  ], answer: "C" },
  { id: 3, prompt: "Why are conforming loans attractive to lenders?", choices: [
    { key: "A", text: "They require no documentation." },
    { key: "B", text: "They can be sold in the secondary mortgage market." },
    { key: "C", text: "They always have higher interest rates." },
    { key: "D", text: "They never require appraisals." },
  ], answer: "B" },
  { id: 4, prompt: "Who establishes the annual conforming loan limits?", choices: [
    { key: "A", text: "CFPB" },
    { key: "B", text: "HUD" },
    { key: "C", text: "FHFA" },
    { key: "D", text: "FHA" },
  ], answer: "C" },
  { id: 5, prompt: "As of 2024, the standard conforming loan limit in most U.S. areas for a single-family home is:", choices: [
    { key: "A", text: "$650,000" },
    { key: "B", text: "$700,000" },
    { key: "C", text: "$726,200" },
    { key: "D", text: "$1,000,000" },
  ], answer: "C" },
  { id: 6, prompt: "High-cost housing markets may have conforming loan limits:", choices: [
    { key: "A", text: "Lower than the national limit" },
    { key: "B", text: "Equal to the national limit only" },
    { key: "C", text: "Exceeding $1 million" },
    { key: "D", text: "Limited to $800,000" },
  ], answer: "C" },
  { id: 7, prompt: "What is the typical minimum credit score required for a conforming loan?", choices: [
    { key: "A", text: "580" },
    { key: "B", text: "600" },
    { key: "C", text: "620" },
    { key: "D", text: "680" },
  ], answer: "C" },
  { id: 8, prompt: "Borrowers with credit scores of 740 or higher generally receive:", choices: [
    { key: "A", text: "Higher down payment requirements" },
    { key: "B", text: "Better interest rates and loan terms" },
    { key: "C", text: "Automatic approval" },
    { key: "D", text: "No appraisal requirement" },
  ], answer: "B" },
  { id: 9, prompt: "When evaluating a borrower's creditworthiness, lenders review all of the following EXCEPT:", choices: [
    { key: "A", text: "Payment history" },
    { key: "B", text: "Credit utilization" },
    { key: "C", text: "Types of credit accounts" },
    { key: "D", text: "Homeowner's insurance deductible" },
  ], answer: "D" },
  { id: 10, prompt: "Lenders generally prefer a debt-to-income (DTI) ratio of:", choices: [
    { key: "A", text: "28% or less" },
    { key: "B", text: "36% or less" },
    { key: "C", text: "43% or less" },
    { key: "D", text: "50% or less" },
  ], answer: "C" },
  { id: 11, prompt: "A borrower's DTI ratio compares:", choices: [
    { key: "A", text: "Assets to liabilities" },
    { key: "B", text: "Monthly debt payments to gross monthly income" },
    { key: "C", text: "Home value to loan amount" },
    { key: "D", text: "Income to savings" },
  ], answer: "B" },
  { id: 12, prompt: "Which statement best describes a non-conforming loan?", choices: [
    { key: "A", text: "It follows all GSE guidelines." },
    { key: "B", text: "It is guaranteed by the federal government." },
    { key: "C", text: "It does not meet GSE guidelines." },
    { key: "D", text: "It always has lower interest rates." },
  ], answer: "C" },
  { id: 13, prompt: "The most common type of non-conforming loan is:", choices: [
    { key: "A", text: "FHA Loan" },
    { key: "B", text: "VA Loan" },
    { key: "C", text: "Jumbo Loan" },
    { key: "D", text: "USDA Loan" },
  ], answer: "C" },
  { id: 14, prompt: "A jumbo loan is considered non-conforming because it:", choices: [
    { key: "A", text: "Has a fixed interest rate." },
    { key: "B", text: "Exceeds conforming loan limits." },
    { key: "C", text: "Requires PMI." },
    { key: "D", text: "Is government insured." },
  ], answer: "B" },
  { id: 15, prompt: "Non-conforming loans are often attractive because they:", choices: [
    { key: "A", text: "Eliminate all qualification requirements." },
    { key: "B", text: "Offer greater flexibility for unique borrower situations." },
    { key: "C", text: "Always have lower interest rates." },
    { key: "D", text: "Require no documentation." },
  ], answer: "B" },
  { id: 16, prompt: "Which borrower is MOST likely to benefit from a non-conforming loan?", choices: [
    { key: "A", text: "A borrower purchasing a modest starter home." },
    { key: "B", text: "A borrower financing a luxury home above conforming limits." },
    { key: "C", text: "A borrower using a VA loan." },
    { key: "D", text: "A borrower seeking an FHA loan." },
  ], answer: "B" },
  { id: 17, prompt: "Some lenders may approve a jumbo loan for a borrower with a credit score as low as:", choices: [
    { key: "A", text: "580" },
    { key: "B", text: "600" },
    { key: "C", text: "620" },
    { key: "D", text: "680" },
  ], answer: "C" },
  { id: 18, prompt: "Non-conforming loans may allow DTI ratios higher than 43% if the borrower has:", choices: [
    { key: "A", text: "A co-signer only" },
    { key: "B", text: "Compensating factors" },
    { key: "C", text: "No employment history" },
    { key: "D", text: "No assets" },
  ], answer: "B" },
  { id: 19, prompt: "Examples of compensating factors include:", choices: [
    { key: "A", text: "Poor payment history" },
    { key: "B", text: "Significant cash reserves" },
    { key: "C", text: "Multiple recent bankruptcies" },
    { key: "D", text: "High credit utilization" },
  ], answer: "B" },
  { id: 20, prompt: "Which statement correctly compares conforming and non-conforming loans?", choices: [
    { key: "A", text: "Both have identical qualification requirements." },
    { key: "B", text: "Only conforming loans follow FHFA loan limits." },
    { key: "C", text: "Non-conforming loans must meet GSE guidelines." },
    { key: "D", text: "Jumbo loans are conforming loans." },
  ], answer: "B" },
  { id: 21, prompt: "One of the biggest differences between conforming and non-conforming loans is:", choices: [
    { key: "A", text: "Property taxes" },
    { key: "B", text: "Loan limits" },
    { key: "C", text: "Closing costs" },
    { key: "D", text: "Loan servicing" },
  ], answer: "B" },
  { id: 22, prompt: "A borrower wants to finance a $900,000 home in an area where the conforming loan limit is $726,200. Which loan is most likely required?", choices: [
    { key: "A", text: "FHA Loan" },
    { key: "B", text: "Conforming Loan" },
    { key: "C", text: "Non-conforming (Jumbo) Loan" },
    { key: "D", text: "USDA Loan" },
  ], answer: "C" },
  { id: 23, prompt: "Why do conforming loans generally have lower interest rates?", choices: [
    { key: "A", text: "They require larger down payments." },
    { key: "B", text: "They present less risk to lenders because they meet GSE guidelines." },
    { key: "C", text: "They require PMI." },
    { key: "D", text: "They have shorter loan terms." },
  ], answer: "B" },
  { id: 24, prompt: "Non-conforming loans often carry higher interest rates because lenders consider them:", choices: [
    { key: "A", text: "Easier to underwrite" },
    { key: "B", text: "Backed by the government" },
    { key: "C", text: "Higher-risk investments" },
    { key: "D", text: "Exempt from regulations" },
  ], answer: "C" },
  { id: 25, prompt: "A borrower with a conforming loan puts down 10%. Which statement is most likely true?", choices: [
    { key: "A", text: "PMI will generally be required." },
    { key: "B", text: "PMI is prohibited." },
    { key: "C", text: "No mortgage insurance is ever required." },
    { key: "D", text: "The borrower automatically qualifies for a jumbo loan." },
  ], answer: "A" },
  { id: 26, prompt: "Private Mortgage Insurance (PMI) primarily protects:", choices: [
    { key: "A", text: "The borrower" },
    { key: "B", text: "The real estate agent" },
    { key: "C", text: "The lender" },
    { key: "D", text: "The title company" },
  ], answer: "C" },
  { id: 27, prompt: "Some jumbo loan lenders may waive mortgage insurance if the borrower has:", choices: [
    { key: "A", text: "No credit history" },
    { key: "B", text: "Significant assets or a large down payment" },
    { key: "C", text: "A 580 credit score" },
    { key: "D", text: "No employment" },
  ], answer: "B" },
  { id: 28, prompt: "Compared to conforming loans, non-conforming loans generally provide:", choices: [
    { key: "A", text: "Less flexibility" },
    { key: "B", text: "Greater flexibility in qualification standards" },
    { key: "C", text: "Guaranteed approval" },
    { key: "D", text: "Lower closing costs" },
  ], answer: "B" },
  { id: 29, prompt: "Which borrower is MOST likely to benefit from the flexibility of a non-conforming loan?", choices: [
    { key: "A", text: "A borrower with steady W-2 income and excellent credit" },
    { key: "B", text: "A self-employed borrower with irregular income" },
    { key: "C", text: "A borrower seeking an FHA loan" },
    { key: "D", text: "A borrower purchasing a low-priced home" },
  ], answer: "B" },
  { id: 30, prompt: "Conforming loans generally require:", choices: [
    { key: "A", text: "Lower documentation standards" },
    { key: "B", text: "Compliance with specific documentation requirements" },
    { key: "C", text: "No proof of income" },
    { key: "D", text: "Only verbal verification of employment" },
  ], answer: "B" },
  { id: 31, prompt: "Which loan category typically offers a wider variety of specialty loan products?", choices: [
    { key: "A", text: "Conforming loans" },
    { key: "B", text: "Non-conforming loans" },
    { key: "C", text: "FHA loans" },
    { key: "D", text: "USDA loans" },
  ], answer: "B" },
  { id: 32, prompt: "Conforming loans primarily consist of:", choices: [
    { key: "A", text: "Reverse mortgages only" },
    { key: "B", text: "Balloon mortgages only" },
    { key: "C", text: "Fixed-rate and adjustable-rate mortgages" },
    { key: "D", text: "Construction loans only" },
  ], answer: "C" },
  { id: 33, prompt: "A loan designed specifically for an investment property is most likely found under:", choices: [
    { key: "A", text: "Conforming loan products only" },
    { key: "B", text: "Non-conforming loan products" },
    { key: "C", text: "VA loan products only" },
    { key: "D", text: "USDA loan products only" },
  ], answer: "B" },
  { id: 34, prompt: "Which is considered one of the major benefits of conforming loans?", choices: [
    { key: "A", text: "Higher interest rates" },
    { key: "B", text: "Lower interest rates" },
    { key: "C", text: "Larger required down payments" },
    { key: "D", text: "No underwriting standards" },
  ], answer: "B" },
  { id: 35, prompt: "Because conforming loans follow established guidelines, borrowers generally experience:", choices: [
    { key: "A", text: "A less predictable approval process" },
    { key: "B", text: "A more standardized lending process" },
    { key: "C", text: "Automatic loan approval" },
    { key: "D", text: "No documentation requirements" },
  ], answer: "B" },
  { id: 36, prompt: "Many first-time homebuyers prefer conforming loans because they often provide:", choices: [
    { key: "A", text: "Easier qualification for eligible borrowers" },
    { key: "B", text: "No closing costs" },
    { key: "C", text: "Unlimited loan amounts" },
    { key: "D", text: "No appraisal requirements" },
  ], answer: "A" },
  { id: 37, prompt: "Which is a primary advantage of non-conforming loans?", choices: [
    { key: "A", text: "Government guarantees" },
    { key: "B", text: "Flexibility for borrowers with unique financial situations" },
    { key: "C", text: "Mandatory low interest rates" },
    { key: "D", text: "Elimination of all underwriting" },
  ], answer: "B" },
  { id: 38, prompt: "Why are jumbo loans important in high-cost housing markets?", choices: [
    { key: "A", text: "They eliminate down payments." },
    { key: "B", text: "They allow borrowers to finance homes above conforming loan limits." },
    { key: "C", text: "They eliminate closing costs." },
    { key: "D", text: "They automatically waive PMI." },
  ], answer: "B" },
  { id: 39, prompt: "Non-conforming loans can be especially useful for borrowers purchasing:", choices: [
    { key: "A", text: "Only primary residences" },
    { key: "B", text: "Luxury homes, investment properties, or second homes" },
    { key: "C", text: "Manufactured homes only" },
    { key: "D", text: "Government-owned homes only" },
  ], answer: "B" },
  { id: 40, prompt: "A borrower has irregular income but substantial assets and excellent cash reserves. Which loan type may provide greater flexibility?", choices: [
    { key: "A", text: "Conforming loan" },
    { key: "B", text: "Non-conforming loan" },
    { key: "C", text: "USDA loan" },
    { key: "D", text: "FHA loan" },
  ], answer: "B" },
  { id: 41, prompt: "Which of the following is a potential drawback of a conforming loan?", choices: [
    { key: "A", text: "Unlimited loan amounts" },
    { key: "B", text: "Higher interest rates" },
    { key: "C", text: "Strict qualification requirements" },
    { key: "D", text: "No secondary market" },
  ], answer: "C" },
  { id: 42, prompt: "A borrower has a 590 credit score and a high DTI ratio. Based on the chapter, which loan type may provide greater flexibility?", choices: [
    { key: "A", text: "Conforming Loan" },
    { key: "B", text: "Non-conforming Loan" },
    { key: "C", text: "FHA Loan" },
    { key: "D", text: "USDA Loan" },
  ], answer: "B" },
  { id: 43, prompt: "Borrowers who make less than a 20% down payment on a conforming loan generally must pay:", choices: [
    { key: "A", text: "HOA dues" },
    { key: "B", text: "PMI" },
    { key: "C", text: "Escrow penalties" },
    { key: "D", text: "Mortgage points" },
  ], answer: "B" },
  { id: 44, prompt: "What is one disadvantage of paying PMI?", choices: [
    { key: "A", text: "It lowers your home's value." },
    { key: "B", text: "It increases your monthly housing costs." },
    { key: "C", text: "It increases your credit score." },
    { key: "D", text: "It eliminates closing costs." },
  ], answer: "B" },
  { id: 45, prompt: "According to the chapter, PMI may eventually be removed after:", choices: [
    { key: "A", text: "The borrower refinances." },
    { key: "B", text: "Sufficient equity has been established." },
    { key: "C", text: "Five years have passed." },
    { key: "D", text: "The interest rate changes." },
  ], answer: "B" },
  { id: 46, prompt: "Which borrower is MOST likely to struggle qualifying for a conforming loan?", choices: [
    { key: "A", text: "A borrower with excellent credit and low DTI." },
    { key: "B", text: "A borrower with a high credit score and stable employment." },
    { key: "C", text: "A borrower with a lower credit score and high DTI." },
    { key: "D", text: "A borrower with a large down payment." },
  ], answer: "C" },
  { id: 47, prompt: "Which of the following is considered a drawback of many non-conforming loans?", choices: [
    { key: "A", text: "Lower loan limits" },
    { key: "B", text: "Lower interest rates" },
    { key: "C", text: "Higher interest rates" },
    { key: "D", text: "Government guarantees" },
  ], answer: "C" },
  { id: 48, prompt: "Compared to conforming loans, non-conforming loans often have:", choices: [
    { key: "A", text: "More standardized underwriting" },
    { key: "B", text: "Less standardized lending guidelines" },
    { key: "C", text: "Lower property values" },
    { key: "D", text: "Lower loan amounts" },
  ], answer: "B" },
  { id: 49, prompt: "Because non-conforming loan guidelines vary by lender, borrowers may experience:", choices: [
    { key: "A", text: "An identical approval process everywhere." },
    { key: "B", text: "A less predictable lending process." },
    { key: "C", text: "Automatic approval." },
    { key: "D", text: "No documentation requirements." },
  ], answer: "B" },
  { id: 50, prompt: "A borrower is financially qualified but cannot make a large down payment. Which potential drawback of a non-conforming loan could become an obstacle?", choices: [
    { key: "A", text: "Lower loan limits" },
    { key: "B", text: "Mandatory PMI" },
    { key: "C", text: "Higher down payment requirements" },
    { key: "D", text: "No available loan products" },
  ], answer: "C" },
  { id: 51, prompt: "Which statement BEST describes the purpose of conforming loan guidelines?", choices: [
    { key: "A", text: "To eliminate underwriting." },
    { key: "B", text: "To create consistent lending standards." },
    { key: "C", text: "To increase interest rates." },
    { key: "D", text: "To eliminate credit checks." },
  ], answer: "B" },
  { id: 52, prompt: "A borrower purchasing a luxury home in an expensive housing market is MOST likely to need:", choices: [
    { key: "A", text: "A conforming loan." },
    { key: "B", text: "A USDA loan." },
    { key: "C", text: "A jumbo (non-conforming) loan." },
    { key: "D", text: "An FHA loan." },
  ], answer: "C" },
  { id: 53, prompt: "Why do lenders often view jumbo loans as carrying more risk?", choices: [
    { key: "A", text: "They are insured by the government." },
    { key: "B", text: "They exceed conforming loan limits." },
    { key: "C", text: "They require lower documentation." },
    { key: "D", text: "They always have adjustable rates." },
  ], answer: "B" },
  { id: 54, prompt: "Which of the following is NOT listed as a benefit of conforming loans?", choices: [
    { key: "A", text: "Lower interest rates" },
    { key: "B", text: "Standardized lending process" },
    { key: "C", text: "Easier qualification for eligible borrowers" },
    { key: "D", text: "Unlimited borrowing amounts" },
  ], answer: "D" },
  { id: 55, prompt: "Which of the following is NOT listed as a benefit of non-conforming loans?", choices: [
    { key: "A", text: "Higher loan amounts" },
    { key: "B", text: "Flexible qualification standards" },
    { key: "C", text: "Diverse loan products" },
    { key: "D", text: "Lower interest rates" },
  ], answer: "D" },
  { id: 56, prompt: "A borrower wants financing for a second home that does not fit standard lending guidelines. Which loan category may offer products designed for this need?", choices: [
    { key: "A", text: "Conforming Loan" },
    { key: "B", text: "Non-conforming Loan" },
    { key: "C", text: "USDA Loan" },
    { key: "D", text: "FHA Loan" },
  ], answer: "B" },
  { id: 57, prompt: "A borrower has strong cash reserves, a high income, and a DTI ratio slightly above 43%. Based on the chapter, a lender may approve which type of loan?", choices: [
    { key: "A", text: "Conforming only" },
    { key: "B", text: "Non-conforming" },
    { key: "C", text: "USDA only" },
    { key: "D", text: "VA only" },
  ], answer: "B" },
  { id: 58, prompt: "Which statement is TRUE regarding loan qualification?", choices: [
    { key: "A", text: "Conforming loans generally require stricter qualification standards than non-conforming loans." },
    { key: "B", text: "Non-conforming loans always require lower credit scores." },
    { key: "C", text: "Both loan types use identical qualification standards." },
    { key: "D", text: "Conforming loans require no documentation." },
  ], answer: "A" },
  { id: 59, prompt: "A borrower is comparing loan options. Which feature would MOST likely lead them to choose a conforming loan over a non-conforming loan?", choices: [
    { key: "A", text: "Higher interest rates" },
    { key: "B", text: "Less predictable underwriting" },
    { key: "C", text: "Lower borrowing costs" },
    { key: "D", text: "Larger required down payment" },
  ], answer: "C" },
  { id: 60, prompt: "Which statement BEST summarizes the difference between conforming and non-conforming loans?", choices: [
    { key: "A", text: "Conforming loans follow GSE guidelines and loan limits, while non-conforming loans do not." },
    { key: "B", text: "Non-conforming loans are always government-backed." },
    { key: "C", text: "Both loan types require identical qualification standards." },
    { key: "D", text: "Conforming loans are only available to first-time homebuyers." },
  ], answer: "A" },
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

export const QUESTIONS_PER_ATTEMPT = 20;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

/**
 * Returns a randomized attempt: up to `count` questions sampled from the pool,
 * with each question's answer choices shuffled and re-lettered A-D. The
 * `answer` field is updated to match the choice's new letter so grading and
 * feedback continue to work unchanged.
 */
export function buildAttempt(
  pool: Question[],
  count: number = QUESTIONS_PER_ATTEMPT,
): Question[] {
  const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
  return picked.map((q) => {
    const shuffledChoices = shuffle(q.choices);
    const newChoices = shuffledChoices.map((c, i) => ({ key: LETTERS[i], text: c.text }));
    const correctIdx = shuffledChoices.findIndex((c) => c.key === q.answer);
    return {
      ...q,
      choices: newChoices,
      answer: LETTERS[correctIdx],
    };
  });
}
