
import React, { useMemo, useState } from "react";
import {
    Card,
    Row,
    Col,
    Input,
    Button,
    Tag,
    Empty,
    Tooltip,
    message,
    Select,
    Badge,
    Divider,
    Radio
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faGaugeHigh,
    faChartLine,
    faGasPump,
    faDatabase,
    faBolt,
    faCloud,
    faBell,
    faUsers,
    faClock,
    faDroplet,
    faTemperatureHalf,
    faVolumeHigh,
    faCalendarDays,
    faPlus,
    faTrash,
    faMagnifyingGlass,
    faRotateLeft,
    faFloppyDisk,
    faCheck,
    faLayerGroup,
    faEye
} from "@fortawesome/free-solid-svg-icons";

import "./WidgetAdder.css";

const STORAGE_KEY = "dashboard_widgets_v1";

const widgetLibrary = [
    {
        id: "total-sales",
        name: "Total Sales",
        category: "Overview",
        description: "Displays total fuel sales for the selected period.",
        type: "metric",
        icon: faChartLine,
        color: "#16A36A",
        previewValue: "₹2,15,218",
        previewLabel: "Total revenue"
    },
    {
        id: "total-volume",
        name: "Total Volume",
        category: "Overview",
        description: "Displays total fuel dispensing volume.",
        type: "metric",
        icon: faGaugeHigh,
        color: "#2563EB",
        previewValue: "3,013 L",
        previewLabel: "Fuel dispensed"
    },
    {
        id: "total-customers",
        name: "Total Customers",
        category: "Overview",
        description: "Displays the total number of customers.",
        type: "metric",
        icon: faUsers,
        color: "#8B5CF6",
        previewValue: "774",
        previewLabel: "Customers"
    },
    {
        id: "first-last-dispensing",
        name: "Dispensing Timings",
        category: "Dispenser",
        description: "Shows first and last dispensing times.",
        type: "metric",
        icon: faClock,
        color: "#0891B2",
        previewValue: "06:29 AM",
        previewLabel: "First dispensing"
    },
    {
        id: "dispenser-status",
        name: "Dispenser Status",
        category: "Dispenser",
        description: "Monitor online and offline dispenser units.",
        type: "status",
        icon: faGasPump,
        color: "#16A36A",
        previewValue: "4 Online",
        previewLabel: "Dispenser units"
    },
    {
        id: "nozzle-performance",
        name: "Nozzle Performance",
        category: "Dispenser",
        description: "View nozzle-wise sales, volume and RSP.",
        type: "chart",
        icon: faGasPump,
        color: "#0D9488",
        previewValue: "667.40 L",
        previewLabel: "Nozzle volume"
    },
    {
        id: "sales-trend",
        name: "Sales Trend",
        category: "Analytics",
        description: "Visualize sales trends over time.",
        type: "chart",
        icon: faChartLine,
        color: "#2563EB",
        previewValue: "₹2.15 L",
        previewLabel: "Sales"
    },
    {
        id: "volume-trend",
        name: "Volume Trend",
        category: "Analytics",
        description: "Analyze fuel volume consumption trends.",
        type: "chart",
        icon: faDroplet,
        color: "#0891B2",
        previewValue: "3,013 L",
        previewLabel: "Volume"
    },
    {
        id: "storage-level",
        name: "Storage Level",
        category: "Storage",
        description: "Monitor tank levels and available fuel.",
        type: "metric",
        icon: faDatabase,
        color: "#0D9488",
        previewValue: "10,592 L",
        previewLabel: "Available storage"
    },
    {
        id: "storage-temperature",
        name: "Storage Temperature",
        category: "Storage",
        description: "Monitor fuel storage temperature.",
        type: "metric",
        icon: faTemperatureHalf,
        color: "#EA580C",
        previewValue: "29°C",
        previewLabel: "Tank temperature"
    },
    {
        id: "generator-status",
        name: "Generator Status",
        category: "Generator",
        description: "View generator operating status.",
        type: "status",
        icon: faBolt,
        color: "#D97706",
        previewValue: "ON",
        previewLabel: "Generator status"
    },
    {
        id: "generator-energy",
        name: "Energy Generation",
        category: "Generator",
        description: "Compare energy generated and fuel consumed.",
        type: "chart",
        icon: faBolt,
        color: "#7C3AED",
        previewValue: "125 kWh",
        previewLabel: "Energy generated"
    },
    {
        id: "environment-monitoring",
        name: "Environmental Monitoring",
        category: "Generator",
        description: "Monitor temperature, vibration and enclosure noise.",
        type: "chart",
        icon: faCloud,
        color: "#0891B2",
        previewValue: "Normal",
        previewLabel: "Environmental status"
    },
    {
        id: "alerts-summary",
        name: "Alerts Summary",
        category: "Monitoring",
        description: "View active alerts and device warnings.",
        type: "status",
        icon: faBell,
        color: "#DC2626",
        previewValue: "05",
        previewLabel: "Active alerts"
    },
    {
        id: "fuel-consumption",
        name: "Fuel Consumption",
        category: "Analytics",
        description: "Track fuel consumption across selected periods.",
        type: "chart",
        icon: faDroplet,
        color: "#EA580C",
        previewValue: "1,250 L",
        previewLabel: "Fuel consumed"
    },
    {
        id: "daily-summary",
        name: "Daily Summary",
        category: "Analytics",
        description: "View a consolidated summary of daily operations.",
        type: "summary",
        icon: faCalendarDays,
        color: "#6366F1",
        previewValue: "Today",
        previewLabel: "Daily performance"
    }
];

const categories = [
    "All Widgets",
    "Overview",
    "Dispenser",
    "Storage",
    "Analytics",
    "Generator",
    "Monitoring"
];

const getInitialWidgets = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [
            "total-sales",
            "total-volume",
            "total-customers",
            "dispenser-status"
        ];
    } catch {
        return [];
    }
};

export default function WidgetAdder() {

    const [selectedWidgets, setSelectedWidgets] =
        useState(getInitialWidgets);

    const [searchValue, setSearchValue] = useState("");
    const [activeCategory, setActiveCategory] =
        useState("All Widgets");

    const [showSelectedOnly, setShowSelectedOnly] =
        useState(false);
        const [selectedDashboard, setSelectedDashboard] =
    useState("station");

    const [saved, setSaved] = useState(false);

    const selectedCount = selectedWidgets.length;

    const filteredWidgets = useMemo(() => {
        return widgetLibrary.filter(widget => {

            const matchesSearch =
                widget.name.toLowerCase().includes(
                    searchValue.toLowerCase()
                ) ||
                widget.description.toLowerCase().includes(
                    searchValue.toLowerCase()
                );

            const matchesCategory =
                activeCategory === "All Widgets" ||
                widget.category === activeCategory;

            const matchesSelected =
                !showSelectedOnly ||
                selectedWidgets.includes(widget.id);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesSelected
            );
        });
    }, [
        searchValue,
        activeCategory,
        showSelectedOnly,
        selectedWidgets
    ]);

    const addWidget = (widgetId) => {

        if (selectedWidgets.includes(widgetId)) {
            message.info("Widget is already added.");
            return;
        }

        setSelectedWidgets(previous => [
            ...previous,
            widgetId
        ]);

        setSaved(false);
        message.success("Widget added successfully.");
    };

    const removeWidget = (widgetId) => {

        setSelectedWidgets(previous =>
            previous.filter(id => id !== widgetId)
        );

        setSaved(false);
        message.success("Widget removed.");
    };

    const saveConfiguration = () => {

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(selectedWidgets)
            );

            setSaved(true);
            message.success("Dashboard configuration saved.");
        } catch {
            message.error("Unable to save widget configuration.");
        }
    };

    const resetConfiguration = () => {

        setSelectedWidgets([]);
        setSaved(false);
        localStorage.removeItem(STORAGE_KEY);

        message.success("Widget selection cleared.");
    };

    const getWidget = (id) =>
        widgetLibrary.find(widget => widget.id === id);

    return (
        <div className="widget-adder-page">

            {/* PAGE HEADER */}

            <div className="widget-page-header">

                <div>
                    <div className="widget-breadcrumb">
                        Settings / Dashboard Customization
                    </div>

                    <h2>Widget Management</h2>

                    <p>
                        Customize your dashboard by adding the widgets
                        that matter to your operations.
                    </p>
                </div>

                <div className="widget-header-actions">

                    <Button
                        icon={<FontAwesomeIcon icon={faRotateLeft} />}
                        onClick={resetConfiguration}
                    >
                        Reset
                    </Button>

                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                        onClick={saveConfiguration}
                        className="widget-save-button"
                    >
                        Save Configuration
                    </Button>

                </div>

            </div>
<Card className="dashboard-selection-card">
    <div className="widget-section-heading">
        <div>
            <h3>Select Dashboard</h3>
            <p>Choose where you want to add or manage widgets.</p>
        </div>
    </div>

    <Radio.Group
        value={selectedDashboard}
        onChange={(e) => {
            setSelectedDashboard(e.target.value);
            setSelectedWidgets([]);
            setSaved(false);
        }}
        className="dashboard-selection-options"
    >
        <Radio.Button value="station">
            <FontAwesomeIcon icon={faGasPump} />
            <span>Station Dashboard</span>
        </Radio.Button>

        <Radio.Button value="organization">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span>Organization Dashboard</span>
        </Radio.Button>
    </Radio.Group>
</Card>
            {/* SUMMARY */}

            <Row gutter={[16, 16]} className="widget-summary-row">

                <Col xs={24} sm={12} lg={8}>
                    <Card className="widget-summary-card">
                        <div className="widget-summary-content">
                            <div>
                                <span>Available Widgets</span>
                                <h2>{widgetLibrary.length}</h2>
                            </div>

                            <div className="widget-summary-icon blue">
                                <FontAwesomeIcon icon={faLayerGroup} />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className="widget-summary-card">
                        <div className="widget-summary-content">
                            <div>
                                <span>Selected Widgets</span>
                                <h2>{selectedCount}</h2>
                            </div>

                            <div className="widget-summary-icon green">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className="widget-summary-card">
                        <div className="widget-summary-content">
                            <div>
                                <span>Remaining Widgets</span>
                                <h2>
                                    {widgetLibrary.length - selectedCount}
                                </h2>
                            </div>

                            <div className="widget-summary-icon orange">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </Card>
                </Col>

            </Row>

            {/* MAIN CONTENT */}

            <Row gutter={[18, 18]} className="widget-main-layout">

                {/* LEFT: WIDGET LIBRARY */}

                <Col xs={24} xl={16}>

                    <Card className="widget-library-card">

                        <div className="widget-section-heading">

                            <div>
                                <h3>Widget Library</h3>
                                <p>
                                    Browse and select widgets for your dashboard.
                                </p>
                            </div>

                            <Badge
                                count={filteredWidgets.length}
                                showZero
                                color="#2563EB"
                            />

                        </div>

                        {/* SEARCH */}

                        <div className="widget-search-row">

                            <Input
                                prefix={
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                    />
                                }
                                placeholder="Search widgets..."
                                allowClear
                                value={searchValue}
                                onChange={e =>
                                    setSearchValue(e.target.value)
                                }
                                size="large"
                            />

                            <Select
                                value={activeCategory}
                                onChange={setActiveCategory}
                                options={categories.map(category => ({
                                    label: category,
                                    value: category
                                }))}
                                size="large"
                                className="widget-category-select"
                            />

                        </div>

                        {/* FILTER TABS */}

                        <div className="widget-filter-tabs">

                            {categories.map(category => (

                                <button
                                    key={category}
                                    className={
                                        activeCategory === category
                                            ? "widget-filter active"
                                            : "widget-filter"
                                    }
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                >
                                    {category}
                                </button>

                            ))}

                        </div>

                        <Divider />

                        {/* WIDGET CARDS */}

                        <Row gutter={[14, 14]}>

                            {filteredWidgets.map(widget => {

                                const isAdded =
                                    selectedWidgets.includes(widget.id);

                                return (

                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={8}
                                        key={widget.id}
                                    >

                                        <Card
                                            hoverable
                                            className={`available-widget-card ${
                                                isAdded ? "widget-added" : ""
                                            }`}
                                        >

                                            <div className="available-widget-top">

                                                <div
                                                    className="available-widget-icon"
                                                    style={{
                                                        color: widget.color,
                                                        backgroundColor:
                                                            `${widget.color}14`
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={widget.icon}
                                                    />
                                                </div>

                                                {isAdded && (
                                                    <Tag color="success">
                                                        Added
                                                    </Tag>
                                                )}

                                            </div>

                                            <div className="available-widget-info">

                                                <h4>{widget.name}</h4>

                                                <p>
                                                    {widget.description}
                                                </p>

                                            </div>

                                            {/* PREVIEW */}

                                            <div className="widget-mini-preview">

                                                <div>
                                                    <span>
                                                        {widget.previewLabel}
                                                    </span>

                                                    <strong>
                                                        {widget.previewValue}
                                                    </strong>
                                                </div>

                                                <Tooltip title="Widget preview">
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="widget-preview-eye"
                                                    />
                                                </Tooltip>

                                            </div>

                                            <Button
                                                block
                                                type={isAdded ? "default" : "primary"}
                                                disabled={isAdded}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                }
                                                onClick={() =>
                                                    addWidget(widget.id)
                                                }
                                            >
                                                {isAdded ? "Already Added" : "Add Widget"}
                                            </Button>

                                        </Card>

                                    </Col>

                                );

                            })}

                        </Row>

                        {filteredWidgets.length === 0 && (
                            <Empty
                                description="No matching widgets found"
                                className="widget-empty-state"
                            />
                        )}

                    </Card>

                </Col>

                {/* RIGHT: SELECTED WIDGETS */}

                <Col xs={24} xl={8}>

                    <Card className="selected-widgets-card">

                        <div className="widget-section-heading">

                            <div>
                                <h3>My Dashboard Widgets</h3>
                                <p>
                                    Your selected dashboard components.
                                </p>
                            </div>

                            <Tag color="blue">
                                {selectedCount} Selected
                            </Tag>

                        </div>

                        <div className="selected-widget-list">

                            {selectedWidgets.map((id, index) => {

                                const widget = getWidget(id);

                                if (!widget) return null;

                                return (

                                    <div
                                        className="selected-widget-item"
                                        key={id}
                                    >

                                        <div className="selected-widget-number">
                                            {index + 1}
                                        </div>

                                        <div
                                            className="selected-widget-icon"
                                            style={{
                                                color: widget.color,
                                                backgroundColor:
                                                    `${widget.color}14`
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={widget.icon}
                                            />
                                        </div>

                                        <div className="selected-widget-info">
                                            <strong>{widget.name}</strong>
                                            <span>{widget.category}</span>
                                        </div>

                                        <Tooltip title="Remove widget">

                                            <Button
                                                type="text"
                                                danger
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                }
                                                onClick={() =>
                                                    removeWidget(id)
                                                }
                                            />

                                        </Tooltip>

                                    </div>

                                );

                            })}

                            {selectedCount === 0 && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="No widgets selected yet"
                                />
                            )}

                        </div>

                        <Divider />

                        <div className="selected-widget-footer">

                            <div className="selected-footer-info">
                                <span>Selected components</span>
                                <strong>{selectedCount} Widgets</strong>
                            </div>

                            <Button
                                block
                                type="primary"
                                size="large"
                                icon={
                                    <FontAwesomeIcon
                                        icon={faFloppyDisk}
                                    />
                                }
                                onClick={saveConfiguration}
                            >
                                Save My Dashboard
                            </Button>

                            {saved && (
                                <div className="widget-saved-message">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Configuration saved successfully
                                </div>
                            )}

                        </div>

                    </Card>

                </Col>

            </Row>

        </div>
    );
}
