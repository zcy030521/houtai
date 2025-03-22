// "use client";
import React from 'react'
import { Metadata } from 'next'


// import { jkdata } from "@/export/index"
// import './iconFont.css'

export const metadata: Metadata = {
  title: 'operation'
}

export default function page({ children }: { children: React.ReactNode}) {

  // const [date, setDate] = useState<string[]>([]);
  // console.log(111, jkdata());
  // const date = jkdata();
  // console.log(111, date);
  return (
    <>
     {children}
    </>

  )
}
