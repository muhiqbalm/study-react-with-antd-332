import { Form, Input, Select } from "antd";
import { passwordValidation } from "../../utils";

export default function Step3Form() {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Password is required!" },
          {
            validator: (_, value) => {
              if (value && !passwordValidation(value)) {
                return Promise.reject();
              }

              return Promise.resolve();
            },
            message:
              "Password must contain  at least 1 uppercase, 1 lowercase, 1 number, and 1 character.",
          },
        ]}
      >
        <Input.Password
          visibilityToggle={true}
          placeholder="Enter password"
          onBlur={() => {
            const confirmPassword = form.getFieldValue("confirm_password");

            if (confirmPassword) {
              form.validateFields(["confirm_password"]);
            }
          }}
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.password !== curr.password}
      >
        {({ getFieldValue }) => {
          const password = getFieldValue("password");

          return (
            <Form.Item
              name="confirm_password"
              label="Confirm Password"
              rules={[
                { required: true, message: "Confirm Password is required!" },
                {
                  validator: (_, value) => {
                    if (value && value !== password) {
                      return Promise.reject();
                    }

                    return Promise.resolve();
                  },
                  message: "Password doesn't match!",
                },
              ]}
            >
              <Input.Password
                visibilityToggle={true}
                placeholder="Enter password"
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item
        name="security_question"
        label="Security Question"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Security Question is required!" }]}
      >
        <Select
          allowClear
          placeholder="Choose your security question"
          options={SECURITY_QUESTIONS.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="security_question_answer"
        label="Security Question Answer"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Security Question Answer is required!" },
          { min: 8, message: "Answer must be at least 8 letter!" },
        ]}
      >
        <Input placeholder="Enter security question answer" />
      </Form.Item>
    </>
  );
}

const SECURITY_QUESTIONS = [
  "Who is your first pet?",
  "What is your favorite food?",
  "What is your favorite color?",
  "What is your hobby?",
];
