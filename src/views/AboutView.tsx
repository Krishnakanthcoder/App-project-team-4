import React, { useState } from 'react';
import {
  Scale,
  Shield,
  Code2,
  Terminal,
  Database,
  Cpu,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import { getCEngineArchitectureInfo } from '../services/cModuleCategorizer';

export const AboutView: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'c_module' | 'java_backend' | 'db_schema' | 'ai_contract'>('c_module');
  const cInfo = getCEngineArchitectureInfo();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>2nd-Year B.Tech CSE / AIML Engineering Project</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-serif tracking-tight">
          About Legal Guardian AI
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
          “Legal Guardian AI is a technology-assisted legal awareness project designed to make general
          legal information easier to understand. The system combines web technologies, database
          management, automated text categorization, and Artificial Intelligence to provide
          first-level assistance to users.”
        </p>
      </div>

      {/* Project Objectives Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Project Objectives</h2>
            <p className="text-xs text-slate-500">Core engineering goals and pedagogical criteria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Simplify complex legal information into accessible, plain-language summaries.',
            'Help users describe issues in natural language without requiring formal legal jargon.',
            'Categorize complaints into functional dispute domains using deterministic rule algorithms.',
            'Provide general next-step guidance and structured evidence preservation checklists.',
            'Maintain organized, user-scoped complaint and report histories with strict data privacy.',
            'Demonstrate the practical integration of software technologies and AI in an academic prototype.'
          ].map((obj, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Breakdown */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Technical Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-tier stack featuring active prototype layers and planned enterprise backend services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Web Frontend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Web Development</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Active / Running
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              React 19 SPA with TypeScript, Tailwind CSS v4, Lucide icons, responsive mobile drawers,
              and print stylesheets.
            </p>
          </div>

          {/* Card 2: Java Backend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Java Backend</h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                Planned Backend Integration
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Spring Boot REST API architecture designed to handle business orchestration, JWT
              validation, and JNI bridges.
            </p>
          </div>

          {/* Card 3: C-based Text Processing */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">C-based Text Engine</h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                Planned Native Module
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Low-level C module for deterministic string tokenization, keyword matching arrays, and
              high-throughput scoring.
            </p>
          </div>

          {/* Card 4: Database Management */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Database Management</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Active / Supabase RLS Schema
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              PostgreSQL schema with 4 relational tables (profiles, complaints, reports,
              search_history) simulated with user isolation.
            </p>
          </div>

          {/* Card 5: Artificial Intelligence */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 md:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Artificial Intelligence Service</h3>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                Dual Mode: Rule Engine + AI Bridge
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured legal synthesis service configured with strict ethical guardrails (zero
              hallucination of court sections or fake URLs). Operates with offline rule synthesis or
              secure proxy to AI models.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Jury Code & Architecture Viewer */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-1">
              <FileCode className="w-4 h-4" />
              <span>Jury Inspection: Planned Integration Interfaces</span>
            </div>
            <h3 className="text-xl font-bold font-serif">Integration Code & Specifications</h3>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveCodeTab('c_module')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeCodeTab === 'c_module'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              C Module (categorizer.c)
            </button>
            <button
              onClick={() => setActiveCodeTab('java_backend')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeCodeTab === 'java_backend'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Java Backend (Spring)
            </button>
            <button
              onClick={() => setActiveCodeTab('db_schema')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeCodeTab === 'db_schema'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PostgreSQL Schema
            </button>
            <button
              onClick={() => setActiveCodeTab('ai_contract')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeCodeTab === 'ai_contract'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI System Prompt
            </button>
          </div>
        </div>

        {/* Code Viewers */}
        {activeCodeTab === 'c_module' && (
          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              Planned native C module for deterministic string tokenization and fast keyword categorization:
            </p>
            <pre className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed border border-slate-800">
{`/*
 * complaint_classifier.c
 * Native C Module for B.Tech CSE Complaint Categorization
 */
#include <stdio.h>
#include <string.h>
#include <ctype.h>

typedef enum {
    CAT_CONSUMER,
    CAT_CYBER_FRAUD,
    CAT_TENANT_RENTAL,
    CAT_WORKPLACE,
    CAT_CONTRACT,
    CAT_HARASSMENT,
    CAT_IDENTITY_THEFT,
    CAT_TRAFFIC,
    CAT_GENERAL
} LegalCategory;

struct CategoryResult {
    LegalCategory category;
    char matched_keywords[8][32];
    int match_count;
    float confidence_score;
};

// Replace this prototype categorization function with the C module during backend integration.
struct CategoryResult classify_complaint_text(const char* raw_text) {
    struct CategoryResult result;
    result.category = CAT_GENERAL;
    result.match_count = 0;
    result.confidence_score = 0.0f;
    
    // Low-level token matching implementation for fast edge classification
    return result;
}`}
            </pre>
          </div>
        )}

        {activeCodeTab === 'java_backend' && (
          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              Planned Java Spring Boot REST Controller bridging the React client and native C engine:
            </p>
            <pre className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed border border-slate-800">
{`// ComplaintController.java (Planned Java Backend Integration)
package edu.btech.legalguardian.controller;

import org.springframework.web.bind.annotation.*;
import edu.btech.legalguardian.service.ComplaintClassifierService;
import edu.btech.legalguardian.model.AnalysisResponse;

@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintController {

    private final ComplaintClassifierService classifierService;

    public ComplaintController(ComplaintClassifierService classifierService) {
        this.classifierService = classifierService;
    }

    @PostMapping("/analyze")
    public AnalysisResponse analyzeComplaint(@RequestBody ComplaintRequest request) {
        // Invokes JNI native C module -> applies AI prompt synthesis -> returns JSON
        return classifierService.processAndCategorize(request);
    }
}`}
            </pre>
          </div>
        )}

        {activeCodeTab === 'db_schema' && (
          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              PostgreSQL relational database schema with Row-Level Security:
            </p>
            <pre className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
{`-- PostgreSQL / Supabase Relational Schema
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  complaint_text TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  analysis_status TEXT NOT NULL DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  suggested_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
            </pre>
          </div>
        )}

        {activeCodeTab === 'ai_contract' && (
          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              Mandatory system prompt ensuring zero legal liability and zero fabrication:
            </p>
            <pre className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed border border-slate-800">
{`"You are a legal awareness assistant, not a lawyer.
Provide general educational information only.
Do not provide definitive legal advice.
Do not fabricate laws, legal sections, court cases, penalties,
government procedures, or URLs.
Clearly state uncertainty.
Encourage users to consult qualified legal professionals or
appropriate official authorities for situation-specific advice."`}
            </pre>
          </div>
        )}
      </div>

      {/* Safety Notice Card */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-amber-950">Academic Integrity & Ethical Disclaimer</h4>
          <p className="text-amber-800 leading-relaxed">
            This project is created strictly as an academic prototype for 2nd-year engineering student
            evaluation. It demonstrates software engineering principles, modular service design, and
            educational legal literacy. It is not an authorized legal service, court portal, or
            substitute for an advocate.
          </p>
        </div>
      </div>
    </div>
  );
};
