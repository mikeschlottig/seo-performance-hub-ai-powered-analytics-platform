import React from "react";
import { 
  LayoutDashboard, 
  Building2, 
  UploadCloud, 
  Map, 
  Trophy, 
  Briefcase, 
  BarChart2, 
  Database, 
  Users,
  Settings,
  Search
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
} from "@/components/ui/sidebar";
const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Company Profiles", icon: Building2, href: "/companies" },
  { title: "Import Data", icon: UploadCloud, href: "/import" },
  { title: "Roadmaps", icon: Map, href: "/roadmaps" },
  { title: "Top Competitors", icon: Trophy, href: "/competitors" },
  { title: "Industries", icon: Briefcase, href: "/industries" },
  { title: "Advanced Analytics", icon: BarChart2, href: "/analytics" },
  { title: "Knowledge Bases", icon: Database, href: "/knowledge" },
  { title: "AI Personas", icon: Array.isArray(Users) ? Users : Users, href: "/personas" },
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar className="border-r border-slate-800/50">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <BarChart2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">SEO Hub</span>
        </div>
        <div className="relative group px-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <SidebarInput placeholder="Quick search..." className="pl-9 bg-slate-900/50 border-slate-800" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="px-2 space-y-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.href}
                  className={cn(
                    "transition-all duration-200 hover:bg-slate-800/50",
                    location.pathname === item.href ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground"
                  )}
                >
                  <Link to={item.href}>
                    <item.icon className={cn("h-4 w-4", location.pathname === item.href && "text-primary")} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-slate-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 px-2 py-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Note: Request limits apply to AI servers. Please use responsibly.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}