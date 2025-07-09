import { DesktopOutlined, HomeOutlined } from "@ant-design/icons";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components";
import { RegistrationForm, Week3ChallengeForm } from "./pages";

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
    element: <></>,
  },
  {
    key: "/week-3",
    icon: <DesktopOutlined />,
    label: "Week 3",
    children: [
      {
        key: "/week-3/form",
        label: "Form Challenge",
        element: <Week3ChallengeForm />,
      },
    ],
  },
  {
    key: "/week-4",
    icon: <DesktopOutlined />,
    label: "Week 4",
    children: [
      {
        key: "/week-3/day-1",
        label: "Day 1",
        element: (
          <>
            <RegistrationForm />
          </>
        ),
      },
    ],
  },
];

function generateRoutes(items) {
  const routes = [];

  items.forEach((item) => {
    if (item.element) {
      routes.push(
        <Route key={item.key} path={item.key} element={item.element} />
      );
    }

    if (item.children) {
      routes.push(...generateRoutes(item.children));
    }
  });

  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <AntdApp>
          <AppLayout items={items}>
            <Routes>{generateRoutes(items)}</Routes>
          </AppLayout>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
