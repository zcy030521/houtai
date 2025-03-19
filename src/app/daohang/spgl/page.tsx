"use client";
import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { Modal, Button, Input, Select, Upload, InputNumber, Popconfirm } from "antd";
const { Column, ColumnGroup } = Table;
import axios from "../../../instannces/axios";
import fetch from '@/instannces/fetch'
import Uploads from '@/app/components/upload'
import UploadExcel from '@/app/components/uploadexcel'
const ExcelReader = () => {
  const [chear, serchchear] = useState({
    name: "",
    cate: "",
    description: "",
    price: "",
  })
  const [shopdata, setShopdata] = useState([])
  const [optionlist, setOptionlist] = useState([])
  const [desc, setDesc] = useState([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addfrom, setaddfrom] = useState({
    name: "",
    cate: "",
    description: "",
    price: "",
    number: "",
    img: []
  })
  function getdesc() {
    fetch("/bqlist").then(res => {
      let arr = []
      res.data.forEach(item => {
        arr.push({ label: item.name, value: item._id })
      })
      console.log(arr);
      setDesc(arr)
    })
  }


  const catechange = (value: string) => {
    let from = { ...addfrom }
    from.cate = value
  };
  const descchange = (value: string) => {
    let from = { ...addfrom }
    from.description = value
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  //获取商品数据
  function getdata() {
    axios.get("/shoplist").then(res => {
      console.log(res)
      let data = res.data.data
      let arr = []
      data.forEach(item => {
        arr.push({
          name: item.name,
          price: item.price,
          number: item.number,
          cate: item.cate.name,
          cateid: item.cate._id,
          description: item.description.name,
          descriptionid: item.description._id,
          image: item.image,
          _id: item._id
        })
      })
      setShopdata(arr)
    })
  }
  function getcate() {
    fetch("/catelist").then(res => {
      let arr = []
      res.data.forEach(item => {
        arr.push({ label: item.name, value: item._id })
      })
      console.log(arr)
      setOptionlist(arr)
    })
  }
  useEffect(() => {
    getdata()
    getcate()
    getdesc()
  }, [])
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // 新增商品
  const handleAdd = async () => {
    const response = await axios.post('/addshop', addfrom);
    if (response.data.code === 200) {
      getdata();
      setIsModalOpen(false);
    }

  };

  // 编辑商品
  const handleEdit = (record) => {
    setEditId(record._id);
    console.log(record);

    setaddfrom({
      name: record.name,
      cate: record.cate,
      description: record.description,
      descriptionid: record.descriptionid,
      cateid: record.cateid,
      price: record.price,
      number: record.number,
      img: record.image
    });
    setIsModalOpen(true);
  };

  // 更新商品
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/shopupdate?id=${editId}`, addfrom);
      if (response.data.code == 200) {
        getdata();
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除商品
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/shop/${id}`);
      if (response.data.code === 200) {
        message.success('删除成功');
        getdata();
      }
    } catch (error) {
      message.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列配置
  const columns = [
    { title: '商品名称', dataIndex: 'name', key: '_id' },
    {
      title: '图片', dataIndex: 'image', key: '_id',
      render: (img) => <img src={img} alt="商品" style={{ width: 50 }} />
    },
    {
      title: '价格', dataIndex: 'price', key: '_id',
      render: (price) => `¥${Number(price).toFixed(2)}`
    },
    { title: '库存', dataIndex: 'number', key: '_id' },
    { title: '分类', dataIndex: `cate`, key: '_id' },
    { title: '标签', dataIndex: 'description', key: '_id' },

    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title="确认删除该商品？"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <UploadExcel></UploadExcel>
      {/* 搜索栏新增搜索功能 */}
      <div className="flex gap-2 mb-4" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <p><Button onClick={showModal}>添加商品</Button> </p>
        <p>商品名称：<Input
          placeholder="商品名称"
          style={{ width: 200 }}
          value={chear.name}
          onChange={(e) => serchchear({ ...chear, name: e.target.value })}
        /> </p>
        <p> 选择分类：<Select
          style={{ width: 150 }}
          placeholder="选择分类"
          options={optionlist}
          value={chear.cate}
          onChange={(v) => serchchear({ ...chear, cate: v })}
        /></p>
        <p> 选择标签：<Select
          style={{ width: 150 }}
          placeholder="选择描述"
          options={desc}
          value={chear.description}
          onChange={(v) => serchchear({ ...chear, description: v })}
        /></p>
        <p><Button type="primary" onClick={getdata}>搜索</Button></p>

      </div>

      {/* 表格配置 */}
      <Table
        style={{ width: 1200 }}
        columns={columns}
        dataSource={shopdata}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* 完善后的模态框 */}
      <Modal
        title={editId ? "编辑商品" : "添加商品"}
        open={isModalOpen}
        onOk={editId ? handleUpdate : handleAdd}
        onCancel={() => {
          setIsModalOpen(false);
          setEditId(null);
          setaddfrom({ ...addfrom, name: "", price: "", number: "" });
        }}
        confirmLoading={loading}
      >
        <div className="space-y-4">
          <Input
            placeholder="商品名称"
            value={addfrom.name}
            onChange={(e) => setaddfrom({ ...addfrom, name: e.target.value })}
          />
          <InputNumber
            placeholder="价格"
            min={0}
            precision={2}
            style={{ width: '100%' }}
            value={addfrom.price}
            onChange={(v) => setaddfrom({ ...addfrom, price: v })}
          />
          <InputNumber
            placeholder="库存"
            min={0}
            style={{ width: '100%' }}
            value={addfrom.number}
            onChange={(v) => setaddfrom({ ...addfrom, number: v })}
          />
          <Select
            style={{ width: 200 }}
            options={optionlist}
            placeholder="选择分类"
            value={addfrom.cate}
            onChange={(v) => setaddfrom({ ...addfrom, cate: v })}
          />
          <Select
            style={{ width: 200 }}
            options={desc}
            placeholder="选择描述"
            value={addfrom.description}
            onChange={(v) => setaddfrom({ ...addfrom, description: v })}
          />
          <Uploads />
        </div>
      </Modal>
    </div>
  );
};

export default ExcelReader;
