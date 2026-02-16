import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, MousePointer2, Eye, BarChart as ChartIcon, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { trafficData, dashboardMetrics } from '@/lib/mockData';
export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
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
                <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
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
              <CardTitle className="text-xl">Organic Traffic Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Historical performance over the last 30 days</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Organic Clicks
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
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
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => val.split('-').slice(1).join('/')}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorClicks)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}