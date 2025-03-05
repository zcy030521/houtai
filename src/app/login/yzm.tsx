'use client'
import React, { useState, useRef } from 'react';

const Captcha = () => {
  // 设置验证码的初始状态
  const [captcha, setCaptcha] = useState('');
  const [inputValue, setInputValue] = useState('');
  const canvasRef = useRef(null);

  // 生成随机验证码
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 4; i++) {
      captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captchaText);
    drawCaptcha(captchaText);
  };
  // 在 canvas 上绘制验证码
  const drawCaptcha = (captchaText) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height); // 清空画布

    // 设置背景
    context.fillStyle = '#f1f1f1';
    context.fillRect(0, 0, width, height);

    // 设置字体
    context.font = '30px Arial';
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // 绘制验证码文本
    context.fillText(captchaText, width / 2, height / 2);

    // 添加一些干扰线条
    for (let i = 0; i < 5; i++) {
      context.beginPath();
      context.moveTo(Math.random() * width, Math.random() * height);
      context.lineTo(Math.random() * width, Math.random() * height);
      context.strokeStyle = 'rgba(0,0,0,0.3)';
      context.stroke();
    }

    // 添加干扰点
    for (let i = 0; i < 30; i++) {
      context.beginPath();
      context.arc(Math.random() * width, Math.random() * height, 1, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(0,0,0,0.3)';
      context.fill();
    }
  };

  // 处理输入框的变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 验证输入的验证码
  const validateCaptcha = () => {
    if (inputValue === captcha) {
      alert('验证码正确');
    } else {
      alert('验证码错误');
    }
  };

  // 初始化时生成验证码
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px',display:"flex" }}>
      <canvas ref={canvasRef} width="200" height="50" onClick={generateCaptcha} style={{ border: '1px solid #000' }}></canvas>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入验证码"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={validateCaptcha}>验证</button>
      </div>
    </div>
  );
};

export default Captcha;
