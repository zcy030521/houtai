"use client";
import React from 'react'
import './jyfx.css'
import { Card, Tabs, Table,Pagination } from "antd";
import Operation from '../components/Operation3'
import './iconFontb.css'

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: '订单金额',
    children: <Operation />,
  },
  {
    key: '2',
    label: '订单用户',
    children: <Operation />,
  },
  {
    key: '3',
    label: '订单数',
    children: <Operation />,
  },
  {
    key: '4',
    label: '支付订单',
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
    title: '订单金额(万元)',
    dataIndex: 'xin',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '订单用户',
    dataIndex: 'ri',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '支付订单',
    dataIndex: 'zhou',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '订单数',
    dataIndex: 'yue',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '用户ARPU',
    dataIndex: 'qi',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '订单完成率',
    dataIndex: 'dan',
    sorter: (a, b) => a.age - b.age,
  },
 
];
const data = [
  {
    key: '1',
    time:'2021-03-21',
    xin: 690,
    ri:'1,292',
    zhou:'6,274',
    yue:'19,206',
    qi:'30.41',
    dan:'30.12%',
  },
  {
    key: '2',
    time:'2021-03-20',
    xin: 500,
    ri:'1,352',
    zhou:'6,252',
    yue:'19,061',
    qi:'28.94',
    dan:'31.12%',
  },
  {
    key: '3',
    time:'2021-03-19',
    xin: 500,
    ri:'1,218',
    zhou:'6,221',
    yue:'18,914',
    qi:'28.72',
    dan:'40.12%',
  },
  {
    key: '4',
    time:'2021-03-18',
    xin: 500,
    ri:'1,301',
    zhou:'6,205',
    yue:'18,892',
    qi:'28.41',
    dan:'34.62%',
  },

  // {
  //   key: '5',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
  // {
  //   key: '6',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
  // {
  //   key: '7',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
  // {
  //   key: '8',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
  // {
  //   key: '9',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
  // {
  //   key: '10',
  //   time:'2021-03-18',
  //   xin: 500,
  //   ri:'1,301',
  //   zhou:'6,205',
  //   yue:'18,892',
  //   qi:'2841',
  //   dan:'0:05:01',
  // },
];
// const onChange = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

export default function page() {

  return (
    <div>
      <div className="yhfx-header">
        <div className="yhfx-header-1">
          {/* 卡片一 */}
          <Card>
            <div className="box-1">
              <h1>交易分析</h1>
              <div className="yhfx-header-1-1">
                <span>数据指标
                  <i className='iconfont icon-wenhao-yuankuang' ></i>
                </span>
                <span> 2021-03-13</span>
              </div>
            </div>
          </Card>

          {/* 卡片二 */}
          <Card>
            <p style={{ fontSize: '20px' }}>交易概况</p>
          </Card>

          {/* 卡片三 */}
          <Card>
            <div className="div-main">

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>1,000.00</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>订单金额（元）</p>
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
                  <p style={{ fontSize: '18px' }}>订单用户</p>
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
                  <p style={{ fontSize: '18px' }}>支付订单数</p>
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
                  <p style={{ fontSize: '18px' }}>订单完成率</p>
                </div>
              </div>

              <div className="div-main-1">
                <div className='div-main-1-1'>
                  <div className='div-main-a'>
                    <p style={{ border: '1px solid white' }}>
                      <span style={{ fontSize: '40px', fontWeight: '8px', color: 'black' }}><b>00:05:00</b></span>
                      <i className='iconfont icon-arrow-drop-up-fill' ></i>
                      <span style={{ color: 'red', marginLeft: '-10px' }}>10%</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '18px' }}>用户ARPU</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 卡片四 */}
          <Card>
            <p style={{ fontSize: '20px' }}>交易趋势</p>
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
