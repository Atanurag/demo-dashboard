import React, { useMemo, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import LeftPanel from './components/LeftPanel.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  const [mode, setMode] = useState('dark');
  const [activeItem, setActiveItem] = useState('Weighbridge');
  const isDark = mode === 'dark';

  const themeConfig = useMemo(() => ({
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#07965b',
      borderRadius: 10,
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }
  }), [isDark]);

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'}`}>
        <LeftPanel onLogout={()=>{}} />
        <main className="main-screen">
          <Dashboard activeItem={activeItem} isDark={isDark} />
        </main>
      </div>
    </ConfigProvider>
  );
}
