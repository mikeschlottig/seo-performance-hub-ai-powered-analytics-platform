import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, BrainCircuit, UserCog, Ghost, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatService } from '@/lib/chat';
import { useDataStore } from '@/lib/data-store';
import { toast } from 'sonner';
const PERSONAS = [
  {
    id: 'strategist',
    name: 'SEO Strategist',
    description: 'Expert in long-term growth and keyword mapping.',
    icon: BrainCircuit,
    prompt: "You are an SEO Strategist. Analyze data for long-term growth, focusing on topical authority and keyword clusters."
  },
  {
    id: 'tech-auditor',
    name: 'Technical Auditor',
    description: 'Deep dive into CWV, indexing, and crawl budget.',
    icon: UserCog,
    prompt: "You are a Technical SEO Auditor. Focus on site speed, indexing issues, canonicalization, and technical debt."
  },
  {
    id: 'content-writer',
    name: 'Content Optimizer',
    description: 'Refining copy for both humans and semantic search.',
    icon: Sparkles,
    prompt: "You are a Content Specialist. Focus on search intent, semantic keywords, and improving on-page conversion."
  },
  {
    id: 'competitor-analyst',
    name: 'Rival Scout',
    description: 'Identifying gaps in your competitors strategies.',
    icon: Ghost,
    prompt: "You are a Competitive Analyst. Compare user data against market benchmarks to find opportunity gaps."
  },
];
export default function AiPersonasPage() {
  const stagedData = useDataStore(s => s.stagedData);
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initPersona = async () => {
      chatService.newSession();
      const contextSummary = stagedData.length > 0
        ? `Note: I have ${stagedData.length} records of SEO data loaded for your analysis.`
        : "";
      setMessages([
        { role: 'assistant', content: `Hello! I'm your ${activePersona.name}. ${contextSummary} How can I help you today?`, id: 'init' }
      ]);
      try {
        await fetch(`/api/chat/${chatService.getSessionId()}/system-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: `${activePersona.prompt}\n\nContext Data: ${JSON.stringify(stagedData.slice(0, 10))}` })
        });
      } catch (err) {
        console.error("Failed to set persona context", err);
      }
    };
    initPersona();
  }, [activePersona, stagedData]);
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: 'user', content: input, id: crypto.randomUUID() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    let streamContent = '';
    const tempId = crypto.randomUUID();
    setMessages(prev => [...prev, { role: 'assistant', content: '', id: tempId }]);
    try {
      await chatService.sendMessage(input, undefined, (chunk) => {
        streamContent += chunk;
        setMessages(prev => prev.map(m => m.id === tempId ? { ...m, content: streamContent } : m));
      });
    } catch (err) {
      toast.error("Failed to get response from AI");
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-lg font-semibold px-1">Select Persona</h2>
        <div className="space-y-2">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePersona(p)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 group",
                activePersona.id === p.id
                  ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  activePersona.id === p.id ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                )}>
                  <p.icon className="h-5 w-5" />
                </div>
                <span className={cn("font-semibold", activePersona.id === p.id ? "text-primary" : "text-slate-200")}>
                  {p.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
            </button>
          ))}
        </div>
      </div>
      <Card className="lg:col-span-3 flex flex-col border-slate-800 bg-slate-900/30 overflow-hidden shadow-2xl">
        <CardHeader className="border-b border-slate-800 py-4 px-6 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <activePersona.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-md font-bold">{activePersona.name}</CardTitle>
              <CardDescription className="text-xs text-primary/80">Active Analysis Session</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 relative flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed",
                    m.role === 'user'
                      ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                      : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700 whitespace-pre-wrap"
                  )}>
                    {m.content || (m.role === 'assistant' && <Loader2 className="h-4 w-4 animate-spin" />)}
                  </div>
                </div>
              ))}
              <div ref={scrollAnchorRef} className="h-1" />
            </div>
          </ScrollArea>
          <div className="p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <Input
                placeholder={`Message ${activePersona.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping}
                className="pr-12 bg-slate-800 border-slate-700 focus-visible:ring-primary h-12 text-md"
              />
              <Button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:scale-105 transition-transform"
              >
                {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}