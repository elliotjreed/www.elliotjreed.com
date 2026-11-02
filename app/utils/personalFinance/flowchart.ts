/**
 * The UK Personal Finance flowchart, expressed as an ordered list of gates.
 *
 * Adapted from the community flowchart at https://ukpersonal.finance/flowchart/
 * (version 3.0.10), used under the Creative Commons Attribution-NonCommercial-
 * ShareAlike licence. The published chart is a diagram; this expresses the same
 * order of operations as a question at each step, so a reader can be told which
 * step applies to them rather than tracing the diagram themselves.
 *
 * The order is deliberate: each step earns a better guaranteed return than the
 * one below it, so working down the list beats picking steps at random.
 */

export type GateAnswer = "yes" | "no";

export interface RefinementOption {
  value: string;
  label: string;
  /** The tailored recommendation shown when this option is chosen. */
  guidance: string;
}

export interface Refinement {
  id: string;
  question: string;
  options: RefinementOption[];
}

export interface FlowchartOutcome {
  id: string;
  /** Step number in the published flowchart. */
  stepNumber: number;
  title: string;
  /** What to do now, in one sentence. */
  summary: string;
  /** Why this comes at this point in the order. */
  why: string;
  actions: string[];
  /** Marks a situation where free debt advice matters more than any ordering. */
  urgent?: boolean;
  refinement?: Refinement;
}

export interface FlowchartGate {
  id: string;
  question: string;
  help?: string;
  /** The answer meaning this step still needs work. */
  triggerAnswer: GateAnswer;
  outcomeId: string;
}

/** Each step of the published flowchart, for the roadmap view. */
export interface FlowchartStep {
  number: number;
  title: string;
  description: string;
}

export const FLOWCHART_VERSION = "3.0.10";
export const FLOWCHART_SOURCE_URL = "https://ukpersonal.finance/flowchart/";
export const FLOWCHART_LICENCE_URL = "https://creativecommons.org/licenses/by-nc-sa/4.0/";

/** Interest rate above which debt is treated as expensive and cleared first. */
export const EXPENSIVE_DEBT_APR = 10;

export const FLOWCHART_STEPS: FlowchartStep[] = [
  {
    number: 1,
    title: "Budget and clear expensive debt",
    description: "Cover your essential bills, then clear anything charging more than about 10% APR.",
  },
  {
    number: 2,
    title: "Starter emergency fund",
    description: "Put aside one to three months of essential outgoings in cash you can reach quickly.",
  },
  {
    number: 3,
    title: "Take the employer pension match",
    description: "Contribute enough to claim every penny your employer will match.",
  },
  {
    number: 4,
    title: "Deal with remaining debt",
    description: "Schedule the cheaper debts, paying the highest interest rate first.",
  },
  {
    number: 5,
    title: "Finish the emergency fund",
    description: "Build to three to twelve months of outgoings, depending on how stable your income is.",
  },
  {
    number: 6,
    title: "Set your goals",
    description: "Write down what you are saving for, how much it needs, and by when.",
  },
  {
    number: 7,
    title: "Short-term goals (under five years)",
    description: "Keep money you will need soon in cash, not investments.",
  },
  {
    number: 8,
    title: "Long-term goals (five years or more)",
    description: "Invest through tax-efficient accounts in low-cost, broadly diversified funds.",
  },
];

export const FLOWCHART_OUTCOMES: FlowchartOutcome[] = [
  {
    id: "essentials",
    stepNumber: 1,
    title: "Get support with essential costs",
    summary:
      "Borrowing to cover essentials is a sign to get free debt advice before anything else on this list applies.",
    why: "No savings or investing decision improves a shortfall on rent, council tax or food. Free charity advisers can negotiate with creditors, check the benefits you are entitled to, and stop the situation worsening.",
    urgent: true,
    actions: [
      "Contact a free debt charity: StepChange, National Debtline, or Citizens Advice. Never pay a company for debt advice.",
      "Use the free benefits calculator on the MoneyHelper or Turn2us website to check what you are entitled to.",
      "List your essential bills in priority order: rent or mortgage, council tax, energy, food, and transport to work.",
      "Speak to creditors early. Many have hardship schemes, and council tax and energy arrears have specific protections.",
    ],
  },
  {
    id: "expensive-debt",
    stepNumber: 1,
    title: "Clear your expensive debt",
    summary: `Pay off debt charging more than about ${EXPENSIVE_DEBT_APR}% APR before saving or investing beyond a small buffer.`,
    why: "Clearing a debt at 25% APR is a guaranteed 25% return. No savings account or investment reliably beats that, so this comes before almost everything else.",
    actions: [
      "Make the minimum payment on every debt so nothing defaults.",
      "Put every spare pound at the debt with the highest interest rate, then move to the next one down.",
      "Check whether a 0% balance transfer or a credit union loan could cut the rate while you clear it.",
      "Overdrafts often charge around 40% APR, which makes them a priority even when the balance looks small.",
    ],
  },
  {
    id: "starter-emergency-fund",
    stepNumber: 2,
    title: "Build a starter emergency fund",
    summary: "Save one to three months of essential outgoings in an easy-access account.",
    why: "A small cash buffer is what stops the next boiler repair or car bill going onto a credit card at 25% APR. It comes before the pension match because without it you are one surprise away from expensive debt.",
    actions: [
      "Aim for one month of essential outgoings first, then build towards three.",
      "Keep it in an easy-access savings account, not in investments or a fixed-term bond.",
      "Compare rates regularly; easy-access rates move, and loyalty is rarely rewarded.",
      "Keep it separate from your current account so it is not spent by accident.",
    ],
  },
  {
    id: "pension-match",
    stepNumber: 3,
    title: "Claim your full employer pension match",
    summary: "Contribute enough to your workplace pension to get every penny your employer will match.",
    why: "An employer match is an immediate, guaranteed return on your contribution, often 100%. Turning it down is turning down part of your salary, which is why it outranks clearing cheaper debt.",
    actions: [
      "Check your scheme's matching terms; many match beyond the auto-enrolment minimum if you ask.",
      "Increase your contribution to at least the level that gets the full match.",
      "Ask whether your employer offers salary sacrifice, which also saves National Insurance.",
      "Auto-enrolment minimums are a floor, not a target, and are rarely enough on their own.",
    ],
  },
  {
    id: "remaining-debt",
    stepNumber: 4,
    title: "Deal with your remaining debt",
    summary: "Write a repayment schedule for your cheaper debts, clearing the highest interest rate first.",
    why: "These debts are cheap enough that the emergency fund and pension match came first, but paying them down is still a guaranteed return, and clearing them frees up income for everything below.",
    actions: [
      "List every debt with its balance, interest rate and minimum payment.",
      "Pay the minimum on all of them, then overpay the one with the highest rate.",
      "Watch for 0% deals ending, as the rate afterwards can jump into expensive territory.",
      "Student loans work differently and are usually left on the standard repayment; they are not included here.",
    ],
  },
  {
    id: "full-emergency-fund",
    stepNumber: 5,
    title: "Finish your emergency fund",
    summary: "Build your cash buffer up to between three and twelve months of outgoings.",
    why: "This is what protects you against redundancy or illness rather than a one-off bill. How much you need depends entirely on how quickly your income could stop and how easily you could replace it.",
    actions: [
      "Keep it in easy-access cash so you are never forced to sell investments at a bad moment.",
      "Base the target on essential outgoings, not your whole budget.",
      "Revisit the figure whenever your rent, mortgage or household circumstances change.",
    ],
    refinement: {
      id: "income-stability",
      question: "How stable and predictable is your household income?",
      options: [
        {
          value: "very-stable",
          label: "Very stable: two secure incomes, or one very secure income",
          guidance:
            "Around three months of essential outgoings is a reasonable target. With two incomes, it is unlikely both stop at once, so a smaller buffer stretches further.",
        },
        {
          value: "typical",
          label: "Typical: one stable salaried income",
          guidance:
            "Aim for around six months of essential outgoings. That is enough to cover a realistic job search without touching longer-term money.",
        },
        {
          value: "variable",
          label: "Variable: self-employed, contract, commission or irregular hours",
          guidance:
            "Aim for the higher end, around nine to twelve months of essential outgoings. Irregular income means both a longer gap between payments and a slower recovery, and you may have no sick pay or redundancy protection.",
        },
      ],
    },
  },
  {
    id: "goals",
    stepNumber: 6,
    title: "Write down your goals",
    summary: "Give each goal an amount and a target date before choosing where to put the money.",
    why: "Where money should sit depends almost entirely on when you need it. Without a date you cannot tell whether a goal belongs in cash or in investments, so this step comes before either.",
    actions: [
      "List each goal with the amount it needs and the year you need it.",
      "Split them into under five years and five years or more; that line decides cash against investing.",
      "Include the unglamorous ones: replacing the car, a new boiler, or a wedding.",
      "Be honest about which are wants and which are needs, so you know what gives if money is tight.",
    ],
  },
  {
    id: "short-term",
    stepNumber: 7,
    title: "Fund your short-term goals",
    summary: "Money you need within five years belongs in cash, not investments.",
    why: "Investments can fall for years at a time. Over a short horizon there may be no time to recover, so a lower guaranteed return beats the risk of having less than you started with on the day you need it.",
    actions: [
      "Use easy-access or fixed-term savings accounts, matching the term to when you need the money.",
      "Premium Bonds are a reasonable home for larger balances, though the average return is modest and prizes are not guaranteed.",
      "Interest above your Personal Savings Allowance is taxable, so consider a cash ISA once balances grow.",
      "From 6 April 2027 the cash ISA limit falls to £12,000 a year for under-65s, with the overall £20,000 ISA allowance unchanged. Those aged 65 and over keep the full £20,000 in cash.",
    ],
    refinement: {
      id: "first-home",
      question: "Are you saving for your first home?",
      options: [
        {
          value: "yes",
          label: "Yes, I am a first-time buyer saving for a deposit",
          guidance:
            "A Lifetime ISA is usually the strongest option. The government adds a 25% bonus on up to £4,000 a year, so £4,000 becomes £5,000, and it counts towards your £20,000 ISA allowance. You must be 18 to 39 to open one, the property must cost £450,000 or less, and the account must be open at least 12 months before you buy. Withdrawing for anything else before 60 costs a 25% charge, which takes back more than the bonus.",
        },
        {
          value: "no",
          label: "No, this is for something else",
          guidance:
            "Match the account to the date you need the money. Easy-access for anything uncertain, and a fixed-term account for a known date, which usually pays a little more in exchange for locking it away.",
        },
      ],
    },
  },
  {
    id: "long-term",
    stepNumber: 8,
    title: "Invest for your long-term goals",
    summary: "For money you will not touch for five years or more, invest through tax-efficient accounts.",
    why: "Over long periods investing has historically beaten cash comfortably, and the tax wrappers below shelter the growth. This is the last step because everything above it either earns a better guaranteed return or protects you from having to sell at the worst moment.",
    actions: [
      "Use a pension first if you can leave the money until at least 57, especially as a higher-rate taxpayer: contributions get relief at your marginal rate.",
      "A stocks and shares ISA gives tax-free growth with no age restriction, within the £20,000 annual allowance shared across all ISA types.",
      "A Lifetime ISA adds a 25% bonus on up to £4,000 a year, but for retirement the money is locked until 60.",
      "Choose low-cost, broadly diversified funds such as a global index tracker; costs are one of the few things you control.",
      "Once the pension annual allowance (£60,000) and ISA allowance are used, a general investment account is the next stop, using the capital gains and dividend allowances.",
    ],
  },
];

/**
 * The gates, asked in order. The first gate answered with its trigger answer
 * identifies the step the reader should act on now.
 */
export const FLOWCHART_GATES: FlowchartGate[] = [
  {
    id: "covers-essentials",
    question: "Can you cover your essential bills each month without borrowing?",
    help: "Essentials means rent or mortgage, council tax, energy, food, and getting to work.",
    triggerAnswer: "no",
    outcomeId: "essentials",
  },
  {
    id: "expensive-debt",
    question: `Do you have any debt charging more than about ${EXPENSIVE_DEBT_APR}% APR?`,
    help: "Typically credit cards, store cards, overdrafts, payday loans and car finance. Exclude your mortgage and student loan.",
    triggerAnswer: "yes",
    outcomeId: "expensive-debt",
  },
  {
    id: "starter-fund",
    question: "Do you have at least one month of essential outgoings saved in easy-access cash?",
    help: "Money you could reach today without a penalty or selling an investment.",
    triggerAnswer: "no",
    outcomeId: "starter-emergency-fund",
  },
  {
    id: "pension-match",
    question: "Does your employer offer to match pension contributions you are not yet claiming in full?",
    help: "Answer no if you already get the maximum match, or if you are self-employed or your employer offers no match.",
    triggerAnswer: "yes",
    outcomeId: "pension-match",
  },
  {
    id: "other-debt",
    question: "Do you have any other debt, apart from your mortgage and student loan?",
    help: "The cheaper borrowing left over: personal loans, car finance, or a 0% credit card balance.",
    triggerAnswer: "yes",
    outcomeId: "remaining-debt",
  },
  {
    id: "full-fund",
    question: "Do you have at least three months of essential outgoings saved in cash?",
    help: "This is the buffer that covers redundancy or illness, rather than a one-off bill.",
    triggerAnswer: "no",
    outcomeId: "full-emergency-fund",
  },
  {
    id: "goals-written",
    question: "Have you written down your goals with an amount and a target date for each?",
    help: "For example: £15,000 house deposit by 2030, or retire at 60.",
    triggerAnswer: "no",
    outcomeId: "goals",
  },
  {
    id: "short-term-goal",
    question: "Are you saving for something you will need within the next five years?",
    help: "A house deposit, a wedding, a car, or a career break.",
    triggerAnswer: "yes",
    outcomeId: "short-term",
  },
];

/** Reached when every gate is cleared: the reader is investing for the long term. */
export const FINAL_OUTCOME_ID = "long-term";

export const outcomeById = (id: string): FlowchartOutcome => {
  const outcome = FLOWCHART_OUTCOMES.find((candidate) => candidate.id === id);

  if (outcome === undefined) {
    throw new Error(`Unknown flowchart outcome: ${id}`);
  }

  return outcome;
};
