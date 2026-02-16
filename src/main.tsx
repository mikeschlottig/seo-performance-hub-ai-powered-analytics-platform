import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import DashboardPage from '@/pages/DashboardPage';
import ImportDataPage from '@/pages/ImportDataPage';
import AiPersonasPage from '@/pages/AiPersonasPage';
import CompetitiveAnalysisPage from '@/pages/CompetitiveAnalysisPage';
import AdvancedAnalyticsPage from '@/pages/AdvancedAnalyticsPage';
import GrowthRoadmapsPage from '@/pages/GrowthRoadmapsPage';
import IndustryInsightsPage from '@/pages/IndustryInsightsPage';
import KnowledgeBasePage from '@/pages/KnowledgeBasePage';
import CompanyProfilesPage from '@/pages/CompanyProfilesPage';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/import", element: <ImportDataPage /> },
      { path: "/personas", element: <AiPersonasPage /> },
      { path: "/competitors", element: <CompetitiveAnalysisPage /> },
      { path: "/analytics", element: <AdvancedAnalyticsPage /> },
      { path: "/roadmaps", element: <GrowthRoadmapsPage /> },
      { path: "/companies", element: <CompanyProfilesPage /> },
      { path: "/industries", element: <IndustryInsightsPage /> },
      { path: "/knowledge", element: <KnowledgeBasePage /> },
    ]
  },
]);
const container = document.getElementById('root');
if (container && !container.innerHTML) {
  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>,
  );
}