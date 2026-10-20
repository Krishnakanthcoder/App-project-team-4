import { SearchTopic } from '../types/legal';

export const VERIFIED_DISCLAIMER =
  'This information is provided for general legal awareness and does not constitute legal advice. For advice about a specific situation, consult a qualified legal professional or the appropriate official authority.';

export const KNOWLEDGE_BASE_TOPICS: SearchTopic[] = [
  {
    id: 'consumer-complaints',
    title: 'Consumer Complaints',
    category: 'CONSUMER',
    category_label: 'Consumer Protection',
    explanation:
      'Consumer rights protect buyers of goods and services against defective products, deficient services, misleading advertisements, and unfair trade practices.',
    common_examples: [
      'Purchased electronics that stopped working within days and seller refuses warranty',
      'Paid for courier or flight services that were cancelled without refund',
      'Delivered food or grocery items arrived damaged or past expiry date',
      'E-commerce vendor charged money but failed to deliver the purchased item'
    ],
    general_steps: [
      'Preserve tax invoices, payment transaction receipts, and warranty cards',
      'Reach out directly to the seller or service provider through formal written email or customer support ticket',
      'Review the company’s stated return, replacement, and grievance escalation policies',
      'If unresolved, file an official grievance with the appropriate national or regional consumer grievance portal'
    ],
    documents_to_preserve: [
      'Tax invoices / purchase receipts',
      'Product warranty card or service level agreement',
      'Customer support chat transcripts or email exchanges',
      'Photographs or video proof of defective/damaged product'
    ],
    when_to_seek_help: [
      'Financial dispute exceeds standard small-claims thresholds',
      'Harm or physical injury resulted from product malfunction',
      'The company sends formal legal notices or denies transaction records'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'online-financial-fraud',
    title: 'Online Financial Fraud',
    category: 'CYBER / ONLINE FRAUD',
    category_label: 'Cyber & Financial Fraud',
    explanation:
      'Online financial fraud involves unauthorized electronic transfers, UPI scams, fake lottery links, fraudulent debit/credit card transactions, or phishing attempts designed to siphon funds.',
    common_examples: [
      'Unauthorized debit after scanning a malicious QR code claiming to "send money"',
      'Sharing an OTP under the false pretense of KYC bank verification',
      'Fake customer care number scam diverting payments to an unknown wallet',
      'Unauthorized card charges during international or suspicious online checkout'
    ],
    general_steps: [
      'Immediately contact your bank or payment issuer to freeze cards and block UPI / net-banking access',
      'Take screenshots of fraudulent transaction alerts, SMS records, and suspect phone numbers',
      'Report the transaction immediately to the national cybercrime helpline or financial fraud portal',
      'Preserve the bank transaction reference (UTR) numbers and date-time stamps'
    ],
    documents_to_preserve: [
      'Official bank account statement highlighting unauthorized debits',
      'SMS alerts received from the bank with reference / UTR codes',
      'Screenshots of UPI app history, payment IDs, and recipient details',
      'Phone call logs or messaging screenshots with the fraudster'
    ],
    when_to_seek_help: [
      'Large sum of money has been lost with delayed bank response',
      'Coercion, threats, or blackmail accompany the financial extortion',
      'Bank refuses to register a formal chargeback within statutory windows'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'cybercrime-awareness',
    title: 'Cybercrime Awareness',
    category: 'CYBER / ONLINE FRAUD',
    category_label: 'Cyber Safety & Security',
    explanation:
      'Cybercrime encompasses criminal activities conducted through computers, networks, and internet platforms, including hacking, data tampering, ransomware, and unauthorized account takeovers.',
    common_examples: [
      'Compromised social media or email account locked out by an intruder',
      'Malicious software installed after downloading a deceptive attachment',
      'Fake job portal extorting processing fees and stealing user data',
      'Unauthorized remote desktop access granted through deceptive screen-sharing apps'
    ],
    general_steps: [
      'Disconnect compromised devices from the internet to halt data transmission',
      'Reset passwords using a separate, secure secondary device',
      'Enable multi-factor authentication (MFA/2FA) on all critical accounts',
      'Report the incident to the designated cyber police station or cybercrime reporting desk'
    ],
    documents_to_preserve: [
      'IP address login alert emails sent by service providers',
      'Suspect URLs, phishing emails including full email header data',
      'Audit logs, error screens, or ransomware notes',
      'Antivirus scan detection reports'
    ],
    when_to_seek_help: [
      'Business or enterprise systems compromised containing sensitive client data',
      'Ransomware demanding extortion payments in cryptocurrency',
      'Personal identity credentials compromised across multiple institutions'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'tenant-rental-disputes',
    title: 'Tenant / Rental Disputes',
    category: 'TENANT / RENTAL',
    category_label: 'Rental & Tenancy',
    explanation:
      'Rental disputes involve disagreements between property owners and tenants regarding security deposits, unlawful eviction notices, property maintenance, lease clauses, and rent hikes.',
    common_examples: [
      'Landlord refuses to refund the security deposit after peaceful handover of premises',
      'Abrupt demand to vacate without adherence to contractual notice period',
      'Unreasonable deductions claimed for standard property wear-and-tear',
      'Refusal by property owner to conduct essential structural repairs'
    ],
    general_steps: [
      'Carefully inspect the signed Lease / Tenancy Agreement clauses',
      'Keep written proof of all rent and maintenance transfers (bank slips, UPI receipts)',
      'Document the physical condition of the property via dated photographs before and after occupancy',
      'Send a formal, courteous written notice via email or registered postal post requesting deposit settlement'
    ],
    documents_to_preserve: [
      'Signed and stamped Rental / Lease Agreement',
      'Proof of security deposit payment and monthly rent payment receipts',
      'Written correspondence, messages, or emails regarding move-out inspection',
      'High-resolution handover photographs showing property state'
    ],
    when_to_seek_help: [
      'Forced unlawful lockout or illegal eviction attempt',
      'Arbitrary seizure of tenant’s personal belongings',
      'Substantial security deposit amount withheld without contractual ground'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'workplace-harassment',
    title: 'Workplace Harassment',
    category: 'WORKPLACE',
    category_label: 'Workplace Rights',
    explanation:
      'Workplace harassment includes unwelcome behavior, hostile work environments, verbal intimidation, discrimination, or sexual harassment occurring within professional spaces or during work-related activities.',
    common_examples: [
      'Unwanted sexually suggestive comments, messages, or physical advances by a supervisor',
      'Retaliation or unfair performance review threats after rejecting inappropriate conduct',
      'Persistent verbal abuse, belittling, or humiliation during team meetings',
      'Exclusion or unequal treatment based on gender, ethnicity, or disability'
    ],
    general_steps: [
      'Keep an objective, contemporaneous personal journal detailing dates, times, witnesses, and statements',
      'Preserve all relevant communication including emails, messaging chats, and calendar invites',
      'Review your organization’s internal prevention policy (e.g. POSH / grievance cell guidelines)',
      'Submit a formal written complaint to the internal complaints committee (ICC) or HR department'
    ],
    documents_to_preserve: [
      'Personal written log with exact dates, locations, and witnessed interactions',
      'Work emails, instant messages (Slack, Teams, WhatsApp), or voicemail recordings',
      'Official company code of conduct and grievance procedure handbook',
      'Formal complaint submission acknowledgment and past performance ratings'
    ],
    when_to_seek_help: [
      'Organization lacks a functional internal complaints mechanism or refuses to investigate',
      'Severe retaliation, wrongful termination, or immediate physical safety concerns',
      'Traumatic psychological stress requiring protective legal counsel'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'contract-disputes',
    title: 'Contract Disputes',
    category: 'CONTRACT',
    category_label: 'Contracts & Agreements',
    explanation:
      'A contract dispute arises when one or more parties fail to fulfill agreed-upon obligations under a legally binding contract, service agreement, freelance contract, or non-disclosure agreement.',
    common_examples: [
      'Freelance contractor completed deliverables on time but client refuses final milestone payment',
      'Vendor supplied defective raw materials that breached written specifications',
      'Service provider stopped ongoing work midway through an annual service contract',
      'Dispute over ambiguous termination or non-compete clauses in a commercial agreement'
    ],
    general_steps: [
      'Review the primary agreement, including scope of work, payment schedules, and dispute resolution clauses',
      'Compile all deliverable approvals, change requests, and signed milestone sign-offs',
      'Issue a formal written notice of breach giving the defaulting party reasonable cure period',
      'Check whether the contract mandates mediation or arbitration prior to court litigation'
    ],
    documents_to_preserve: [
      'Fully executed contract or agreement, signed addendums, and exhibits',
      'Invoices sent, payment logs, and banking receipts',
      'Written email confirmations confirming receipt and acceptance of deliverables',
      'Formal breach notices or termination communications'
    ],
    when_to_seek_help: [
      'High commercial stakes or significant financial liabilities involved',
      'The counterparty has invoked an arbitration clause or issued a legal demand notice',
      'Cross-border jurisdictions or complex regulatory frameworks are applicable'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft',
    category: 'IDENTITY THEFT',
    category_label: 'Identity Protection',
    explanation:
      'Identity theft occurs when someone fraudulently uses personal identification information (e.g., Aadhaar, PAN, SSN, passport, driver license) to obtain credit, open accounts, or commit unlawful acts.',
    common_examples: [
      'Discovering unauthorized loan or credit card accounts opened under your tax or national ID',
      'SIM-swap fraud where an attacker illegally duplicates your mobile carrier SIM card',
      'Unauthorized impersonation on professional or government portals using stolen credentials',
      'Receiving collection notices for loans or merchandise you never applied for'
    ],
    general_steps: [
      'Contact your credit reporting bureaus immediately to place a credit freeze or fraud alert',
      'Notify your bank, mobile telecom operator, and credit card issuers of potential impersonation',
      'Lodge a formal police First Information Report (FIR) or national identity fraud complaint',
      'Lock biometric credentials on official government identity portals where supported'
    ],
    documents_to_preserve: [
      'Credit bureau reports showing unauthorized inquiries or fraudulent accounts',
      'Copies of police complaint acknowledgments / FIR documents',
      'Official communications sent to banks and telecom operators reporting identity misuse',
      'Detailed timeline of when you first discovered unauthorized activities'
    ],
    when_to_seek_help: [
      'Substantial fraudulent loans or criminal warrants issued in your name',
      'Multiple financial institutions pursuing aggressive debt collection for fraudulent accounts',
      'Identity documents used in major criminal or tax evasion enterprises'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'online-harassment',
    title: 'Online Harassment & Cyberstalking',
    category: 'HARASSMENT',
    category_label: 'Online Safety',
    explanation:
      'Online harassment and cyberstalking involve persistent intimidation, abusive messaging, doxxing, non-consensual sharing of intimate media, or systematic defamation across digital channels.',
    common_examples: [
      'Continuous abusive or threatening direct messages from burner social media accounts',
      'Doxxing: unauthorized posting of private phone numbers, home address, or personal photos',
      'Non-consensual sharing or threats to publish private images (image-based abuse)',
      'Coordinated online trolling campaigns aimed at professional defamation'
    ],
    general_steps: [
      'Do not delete abusive messages or comments immediately; record timestamped evidence first',
      'Take full-screen screenshots showing the perpetrator’s handle, profile URL, date, and exact content',
      'Use platform reporting mechanisms to flag and block the offender after evidence is safely stored',
      'File an online cybercrime complaint or report to the specialized women/cyber cell of your local police'
    ],
    documents_to_preserve: [
      'Full screenshots showing profile names, handle IDs, URLs, and date/time stamps',
      'Exported chat logs, voicemails, or audio recordings',
      'URLs of fraudulent posts or impersonating social profiles',
      'Platform grievance reporting ticket numbers'
    ],
    when_to_seek_help: [
      'Direct, credible threats of physical violence or endangerment to self/family',
      'Non-consensual intimate imagery circulated online requiring emergency court injunctions',
      'Sustained stalking behavior escalating into offline surveillance'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'traffic-related-issues',
    title: 'Traffic-Related Issues & Challans',
    category: 'TRAFFIC',
    category_label: 'Traffic & Motor Vehicles',
    explanation:
      'Traffic-related issues cover road safety infractions, incorrect electronic challans, vehicle impounding, motor vehicle accident liability, and mandatory insurance claim processes.',
    common_examples: [
      'Received an incorrect automated camera e-challan for a vehicle or location you were never at',
      'Vehicle seized by traffic authorities over disputed registration or emission documentation',
      'Minor motor collision with disagreement over insurance claim and third-party property damage',
      'Refusal by insurance company to process legitimate accidental repair claims'
    ],
    general_steps: [
      'Verify the authentic challan details on the official national or state transport portal',
      'If an automated challan is incorrect (e.g. mismatched license plate photo), file a dispute online',
      'In accident cases, note down the counterparty vehicle number, driver details, and contact info',
      'Preserve dashcam video recordings, vehicle repair estimates, and police spot-memo reports'
    ],
    documents_to_preserve: [
      'Vehicle Registration Certificate (RC), Driving License (DL), and Valid Insurance Policy',
      'E-challan receipt with photographic evidence from the traffic enforcement system',
      'Dashcam footage or eyewitness contact details if available',
      'Accident spot photographs from multiple angles'
    ],
    when_to_seek_help: [
      'Accident resulted in severe physical injury or loss of life',
      'Criminal charges filed under penal sections for rash or negligent driving',
      'Substantial third-party property damage claim disputed by insurance carrier'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  },
  {
    id: 'general-complaint-filing',
    title: 'General Complaint Filing Awareness',
    category: 'GENERAL',
    category_label: 'General Grievance & Procedures',
    explanation:
      'General complaint filing procedures guide citizens on how to format, structure, and register complaints with government departments, ombudsmen, consumer forums, or law enforcement.',
    common_examples: [
      'Drafting a formal complaint to municipal authorities regarding neglected sanitation or drainage',
      'Submitting a representation to an educational institution regarding examination irregularities',
      'Approaching a banking or telecom ombudsman when regular customer grievance channels fail',
      'Understanding the difference between a police information log and a formal First Information Report (FIR)'
    ],
    general_steps: [
      'Structure your grievance chronologically: facts, dates, previous attempts to resolve, and relief sought',
      'Avoid emotionally charged or abusive language; stick to objective facts and documentation',
      'Always request an official acknowledgment receipt or grievance registration number',
      'Check statutory escalation timelines (e.g., 30 days before approaching an ombudsman)'
    ],
    documents_to_preserve: [
      'Formal complaint letter signed and dated with tracking number',
      'Acknowledged copy (with official stamp or digital submission ID)',
      'Previous correspondence, responses, and reference ticket IDs',
      'Chronological summary sheet of events'
    ],
    when_to_seek_help: [
      'The matter involves complex constitutional or administrative writ jurisdiction',
      'Authorities refuse to register statutory complaints despite repeated representations',
      'Legal limitation periods for filing formal court claims are approaching'
    ],
    official_resource: 'Official resource link to be verified before deployment.'
  }
];

export const DEMO_SAMPLE_COMPLAINTS = [
  {
    title: 'Tenant Security Deposit Issue',
    text: 'My landlord has not returned my security deposit of Rs 45,000 even though I moved out on September 15, completed all handover formalities, and left the flat in pristine condition. He is ignoring my calls and messages.',
    expectedCategory: 'TENANT / RENTAL' as const
  },
  {
    title: 'UPI / Bank Transfer Fraud',
    text: 'I received a suspicious message pretending to be my bank asking for KYC verification. I was asked to approve a UPI prompt to verify my account, and within minutes, Rs 18,500 was deducted and transferred to an unknown party.',
    expectedCategory: 'CYBER / ONLINE FRAUD' as const
  },
  {
    title: 'E-Commerce Seller Non-Delivery',
    text: 'I purchased a laptop table and chair online from an e-commerce seller 4 weeks ago. The item was never delivered, but their support refuses to issue a refund and closed my support ticket without explanation.',
    expectedCategory: 'CONSUMER' as const
  },
  {
    title: 'Unpaid Salary by Employer',
    text: 'My employer has not paid my monthly salary for the last 3 months despite regular office attendance and fulfilling all job obligations. When I inquired with HR, they gave evasive answers and threatened termination.',
    expectedCategory: 'WORKPLACE' as const
  },
  {
    title: 'Repeated Online Harassment',
    text: 'Someone is repeatedly creating fake profiles on Instagram and sending threatening, abusive messages to me and my friends, trying to intimidate me and ruin my reputation.',
    expectedCategory: 'HARASSMENT' as const
  }
];
