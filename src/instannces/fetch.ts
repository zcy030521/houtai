"use client" // utils/fetch.ts

interface FetchOptions extends RequestInit {
  authRequired?: boolean; // 是否需要认证
}

const BASE_URL = 'http://localhost:3100'; // 设定你的默认路径（基地址）

const fetchWrapper = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const { authRequired = true, ...fetchOptions } = options;

  // const router = useRouter(); // 获取路由

  // 获取 Token 示例 (你可以根据实际情况从 localStorage 或 cookies 中获取)
  const token = authRequired ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 构建请求选项
  const finalOptions: RequestInit = {
    ...fetchOptions,
    headers,
  };

  // 构建完整的 URL
  const fullUrl = `${BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, finalOptions);

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
