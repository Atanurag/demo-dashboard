
import React, { useState } from 'react';

import LeftPanel from './components/LeftPanel';
import TopHeader from './components/layout/TopHeader';

import OrgDashboard from './components/Dashboard';
import StationDashboard from './components/StationDashboard/StationDashboard';

import SearchablePage from './components/layout/SearchablePage';

import './styles.css';

export default function App() {
  const [mode, setMode] = useState('light');

  const [activePage, setActivePage] = useState('Org Dashboard');

  // Common search state for all pages.
  const [searchQuery, setSearchQuery] = useState('');

  const handleThemeToggle = () => {
    setMode(prev =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  const handlePageSelect = (page) => {
    setActivePage(page);

    // Clear search when navigating to another page.
    setSearchQuery('');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Org Dashboard':
        return <OrgDashboard isDark={mode === 'dark'} />;

      case 'Station Dashboard':
        return (
          <StationDashboard
            isDark={mode === 'dark'}
          />
        );

      // Add future pages here.
      // case 'Weighbridge':
      //   return <WeighbridgeDashboard />;

      // case 'Reports':
      //   return <ReportsDashboard />;

      default:
        return <OrgDashboard isDark={mode === 'dark'} />;
    }
  };

  return (
    <div className={`app-shell ${mode}`}>

      <LeftPanel
        mode={mode}
        activeItem={activePage}
        onSelect={handlePageSelect}
        onToggleTheme={handleThemeToggle}
      />

      <div className="main-layout">

        {/* COMMON HEADER */}
        <TopHeader
          pageTitle={activePage}
          mode={mode}
          userName="Narayan Murthi"
          userRole="Admin"

          // Search currently active page.
          onSearch={setSearchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchValue(value);
            onSearch?.(value);
          }}
          onPressEnter={() => handleSearch(searchValue)}
          onProfile={() => console.log('Profile clicked')}
          onSettings={() => console.log('Settings clicked')}
          onLogout={() => console.log('Logout clicked')}
        />

        {/* CURRENT PAGE */}
        <main className="page-content">

          <SearchablePage
            key={activePage}
            query={searchQuery}
          >
            {renderPage()}
          </SearchablePage>

        </main>

      </div>

    </div>
  );
}
