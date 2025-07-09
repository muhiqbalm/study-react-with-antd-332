import { App, Button, Divider, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { TitleCard } from "../../components";
import { DeleteFilled } from "@ant-design/icons";

export default function Week3ListTable({}) {
  const { modal } = App.useApp();
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "No",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
    { title: "Username", dataIndex: "username" },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      render: (value, row, index) => {
        return "+62" + value;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      align: "center",
      render: (_, row, index) => (
        <Tooltip title="Delete Data">
          <Button
            danger
            icon={<DeleteFilled />}
            onClick={() => {
              modal.confirm({
                icon: <></>,
                title: "Confirmation",
                content: "Are you sure you want to delete this data?",
                okText: "Delete",
                okButtonProps: { danger: true },
                onOk: () => handleDelete(index),
              });
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const handleDelete = async (deletedIndex) => {
    try {
      const filteredData = data.filter((_, index) => index !== deletedIndex);

      localStorage.setItem("list_form", JSON.stringify(filteredData));

      getLocalData();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getLocalData = () => {
    const localData = localStorage.getItem("list_form");

    if (localData) {
      setData(JSON.parse(localData));
    }
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <>
      <TitleCard>
        <Typography.Title level={2} className="!m-0">
          List Data Form Challenge
        </Typography.Title>

        <Typography.Text>
          Contains data that submitted through form challenge.
        </Typography.Text>
      </TitleCard>

      <Divider />

      <Table columns={columns} dataSource={data} />
    </>
  );
}
