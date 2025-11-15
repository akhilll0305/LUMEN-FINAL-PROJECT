import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatService } from '../services/api';

const suggestedQuestions = [
  'Show me my grocery expenses',
  'What did I spend on food this month?',
  'Tell me about my recent purchases',
  'Show me all my transport expenses',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  transactions?: any[];
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your LUMEN AI assistant. Ask me anything about your transactions and finances!',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create chat session when component opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      createSession();
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change or popup opens
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const createSession = async () => {
    try {
      const result = await chatService.createSession();
      if (result.success && result.data?.session_id) {
        setSessionId(result.data.session_id);
      }
    } catch (err) {
      console.error('Failed to create chat session:', err);
    }
  };

  const handleSend = async (message?: string) => {
    const text = message || input;
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      // Send message to RAG API
      const result = await chatService.sendMessage(text, sessionId || undefined);
      
      console.log('RAG API Response:', result); // Debug log
      
      if (result.success && result.data) {
        // Update session ID if returned
        if (result.data.session_id && !sessionId) {
          setSessionId(result.data.session_id);
        }

        // Only include transactions if should_show_transactions is true
        const shouldShowTransactions = result.data.should_show_transactions || false;
        const transactionsToShow = shouldShowTransactions && result.data.retrieved_docs 
          ? result.data.retrieved_docs 
          : [];

        // Add AI response
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: result.data.response || 'I apologize, I couldn\'t process that request.',
            transactions: transactionsToShow,
          },
        ]);
      } else {
        const errorMsg = result.error || 'Failed to get response';
        console.error('API Error:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error('Chat error details:', err);
      const errorMessage = err.message || 'Unknown error';
      setError(`Error: ${errorMessage}. Please make sure you're logged in.`);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm sorry, I encountered an error: ${errorMessage}. Please make sure you're logged in and try again.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open assistant"
            title="Open assistant"
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan to-cyan-dark hover:from-cyan-dark hover:to-cyan text-black rounded-full shadow-2xl flex items-center justify-center z-50 glow-cyan"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />
            
            {/* Chat Window - Vertically Centered on Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 100 }}
              transition={{ 
                type: 'spring', 
                bounce: 0.3,
                duration: 0.5
              }} 
              className="fixed top-1/2 -translate-y-1/2 right-6 w-[500px] h-[750px] max-h-[90vh] glass-card rounded-3xl shadow-2xl flex flex-col z-50 border-2 border-cyan/30 overflow-hidden"
              style={{
                maxWidth: 'calc(100vw - 3rem)',
                width:'50rem',
                marginLeft:'24rem',
                marginBottom:'2rem'
              }}
            >
            {/* Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan/10 to-transparent flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-cyan/30 to-cyan/10 rounded-full flex items-center justify-center ring-2 ring-cyan/30"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(6, 182, 212, 0.4)',
                      '0 0 0 10px rgba(6, 182, 212, 0)',
                      '0 0 0 0 rgba(6, 182, 212, 0)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <MessageCircle className="w-7 h-7 text-cyan" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-lg">LUMEN Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.div 
                      className="w-2.5 h-2.5 bg-success rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <span className="text-sm text-text-secondary">Online</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                title="Close assistant"
                className="p-2.5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-cyan/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-cyan to-cyan-dark text-black shadow-lg shadow-cyan/20'
                        : 'bg-gradient-to-br from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    <p className="text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    {message.transactions && message.transactions.length > 0 && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 space-y-2"
                      >
                        <p className="text-sm text-cyan font-semibold flex items-center gap-1.5">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          Related Transactions ({message.transactions.length})
                        </p>
                        {message.transactions.map((tx: any, idx: number) => (
                          <motion.div 
                            key={idx} 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="bg-black/30 rounded-xl p-3.5 text-sm border border-white/5 hover:border-cyan/30 transition-all cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-white text-base">{tx.merchant}</p>
                                <p className="text-text-secondary text-sm mt-0.5">{tx.category}</p>
                              </div>
                              <p className="font-bold text-cyan text-lg ml-3">₹{tx.amount}</p>
                            </div>
                            <p className="text-text-secondary text-xs">{new Date(tx.date).toLocaleDateString()}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2.5 h-2.5 bg-cyan rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-cyan rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-cyan rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && (
                <div className="space-y-3">
                  <p className="text-base text-text-secondary font-medium">Try asking:</p>
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(question)}
                      className="w-full text-left p-4 glass-card hover:bg-cyan/10 rounded-xl text-base transition-all border border-white/5 hover:border-cyan/30"
                    >
                      <span className="text-cyan mr-2 text-lg">•</span> {question}
                    </motion.button>
                  ))}
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 backdrop-blur-sm"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
              
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-5 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent flex-shrink-0"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-5 py-3.5 bg-bg-tertiary/50 backdrop-blur-sm border border-white/10 rounded-xl focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 transition-all text-base placeholder:text-text-secondary/50"
                />
                <motion.button
                  type="submit"
                  aria-label="Send message"
                  title="Send message"
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3.5 bg-gradient-to-br from-cyan to-cyan-dark hover:from-cyan-dark hover:to-cyan text-black rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan/20"
                >
                  <Send className="w-6 h-6" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}