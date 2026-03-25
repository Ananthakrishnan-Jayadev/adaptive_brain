"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  FileText, Layers, Headphones, GraduationCap, Grid3x3, Table, Brain,
  ArrowLeft, Star, Bookmark, Play,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import CircularProgress from "@/components/ui/CircularProgress";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { topics, contentBlocks, quizQuestions, bookmarks, sessionNotes } from "@/lib/mock-data";

const contentFormats = [
  { type: "summary", label: "Summary", icon: FileText, recommended: true },
  { type: "flashcard_deck", label: "Flashcards", icon: Layers, recommended: true },
  { type: "concept_map", label: "Concept Map", icon: Grid3x3, recommended: false },
  { type: "audio_lesson", label: "Audio Lesson", icon: Headphones, recommended: false },
  { type: "micro_lesson", label: "Micro-Lessons", icon: GraduationCap, recommended: true },
  { type: "comparison_table", label: "Comparison Table", icon: Table, recommended: false },
  { type: "mnemonics", label: "Mnemonics", icon: Brain, recommended: false },
];

const difficultyColors = {
  foundational: "success" as const,
  intermediate: "warning" as const,
  advanced: "error" as const,
};

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  const projectId = params.id as string;

  const topic = topics.find((t) => t.id === topicId) || topics[0];
  const prereqs = topics.filter((t) => topic.prerequisites.includes(t.id));
  const topicQuestions = quizQuestions.filter((q) => q.topic_id === topicId);
  const topicBookmarks = bookmarks.filter((b) => b.topic_name === topic.name);
  const topicNotes = sessionNotes.filter((n) => n.topic_id === topicId);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() => router.push(`/project/${projectId}`)}
          className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to project
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-2xl font-bold text-ink-900"
              >
                {topic.name}
              </motion.h1>
              <Badge variant={difficultyColors[topic.difficulty]}>{topic.difficulty}</Badge>
            </div>
            <p className="text-ink-500">{topic.description}</p>
          </div>
          <CircularProgress value={topic.mastery_percentage} size={80} strokeWidth={8} />
        </div>

        {/* Prerequisites */}
        {prereqs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <span className="font-medium">Prerequisites:</span>
            {prereqs.map((p) => (
              <button
                key={p.id}
                onClick={() => router.push(`/project/${projectId}/topic/${p.id}`)}
                className="text-brand-500 hover:text-brand-500 font-medium"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        {/* Content Toolkit */}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Content Toolkit</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {contentFormats.map((format, i) => {
              const Icon = format.icon;
              return (
                <motion.div
                  key={format.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    variant="interactive"
                    padding="sm"
                    onClick={() => router.push(`/session/session_active?contentType=${format.type}`)}
                    className="relative"
                  >
                    {format.recommended && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold text-brand-500 bg-brand-100 px-1.5 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                    <Icon className="w-6 h-6 text-brand-500 mb-2" />
                    <p className="font-medium text-sm text-ink-900">{format.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => router.push(`/session/session_active`)} icon={<Play className="w-4 h-4" />}>
            Study This Topic
          </Button>
        </div>

        {/* Quiz Questions */}
        {topicQuestions.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">
              Practice Questions ({topicQuestions.length})
            </h2>
            <div className="space-y-2">
              {topicQuestions.slice(0, 3).map((q) => (
                <Card key={q.id} padding="sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={difficultyColors[q.difficulty]} size="sm">{q.difficulty}</Badge>
                    <span className="text-xs text-ink-500 uppercase">{q.type.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-ink-800 mt-1">{q.question_text}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {topicNotes.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Your Notes</h2>
            <div className="space-y-2">
              {topicNotes.map((note) => (
                <Card key={note.id} padding="sm">
                  <p className="text-sm text-ink-900">{note.text}</p>
                  <p className="text-xs text-ink-500 mt-1">{new Date(note.timestamp).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarks */}
        {topicBookmarks.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Bookmarked</h2>
            <div className="space-y-2">
              {topicBookmarks.map((bm) => (
                <Card key={bm.id} padding="sm">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-coral-500 fill-coral-500" />
                    <Badge size="sm">{bm.content_type}</Badge>
                  </div>
                  <p className="text-sm text-ink-800 mt-1">{bm.preview}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
