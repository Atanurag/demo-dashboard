import React from 'react';
import { Avatar, Badge, Button, Card, Dropdown, Input, Select, Space, Tag } from 'antd';
import {
  SearchOutlined, BellOutlined, SunOutlined, CloudOutlined, EnvironmentOutlined,
  ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, CheckCircleFilled,
  AppstoreOutlined, ThunderboltOutlined, DatabaseOutlined, RightOutlined,
  UserOutlined, DownOutlined
} from '@ant-design/icons';

const stats = [
  { label: 'Total volume', value: '3,01,342 L', change: '+12.4%', positive: true, icon: <ThunderboltOutlined />, tone: 'green' },
  { label: 'Total sales', value: '₹2,48,93,321', change: '+8.7%', positive: true, icon: <ArrowUpOutlined />, tone: 'blue' },
  { label: 'Total storage', value: '2,163,279 L', change: '−2.1%', positive: false, icon: <DatabaseOutlined />, tone: 'purple' },
  { label: 'Stations online', value: '315 / 336', change: '94%', positive: true, icon: <AppstoreOutlined />, tone: 'green' },
  { label: 'Generators online', value: '18 / 20', change: '90%', positive: true, icon: <ThunderboltOutlined />, tone: 'blue' },
  { label: 'Live alerts', value: '4', change: 'Needs review', positive: false, icon: <WarningOutlined />, tone: 'red' }
];
const stationRows = [
  ['1', 'Arcot Road Vadapalani', 'Chennai', 'Online', '3,013 L', '₹2,15,218', '2'],
  ['2', 'T Nagar', 'Chennai', 'Online', '2,548 L', '₹1,89,441', '1'],
  ['3', 'Porur', 'Chennai', 'Offline', '0 L', '₹0', '4'],
  ['4', 'Bengaluru ORR', 'Bengaluru', 'Online', '4,231 L', '₹3,42,778', '0'],
  ['5', 'Vijayawada', 'Andhra Pradesh', 'Online', '3,982 L', '₹2,87,661', '1']
];
const alerts = [
  ['10:12 AM', 'Dispenser 2 – Nozzle offline', 'Arcot Road, Chennai', 'red'],
  ['09:47 AM', 'Tank 1 – Low level (12%)', 'T Nagar, Chennai', 'orange'],
  ['08:32 AM', 'Generator 1 – High temperature', 'Porur, Chennai', 'red'],
  ['07:55 AM', 'Relay 3 – Communication lost', 'Bengaluru ORR', 'orange']
];

export default function Dashboard({ activeItem, isDark }) {
  return (
    <div className="dashboard-page">
      <header className="topbar">
        <Input className="global-search" prefix={<SearchOutlined />} placeholder="Search station, device, customer, report..." />
        <div className="topbar-right">
          <Button className="topbar-select"><span className="calendar-dot">▦</span> Today · Oct 17, 2026 <DownOutlined /></Button>
          <Select className="region-select" defaultValue="All regions" options={[{ value: 'All regions', label: 'All regions' }, { value: 'South', label: 'South' }, { value: 'West', label: 'West' }]} />
          <Button type="text" className="icon-button" aria-label="Display mode"><SunOutlined /></Button>
          <Badge dot><Button type="text" className="icon-button" aria-label="Notifications"><BellOutlined /></Button></Badge>
          <Avatar size={34} icon={<UserOutlined />} className="profile-avatar" />
          <div className="profile-copy"><strong>Admin User</strong><span>Super Admin</span></div>
          <DownOutlined className="profile-chevron" />
        </div>
      </header>

      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="eyebrow">CONTROL CENTER</span>
          <h1>{activeItem === 'Weighbridge' ? 'Operations overview' : activeItem}</h1>
          <p>Monitor sites, equipment, measurements and alerts from one place.</p>
          <div className="welcome-meta"><span><CheckCircleFilled /> 315 systems online</span><span><EnvironmentOutlined /> All regions</span></div>
        </div>
        <div className="weather-card">
          <div className="weather-location"><EnvironmentOutlined /> Chennai, India</div>
          <div className="weather-main"><SunOutlined /><strong>32°C</strong></div>
          <span className="weather-condition">Mostly clear</span>
          <div className="weather-divider" />
          <span className="weather-date">17 Oct 2026</span>
          <strong className="weather-time">10:28 AM</strong>
        </div>
      </section>

      <section className="stats-grid" aria-label="Key metrics">
        {stats.map(item => (
          <Card key={item.label} className="stat-card" bordered={false}>
            <div className={`stat-icon ${item.tone}`}>{item.icon}</div>
            <div className="stat-content"><span className="stat-label">{item.label}</span><strong>{item.value}</strong><span className={`stat-change ${item.positive ? 'positive' : 'negative'}`}>{item.positive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {item.change}</span></div>
          </Card>
        ))}
      </section>

      <section className="content-grid">
        <Card className="panel-card network-card" bordered={false} title={<span><EnvironmentOutlined className="title-icon green-text" /> Network overview</span>} extra={<Space size={12}><span className="legend"><i className="dot online" />Online</span><span className="legend"><i className="dot offline" />Offline</span></Space>}>
          <div className="network-visual">
            <div className="network-filter"><Input size="small" prefix={<SearchOutlined />} placeholder="Search station..." /><div className="region-line"><span>All India</span><strong>336</strong></div>{[['Tamil Nadu','78'],['Karnataka','62'],['Andhra Pradesh','54'],['Maharashtra','48'],['Delhi NCR','32'],['Other','62']].map(row => <div className="region-line" key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}</div>
            <div className="map-placeholder" aria-label="Simplified network map"><div className="map-grid-lines" />{Array.from({length: 20}, (_, i) => <span key={i} className={`map-pin pin-${i % 5}`} style={{ left: `${12 + ((i * 17) % 75)}%`, top: `${10 + ((i * 23) % 78)}%` }} />)}<div className="map-tooltip"><strong>Arcot Road</strong><span>Vadapalani</span><small><i className="dot online" /> Online</small></div><div className="map-zoom">＋<br />−</div></div>
          </div>
        </Card>

        <Card className="panel-card trend-card" bordered={false} title={<span><span className="title-icon blue-text">▥</span> Today's activity</span>} extra={<Select size="small" defaultValue="Volume" options={[{value:'Volume',label:'Volume'},{value:'Sales',label:'Sales'},{value:'Transactions',label:'Transactions'}]} />}>
          <div className="chart-summary"><span>Processed volume</span><strong>28,394.04 L</strong><Tag color="green">+12.4%</Tag></div>
          <div className="chart-area"><div className="chart-y-labels"><span>40k</span><span>30k</span><span>20k</span><span>10k</span><span>0</span></div><svg className="line-chart" viewBox="0 0 600 210" preserveAspectRatio="none" role="img" aria-label="Today's activity trend"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#159d68" stopOpacity=".28"/><stop offset="100%" stopColor="#159d68" stopOpacity=".01"/></linearGradient></defs>{[25,65,105,145,185].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} className="chart-gridline" />)}<path d="M0 172 C35 160 48 140 75 146 S120 112 150 120 S195 84 225 96 S270 53 300 70 S345 43 375 64 S420 79 450 55 S495 75 525 47 S570 68 600 60 L600 190 L0 190 Z" fill="url(#chartFill)"/><path d="M0 172 C35 160 48 140 75 146 S120 112 150 120 S195 84 225 96 S270 53 300 70 S345 43 375 64 S420 79 450 55 S495 75 525 47 S570 68 600 60" className="chart-line"/><path d="M0 160 C50 130 85 158 130 130 S200 135 250 110 S340 128 390 105 S490 128 540 104 S580 112 600 98" className="chart-line-secondary"/></svg></div>
          <div className="chart-x-labels"><span>12 AM</span><span>04 AM</span><span>08 AM</span><span>12 PM</span><span>04 PM</span><span>08 PM</span></div><div className="chart-legend"><span><i className="line-key" />Current day</span><span><i className="line-key previous" />Previous day</span></div>
        </Card>
      </section>

      <section className="bottom-grid">
        <Card className="panel-card table-card" bordered={false} title={<span><AppstoreOutlined className="title-icon blue-text" /> Station performance</span>} extra={<Button type="link" size="small">View all <RightOutlined /></Button>}>
          <div className="table-scroll"><table><thead><tr>{['#','Station','Region','Status','Today volume','Sales','Alerts'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{stationRows.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{i === 3 ? <Tag className={`status-tag ${cell === 'Online' ? 'status-online' : 'status-offline'}`}><i className="dot" />{cell}</Tag> : i === 6 ? <span className={`alert-count ${cell === '0' ? 'zero' : ''}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>
        </Card>
        <Card className="panel-card storage-card" bordered={false} title={<span><DatabaseOutlined className="title-icon green-text" /> Storage levels</span>} extra={<Button type="link" size="small">View all <RightOutlined /></Button>}>
          {[
            ['Tank 1','Diesel','87%','567,340 L','green'],['Tank 2','Petrol','68%','436,120 L','blue'],['Tank 3','CNG','72%','298,650 L','purple'],['Tank 4','LPG','54%','176,420 L','orange'],['Tank 5','AdBlue','81%','684,749 L','blue']
          ].map(row => <div className="storage-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><div className="storage-progress"><div className={row[4]} style={{width:row[2]}} /></div><strong>{row[2]}</strong><span className="storage-volume">{row[3]}</span></div>)}
        </Card>
        <Card className="panel-card alerts-card" bordered={false} title={<span><WarningOutlined className="title-icon red-text" /> Live alerts</span>} extra={<Button type="link" size="small">View all <RightOutlined /></Button>}>
          {alerts.map(row => <div className="alert-row" key={row[0]}><i className={`dot ${row[3]}`} /><span className="alert-time">{row[0]}</span><div className="alert-description"><strong>{row[1]}</strong><span>{row[2]}</span></div><RightOutlined className="alert-arrow" /></div>)}
        </Card>
      </section>
      <footer className="page-footer"><span>Confidence Control Center</span><span><CloudOutlined /> Last synced just now</span></footer>
    </div>
  );
}
