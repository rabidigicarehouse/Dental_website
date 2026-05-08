"use client";

import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceButton({ onTranscript, isListening, setIsListening }: VoiceButtonProps) {
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript, setIsListening]);

  const toggleListening = useCallback(() => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening, setIsListening]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleListening}
      className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
        isListening 
          ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
          : "bg-white hover:bg-gray-50 border border-gray-100 text-primary shadow-[0_10px_20px_rgba(74,124,210,0.15)]"
      }`}
    >
      {isListening ? (
        <MicOff size={20} className="text-white" />
      ) : (
        <Mic size={20} />
      )}
    </motion.button>
  );
}
