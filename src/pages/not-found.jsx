import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Typography.Title level={1} className="!m-0 !text-8xl">
        404
      </Typography.Title>

      <Typography.Title level={3}>Not Found</Typography.Title>

      <Button type="link" onClick={() => navigate(-1)} className="mt-8">
        Go Back
      </Button>
    </>
  );
}
