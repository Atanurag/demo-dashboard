
import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Tag,
  Progress,
  Space,
  Tooltip,
  Collapse,
  Empty
} from 'antd';

import {
  EnvironmentOutlined,
  CalendarOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  UserOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  FireOutlined,
  WarningOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
  RightOutlined,
  ReloadOutlined,
  BarChartOutlined,
  DashboardOutlined
} from '@ant-design/icons';

import './StationDashboard.css';

const { RangePicker } = DatePicker;

// Replace with your actual dispenser image path.
const DISPENSER_IMAGE = '/images/dispenser.png';

const stationOptions = [
  { value: 'arcot', label: 'Arcot Road Vadapalani' },
  { value: 'tnagar', label: 'T Nagar' },
  { value: 'porur', label: 'Porur' },
  { value: 'bengaluru', label: 'Bengaluru ORR' }
];

const kpis = [
  {
    title: 'Total Volume',
    value: '3,013.00 L',
    icon: <ThunderboltOutlined />,
    color: 'green'
  },
  {
    title: 'Total Sales',
    value: '₹2,15,218.82',
    icon: <DollarOutlined />,
    color: 'blue'
  },
  {
    title: 'Total Customer',
    value: '774',
    icon: <UserOutlined />,
    color: 'purple'
  },
  {
    title: 'Fill Size',
    value: '3.89 L',
    icon: <DashboardOutlined />,
    color: 'orange'
  },
  {
    title: 'Storage Level',
    value: '10,592.75 L',
    icon: <DatabaseOutlined />,
    color: 'blue'
  }
];

const equipment = [
  { label: 'DU Pump 1', value: 'ON', status: 'online' },
  { label: 'DU Pump 2', value: 'OFF', status: 'offline' },
  { label: 'Air Compressor', value: 'ON', status: 'online' },
  { label: 'Cabinet Door 1', value: 'CLOSED', status: 'online' },
  { label: 'Unloading Pump 1', value: 'OFF', status: 'offline' },
  { label: 'Unloading Pump 2', value: 'OFF', status: 'offline' },
  { label: 'Loading Pump 1', value: 'OFF', status: 'offline' },
  { label: 'Loading Pump 2', value: 'OFF', status: 'offline' }
];

const dispensers = [
  {
    id: 1,
    name: 'Dispenser Unit 1',
    status: 'ONLINE',
    sales: '₹87,326.83',
    volume: '1,222.55 L',
    lastDispensing: '07:52 PM',
    nozzles: [
      {
        name: 'Nozzle 1',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹43,313.02',
        volume: '606.37 L',
        percentage: 68,
        color: '#079c67',
        startTotalizer: '513552.19',
        endTotalizer: '514158.56',
        firstDispensing: '06:35 AM',
        lastDispensing: '07:48 PM'
      },
      {
        name: 'Nozzle 2',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹44,013.81',
        volume: '616.18 L',
        percentage: 72,
        color: '#3285ee',
        startTotalizer: '1245472.34',
        endTotalizer: '1246088.52',
        firstDispensing: '06:48 AM',
        lastDispensing: '07:52 PM'
      }
    ]
  },
  {
    id: 2,
    name: 'Dispenser Unit 2',
    status: 'ONLINE',
    sales: '₹1,27,891.99',
    volume: '1,790.45 L',
    lastDispensing: '07:55 PM',
    nozzles: [
      {
        name: 'Nozzle 1',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹47,672.42',
        volume: '667.40 L',
        percentage: 68,
        color: '#079c67',
        startTotalizer: '251559.57',
        endTotalizer: '252226.97',
        firstDispensing: '06:29 AM',
        lastDispensing: '07:55 PM'
      },
      {
        name: 'Nozzle 2',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹80,219.57',
        volume: '1,123.05 L',
        percentage: 72,
        color: '#3285ee',
        startTotalizer: '496122.16',
        endTotalizer: '497245.21',
        firstDispensing: '06:47 AM',
        lastDispensing: '07:52 PM'
      }
    ]
  },
  {
    id: 3,
    name: 'Dispenser Unit 3',
    status: 'ONLINE',
    sales: '₹57,96,428.00',
    volume: '59,754.16 L',
    lastDispensing: '11:53 PM',
    nozzles: [
      {
        name: 'Nozzle 1',
        status: 'ON',
        rsp: '₹97.00',
        sales: '₹20,49,316.00',
        volume: '21,126.16 L',
        percentage: 68,
        color: '#079c67',
        startTotalizer: '263329.69',
        endTotalizer: '284455.85',
        firstDispensing: '06:18 AM',
        lastDispensing: '07:31 PM'
      },
      {
        name: 'Nozzle 2',
        status: 'ON',
        rsp: '₹97.00',
        sales: '₹37,47,112.00',
        volume: '38,628.00 L',
        percentage: 72,
        color: '#3285ee',
        startTotalizer: '420882.11',
        endTotalizer: '459510.11',
        firstDispensing: '06:29 AM',
        lastDispensing: '07:55 PM'
      }
    ]
  },
  {
    id: 4,
    name: 'Dispenser Unit 4',
    status: 'ONLINE',
    sales: '₹1,03,218.65',
    volume: '1,450.22 L',
    lastDispensing: '07:31 PM',
    nozzles: [
      {
        name: 'Nozzle 1',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹51,335.62',
        volume: '720.48 L',
        percentage: 68,
        color: '#079c67',
        startTotalizer: '420882.11',
        endTotalizer: '421602.59',
        firstDispensing: '06:18 AM',
        lastDispensing: '07:31 PM'
      },
      {
        name: 'Nozzle 2',
        status: 'ON',
        rsp: '₹71.43',
        sales: '₹51,883.03',
        volume: '729.74 L',
        percentage: 72,
        color: '#3285ee',
        startTotalizer: '496122.16',
        endTotalizer: '496851.90',
        firstDispensing: '06:29 AM',
        lastDispensing: '07:55 PM'
      }
    ]
  }
];

const tanks = [
  { name: 'Tank 1', fuel: 'Diesel', level: 87, volume: '5,670.00 L', color: '#079c67' },
  { name: 'Tank 2', fuel: 'Petrol', level: 68, volume: '2,436.00 L', color: '#3285ee' },
  { name: 'Tank 3', fuel: 'CNG', level: 72, volume: '1,298.00 L', color: '#8b5cf6' },
  { name: 'Tank 4', fuel: 'LPG', level: 54, volume: '688.75 L', color: '#f59e0b' },
  { name: 'Tank 5', fuel: 'AdBlue', level: 81, volume: '500.00 L', color: '#3285ee' }
];

function StatusBadge({ status }) {
  const online = status === 'ONLINE' || status === 'ON' ||
    status === 'CLOSED';

  return (
    <Tag className={`station-status ${online ? 'is-online' : 'is-offline'}`}>
      {online ? <CheckCircleFilled /> : <CloseCircleFilled />}
      {status}
    </Tag>
  );
}

function Metric({ icon, label, value, color }) {
  return (
    <div className="du-metric">
      <div className={`du-metric-icon ${color}`}>{icon}</div>
      <div className="du-metric-text">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function NozzleCard({ nozzle }) {
  return (
    <div className="nozzle-block">
      <div className="nozzle-heading">
        <strong>
          <FireOutlined />
          {nozzle.name}
        </strong>
        <StatusBadge status={nozzle.status} />
      </div>

      <div className="nozzle-data">
        <span>RSP</span>
        <strong>{nozzle.rsp}</strong>

        <span>Sales</span>
        <strong>{nozzle.sales}</strong>

        <span>Volume</span>
        <strong>{nozzle.volume}</strong>
      </div>

      <div className="nozzle-progress">
        <Progress
          percent={nozzle.percentage}
          showInfo={false}
          strokeColor={nozzle.color}
          trailColor="#e9edf3"
          size="small"
        />
        <strong>{nozzle.percentage}%</strong>
      </div>
    </div>
  );
}

function DispenserCard({ dispenser }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="station-panel du-card"
      bordered={false}
      bodyStyle={{ padding: 0 }}
    >
      <div className="du-card-header">
        <div className="du-title">
          <span className="du-title-icon">
            <FireOutlined />
          </span>
          <strong>{dispenser.name}</strong>
        </div>

        <Space>
          <StatusBadge status={dispenser.status} />
          <Tooltip title="More options">
            <Button
              type="text"
              size="small"
              className="du-more-button"
            >
              •••
            </Button>
          </Tooltip>
        </Space>
      </div>

      <div className="du-summary">
        <Metric
          icon={<DollarOutlined />}
          label="Sales"
          value={dispenser.sales}
          color="green"
        />
        <Metric
          icon={<DatabaseOutlined />}
          label="Volume"
          value={dispenser.volume}
          color="blue"
        />
        <Metric
          icon={<ClockCircleOutlined />}
          label="Last Dispensing"
          value={dispenser.lastDispensing}
          color="purple"
        />
      </div>

      <div className="du-nozzle-layout">
        <NozzleCard nozzle={dispenser.nozzles[0]} />

        <div className="dispenser-image-wrap">
          <img
            src={DISPENSER_IMAGE}
            alt="Fuel dispenser"
            className="dispenser-image"
            onError={event => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <div className="dispenser-image-fallback">
            <FireOutlined />
            <span>Dispenser</span>
          </div>
        </div>

        <NozzleCard nozzle={dispenser.nozzles[1]} />
      </div>

      <button
        className={`du-expand-button ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(value => !value)}
      >
        <span><BarChartOutlined /> More metrics</span>
        <DownOutlined />
      </button>

      {expanded && (
        <div className="du-extra-metrics">
          {dispenser.nozzles.map(nozzle => (
            <div className="extra-nozzle" key={nozzle.name}>
              <strong>{nozzle.name} – Detailed readings</strong>

              <div className="extra-metric-grid">
                <div>
                  <span>Start Totalizer</span>
                  <strong>{nozzle.startTotalizer}</strong>
                </div>
                <div>
                  <span>End Totalizer</span>
                  <strong>{nozzle.endTotalizer}</strong>
                </div>
                <div>
                  <span>First Dispensing</span>
                  <strong>{nozzle.firstDispensing}</strong>
                </div>
                <div>
                  <span>Last Dispensing</span>
                  <strong>{nozzle.lastDispensing}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function StorageSection() {
  return (
    <Card
      className="station-panel storage-panel"
      bordered={false}
      title={
        <span className="panel-title">
          <DatabaseOutlined className="green-text" />
          Tank storage
        </span>
      }
      extra={<Tag color="green">5 Tanks</Tag>}
    >
      <div className="tank-overview">
        <div className="tank-visual">
          <div className="tank-cylinder">
            <div className="tank-water" style={{ height: '62%' }} />
          </div>
          <strong>10,592.75 L</strong>
          <span>Total available storage</span>
        </div>

        <div className="tank-list">
          {tanks.map(tank => (
            <div className="tank-row" key={tank.name}>
              <div className="tank-info">
                <strong>{tank.name}</strong>
                <span>{tank.fuel}</span>
              </div>
              <Progress
                percent={tank.level}
                showInfo={false}
                strokeColor={tank.color}
                trailColor="#edf0f4"
                size="small"
              />
              <strong>{tank.level}%</strong>
              <span className="tank-volume">{tank.volume}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function DispensingChart() {
  const [period, setPeriod] = useState('Today');
  const [mode, setMode] = useState('Now Off');

  return (
    <Card
      className="station-panel dispensing-chart-panel"
      bordered={false}
      title={
        <span className="panel-title">
          <BarChartOutlined className="orange-text" />
          Dispensing chart
        </span>
      }
      extra={
        <Space wrap>
          <Select
            size="small"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'Now On', label: 'Now On' },
              { value: 'Now Off', label: 'Now Off' }
            ]}
          />
          <Select
            size="small"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'Today', label: 'Today' },
              { value: 'Last 7 Days', label: 'Last 7 Days' },
              { value: 'Last 30 Days', label: 'Last 30 Days' }
            ]}
          />
        </Space>
      }
    >
      <div className="dispensing-chart-summary">
        <strong>Total Fuel Dispensed: 3,013 L</strong>
        <Tag color="green">{period}</Tag>
      </div>

      <div className="dispensing-chart">
        <div className="chart-y-axis">
          <span>300</span>
          <span>250</span>
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>0</span>
        </div>

        <svg
          viewBox="0 0 900 240"
          preserveAspectRatio="none"
          role="img"
          aria-label="Fuel dispensing trend"
        >
          {[20, 60, 100, 140, 180, 220].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="900"
              y2={y}
              className="dispensing-grid-line"
            />
          ))}

          <defs>
            <linearGradient id="stationChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3290f4" stopOpacity=".3" />
              <stop offset="100%" stopColor="#3290f4" stopOpacity=".02" />
            </linearGradient>
          </defs>

          <path
            d="M0 180 C70 170 80 115 150 120 S240 150 300 85 S390 90 450 110 S530 45 600 75 S700 115 760 60 S840 75 900 35 L900 220 L0 220 Z"
            fill="url(#stationChartFill)"
          />

          <path
            d="M0 180 C70 170 80 115 150 120 S240 150 300 85 S390 90 450 110 S530 45 600 75 S700 115 760 60 S840 75 900 35"
            className="dispensing-line"
          />
        </svg>
      </div>

      <div className="chart-bottom-labels">
        <span>12 AM</span>
        <span>04 AM</span>
        <span>08 AM</span>
        <span>12 PM</span>
        <span>04 PM</span>
        <span>08 PM</span>
      </div>

      <div className="chart-note">
        <span><i className="chart-dot" /> Fuel dispensed</span>
        <span>Mode: {mode}</span>
      </div>
    </Card>
  );
}

export default function StationDashboard({
  isDark = false,
  stationImage = DISPENSER_IMAGE,
  onFilter
}) {
  const [selectedStation, setSelectedStation] = useState('arcot');
  const [selectedState, setSelectedState] = useState(undefined);
  const [dateRange, setDateRange] = useState(null);

  const handleSubmit = () => {
    const filters = {
      station: selectedStation,
      state: selectedState,
      dateRange: dateRange
        ? dateRange.map(date => date?.format('YYYY-MM-DD'))
        : null
    };

    onFilter?.(filters);
    console.log('Station dashboard filters:', filters);
  };

  return (
    <div className={`station-dashboard ${isDark ? 'station-dashboard-dark' : ''}`}>
      {/* Station filters */}
      <div className="station-filter-panel">
        <div className="station-filter-item date-filter">
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start date', 'End date']}
            suffixIcon={<CalendarOutlined />}
          />
        </div>

        <div className="station-filter-item">
          <Select
            showSearch
            allowClear
            placeholder="Select a state"
            optionFilterProp="label"
            value={selectedState}
            onChange={setSelectedState}
            options={[
              { value: 'Tamil Nadu', label: 'Tamil Nadu' },
              { value: 'Karnataka', label: 'Karnataka' },
              { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
              { value: 'Maharashtra', label: 'Maharashtra' }
            ]}
          />
        </div>

        <div className="station-filter-item">
          <Select
            showSearch
            optionFilterProp="label"
            value={selectedStation}
            onChange={setSelectedStation}
            options={stationOptions}
          />
        </div>

        <Button
          type="primary"
          className="station-submit-button"
          icon={<ReloadOutlined />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* Station information */}
      <div className="station-information">
        <div>
          <div className="station-name">
            <EnvironmentOutlined />
            Arcot Road Vadapalani
          </div>
          <p>
            New Door Nos. 240 and 241 Arcot Road, Vadapalani,
            Chennai 600026
          </p>
        </div>

        <div className="station-weather-info">
          <span><CalendarOutlined /> 17 October, 2026 · 10:26 AM</span>
          <span><span className="temperature-icon">☀</span> 26.95°C</span>
        </div>
      </div>

      {/* KPI cards */}
      <section className="station-kpi-grid">
        {kpis.map(item => (
          <Card
            key={item.title}
            className={`station-panel kpi-card kpi-${item.color}`}
            bordered={false}
          >
            <div className={`kpi-icon ${item.color}`}>
              {item.icon}
            </div>
            <div className="kpi-content">
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </div>
          </Card>
        ))}

        <Card className="station-panel kpi-card kpi-time" bordered={false}>
          <div className="kpi-icon green"><ClockCircleOutlined /></div>
          <div className="kpi-content">
            <span>First Dispensing</span>
            <strong>06:29 AM</strong>
          </div>
          <div className="kpi-icon orange"><ClockCircleOutlined /></div>
          <div className="kpi-content">
            <span>Last Dispensing</span>
            <strong>07:55 PM</strong>
          </div>
        </Card>
      </section>

      
      {/* Generator information */}
      <Card className="station-panel generator-panel" bordered={false}>
        <div className="generator-icon"><ThunderboltOutlined /></div>
        <div className="generator-status">
          <span>Diesel Generator</span>
          <strong className="online">ON</strong>
        </div>
        <div className="generator-data">
          <span>Last On</span>
          <strong>09-Apr-2025 22:22:09</strong>
        </div>
        <div className="generator-data">
          <span>Last Off</span>
          <strong>09-Apr-2025 23:23:06</strong>
        </div>
        <div className="generator-data">
          <span>Fuel Level</span>
          <strong>11%</strong>
        </div>
        <div className="generator-data">
          <span>Coolant Temperature</span>
          <strong>39°C</strong>
        </div>
        <div className="generator-data">
          <span>Battery Voltage</span>
          <strong>12.8 V</strong>
        </div>
      </Card>

      {/* DU cards */}
      <section className="du-section">
        <div className="section-heading">
          <div>
            <FireOutlined />
            <h2>Dispenser Units</h2>
            <Tag color="green">4 Online</Tag>
            <span className="unit-count">Total Units: 4</span>
          </div>
          <Button type="default" size="small">
            View details <RightOutlined />
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {dispensers.map(dispenser => (
            <Col xs={24} xl={12} key={dispenser.id}>
              <DispenserCard dispenser={dispenser} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Tank storage */}
      {/* <StorageSection /> */}

      {/* Dispensing chart */}
      <DispensingChart />

      <div className="station-page-footer">
        <span>Confidence Control Center · Station Dashboard</span>
        <span><CheckCircleFilled /> Station data overview</span>
      </div>
    </div>
  );
}
