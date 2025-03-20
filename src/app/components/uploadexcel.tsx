import { useEffect, useRef, useState } from "react"
import SparkMD5 from 'spark-md5'
import { Flex, Progress } from 'antd';
export default function Index(props: any) {
    const CHUNK_SIZE = 1024 * 1024*3//1m
    const fileHash = useRef<string>('')
    const fileName = useRef<string>('')
    const [olading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    // 文件分片
    const createChunks = (file: File) => {
        let cur = 0
        let thunks = []
        while (cur < file.size) {
            const blob = file.slice(cur, cur + CHUNK_SIZE)
            thunks.push(blob)
            cur += CHUNK_SIZE
        }
        return thunks
    }
 
    // 计算hash值函数
    const calculateHash = (thunks: Blob[]) => {
        return new Promise(resolve => {
            // 第一个和最后一个切片全部参与计算
            // 中间的切片只计算前面两个字节、中间两个字节、最后两个字节
            const targets: Blob[] = [] //存储所有参与计算的切片
            const spark = new SparkMD5.ArrayBuffer()
 
            const fileReader = new FileReader()
 
            thunks.forEach((h, index) => {
                if (index === 0 || index === thunks.length - 1) {
                    // 第一个和最后一个切片全部参与计算
                    targets.push(h)
                } else {
                    targets.push(h.slice(0, 2)) //前面两个字节
                    targets.push(h.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2)) //中间两个字节
                    targets.push(h.slice(CHUNK_SIZE - 2, CHUNK_SIZE)) //最后两个字节
                }
            })
 
            fileReader.readAsArrayBuffer(new Blob(targets))
            fileReader.onload = (e) => {
                // console.log((e.target as FileReader).result);
 
                spark.append((e.target as FileReader).result as ArrayBuffer)
                // console.log('hash:' + spark.end());
                resolve(spark.end())
            }
        })
    }
 
    const mergeRequest = () => {
        fetch('http://localhost:3100/merge', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                fileHash: fileHash.current,
                fileName: fileName.current,
                size: CHUNK_SIZE
            })
        }).then((res) => {
            alert('合并成功')
        })
    }
    // 上传分片
    const uploadChunks = async (thunks: Blob[]) => {
        const data = thunks.map((thunk, index) => {
            return {
                fileHash: fileHash.current,
                thunkHash: fileHash.current + '-' + index,
                fileName:fileName.current,
                thunk,
            }
        })
        const formDatas = data.map((item) => {
            const formData = new FormData()
            formData.append('fileHash', item.fileHash)
            formData.append('thunkHash', item.thunkHash)
            formData.append('thunk', item.thunk)
            // console.log(item.fileHash);
            return formData
        })
 
 
 
        // console.log(formDatas);
        const max = 6 //最大并发请求数
        let index = 0 //
        const taskPool: any = [] //请求池
        let totalUploaded = 0//已上传的字节数
        const totalSize = thunks.reduce((sum, thunk) => sum + thunk.size, 0)//计算所有切片的总大小
        while (index < formDatas.length) {
            const currentIndex = index;
            const currentThunk = thunks[currentIndex];
            const task = fetch('http://localhost:3100/upload', {
                method: 'POST',
                body: formDatas[index],
            }).then((res) => {
                if (res.status == 200) {
                    totalUploaded += currentThunk.size
                    const uploadProgress = ((totalUploaded / totalSize) * 100).toFixed(2)
                    setProgress(Number(uploadProgress))
                }
            })
            taskPool.splice(taskPool.findIndex((item: any) => item === task))
            taskPool.push(task)
            if (taskPool.length === max) {
                await Promise.race(taskPool)
            }
            index++
        }
        await Promise.all(taskPool)
 
        // 通知服务器合并文件
        mergeRequest()
    }
 
    const clickFn = async (e: any) => {
        const files = e.target.files
        console.log(files);
        
        if (!files) return
        // 读取文件
        // console.log(files[0]);
        fileName.current = files[0].name
 
        // 文件分片操作
        const thunks = createChunks(files[0])
        // console.log(thunks);
        // hash计算
        const hash = await calculateHash(thunks)
        fileHash.current = hash as string
 
        // console.log(hash);
        // 上传分片
        uploadChunks(thunks)
    }
    return <>
        <input type="file" onChange={(e) => { clickFn(e) }} />

        {
          progress!==0?<div><Progress percent={progress} status="active" /></div>:null
        }

    </>
}