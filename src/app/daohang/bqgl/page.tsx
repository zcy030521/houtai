"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select,Input,message } from "antd";
import fetch from "@/instannces/fetch"
const { Column } = Table;
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
    fetch("/addbq",{
      method:"POST",
      body:JSON.stringify({
        name:inputValue
      })
    }).then(res=>{
      if(res.code==200){
        alert("添加成功");
        getcates()
      }
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getcates() {
    let data = await fetch("/bqlist")
    setData(data.data)
    
  }
  useEffect(() => {
    getcates();
  }, []);
  return (
    <div>
      <Modal
        title="添加标签"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <Input placeholder="请输入分类名称" onInput={(e)=>{
        console.log(e.target.value);
        
        setInputValue((e.target as HTMLInputElement).value)
       }}></Input>
      </Modal>

      <Button onClick={showModal}>添加标签</Button>
      <Table style={{ width: "70vw" }} dataSource={data}>
        <Column title="Name" dataIndex="name" key="_id" />
        <Column title="操作" dataIndex="_id" key="_id" render={(_,record)=>{
          return <Button onClick={()=>{
              fetch("/delectcate?id="+record._id).then(res=>{
                if(res.code==200){
                  alert("删除成功");
                  getcates()
                }
              
              })

              console.log(record);
              
          }}>删除</Button>
        }} />
      </Table>
    </div>
  );
}
