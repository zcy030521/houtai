"use client";
import type { MenuProps } from "antd";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
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

  // console.log(routerlist.role);
  const gits = (): Permission[] => {
    return routerlist.role?.permission || [];

  };
console.log(gits());

  
  const items: MenuItem[] = [
    ...gits().filter((i) => i.level == 1).map((item) => ({
      key: item.key,
      label: item.label,
      children:[
        ...gits()
        .filter(s=>s.p_id?._id==item._id)
      ]
    }))

  ];
      // ...routerlist
    //   .filter((i) => i.level == 1)
    //   .map((item) => ({
    //     key: item.key,
    //     label: item.label,
    //     children: [
    //       ...routerlist
    //         .filter((i) => i.p_id?._id == item._id)
    //         .map((item) => ({
    //           key: item.key,
    //           label: item.label,
    //         })),
    //     ],
    //   }))
  const onClick: MenuProps["onClick"] = (e) => {
    Router.push(`/${e.key}`);
    console.log(`/${e.key}`, 11111);
  };
  useEffect(() => {
    routelist();
  }, []);
  
  return (
    <div style={{ display: 'flex' }}>
      <motion.div
        style={{ width: "300px", height: "100vh" }}
        key={"/daohang"} // 路由变化时重新渲染动画
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Menu
          style={{ width: 256, position: "fixed" }}
          onClick={onClick}
          mode="inline"
          items={items}
          defaultOpenKeys={["daohang"]}
        />
        <div>
          
        </div>
      </motion.div>
      <div>{children}</div>
    </div>
  );
}
