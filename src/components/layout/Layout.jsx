import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const KEY = 'shoya-sidebar-collapsed';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(KEY) === '0'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, collapsed ? '0' : '1'); } catch { /* ignore */ }
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

        <main className="flex min-w-0 flex-1 flex-col p-4 md:p-4 md:pl-2">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="animate-enter flex min-h-0 flex-1 flex-col p-0 md:p-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
