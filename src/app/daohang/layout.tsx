"use client";
import type { MenuProps } from "antd";
import { useState, useEffect } from "react";
import { Menu,Spin  } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import fetchs from "@/instannces/fetch"
import './page.css'
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

interface Role {
  name: string;
  describe: string;
  permission: Permission[];
}

interface Item {
  _id: string;
  name: string;
  password: string;
  phone: string;
  role: Role;
  user: string;
}


export default function DHLayout({ children }: { children: React.ReactNode }) {
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  // console.log(Router)
  const [routerlist, setRouterlist] = useState<Item[]>([]);
  // const [name,setName] = useState<string>("")
  type MenuItem = Required<MenuProps>["items"][number];
  const routelist = async () => {
    const res = await fetch("http://localhost:3100/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    const data = await res.json()
    console.log(data.data);
    setRouterlist(data.data);
  };
  const gits = (): Permission[] => {
    return routerlist.role?.permission || [];
  };
  // console.log(gits());


  const items: MenuItem[] = [
    ...gits().filter((i) => i.level == 1).map((item) => ({
      key: item.key,
      label: item.label,
      children: [
        ...gits()
          .filter(s => s.p_id?._id == item._id)
      ]
    }))

  ];
  const onClick: MenuProps["onClick"] = (e) => {
    Router.push(`/${e.key}`);
    console.log(`/${e.key}`, 11111);
  };

  useEffect(() => {
    routelist();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div
      >
        <Menu
          style={{ width: "18vw" }}
          onClick={onClick}
          mode="inline"
          items={items}
          defaultOpenKeys={["daohang"]}
        />
        <div>

        </div>
      </div>
      <div className="main">
        <div style={{ width: '100%', height: '70px' }}>
          <span style={{ display: "inline-block", float: "right", lineHeight: "70px", marginRight: "120px" }}>{routerlist.user}</span>
          <div className="ai" onClick={() => { Router.push("/ai") }}>
            AI
          </div>
        </div>
        <div>{children}</div>
        {loading ? <div className="cover"> <Spin /></div> : ""}
      </div>
    </div>
  );
}
