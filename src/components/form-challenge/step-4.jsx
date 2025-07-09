import { Checkbox, Form, Input } from "antd";

export default function Step4Form() {
  return (
    <>
      <Form.Item
        name="profile_image_url"
        label="Profile Image URL"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Profile Image URL is required!" },
          { type: "url", message: "Invalid url format!" },
        ]}
      >
        <Input placeholder="e.g. https://your-profile-image-url.com" />
      </Form.Item>

      <Form.Item
        name="bio"
        label="Bio"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Bio is required!" }]}
      >
        <Input.TextArea
          maxLength={255}
          rows={3}
          showCount
          placeholder="Enter your bio"
        />
      </Form.Item>

      <Form.Item name="newsletter" valuePropName="checked" className="!m-0">
        <Checkbox>Receive product updates and release notes</Checkbox>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        className="!m-0"
        rules={[
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject();
              }

              return Promise.resolve();
            },
            message: "To proceed, you need to accept the rules and policies.",
          },
        ]}
      >
        <Checkbox>
          Agree with{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            rules & policies
          </a>
        </Checkbox>
      </Form.Item>
    </>
  );
}
