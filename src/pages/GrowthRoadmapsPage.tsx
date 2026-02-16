import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Zap, Target, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';
const steps = [
  {
    phase: 'Phase 1: Technical Foundation',
    title: 'Crawlability & Core Web Vitals',
    description: 'Fixing critical LCP issues on product pages and resolving 404 indexing errors detected in the latest crawl.',
    status: 'Completed',
    priority: 'Critical',
    icon: Zap,
    color: 'emerald'
  },
  {
    phase: 'Phase 2: Content Expansion',
    title: 'Topical Cluster Development',
    description: 'Launching 12 high-intent pillar pages targeting low-difficulty keyword clusters identified by AI analysis.',
    status: 'In Progress',
    priority: 'High',
    icon: BookOpen,
    color: 'primary'
  },
  {
    phase: 'Phase 3: Authority Building',
    title: 'Digital PR & Quality Backlinks',
    description: 'Strategic outreach to industry publications to close the 40% backlink gap found during competitor benchmarking.',
    status: 'Scheduled',
    priority: 'Medium',
    icon: Target,
    color: 'amber'
  },
  {
    phase: 'Phase 4: Global Optimization',
    title: 'International SEO Deployment',
    description: 'Implementing hreflang tags and localized content subdirectories for expansion into European markets.',
    status: 'Scheduled',
    priority: 'Strategic',
    icon: Search,
    color: 'slate'
  }
];
export default function GrowthRoadmapsPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Strategy Roadmap</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          AI-generated growth trajectory based on your uploaded data context and market competitive intelligence.
        </p>
      </div>
      <div className="relative space-y-0">
        {/* Timeline Line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-slate-800" />
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-8 pb-12 last:pb-0"
          >
            <div className={cn(
              "z-10 h-12 w-12 rounded-full flex items-center justify-center border-4 border-background shadow-lg shrink-0",
              step.status === 'Completed' ? "bg-emerald-500 text-emerald-950" : 
              step.status === 'In Progress' ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-400"
            )}>
              {step.status === 'Completed' ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
            </div>
            <Card className="flex-1 border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{step.phase}</span>
                    <h3 className="text-xl font-bold text-slate-100 mt-1">{step.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-700">{step.priority}</Badge>
                    <Badge className={cn(
                      step.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" :
                      step.status === 'In Progress' ? "bg-primary/10 text-primary" : "bg-slate-800 text-slate-400"
                    )}>
                      {step.status === 'In Progress' && <Clock className="h-3 w-3 mr-1 animate-pulse" />}
                      {step.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}