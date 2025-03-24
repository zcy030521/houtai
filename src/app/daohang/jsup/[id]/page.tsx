"use client"
import React, { useEffect, useState } from "react";
import { Card, Input, Tree, Button } from "antd";
import type { TreeDataNode, TreeProps } from 'antd';
import fetch from "@/instannces/fetch"
import { useRouter, useParams } from "next/navigation";
interface Permission {
    _id: string;
    key: string;
    label: string;
    level: number;
    p_id?: {
        _id: string;
        label: string;
        level: number;
    };
}
export const getjs = async () => {
    const res = await fetch("/li", {
        method: "GET",
    })
    return res
}
export const getjsid = async(id:string) => {
    const res = await fetch(`/li/${id}`, {
        method: "GET",
    })
    return res
}
export const upjs = async(id:string,name:string,describe:string,permission:string[]) => {
    await fetch(`/roleupdate`, {
        method: "post",
        body: JSON.stringify({ id, name, describe, permission })
    })
}
export default function Page() {
    const data = async () => {
        const res = await getjs()
        setLylist(res.data)
        console.log(res.data);
    }
    const dataid = async () => {
        const res = await getjsid(id)
        console.log(res.data);
        
        setDescribe(res.data.describe)
        setName(res.data.name)
        setPermission(res.data.permission)
    }
    const [lylist, setLylist] = useState<Permission[]>([])
    const [Permission, setPermission] = useState<string[]>([])
    const [name,setName] = useState<string>("")
    const [describe,setDescribe] = useState<string>("")
    const Router = useRouter()
    const {id} = useParams()
    useEffect(() => {
        data()
        dataid()
    }, [name,describe])
    const treeData: TreeDataNode[] = [
        ...lylist.filter((item: Permission) => item.level === 1).map((item: Permission) => {
            return {
                title: item.label,
                key: item._id,
                children: lylist.filter((items: Permission) => items.p_id?._id === item._id).map((item: Permission) => {
                    return {
                        title: item.label,
                        key: item._id,
                    }
                })
            }
        })
    ];
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        setPermission(selectedKeys)
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        setPermission(checkedKeys)
    };

    return <Card style={{ width: "79vw", height: "90vh" }} title="编辑角色">
        角色名称：<Input placeholder="请输入角色名称" value={name} style={{ width: "300px" }} onInput={(e)=>{setName(e.target.value)}}></Input><br />
        <span className="role-title">角色简介：</span> <textarea name="" value={describe} id="" placeholder="请输入角色简介" onInput={(e)=>{setDescribe(e.target.value)}} style={{ width: "300px", height: "100px", marginTop: "50px" }}></textarea><br />
        权限设置：<Tree
            checkable
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
            checkedKeys={Permission}
        />
        <Button type="primary" style={{ marginTop: "10px" }} onClick={()=>{upjs(id,name,describe,Permission),Router.push("/daohang/jsgl")}}>修改</Button>
    </Card>
}