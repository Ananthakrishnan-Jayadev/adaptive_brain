"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="text-5xl block mb-4">🤔</span>
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-ink-500 mb-6">
          Don&apos;t worry, your progress is safe. Let&apos;s try that again.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" onClick={() => window.location.href = "/dashboard"}>
            Back to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
