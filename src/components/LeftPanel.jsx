
import React, { useMemo, useState } from 'react';
import { Input, Tooltip } from 'antd';
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  ToolOutlined,
  FireOutlined,
  BuildOutlined,
  CarOutlined,
  LogoutOutlined,
  SearchOutlined,
  RightOutlined,
  MoonOutlined,
  SunOutlined,
  FileTextOutlined,
  DashboardOutlined,
  BarChartOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const navItems = [
  {
    label: 'Stations',
    icon: <AppstoreOutlined />,
    children: [
      'Station Dashboard',
      'Station List',
      'Station Report',
      'Transaction Report',
      'Missed Transaction Report',
      'Transaction Approval Report',
      'Downtime Storage Report',
      'Filler Sales Report',
      'Sales Comparison Report',
      'RSP Change Report',
      'Automation Sales Report',
      'Density Report',
    ],
  },
  {
    label: 'Live Monitoring',
    icon: <ClockCircleOutlined />,
    children: [
      'Live Station Status',
      'Device Status',
      'Live Alerts',
    ],
  },
  {
    label: 'Devices & Dispensers',
    icon: <ThunderboltOutlined />,
    children: [
      'Device List',
      'Dispenser Units',
      'Device Configuration',
      'Device Communication Report',
    ],
  },
  {
    label: 'Tank Storage',
    icon: <DatabaseOutlined />,
    children: [
      'Storage Dashboard',
      'Tank Configuration',
      'Storage Report',
      'Tank Stock Report',
    ],
  },
  {
    label: 'Relay & Valve Control',
    icon: <ToolOutlined />,
    children: [
      'Relay Control',
      'Valve Control',
      'Relay History',
    ],
  },
  {
    label: 'Diesel Generators',
    icon: <FireOutlined />,
    children: [
      'Generator Dashboard',
      'Generator Status',
      'Generator Reports',
    ],
  },
  {
    label: 'Bottling Plants',
    icon: <BuildOutlined />,
    children: [
      'Plant Dashboard',
      'Plant List',
      'Production Reports',
    ],
  },
  {
    label: 'Weighbridge',
    icon: <CarOutlined />,
    children: [
      'Weighbridge Dashboard',
      'Weighbridge List',
      'Weighing Report',
      'Weight Transactions',
      'Vehicle Report',
    ],
  },
];

const iconForChild = (label) => {
  const name = label.toLowerCase();

  if (name.includes('dashboard')) {
    return <DashboardOutlined />;
  }

  if (name.includes('alert')) {
    return <WarningOutlined />;
  }

  if (name.includes('status')) {
    return <CheckCircleOutlined />;
  }

  if (name.includes('sales')) {
    return <BarChartOutlined />;
  }

  if (name.includes('list')) {
    return <ShopOutlined />;
  }

  if (
    name.includes('configuration') ||
    name.includes('control')
  ) {
    return <SettingOutlined />;
  }

  return <FileTextOutlined />;
};

export default function LeftPanel({
  onSelect,
  onLogout,
  initialMode = 'dark',
}) {
  const [mode, setMode] = useState(initialMode);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Overview');
  const [expandedSection, setExpandedSection] = useState(null);

  // Global search is independent of all submenu searches.
  const [globalSearch, setGlobalSearch] = useState('');

  // Each section keeps its own search value.
  const [searchBySection, setSearchBySection] = useState({});

  const isDark = mode === 'dark';
  const globalQuery = globalSearch.trim().toLowerCase();

  const selectItem = (label) => {
    setActiveItem(label);
    onSelect?.(label);
  };

  const toggleSection = (label) => {
    setExpandedSection((current) =>
      current === label ? null : label
    );
  };

  const handleGlobalSearch = (value) => {
    setGlobalSearch(value);

    const query = value.trim().toLowerCase();

    if (!query) {
      // Clearing global search restores the full navigation.
      return;
    }

    // Expand the section containing a matching child.
    const matchingSection = navItems.find((section) =>
      section.children.some((child) =>
        child.toLowerCase().includes(query)
      )
    );

    if (matchingSection) {
      setExpandedSection(matchingSection.label);
    }
  };

  const handleSectionSearch = (sectionLabel, value) => {
    setSearchBySection((previous) => ({
      ...previous,
      [sectionLabel]: value,
    }));

    // Opening/searching one section doesn't affect other searches.
    setExpandedSection(sectionLabel);
  };

  const visibleSections = useMemo(() => {
    if (!globalQuery) {
      return navItems;
    }

    return navItems.filter((section) => {
      const sectionMatches = section.label
        .toLowerCase()
        .includes(globalQuery);

      const childMatches = section.children.some((child) =>
        child.toLowerCase().includes(globalQuery)
      );

      return sectionMatches || childMatches;
    });
  }, [globalQuery]);

  const getFilteredChildren = (section) => {
    const localQuery = (
      searchBySection[section.label] || ''
    ).trim().toLowerCase();

    // A submenu's own search takes priority inside that submenu.
    if (localQuery) {
      return section.children.filter((child) =>
        child.toLowerCase().includes(localQuery)
      );
    }

    // Global search narrows children without changing their data.
    if (
      globalQuery &&
      !section.label.toLowerCase().includes(globalQuery)
    ) {
      return section.children.filter((child) =>
        child.toLowerCase().includes(globalQuery)
      );
    }

    return section.children;
  };

  const clearGlobalSearch = () => {
    setGlobalSearch('');
  };

  return (
    <aside
      className={`left-panel ${
        isDark ? 'sidebar-dark' : 'sidebar-light'
      } ${collapsed ? 'sidebar-collapsed' : ''}`}
    >
      {/* Brand */}
      <div className="brand-area">
        {/* <button
          type="button"
          className="collapse-button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={
            collapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
        >
          {collapsed ? '»' : '«'}
        </button> */}

        <div className="brand-lockup" title="Confidence">
          

          {!collapsed && (
            <div className="brand-word">
              <img src={'https://iotronapp.s3.amazonaws.com/cpilcng.jpeg'} alt="Confidence"  style={{ width: '40%', height: 'auto' }}/>
            </div>
          )}
        </div>
      </div>

      {/* Global search */}
      {!collapsed && (
        <div className="sidebar-search-wrap">
          <Input
            allowClear
            value={globalSearch}
            prefix={<SearchOutlined />}
            placeholder="Search menu, reports, pages..."
            className="sidebar-search"
            aria-label="Search all navigation items"
            onChange={(event) =>
              handleGlobalSearch(event.target.value)
            }
            onClear={clearGlobalSearch}
          />
        </div>
      )}

      {/* Navigation */}
      <nav
        className="sidebar-nav"
        aria-label="Main navigation"
      >
        {!collapsed && (
          <div className="nav-section-label">
            OPERATIONS
          </div>
        )}

        {/* Overview */}
        <Tooltip
          title={collapsed ? 'Overview' : ''}
          placement="right"
        >
          <button
            type="button"
            className={`nav-item overview-item ${
              activeItem === 'Overview' ? 'active' : ''
            }`}
            onClick={() => selectItem('Overview')}
            aria-current={
              activeItem === 'Overview' ? 'page' : undefined
            }
          >
            <span className="nav-icon">
              <DashboardOutlined />
            </span>

            {!collapsed && (
              <span className="nav-label">Overview</span>
            )}
          </button>
        </Tooltip>

        {/* Sections */}
        {visibleSections.map((section) => {
          const localQuery = (
            searchBySection[section.label] || ''
          ).trim().toLowerCase();

          const sectionMatchesLocalSearch =
            section.label.toLowerCase().includes(localQuery);

          const sectionMatchesGlobalSearch =
            section.label.toLowerCase().includes(globalQuery);

          const matchingGlobalChildren = globalQuery
            ? section.children.some((child) =>
                child.toLowerCase().includes(globalQuery)
              )
            : false;

          const expanded =
            expandedSection === section.label ||
            Boolean(localQuery) ||
            section.children.includes(activeItem) ||
            (
              Boolean(globalQuery) &&
              matchingGlobalChildren &&
              !sectionMatchesGlobalSearch
            );

          const children = getFilteredChildren(section);

          const showSectionOverview =
            Boolean(localQuery) &&
            sectionMatchesLocalSearch;

          const hasResults =
            children.length > 0 || showSectionOverview;

          return (
            <div
              className="nav-group"
              key={section.label}
            >
              <Tooltip
                title={collapsed ? section.label : ''}
                placement="right"
              >
                <button
                  type="button"
                  className={`nav-item ${
                    activeItem === section.label ||
                    section.children.includes(activeItem)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      setExpandedSection(section.label);
                      return;
                    }

                    toggleSection(section.label);
                  }}
                  aria-expanded={!collapsed && expanded}
                >
                  <span className="nav-icon">
                    {section.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span className="nav-label">
                        {section.label}
                      </span>

                      <RightOutlined
                        className={`nav-chevron ${
                          expanded ? 'expanded' : ''
                        }`}
                      />
                    </>
                  )}
                </button>
              </Tooltip>

              {/* Submenu */}
              {!collapsed && expanded && (
                <div className="nav-submenu">
                  <Input
                    allowClear
                    size="middle"
                    prefix={<SearchOutlined />}
                    placeholder={`Search ${section.label}...`}
                    className="submenu-search"
                    value={searchBySection[section.label] || ''}
                    onChange={(event) =>
                      handleSectionSearch(
                        section.label,
                        event.target.value
                      )
                    }
                    aria-label={`Search ${section.label}`}
                  />

                  {/* Optional section overview result */}
                  {showSectionOverview && (
                    <button
                      type="button"
                      className={`nav-subitem ${
                        activeItem === section.label
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        selectItem(section.label)
                      }
                    >
                      <span className="nav-subicon">
                        {section.icon}
                      </span>

                      <span className="nav-sublabel">
                        {section.label} Overview
                      </span>
                    </button>
                  )}

                  {/* Child navigation items */}
                  {children.map((label) => (
                    <button
                      type="button"
                      key={label}
                      className={`nav-subitem ${
                        activeItem === label ? 'active' : ''
                      }`}
                      onClick={() => selectItem(label)}
                      aria-current={
                        activeItem === label
                          ? 'page'
                          : undefined
                      }
                    >
                      <span className="nav-subicon">
                        {iconForChild(label)}
                      </span>

                      <span className="nav-sublabel">
                        {label}
                      </span>
                    </button>
                  ))}

                  {!hasResults && (
                    <div className="empty-search">
                      No matching items
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {visibleSections.length === 0 && (
          <div className="empty-search">
            No matching menu items
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="footer-action logout-action"
          onClick={() => onLogout?.()}
        >
          <LogoutOutlined />

          {!collapsed && <span>Logout</span>}
        </button>

        <Tooltip
          title={
            isDark ? 'Switch to day mode' : 'Switch to night mode'
          }
          placement="top"
        >
          <button
            type="button"
            className="theme-toggle"
            onClick={() =>
              setMode((current) =>
                current === 'dark' ? 'light' : 'dark'
              )
            }
            aria-label={
              isDark ? 'Switch to day mode' : 'Switch to night mode'
            }
          >
            {isDark ? <SunOutlined /> : <MoonOutlined />}

            {!collapsed && (
              <span>
                {isDark ? 'Day mode' : 'Night mode'}
              </span>
            )}
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
