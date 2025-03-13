"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select,Input,message } from "antd";

const { Column, ColumnGroup } = Table;

export default function App() {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert("添加成功");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function getcates() {
    fetch("/catelist").then((res) => {
      console.log(res);
      console.log('2323');
      
    });
  }
  function addcate() {
    fetch("/addcate", {
      method: "POST",
    });
  }
  useEffect(() => {
    getcates();
  }, []);
  return (
    <div>
      <Modal
        title="添加分类"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <Input placeholder="请输入分类名称" onClick={(e)=>{
// 将 e.target 类型断言为 HTMLInputElement，以访问其 value 属性
        setInputValue((e.target as HTMLInputElement).value)
       }}></Input>
      </Modal>

      <Button onClick={showModal}>添加分类</Button>
      <Table style={{ width: "70vw" }}>
        <Column title="Name" dataIndex="name" key="name" />
      </Table>
    </div>
  );
}
