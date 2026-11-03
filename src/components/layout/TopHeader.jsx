
import React, { useState } from 'react';
import { Input, Avatar, Dropdown, Badge, Tooltip } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import './TopHeader.css';

export default function TopHeader({
  pageTitle = 'Dashboard',
  mode = 'light',
  userName = 'Admin User',
  userRole = 'Admin',
  onSearch,
  onProfile,
  onSettings,
  onLogout,
}) {
  const [searchValue, setSearchValue] = useState('');

  const isDark = mode === 'dark';

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') onProfile?.();
    if (key === 'settings') onSettings?.();
    if (key === 'logout') onLogout?.();
  };

  const handleSearch = (value) => {
    onSearch?.(value.trim());
  };

  return (
    <header className={`app-top-header ${isDark ? 'header-dark' : 'header-light'}`}>

      {/* LEFT: PAGE TITLE */}
      <div className="header-page-title">
        <h2>{pageTitle}</h2>
        {/* <span>Control Center</span> */}
      </div>

      {/* CENTER: GLOBAL SEARCH */}
      <div className="header-search-container">
        <Input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          onPressEnter={() => handleSearch(searchValue)}
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search stations, devices, customers, reports..."
          className="global-search-input"
        />
      </div>

      {/* RIGHT: NOTIFICATIONS & USER */}
      <div className="header-right">

       

        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="header-user-button">
            <Avatar
              size={38}
              icon={<UserOutlined />}
              className="header-avatar"
            />

            <div className="header-user-info">
              <span className="header-user-name">{userName}</span>
              <span className="header-user-role">{userRole}</span>
            </div>

            <DownOutlined className="header-user-arrow" />
          </button>
        </Dropdown>

      </div>
    </header>
  );
}
