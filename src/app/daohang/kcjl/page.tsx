"use client";
import { useEffect, useState } from "react";
import { Table,Button,Input } from "antd";
import { Modal } from "antd";
const { Column, ColumnGroup } = Table;
import fetch from "@/instannces/fetch";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [data, setData] = useState<any>([]);
  const [status, setStatus] = useState<boolean>(false);
  function getdata() {
    fetch("/kucunlist").then((res: any) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
       <Modal title="添加库存" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder="请输入库存名称"  style={{width:'70%'}}/> <br />
          <Input placeholder="请输入库存数量" style={{width:'70%'}} />
      </Modal>
      <div>
        <Button onClick={()=>{
          showModal()
        }}>添加库存</Button>
      </div>
      <div>
        {status ? (
          <Table style={{ width: "70vw" }} dataSource={data}>
            <Column title="名称" dataIndex="name" key="name" />
            <Column title="数量" dataIndex="count" key="count" />
            <Column title="出库时间" dataIndex="count" key="count" />
            <Column title="数量" dataIndex="count" key="count" />
          </Table>
        ) : (
          <Table style={{ width: "70vw" }} dataSource={data}>
            <Column title="名称" dataIndex="name" key="name" />
            <Column title="数量" dataIndex="count" key="count" />
            <Column title="入库时间" dataIndex="count" key="count" />
            <Column title="数量" dataIndex="count" key="count" />
          </Table>
        )}
      </div>
    </div>
  );
}
