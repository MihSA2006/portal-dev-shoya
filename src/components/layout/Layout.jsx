import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const KEY = 'shoya-sidebar-collapsed';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, collapsed ? '1' : '0'); } catch { /* ignore */ }
  }, [collapsed]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 min-h-0">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />

        <main className="flex-1 min-w-0 p-3 md:p-5 md:pl-2">
          <div className="cut-frame [--frame-bg:var(--bg-elevated)] min-h-[calc(100vh-4rem-1.5rem)] md:min-h-[calc(100vh-4rem-2.5rem)]">
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
