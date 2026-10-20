# Legal Guardian AI – Smart Legal Awareness & Complaint Assistance System

> **“Understand your issue. Know your options. Take the next step.”**  
> *Academic Engineering Project Prototype for 2nd-Year B.Tech CSE / AIML Student Evaluation.*

---

## 1. Project Overview

Legal Guardian AI is a first-level legal awareness and complaint assistance system designed to bridge the gap between complex legal terminology and ordinary citizens. It empowers users to:
- Describe everyday grievances and disputes in plain, natural language.
- Receive immediate, deterministic keyword classification into distinct legal categories.
- Access verified plain-English educational summaries, procedural next steps, and evidence-preservation checklists.
- Generate, store, and print structured Legal Awareness Reports.
- Explore a verified knowledge base covering common dispute domains.

---

## 2. Key Features

1. **Natural Language Complaint Assistant:**
   - Freeform textarea accepting plain-language descriptions without legal jargon.
   - Quick-select test scenarios for demonstration (Tenant security deposit, UPI fraud, e-commerce non-delivery, unpaid salary, harassment).
   - Document upload preview interface (PDF, JPG, PNG) with strict client-side data minimization.
   - Real-time privacy warning against uploading sensitive IDs or bank credentials.

2. **Automated Preliminary Categorization:**
   - Rule-based keyword matching interface emulating the planned C-language native module.
   - Supports 9 dispute classifications: `CONSUMER`, `CYBER / ONLINE FRAUD`, `TENANT / RENTAL`, `WORKPLACE`, `CONTRACT`, `HARASSMENT`, `IDENTITY THEFT`, `TRAFFIC`, and `GENERAL`.

3. **Synthesized Legal Awareness Analysis:**
   - Clear identification of what the issue may relate to.
   - Numbered action cards highlighting sensible next steps.
   - Checkbox-style evidence & document preservation checklists.
   - Explicit "When to Seek Qualified Legal Help" advisory notices.

4. **Printable Legal Awareness Reports:**
   - Standardized report preview with unique Report IDs, date stamps, and mandatory statutory notices.
   - Single-click print view (optimized via `@media print`) and downloadable Markdown/Text file export.

5. **Curated Legal Knowledge Base:**
   - 10 static verified-style educational guides with live search and category filters.
   - Explicit placeholders for official resource URLs pending official deployment verification.

6. **User Authentication & Dashboard:**
   - Registration with mandatory legal awareness acknowledgment checkbox.
   - User Dashboard displaying metrics (Issues Analyzed, Saved Reports, Recent Searches, Last Analysis).
   - Recent activity log with status badges and quick view access.
   - Row-Level Security simulation ensuring users only access their own reports and complaints.

7. **Demo Evaluation Mode:**
   - Built-in instant login for college jury examination pre-seeded with sample complaints, search records, and reports.

---

## 3. Technology Stack

- **Frontend:** React 19 (Functional Components & Hooks), TypeScript
- **Styling:** Tailwind CSS v4, `@tailwindcss/vite`
- **Icons:** Lucide React
- **Database & Storage:** Supabase-compatible relational schema (PostgreSQL) simulated locally with full user isolation and demo seeds
- **Text Processing Engine:** Prototype Rule-Based Keyword Matcher (designed to bridge with native C Module)
- **AI Service:** Dedicated AI Legal Awareness Service with system prompt guardrails against legal advice and fake citations

---

## 4. Folder Structure

```text
├── index.html                       # HTML entry point with metadata and fonts
├── metadata.json                    # AI Studio metadata
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite bundler configuration
├── src/
│   ├── main.tsx                     # React application root render
│   ├── App.tsx                      # Main app router, modals, and layout
│   ├── index.css                    # Tailwind CSS imports & print stylesheets
│   ├── types/
│   │   └── legal.ts                 # Domain models (Complaints, Reports, UserProfile)
│   ├── data/
│   │   └── knowledgeBase.ts         # 10 verified legal topics & demo complaints
│   ├── context/
│   │   └── AuthContext.tsx          # Authentication & Demo Mode state provider
│   ├── services/
│   │   ├── cModuleCategorizer.ts    # Complaint Categorization Engine (C Interface)
│   │   ├── aiLegalService.ts        # AI Legal Awareness Service synthesizer
│   │   └── dbService.ts             # Supabase-compatible database & RLS storage
│   ├── components/
│   │   ├── Navbar.tsx               # Responsive header with Demo indicator
│   │   ├── Footer.tsx               # Compliance footer with mandatory notices
│   │   ├── LegalDisclaimerBanner.tsx# Global disclaimer notification
│   │   ├── AuthModal.tsx            # Login & Register modal dialog
│   │   └── PrintableReportModal.tsx # Printable legal letterhead report view
│   └── views/
│       ├── HomeView.tsx             # Landing page with 4-step pipeline & cards
│       ├── DashboardView.tsx        # Authenticated student/user workspace
│       ├── LegalSearchView.tsx      # Knowledge base search & category filter
│       ├── ComplaintAssistantView.tsx# Complaint submission & analysis runner
│       ├── AnalysisResultView.tsx   # Detailed analysis outcome and action steps
│       ├── MyReportsView.tsx        # Filterable & searchable user report history
│       ├── AboutView.tsx            # Academic background & code inspection
│       └── ProfileView.tsx          # Account settings & privacy notices
```

---

## 5. How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 6. Database Setup (Supabase / PostgreSQL)

The system is architected around a 4-table relational PostgreSQL schema. To replicate in a live Supabase project, execute the following SQL:

```sql
-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Complaints Table
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  complaint_text TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  location TEXT,
  contacted_party TEXT,
  uploaded_document_names JSONB DEFAULT '[]'::jsonb,
  analysis_status TEXT NOT NULL DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  complaint_text TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  summary TEXT NOT NULL,
  what_this_may_relate_to TEXT NOT NULL,
  suggested_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  when_to_seek_help JSONB NOT NULL DEFAULT '[]'::jsonb,
  disclaimer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Search History Table
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 7. Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Optional Gemini API Key for server-side proxy
GEMINI_API_KEY="YOUR_KEY_HERE"

# Optional Supabase credentials
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

---

## 8. AI Integration Point

Located in `src/services/aiLegalService.ts`:
- Employs strict system prompt instructions:
  > *“You are a legal awareness assistant, not a lawyer. Provide general educational information only. Do not provide definitive legal advice. Do not fabricate laws, legal sections, court cases, penalties, government procedures, or URLs. Clearly state uncertainty. Encourage users to consult qualified legal professionals or appropriate official authorities for situation-specific advice.”*
- Currently runs a deterministic offline synthesizer when no backend AI key is set, ensuring seamless operation during jury evaluations without API latency or rate limit failures.

---

## 9. C Integration Point

Located in `src/services/cModuleCategorizer.ts`:
- Developer comment marker:
  `// Replace this prototype categorization function with the C module during backend integration.`
- Planned C interface:
  ```c
  struct CategoryResult classify_complaint_text(const char* raw_text);
  ```
- Uses token frequency vectors and dictionary matching to produce preliminary classifications for the Java/Node backend bridge.

---

## 10. Future Improvements

1. Integration of Java Spring Boot REST microservice for authentication tokens and audit logging.
2. Direct compilation of the native C categorization module (`libcomplaint_classifier.so`) via JNI.
3. Multi-lingual support (Hindi, Telugu, Tamil, and other regional Indian languages).
4. Direct integration with official consumer and cyber dispute filing portals.
5. OCR parsing of uploaded agreements to automatically extract expiry and notice periods.

---

## 11. Mandatory Legal Disclaimer

> **“This information is provided for general legal awareness and does not constitute legal advice. For advice about a specific situation, consult a qualified legal professional or the appropriate official authority.”**

- Legal Guardian AI is NOT a law firm, court, or legal representative.
- No attorney-client relationship is formed.
- Automated outputs must be independently verified with authorized legal professionals or statutory authorities.
