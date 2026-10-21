import React, { useMemo, useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  BuildOutlined,
  CarOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FireOutlined,
  FundOutlined,
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Badge, Button, ConfigProvider, Input, Tooltip, theme as antdTheme } from 'antd';
import './App.css';

const groups = [
  {
    label: 'OPERATIONS',
    items: [
      { key: 'stations', label: 'Stations', icon: <BuildOutlined />, children: ['Station Report', 'Transaction Report', 'Missed Transaction Report', 'Transaction Approval Report', 'Downtime Storage Report', 'Filler Sales Report', 'Sales Comparison Report', 'RSP Change Report', 'Automation Sales Report', 'Density Report'] },
      { key: 'live', label: 'Live Monitoring', icon: <ClockCircleOutlined />, children: ['Live Station Status', 'Live Device Status', 'Active Alerts'] },
      { key: 'devices', label: 'Devices & Dispensers', icon: <ThunderboltOutlined />, children: ['Device List', 'Dispenser Units', 'Device Health', 'Communication Logs'] },
      { key: 'storage', label: 'Tank Storage', icon: <DatabaseOutlined />, children: ['Storage Overview', 'Tank Level Report', 'Delivery Report'] },
      { key: 'relay', label: 'Relay & Valve Control', icon: <ToolOutlined />, children: ['Relay Control', 'Valve Control', 'Control History'] },
      { key: 'generators', label: 'Diesel Generators', icon: <FireOutlined />, children: ['Generator Overview', 'Generator Report'] },
      { key: 'bottling', label: 'Bottling Plants', icon: <AppstoreOutlined />, children: ['Plant Overview', 'Production Report'] },
      { key: 'weighbridge', label: 'Weighbridge', icon: <CarOutlined />, children: ['Weighing Report', 'Vehicle History', 'Weight Variance'] },
      { key: 'water', label: 'Water Meters', icon: <GlobalOutlined />, children: ['Meter Overview', 'Consumption Report', 'Meter Readings'] },
      { key: 'customers', label: 'Customers', icon: <TeamOutlined />, children: ['Customer List', 'Customer Activity'] },
    ],
  },
  {
    label: 'INSIGHTS',
    items: [
      { key: 'analytics', label: 'Analytics & Reports', icon: <FundOutlined />, children: ['Org Dashboard', 'Sales Analytics', 'Operational Reports'] },
      { key: 'alerts', label: 'Alerts & Events', icon: <WarningOutlined />, children: ['All Alerts', 'Alert Rules', 'Event History'] },
    ],
  },
];

function highlight(text, query) {
  const value = query.trim();
  if (!value) return text;
  const index = text.toLowerCase().indexOf(value.toLowerCase());
  if (index < 0) return text;
  return <>{text.slice(0, index)}<mark>{text.slice(index, index + value.length)}</mark>{text.slice(index + value.length)}</>;
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [expanded, setExpanded] = useState('stations');
  const [sectionSearch, setSectionSearch] = useState({});
  const [active, setActive] = useState('overview');
  const [activeChild, setActiveChild] = useState('');

  const allItems = useMemo(() => groups.flatMap(group => group.items), []);
  const globalQuery = globalSearch.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    if (!globalQuery) return groups;
    return groups.map(group => ({
      ...group,
      items: group.items.map(item => {
        const parentMatches = item.label.toLowerCase().includes(globalQuery);
        const matchingChildren = item.children.filter(child => child.toLowerCase().includes(globalQuery));
        return { ...item, children: parentMatches ? item.children : matchingChildren, forcedOpen: parentMatches || matchingChildren.length > 0 };
      }).filter(item => item.label.toLowerCase().includes(globalQuery) || item.children.length > 0),
    })).filter(group => group.items.length > 0);
  }, [globalQuery]);

  const currentTitle = activeChild || allItems.find(item => item.key === active)?.label || 'Overview';

  const toggleGroup = item => {
    setExpanded(current => current === item.key ? '' : item.key);
    setActive(item.key);
    setActiveChild('');
  };

  const selectChild = (parent, child) => {
    setActive(parent.key);
    setActiveChild(child);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#079653',
          borderRadius: 9,
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <div className={`app-shell ${darkMode ? 'theme-dark' : 'theme-light'}`}>
        <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
          <div className="brand">
            <div className="brand-mark" aria-label="GoGas">
              <img
                className="brand-logo"
                src="https://iotronapp.s3.amazonaws.com/cpilcng.jpeg"
                alt="GoGas"
              />
            </div>
            {/* <Button
              className="collapse-button"
              type="text"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            /> */}
          </div>

          {!collapsed && (
            <div className="global-search">
              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search menu, reports, pages..."
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
              />
            </div>
          )}

          <div className="nav-scroll">
            {/* <button
              className={`nav-item overview-item ${active === 'overview' ? 'is-active' : ''}`}
              onClick={() => { setActive('overview'); setActiveChild(''); setExpanded(''); }}
              title="Overview"
            >
              <span className="nav-icon"><HomeOutlined /></span>
              {!collapsed && <span className="nav-label">Overview</span>}
            </button> */}

            {visibleGroups.map(group => (
              <div className="nav-group" key={group.label}>
                {!collapsed && <div className="group-label">{group.label}</div>}
                {group.items.map(item => {
                  const isOpen = globalQuery ? item.forcedOpen : expanded === item.key;
                  const childQuery = sectionSearch[item.key] || '';
                  const children = item.children.filter(child => child.toLowerCase().includes(childQuery.trim().toLowerCase()));
                  return (
                    <div className="nav-section" key={item.key}>
                      <button
                        className={`nav-item ${active === item.key ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
                        onClick={() => toggleGroup(item)}
                        title={item.label}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        {!collapsed && <>
                          <span className="nav-label">{item.label}</span>
                          <span className={`chevron ${isOpen ? 'chevron--open' : ''}`}>›</span>
                        </>}
                      </button>
                      {!collapsed && isOpen && (
                        <div className="submenu">
                          <Input
                            size="middle"
                            className="submenu-search"
                            prefix={<SearchOutlined />}
                            allowClear
                            placeholder={`Search ${item.label.toLowerCase()}...`}
                            value={childQuery}
                            onChange={e => setSectionSearch(prev => ({ ...prev, [item.key]: e.target.value }))}
                          />
                          <div className="submenu-list">
                            {children.map(child => (
                              <button
                                key={child}
                                className={`submenu-item ${activeChild === child ? 'submenu-item--active' : ''}`}
                                onClick={() => selectChild(item, child)}
                                title={child}
                              >
                                <FileTextOutlined className="submenu-icon" />
                                <span>{highlight(child, childQuery || globalSearch)}</span>
                              </button>
                            ))}
                            {children.length === 0 && <div className="empty-result">No matching pages</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <Tooltip title="Logout" placement="right">
              <button className="footer-link" onClick={() => { setActive('logout'); setActiveChild(''); }}>
                <LogoutOutlined />
                {!collapsed && <span>Logout</span>}
              </button>
            </Tooltip>
          </div>
        </aside>

        <main className="main-area">
          <header className="topbar">
            <div className="breadcrumb"><span>Control Center</span><b>/</b><strong>{currentTitle}</strong></div>
            <div className="topbar-actions">
              <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                <Button
                  className="theme-toggle-topbar"
                  type="text"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
                  onClick={() => setDarkMode(value => !value)}
                />
              </Tooltip>
              <Button className="notification-button" type="text" icon={<BellOutlined />} />
              <Badge dot color="#079653" offset={[-5, 4]}>
                <div className="avatar">AT</div>
              </Badge>
              <div className="user-meta"><strong>Anurag Tiwari</strong><span>Super Admin</span></div>
            </div>
          </header>

          <section className="content">
            <div className="page-heading">
              <div>
                <div className="eyebrow">GO GAS · CONTROL CENTER</div>
                <h1>{currentTitle}</h1>
                <p>Monitor and manage stations, devices, meters, weighing operations and reports from one place.</p>
              </div>
              <div className="status-chip"><span /> Systems operational</div>
            </div>

            <div className="welcome-panel">
              <div className="welcome-icon"><DashboardOutlined /></div>
              <div>
                <h2>{activeChild || (active === 'overview' ? 'Your operations, in one place' : allItems.find(item => item.key === active)?.label) || 'Your operations, in one place'}</h2>
                <p>This is the dashboard starter view. Select a page from the left navigation to preview its selected state. The sidebar is data-driven, so new categories and reports can be added without changing the layout.</p>
              </div>
            </div>

            <div className="placeholder-grid">
              <div className="placeholder-card">
                <div className="placeholder-icon green"><BuildOutlined /></div>
                <span>Navigation</span><strong>Expandable sections</strong><small>Keep related pages grouped together.</small>
              </div>
              <div className="placeholder-card">
                <div className="placeholder-icon blue"><SearchOutlined /></div>
                <span>Search</span><strong>Find pages quickly</strong><small>Search all menus or filter within a section.</small>
              </div>
              <div className="placeholder-card">
                <div className="placeholder-icon orange"><BarChartOutlined /></div>
                <span>Scalable</span><strong>Data-driven menu</strong><small>Add more station types and reports as needed.</small>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ConfigProvider>
  );
}
