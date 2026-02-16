import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Trophy, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
const radarData = [
  { subject: 'Traffic', A: 120, B: 110, fullMark: 150 },
  { subject: 'Backlinks', A: 98, B: 130, fullMark: 150 },
  { subject: 'Content', A: 86, B: 130, fullMark: 150 },
  { subject: 'Speed', A: 99, B: 100, fullMark: 150 },
  { subject: 'Keywords', A: 85, B: 90, fullMark: 150 },
];
const barData = [
  { name: 'Your Domain', da: 72, keywords: 4500, traffic: 142000 },
  { name: 'Rival A', da: 84, keywords: 6200, traffic: 210000 },
  { name: 'Rival B', da: 65, keywords: 3100, traffic: 89000 },
];
export default function CompetitiveAnalysisPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-up duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Market Position</p>
              <h3 className="text-xl font-bold">Top 5%</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Competitor Gaps</p>
              <h3 className="text-xl font-bold">128 Keywords</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Link Authority</p>
              <h3 className="text-xl font-bold">Strong</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-lg">Competitor Strength Overlap</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Your Domain"
                  dataKey="A"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Top Competitor"
                  dataKey="B"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-lg">Metric Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="da" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Domain Authority" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-slate-800 bg-slate-900/30">
        <CardHeader>
          <CardTitle className="text-lg">Keyword Opportunity Gaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { kw: 'seo analytics tool', user: 14, rival: 2, vol: '12k', diff: 'Med' },
              { kw: 'ai marketing persona', user: 32, rival: 5, vol: '4.5k', diff: 'Low' },
              { kw: 'cloud seo strategy', user: 8, rival: 1, vol: '22k', diff: 'High' },
            ].map((gap, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20">#{i+1}</Badge>
                  <div>
                    <p className="font-semibold text-slate-200">{gap.kw}</p>
                    <p className="text-xs text-muted-foreground">Volume: {gap.vol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Rival Rank</p>
                    <p className="text-amber-500 font-bold">#{gap.rival}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Your Rank</p>
                    <p className="text-slate-400 font-bold">#{gap.user}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}