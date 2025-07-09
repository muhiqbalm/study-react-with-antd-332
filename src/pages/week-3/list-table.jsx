import { App, Button, Divider, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { TitleCard } from "../../components";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLocalData } from "../../hooks";

export default function Week3ListTable({}) {
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [localData, refetch] = useLocalData("list_form");

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
        <div className="flex gap-2 justify-center">
          <Tooltip title="Detail">
            <Button
              icon={<EyeFilled />}
              onClick={() => {
                navigate(`/week-3/list/${row.id}`);
              }}
            />
          </Tooltip>

          <Tooltip title="Remove">
            <Button
              icon={<DeleteFilled className="!text-red-500" />}
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
        </div>
      ),
    },
  ];

  const handleDelete = async (deletedIndex) => {
    try {
      const filteredData = localData.filter(
        (_, index) => index !== deletedIndex
      );

      localStorage.setItem("list_form", JSON.stringify(filteredData));

      refetch();
    } catch (error) {
      console.log(error, "error");
    }
  };

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

      <Table columns={columns} dataSource={localData} rowKey={"id"} />
    </>
  );
}
