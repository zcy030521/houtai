"use client"
import React, { useState, useEffect } from 'react'
import { Input, Button, Card, Radio } from "antd"
import fetch from "@/instannces/fetch"
import { useParams, useRouter } from 'next/navigation'

export const getuser = async (id: string) => {
  const res = await fetch(`/userlist/${id}`, {
    method: "get",
  })
  return res.data
}

export const getrole = async () => {
  const res = await fetch("/rolelist", {
    method: "get",
  })
  return res.data
}

export default function Page() {
  const { id } = useParams()
  const [user, setUser] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [rolelist, setRolelist] = useState([])
  const Router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const [userData, roleData] = await Promise.all([getuser(id), getrole()])
      setUser(userData.user)
      setPhone(userData.phone)
      setRole(userData.role)
      setRolelist(roleData)
    }
    fetchData()
  }, [id])

  return (
    <Card style={{ width: "79vw", height: "90vh" }}>
      <Input placeholder='请输入用户名称' value={user} onChange={(e) => setUser(e.target.value)} />
      <Input placeholder='请输入手机号' value={phone} onChange={(e) => setPhone(e.target.value)} />
      {
        rolelist.map((item: any) => (
          <div key={item._id}>
            <Radio checked={role === item._id} onChange={() => setRole(item._id)}>{item.name}</Radio>
          </div>
        ))
      }
      <Button type='primary' onClick={() => { updateuser(id, user, phone, role), Router.push("/daohang/zhgl") }}>保存</Button>
    </Card>
  )
}
