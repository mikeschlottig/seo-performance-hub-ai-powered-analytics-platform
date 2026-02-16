import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ExternalLink, 
  ArrowUpRight, 
  Plus, 
  Globe, 
  Database, 
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import { useDataStore } from '@/lib/data-store';
import { cn } from '@/lib/utils';
const mockDomains = [
  { id: '1', domain: 'acme-corp.com', score: 84, pages: 1250, links: '4.2k', status: 'Active' },
  { id: '2', domain: 'techstream.io', score: 62, pages: 450, links: '890', status: 'Paused' },
  { id: '3', domain: 'global-logistics.net', score: 91, pages: 8400, links: '22k', status: 'Active' },
];
export default function CompanyProfilesPage() {
  const stagedData = useDataStore(s => s.stagedData);
  // Use uploaded data as a dynamic profile if available
  const activeProfile = stagedData.length > 0 ? {
    id: 'current',
    domain: 'active-import.data',
    score: 72,
    pages: stagedData.length,
    links: 'Imported',
    status: 'Analyzing'
  } : null;
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Managed Domains</h2>
          <p className="text-muted-foreground mt-1">Monitor and manage SEO performance across your portfolio.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Domain
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeProfile && (
          <Card className="border-primary/50 bg-primary/5 relative overflow-hidden shadow-primary/20 shadow-lg">
            <div className="absolute top-0 right-0 p-2">
              <Badge className="bg-primary text-primary-foreground">Active Focus</Badge>
            </div>
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl flex items-center gap-2">
                {activeProfile.domain}
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-muted-foreground">SEO Health Score</p>
                  <h4 className="text-3xl font-bold text-primary">{activeProfile.score}%</h4>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">Live Data</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Keywords</p>
                  <p className="text-lg font-semibold text-slate-200">{activeProfile.pages}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-emerald-500">{activeProfile.status}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-slate-900 border border-primary/20 hover:bg-slate-800">
                Open Strategy Hub
              </Button>
            </CardFooter>
          </Card>
        )}
        {mockDomains.map((item) => (
          <Card key={item.id} className="border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-all hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <CardTitle className="text-lg text-slate-100">{item.domain}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">SSL Secure & Verified</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-y border-slate-800">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Score</p>
                  <p className={cn("text-xl font-bold", item.score > 80 ? "text-emerald-500" : "text-amber-500")}>
                    {item.score}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Indexed</p>
                  <p className="text-xl font-bold text-slate-200">{item.pages}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Backlinks</p>
                  <p className="text-xl font-bold text-slate-200">{item.links}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" className="flex-1 border-slate-800 hover:bg-slate-800">Settings</Button>
              <Button variant="secondary" className="flex-1">Dashboard</Button>
            </CardFooter>
          </Card>
        ))}
        <button className="border-2 border-dashed border-slate-800 bg-slate-900/10 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-900/20 hover:border-slate-600 transition-all text-slate-500 group">
          <div className="h-12 w-12 rounded-full border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-semibold">Track New Domain</span>
        </button>
      </div>
    </div>
  );
}