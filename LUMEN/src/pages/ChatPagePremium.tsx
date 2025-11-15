import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  'What were my biggest expenses this month?',
  'Are there any unusual transactions?',
  'Show me my spending trends',
  'How can I reduce my expenses?',
];

export default function ChatPagePremium() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI financial assistant. I can help you analyze transactions, detect anomalies, and provide insights. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${input}". Based on your transaction history, I've analyzed the data and here are my insights:\n\n• Your spending patterns show consistency\n• No anomalies detected in recent transactions\n• Your average monthly spending is within budget\n\nWould you like me to provide more detailed analysis?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <PageTransition className="min-h-screen relative overflow-hidden">
      <UltraPremiumBackground />
      <MouseGlow />
      <AuthenticatedNav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-8 h-screen flex flex-col relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-luxe-gold" />
              <motion.div
                className="absolute inset-0 bg-luxe-gold rounded-full blur-md opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-4xl font-heading font-bold">
              AI <span className="gradient-text-premium">Assistant</span>
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            Ask me anything about your finances
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-bg-primary" />
                    </div>
                  )}

                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <GlassCard
                      hoverable={false}
                      className={`${
                        message.role === 'user'
                          ? 'bg-gradient-gold text-bg-primary'
                          : 'bg-glass-bg'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-bg-primary/70' : 'text-text-tertiary'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </GlassCard>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-bg-primary" />
                </div>
                <GlassCard hoverable={false} className="bg-glass-bg">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-text-secondary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-text-secondary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-text-secondary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4"
            >
              <p className="text-sm text-text-secondary mb-3">Suggested questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    onClick={() => handleSuggestion(question)}
                    className="text-left p-3 bg-glass-bg border border-glass-border rounded-lg
                             text-sm text-text-secondary hover:text-text-primary
                             hover:border-luxe-gold hover:bg-glass-bg/80 transition-all"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard noPadding className="p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about your finances..."
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary"
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  glow
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
