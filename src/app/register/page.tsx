"use client";
import "./page.css";
import React, { useState,useEffect } from "react";
import { UserOutlined, UnlockOutlined,PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
import Yzm from "@/app/register/yzm"
import { userAdd } from "@/export/index"
export default function App() {
  const [codes, setcodes] = useState<string>("");
  const [user, setsuer] = useState<string>("");
  const [password, setpwd] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const router = useRouter();
  const regex = /^1[3-9]\d{9}$/;
  useEffect(()=>{

  },[user,password,phone,codes])
  return (
    <div className="body" style={{ display: "flex" }}>
      <div className="right">
        <div style={{ position: "relative", top: "40%", left: "10%" }}>
          <p style={{ fontSize: "50px", color: "white" }}>社区团购</p>
          <p
            style={{ fontSize: "30px", color: "white", letterSpacing: "15px" }}
          >
            Axlab社区团管理中心
          </p>
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
          <Input
            placeholder="请输入账号"
            prefix={<UserOutlined />}
            onInput={(e) => {
              setsuer((e.target as HTMLInputElement).value);
            }}
          />
          <Input
            placeholder="密码"
            type="password"
            onInput={(e) => {
              setpwd((e.target as HTMLInputElement).value);
            }}
            prefix={<UnlockOutlined />}
          />
          <Input
            placeholder="手机号"
            type="text"
            onInput={(e) => {
              setphone((e.target as HTMLInputElement).value);
            }}
            onBlur={() => {
              if (!regex.test(phone)) {
                alert("手机号格式错误，请输入正确的手机号！");
              }
            }}
            prefix={<PhoneOutlined />}
          />
          <div style={{ display: "flex", height: "40px" }}>
            <Input
              placeholder="验证码"
              onInput={(e) => {
                setcodes((e.target as HTMLInputElement).value);
              }}
              prefix={<UnlockOutlined />}
            />
            <Yzm />
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
              if (
                user === "" ||
                password === "" ||
                phone === "" ||
                codes === ""
              ) {
                alert("请输入完整信息");
                return;
              }
              userAdd(user, password, phone);
              router.push("/login");
            }}
          >
            注册
          </Button>
        </div>
      </div>
    </div>
  );
}
