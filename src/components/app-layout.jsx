import { theme } from "antd";
import NavigationBar from "./navigation-bar";

export default function AppLayout({ children, items }) {
  const { token } = theme.useToken();

  return (
    <div
      className="flex w-screen max-w-screen h-screen"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <NavigationBar items={items} />

      <div className="flex-1 flex flex-col p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
