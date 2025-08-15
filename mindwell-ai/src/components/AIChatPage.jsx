import React, { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../../api/chatApi";
import { motion } from "framer-motion";
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";
import { useNavigate } from "react-router-dom";

export default function AIChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/register");
  }, [navigate]);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your Willora Assistant 🌿 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await sendMessageToAI(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#F4EDE3] text-neutral-800 overflow-hidden" style={{ backgroundImage: `url(${PaperTexture})`, backgroundRepeat: "repeat", backgroundSize: "auto" }}>
      <motion.img src={BlobClay} className="absolute -top-32 -left-40 w-[28rem] opacity-30 pointer-events-none" animate={{ y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={BlobSage} className="absolute bottom-0 -right-40 w-[30rem] opacity-30 pointer-events-none" animate={{ y: [0, -15, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col flex-1 rounded-3xl border border-neutral-200 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden z-10 mt-8 mb-8">
        <div className="p-5 border-b border-neutral-200 bg-white/60 backdrop-blur-sm font-serif text-lg">💬 Willora Assistant</div>
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-[#E8D9CF] ml-auto" : "bg-neutral-100"}`}>
              {msg.text}
            </motion.div>
          ))}
          {loading && <div className="flex items-center gap-1 text-sm text-neutral-500 italic"><span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span></div>}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-neutral-200 flex gap-2 bg-white/60 backdrop-blur-sm">
          <input type="text" className="flex-1 border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} disabled={loading} className="px-4 py-2 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50">Send</button>
        </div>
      </div>
    </main>
  );
}
