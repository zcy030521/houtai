'use client'
import "./page.css";
import React from "react";
import { UserOutlined,UnlockOutlined } from "@ant-design/icons";
import { Input,Button } from "antd";
import Yzm from './yzm'
export default function App() {
  return (
    <div className="body" style={{ display: "flex" }}>
      <div className="right">1111</div>
      <div className="left">
        <div></div>
        <div style={{ width: "60%",height:"300px",display:'flex',flexDirection:'column',justifyContent:'space-around',fontSize:'13px' }}>
          <div style={{height:'50px'}}>
            <p style={{fontSize:"20px"}}>Axlab社区团购</p>
            <p>系统管理账号登录</p>
          </div>
          <Input placeholder="请输入账号" prefix={<UserOutlined />} />
            <Input placeholder="密码" type="password" prefix={<UnlockOutlined />} />
            <Input placeholder="密码" type="password" prefix={<UnlockOutlined />} />         <Yzm />
            <div style={{display:'flex',justifyContent:'space-between',height:'50px'}}>
                <span>
                <input type="radio" name="mima" />记住密码
                </span>
                
                <span>忘记密码?</span>
       
            </div>
          <Button style={{width:'50%',margin:'0 auto',display:'block'}}>登录</Button>
        </div>
      </div>
    </div>
  )
}
