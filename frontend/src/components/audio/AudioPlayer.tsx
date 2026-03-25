"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  duration: number;
  transcript?: string;
  onComplete?: () => void;
}

const speedOptions = [0.75, 1, 1.25, 1.5];

export default function AudioPlayer({ title, duration, transcript, onComplete }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setCurrentTime((t) => {
        const next = t + speed;
        if (next >= duration) {
          setPlaying(false);
          onComplete?.();
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, speed, duration, onComplete]);

  const progress = (currentTime / duration) * 100;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  // Mock waveform bars
  const bars = Array.from({ length: 40 }, () => Math.random() * 0.7 + 0.3);

  return (
    <div className="bg-surface-100 rounded-xl p-6 shadow-soft border border-surface-200">
      <h3 className="font-display font-semibold text-ink-900 mb-4">{title}</h3>

      {/* Waveform */}
      <div className="flex items-end gap-0.5 h-16 mb-4">
        {bars.map((h, i) => {
          const barProgress = (i / bars.length) * 100;
          const isPast = barProgress < progress;
          return (
            <motion.div
              key={i}
              animate={{
                scaleY: playing ? [h, h * 1.3, h] : h,
                transition: playing ? { repeat: Infinity, duration: 0.5 + Math.random() * 0.5, delay: i * 0.02 } : {},
              }}
              className={`flex-1 rounded-full origin-bottom ${isPast ? "bg-brand-500" : "bg-surface-100"}`}
              style={{ height: `${h * 100}%` }}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 bg-surface-100 rounded-full mb-3 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          setCurrentTime(pct * duration);
        }}
      >
        <motion.div
          className="h-full bg-brand-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time */}
      <div className="flex justify-between text-xs text-ink-500 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Speed */}
        <div className="flex gap-1">
          {speedOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded-xl text-xs font-medium transition-colors ${
                speed === s ? "bg-brand-50 text-brand-600" : "text-ink-600 hover:bg-surface-100"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Play/Pause */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setPlaying(!playing)}
          className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-glow"
        >
          {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </motion.button>

        <button onClick={() => setCurrentTime(Math.min(currentTime + 15, duration))} className="p-2 text-ink-600 hover:text-ink-500">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Transcript preview */}
      {transcript && (
        <div className="mt-4 bg-surface-100 rounded-xl p-3">
          <p className="text-xs text-ink-500 font-medium mb-1">Transcript</p>
          <p className="text-sm text-ink-500 line-clamp-3">{transcript}</p>
        </div>
      )}
    </div>
  );
}
