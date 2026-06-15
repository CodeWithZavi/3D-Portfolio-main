import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import DOMPurify from "dompurify";

// Simple markdown-to-HTML for safe rendering in chat
function renderMarkdown(text) {
  if (!text) return "";
  let html = text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Links — unwrapped URLs become clickable but truncated visually
    .replace(/(https?:\/\/\S+)/g, (url) => {
      const display = url.replace(/^https?:\/\//, "").slice(0, 30) + (url.length > 37 ? "..." : "");
      return `<a href="${url}" target="_blank" class="text-purple-400 underline break-all">${display}</a>`;
    })
    // Markdown links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-purple-400 underline break-all">$1</a>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 rounded text-purple-300">$1</code>')
    // Bullet points
    .replace(/^- (.+)/gm, '<li class="ml-3 list-disc">$1</li>')
    // Line breaks
    .replace(/\n/g, "<br/>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((<li[^>]*>.*?<\/li>\s*)+)/g, '<ul class="my-1">$1</ul>');

  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["strong", "a", "code", "li", "ul", "br"], ALLOWED_ATTR: ["href", "target", "class"] });
}

function MessageBubble({ message, isUser }) {
  const rendered = useMemo(() => (isUser ? message : renderMarkdown(message)), [message, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed overflow-hidden break-words ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md"
            : "bg-gray-800/80 text-gray-200 rounded-bl-md border border-gray-700/50 whitespace-pre-wrap"
        }`}
      >
        {isUser ? message : <div dangerouslySetInnerHTML={{ __html: rendered }} />}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0">
          <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-2">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div className="bg-gray-800/80 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-700/50">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

const GREETING = {
  role: "assistant",
  content: "Hi! I'm **ZaviBot**, Noman's AI assistant. Ask me about his **skills**, **projects**, **experience**, or **achievements**!",
};

function sanitizeInput(text) {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[\\\x00-\x1f]/g, "")
    .trim()
    .slice(0, 500);
}

// Generate a stable session ID
function getSessionId() {
  if (!globalThis.__chatSessionId) {
    globalThis.__chatSessionId = "sess_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }
  return globalThis.__chatSessionId;
}

function ChatBot({ isOpen, onClose, onToggle, onStreamingChange }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(getSessionId());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    onStreamingChange?.(isLoading);
  }, [isLoading, onStreamingChange]);

  useEffect(() => {
    const handler = (e) => { setInput(e.detail); };
    window.addEventListener("voiceTranscript", handler);
    return () => window.removeEventListener("voiceTranscript", handler);
  }, []);

  const handleSend = async () => {
    const text = sanitizeInput(input);
    if (!text || isLoading) return;

    if (text === "/clear") {
      setMessages([GREETING]);
      setInput("");
      return;
    }

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, sessionId: sessionId.current }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("text/event-stream")) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assistantContent = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                assistantContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                  return updated;
                });
              } catch {}
            }
          }
        }
        setMessages((prev) => prev);
      } else {
        const data = await res.json();
        if (data.fallback) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I couldn't reach the AI server. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "What skills does Noman have?",
    "What projects has he built?",
    "What's his work experience?",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={slideIn("right", "tween", 0, 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="fixed right-4 bottom-24 z-50 w-[380px] h-[580px] max-w-[calc(100vw-2rem)] rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-purple-500/30 shadow-2xl shadow-purple-500/20 backdrop-blur-xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 px-5 py-4 border-b border-purple-500/20 bg-gray-950/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-950" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">ZaviBot AI</h3>
                  <p className="text-gray-400 text-xs">RAG + Groq • Type /clear to reset</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg.content} isUser={msg.role === "user"} />
            ))}
            {isLoading && <TypingIndicator />}

            {messages.length <= 1 && !isLoading && (
              <motion.div variants={fadeIn("up", "spring", 0.5, 0.7)} initial="hidden" animate="show" className="mt-4 space-y-2">
                <p className="text-gray-500 text-xs mb-2">Try asking:</p>
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/30 hover:border-purple-500/30"
                  >
                    {prompt}
                  </button>
                ))}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-purple-500/20 bg-gray-950/80">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Noman..."
                rows={1}
                className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 rounded-xl text-sm text-white placeholder-gray-500 outline-none resize-none transition-colors"
                style={{ minHeight: "2.5rem", maxHeight: "7.5rem" }}
                onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all duration-300 flex-shrink-0"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-[10px] mt-2 text-center">
              Powered by RAG + Groq Llama • Free & Private
            </p>
          </div>
        </motion.div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <motion.button
          variants={fadeIn("up", "spring", 0, 0.5)}
          initial="hidden"
          animate="show"
          onClick={() => onToggle?.()}
          className="fixed right-4 bottom-24 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full shadow-2xl shadow-purple-500/50 hover:scale-110 transition-all duration-300 group"
        >
          <div className="relative">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ChatBot;
