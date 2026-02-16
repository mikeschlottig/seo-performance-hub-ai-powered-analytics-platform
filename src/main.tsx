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
      { path: "/companies", element: <div className="p-12 text-center text-muted-foreground">Company Profiles coming soon...</div> },
      { path: "/roadmaps", element: <div className="p-12 text-center text-muted-foreground">Growth Roadmaps coming soon...</div> },
      { path: "/competitors", element: <div className="p-12 text-center text-muted-foreground">Competitive Analysis coming soon...</div> },
      { path: "/industries", element: <div className="p-12 text-center text-muted-foreground">Industry Insights coming soon...</div> },
      { path: "/analytics", element: <div className="p-12 text-center text-muted-foreground">Advanced Analytics coming soon...</div> },
      { path: "/knowledge", element: <div className="p-12 text-center text-muted-foreground">Knowledge Bases coming soon...</div> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)