import { Checkbox, Form, Image, Input, Typography } from "antd";

export default function Summary() {
  const form = Form.useFormInstance();
  const formData = form.getFieldsValue(true);

  console.log(formData, "===> DATA AKHIR");

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(formData).map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <Typography.Text type="secondary" className="capitalize">
            {item[0].replace("_", " ")}
          </Typography.Text>

          {typeof item[1] !== "string" ? (
            <Checkbox checked={item[1]}>
              {item[0] === "newsletter"
                ? "Receive product updates and release notes"
                : "Agree with rules & policy"}
            </Checkbox>
          ) : item[0].includes("password") ? (
            <Input.Password
              visibilityToggle
              readOnly={true}
              className="cursor-default"
              value={item[1]}
            />
          ) : (
            <Input
              readOnly={true}
              className="cursor-default"
              value={item[0] === "phone_number" ? "+62" + item[1] : item[1]}
            />
          )}

          {item[0] === "profile_image_url" && (
            <Image
              src={item[1]}
              width={150}
              height={150}
              alt="profile-img"
              className="object-fit rounded-md w-[150] h-[150] mt-2"
            />
          )}
        </div>
      ))}
    </div>
  );
}
