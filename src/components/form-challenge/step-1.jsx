import { Form, Input } from "antd";
import { useLocalData } from "../../hooks";
import { onlyAlphanumeric } from "../../utils";

export default function Step1Form() {
  const [localData] = useLocalData("list_form");

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
        rules={[
          { required: true, message: "Username is required!" },
          {
            validator: (_, value) => {
              const isExists = localData.some(
                (item) => item.username === value
              );

              if (value && isExists) {
                return Promise.reject();
              }

              return Promise.resolve();
            },
            message: "Username already taken!",
          },
        ]}
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
