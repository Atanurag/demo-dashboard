
import React, { useState } from 'react';

import LeftPanel from './components/LeftPanel';
import TopHeader from './components/layout/TopHeader';

import OrgDashboard from './components/Dashboard';

import './styles.css';

export default function App() {
  const [mode, setMode] = useState('light');

  const [activePage, setActivePage] = useState('Org Dashboard');

  const handleThemeToggle = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Org Dashboard':
        return <OrgDashboard />;

      // Add other pages here as we develop them.

      default:
        return <OrgDashboard />;
    }
  };

  return (
    <div className={`app-shell ${mode}`}>

      <LeftPanel
        mode={mode}
        activeItem={activePage}
        onSelect={setActivePage}
        onToggleTheme={handleThemeToggle}
      />

      <div className="main-layout">

        <TopHeader
          pageTitle={activePage}
          mode={mode}
          userName="Narayan Murthi"
          userRole="Admin"
          onSearch={(value) => console.log('Global search:', value)}
          onProfile={() => console.log('Profile clicked')}
          onSettings={() => console.log('Settings clicked')}
          onLogout={() => console.log('Logout clicked')}
        />

        <main className="page-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}
