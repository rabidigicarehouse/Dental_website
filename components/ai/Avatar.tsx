"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export default function Avatar({ isSpeaking, isListening }: AvatarProps) {
  return (
    <div className="relative flex justify-center items-center py-6">
      {/* Outer Glow Effect */}
      <motion.div
        animate={{
          scale: isListening ? [1, 1.1, 1] : 1,
          opacity: isListening ? [0.5, 0.8, 0.5] : 0.5,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-32 h-32 rounded-full bg-primary/20 blur-xl"
      />

      {/* Avatar Container */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
            ease: "easeInOut",
          }
        }}
        className="relative w-24 h-24 rounded-full border-4 border-white shadow-[0_15px_35px_rgba(74,124,210,0.25)] overflow-hidden bg-gray-50"
      >
        <Image
          src="/ai avatar.png"
          alt="AI Avatar"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 rounded-full border border-primary/10" />
      </motion.div>

      {/* Status Ring */}
      {isListening && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-28 h-28 rounded-full border-2 border-primary/30"
        />
      )}
    </div>
  );
}
