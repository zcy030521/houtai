
import React from 'react'
import { Metadata } from 'next'
// import Operation from '../components/Operation'
import './yyjk.css'
import { Card } from "antd";
import './iconFont.css'

export const metadata: Metadata = {
  title: 'operation'
}
export default function page() {
  return (
    <div>
      <div className='operation-header'>
        {/* 左侧盒子布局 */}
        <div className="peration-left">
          <div className="left-1">
            <Card>
              <span>今日实时数据：统计时间：2019-10-08 11：43:52</span>

            </Card>
            <Card>
              <div className="card-1">

                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-gongzuozhuangtailiu'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>231</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>付款订单</p>
                  </div>
                </div>

                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-fukuanjine'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>￥1000.21</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>付款金额(元)</p>
                  </div>
                </div>
                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-huoyueyonghu'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>120311</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>活跃用户(今日)</p>
                  </div>
                </div>
                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-zhuanhuashuai'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>0.53</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>转化率(%)</p>
                  </div>
                </div>
                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-kedanjia'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>￥32.00</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>客单价(元)</p>
                  </div>
                </div>
                <div className="left-1-1">
                  <div className="left-1-2">
                    <i className='iconfont icon-xinzengyonghu'></i>
                  </div>
                  <div className="left-1-3">
                    <p style={{ fontSize: '35px', marginLeft: '10px' }}><b>122</b></p>
                    <p style={{ fontSize: '18px', marginLeft: '10px' }}>新增用户(今日)</p>
                  </div>
                </div>


              </div>
              {/* <i className='iconfont icon-gongzuozhuangtailiu'></i> */}
            </Card>

          </div>
          <div className="left-1">
            <Card>
              <p style={{fontSize:'20px'}}>代办事项</p>
            </Card>
            <Card>
              <ul className='left-ul'>
                <li className='left-li'>
                  <span>代付款订单</span>
                  <span>(11)</span>
                </li>

                <li className='left-li'>
                  <span>待发货社区</span>
                  <span>(11)</span>
                </li>

                <li className='left-li'>
                  <span>团长申请审核</span>
                  <span>(1)</span>
                </li>

                <li className='left-li'>
                  <span>售后订单审核</span>
                  <span>(1)</span>
                </li>

                <li className='left-li'>
                  <span>商品库存不足</span>
                  <span>(1)</span>
                </li>

                <li className='left-li'>
                  <span>广告即将到期</span>
                  <span>(1)</span>
                </li>
                
              </ul>
            </Card>
          </div>
          <div className="left-1"></div>
          <div className="left-1"></div>
        </div>
        {/* 右侧盒子布局 */}
        <div className="peration-right">

        </div>
      </div>
      {/* <Operation/> */}
    </div>

  )
}
