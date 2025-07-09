import { Card, Checkbox, Divider, Image, Input, Typography } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CustomBreadcrumb, TitleCard } from "../../components";
import { useLocalData } from "../../hooks";

export default function Week3DetailData({}) {
  const { id } = useParams();
  const [localData] = useLocalData("list_form");

  const currentData = useMemo(() => {
    if (!id) return;

    const selectedData = localData?.find((item) => item.id === id);
    return selectedData;
  }, [localData, id]);

  return (
    <>
      <TitleCard>
        <Typography.Title level={2} className="!m-0">
          Detail Data
        </Typography.Title>

        <CustomBreadcrumb
          items={[
            { key: "home", href: "/", title: "Home" },
            { key: "list", href: "/week-3/list", title: "List Data" },
            {
              key: "detail-data",
              href: `/week-3/list/${currentData?.id}`,
              title: currentData?.username,
            },
          ]}
        />
      </TitleCard>

      <Divider />

      <Card>
        <div className="flex flex-col gap-4">
          {Object.entries(currentData).map((item, index) => (
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
                  className="object-fit rounded-md h-full w-full mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
