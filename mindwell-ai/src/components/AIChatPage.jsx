import React, { useState } from 'react';
import { sendMessageToAI } from '../../api/chatApi.js';
import { Loader2, Send } from 'lucide-react';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm here for you. How are you feeling toda y?" },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    const aiReply = await sendMessageToAI(userMessage.content);

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: aiReply || 'Sorry, I didn’t get that.' },
    ]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-between px-4 py-6">
      <div className="text-center text-2xl font-bold text-pink-600 mb-4">
        💬 MindwellAI Chat
      </div>

      {/* Message Display */}
      <div className="flex-1 overflow-y-auto max-h-[75vh] space-y-4 px-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-md rounded-xl px-4 py-3 text-sm whitespace-pre-wrap shadow-md ${
              msg.role === 'user'
                ? 'bg-pink-200 self-end ml-auto text-right'
                : 'bg-white self-start mr-auto text-gray-800'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 text-sm italic animate-pulse ml-2">AI is typing...</div>
        )}
      </div>

      {/* Input */}
      <div className="mt-6 flex items-center gap-2">
        <textarea
          rows={1}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type how you're feeling..."
          className="flex-1 p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white resize-none"
        />
        <button
          onClick={handleSend}
          disabled={loading || !inputMessage.trim()}
          className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:opacity-50 transition"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default AIChatPage;