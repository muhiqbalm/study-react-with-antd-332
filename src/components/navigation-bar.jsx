import {
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu, theme } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = ({ items }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(pathname);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const componentWidth = collapsed ? 80 : 256;

  return (
    <div
      style={{
        width: componentWidth,
        backgroundColor: token.colorBgContainer,
      }}
      className="flex flex-col"
    >
      <div
        style={{
          width: componentWidth,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
        className="flex items-center h-6"
      ></div>

      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        inlineCollapsed={collapsed}
        className="h-[calc(100vh-32px-24px)]"
        items={items}
        onSelect={(item) => {
          setSelectedKey(item.key);
          navigate(item.key);
        }}
      />

      <Button
        style={{ width: componentWidth }}
        type="primary"
        className="rounded-none"
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default NavigationBar;
