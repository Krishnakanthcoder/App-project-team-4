/**
 * Legal Guardian AI - Domain Type Definitions
 * Designed for 2nd-year B.Tech CSE/AIML Academic Prototype
 */

export type LegalCategory =
  | 'CONSUMER'
  | 'CYBER / ONLINE FRAUD'
  | 'TENANT / RENTAL'
  | 'WORKPLACE'
  | 'CONTRACT'
  | 'HARASSMENT'
  | 'IDENTITY THEFT'
  | 'TRAFFIC'
  | 'GENERAL';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  is_demo?: boolean;
}

export interface ComplaintRecord {
  id: string;
  user_id: string;
  complaint_text: string;
  category: LegalCategory;
  category_label: string;
  location?: string;
  contacted_party?: 'Yes' | 'No' | 'Not sure';
  uploaded_document_names?: string[];
  analysis_status: 'Completed' | 'Pending' | 'Draft';
  created_at: string;
}

export interface ReportRecord {
  id: string;
  complaint_id: string;
  user_id: string;
  complaint_text: string;
  category: LegalCategory;
  category_label: string;
  summary: string;
  what_this_may_relate_to: string;
  suggested_actions: string[];
  evidence_items: string[];
  when_to_seek_help: string[];
  disclaimer: string;
  created_at: string;
}

export interface SearchTopic {
  id: string;
  title: string;
  category: LegalCategory;
  category_label: string;
  explanation: string;
  common_examples: string[];
  general_steps: string[];
  documents_to_preserve: string[];
  when_to_seek_help: string[];
  official_resource: string;
}

export interface SearchHistoryItem {
  id: string;
  user_id: string;
  search_query: string;
  created_at: string;
}

export interface CategorizationResult {
  category: LegalCategory;
  categoryLabel: string;
  matchedKeywords: string[];
  confidenceScore: number;
  engineUsed: 'Prototype-Rule-Engine' | 'C-Module-Emulation' | 'Fallback-General';
  explanation: string;
}
