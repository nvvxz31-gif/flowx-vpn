import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminUsers from '../components/admin/AdminUsers';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminNodes from '../components/admin/AdminNodes';
import AdminPlans from '../components/admin/AdminPlans';
import AdminPartners from '../components/admin/AdminPartners';
import AdminBackups from '../components/admin/AdminBackups';
import AdminAuditLog from '../components/admin/AdminAuditLog';
import AdminSettings from '../components/admin/AdminSettings';
import AdminLogin from '../components/admin/AdminLogin';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const sections = {
    dashboard: <AdminDashboard />,
    users: <AdminUsers />,
    analytics: <AdminAnalytics />,
    plans: <AdminPlans />,
    nodes: <AdminNodes />,
    partners: <AdminPartners />,
    backups: <AdminBackups />,
    audit: <AdminAuditLog />,
    settings: <AdminSettings />,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0D0D0F' }}>
      <AdminSidebar active={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {sections[activeSection] || <AdminDashboard />}
      </main>
    </div>
  );
}