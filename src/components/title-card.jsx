import { theme } from "antd";

export default function TitleCard({ children }) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${token.colorPrimary}, ${token.colorPrimaryHover})`,
      }}
      className={`w-full py-4 px-6 rounded-md`}
    >
      {children}
    </div>
  );
}
