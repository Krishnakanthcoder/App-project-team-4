/**
 * ============================================================================
 * AI LEGAL AWARENESS SERVICE
 * ============================================================================
 * Academic Project Context: 2nd-Year B.Tech CSE / AIML
 *
 * SYSTEM INSTRUCTION FOR AI INTEGRATION:
 * "You are a legal awareness assistant, not a lawyer. Provide general educational
 * information only. Do not provide definitive legal advice. Do not fabricate laws,
 * legal sections, court cases, penalties, government procedures, or URLs. Clearly
 * state uncertainty. Encourage users to consult qualified legal professionals or
 * appropriate official authorities for situation-specific advice."
 *
 * ARCHITECTURAL ROLE:
 * Receives:
 *  1. Raw Complaint Text
 *  2. Preliminary Category (from C Engine / Categorizer)
 *  3. Relevant verified knowledge-base topics
 *
 * Returns:
 *  - Simplified explanation
 *  - General legal-awareness information
 *  - Possible next steps
 *  - Evidence / documents to preserve
 *  - When to seek professional assistance
 *  - Standard non-legal-advice disclaimer
 *
 * Note: API keys are NEVER exposed in client-side code. If no external backend
 * AI endpoint is configured, this service generates high-fidelity structured
 * guidance derived from verified domain knowledge rules.
 * ============================================================================
 */

import { KNOWLEDGE_BASE_TOPICS, VERIFIED_DISCLAIMER } from '../data/knowledgeBase';
import { LegalCategory, ReportRecord } from '../types/legal';

export interface AnalysisInput {
  complaintText: string;
  category: LegalCategory;
  categoryLabel: string;
  location?: string;
  contactedParty?: 'Yes' | 'No' | 'Not sure';
  uploadedDocumentNames?: string[];
}

export interface AnalysisResultOutput {
  summary: string;
  whatThisMayRelateTo: string;
  suggestedActions: string[];
  evidenceItems: string[];
  whenToSeekHelp: string[];
  disclaimer: string;
  source: 'Mock-AI-Service-Synthesizer' | 'Backend-Gemini-Bridge';
}

export const AI_SYSTEM_INSTRUCTION =
  'You are a legal awareness assistant, not a lawyer. Provide general educational information only. Do not provide definitive legal advice. Do not fabricate laws, legal sections, court cases, penalties, government procedures, or URLs. Clearly state uncertainty. Encourage users to consult qualified legal professionals or appropriate official authorities for situation-specific advice.';

/**
 * AI Legal Awareness Service - Generate structured awareness output
 */
export async function analyzeLegalIssue(input: AnalysisInput): Promise<AnalysisResultOutput> {
  // Simulate network/inference latency for realistic student jury demonstration
  await new Promise((resolve) => setTimeout(resolve, 800));

  const relevantTopic = KNOWLEDGE_BASE_TOPICS.find((t) => t.category === input.category);

  // Generate category-specific structured awareness synthesis
  switch (input.category) {
    case 'TENANT / RENTAL':
      return {
        summary: `Your issue involves tenancy relations regarding property occupancy, security deposit reimbursement, or rental agreement execution.`,
        whatThisMayRelateTo:
          'This typically relates to tenancy covenants, security deposit holding norms, handover terms, and contractual notice obligations established between property owners and tenants.',
        suggestedActions: [
          'Preserve all relevant communication and dated written notices exchange with the property owner.',
          'Review the signed Rental/Lease Agreement thoroughly, focusing on deposit deduction clauses, damage assessments, and notice duration.',
          'Communicate the issue clearly in writing where appropriate, requesting a formal settlement statement or return date.',
          'Consider contacting the appropriate local Rent Control authority, consumer forum, or a qualified property lawyer if amicable resolution fails.'
        ],
        evidenceItems: [
          'Original signed Tenancy / Lease Agreement',
          'Bank statement or digital transaction proofs of initial deposit and monthly rents',
          'High-resolution dated move-out inspection photographs of the property',
          'Copies of emails, WhatsApp/SMS correspondence regarding move-out and key handover'
        ],
        whenToSeekHelp: [
          'The landlord attempts unlawful eviction or threatens lock-out without judicial process',
          'Substantial monetary sum is unlawfully retained without contractual basis',
          'You receive a formal advocate legal notice or demand letter'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'CYBER / ONLINE FRAUD':
      return {
        summary: `Your issue relates to an unauthorized electronic financial transaction, phishing attempt, or deceptive cyber scheme.`,
        whatThisMayRelateTo:
          'This relates to digital payment security, banking dispute redressal norms, cybercrime reporting frameworks, and unauthorized electronic fund liability.',
        suggestedActions: [
          'Preserve relevant transaction receipts, SMS alerts, UTR reference numbers, and timestamps immediately.',
          'Contact your bank or card-issuing institution immediately to freeze cards, block net-banking access, and initiate an official chargeback dispute.',
          'Communicate the issue clearly in writing to your bank’s nodal grievance officer within statutory reporting time windows.',
          'Consider reporting the incident promptly on the official national cybercrime reporting portal or local cyber police station.'
        ],
        evidenceItems: [
          'Bank account transaction statement highlighting the unauthorized deduction',
          'Screenshots of SMS alerts, OTP notifications, and banking reference codes (UTR)',
          'Full-screen captures of fraudulent payment requests, QR codes, or recipient UPI IDs',
          'Call logs or messaging histories associated with the fraudulent party'
        ],
        whenToSeekHelp: [
          'The bank denies liability or fails to acknowledge timely dispute registration',
          'Significant financial losses have occurred or ongoing extortion is being attempted',
          'Identity credentials have been compromised across multiple financial services'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'CONSUMER':
      return {
        summary: `Your issue involves consumer goods or services, potential deficiency in service, non-delivery, or refused refund obligations.`,
        whatThisMayRelateTo:
          'This relates to consumer protection principles regarding unfair trade practices, product defect accountability, e-commerce grievance redressal, and implied merchantability.',
        suggestedActions: [
          'Preserve all purchase invoices, warranty receipts, order confirmation emails, and delivery dispatch logs.',
          'Review the seller or platform’s written return and refund policy to verify contractual timeframes.',
          'Communicate the issue clearly in writing via formal email to the merchant’s designated grievance officer.',
          'Consider lodging a formal complaint through the national consumer helpline or consumer dispute commission if no remedy is provided.'
        ],
        evidenceItems: [
          'Official tax invoice and proof of online payment',
          'Photographs / unboxing videos showcasing damaged or defective merchandise',
          'Customer care chat transcripts, support ticket numbers, and email exchanges',
          'Written product warranty card or service agreement'
        ],
        whenToSeekHelp: [
          'High monetary value or enterprise purchase is in dispute',
          'Product failure caused property damage, fire, or physical injury',
          'The seller actively denies purchase records or acts fraudulently'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'WORKPLACE':
      return {
        summary: `Your issue concerns employment terms, unpaid wages, workplace rights, or disputed contract separation.`,
        whatThisMayRelateTo:
          'This relates to employment contracts, labor standards, payment of wages regulations, internal grievance procedures, and fair termination notice protocols.',
        suggestedActions: [
          'Preserve employment offer letters, signed contracts, payslips, and daily attendance logs.',
          'Review company employee handbook, exit policy, and internal escalation hierarchy.',
          'Communicate the issue clearly in writing to HR or department management requesting an official settlement calculation.',
          'Consider consulting a qualified labor attorney or labor commissioner office if remuneration is withheld indefinitely.'
        ],
        evidenceItems: [
          'Signed employment contract and appointment letters',
          'Bank statements showing historical salary credits and recent non-payment',
          'Written communications, performance appraisals, and attendance records',
          'Formal emails submitted regarding salary delay and subsequent responses'
        ],
        whenToSeekHelp: [
          'Employer threatens immediate termination or files retaliatory civil claims',
          'Workplace harassment or safety intimidation is occurring',
          'Several months of remuneration remain completely unpaid'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'CONTRACT':
      return {
        summary: `Your issue relates to breach of contract terms, unfulfilled project milestones, or disputed service deliverables.`,
        whatThisMayRelateTo:
          'This relates to contract law principles, fulfillment of covenants, dispute resolution clauses, and contractual remedies for non-performance.',
        suggestedActions: [
          'Preserve the executed agreement, scope of work document, and all written amendment agreements.',
          'Review the contract’s cure period, liability limitation, and dispute resolution or arbitration clauses.',
          'Communicate the issue clearly in writing through a formal notice of default outlining exact unfulfilled milestones.',
          'Consider consulting a qualified commercial lawyer to evaluate breach damages or initiate formal dispute proceedings.'
        ],
        evidenceItems: [
          'Fully executed contract / service agreement with all schedules',
          'Milestone deliverable submissions and client acceptance acknowledgments',
          'Invoices, tax payment receipts, and banking transaction records',
          'Written correspondence regarding project milestones, delays, or objections'
        ],
        whenToSeekHelp: [
          'The dispute involves substantial financial stakes or cross-border counter-parties',
          'The opposing party has engaged legal counsel or served a formal notice of arbitration',
          'Urgent injunctive relief is needed to prevent disclosure of proprietary intellectual property'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'HARASSMENT':
      return {
        summary: `Your issue involves persistent harassment, abusive communications, intimidation, or safety threats.`,
        whatThisMayRelateTo:
          'This relates to personal safety protections, cyber harassment provisions, stalking awareness, and public order grievance protocols.',
        suggestedActions: [
          'Preserve evidence methodically by taking timestamped full-screen captures before blocking perpetrators.',
          'Review account security settings and limit public visibility on messaging and social platforms.',
          'Communicate the issue clearly in writing to platform safety teams or institutional grievance cells where appropriate.',
          'Consider contacting local law enforcement authorities or specialized cyber/women safety helplines immediately if safety is threatened.'
        ],
        evidenceItems: [
          'Screenshots of threatening messages showing user handles, phone numbers, and timestamps',
          'Audio recordings, voicemails, or email communications',
          'URLs of suspect profiles or public posts',
          'Grievance reporting reference numbers from digital platforms'
        ],
        whenToSeekHelp: [
          'Credible threats of physical harm, violence, or stalking are present',
          'Intimate photographs or sensitive personal details have been leaked without consent',
          'The perpetrator follows you offline or has access to your physical location'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'IDENTITY THEFT':
      return {
        summary: `Your issue relates to unauthorized use of personal identity information or credentials.`,
        whatThisMayRelateTo:
          'This relates to identity protection laws, data privacy guidelines, credit bureau fraud alerts, and unauthorized impersonation.',
        suggestedActions: [
          'Preserve all communications, credit alerts, or loan notifications received unexpectedly.',
          'Review your credit bureau reports immediately to identify unauthorized credit inquiries or accounts.',
          'Communicate the issue clearly in writing to relevant banks, telecom carriers, and identity-issuing bodies.',
          'Consider lodging a formal complaint with law enforcement and locking biometric authentication on official portals.'
        ],
        evidenceItems: [
          'Credit bureau report showing unauthorized accounts',
          'Copies of forged identity documents if discovered',
          'Written notices sent to banks and telecom operators reporting identity misuse',
          'Police complaint or online cybercrime acknowledgment receipt'
        ],
        whenToSeekHelp: [
          'Large unauthorized loans have been disbursed under your credentials',
          'Debt recovery agents are pursuing you for liabilities you never incurred',
          'Identity has been implicated in severe criminal or tax evasion offenses'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'TRAFFIC':
      return {
        summary: `Your issue relates to a traffic infraction, disputed e-challan, or motor vehicle incident.`,
        whatThisMayRelateTo:
          'This relates to motor vehicle regulations, traffic enforcement rules, statutory dispute mechanisms, and motor accident liability.',
        suggestedActions: [
          'Preserve vehicle registration certificates, valid insurance papers, and the issued challan receipt.',
          'Review the digital challan photograph and time-location data on the official government traffic portal.',
          'Communicate the issue clearly in writing through the portal’s online grievance or challan dispute mechanism if an error exists.',
          'Consider consulting a qualified advocate or approaching the virtual traffic court if contested citations remain unresolved.'
        ],
        evidenceItems: [
          'Official e-challan notice and photographic evidence',
          'Valid vehicle registration (RC), pollution (PUC), and insurance documents',
          'Dashcam footage, GPS logs, or toll plaza records showing actual vehicle location',
          'Photographs of vehicle license plate showing differences from citation photos'
        ],
        whenToSeekHelp: [
          'The incident resulted in bodily injury or significant property damage',
          'Criminal negligence or rash driving charges have been initiated',
          'Vehicle has been unlawfully impounded with excessive penalties demanded'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };

    case 'GENERAL':
    default:
      return {
        summary: `Your concern has been registered for general legal awareness and preliminary guidance.`,
        whatThisMayRelateTo:
          relevantTopic?.explanation ||
          'This relates to general citizen rights, formal grievance submission procedures, and standard dispute resolution steps.',
        suggestedActions: [
          'Preserve relevant documents and communication in a secure, chronologically organized folder.',
          'Review any applicable agreement, written terms, official notices, or relevant institutional guidelines.',
          'Communicate the issue clearly in writing where appropriate, stating factual dates and relief sought.',
          'Consider contacting the appropriate official authority, ombudsman, or a qualified legal professional if the issue remains unresolved.'
        ],
        evidenceItems: [
          'Signed agreements, contracts, or transaction receipts',
          'Dated emails, text messages, or call logs between involved parties',
          'Photographs, screenshots, or official notices received',
          'Timeline summary of key events and attempts made to resolve the matter'
        ],
        whenToSeekHelp: [
          'The matter involves significant financial loss or impending statutory limitation deadlines',
          'There is any threat to personal safety, liberty, or property',
          'Formal court proceedings, summons, or legal notices have been received',
          'The situation is legally intricate or involves multiple conflicting parties'
        ],
        disclaimer: VERIFIED_DISCLAIMER,
        source: 'Mock-AI-Service-Synthesizer'
      };
  }
}
