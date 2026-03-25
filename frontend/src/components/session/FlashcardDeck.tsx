"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";

interface FlashcardDeckProps {
  cards: { front: string; back: string }[];
  onComplete: () => void;
}

export default function FlashcardDeck({ cards, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knewIt, setKnewIt] = useState<boolean[]>([]);
  const [exitDir, setExitDir] = useState(0);
  const isDone = currentIndex >= cards.length;

  const handleResponse = (knew: boolean) => {
    setExitDir(knew ? 1 : -1);
    setKnewIt([...knewIt, knew]);
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
  };

  if (isDone) {
    const correct = knewIt.filter(Boolean).length;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-12 px-4"
      >
        <span className="text-5xl mb-4 block">🎉</span>
        <h3 className="font-display text-2xl font-bold text-ink-900 mb-2">Deck complete!</h3>
        <p className="text-ink-500 mb-6">
          You knew <span className="font-bold text-sage-500">{correct}</span> of{" "}
          <span className="font-bold">{cards.length}</span>
        </p>
        <Button onClick={onComplete}>Continue</Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <p className="text-sm text-ink-500 text-center mb-6">
        {currentIndex + 1} of {cards.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: exitDir * 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: exitDir * -200, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="perspective-1000"
        >
          <motion.div
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full aspect-[3/4] cursor-pointer"
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-surface-100 rounded-xl shadow-warm p-8 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-xs text-ink-500 uppercase tracking-wide mb-4">Question</p>
              <p className="font-display text-xl font-semibold text-ink-900">{cards[currentIndex].front}</p>
              <p className="text-xs text-ink-500 mt-6">Tap to flip</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-brand-100 rounded-xl shadow-warm p-8 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p className="text-xs text-brand-500 uppercase tracking-wide mb-4">Answer</p>
              <p className="font-display text-lg font-medium text-ink-900">{cards[currentIndex].back}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Response buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mt-6"
        >
          <button
            onClick={() => handleResponse(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-100 text-coral-500 font-medium hover:bg-coral-100 transition-colors"
          >
            <X className="w-5 h-5" /> Didn&apos;t know
          </button>
          <button
            onClick={() => handleResponse(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-100 text-sage-500 font-medium hover:bg-sage-100 transition-colors"
          >
            <Check className="w-5 h-5" /> Knew it
          </button>
        </motion.div>
      )}
    </div>
  );
}
