import { Form, Input } from "antd";
import { onlyAlphanumeric, onlyNumeric } from "../../utils";

export default function Step2Form() {
  return (
    <>
      <Form.Item
        name="email"
        label="Email"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Email is required!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input placeholder="e.g. someone@mail.com" />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Phone Number is required!" }]}
        normalize={(value) => {
          if (value.startsWith("0")) {
            return value.slice(1);
          }

          return value;
        }}
      >
        <Input
          addonBefore="+62"
          maxLength={16}
          showCount
          onKeyDown={onlyNumeric}
          placeholder="Enter your phone number"
        />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Address is required!" }]}
      >
        <Input.TextArea
          rows={3}
          maxLength={255}
          showCount
          placeholder="Enter your address"
          onKeyDown={onlyAlphanumeric}
        />
      </Form.Item>
    </>
  );
}
