"use client"
// utils/fetch.ts
// import {useRouter} from "next/router"
interface FetchOptions extends RequestInit {
    authRequired?: boolean; // 是否需要认证
}

const fetchWrapper = async<T>(url: string, options: FetchOptions = {}): Promise<T> => {
    const {authRequired = true, ...fetchOptions } = options;
    // const router = useRouter();
    // 获取 Token 示例 (你可以根据实际情况从 localStorage 或 cookies 中获取)
    const token = authRequired ? localStorage.getItem('authToken') : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    ...fetchOptions.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }else{
        // router.push('/login'); // 如果需要认证但没有 Token，重定向到登录页面
        // throw new Error('未授权访问！');
    }

    // 构建请求选项
    const finalOptions: RequestInit = {
        ...fetchOptions,
        headers,
    };

    try {
      const response = await fetch(url, finalOptions);

    // 判断响应状态码
    if (!response.ok) {
        const error = await response.json();
    throw new Error(error.message || '请求失败');
      }

    const data: T = await response.json(); // 假设返回的都是 JSON 格式的数据
    return data;
    } catch (error) {
        console.error('API 请求出错:', error);
    throw error; // 继续抛出错误，便于上层调用处理
    }
  };

    export default fetchWrapper;
