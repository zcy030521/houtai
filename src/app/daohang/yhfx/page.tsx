"use client";
import React from 'react'
import './yhfx.css'
import { Card, Tabs } from "antd";
import Operation from '../components/Operation2'

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
import './iconFonta.css'
export default function page() {

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
                <span> 2021-03-13</span>
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
                  <p style={{ fontSize: '18px' }}>新增用户</p>
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
            </div>
          </Card>

          {/* 卡片六 */}
          <Card>
            <p style={{ fontSize: '20px' }}>用户趋势</p>
          </Card>

          {/* 卡片七 */}
          <Card>
            <div className="div-bottom">

            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
