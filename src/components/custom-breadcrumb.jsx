import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";

export default function CustomBreadcrumb(props) {
  return (
    <Breadcrumb
      {...props}
      className="!pl-[2px]"
      itemRender={(route) => {
        return <Link to={route.href}>{route.title}</Link>;
      }}
    />
  );
}
