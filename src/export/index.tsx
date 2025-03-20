"use client"
import fetch from "@/instannces/fetch"
import { useRouter } from "next/navigation";
interface Role {
    name: string;
    describe: string;
    permission?: Permission[];
}
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
export const roledata = async () => {
    const res = await fetch("/rolelist", {
        method: "GET"
    });
    const data = res
    return data
}
export const userAdd = async (user: string, password: string, phone: string) => {
    fetch("/adduser", {
        method: "POST",
        body: JSON.stringify({
            user,
            password,
            phone
        })
    })
}
