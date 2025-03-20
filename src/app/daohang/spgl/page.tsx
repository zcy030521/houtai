"use client";
import React, { useEffect, useState, useRef } from "react";
import { Table, message } from "antd";
import {
  Modal,
  Button,
  Input,
  Select,
  Upload,
  InputNumber,
  Popconfirm,
} from "antd";
const { Column, ColumnGroup } = Table;
import axios from "../../../instannces/axios";
import fetch from "@/instannces/fetch";
import Uploads from "@/app/components/upload";
import UploadExcel from "@/app/components/uploadexcel";

interface ShopItem {
  _id: string;
  name: string;
  price: string | number;
  number: string | number;
  cate: string;
  cateid: string;
  description: string;
  descriptionid: string;
  image: string[];
}

interface CategoryOption {
  label: string;
  value: string;
}

const ExcelReader = () => {
  const [imglist, setImglist] = useState<string[]>([]);
  const [chear, serchchear] = useState({
    name: "",
    cate: "",
    description: "",
    price: "",
  });
  const [shopdata, setShopdata] = useState<ShopItem[]>([]);
  const [optionlist, setOptionlist] = useState<CategoryOption[]>([]);
  const [desc, setDesc] = useState<CategoryOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addfrom, setaddfrom] = useState({
    name: "",
    cate: "",
    description: "",
    price: "",
    number: "",
    img: [] as string[],
  });
  
  function getdesc() {
    fetch("/bqlist").then((res: any) => {
      const arr: CategoryOption[] = [];
      res.data.forEach((item: any) => {
        arr.push({ label: item.name, value: item._id });
      });
      setDesc(arr);
    });
  }

  const catechange = (value: string) => {
    let from = { ...addfrom };
    from.cate = value;
  };
  const descchange = (value: string) => {
    let from = { ...addfrom };
    from.description = value;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  //获取商品数据
  function getdata() {
    axios.get("/shoplist").then((res) => {
      console.log(res);
      console.log(res.data.data);

      let data = res.data.data;
      const arr: ShopItem[] = [];
      data.forEach((item: any) => {
        arr.push({
          name: item.name,
          price: item.price,
          number: item.number,
          cate: item.cate.name,
          cateid: item.cate._id,
          description: item.description.name,
          descriptionid: item.description._id,
          image: item.img,
          _id: item._id,
        });
      });
      setShopdata(arr);
    });
  }
  function getcate() {
    fetch("/catelist").then((res: any) => {
      const arr: CategoryOption[] = [];
      res.data.forEach((item: any) => {
        arr.push({ label: item.name, value: item._id });
      });
      setOptionlist(arr);
    });
  }
  useEffect(() => {
    getdata();
    getcate();
    getdesc();
  }, []);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Handle image changes from Uploads component
  const handleImagesChange = (images: string[]) => {
    setaddfrom({ ...addfrom, img: images });
  };

  // 新增商品
  const handleAdd = async () => {
    try {
      setLoading(true);
      // 确保表单数据完整
      if (!addfrom.name || !addfrom.price || !addfrom.number || !addfrom.cate || !addfrom.description) {
        message.error("请填写完整商品信息");
        return;
      }
      
      // 验证图片数量
      if (!addfrom.img || addfrom.img.length === 0) {
        message.error("请至少上传一张商品图片");
        return;
      }
      
      // 准备发送到服务器的数据
      const formData = {
        ...addfrom,
        img: addfrom.img // 确保图片数组被包含
      };
      
      const response = await axios.post("/addshop", formData);
      if (response.data.code === 200) {
        message.success("添加成功");
        getdata();
        setIsModalOpen(false);
        // 重置表单
        setaddfrom({
          name: "",
          cate: "",
          description: "",
          price: "",
          number: "",
          img: []
        });
      } else {
        message.error(response.data.message || "添加失败");
      }
    } catch (error) {
      message.error("添加失败");
    } finally {
      setLoading(false);
    }
  };

  // 编辑商品
  const handleEdit = (record: ShopItem) => {
    setEditId(record._id);
    setImglist(record.image);
    setaddfrom({
      name: record.name,
      cate: record.cateid,
      description: record.descriptionid,
      price: String(record.price),
      number: String(record.number),
      img: record.image,
    });
    setIsModalOpen(true);
  };

  // 更新商品
  const handleUpdate = async () => {
    try {
      setLoading(true);
      
      // 确保表单数据完整
      if (!addfrom.name || !addfrom.price || !addfrom.number || !addfrom.cate || !addfrom.description) {
        message.error("请填写完整商品信息");
        return;
      }
      
      // 验证图片数量
      if (!addfrom.img || addfrom.img.length === 0) {
        message.error("请至少上传一张商品图片");
        return;
      }
      
      // 准备发送到服务器的数据
      const formData = {
        ...addfrom,
        img: addfrom.img // 确保图片数组被包含
      };
      
      const response = await axios.post(`/shopupdate?id=${editId}`, formData);
      if (response.data.code == 200) {
        message.success("更新成功");
        getdata();
        setIsModalOpen(false);
        // 重置表单
        setaddfrom({
          name: "",
          cate: "",
          description: "",
          price: "",
          number: "",
          img: []
        });
        setEditId(null);
      } else {
        message.error(response.data.message || "更新失败");
      }
    } catch (error) {
      message.error("更新失败");
    } finally {
      setLoading(false);
    }
  };

  // 删除商品
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/shop/${id}`);
      if (response.data.code === 200) {
        message.success("删除成功");
        getdata();
      }
    } catch (error) {
      message.error("删除失败");
    } finally {
      setLoading(false);
    }
  };

  // 表格列配置
  const columns = [
    { title: "商品名称", dataIndex: "name", key: "_id" },
    {
      title: "图片",
      dataIndex: "image",
      key: "_id",
      render: (lists: string[]) => (
        <>
          {lists.map((item, index) => (
            <img 
              key={index}
              src={item} 
              style={{ width: "100px", height: "100px" }} 
              alt={`商品图片-${index}`}
            />
          ))}
        </>
      ),
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "_id",
      render: (price: string | number) => `¥${Number(price).toFixed(2)}`,
    },
    { title: "库存", dataIndex: "number", key: "_id" },
    { title: "分类", dataIndex: "cate", key: "_id" },
    { title: "标签", dataIndex: "description", key: "_id" },

    {
      title: "操作",
      key: "action",
      render: (_: any, record: ShopItem) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除该商品？"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4" style={{ width: "70%", overflow: "auto" }}>
      <UploadExcel></UploadExcel>
      {/* 搜索栏新增搜索功能 */}
      <div
        className="flex gap-2 mb-4"
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <p>
          <Button onClick={showModal}>添加商品</Button>{" "}
        </p>
        <p>
          商品名称：
          <Input
            placeholder="商品名称"
            style={{ width: 200 }}
            value={chear.name}
            onChange={(e) => serchchear({ ...chear, name: e.target.value })}
          />{" "}
        </p>
        <div>
          {" "}
          选择分类：
          <Select
            style={{ width: 150 }}
            placeholder="选择分类"
            options={optionlist}
            value={chear.cate}
            onChange={(v) => serchchear({ ...chear, cate: v })}
          />
        </div>
        <p>
          {" "}
          选择标签：
          <Select
            style={{ width: 150 }}
            placeholder="选择描述"
            options={desc}
            value={chear.description}
            onChange={(v) => serchchear({ ...chear, description: v })}
          />
        </p>
        <p>
          <Button type="primary" onClick={getdata}>
            搜索
          </Button>
        </p>
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
          setImglist([]);
          setaddfrom({
            name: "",
            cate: "",
            description: "",
            price: "",
            number: "",
            img: [],
          });
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
            style={{ width: "100%" }}
            value={addfrom.price ? Number(addfrom.price) : undefined}
            onChange={(v) => setaddfrom({ ...addfrom, price: v ? String(v) : "" })}
          />
          <InputNumber
            placeholder="库存"
            min={0}
            style={{ width: "100%" }}
            value={addfrom.number ? Number(addfrom.number) : undefined}
            onChange={(v) => setaddfrom({ ...addfrom, number: v ? String(v) : "" })}
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
          <Uploads 
            imglist={imglist} 
            onImagesChange={handleImagesChange}
            isEditMode={!!editId}
          />
        </div>
      </Modal >
    </div>
  );
};

export default ExcelReader;
