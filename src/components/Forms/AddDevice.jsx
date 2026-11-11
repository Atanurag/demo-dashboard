
import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMicrochip,
  faSliders,
  faLocationDot,
  faFloppyDisk,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

// import { useNavigate } from "react-router-dom";
import "./AddDevice.css";

const { Title, Text } = Typography;
const { Option } = Select;

// Reusable form section
const FormSection = ({ icon, title, description, children }) => {
  return (
    <section className="form-section">
      <div className="form-section-heading">
        <div className="form-section-icon">
          <FontAwesomeIcon icon={icon} />
        </div>

        <div>
          <Title level={5}>{title}</Title>
          <Text type="secondary">{description}</Text>
        </div>
      </div>

      <div className="form-section-content">
        {children}
      </div>
    </section>
  );
};

// Reusable form field
const FormField = ({
  label,
  name,
  required = false,
  rules = [],
  children,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        ...(required
          ? [{ required: true, message: `Please enter/select ${label}` }]
          : []),
        ...rules,
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default function AddDevice() {
// const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleBack = () => {
    // navigate(-1);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Device Form Data:", values);

      // Connect your existing Add Device API here.
      // Example:
      // await handleAPICall(apiUrl, "POST", values);

      message.success("Device form validated successfully!");

    } catch (error) {
      console.error("Device submission error:", error);
      message.error("Unable to submit device details.");
    }
  };

  return (
    <div className="modern-form-page">

      {/* PAGE HEADER */}
      <div className="modern-form-header">
        <button
          type="button"
          className="form-back-button"
          onClick={handleBack}
          title="Go back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div className="form-header-content">
          <Title level={3}>Add New Device</Title>
          <Text type="secondary">
            Register and configure a new device for your station.
          </Text>
        </div>
      </div>

      {/* FORM CARD */}
      <Card className="modern-form-card" bordered={false}>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            device_name: "DU3",
            fuel_type: "LPG",
            device_type: "DU",
            manufacturer: "CFT",
            status: "Enable",
          }}
          requiredMark="optional"
          autoComplete="off"
        >

          {/* SECTION 1 */}
          <FormSection
            icon={faMicrochip}
            title="Device Information"
            description="Enter the basic identification details of your device."
          >
            <Row gutter={[24, 4]}>

              <Col xs={24} md={12}>
                <FormField
                  label="IMEI (Device ID)"
                  name="imei"
                  required
                  rules={[
                    {
                      whitespace: true,
                      message: "IMEI cannot be empty",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter device IMEI number"
                    maxLength={20}
                  />
                </FormField>
              </Col>

              <Col xs={24} md={12}>
                <FormField
                  label="Device Name"
                  name="device_name"
                  required
                >
                  <Select
                    size="large"
                    placeholder="Select device name"
                  >
                    <Option value="DU1">DU1</Option>
                    <Option value="DU2">DU2</Option>
                    <Option value="DU3">DU3</Option>
                    <Option value="DU4">DU4</Option>
                    <Option value="ATG1">ATG1</Option>
                  </Select>
                </FormField>
              </Col>

              <Col xs={24} md={12}>
                <FormField
                  label="Display Name"
                  name="display_name"
                >
                  <Input
                    size="large"
                    placeholder="Enter display name"
                    maxLength={100}
                  />
                </FormField>
              </Col>

              <Col xs={24} md={12}>
                <FormField
                  label="Fuel Type"
                  name="fuel_type"
                  required
                >
                  <Select
                    size="large"
                    placeholder="Select fuel type"
                  >
                    <Option value="Petrol">Petrol</Option>
                    <Option value="Diesel">Diesel</Option>
                    <Option value="CNG">CNG</Option>
                    <Option value="LPG">LPG</Option>
                    <Option value="AdBlue">AdBlue BS6</Option>
                  </Select>
                </FormField>
              </Col>

            </Row>
          </FormSection>

          <Divider />

          {/* SECTION 2 */}
          <FormSection
            icon={faSliders}
            title="Device Configuration"
            description="Configure the device type and manufacturer."
          >
            <Row gutter={[24, 4]}>

              <Col xs={24} md={12}>
                <FormField
                  label="Type of Device"
                  name="device_type"
                  required
                >
                  <Select
                    size="large"
                    placeholder="Select device type"
                  >
                    <Option value="DU">DU</Option>
                    <Option value="ATG">ATG</Option>
                    <Option value="Valve">Valve</Option>
                    <Option value="Relay">Relay</Option>
                  </Select>
                </FormField>
              </Col>

              <Col xs={24} md={12}>
                <FormField
                  label="Manufacturer"
                  name="manufacturer"
                  required
                >
                  <Select
                    size="large"
                    placeholder="Select manufacturer"
                  >
                    <Option value="CFT">CFT</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </FormField>
              </Col>

            </Row>
          </FormSection>

          <Divider />

          {/* SECTION 3 */}
          <FormSection
            icon={faLocationDot}
            title="Station Assignment"
            description="Assign the device to a station and configure its status."
          >
            <Row gutter={[24, 4]}>

              <Col xs={24} md={12}>
                <FormField
                  label="Station"
                  name="station"
                  required
                >
                  <Select
                    size="large"
                    showSearch
                    optionFilterProp="children"
                    placeholder="Search and select station"
                  >
                    <Option value="Lalbaugh">Lalbaugh</Option>
                  </Select>
                </FormField>
              </Col>

              <Col xs={24} md={12}>
                <FormField
                  label="Status"
                  name="status"
                  required
                >
                  <Select
                    size="large"
                    placeholder="Select status"
                  >
                    <Option value="Enable">Enable</Option>
                    <Option value="Disable">Disable</Option>
                  </Select>
                </FormField>
              </Col>

            </Row>
          </FormSection>

          {/* ACTION FOOTER */}
          <div className="modern-form-actions">
            <Text type="secondary">
              Fields marked with * are required.
            </Text>

            <Space size={12}>
              <Button
                size="large"
                onClick={handleReset}
                icon={<FontAwesomeIcon icon={faRotateLeft} />}
              >
                Reset
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                className="form-submit-button"
              >
                Save Device
              </Button>
            </Space>
          </div>

        </Form>
      </Card>
    </div>
  );
}
