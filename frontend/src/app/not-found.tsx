"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="font-display text-8xl font-bold text-brand-700 mb-4"
        >
          404
        </motion.p>
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">
          Page not found
        </h1>
        <p className="text-ink-500 mb-6">
          Looks like this page went to study somewhere else.
        </p>
        <Button onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
