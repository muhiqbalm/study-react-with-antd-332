import { theme } from "antd";
import { Outlet } from "react-router-dom";

export default function UnprotectedLayout() {
  const { token } = theme.useToken();

  return (
    <div
      className="flex w-screen max-w-screen h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${token.colorBgBase}, ${token.colorBgElevated})`,
      }}
    >
      <Outlet />
    </div>
  );
}
