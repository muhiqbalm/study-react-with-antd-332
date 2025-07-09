import { theme } from "antd";
import NavigationBar from "../components/navigation-bar";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout({ items }) {
  const { token } = theme.useToken();

  return (
    <div
      className="flex w-screen max-w-screen h-screen"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <NavigationBar items={items} />

      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
