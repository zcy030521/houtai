import React, { useRef, useState, useEffect } from 'react';

const Captcha = () => {
  const [showNum, setShowNum] = useState([]);
  const cav = useRef(null);

  useEffect(() => {
    draw();
  }, []);

  // 绘制验证码
  const draw = () => {
    const Canvas_DOM = cav.current;
    
    const cav_width = (Canvas_DOM as any).clientWidth;
    const cav_height = (Canvas_DOM as any).clientHeight;
    const context = (Canvas_DOM as any).getContext('2d');
    (Canvas_DOM as any).width = cav_width;
    (Canvas_DOM as any).height = cav_height;

    const sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    const aCode = sCode.split(',');
    const aLength = aCode.length;
    //类型
    let num= [];

    for (let i = 0; i <= 3; i++) {
      const j = Math.floor(Math.random() * aLength); // 获取到随机的索引值
      const deg = (Math.random() * 30 * Math.PI) / 180; // 产生0~30之间的随机弧度
      const txt = aCode[j]; // 得到随机的一个内容
      num[i] = txt.toLowerCase();

      const x = 6 + i * 25; // 文字在canvas上的x坐标
      const y = 20 + Math.random() * 8; // 文字在canvas上的y坐标

      context.font = 'bold 23px 微软雅黑';
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
    }

    for (let i = 0; i <= 5; i++) {
      // 验证码上显示随机线条
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(Math.random() * (Canvas_DOM as any).width, Math.random() * (Canvas_DOM as any).height);
      context.lineTo(Math.random() * (Canvas_DOM as any).width, Math.random() * (Canvas_DOM as any).height);
      context.stroke();
    }

    for (let i = 0; i <= 30; i++) {
      // 验证码上显示随机小点
      context.strokeStyle = randomColor();
      context.beginPath();
      const x = Math.random() * (Canvas_DOM as any).width;
      const y = Math.random() * (Canvas_DOM as any).height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
    localStorage.setItem("code", num.join(''))
    setShowNum(num as any);
  }; 

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  // 刷新验证码
  const refresh = () => {
    draw();
  };

  return (
    <div>
      <canvas
        className="canvas"
        ref={cav}
        style={{ width: '100px', height: '40px', display: 'inline-block', marginLeft: '12px', cursor: 'pointer' }}
        onClick={refresh}
      ></canvas>
    </div>
  );
};

export default Captcha;
