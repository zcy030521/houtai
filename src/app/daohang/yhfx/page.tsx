"use client";
import React, { useState, useEffect } from 'react'
import './yhfx.css'
import { Card, Tabs, Table, Pagination } from "antd";
import Operation from '../components/Operation2'
import './iconFonta.css'
const onChange = (key) => {
  console.log(key);
};


const items = [
  {
    key: '1',
    label: '新增用户',
    children: <Operation />,
  },
  {
    key: '2',
    label: '日活跃',
    children: <Operation />,
  },
  {
    key: '3',
    label: '周活跃',
    children: <Operation />,
  },
  {
    key: '4',
    label: '月活跃',
    children: <Operation />,
  },
  {
    key: '5',
    label: '启动次数',
    children: <Operation />,
  },
  {
    key: '6',
    label: '单次平均使用时长',
    children: <Operation />,
  },
];

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '新增用户',
    dataIndex: 'xin',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '日活跃',
    dataIndex: 'ri',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '周活跃',
    dataIndex: 'zhou',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '月活跃',
    dataIndex: 'yue',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '启动次数',
    dataIndex: 'qi',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '单次平均使用时长',
    dataIndex: 'dan',
    sorter: (a, b) => a.age - b.age,
  },

];
const data = [
  {
    key: '1',
    time: '2021-03-21',
    xin: 690,
    ri: '1,292',
    zhou: '6,274',
    yue: '19,206',
    qi: '3041',
    dan: '0:04:59',
  },
  {
    key: '2',
    time: '2021-03-20',
    xin: 500,
    ri: '1,352',
    zhou: '6,252',
    yue: '19,061',
    qi: '2894',
    dan: '0:05:02',
  },
  {
    key: '3',
    time: '2021-03-19',
    xin: 500,
    ri: '1,218',
    zhou: '6,221',
    yue: '18,914',
    qi: '2872',
    dan: '0:05:05',
  },
  {
    key: '4',
    time: '2021-03-18',
    xin: 500,
    ri: '1,301',
    zhou: '6,205',
    yue: '18,892',
    qi: '2841',
    dan: '0:05:01',
  },
];


export default function page() {

  const [date, setDate] = useState("data输一局")
  const [currentTime, setCurrentTime] = useState<string>("")
  useEffect(() => {
    console.log('111111111111111111111111111111', date);
  })
  // 获取当日时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-'));
    };

    updateTime();
    // 设置定时更新（每秒更新一次）
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
    // console.log('111111111111111111111111111111', date);
  },)

  return (
    <div>
      <div className="yhfx-header">
        <div className="yhfx-header-1">
          {/* 卡片一 */}
          <Card>
            <div className="box-1">
              <h1>用户分析</h1>
              <div className="yhfx-header-1-1">
                <span>数据指标
                  <i className='iconfont icon-wenhao-yuankuang' ></i>
                </span>
                <span> {currentTime}</span>
              </div>
            </div>
          </Card>

          {/* 卡片二 */}
          <Card>
            <p style={{ fontSize: '20px' }}>用户概况</p>
          </Card>

          {/* 卡片三 */}
          <Card>
            <div className="div-main">

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>新增用户</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-caret-up-copy-copy' ></i>
                      <span style={{ color: 'green', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>活跃用户</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>DAU/MAU</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>启动次数</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>单次平均使用时间</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>13,856</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>新增用户</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 卡片四 */}
          <Card>
            <p style={{ fontSize: '20px' }}>用户趋势</p>
          </Card>

          {/* 卡片五 */}
          <Card>
            <div className="div-foot">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </Card>

          {/* 卡片六 */}
          <Card>
            <p style={{ fontSize: '20px' }}>用户趋势</p>
          </Card>

          {/* 卡片七 */}
          <Card>
            <div className="div-bottom">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
              >
              </Table >
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
