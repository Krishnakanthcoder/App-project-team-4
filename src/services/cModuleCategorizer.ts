/**
 * ============================================================================
 * COMPLAINT CATEGORIZATION ENGINE
 * ============================================================================
 * Academic Project Context: 2nd-Year B.Tech CSE / AIML
 *
 * INTENDED PRODUCTION ARCHITECTURE:
 * A compiled C-language shared library / native module (e.g., `libcomplaint_classifier.so`
 * or a C-based microservice) invoked via Java JNI or a lightweight native bridge.
 *
 * C MODULE SPECIFICATION:
 * ----------------------------------------------------------------------------
 * typedef enum {
 *     CAT_CONSUMER,
 *     CAT_CYBER_FRAUD,
 *     CAT_TENANT_RENTAL,
 *     CAT_WORKPLACE,
 *     CAT_CONTRACT,
 *     CAT_HARASSMENT,
 *     CAT_IDENTITY_THEFT,
 *     CAT_TRAFFIC,
 *     CAT_GENERAL
 * } LegalCategory;
 *
 * struct CategoryResult {
 *     LegalCategory category;
 *     char matched_keywords[8][32];
 *     int match_count;
 *     float confidence_score;
 * };
 *
 * struct CategoryResult classify_complaint_text(const char* raw_text);
 * ----------------------------------------------------------------------------
 * ============================================================================
 */

import { CategorizationResult, LegalCategory } from '../types/legal';

/**
 * Keyword definitions mapped precisely to domain categories:
 * - CONSUMER: refund, product, seller, service, consumer
 * - CYBER / ONLINE FRAUD: OTP, UPI, bank, scam, fraud, transaction, phishing
 * - TENANT / RENTAL: landlord, tenant, rent, deposit, rental, lease
 * - WORKPLACE: salary, employer, office, workplace, termination
 * - CONTRACT: agreement, contract, breach
 * - HARASSMENT: threat, harassment, abuse, stalking
 * - IDENTITY THEFT: Aadhaar, identity, stolen identity, personal information
 */
export const CATEGORY_KEYWORDS: Record<Exclude<LegalCategory, 'TRAFFIC' | 'GENERAL'>, string[]> = {
  CONSUMER: ['refund', 'product', 'seller', 'service', 'consumer'],
  'CYBER / ONLINE FRAUD': ['otp', 'upi', 'bank', 'scam', 'fraud', 'transaction', 'phishing'],
  'TENANT / RENTAL': ['landlord', 'tenant', 'rent', 'deposit', 'rental', 'lease'],
  WORKPLACE: ['salary', 'employer', 'office', 'workplace', 'termination'],
  CONTRACT: ['agreement', 'contract', 'breach'],
  HARASSMENT: ['threat', 'harassment', 'abuse', 'stalking'],
  'IDENTITY THEFT': ['aadhaar', 'identity', 'stolen identity', 'personal information']
};

export const CATEGORY_LABELS: Record<LegalCategory, string> = {
  CONSUMER: 'Consumer Issue',
  'CYBER / ONLINE FRAUD': 'Cyber & Online Fraud',
  'TENANT / RENTAL': 'Tenant / Rental Issue',
  WORKPLACE: 'Workplace Issue',
  CONTRACT: 'Contract Dispute',
  HARASSMENT: 'Harassment & Safety Concern',
  'IDENTITY THEFT': 'Identity Theft',
  TRAFFIC: 'Traffic & Motor Vehicle Issue',
  GENERAL: 'General Issue / Unclassified'
};

/**
 * Complaint Categorization Engine (Core Keyword Matching Function)
 *
 * Replace this prototype categorization function with the C module during backend integration.
 *
 * @param complaintText - Raw text describing the user's grievance
 * @returns Preliminary category string (e.g. 'CONSUMER', 'TENANT / RENTAL', or 'GENERAL')
 */
// Replace this prototype categorization function with the C module during backend integration.
export function complaintCategorizationEngine(complaintText: string): LegalCategory {
  if (!complaintText || typeof complaintText !== 'string' || !complaintText.trim()) {
    return 'GENERAL';
  }

  const normalized = complaintText.toLowerCase();

  // Categories in evaluation order
  const categories: (keyof typeof CATEGORY_KEYWORDS)[] = [
    'TENANT / RENTAL',
    'CYBER / ONLINE FRAUD',
    'CONSUMER',
    'WORKPLACE',
    'CONTRACT',
    'HARASSMENT',
    'IDENTITY THEFT'
  ];

  let bestCategory: LegalCategory = 'GENERAL';
  let maxMatches = 0;

  for (const cat of categories) {
    const keywords = CATEGORY_KEYWORDS[cat];
    let matchCount = 0;

    for (const kw of keywords) {
      // Support multi-word phrases (e.g. 'stolen identity', 'personal information') and word boundary checks
      if (kw.includes(' ')) {
        if (normalized.includes(kw)) {
          matchCount++;
        }
      } else {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(normalized) || normalized.includes(kw)) {
          matchCount++;
        }
      }
    }

    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestCategory = cat;
    }
  }

  return bestCategory;
}

/**
 * Rich helper used by UI to get detailed category metadata, matched keywords,
 * and confidence scores for student jury demonstration.
 *
 * Replace this prototype categorization function with the C module during backend integration.
 */
// Replace this prototype categorization function with the C module during backend integration.
export function categorizeComplaint(rawText: string): CategorizationResult {
  const category = complaintCategorizationEngine(rawText);
  const normalized = (rawText || '').toLowerCase();

  if (category === 'GENERAL') {
    return {
      category: 'GENERAL',
      categoryLabel: CATEGORY_LABELS['GENERAL'],
      matchedKeywords: [],
      confidenceScore: 0.2,
      engineUsed: 'Prototype-Rule-Engine',
      explanation:
        'Preliminary category — automated keyword-based classification. No specific keywords matched predefined categories.'
    };
  }

  // Find which keywords triggered this category
  const matchedKeywords: string[] = [];
  const candidateKeywords = CATEGORY_KEYWORDS[category as keyof typeof CATEGORY_KEYWORDS] || [];

  for (const kw of candidateKeywords) {
    if (normalized.includes(kw)) {
      matchedKeywords.push(kw);
    }
  }

  const confidenceScore = Math.min(0.95, 0.5 + matchedKeywords.length * 0.12);

  return {
    category,
    categoryLabel: CATEGORY_LABELS[category],
    matchedKeywords,
    confidenceScore: Number(confidenceScore.toFixed(2)),
    engineUsed: 'Prototype-Rule-Engine',
    explanation: `Preliminary category — automated keyword-based classification. Matched keywords: ${matchedKeywords.join(
      ', '
    )}.`
  };
}

/**
 * Returns diagnostic details about the planned C engine integration
 * for academic presentation / jury inspection.
 */
export function getCEngineArchitectureInfo() {
  return {
    moduleName: 'libcomplaint_classifier (Planned C Module)',
    currentMode: 'Emulated Prototype (JavaScript Rule Engine)',
    cFunctionSignature: 'struct CategoryResult classify_complaint_text(const char* raw_text);',
    algorithm: 'Deterministic Token Frequency & Substring Match Vector',
    developerComment: 'Replace this prototype categorization function with the C module during backend integration.',
    supportedCategories: Object.keys(CATEGORY_KEYWORDS)
  };
}
