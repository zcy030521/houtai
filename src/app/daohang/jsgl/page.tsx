"use client"
import React, { useState, useEffect } from 'react'
import fetch from "@/instannces/fetch"
import { Card,Button,Table } from 'antd'
import { useRouter } from "next/navigation";
export const getjs = async () => {
    const res = await fetch("/rolelist", {
        method: "GET",
    })
    // const data = await res.json()
    return res
}
export const deljs = async (id:string) => {
    await fetch(`/deljs`, {
        method: "post",
        body: JSON.stringify({ id })
    })
    
}


export default function Page() {
    const [jslist, setJslist] = useState([])
    const Router = useRouter()
    const jxjs = async () => {
        const res = await getjs()
        setJslist(res.data)
        console.log(res.data);
        
    }
    const dataSource = [
        ...jslist.map((item:any)=>{
            return {
                _id:item._id,
                name:item.name,
                describe:item.describe
            }
        })
      ];
      
      const columns = [
        {
            title: '角色编号',
            dataIndex: '_id',
            key: '_id',
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '内容简介',
          dataIndex: 'describe',
          key: 'describe',
        },
        {
          title: '操作',
          dataIndex: '',
          key: 'xx',
          render:(text:any,record:any)=>{
             return <div>
                <Button  style={{marginRight:"10px"}} onClick={()=>{Router.push(`/daohang/jsup/${record._id}`)}}>编辑</Button>
                <Button onClick={()=>{deljs(record._id)}}>删除</Button>
             </div>
          }
        },
      ];
    useEffect(() => {
        jxjs()
        
    }, [])
    return (
        <Card style={{ width: "79vw", height: "90vh" }}>
            <Button type='primary' onClick={()=>{Router.push("/daohang/jsadd")}}>添加角色</Button>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
  )
}
