"use client";
interface SkeletonProps { variant?: "text"|"circle"|"card"|"custom"; width?: string|number; height?: string|number; className?: string }
export default function Skeleton({ variant="text", width, height, className="" }: SkeletonProps) {
  const b = "animate-shimmer bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 bg-[length:200%_100%]";
  const m: Record<string,string> = { text:`${b} h-4 rounded-lg w-full`, circle:`${b} rounded-full w-10 h-10`, card:`${b} rounded-2xl w-full h-32`, custom:b };
  return <div className={`${m[variant]} ${className}`} style={{width:width?(typeof width==="number"?`${width}px`:width):undefined, height:height?(typeof height==="number"?`${height}px`:height):undefined}}/>;
}
