import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonFilled,
  SunFilled,
} from "@ant-design/icons";
import { Button, Menu, theme } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context";

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

  const { themeData, toggleTheme } = useTheme();

  return (
    <div
      style={{
        width: componentWidth,
        backgroundColor: token.colorBgContainer,
      }}
      className="flex flex-col relative"
    >
      <div className="w-full flex items-center px-6 my-6">
        <Button
          size="large"
          onClick={toggleTheme}
          icon={themeData === "light" ? <SunFilled /> : <MoonFilled />}
          className="w-max"
        />
      </div>

      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        inlineCollapsed={collapsed}
        className="h-[calc(100vh-120px)]"
        items={items.map((item) => ({
          ...item,
          children: Array.isArray(item.children)
            ? item.children.filter((child) => child.show !== false)
            : undefined,
        }))}
        onSelect={(item) => {
          setSelectedKey(item.key);
          navigate(item.key);
        }}
      />

      <Button
        style={{ width: componentWidth }}
        type="primary"
        className="rounded-none !absolute !z-[999] bottom-0"
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default NavigationBar;
