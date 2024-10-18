import { Table, Button } from "antd";

const data = [
  {
    key: "1",
    name: "Điện thoại",
    password: "111111111",
    email: "hoanghaihyh@gmail.com",
  },
  {
    key: "2",
    name: "Bàn phím",
    password: "111111111",
    email: "hoanghaihyh@gmail.com",
  },
  {
    key: "3",
    name: "Tai nghe",
    password: "111111111",
    email: "hoanghaihyh@gmail.com",
  },
  {
    key: "4",
    name: "Đèn học",
    password: "111111111",
    email: "hoanghaihyh@gmail.com",
  },
  {
    key: "5",
    name: "Lót chuột",
    password: "111111111",
    email: "hoanghaihyh@gmail.com",
  },
];

function UserAdmin() {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "UserName",
      dataIndex: "name",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: () => (
        <span className="action-product">
          <Button type="primary" danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
}

export default UserAdmin;
