import { NextResponse } from 'next/server';

export async function middleware(req: { nextUrl: { clone?: any; pathname?: any; }; cookies: { get: (name: string) => string | undefined; }; }) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token'); // 获取 cookie 中的 token

    console.log('Current path:', pathname);
    console.log('Token:', token);
    if(pathname === "/"){
        const url = req.nextUrl.clone();
        url.pathname = '/login'; // 重定向到登录页面
        return NextResponse.redirect(url);
    }

    // 如果用户已登录并且访问的是登录页面，重定向到首页
    if (token && pathname === '/login') {
        const url = req.nextUrl.clone();
        url.pathname = '/daohang'; // 登录后跳转到首页或其他页面
        return NextResponse.redirect(url);
    }

    // 如果用户未登录且访问的是受保护页面，重定向到登录页面
    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone();
        url.pathname = '/login'; // 未登录时重定向到登录页
        return NextResponse.redirect(url);
    }

    // 默认：让请求继续执行
    return NextResponse.next();
}

// 可以通过 matcher 来限制中间件的应用范围
export const config = {
  matcher: ['/daohang', '/login',"/","/daohang/yyjk"], // 仅在需要的路径下生效
};

