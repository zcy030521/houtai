 "use client";
import "./page.css";
import '@ant-design/v5-patch-for-react-19';
import React, { useRef, useState,useEffect } from "react";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
import Yzm from "./yzm";
export default function App() {
  const [codes, setcodes] = useState<string>("");
  const [user, setsuer] = useState<string>("");
  const [pwd, setpwd] = useState<string>("");

  const router = useRouter();
  useEffect(()=>{

  },[codes,user,pwd])
  return (
    <div className="body" style={{ display: "flex" }}>
      <div className="right">
        <div style={{ position: "relative", top: "40%", left: "10%" }}>
          <p style={{ fontSize: "50px", color: "white" }}>社区团购</p>          <p
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
            prefix={<UnlockOutlined  />}
            onInput={(e)=>{
              setpwd((e.target as HTMLInputElement).value);
            }}
          />
          <div style={{ display: "flex", height: "40px" }}>
            <Input
              placeholder="验证码"
              onInput={(e) => {
                setcodes((e.target as any).value);
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
            <span>忘记密码? <a href="/register" style={{color:'black'}}>前往注册</a></span>
          </div>
          <Button
            style={{ width: "50%", margin: "0 auto", display: "block" }}
            onClick={async() => {
              const res = await fetch("http://localhost:3100/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: user,
                  password: pwd
                })
              });
              
              const data = await res.json();
              console.log(data);
              
              if (data.token) {
                localStorage.setItem("token", data.token);
                router.push("/daohang");
              }
              
            }}
          >
            登录
          </Button>
        </div>
      </div>
    </div>
  );
}
