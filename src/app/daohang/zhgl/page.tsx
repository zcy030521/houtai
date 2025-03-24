"use client"
import React,{useState,useEffect} from 'react'
import fetch from "@/instannces/fetch"
import { Card,Button,Table } from 'antd'
import { useRouter } from "next/navigation";
export const getuser =async()=>{
    const res = await fetch("/userlist",{
      method:"GET"
    })
    return res.data
}

export default function Page() {
  const Router = useRouter()
  const [user,setUser] = useState([])
  const getlist = async()=>{
    const res = await getuser()
    setUser(res)
  }
  const dataSource = [
    ...user.map((item:any)=>{
        return {
            _id:item._id,
            user:item.user,
            phone:item.phone,
            role:item.role.name
        }
    })
  ];
  
  const columns = [
    {
        title: '用户编号',
        dataIndex: '_id',
        key: '_id',
    },
    {
      title: '用户名称',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title:"角色",
      dataIndex:"role",
      key:"role"
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'xx',
      render:(text:any,record:any)=>{
         return <div>
            <Button  style={{marginRight:"10px"}} onClick={()=>{Router.push(`/daohang/zhxg/${record._id}`)}}>编辑</Button>
            <Button >删除</Button>
         </div>
      }
    },
  ];
  useEffect(()=>{
    getlist()
    Router.prefetch('/daohang/zhxg/[id]')
  },[Router])
  return (
    <Card style={{ width: "79vw", height: "90vh" }}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  )
}
