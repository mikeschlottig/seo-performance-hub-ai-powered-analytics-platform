import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from '@/components/ui/sonner';
export function LayoutWrapper() {
  return (
    <AppLayout>
      <Outlet />
      <Toaster richColors position="top-right" />
    </AppLayout>
  );
}