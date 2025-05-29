// Chatbot.js - Always include quiz context for every user message
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ questions = [] }) => {
    const apiKey = 'fw_3ZVYq7876f44yCGPCNhsSidX';
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your AI assistant. How can I help you with the quiz?' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Build quiz context for the assistant
    const getQuizContext = () => {
        if (!questions.length) return '';
        return questions
            .map((q, idx) =>
                `Q${idx + 1}: ${q.questionText}\nOptions: ${q.answerOptions.map((a, i) => `${String.fromCharCode(65 + i)}. ${a.answerText}`).join(' ')}\nExplanation: ${q.explanation || ''}`
            )
            .join('\n\n');
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        const quizContext = getQuizContext();

        // Always include the quiz context and all previous user/assistant messages for continuity
        const chatHistory = messages
            .filter(msg => msg.role === 'user' || msg.role === 'assistant')
            .map(msg => ({ role: msg.role, content: msg.content }));

        const newMessages = [
            { role: 'system', content: `You are a helpful quiz assistant. Use ONLY the provided quiz questions and explanations to answer user queries. If the user asks about a specific question (e.g., "explain question 3"), use the corresponding question and its explanation from the quiz context below. If the user asks about a question that is NOT in the quiz context, politely say you don't have information about that question.` },
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
            let errorMessage = 'Sorry, I encountered an error. Please try again.';
            if (err.response?.status === 404) {
                errorMessage = 'Model not found. Please check the model name.';
            } else if (err.response?.status === 401) {
                errorMessage = 'Authentication failed. Please check your API key.';
            } else if (err.response?.status === 429) {
                errorMessage = 'Rate limit exceeded. Please try again later.';
            }
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Messages Container - Takes up remaining space */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-lg max-w-[80%] ${
                            msg.role === 'user' ? 'ml-auto bg-blue-100' : 'bg-gray-100'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        <div className="flex items-center gap-2">
                            <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t p-4 bg-gray-50 flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={isLoading}
                    />
                    <button
                        className={`px-4 py-2 text-white rounded-lg transition-colors ${
                            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        onClick={sendMessage}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;