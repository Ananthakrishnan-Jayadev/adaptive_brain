"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, Eye, EyeOff,
  BookOpen, Route, BarChart3,
  Brain, FlaskConical, HelpCircle, Layers, GraduationCap,
} from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/onboarding"), 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ============ LEFT SIDE — Hero with Study Tree ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:w-[52%] bg-gradient-to-br from-sage-400 via-sage-500 to-brand-500 p-8 lg:p-16 flex flex-col justify-center items-start text-white relative overflow-hidden max-lg:hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-white/15 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6"
          >
            Master Any Topic,<br />Faster.
          </motion.h1>

          {/* Feature pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {[
              { icon: BookOpen, text: "AI-Generated Study Plans" },
              { icon: Route, text: "Personalized Learning Paths" },
              { icon: BarChart3, text: "Track Progress & Milestones" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                <item.icon className="w-5 h-5 text-white/70" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Study Tree Illustration */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative w-full max-w-md mx-auto"
          >
            <svg viewBox="0 0 400 320" className="w-full h-auto" fill="none">
              {/* Tree trunk */}
              <motion.path
                d="M200 310 C200 250, 200 200, 200 160 C200 120, 180 100, 160 80 M200 160 C200 130, 220 110, 250 90 M200 200 C180 190, 150 180, 130 170 M200 200 C220 190, 250 185, 270 175"
                stroke="white"
                strokeWidth="3"
                strokeOpacity="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
              {/* Leaf decorations */}
              {[
                { cx: 160, cy: 72 },
                { cx: 250, cy: 82 },
                { cx: 130, cy: 165 },
                { cx: 270, cy: 168 },
                { cx: 200, cy: 155 },
              ].map((leaf, i) => (
                <motion.ellipse
                  key={i}
                  cx={leaf.cx}
                  cy={leaf.cy}
                  rx="18"
                  ry="12"
                  fill="white"
                  fillOpacity="0.15"
                  transform={`rotate(${-30 + i * 15} ${leaf.cx} ${leaf.cy})`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.15, type: "spring" }}
                />
              ))}
            </svg>

            {/* Topic nodes floating on the tree */}
            {[
              { label: "Biology 101", x: "38%", y: "12%", icon: GraduationCap, delay: 1.0 },
              { label: "Cell Division", x: "10%", y: "38%", icon: FlaskConical, delay: 1.2 },
              { label: "Quiz", x: "65%", y: "30%", icon: HelpCircle, delay: 1.4 },
              { label: "Flashcards", x: "8%", y: "62%", icon: Layers, delay: 1.6 },
              { label: "Mock Exam", x: "58%", y: "55%", icon: Brain, delay: 1.8 },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: node.delay, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-ink-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-warm"
                style={{ left: node.x, top: node.y }}
              >
                <node.icon className="w-3.5 h-3.5 text-sage-500" />
                {node.label}
              </motion.div>
            ))}

            {/* Small floating dots on branches */}
            {[
              { x: "18%", y: "50%", size: "w-3 h-3", delay: 1.3 },
              { x: "55%", y: "42%", size: "w-2.5 h-2.5", delay: 1.5 },
              { x: "35%", y: "70%", size: "w-2 h-2", delay: 1.7 },
              { x: "68%", y: "65%", size: "w-3 h-3", delay: 1.9 },
            ].map((dot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: dot.delay, type: "spring" }}
                className={`absolute ${dot.size} rounded-full bg-white/40 border-2 border-white/60`}
                style={{ left: dot.x, top: dot.y }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ============ RIGHT SIDE — Signup Form ============ */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-surface-50 relative">
        {/* Logo top-right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-8 flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">AB</span>
          </div>
        </motion.div>

        {/* Sign In / Sign Up toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-8 lg:left-auto lg:right-20 flex items-center gap-1 text-sm"
        >
          <Link href="/login" className="text-ink-400 hover:text-ink-700 transition-colors font-medium">
            Sign In
          </Link>
          <span className="text-ink-300">|</span>
          <span className="text-ink-900 font-semibold">Sign Up</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="font-display text-2xl font-bold text-ink-900 mb-1">
            Create Your Account
          </h2>
          <p className="text-ink-500 mb-6 text-sm">
            Join thousands on their personalized learning journey.
          </p>

          {/* Google button */}
          <button
            onClick={() => router.push("/onboarding")}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-surface-300 bg-surface-100 text-ink-700 text-sm font-medium hover:bg-surface-200 hover:border-surface-400 transition-all mb-5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-surface-300" />
            <span className="text-xs text-ink-400 font-medium">or use email</span>
            <div className="flex-1 h-px bg-surface-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-surface-200 bg-surface-100 pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="email"
                  placeholder="jane.doe@example.com"
                  className="w-full rounded-xl border border-surface-200 bg-surface-100 pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="password123"
                  className="w-full rounded-xl border border-surface-200 bg-surface-100 pl-10 pr-10 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-0.5 w-4 h-4 rounded border-surface-300 text-sage-500 focus:ring-sage-400"
              />
              <span className="text-xs text-ink-500 leading-relaxed">
                I agree to the{" "}
                <button type="button" className="text-sage-500 hover:text-sage-600 font-medium">Terms</button>
                {" & "}
                <button type="button" className="text-sage-500 hover:text-sage-600 font-medium">Privacy Policy</button>.
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-sage-400 to-sage-500 text-white font-semibold text-sm shadow-soft hover:from-sage-500 hover:to-sage-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Start Your Free Trial"
              )}
            </motion.button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm text-ink-500 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-sage-500 hover:text-sage-600 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
