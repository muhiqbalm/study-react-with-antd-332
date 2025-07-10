import { DesktopOutlined, HomeOutlined } from "@ant-design/icons";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  NotFoundPage,
  Week3ChallengeForm,
  Week3DetailData,
  Week3ListTable,
} from "./pages";
import { ProtectedLayout, UnprotectedLayout } from "./layouts";
import { ThemeProvider, useTheme } from "./context";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

function MainContent() {
  const { themeData } = useTheme();

  console.log(themeData, "app");

  return (
    <ConfigProvider
      key={themeData}
      theme={{
        algorithm:
          themeData === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <AntdApp>
        <Routes>
          <Route path="/" element={<ProtectedLayout items={protectedItems} />}>
            {generateRoutes(protectedItems)}
          </Route>

          <Route path="/" element={<UnprotectedLayout />}>
            {generateRoutes(publicItems)}
          </Route>
        </Routes>
      </AntdApp>
    </ConfigProvider>
  );
}

const protectedItems = [
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
      {
        key: "/week-3/list",
        label: "List Table",
        element: (
          <>
            <Week3ListTable />
          </>
        ),
      },
      {
        key: "/week-3/list",
        path: "/week-3/list/:id",
        label: "Detail Data",
        show: false,
        element: <Week3DetailData />,
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
        element: <></>,
      },
    ],
  },
];

const publicItems = [
  {
    key: "/login",
    label: "Login",
    element: (
      <>
        <h1>LOGIN</h1>
      </>
    ),
  },
  {
    key: "*",
    label: "Not Found",
    element: <NotFoundPage />,
  },
];

function generateRoutes(items) {
  const routes = [];

  items.forEach((item) => {
    if (item.element) {
      routes.push(
        <Route
          key={item.key}
          path={item.path ?? item.key}
          element={item.element}
        />
      );
    }

    if (item.children) {
      routes.push(...generateRoutes(item.children));
    }
  });

  return routes;
}

export default App;
