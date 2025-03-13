"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // 使用命名导入
import { Table } from "antd";
import { Modal, Button,Input,Select } from "antd";
const { Column, ColumnGroup } = Table;
import axios from "../../../instannces/axios";
const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [selececate,setSelececate] = useState('')
  const [shopdata,setShopdata] = useState([])
  //获取商品数据
  function getdata (){
    axios.get("/shoplist").then(res=>{
      console.log(res)
      setShopdata(res.data.data)
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },{
      title:"爱好",
      dataIndex:"hobby",
      key:"hobby"
    },{
      title:"技能",
      dataIndex:"jineng",
      key:"jineng"
    }
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 处理文件上传
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // 获取上传的文件
    if (!file) return;

    // 使用FileReader读取文件
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;

      // 解析Excel文件
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // 获取工作簿的第一个表格
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log(worksheet);

      // 将表格数据转化为JSON格式
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);

      // 设置到状态中
      setExcelData(jsonData);
    };

    // 读取文件
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
      读取Excel文件
      </Button>
      <Modal
        title="读取Excel文件"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <div>
          <h2>Excel数据:</h2>
          <Button onClick={()=>{
            for(let i=0;i<excelData.length;i++){
              let excelDatas=excelData[i];
              console.log(excelDatas);
              
              axios.post("/addshop",excelDatas,{
                headers:{
                  "Content-Type":"application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                }
              }).then(res=>{
                console.log(res);
              })
            }
          }}>上传到数据库</Button>
        </div>
        <Table dataSource={excelData}  columns={columns} />;
      </Modal>
      <Input placeholder="请输入商品名称"></Input>
      <Select
        style={{ width: 120 }}
        placeholder="请选择商品类型"
          options={[
            { value: "女装", label: "女装" },
            { value: "男装", label: "男装" },
          ]}
      ></Select>
      <Button>搜索</Button>
      <Button>添加商品</Button>
      <Table dataSource={shopdata}>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
        <Column title="商品名称" dataIndex="name" key="_id"></Column>
      </Table>
    </div>
  );
};

export default ExcelReader;
