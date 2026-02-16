import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, User, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
const pageTitles: Record<string, string> = {
  "/": "Dashboard Overview",
  "/import": "Import SEO Data",
  "/personas": "AI SEO Personas",
  "/companies": "Company Profiles",
  "/roadmaps": "Growth Roadmaps",
  "/competitors": "Competitive Analysis",
  "/industries": "Industry Insights",
  "/analytics": "Advanced Analytics",
  "/knowledge": "Knowledge Bases",
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "SEO Performance Hub";
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/50 bg-background/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                {currentTitle}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex items-center gap-3 pl-2">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium text-foreground">Marketing Lead</span>
                  <span className="text-xs text-muted-foreground">Pro Account</span>
                </div>
                <div className="h-10 w-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <User className="h-6 w-6 text-slate-400" />
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className={`max-w-7xl mx-auto px-6 py-8 md:py-10 ${className || ""}`}>
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}