"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  isThryvStyle?: boolean;
}

export default function ChatBox({ messages, isTyping, isThryvStyle }: ChatBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 xl:space-y-6 pr-2 
          scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent 
          hover:scrollbar-thumb-primary/40 transition-colors
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:bg-gray-200
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-primary/30"
        onWheel={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] p-3 xl:p-4 text-[12px] xl:text-[13px] leading-relaxed ${
                  msg.sender === "user"
                    ? isThryvStyle 
                      ? "bg-primary/10 text-gray-800 rounded-xl xl:rounded-2xl rounded-tr-none border border-primary/20"
                      : "bg-primary text-white rounded-xl xl:rounded-2xl rounded-tr-none"
                    : isThryvStyle
                      ? "text-gray-600 bg-white border border-gray-100 rounded-xl xl:rounded-2xl rounded-tl-none shadow-sm"
                      : "bg-gray-100 text-gray-800 rounded-xl xl:rounded-2xl rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-50 p-3 rounded-xl flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
