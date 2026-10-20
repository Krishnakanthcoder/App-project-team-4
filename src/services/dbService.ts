/**
 * ============================================================================
 * DATABASE & STORAGE SERVICE (SUPABASE ARCHITECTURE COMPATIBLE)
 * ============================================================================
 * Academic Project Context: 2nd-Year B.Tech CSE / AIML
 *
 * SUPABASE / POSTGRESQL EQUIVALENT SCHEMA DEFINITION:
 * ----------------------------------------------------------------------------
 * CREATE TABLE profiles (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   full_name TEXT NOT NULL,
 *   email TEXT UNIQUE NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE TABLE complaints (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
 *   complaint_text TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   category_label TEXT NOT NULL,
 *   location TEXT,
 *   contacted_party TEXT,
 *   uploaded_document_names JSONB DEFAULT '[]'::jsonb,
 *   analysis_status TEXT NOT NULL DEFAULT 'Completed',
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE TABLE reports (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
 *   user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
 *   complaint_text TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   category_label TEXT NOT NULL,
 *   summary TEXT NOT NULL,
 *   what_this_may_relate_to TEXT NOT NULL,
 *   suggested_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
 *   evidence_items JSONB NOT NULL DEFAULT '[]'::jsonb,
 *   when_to_seek_help JSONB NOT NULL DEFAULT '[]'::jsonb,
 *   disclaimer TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE TABLE search_history (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
 *   search_query TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * ----------------------------------------------------------------------------
 *
 * CLIENT-SIDE IMPLEMENTATION:
 * Manages persistent user-scoped storage with full Row-Level Security (RLS) simulation,
 * ensuring users can only read and mutate their own complaints, reports, and searches.
 * Pre-seeds realistic demo records for jury evaluation when in Demo Mode.
 * ============================================================================
 */

import { ComplaintRecord, ReportRecord, SearchHistoryItem, UserProfile } from '../types/legal';

const USERS_STORAGE_KEY = 'legal_guardian_users';
const COMPLAINTS_STORAGE_KEY = 'legal_guardian_complaints';
const REPORTS_STORAGE_KEY = 'legal_guardian_reports';
const SEARCH_HISTORY_STORAGE_KEY = 'legal_guardian_search_history';

// Pre-seeded demo account for student jury presentation
export const DEMO_USER_ID = 'demo-user-student-arjun-2026';

export const DEMO_USER: UserProfile = {
  id: DEMO_USER_ID,
  full_name: 'Arjun Sharma (Demo Student)',
  email: 'arjun.student@example.edu',
  created_at: '2026-09-15T10:00:00.000Z',
  is_demo: true
};

// Seed demo data if storage is empty
function initializeStorageIfEmpty(): void {
  try {
    // Seed users
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEMO_USER]));
    }

    // Seed complaints
    if (!localStorage.getItem(COMPLAINTS_STORAGE_KEY)) {
      const initialComplaints: ComplaintRecord[] = [
        {
          id: 'cmp-seed-101',
          user_id: DEMO_USER_ID,
          complaint_text:
            'My landlord has not returned my security deposit of Rs 45,000 even though I moved out on September 15, completed all handover formalities, and left the flat in pristine condition. He is ignoring my calls and messages.',
          category: 'TENANT / RENTAL',
          category_label: 'Tenant / Rental Issue',
          location: 'India',
          contacted_party: 'Yes',
          uploaded_document_names: ['rental_agreement_2025.pdf', 'handover_photos.jpg'],
          analysis_status: 'Completed',
          created_at: '2026-10-05T14:32:00.000Z'
        },
        {
          id: 'cmp-seed-102',
          user_id: DEMO_USER_ID,
          complaint_text:
            'I received a suspicious message asking for KYC verification. I was prompted to approve a UPI transfer, and Rs 18,500 was deducted immediately.',
          category: 'CYBER / ONLINE FRAUD',
          category_label: 'Cyber & Online Fraud',
          location: 'India',
          contacted_party: 'No',
          uploaded_document_names: ['bank_sms_screenshot.png'],
          analysis_status: 'Completed',
          created_at: '2026-10-12T09:15:00.000Z'
        }
      ];
      localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(initialComplaints));
    }

    // Seed reports
    if (!localStorage.getItem(REPORTS_STORAGE_KEY)) {
      const initialReports: ReportRecord[] = [
        {
          id: 'rep-seed-201',
          complaint_id: 'cmp-seed-101',
          user_id: DEMO_USER_ID,
          complaint_text:
            'My landlord has not returned my security deposit of Rs 45,000 even though I moved out on September 15, completed all handover formalities, and left the flat in pristine condition. He is ignoring my calls and messages.',
          category: 'TENANT / RENTAL',
          category_label: 'Tenant / Rental Issue',
          summary:
            'Your issue involves tenancy relations regarding property occupancy, security deposit reimbursement, or rental agreement execution.',
          what_this_may_relate_to:
            'This relates to tenancy covenants, security deposit holding norms, handover terms, and contractual notice obligations established between property owners and tenants.',
          suggested_actions: [
            'Preserve all relevant communication and dated written notices exchange with the property owner.',
            'Review the signed Rental/Lease Agreement thoroughly, focusing on deposit deduction clauses, damage assessments, and notice duration.',
            'Communicate the issue clearly in writing where appropriate, requesting a formal settlement statement or return date.',
            'Consider contacting the appropriate local Rent Control authority, consumer forum, or a qualified property lawyer if amicable resolution fails.'
          ],
          evidence_items: [
            'Original signed Tenancy / Lease Agreement',
            'Bank statement or digital transaction proofs of initial deposit and monthly rents',
            'High-resolution dated move-out inspection photographs of the property',
            'Copies of emails, WhatsApp/SMS correspondence regarding move-out and key handover'
          ],
          when_to_seek_help: [
            'The landlord attempts unlawful eviction or threatens lock-out without judicial process',
            'Substantial monetary sum is unlawfully retained without contractual basis',
            'You receive a formal advocate legal notice or demand letter'
          ],
          disclaimer:
            'This information is provided for general legal awareness and does not constitute legal advice. For advice about a specific situation, consult a qualified legal professional or the appropriate official authority.',
          created_at: '2026-10-05T14:35:00.000Z'
        }
      ];
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(initialReports));
    }

    // Seed search history
    if (!localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY)) {
      const initialSearches: SearchHistoryItem[] = [
        {
          id: 'sh-seed-1',
          user_id: DEMO_USER_ID,
          search_query: 'tenant security deposit',
          created_at: '2026-10-05T14:10:00.000Z'
        },
        {
          id: 'sh-seed-2',
          user_id: DEMO_USER_ID,
          search_query: 'online payment fraud',
          created_at: '2026-10-12T09:05:00.000Z'
        },
        {
          id: 'sh-seed-3',
          user_id: DEMO_USER_ID,
          search_query: 'consumer complaint refund',
          created_at: '2026-10-18T16:20:00.000Z'
        }
      ];
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(initialSearches));
    }
  } catch (err) {
    console.warn('LocalStorage unavailable or disabled:', err);
  }
}

// Call on module load
initializeStorageIfEmpty();

export const dbService = {
  // ---- USERS / PROFILES ----
  getUserByEmail(email: string): UserProfile | null {
    try {
      const users: UserProfile[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
    } catch {
      return null;
    }
  },

  createUser(profile: Omit<UserProfile, 'id' | 'created_at'>): UserProfile {
    const newUser: UserProfile = {
      ...profile,
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString()
    };
    try {
      const users: UserProfile[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to create user in DB:', e);
    }
    return newUser;
  },

  updateUserName(userId: string, newName: string): boolean {
    try {
      const users: UserProfile[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const index = users.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users[index].full_name = newName;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        return true;
      }
    } catch (e) {
      console.error('Error updating profile:', e);
    }
    return false;
  },

  // ---- COMPLAINTS (Row-Level Security: Filtered by user_id) ----
  getComplaintsByUser(userId: string): ComplaintRecord[] {
    try {
      const all: ComplaintRecord[] = JSON.parse(localStorage.getItem(COMPLAINTS_STORAGE_KEY) || '[]');
      return all
        .filter((c) => c.user_id === userId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch {
      return [];
    }
  },

  saveComplaint(
    complaint: Omit<ComplaintRecord, 'id' | 'created_at' | 'analysis_status'>
  ): ComplaintRecord {
    const newRecord: ComplaintRecord = {
      ...complaint,
      id: `cmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      analysis_status: 'Completed',
      created_at: new Date().toISOString()
    };
    try {
      const all: ComplaintRecord[] = JSON.parse(localStorage.getItem(COMPLAINTS_STORAGE_KEY) || '[]');
      all.unshift(newRecord);
      localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save complaint:', e);
    }
    return newRecord;
  },

  // ---- REPORTS (Row-Level Security: Filtered by user_id) ----
  getReportsByUser(userId: string): ReportRecord[] {
    try {
      const all: ReportRecord[] = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
      return all
        .filter((r) => r.user_id === userId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch {
      return [];
    }
  },

  getReportById(reportId: string, userId: string): ReportRecord | null {
    try {
      const all: ReportRecord[] = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
      const found = all.find((r) => r.id === reportId && r.user_id === userId);
      return found || null;
    } catch {
      return null;
    }
  },

  saveReport(report: Omit<ReportRecord, 'id' | 'created_at'>): ReportRecord {
    const newReport: ReportRecord = {
      ...report,
      id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString()
    };
    try {
      const all: ReportRecord[] = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
      all.unshift(newReport);
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save report:', e);
    }
    return newReport;
  },

  deleteReport(reportId: string, userId: string): boolean {
    try {
      const all: ReportRecord[] = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
      const filtered = all.filter((r) => !(r.id === reportId && r.user_id === userId));
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Failed to delete report:', e);
      return false;
    }
  },

  // ---- SEARCH HISTORY (Row-Level Security: Filtered by user_id) ----
  getSearchHistoryByUser(userId: string): SearchHistoryItem[] {
    try {
      const all: SearchHistoryItem[] = JSON.parse(
        localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY) || '[]'
      );
      return all
        .filter((s) => s.user_id === userId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);
    } catch {
      return [];
    }
  },

  recordSearch(userId: string, query: string): void {
    if (!query.trim()) return;
    try {
      const all: SearchHistoryItem[] = JSON.parse(
        localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY) || '[]'
      );
      // Avoid immediate duplicates
      if (all.length > 0 && all[0].user_id === userId && all[0].search_query.toLowerCase() === query.toLowerCase()) {
        return;
      }
      const newItem: SearchHistoryItem = {
        id: `sh-${Date.now()}`,
        user_id: userId,
        search_query: query.trim(),
        created_at: new Date().toISOString()
      };
      all.unshift(newItem);
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(all.slice(0, 30)));
    } catch (e) {
      console.error('Failed to record search:', e);
    }
  },

  // ---- DASHBOARD METRICS SUMMARY ----
  getDashboardMetrics(userId: string) {
    const complaints = this.getComplaintsByUser(userId);
    const reports = this.getReportsByUser(userId);
    const searches = this.getSearchHistoryByUser(userId);

    const lastAnalysisCategory = complaints.length > 0 ? complaints[0].category_label : 'None yet';

    return {
      issuesAnalyzedCount: complaints.length,
      savedReportsCount: reports.length,
      recentSearchesCount: searches.length,
      lastAnalysisCategory,
      recentComplaints: complaints.slice(0, 5)
    };
  }
};
