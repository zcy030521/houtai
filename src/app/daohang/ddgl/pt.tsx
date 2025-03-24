"use client"
import React, { useState, useEffect } from "react";
import { Table, Pagination } from 'antd';
import fetch from "@/instannces/fetch"
export const getlist = async (current: number, pageSize: number) => {
    const res = await fetch(`/shoplist?current=${current}&pageSize=${pageSize}`, {
        method: "GET",
    })
    return res
}
interface DataType {
    _id: string;
    name: string;
    price: number;
    number: number;
    status: string;
}
export default function Ptdd() {
    const [list, setList] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [total, setTotal] = useState(0)
    const alllist = async () => {
        const res = await getlist(current, pageSize)
        setList(res.data)
        setTotal(res.total)
    }
    const dataSource: DataType[] = [
        ...list.map((item: DataType, index: number) => {
            return {
                key: index,
                _id: item._id,
                name: item.name,
                price: item.price,
                number: item.number,
                status: item.status
            }
        })
    ];

    const columns = [
        {
            title: '订单号',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: "数量",
            dataIndex: "number",
            key: "number"
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status"
        },

    ];
    useEffect(() => {
        alllist()
    }, [current, pageSize])
    return <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination defaultCurrent={current} total={total} pageSize={pageSize} onChange={(pages) => {
            setCurrent(pages)
            getlist(current, pageSize)
            // alllist()
        }} />
    </div>
}


