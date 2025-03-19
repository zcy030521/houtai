"use client"
import React, { useState, useRef, useEffect } from 'react';
// import fetch from "@/instannces/fetch"
import './aiyemian.css';

// 定义消息对象的类型，包含消息文本和发送者
type Message = {
  text: string;
  sender: 'user' | 'ai' | 'system';
};

// 定义相关问题数组的类型，是一个字符串数组
type RelatedQuestions = string[];

// 定义服务器响应数据的类型，包含文本、完成状态、相关问题和错误信息等可选属性
type ResponseData = {
  text?: string;
  done?: boolean;
  relatedQuestions?: RelatedQuestions;
  error?: string;
};

// 定义 Aiyemian 组件
function Aiyemian() {
  // 存储聊天消息的数组，初始为空
  const [messages, setMessages] = useState<Message[]>([]);
  // 存储用户输入的消息，初始为空字符串
  const [inputMessage, setInputMessage] = useState<string>('');
  // 表示是否正在加载数据，初始为 false
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 存储相关问题的数组，初始为空
  const [relatedQuestions, setRelatedQuestions] = useState<RelatedQuestions>([]);
  // 存储当前正在接收的响应内容，初始为空字符串
  const [currentResponse, setCurrentResponse] = useState<string>('');
  // 存储复制操作的结果提示信息，初始为空字符串
  const [copySuccess, setCopySuccess] = useState<string>('');
  // 存储当前使用的语言，只能是 '中文' 或 'English'，初始为 '中文'
  const [currentLanguage, setCurrentLanguage] = useState<'中文' | 'English'>('中文');
  // 表示是否正在进行语音识别，初始为 false
  const [isListening, setIsListening] = useState<boolean>(false);
  // 新增状态，用于存储上一个问题
  const [lastQuestion, setLastQuestion] = useState<string>('');

  // 定义复制文本到剪贴板的函数
  const copyToClipboard = async (text: string) => {
    try {
      // 使用浏览器的剪贴板 API 将文本复制到剪贴板
      await navigator.clipboard.writeText(text);
      // 复制成功，设置复制成功提示
      setCopySuccess('已复制！');
      // 2 秒后清除复制成功提示
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      // 复制失败，打印错误信息并设置复制失败提示
      console.error('复制失败:', err);
      setCopySuccess('复制失败');
    }
  };

  // 处理语言切换的函数
  const handleLanguageChange = (language: '中文' | 'English') => {
    // 更新当前语言状态
    setCurrentLanguage(language);
    // 将语言切换提示添加到消息列表中
    setMessages(prev => [...prev, {
      text: language === '中文' ? '已切换到中文模式' : 'Switched to English mode',
      sender: 'system'
    }]);
  };

  // 处理发送消息的函数
  const handleSendMessage = async (text = inputMessage) => {
    // 如果输入的消息为空，直接返回
    if (!text.trim()) return;

    // 去除输入消息前后的空格
    const userMessage = text.trim();
    // 更新上一个问题状态
    setLastQuestion(userMessage);
    // 将用户消息添加到消息列表中
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    // 清空输入框
    setInputMessage('');
    // 设置加载状态为 true
    setIsLoading(true);
    // 清空当前响应内容
    setCurrentResponse('');

    try {
      // 发送 POST 请求到指定的 API 端点，携带用户消息和上一个问题
      const response = await fetch('http://localhost:3100/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ message: userMessage, lastQuestion: lastQuestion })
      });

      // 如果响应状态码不是 200，抛出错误
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 获取响应体的读取器
      const reader = response.body.getReader();
      // 创建解码器，用于解码响应内容
      const decoder = new TextDecoder();
      // 用于累加响应内容的变量
      let accumulatedResponse = '';

      // 循环读取响应内容
      while (true) {
        const { value, done } = await reader.read();
        // 如果读取完成，退出循环
        if (done) break;

        // 解码读取到的内容
        const chunk = decoder.decode(value);
        // 将解码后的内容按行分割
        const lines = chunk.split('\n');

        // 遍历每一行
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              // 解析数据，去除 'data: ' 前缀
              const data: ResponseData = JSON.parse(line.slice(6));

              // 如果数据包含错误信息，抛出错误
              if (data.error) {
                throw new Error(data.error);
              }

              // 如果数据包含文本内容，累加响应并更新当前响应状态
              if (data.text) {
                accumulatedResponse += data.text;
                setCurrentResponse(accumulatedResponse);
              }

              // 如果数据表示响应完成
              if (data.done) {
                // 将完整的响应添加到消息列表中
                setMessages(prev => [...prev, {
                  text: accumulatedResponse,
                  sender: 'ai'
                }]);
                // 清空当前响应状态
                setCurrentResponse('');

                // 如果数据包含相关问题，更新相关问题状态
                if (data.relatedQuestions) {
                  setRelatedQuestions(data.relatedQuestions);
                }
              }
            } catch (e) {
              // 解析数据出错，打印错误信息
              console.error('解析数据错误:', e);
            }
          }
        }
      }
    } catch (error) {
      // 捕获请求过程中的错误，打印错误信息并将错误提示添加到消息列表中
      console.error('聊天错误:', error);
      setMessages(prev => [...prev, {
        text: `抱歉，发生错误：${error.message}`,
        sender: 'ai'
      }]);
    } finally {
      // 无论请求成功还是失败，都将加载状态设置为 false
      setIsLoading(false);
    }
  };

  // 处理输入框按键事件的函数
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 当按下 Enter 键且没有按下 Shift 键时
    if (e.key === 'Enter' && !e.shiftKey) {
      // 阻止默认的换行行为
      e.preventDefault();
      // 调用发送消息的函数
      handleSendMessage();
    }
  };

  // 开始语音识别的函数
  const startListening = () => {
    // 检查浏览器是否支持语音识别 API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // 创建语音识别实例
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      // 设置语音识别参数
      recognition.continuous = false; // 只识别一次
      recognition.interimResults = false; // 只返回最终结果
      // 根据当前语言设置识别语言
      recognition.lang = currentLanguage === '中文' ? 'zh-CN' : 'en-US';

      // 开始语音识别
      recognition.start();
      // 设置语音识别状态为 true
      setIsListening(true);

      // 处理语音识别结果
      recognition.onresult = (event: any) => {
        // 获取识别结果的文本
        const transcript = event.results[0][0].transcript;
        // 将识别结果设置到输入框
        setInputMessage(transcript);
        // 设置语音识别状态为 false
        setIsListening(false);
      };

      // 处理语音识别错误
      recognition.onerror = (event: any) => {
        // 打印错误信息并设置语音识别状态为 false
        console.error('语音识别错误:', event.error);
        setIsListening(false);
      };

      // 处理语音识别结束事件
      recognition.onend = () => {
        // 设置语音识别状态为 false
        setIsListening(false);
      };
    } else {
      // 浏览器不支持语音识别，弹出提示框
      alert('您的浏览器不支持语音识别功能');
    }
  };

  return (
    <div className="chat-container">
      {/* 聊天界面的头部 */}
      <div className="chat-header">
        <h1 className="chat-title">AI 助手</h1>
        <div className="language-switcher">
          {/* 中文语言切换按钮 */}
          <button
            className={`language-btn ${currentLanguage === '中文' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('中文')}
          >
            中文
          </button>
          {/* 英文语言切换按钮 */}
          <button
            className={`language-btn ${currentLanguage === 'English' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('English')}
          >
            English
          </button>
        </div>
      </div>
      {/* 聊天消息显示区域 */}
      <div className="chat-messages">
        {/* 显示上一个问题 */}
        {lastQuestion && (
          <div className="last-question">
            {/* {currentLanguage === '中文' ? '上一个问题: ' : 'Last question: '} */}
            {/* <span>{lastQuestion}</span> */}
          </div>
        )}
        {/* 遍历消息列表并渲染每条消息 */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}-message`}
          >
            <div className="message-content">
              {message.text}
              {/* 如果消息是 AI 发送的，显示复制按钮 */}
              {message.sender === 'ai' && (
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(message.text)}
                >
                  {/* 根据复制状态显示不同的按钮文本 */}
                  {copySuccess && index === messages.length - 1 ? copySuccess : '复制'}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* 如果有当前响应内容，显示该内容 */}
        {currentResponse && (
          <div className="message ai-message">
            <div className="message-content">
              {currentResponse}
            </div>
          </div>
        )}

        {/* 如果正在加载且没有当前响应内容，显示加载提示 */}
        {isLoading && !currentResponse && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">
              {currentLanguage === '中文' ? 'AI 正在思考中...' : 'AI is thinking...'}
            </span>
          </div>
        )}

        {/* 如果有相关问题且不在加载中且没有当前响应内容，显示相关问题列表 */}
        {relatedQuestions.length > 0 && !isLoading && !currentResponse && (
          <div className="related-questions">
            <div className="related-questions-title">
              {currentLanguage === '中文' ? '您可能还想问：' : 'You might also want to ask:'}
            </div>
            <div className="related-questions-list">
              {/* 遍历相关问题列表并渲染每个问题 */}
              {relatedQuestions.map((question, index) => (
                <div
                  key={index}
                  className="related-question"
                  onClick={() => setInputMessage(question)}
                >
                  • {question}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 输入框和按钮区域 */}
      <div className="input-container">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={currentLanguage === '中文' ? '输入消息...' : 'Type a message...'}
          rows="2"
        />
        <button
          className={`voice-btn ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          disabled={isLoading}
        >
          {/* 根据语音识别状态显示不同的按钮文本或图标 */}
          {isListening ? (
            currentLanguage === '中文' ? '正在听...' : 'Listening...'
          ) : (
            <i className="fas fa-microphone"></i>
          )}
        </button>
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputMessage.trim()}
        >
          {/* 根据当前语言显示不同的按钮文本 */}
          {currentLanguage === '中文' ? '发送' : 'Send'}
        </button>
      </div>
    </div>
  );
}

// 导出 Aiyemian 组件
export default Aiyemian;