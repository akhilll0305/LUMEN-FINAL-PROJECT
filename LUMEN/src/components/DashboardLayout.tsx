import { ReactNode } from 'react';
import Navigation from './Navigation';
import AIChatAssistant from './AIChatAssistant';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 pt-24">
        {children}
      </main>
      <AIChatAssistant />
    </div>
  );
}
