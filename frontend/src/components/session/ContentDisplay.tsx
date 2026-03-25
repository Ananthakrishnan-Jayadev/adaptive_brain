"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle, ArrowRight, Bookmark } from "lucide-react";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import FlashcardDeck from "./FlashcardDeck";
import MicroLessonPlayer from "./MicroLessonPlayer";
import ConceptMap from "./ConceptMap";
import ComparisonTable from "./ComparisonTable";
import MnemonicsDisplay from "./MnemonicsDisplay";
import AudioPlayer from "@/components/audio/AudioPlayer";

interface ContentDisplayProps {
  content: any;
  onComplete: () => void;
}

export default function ContentDisplay({ content, onComplete }: ContentDisplayProps) {
  const [showELI5, setShowELI5] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ==================== FLASHCARD DECK ====================
  if (content.content_type === "flashcard_deck") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
        <FlashcardDeck cards={content.data.cards} onComplete={onComplete} />
      </motion.div>
    );
  }

  // ==================== MICRO LESSON ====================
  if (content.content_type === "micro_lesson") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[80vh]">
        <MicroLessonPlayer screens={content.data.screens} onComplete={onComplete} />
      </motion.div>
    );
  }

  // ==================== CONCEPT MAP ====================
  if (content.content_type === "concept_map") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-ink-900">{content.title}</h2>
          <BookmarkBtn bookmarked={bookmarked} setBookmarked={setBookmarked} />
        </div>
        <p className="text-sm text-ink-500 mb-4">Tap a node to explore. Drag to pan, scroll to zoom.</p>
        <ConceptMap nodes={content.data.nodes} edges={content.data.edges} />
        <div className="mt-8 text-center">
          <Button onClick={onComplete} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
            Continue to quiz
          </Button>
        </div>
      </motion.div>
    );
  }

  // ==================== COMPARISON TABLE ====================
  if (content.content_type === "comparison_table") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-ink-900">{content.title}</h2>
          <BookmarkBtn bookmarked={bookmarked} setBookmarked={setBookmarked} />
        </div>
        <ComparisonTable columns={content.data.columns} rows={content.data.rows} />
        <div className="mt-8 text-center">
          <Button onClick={onComplete} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
            Continue to quiz
          </Button>
        </div>
      </motion.div>
    );
  }

  // ==================== MNEMONICS ====================
  if (content.content_type === "mnemonics") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MnemonicsDisplay mnemonics={content.data.mnemonics} onComplete={onComplete} />
      </motion.div>
    );
  }

  // ==================== AUDIO LESSON ====================
  if (content.content_type === "audio_lesson") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto py-8 px-4">
        <AudioPlayer
          title={content.title}
          duration={content.data.duration_seconds}
          transcript={content.data.transcript_preview}
        />
        <div className="mt-8 text-center">
          <Button onClick={onComplete} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
            Continue to quiz
          </Button>
        </div>
      </motion.div>
    );
  }

  // ==================== SUMMARY (default) ====================
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-6 px-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-ink-900">{content.title}</h2>
        <BookmarkBtn bookmarked={bookmarked} setBookmarked={setBookmarked} />
      </div>

      <div className="space-y-8">
        {content.data.sections?.map((section: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="font-display text-lg font-semibold text-ink-900 mb-3">{section.heading}</h3>
            {section.paragraphs.map((p: string, j: number) => (
              <p key={j} className="text-ink-600 leading-relaxed mb-3">
                {p.split("**").map((part: string, k: number) =>
                  k % 2 === 1 ? (
                    <Tooltip key={k} content={section.key_terms?.find((t: any) => t.term === part)?.definition || part}>
                      <span className="font-semibold text-brand-500 border-b border-brand-200 cursor-help">
                        {part}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={k}>{part}</span>
                  )
                )}
              </p>
            ))}
            {section.key_terms?.length > 0 && (
              <div className="mt-4 bg-brand-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-brand-700 mb-2">Key Terms</h4>
                <div className="space-y-1.5">
                  {section.key_terms.map((term: any) => (
                    <div key={term.term} className="text-sm">
                      <span className="font-semibold text-brand-500">{term.term}:</span>{" "}
                      <span className="text-ink-600">{term.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ELI5 */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowELI5(!showELI5)}
        className="fixed bottom-24 right-4 bg-amber-100 text-amber-700 px-4 py-2 rounded-full shadow-warm text-sm font-medium flex items-center gap-2 z-20"
      >
        <HelpCircle className="w-4 h-4" /> Explain like I&apos;m 5
      </motion.button>

      <AnimatePresence>
        {showELI5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-36 right-4 bg-surface-100 rounded-2xl shadow-elevated p-4 max-w-xs border border-surface-200 z-20"
          >
            <p className="text-sm text-ink-700 leading-relaxed">
              Think of it like a recipe: DNA is the cookbook (locked in the kitchen). You photocopy the recipe (that&apos;s mRNA). Then you bring the copy to the cook (ribosome), who reads it and makes the dish (protein) using ingredients (amino acids) delivered by helpers (tRNA). Simple as that! 🍳
            </p>
            <button onClick={() => setShowELI5(false)} className="text-xs text-ink-400 mt-2">Got it</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 text-center">
        <Button onClick={onComplete} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
          Continue to quiz
        </Button>
      </div>
    </motion.div>
  );
}

// Small bookmark helper
function BookmarkBtn({ bookmarked, setBookmarked }: { bookmarked: boolean; setBookmarked: (v: boolean) => void }) {
  return (
    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setBookmarked(!bookmarked)} className="p-2 rounded-xl hover:bg-surface-200 transition-colors">
      <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-coral-500 text-coral-500" : "text-ink-400"}`} />
    </motion.button>
  );
}
