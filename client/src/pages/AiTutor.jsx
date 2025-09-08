import { useState } from "react";
import axios from "axios";

export default function AiTutor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="w-full max-w-lg p-6 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black]">
        <h2 className="text-3xl font-extrabold mb-4 text-black tracking-tight">
          AI Tutor
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about your studies..."
          className="w-full p-3 border-4 border-black rounded-xl bg-pink-200 shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-black mb-4 resize-none"
          rows="4"
        />

        <button
          onClick={askQuestion}
          className="px-6 py-3 bg-teal-400 border-4 border-black rounded-xl shadow-[4px_4px_0px_black] text-black font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform"
        >
          Pucho
        </button>

        {answer && (
          <div className="mt-6 p-4 bg-green-200 border-4 border-black rounded-xl shadow-[4px_4px_0px_black]">
            <strong className="block text-lg mb-2">Answer:</strong>
            <p className="text-black leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
