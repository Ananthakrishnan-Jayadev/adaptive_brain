"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Image,
  File,
  X,
  Check,
  Sparkles,
  BookOpen,
  GraduationCap,
  RefreshCw,
  PartyPopper,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProgressBar from "@/components/ui/ProgressBar";
import Card from "@/components/ui/Card";

const mockFiles = [
  { name: "Chapter 5 - Cell Biology.pdf", size: "4.2 MB", type: "pdf" },
  { name: "Lecture Notes Week 3.docx", size: "1.8 MB", type: "docx" },
  { name: "Whiteboard Photo.png", size: "3.1 MB", type: "image" },
];

const processingMessages = [
  "Reading through your notes...",
  "Identifying key concepts...",
  "Building connections between topics...",
  "Creating your personalized study plan...",
];

const fileIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-rose-500" />,
  docx: <File className="w-5 h-5 text-brand-500" />,
  image: <Image className="w-5 h-5 text-sage-500" />,
};

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState(mockFiles);
  const [processProgress, setProcessProgress] = useState<number[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [comfortLevel, setComfortLevel] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Processing simulation
  useEffect(() => {
    if (step !== 3) return;
    setProcessProgress([]);
    const timer = setTimeout(() => {
      setProcessProgress([100]);
      setTimeout(() => setProcessProgress([100, 100]), 600);
      setTimeout(() => {
        setProcessProgress([100, 100, 100]);
        setTimeout(() => setStep(4), 800);
      }, 1200);
    }, 500);

    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % processingMessages.length);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(msgInterval);
    };
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      setTimeout(() => setShowConfetti(true), 500);
    }
  }, [step]);

  const comfortOptions = [
    { value: "beginner", label: "Starting from scratch", description: "I haven't studied this material yet", icon: BookOpen },
    { value: "intermediate", label: "I know the basics", description: "I've covered this before but need to deepen understanding", icon: GraduationCap },
    { value: "review", label: "Just need to review", description: "I know this material well, just need a refresh", icon: RefreshCw },
  ];

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display text-xl font-bold text-ink-900">Create New Project</h1>
            <span className="text-sm text-ink-500">Step {step} of 4</span>
          </div>
          <ProgressBar value={(step / 4) * 100} color="bg-brand-500" size="sm" />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Project Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Input label="Project Name" placeholder="e.g., Biology 101 Final" defaultValue="Biology 101 Final" />
              <Input label="Exam Date" type="date" />
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1.5">
                  Hours per day you can study
                </label>
                <select className="w-full rounded-xl border border-surface-200 bg-surface-100 px-4 py-2.5 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300">
                  {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6].map((h) => (
                    <option key={h} value={h} selected={h === 2}>
                      {h} {h === 1 ? "hour" : "hours"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-900 mb-3">Comfort Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {comfortOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setComfortLevel(opt.value)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          comfortLevel === opt.value
                            ? "border-brand-400 bg-brand-100"
                            : "border-surface-200 hover:border-surface-200"
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${comfortLevel === opt.value ? "text-brand-500" : "text-ink-500"}`} />
                        <p className="font-semibold text-sm text-ink-900">{opt.label}</p>
                        <p className="text-xs text-ink-500 mt-1">{opt.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Upload Materials */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="border-2 border-dashed border-surface-200 rounded-xl p-10 text-center hover:border-brand-300 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-ink-500 mx-auto mb-3" />
                <p className="font-medium text-ink-900">Drop your files here or click to browse</p>
                <p className="text-xs text-ink-500 mt-1">.pdf, .docx, .pptx, .png, .jpg, .mp3</p>
              </div>

              <div className="space-y-2">
                {files.map((file, i) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-surface-100 rounded-xl border border-surface-200"
                  >
                    {fileIcons[file.type] || <File className="w-5 h-5 text-ink-500" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-700 truncate">{file.name}</p>
                      <p className="text-xs text-ink-500">{file.size}</p>
                    </div>
                    <button
                      onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      className="p-1.5 rounded-xl hover:bg-surface-100 text-ink-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={files.length === 0} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-8 h-8 text-ink-800" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg font-display font-semibold text-ink-900 mb-8"
                >
                  {processingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>

              <div className="space-y-3 max-w-sm mx-auto">
                {mockFiles.map((file, i) => (
                  <div key={file.name} className="flex items-center gap-3">
                    {processProgress[i] === 100 ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-5 h-5 text-sage-500" />
                      </motion.div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-brand-300 border-t-brand-500 animate-spin" />
                    )}
                    <span className="text-sm text-ink-500 flex-1 text-left">{file.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Magic Moment */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        rotate: 0,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: window.innerHeight + 20,
                        rotate: Math.random() * 720 - 360,
                        x: Math.random() * window.innerWidth,
                      }}
                      transition={{ duration: Math.random() * 2 + 2, ease: "easeIn" }}
                      className={`absolute w-3 h-3 rounded-xl ${
                        ["bg-brand-400", "bg-coral-400", "bg-amber-400", "bg-sage-400", "bg-brand-300"][i % 5]
                      }`}
                    />
                  ))}
                </div>
              )}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-20 h-20 rounded-xl bg-sage-100 flex items-center justify-center mx-auto mb-6"
              >
                <PartyPopper className="w-10 h-10 text-sage-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-2"
              >
                I found <span className="text-brand-500">10 topics</span> across your materials!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-ink-500 text-lg mb-8"
              >
                Here&apos;s your 14-day study plan
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-6 mb-8"
              >
                {[
                  { label: "Topics", value: "10" },
                  { label: "Days", value: "14" },
                  { label: "Min/day", value: "120" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl font-bold text-brand-500">{stat.value}</p>
                    <p className="text-xs text-ink-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <div className="space-y-3">
                <Button size="lg" onClick={() => router.push("/session/session_active")} className="px-10">
                  Start Day 1
                </Button>
                <div>
                  <button
                    onClick={() => router.push("/project/proj_001")}
                    className="text-sm text-brand-500 hover:text-brand-500 font-medium"
                  >
                    Go to project dashboard →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
