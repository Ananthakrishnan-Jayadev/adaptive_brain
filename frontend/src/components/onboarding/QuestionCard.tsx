"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

interface Option {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface QuestionCardProps {
  question: string;
  description?: string;
  options: Option[];
  multiSelect?: boolean;
  currentAnswer: string | string[] | undefined;
  onAnswer: (answer: string | string[]) => void;
  onNext: () => void;
  onPrev?: () => void;
  isFirst: boolean;
  direction: number;
}

export default function QuestionCard({
  question,
  description,
  options,
  multiSelect = false,
  currentAnswer,
  onAnswer,
  onNext,
  onPrev,
  isFirst,
  direction,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | string[]>(
    currentAnswer || (multiSelect ? [] : "")
  );

  const isSelected = (value: string) => {
    if (multiSelect) return (selected as string[]).includes(value);
    return selected === value;
  };

  const handleSelect = (value: string) => {
    if (multiSelect) {
      const arr = selected as string[];
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      setSelected(newArr);
      onAnswer(newArr);
    } else {
      setSelected(value);
      onAnswer(value);
    }
  };

  const hasSelection = multiSelect
    ? (selected as string[]).length > 0
    : !!selected;

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question}
        custom={direction}
        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="w-full max-w-2xl mx-auto"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 text-center mb-2">
          {question}
        </h2>
        {description && (
          <p className="text-ink-500 text-center mb-8">{description}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {options.map((option, i) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelect(option.value)}
              className={`
                relative text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected(option.value)
                  ? "border-brand-400 bg-brand-100 shadow-glow"
                  : "border-surface-200 bg-surface-100 hover:border-surface-200 hover:shadow-soft"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isSelected(option.value) ? "bg-brand-50 text-brand-600" : "bg-surface-100 text-ink-500"}
                `}>
                  {getIcon(option.icon)}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isSelected(option.value) ? "text-brand-700" : "text-ink-800"}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-ink-500 mt-0.5">{option.description}</p>
                </div>
                {isSelected(option.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-brand-500 text-ink-800 flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {!isFirst ? (
            <Button variant="ghost" onClick={onPrev} icon={<ChevronLeft className="w-4 h-4" />}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={onNext}
            disabled={!hasSelection}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            size="lg"
          >
            Next
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
