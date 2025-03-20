"use client"
import React from "react"
import { useRouter } from 'next/navigation'
export default function Layout() {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => { router.push("/ai") }}>
                123
            </button>
        </div>
    )
}