import { Button, Card, Divider, Form, Steps, Typography } from "antd";
import { useState } from "react";
import { Step1Form, Step2Form, Step3Form, TitleCard } from "../../components";

export default function Week3ChallengeForm() {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const steps = [
    {
      title: "Personal Info",
      content: <Step1Form />,
    },
    {
      title: "Contact Details",
      content: <Step2Form />,
    },
    {
      title: "Security",
      content: <Step3Form />,
    },
    {
      title: "Profile & Preferences",
      content: "Last-content",
    },
    {
      title: "Summary",
      content: "Last-content",
    },
  ];

  return (
    <>
      <TitleCard>
        <Typography.Title level={2} className="!m-0">
          Form Challenge
        </Typography.Title>

        <Typography.Text>
          Learning built complex form with Antd Form.
        </Typography.Text>
      </TitleCard>

      <Divider />

      <Typography.Title level={3}>Customer Registration</Typography.Title>

      <Steps
        current={current}
        className="!mb-4"
        items={steps.map((item) => ({ key: item.title, title: item.title }))}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          if (current < 4) {
            setCurrent((prev) => prev + 1);
          }
        }}
      >
        <div className="flex flex-col gap-4 items-end w-full">
          <Card className="!mt-4 w-full">{steps[current].content}</Card>

          <div className="flex gap-2">
            {current > 0 && <Button onClick={handleBack}>Back</Button>}

            <Button htmlType="submit" type="primary">
              Next
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
