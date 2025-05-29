import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ questions = [] }) => {
    const apiKey = 'fw_3ZVYq7876f44yCGPCNhsSidX';
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your AI assistant. Ask me about your quiz or anything else!' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Generate quiz context dynamically
    const getQuizContext = () => {
        if (!questions.length) return '';
        return questions.map((q, idx) =>
            `Q${idx + 1}: ${q.questionText}\nOptions: ${q.answerOptions.map((a, i) => `${String.fromCharCode(65 + i)}. ${a.answerText}`).join(' ')}\nExplanation: ${q.explanation}`
        ).join('\n\n');
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        const quizContext = getQuizContext();

        const chatHistory = messages.map(msg => ({ role: msg.role, content: msg.content }));

        const newMessages = [
            { role: 'system', content: `You are a helpful AI assistant. If the user asks about a quiz question, use the provided quiz data for an accurate response. Otherwise, answer the query with general knowledge.` },
            { role: 'system', content: `Quiz Context:\n${quizContext}` },
            ...chatHistory,
            { role: 'user', content: input }
        ];

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');

        try {
            const response = await axios({
                method: 'post',
                url: 'https://api.fireworks.ai/inference/v1/chat/completions',
                timeout: 10000,
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    model: 'accounts/fireworks/models/llama-v3p1-8b-instruct',
                    messages: newMessages,
                    temperature: 0.7,
                    max_tokens: 1024,
                }
            });

            if (response.data?.choices?.[0]?.message) {
                setMessages(prev => [...prev, response.data.choices[0].message]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg border">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg">AI Quiz Assistant</h2>
                        <p className="text-blue-100 text-sm">Always here to help</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg, idx) => (
                    <div key={idx} 
                         className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-2xl max-w-[80%] ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                            <div className={`text-xs mt-1 ${
                                msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
                            <div className="flex items-center gap-2">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                                <span className="text-gray-600">Thinking</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4 bg-gray-50 flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question here..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={isLoading}
                    />
                    <button
                        className={`px-6 py-3 rounded-full transition-all transform active:scale-95 flex items-center gap-2 ${
                            isLoading || !input.trim() 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Send
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;