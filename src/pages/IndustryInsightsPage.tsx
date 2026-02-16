import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useDataStore, getAggregatedMetrics } from '@/lib/data-store';
import { Globe, TrendingUp, Users, Building } from 'lucide-react';
const industryData = [
  { segment: 'SaaS', avgDA: 65, avgCTR: 3.2, growth: '+12%', difficulty: 'High' },
  { segment: 'E-commerce', avgDA: 58, avgCTR: 2.1, growth: '+24%', difficulty: 'Very High' },
  { segment: 'Fintech', avgDA: 72, avgCTR: 1.8, growth: '+8%', difficulty: 'Medium' },
  { segment: 'Agency', avgDA: 45, avgCTR: 4.5, growth: '+15%', difficulty: 'Low' },
];
export default function IndustryInsightsPage() {
  const stagedData = useDataStore(s => s.stagedData);
  const metrics = useMemo(() => getAggregatedMetrics(stagedData), [stagedData]);
  const ctrComparisonData = [
    { name: 'Average', industry: 2.8, yours: metrics?.totalClicks ? (metrics.totalClicks / (metrics.totalImpressions || 1)) * 100 : 2.2 },
    { name: 'Top 10%', industry: 5.4, yours: metrics ? (metrics.averagePosition < 10 ? 4.1 : 1.2) : 0 },
  ];
  const radarData = [
    { subject: 'Authority', A: 72, B: 65, fullMark: 100 },
    { subject: 'Traffic', A: 85, B: 60, fullMark: 100 },
    { subject: 'Indexing', A: 99, B: 85, fullMark: 100 },
    { subject: 'Social', A: 45, B: 70, fullMark: 100 },
    { subject: 'Conversion', A: 62, B: 55, fullMark: 100 },
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Global Rank</p>
              <h3 className="text-xl font-bold">Top 12%</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Industry CTR</p>
              <h3 className="text-xl font-bold">2.8% avg.</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Market Reach</p>
              <h3 className="text-xl font-bold">2.4M Pot.</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Building className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Niche Score</p>
              <h3 className="text-xl font-bold">84/100</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-lg">CTR Benchmarks: You vs Industry</CardTitle>
            <CardDescription>Average Click-Through-Rate comparison by ranking segment.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ctrComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} 
                />
                <Legend iconType="circle" />
                <Bar dataKey="industry" fill="#64748b" name="Industry Avg" radius={[4, 4, 0, 0]} />
                <Bar dataKey="yours" fill="#06b6d4" name="Your Domain" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-lg">Authority Profile Analysis</CardTitle>
            <CardDescription>Structural health against market leaders.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="You" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                <Radar name="Market" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-slate-800 bg-slate-900/30 overflow-hidden">
        <CardHeader className="bg-slate-800/20">
          <CardTitle className="text-lg">Segment Maturity Matrix</CardTitle>
          <CardDescription>Industry-wide averages for competitive analysis.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-800/40">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-300">Industry Segment</TableHead>
              <TableHead className="text-slate-300">Avg. DA</TableHead>
              <TableHead className="text-slate-300">CTR Benchmark</TableHead>
              <TableHead className="text-slate-300">Annual Growth</TableHead>
              <TableHead className="text-slate-300">SEO Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industryData.map((row) => (
              <TableRow key={row.segment} className="border-slate-800/50 hover:bg-slate-800/20">
                <TableCell className="font-semibold text-slate-200">{row.segment}</TableCell>
                <TableCell className="text-slate-400 font-mono">{row.avgDA}</TableCell>
                <TableCell className="text-primary font-bold">{row.avgCTR}%</TableCell>
                <TableCell className="text-emerald-500">{row.growth}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    row.difficulty === 'Very High' ? "border-rose-500/50 text-rose-500" :
                    row.difficulty === 'High' ? "border-amber-500/50 text-amber-500" : "border-emerald-500/50 text-emerald-500"
                  }>
                    {row.difficulty}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}