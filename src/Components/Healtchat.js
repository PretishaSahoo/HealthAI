import React, { useState, useEffect, useRef } from 'react';
import Groq from "groq-sdk";
import ReactMarkdown from 'react-markdown';

const Healtchat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'Maya', content: 'Hello, I am Maya. Ask me anything about fashion, I am here to help!' }]);
  const endRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

  const groqResponse = async (input) => {
    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You only answer health-related, technology,home remedies prompts.\n 
                      The entire conversation with you till now:\n.`
          },
          {
            role: "user",
            content: input,
          },
        ],
        model: "llama3-8b-8192",
        stream: false, 
      });

      return response.choices[0].message.content; 
    } catch (error) {
      console.error("Error in groqResponse:", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    const newMessage = { role: "user", content: input.trim() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const reply = await groqResponse(input.trim());
      const MayasReply = { role: "Maya", content: reply.trim() };
      setMessages((prevMessages) => [...prevMessages, MayasReply]);
    } catch (error) {
      console.error("Error in handleSend:", error);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className="text-center pt-32">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-purple-700 mt-24 sm:mt-24 md:mt-24">HealthAI - ChatBot</h2>
      </div>

      <div className="flex flex-col w-full max-w-[1200px] mx-auto p-4 rounded-lg bg-white shadow-lg h-[550px]">
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto mb-4">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-sm ${msg.role === 'Maya' ? 'bg-purple-100 text-purple-800 self-start' : 'bg-purple-300 text-white self-end'}`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow p-3 border border-purple-300 text-black bg-white rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Healtchat;
