"use client";
import type { MenuProps } from "antd";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
interface Item {
  _id: string;
  key: string;
  label: string;
  level: number;
  p_id?: {
    // 如果有 p_id，则可以继续定义其类型
    // 假设 p_id 本身是一个对象
    _id: string;
    key: string;
    label: string;
  };
}
export default function DHLayout({ children }: { children: React.ReactNode }) {
  const Router = useRouter();
  // console.log(Router)
  const [routerlist, setRouterlist] = useState<Item[]>([]);
  type MenuItem = Required<MenuProps>["items"][number];
  const routelist = async () => {
    await fetch("http://localhost:3100/ly").then((res) => {
      res.json().then((data) => {
        setRouterlist(data.result);
        // console.log(data.result);
      });
    });
  };
  const items: MenuItem[] = [
    ...routerlist
      .filter((i) => i.level == 1)
      .map((item) => ({
        key: item.key,
        label: item.label,
        children: [
          ...routerlist
            .filter((i) => i.p_id?._id == item._id)
            .map((item) => ({
              key: item.key,
              label: item.label,
            })),
        ],
      })),
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    Router.push(`/${e.key}`);
    console.log(`/${e.key}`, 11111);
  };

  useEffect(() => {
    routelist();
  }, []);
  return (
    <div style={{display:'flex'}}>
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
      </motion.div>
      <div>{children}</div>
    </div>
  );
}
