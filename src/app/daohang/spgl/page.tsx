"use client";
import React, { useEffect, useState,useRef } from "react";
import * as XLSX from "xlsx"; // 使用命名导入
import { Table } from "antd";
import { Modal, Button,Input,Select } from "antd";
const { Column, ColumnGroup } = Table;
import axios from "../../../instannces/axios";
import fetch from '@/instannces/fetch'

const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [selececate,setSelececate] = useState('')
  const [shopdata,setShopdata] = useState([])
  const [optionlist,setOptionlist] = useState([])
  const inputRef = useRef(null);
  //获取商品数据
  function getdata (){
    axios.get("/shoplist").then(res=>{
      console.log(res)
      setShopdata(res.data.data)
    })
  }

  function getcate(){
    fetch("/catelist").then(res=>{
      setOptionlist((res as any).data)
    })
  }
  useEffect(()=>{
    getdata()
    getcate()
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
  return (
    <div>
      <Button type="primary" onClick={()=>{
        console.log((inputRef.current as any).files[0]);
        const file = (inputRef.current as any).files[0]; // 获取文件对象
        axios.post("/upload",{file},{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res=>{
          console.log(res);
          
        })
      }}>
      读取Excel文件
      </Button>
      <input type="file" ref={inputRef} />
      <Input placeholder="请输入商品名称" style={{width:300}}></Input>
      <Select
        style={{ width: 120 }}
        placeholder="请选择商品类型"
          options={optionlist}
      ></Select>
      <Button>搜索</Button>
      <Button>添加商品</Button>
      <Table dataSource={shopdata}  style={{ width: "70vw" }}>
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
