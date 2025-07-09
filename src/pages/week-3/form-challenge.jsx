import {
  App,
  Button,
  Card,
  Divider,
  Form,
  message,
  Steps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  Step1Form,
  Step2Form,
  Step3Form,
  Step4Form,
  Summary,
  TitleCard,
} from "../../components";

export default function Week3ChallengeForm() {
  const [form] = Form.useForm();
  const { modal } = App.useApp();
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const handleBack = () => {
    saveToLocalStorage();
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    if (current < 4) {
      saveToLocalStorage();
    }

    setCurrent((prev) => prev + 1);
  };

  const saveToLocalStorage = () => {
    const formData = form.getFieldsValue(true);
    localStorage.setItem(`form_data`, JSON.stringify(formData));
  };

  const showModal = () => {
    modal.confirm({
      title: "Confirmation",
      icon: <></>,
      okText: "Submit",
      content: "Are you sure you want to submit your data?",
      closable: true,
      onOk: () => formSubmit(),
    });
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const formSubmit = async () => {
    try {
      const localData = localStorage.getItem("list_form");
      const formData = form.getFieldsValue(true);
      const listData = [...(JSON.parse(localData) || []), formData];

      localStorage.setItem("list_form", JSON.stringify(listData));

      await delay(2000);

      form.resetFields();
      setCurrent(0);

      messageApi.open({
        type: "success",
        content: "Data submitted successfully!",
      });

      localStorage.removeItem("form_data");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    try {
      const formData = localStorage.getItem(`form_data`);

      if (formData) {
        form.setFieldsValue(JSON.parse(formData));
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  return (
    <>
      {contextHolder}

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
        initialValues={DEFAULT_INITIAL_VALUES}
        layout="vertical"
        onFinish={() => {
          if (current < 4) {
            handleNext();
          } else {
            showModal();
          }
        }}
      >
        <div className="flex flex-col gap-4 items-end w-full">
          <Card className="!mt-4 w-full">{steps[current].content}</Card>

          <div className="flex gap-2">
            {current > 0 && <Button onClick={handleBack}>Back</Button>}

            <Button htmlType="submit" type="primary">
              {current < 4 ? "Next" : "Submit"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}

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
    content: <Step4Form />,
  },
  {
    title: "Summary",
    content: <Summary />,
  },
];

const DEFAULT_INITIAL_VALUES = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  address: "",
  password: "",
  confirm_password: "",
  security_question: "",
  security_question_answer: "",
  profile_image_url: "",
  bio: "",
  agreement: false,
  newsletter: false,
};
