"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, FileText, Image, File, ArrowLeft, Check } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { sourceMaterials } from "@/lib/mock-data";

const fileIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-8 h-8 text-rose-500" />,
  docx: <File className="w-8 h-8 text-brand-500" />,
  image: <Image className="w-8 h-8 text-sage-500" />,
};

export default function MaterialsPage() {
  const params = useParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const projectId = params.id as string;
  const materials = sourceMaterials.filter((m) => m.project_id === projectId);

  const filtered = materials.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.extracted_text_preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <button
          onClick={() => router.push(`/project/${projectId}`)}
          className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to project
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-bold text-ink-900"
        >
          Source Materials
        </motion.h1>

        <Input
          placeholder="Search across your materials..."
          icon={<Search className="w-4 h-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-3">
          {filtered.map((mat, i) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                variant="interactive"
                onClick={() => setExpanded(expanded === mat.id ? null : mat.id)}
              >
                <div className="flex items-center gap-4">
                  {fileIcons[mat.file_type] || <File className="w-8 h-8 text-ink-500" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink-900">{mat.filename}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-ink-500">{mat.file_size}</span>
                      <span className="text-xs text-ink-500">&middot;</span>
                      <span className="text-xs text-ink-500">{mat.page_count} pages</span>
                      <Badge variant="success" size="sm">
                        <Check className="w-3 h-3 mr-0.5" /> Processed
                      </Badge>
                    </div>
                  </div>
                </div>

                {expanded === mat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-surface-200"
                  >
                    <h4 className="text-sm font-medium text-ink-500 mb-2">Extracted Content Preview</h4>
                    <p className="text-sm text-ink-500 leading-relaxed whitespace-pre-line">
                      {mat.extracted_text_preview}
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
