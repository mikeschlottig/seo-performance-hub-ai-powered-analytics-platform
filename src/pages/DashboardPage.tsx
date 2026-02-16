import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, MousePointer2, Eye, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { trafficData as mockTrafficData, dashboardMetrics as mockMetrics } from '@/lib/mockData';
import { useDataStore } from '@/lib/data-store';
export default function DashboardPage() {
  const stagedData = useDataStore(s => s.stagedData);
  const calculatedMetrics = useMemo(() => {
    if (!stagedData || stagedData.length === 0) return mockMetrics;
    let totalClicks = 0;
    let totalImpressions = 0;
    let avgPos = 0;
    let count = 0;
    stagedData.forEach(row => {
      const clicks = Number(row.Clicks || row.clicks || 0);
      const impressions = Number(row.Impressions || row.impressions || 0);
      const pos = Number(row.Position || row.position || row.avg_pos || 0);
      if (!isNaN(clicks)) totalClicks += clicks;
      if (!isNaN(impressions)) totalImpressions += impressions;
      if (!isNaN(pos) && pos > 0) {
        avgPos += pos;
        count++;
      }
    });
    const formatNum = (num: number) => num >= 1000000 ? `${(num / 1000000).toFixed(1)}M` : num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    return [
      { label: 'Total Clicks', value: formatNum(totalClicks), change: '+Imported' },
      { label: 'Impressions', value: formatNum(totalImpressions), change: '+Imported' },
      { label: 'Avg. Position', value: count > 0 ? (avgPos / count).toFixed(1) : '0', change: 'Live' },
      { label: 'Domain Rating', value: '72', change: '+2' },
    ];
  }, [stagedData]);
  const activeChartData = useMemo(() => {
    // Attempt to build chart from imported data if it has date-like structure
    const hasDate = stagedData.length > 0 && stagedData.some(d => d.Date || d.date);
    if (hasDate) {
      // Group by date and sort
      const grouped = stagedData.reduce((acc, curr) => {
        const d = curr.Date || curr.date;
        if (!acc[d]) acc[d] = { date: d, clicks: 0, impressions: 0 };
        acc[d].clicks += Number(curr.Clicks || curr.clicks || 0);
        acc[d].impressions += Number(curr.Impressions || curr.impressions || 0);
        return acc;
      }, {} as Record<string, any>);
      return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return mockTrafficData;
  }, [stagedData]);
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculatedMetrics.map((metric) => (
          <Card key={metric.label} className="border-slate-800 bg-slate-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                <div className="p-2 rounded-md bg-slate-800">
                  {metric.label === 'Total Clicks' && <MousePointer2 className="h-4 w-4 text-primary" />}
                  {metric.label === 'Impressions' && <Eye className="h-4 w-4 text-primary" />}
                  {metric.label === 'Avg. Position' && <TrendingUp className="h-4 w-4 text-primary" />}
                  {metric.label === 'Domain Rating' && <Zap className="h-4 w-4 text-primary" />}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                <span className={`text-xs font-medium ${metric.change.includes('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl text-foreground">Traffic Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                {stagedData.length > 0 ? "Visualizing your imported dataset metrics" : "Visualization of historical performance benchmarks"}
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => {
                    if (typeof val !== 'string') return '';
                    return val.includes('-') ? val.split('-').slice(1).join('/') : val;
                  }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#06b6d4' }}
                  cursor={{ stroke: '#06b6d4', strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Note: Request limits apply to AI servers. Data processed locally before synthesis.
        </p>
      </div>
    </div>
  );
}