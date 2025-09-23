import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import * as webllm from "@mlc-ai/web-llm";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are Ryan King's personal AI assistant embedded in his portfolio website. Your role is to help visitors learn about Ryan's skills, experience, and background as a Software Engineer and Freelancer.

Key information about Ryan King:
- Software Engineer & Freelancer
- Specializes in web development, React, TypeScript, and modern frontend technologies
- Has experience with backend development, databases, and full-stack solutions
- Passionate about creating clean, efficient, and user-friendly applications
- Available for freelance projects and collaborations

Please:
- Be helpful and professional
- Focus on Ryan's technical skills and experience
- Encourage potential clients or collaborators to reach out
- Keep responses concise but informative
- If asked about topics outside of Ryan's professional background, politely redirect to his portfolio content
- Always maintain a friendly and approachable tone

Remember: You represent Ryan King professionally, so ensure all responses reflect positively on his expertise and character.`;

  const initializeEngine = async () => {
    setIsInitializing(true);
    try {
      const selectedModel = "Llama-3.2-3B-Instruct-q4f32_1-MLC";
      
      const initProgressCallback = (report: webllm.InitProgressReport) => {
        const progress = Math.round(report.progress * 100);
        setLoadingProgress(progress);
        console.log(`Loading model: ${progress}%`);
      };

      const newEngine = await webllm.CreateMLCEngine(
        selectedModel,
        { initProgressCallback }
      );
      
      setEngine(newEngine);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Hello! I'm Ryan's AI assistant. I'm here to help you learn about his skills, experience, and services. Feel free to ask me anything about his background or expertise!",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setLoadingProgress(100);
      
    } catch (error) {
      console.error('Failed to initialize WebLLM:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I'm having trouble starting up. This model requires a modern browser with WebGPU support. Please try refreshing the page or contact Ryan directly through the contact form.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsInitializing(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !engine || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversation = [
        { role: "system" as const, content: systemPrompt },
        ...messages.map(msg => ({ role: msg.role as "user" | "assistant", content: msg.content })),
        { role: "user" as const, content: userMessage.content }
      ];

      const reply = await engine.chat.completions.create({
        messages: conversation,
        temperature: 0.7,
        max_tokens: 256,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply.choices[0]?.message?.content || "I apologize, but I'm having trouble generating a response. Please try asking your question again.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error. Please try asking your question again, or feel free to contact Ryan directly.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !engine && !isInitializing) {
      initializeEngine();
    }
  }, [isOpen, engine, isInitializing]);

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        variant="default"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-6 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-2xl transition-all duration-300 z-50 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        <Card className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-6 w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ryan's AI Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {isInitializing 
                    ? `Loading model... ${loadingProgress}%` 
                    : 'Ask about skills & experience'
                  }
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {isInitializing && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Loading AI Assistant</p>
                    <div className="w-48 bg-muted rounded-full h-2 mx-auto">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {loadingProgress}% - Downloading and initializing model...
                    </p>
                    <p className="text-xs text-muted-foreground/75">
                      This may take 5-10 minutes on first load
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Ryan's skills..."
                disabled={isLoading || isInitializing || !engine}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || isInitializing || !engine || !input.trim()}
                size="sm"
                className="px-3"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}