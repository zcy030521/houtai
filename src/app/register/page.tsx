"use client";
import "./page.css";
import React, { useRef, useState } from "react";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { Input, Button, theme } from "antd";
export default function App() {
  const [codes, setcodes] = useState("");
  return (
    <div className="body" style={{ display: "flex" }}>
      <div className="right">
        <div style={{position:'relative',top:"40%",left:"10%"}}>
          <p style={{ fontSize: "50px", color: "white" }}>社区团购</p>
          <p style={{ fontSize: "30px", color: "white",letterSpacing:"15px" }}>Axlab社区团管理中心</p>
        </div>
      </div>
      <div className="left">
        <div></div>
        <div
          style={{
            width: "60%",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            fontSize: "13px",
          }}
        >
          <div style={{ height: "50px" }}>
            <p style={{ fontSize: "20px" }}>Axlab社区团购</p>
            <p style={{ color: "grey", margin: "5px 0" }}>系统管理账号登录</p>
          </div>
          <Input placeholder="请输入账号" prefix={<UserOutlined />} />
          <Input
            placeholder="密码"
            type="password"
            prefix={<UnlockOutlined />}
          />
          <div style={{ display: "flex", height: "40px" }}>
            <Input
              placeholder="验证码"
              type="password"
              onInput={(e) => {
                setcodes(e.target.value);
              }}
              prefix={<UnlockOutlined />}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "50px",
            }}
          >
            <span>
              <input type="radio" name="mima" />
              记住密码
            </span>
            <span>忘记密码?</span>
          </div>
          <Button
            style={{ width: "50%", margin: "0 auto", display: "block" }}
            onClick={() => {
              if (codes == localStorage.getItem("code")) {
                alert("登录成功");
              }
            }}
          >
            注册
          </Button>
        </div>
      </div>
    </div>
  );
}
