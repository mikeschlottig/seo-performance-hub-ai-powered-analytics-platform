import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Users, Send, Sparkles, BrainCircuit, UserCog, Ghost } from 'lucide-react';
import { cn } from '@/lib/utils';
const PERSONAS = [
  { id: 'strategist', name: 'SEO Strategist', description: 'Expert in long-term growth and keyword mapping.', icon: BrainCircuit },
  { id: 'tech-auditor', name: 'Technical Auditor', description: 'Deep dive into CWV, indexing, and crawl budget.', icon: UserCog },
  { id: 'content-writer', name: 'Content Optimizer', description: 'Refining copy for both humans and semantic search.', icon: Sparkles },
  { id: 'competitor-analyst', name: 'Rival Scout', description: 'Identifying gaps in your competitors strategies.', icon: Ghost },
];
export default function AiPersonasPage() {
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I'm your ${activePersona.name}. How can I help you optimize your SEO data today?` }
  ]);
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question about your SEO performance. Based on the patterns I see, focusing on middle-funnel keyword intent could yield a 20% lift in conversions within 3 months." }]);
    }, 1000);
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
          <ScrollArea className="flex-1 p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex mb-6", m.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm",
                  m.role === 'user' 
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none" 
                    : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <Input 
                placeholder={`Message ${activePersona.name}...`} 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="pr-12 bg-slate-800 border-slate-700 focus-visible:ring-primary h-12 text-md"
              />
              <Button 
                onClick={handleSend}
                size="icon" 
                className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:scale-105 transition-transform"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}