import { Form, Input } from "antd";
import { onlyAlphanumeric } from "../../utils";

export default function Step1Form() {
  return (
    <>
      <Form.Item
        name="first_name"
        label="First Name"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "First Name is required!" }]}
      >
        <Input placeholder="Enter your first name" />
      </Form.Item>

      <Form.Item
        name="last_name"
        label="Last Name"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Last Name is required!" }]}
      >
        <Input placeholder="Enter your last name" />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Username is required!" }]}
        normalize={(value) => {
          return value.toUpperCase();
        }}
      >
        <Input
          maxLength={16}
          showCount
          placeholder="Enter username"
          onKeyDown={onlyAlphanumeric}
          onPaste={(e) => e.preventDefault()}
        />
      </Form.Item>
    </>
  );
}
