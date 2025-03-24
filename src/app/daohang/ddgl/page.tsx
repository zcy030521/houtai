"use client"
import React from "react";
import All from "./all";
import Pt from "./pt";
import Ptdd from "./ptdd";
import Ms from "./ms";
import { Card, Input,Button,Tabs, } from 'antd'
import type { TabsProps } from 'antd';
import './ddgl_css.css'
export default function App() {
    const onChange = (key: string) => {
        console.log(key);
      };
      
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: '全部',
          children: <All />,
        },
        {
          key: '2',
          label: '普通订单',
          children: <Ptdd />,
        },
        {
          key: '3',
          label: '秒杀',
          children: <Ms />,
        },
        {
            key: '4',
            label: '拼团',
            children: <Pt />,
          },
      ];
    return <div>
        <Card style={{ width: '79vw', height: '78vh' }}>
            <Input addonBefore="订单号" placeholder="请输入内容" className="input-1"/>
            <Input addonBefore="手机号" placeholder="请输入内容" className="input-1"/>
            <Input addonBefore="姓名" placeholder="请输入内容" className="input-1"/>
            <Input addonBefore="地址" placeholder="请输入内容" className="input-1"/><br />
            <Button className="button-1">检索</Button>
            <Button>重置</Button><br />
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>
    </div>
}