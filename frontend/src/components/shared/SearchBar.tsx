"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { topics, sourceMaterials, contentBlocks } from "@/lib/mock-data";

interface SearchResult {
  title: string;
  type: string;
  source: string;
  href: string;
}

function getResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  topics.filter((t) => t.name.toLowerCase().includes(q)).forEach((t) => {
    results.push({ title: t.name, type: "topic", source: "Biology 101", href: `/project/proj_001/topic/${t.id}` });
  });

  sourceMaterials.filter((m) => m.filename.toLowerCase().includes(q) || m.extracted_text_preview.toLowerCase().includes(q)).forEach((m) => {
    results.push({ title: m.filename, type: "material", source: "Biology 101", href: `/project/proj_001/materials` });
  });

  contentBlocks.filter((c) => c.title.toLowerCase().includes(q)).forEach((c) => {
    results.push({ title: c.title, type: c.content_type, source: "Content", href: `/session/session_active` });
  });

  return results.slice(0, 6);
}

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = getResults(query);

  return (
    <div className="relative">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-surface-100 text-ink-500"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <motion.div
          initial={{ width: 40, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials, topics..."
            className="w-full pl-10 pr-8 py-2 rounded-xl border border-surface-200 bg-surface-100 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button onClick={() => { setOpen(false); setQuery(""); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-500">
            <X className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full mt-1 w-full bg-surface-100 rounded-xl shadow-elevated border border-surface-200 overflow-hidden z-50"
              >
                {results.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => { router.push(result.href); setOpen(false); setQuery(""); }}
                    className="w-full text-left px-4 py-3 hover:bg-surface-100 flex items-center gap-3 border-b border-surface-200 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-700 truncate">{result.title}</p>
                      <p className="text-xs text-ink-500">{result.source}</p>
                    </div>
                    <Badge size="sm">{result.type}</Badge>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
