import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useDataStore } from '@/lib/data-store';
import { cn } from "@/lib/utils";
export default function AdvancedAnalyticsPage() {
  const stagedData = useDataStore(s => s.stagedData);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = stagedData.filter(row => {
    const val = row.Keyword || row.keyword || "";
    return val.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const displayData = filteredData.length > 0 ? filteredData : [
    { Keyword: 'seo dashboard', Clicks: 1200, Position: 4.2, Volume: '15k', Difficulty: 45 },
    { Keyword: 'marketing metrics', Clicks: 850, Position: 6.8, Volume: '8.2k', Difficulty: 32 },
    { Keyword: 'ai agent analytics', Clicks: 450, Position: 2.1, Volume: '2.1k', Difficulty: 58 },
    { Keyword: 'seo performance hub', Clicks: 210, Position: 1.5, Volume: '1.2k', Difficulty: 12 },
    { Keyword: 'competitor insights', Clicks: 180, Position: 12.4, Volume: '45k', Difficulty: 72 },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search keywords..." 
            className="pl-10 bg-slate-900/50 border-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-slate-800">
            <Filter className="h-3 w-3 mr-2" />
            Filters
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-slate-800">
            <Download className="h-3 w-3 mr-2" />
            Export CSV
          </Badge>
        </div>
      </div>
      <Card className="border-slate-800 bg-slate-900/30 overflow-hidden">
        <TableHeader className="bg-slate-800/40">
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-slate-300 font-bold">Keyword</TableHead>
            <TableHead className="text-slate-300 font-bold">
              <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                Volume <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-slate-300 font-bold">Position</TableHead>
            <TableHead className="text-slate-300 font-bold text-right">Traffic</TableHead>
            <TableHead className="text-slate-300 font-bold">Difficulty</TableHead>
            <TableHead className="text-slate-300 font-bold">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row, i) => {
            const pos = Number(row.Position || row.position || 0);
            const diff = Number(row.Difficulty || 40);
            return (
              <TableRow key={i} className="border-slate-800/50 hover:bg-slate-800/30 group">
                <TableCell className="font-medium text-slate-200">{row.Keyword || row.keyword}</TableCell>
                <TableCell className="text-slate-400">{row.Volume || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={pos < 5 ? 'default' : 'secondary'} className={cn(pos < 5 && "bg-emerald-500/20 text-emerald-500 border-none")}>
                    #{pos.toFixed(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-primary">{row.Clicks || 0}</TableCell>
                <TableCell>
                  <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        diff > 60 ? "bg-rose-500" : diff > 30 ? "bg-amber-500" : "bg-emerald-500"
                      )} 
                      style={{ width: `${diff}%` }} 
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {i % 2 === 0 ? (
                    <div className="flex items-center text-emerald-500 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" /> +2.4%
                    </div>
                  ) : (
                    <div className="flex items-center text-rose-500 text-xs">
                      <TrendingDown className="h-3 w-3 mr-1" /> -0.8%
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Card>
    </div>
  );
}