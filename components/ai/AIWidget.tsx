"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatBox from "./ChatBox";
import { buildBackendUrl } from "@/lib/api-base-url";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const FALLBACK_REPLY =
  "I'm having trouble reaching the assistant right now. Please try again in a moment, or call us at 212.697.1701.";

type BookingFieldKey =
  | "firstName"
  | "lastName"
  | "dob"
  | "phone"
  | "email"
  | "sex"
  | "reason"
  | "date"
  | "time";

type BookingForm = Partial<Record<BookingFieldKey, string>>;

export default function AIWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [stickyHidden, setStickyHidden] = useState(false);
  const WELCOME_TEXT = "Hi, I'm your dental care AI advisor! How may I help you?";
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: WELCOME_TEXT, sender: "ai" },
  ]);

  const appendAiMessage = useCallback((text: string) => {
    const aiMsg: Message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      sender: "ai",
    };
    setMessages((prev) => [...prev, aiMsg]);
  }, []);

  const welcomeSpokenRef = useRef(false);
  const messagesRef = useRef<Message[]>(messages);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const listeningVideoRef = useRef<HTMLVideoElement>(null);
  const talkingVideoRef = useRef<HTMLVideoElement>(null);
  const inflightRef = useRef<AbortController | null>(null);
  const bookingDataRef = useRef<BookingForm>({});
  const bookingStepRef = useRef<number>(-1);
  const bookingPromptPendingRef = useRef(false);
  const speechSessionRef = useRef<{ transcript: string; silenceTimer: number | null }>({
    transcript: "",
    silenceTimer: null,
  });
  const flushSpeechTranscriptRef = useRef<() => void>(() => {});

  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.classList.add("ai-widget-open");
    } else {
      document.body.classList.remove("ai-widget-open");
    }
    window.dispatchEvent(new Event("resize"));
  }, [isOpen, mounted]);

  const speak = useCallback(
    (text: string) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const restoreListeningVideo = () => {
        setIsSpeaking(false);
        talkingVideoRef.current?.pause();
        if (listeningVideoRef.current) {
          listeningVideoRef.current.playbackRate = 1;
          listeningVideoRef.current.play().catch(() => {});
        }
      };

      const tryNow = (voice: SpeechSynthesisVoice | null) => {
        if (!voice) return false;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.pitch = 1.6;
        utterance.rate = 0.98;
        utterance.onstart = () => {
          setIsSpeaking(true);
          listeningVideoRef.current?.pause();
          if (talkingVideoRef.current) {
            talkingVideoRef.current.currentTime = 0;
            talkingVideoRef.current.playbackRate = 1;
            talkingVideoRef.current.play().catch(() => {});
          }
        };
        utterance.onend = restoreListeningVideo;
        utterance.onerror = restoreListeningVideo;
        window.speechSynthesis.speak(utterance);
        return true;
      };

      if (tryNow(femaleVoice)) return;

      const onVoicesReady = () => {
        const voices = window.speechSynthesis.getVoices();
        const fallback =
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              /female|woman|girl|zira|aria|jenny|salli|joanna|kendra|samantha|karen|moira|tessa|fiona/i.test(
                v.name
              )
          ) ?? null;
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesReady);
        tryNow(fallback);
      };

      window.speechSynthesis.addEventListener("voiceschanged", onVoicesReady);
      void window.speechSynthesis.getVoices();
    },
    [femaleVoice]
  );

  useEffect(() => {
    if (!mounted || !isOpen) return;
    if (welcomeSpokenRef.current) return;
    welcomeSpokenRef.current = true;
    const t = window.setTimeout(() => {
      try {
        speak(WELCOME_TEXT);
      } catch {
        // Speech synthesis unsupported.
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [isOpen, mounted, speak]);

  useEffect(() => {
    if (!mounted) return;
    const checkVisibility = () => {
      const extraWrap = document.getElementById("extra-wrap");
      const extraOpen = extraWrap?.classList.contains("open") ?? false;
      const footer = document.querySelector("footer");
      let nearFooter = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight - 80;
      }
      setStickyHidden(extraOpen || nearFooter);
    };
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    const extraWrap = document.getElementById("extra-wrap");
    let observer: MutationObserver | null = null;
    if (extraWrap) {
      observer = new MutationObserver(checkVisibility);
      observer.observe(extraWrap, { attributes: true, attributeFilter: ["class"] });
    }
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      observer?.disconnect();
    };
  }, [mounted]);

  useEffect(() => {
    const pickFemaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const preferredNames = [
        "Microsoft Zira",
        "Samantha",
        "Google UK English Female",
        "Karen",
        "Moira",
        "Tessa",
        "Fiona",
        "Microsoft Aria",
        "Microsoft Jenny",
        "Microsoft Salli",
        "Joanna",
        "Kendra",
      ];

      const voice =
        preferredNames.reduce<SpeechSynthesisVoice | null>((found, name) => {
          return found ?? (voices.find((v) => v.name.includes(name)) ?? null);
        }, null) ??
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            /female|woman|girl|zira|aria|jenny|salli|joanna|kendra|samantha/i.test(v.name)
        ) ??
        null;

      if (voice) setFemaleVoice(voice);
    };

    pickFemaleVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickFemaleVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickFemaleVoice);
    };
  }, []);

  const clearSpeechSilenceTimer = useCallback(() => {
    if (speechSessionRef.current.silenceTimer !== null) {
      window.clearTimeout(speechSessionRef.current.silenceTimer);
      speechSessionRef.current.silenceTimer = null;
    }
  }, []);

  const stopListeningSession = useCallback(
    (shouldStopRecognition: boolean) => {
      clearSpeechSilenceTimer();
      setIsListening(false);
      if (shouldStopRecognition) {
        try {
          recognitionRef.current?.stop();
        } catch {
          // Recognition may already be stopped.
        }
      }
    },
    [clearSpeechSilenceTimer]
  );

  const BOOKING_STEPS: Array<{
    key: BookingFieldKey;
    ask: string;
    validate: (v: string) => { ok: true; clean: string } | { ok: false; reason: string };
  }> = [
    {
      key: "firstName",
      ask: "Great! Let's book your appointment. What's your first name?",
      validate: (v) => {
        const t = v.trim();
        return t.length >= 2
          ? { ok: true, clean: t }
          : { ok: false, reason: "I didn't catch that - please share your first name." };
      },
    },
    {
      key: "lastName",
      ask: "And your last name?",
      validate: (v) => {
        const t = v.trim();
        return t.length >= 2
          ? { ok: true, clean: t }
          : { ok: false, reason: "Could you share your last name?" };
      },
    },
    {
      key: "dob",
      ask: "What's your date of birth? Please use MM/DD/YYYY.",
      validate: (v) => {
        const t = v.trim();
        const m = t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
        if (!m) return { ok: false, reason: "Please use MM/DD/YYYY - for example 05/14/1990." };
        const [, mm, dd, yy] = m;
        const year = yy.length === 2 ? Number(yy) + (Number(yy) > 30 ? 1900 : 2000) : Number(yy);
        const month = Number(mm);
        const day = Number(dd);
        if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) {
          return { ok: false, reason: "That date doesn't look right. Try MM/DD/YYYY, for example 05/14/1990." };
        }
        return {
          ok: true,
          clean: `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`,
        };
      },
    },
    {
      key: "phone",
      ask: "What's the best phone number to reach you?",
      validate: (v) => {
        const digits = v.replace(/\D/g, "");
        if (digits.length < 7) {
          return { ok: false, reason: "That phone number looks too short - could you re-share it?" };
        }
        const clean = v.trim().startsWith("+") ? v.trim() : `+1 ${v.trim()}`;
        return { ok: true, clean };
      },
    },
    {
      key: "email",
      ask: "What's your email address? We'll send your confirmation there.",
      validate: (v) => {
        const t = v.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
          ? { ok: true, clean: t }
          : { ok: false, reason: "That doesn't look like a valid email - could you double-check it?" };
      },
    },
    {
      key: "sex",
      ask: "Sex on file? Reply M or F, or say skip.",
      validate: (v) => {
        const t = v.trim().toLowerCase();
        if (t === "skip" || t === "") return { ok: true, clean: "" };
        if (t.startsWith("m")) return { ok: true, clean: "M" };
        if (t.startsWith("f")) return { ok: true, clean: "F" };
        return { ok: false, reason: 'Please reply with M, F, or "skip".' };
      },
    },
    {
      key: "reason",
      ask: "What's the reason for the visit? For example cleaning, consultation, cosmetic, or emergency.",
      validate: (v) => {
        const t = v.trim();
        return t.length >= 3
          ? { ok: true, clean: t }
          : { ok: false, reason: 'Could you share a short reason - like "cleaning" or "consultation"?' };
      },
    },
    {
      key: "date",
      ask: "What date works for you? Please use a format like May 22, 2026.",
      validate: (v) => {
        const t = v.trim();
        const d = new Date(t);
        if (Number.isNaN(d.getTime())) {
          return { ok: false, reason: 'I could not read that date. Try a format like "May 22, 2026".' };
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (d.getTime() < today.getTime()) {
          return { ok: false, reason: "That date is in the past. Could you pick a future date?" };
        }
        return { ok: true, clean: d.toISOString() };
      },
    },
    {
      key: "time",
      ask: "And what time? For example 10:00 AM or 2:30 PM, between 9 AM and 5 PM.",
      validate: (v) => {
        const t = v.trim();
        const m = t.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
        if (!m) return { ok: false, reason: 'I could not read that time. Try "10:00 AM" or "2:30 PM".' };
        let hour = Number(m[1]);
        const min = m[2] ? Number(m[2]) : 0;
        const ampm = (m[3] || "").toLowerCase();
        if (ampm === "pm" && hour < 12) hour += 12;
        if (ampm === "am" && hour === 12) hour = 0;
        if (hour < 8 || hour > 18) {
          return { ok: false, reason: "Please pick a time between 9 AM and 5 PM." };
        }
        const hh12 = ((hour + 11) % 12) + 1;
        const suffix = hour >= 12 ? "PM" : "AM";
        return { ok: true, clean: `${hh12}:${String(min).padStart(2, "0")} ${suffix}` };
      },
    },
  ];

  const bookingStepIndexByKey = BOOKING_STEPS.reduce<Record<BookingFieldKey, number>>((acc, step, index) => {
    acc[step.key] = index;
    return acc;
  }, {} as Record<BookingFieldKey, number>);

  const validateBookingValue = useCallback((key: BookingFieldKey, value: string) => {
    const step = BOOKING_STEPS[bookingStepIndexByKey[key]];
    return step.validate(value);
  }, [BOOKING_STEPS, bookingStepIndexByKey]);

  const normalizeSpokenDate = useCallback((value: string, mode: "dob" | "appointment"): string | null => {
    const trimmed = value.trim();
    const mmddyyyy = trimmed.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
    if (mmddyyyy) {
      return mmddyyyy[0];
    }

    const monthName = trimmed.match(
      /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:st|nd|rd|th)?(?:,)?\s+\d{4}\b/i
    );
    if (monthName) {
      const normalizedText = monthName[0].replace(/(\d)(st|nd|rd|th)\b/gi, "$1");
      const parsed = new Date(normalizedText);
      if (Number.isNaN(parsed.getTime())) return null;
      if (mode === "dob") {
        return `${String(parsed.getMonth() + 1).padStart(2, "0")}/${String(parsed.getDate()).padStart(2, "0")}/${parsed.getFullYear()}`;
      }
      return normalizedText;
    }

    return null;
  }, []);

  const normalizeSpokenTime = useCallback((value: string): string | null => {
    const timeMatch = value.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i);
    if (timeMatch) {
      return `${timeMatch[1]}${timeMatch[2] ? `:${timeMatch[2]}` : ":00"} ${timeMatch[3].toUpperCase()}`;
    }

    const oclockMatch = value.match(/\b(\d{1,2})\s*o'?clock\b/i);
    if (oclockMatch) {
      const hour = Number(oclockMatch[1]);
      if (hour >= 1 && hour <= 11) return `${hour}:00 AM`;
      if (hour === 12) return "12:00 PM";
    }

    return null;
  }, []);

  const extractNameFields = useCallback((text: string): Partial<BookingForm> => {
    const explicit = text.match(
      /first name(?: is)?\s+([a-z]+)(?:\s+and)?\s+last name(?: is)?\s+([a-z]+(?:\s+[a-z]+)*)/i
    );
    if (explicit) {
      return {
        firstName: explicit[1].trim(),
        lastName: explicit[2].trim(),
      };
    }

    const cleaned = text
      .replace(/\b(my|is|name|first|last|and)\b/gi, " ")
      .replace(/[^a-zA-Z\s'-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const parts = cleaned.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
      };
    }

    return {};
  }, []);

  const extractBookingAutofill = useCallback((text: string, currentStepKey: BookingFieldKey): Partial<BookingForm> => {
    const updates: Partial<BookingForm> = {};

    if (currentStepKey === "firstName" || currentStepKey === "lastName") {
      Object.assign(updates, extractNameFields(text));
    }

    if (currentStepKey === "dob") {
      const dobCandidate = normalizeSpokenDate(text, "dob");
      if (dobCandidate) {
        const validated = validateBookingValue("dob", dobCandidate);
        if (validated.ok) updates.dob = validated.clean;
      }
    }

    if (currentStepKey === "date" || currentStepKey === "time") {
      const dateCandidate = normalizeSpokenDate(text, "appointment");
      if (dateCandidate) {
        const validatedDate = validateBookingValue("date", dateCandidate);
        if (validatedDate.ok) updates.date = validatedDate.clean;
      }

      const timeCandidate = normalizeSpokenTime(text);
      if (timeCandidate) {
        const validatedTime = validateBookingValue("time", timeCandidate);
        if (validatedTime.ok) updates.time = validatedTime.clean;
      }
    }

    return updates;
  }, [extractNameFields, normalizeSpokenDate, normalizeSpokenTime, validateBookingValue]);

  const requestAiBookingAutofill = useCallback(async (text: string, currentStepKey: BookingFieldKey): Promise<Partial<BookingForm>> => {
    try {
      const response = await fetch("/api/grok/form-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utterance: text,
          currentField: currentStepKey,
          knownData: bookingDataRef.current,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.fields || typeof payload.fields !== "object") {
        return {};
      }

      const candidateFields = payload.fields as Partial<Record<BookingFieldKey, string>>;
      const validatedUpdates: Partial<BookingForm> = {};

      (Object.entries(candidateFields) as Array<[BookingFieldKey, string]>).forEach(([key, value]) => {
        if (!value || typeof value !== "string") return;
        let trimmed = value.trim();
        if (!trimmed) return;
        if (key === "dob") {
          trimmed = normalizeSpokenDate(trimmed, "dob") || trimmed;
        } else if (key === "date") {
          trimmed = normalizeSpokenDate(trimmed, "appointment") || trimmed;
        } else if (key === "time") {
          trimmed = normalizeSpokenTime(trimmed) || trimmed;
        }
        const validated = validateBookingValue(key, trimmed);
        if (validated.ok) {
          validatedUpdates[key] = validated.clean;
        }
      });

      return validatedUpdates;
    } catch {
      return {};
    }
  }, [normalizeSpokenDate, normalizeSpokenTime, validateBookingValue]);

  const startBookingFlow = useCallback(() => {
    bookingPromptPendingRef.current = false;
    bookingStepRef.current = 0;
    bookingDataRef.current = {};
    const firstAsk = BOOKING_STEPS[0].ask;
    appendAiMessage(firstAsk);
    speak(firstAsk);
  }, [BOOKING_STEPS, appendAiMessage, speak]);

  const submitBooking = useCallback(async (data: BookingForm): Promise<string> => {
    try {
      const res = await fetch(buildBackendUrl("/api/book"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          dob: data.dob || "",
          phone: data.phone || "",
          email: data.email || "",
          sex: data.sex || "",
          reason: data.reason || "",
          date: data.date || "",
          time: data.time || "",
        }),
      });
      let payload: { success?: boolean; error?: string; message?: string } = {};
      try {
        payload = await res.json();
      } catch {
        // Ignore malformed JSON.
      }
      if (res.ok) {
        return `All set, ${data.firstName}! I've booked your ${data.reason} appointment for ${
          data.date
            ? new Date(data.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : "the requested date"
        } at ${data.time}. You'll receive a confirmation email at ${data.email} shortly.`;
      }
      const looksDown =
        res.status === 502 ||
        (typeof payload.error === "string" && /backend is not reachable/i.test(payload.error));
      return looksDown
        ? "I couldn't reach our booking service just now. Please try again in a moment, or call us at 212.697.1701."
        : `Sorry - I couldn't complete the booking. ${payload.error || `(HTTP ${res.status})`} You can try again or call us at 212.697.1701.`;
    } catch {
      return "I couldn't reach our booking service. Please try again, or call us at 212.697.1701.";
    }
  }, []);

  const detectBookingIntent = useCallback((text: string): boolean => {
    const t = text.toLowerCase();
    return /\b(book(?:ing)?(?:\s+an?)?\s+appointment|schedule(?:\s+an?)?\s+appointment|book\s+(?:a\s+)?visit|book\s+now|make\s+an\s+appointment|set\s+up\s+an\s+appointment|can\s+you\s+book|could\s+you\s+book|please\s+book|i\s+(?:want|need|would\s+like)\s+(?:you\s+)?to\s+book)\b/.test(
      t
    );
  }, []);

  const detectAppointmentInterest = useCallback((text: string): boolean => {
    const t = text.toLowerCase();
    return /\b(appointment|book|booking|schedule|consultation|visit|dr\.?\s*harvey|doctor harvey|sharde harvey)\b/.test(
      t
    );
  }, []);

  const detectDirectBookingCommand = useCallback((text: string): boolean => {
    const t = text.toLowerCase();
    return /\b(i\s+want\s+you\s+to\s+book|book\s+an?\s+appointment\s+for\s+me|can\s+you\s+book\s+an?\s+appointment\s+for\s+me|could\s+you\s+book\s+an?\s+appointment\s+for\s+me|please\s+book\s+an?\s+appointment\s+for\s+me)\b/.test(
      t
    );
  }, []);

  const detectYesResponse = useCallback((text: string): boolean => {
    const t = text.trim().toLowerCase();
    return /^(yes|yeah|yep|sure|ok|okay|please do|go ahead|book it|book one|yes please)\b/.test(t);
  }, []);

  const detectNoResponse = useCallback((text: string): boolean => {
    const t = text.trim().toLowerCase();
    return /^(no|nope|not now|maybe later|no thank you|nah)\b/.test(t);
  }, []);

  const detectGreetingOnly = useCallback((text: string): boolean => {
    const t = text.trim().toLowerCase();
    return /^(hi|hello|hey|good morning|good afternoon|good evening|salam|assalamualaikum|how are you)\b[!.?]*$/.test(
      t
    );
  }, []);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
      setMessages((prev) => [...prev, userMsg]);

      const lowered = text.trim().toLowerCase();
      if (bookingStepRef.current >= 0 && /^(cancel|stop|nevermind|never mind|exit)\b/.test(lowered)) {
        bookingStepRef.current = -1;
        bookingDataRef.current = {};
        bookingPromptPendingRef.current = false;
        const reply = "No problem - I've cancelled the booking. Let me know whenever you're ready, or ask me anything else.";
        appendAiMessage(reply);
        speak(reply);
        return;
      }

      if (bookingPromptPendingRef.current) {
        if (detectYesResponse(text) || detectDirectBookingCommand(text)) {
          startBookingFlow();
          return;
        }
        if (detectNoResponse(text)) {
          bookingPromptPendingRef.current = false;
          const reply = "Of course. If you need anything else from Upper East Dental Innovations, I'm here to help.";
          appendAiMessage(reply);
          speak(reply);
          return;
        }
      }

      if (bookingStepRef.current >= 0) {
        const step = BOOKING_STEPS[bookingStepRef.current];
        const localAutofill = extractBookingAutofill(text, step.key);
        const aiAutofill = await requestAiBookingAutofill(text, step.key);
        const autofill = { ...localAutofill, ...aiAutofill };

        if (Object.keys(autofill).length > 0) {
          Object.assign(bookingDataRef.current, autofill);
          let nextStepIndex = bookingStepRef.current;
          while (
            nextStepIndex < BOOKING_STEPS.length &&
            bookingDataRef.current[BOOKING_STEPS[nextStepIndex].key]
          ) {
            nextStepIndex += 1;
          }
          bookingStepRef.current = nextStepIndex;
        } else {
          const result = step.validate(text);
          if (!result.ok) {
            appendAiMessage(result.reason);
            speak(result.reason);
            return;
          }
          bookingDataRef.current[step.key] = result.clean;
          bookingStepRef.current += 1;
        }

        if (bookingStepRef.current < BOOKING_STEPS.length) {
          const nextAsk = BOOKING_STEPS[bookingStepRef.current].ask;
          appendAiMessage(nextAsk);
          speak(nextAsk);
          return;
        }

        setIsTyping(true);
        const reply = await submitBooking(bookingDataRef.current);
        bookingStepRef.current = -1;
        bookingDataRef.current = {};
        bookingPromptPendingRef.current = false;
        appendAiMessage(reply);
        setIsTyping(false);
        speak(reply);
        return;
      }

      if (detectDirectBookingCommand(text)) {
        const reply = "Yes, I can help with that.";
        appendAiMessage(reply);
        speak(reply);
        window.setTimeout(() => startBookingFlow(), 150);
        return;
      }

      if (detectGreetingOnly(text)) {
        const greetingReply =
          lowered.startsWith("good morning")
            ? "Good morning. Do you want to book an appointment, or do you have another question for me?"
            : lowered.startsWith("good afternoon")
              ? "Good afternoon. Do you want to book an appointment, or do you have another question for me?"
              : lowered.startsWith("good evening")
                ? "Good evening. Do you want to book an appointment, or do you have another question for me?"
                : lowered.includes("salam") || lowered.includes("assalam")
                  ? "Wa alaikum assalam. Do you want to book an appointment, or do you have another question for me?"
                  : "Hi. Do you want to book an appointment, or do you have another question for me?";
        appendAiMessage(greetingReply);
        speak(greetingReply);
        return;
      }

      if (detectBookingIntent(text)) {
        bookingPromptPendingRef.current = true;
        const reply = "Yes, I can help with that. Do you want me to book an appointment for you?";
        appendAiMessage(reply);
        speak(reply);
        return;
      }

      setIsTyping(true);

      if (inflightRef.current) inflightRef.current.abort();
      const controller = new AbortController();
      inflightRef.current = controller;

      const historySnapshot = messagesRef.current.slice(-6).map((m) => ({
        role: m.sender === "ai" ? "assistant" : "user",
        content: m.text,
      }));

      let responseText = FALLBACK_REPLY;
      try {
        const res = await fetch("/api/grok", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: historySnapshot }),
          signal: controller.signal,
        });

        let payload: { text?: string; error?: string } = {};
        try {
          payload = await res.json();
        } catch {
          // Non-JSON response.
        }

        if (res.ok && payload.text) {
          responseText = payload.text;
        } else if (payload.error) {
          responseText = `Sorry - ${payload.error}`;
        }
      } catch (err: any) {
        if (err?.name === "AbortError") {
          return;
        }
        console.error("[AIWidget] Grok request failed:", err);
      } finally {
        if (inflightRef.current === controller) inflightRef.current = null;
      }

      const shouldOfferBooking =
        !bookingPromptPendingRef.current &&
        detectAppointmentInterest(text) &&
        !detectNoResponse(text);
      const finalResponse = shouldOfferBooking
        ? `${responseText} Do you want me to book an appointment for you?`
        : responseText;

      bookingPromptPendingRef.current = shouldOfferBooking;
      appendAiMessage(finalResponse);
      setIsTyping(false);
      speak(finalResponse);
    },
    [
      BOOKING_STEPS,
      appendAiMessage,
      detectAppointmentInterest,
      detectBookingIntent,
      detectDirectBookingCommand,
      extractBookingAutofill,
      requestAiBookingAutofill,
      detectGreetingOnly,
      detectNoResponse,
      detectYesResponse,
      speak,
      startBookingFlow,
      submitBooking,
    ]
  );

  useEffect(() => {
    flushSpeechTranscriptRef.current = () => {
      const transcript = speechSessionRef.current.transcript.trim();
      clearSpeechSilenceTimer();
      speechSessionRef.current.transcript = "";
      if (!transcript) {
        setIsListening(false);
        return;
      }
      stopListeningSession(true);
      handleSendMessage(transcript);
    };
  }, [clearSpeechSilenceTimer, handleSendMessage, stopListeningSession]);

  const scheduleSpeechAutoStop = useCallback(() => {
    clearSpeechSilenceTimer();
    speechSessionRef.current.silenceTimer = window.setTimeout(() => {
      flushSpeechTranscriptRef.current();
    }, 1300);
  }, [clearSpeechSilenceTimer]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          transcript += event.results[i][0]?.transcript || "";
        }
        speechSessionRef.current.transcript = transcript.trim();
        if (speechSessionRef.current.transcript) {
          scheduleSpeechAutoStop();
        }
      };

      recognitionRef.current.onerror = () => stopListeningSession(false);
      recognitionRef.current.onend = () => {
        if (speechSessionRef.current.transcript.trim()) {
          flushSpeechTranscriptRef.current();
          return;
        }
        stopListeningSession(false);
      };
    }
    return () => {
      clearSpeechSilenceTimer();
    };
  }, [clearSpeechSilenceTimer, scheduleSpeechAutoStop, stopListeningSession]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      stopListeningSession(true);
    } else {
      speechSessionRef.current.transcript = "";
      clearSpeechSilenceTimer();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const onSendClick = () => {
    if (inputRef.current) {
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed z-[9999] ai-widget-floating-container flex flex-col items-center gap-3 transition-all duration-500 ease-in-out ${
          isOpen ? "ai-panel-open" : ""
        } ${stickyHidden ? "sticky-hidden" : ""}`}
      >
        <div className="sticky-social-bar-integrated items-center justify-center">
          <Link href="https://www.youtube.com/@askadentistaskdr.harvey7701" target="_blank" className="social-icon-btn">
            <Image src="/social icons/youtube.png" alt="YouTube" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.facebook.com/UpperEastDental/" target="_blank" className="social-icon-btn">
            <Image src="/social icons/facebook.png" alt="Facebook" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.instagram.com/uppereastdentalnyc/?hl=en" target="_blank" className="social-icon-btn">
            <Image src="/social icons/instagram.png" alt="Instagram" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://twitter.com/uppereastdental" target="_blank" className="social-icon-btn">
            <Image src="/social icons/twitter.png" alt="X (Twitter)" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.linkedin.com/in/shardeharvey/?_l=en_US" target="_blank" className="social-icon-btn">
            <Image src="/social icons/linkedin.png" alt="LinkedIn" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>

          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.15, translateY: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border border-gray-100 group"
            >
              <Image
                src="/ai avatar.png"
                alt="AI Assistant"
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 lg:top-0 z-[9999] w-full lg:w-[300px] 2xl:w-[420px] h-[85vh] lg:h-full bg-white border border-gray-100 lg:border-none lg:border-l rounded-t-[32px] lg:rounded-none flex flex-col overflow-hidden pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.15)] lg:shadow-none ai-widget-side-panel"
          >
            <div className="p-3 2xl:p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 2xl:gap-3">
                <span className="font-bold text-gray-900 tracking-tight text-sm 2xl:text-lg">UpperEast</span>
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[8px] 2xl:text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Advisor</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 2xl:p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-3 2xl:p-6 pb-1">
              <div className="relative aspect-[16/10] rounded-xl 2xl:rounded-3xl overflow-hidden shadow-lg group border-[3px] 2xl:border-[6px] border-gray-50/50 bg-black">
                <video
                  ref={listeningVideoRef}
                  src="/listening.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover bg-black ${isSpeaking ? "opacity-0" : "opacity-100"}`}
                  style={{ backgroundColor: "black" }}
                />

                <video
                  ref={talkingVideoRef}
                  src="/talking.mov"
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover bg-black ${isSpeaking ? "opacity-100" : "opacity-0"}`}
                  style={{ backgroundColor: "black" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col items-center justify-end pb-3 2xl:pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleVoice}
                    className={`px-4 2xl:px-8 py-2 2xl:py-3.5 rounded-full text-[9px] 2xl:text-[12px] font-black flex items-center gap-1.5 2xl:gap-2 shadow-2xl border transition-all z-10 ${
                      isListening ? "bg-red-500 text-white border-red-400 animate-pulse" : "bg-white text-primary border-white/50"
                    }`}
                  >
                    <Mic size={12} className={isListening ? "text-white" : "text-red-500"} />
                    {isListening ? "Listening..." : "Speak with AI Advisor"}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-3 2xl:px-6 py-2 2xl:py-4">
              <ChatBox messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping} isThryvStyle={true} />
            </div>

            <div className="p-3 2xl:p-6 bg-white border-t border-gray-100 space-y-2 2xl:space-y-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask UpperEast"
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg 2xl:rounded-2xl px-3 2xl:px-6 py-2.5 2xl:py-4 pr-16 2xl:pr-24 text-[12px] 2xl:text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSendClick();
                    }
                  }}
                />
                <div className="absolute right-1.5 2xl:right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                  <button onClick={toggleVoice} className={`p-1.5 2xl:p-2 transition-colors ${isListening ? "text-red-500" : "text-gray-400 hover:text-primary"}`}>
                    <Mic size={16} />
                  </button>
                  <button onClick={onSendClick} className="p-1.5 2xl:p-2 text-primary hover:scale-110 transition-transform">
                    <Send size={16} />
                  </button>
                </div>
              </div>

              <div className="text-[7px] 2xl:text-[9px] text-gray-300 text-center font-bold uppercase tracking-[0.15em] 2xl:tracking-[0.3em]">
                Secure interaction encrypted by UpperEast AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
