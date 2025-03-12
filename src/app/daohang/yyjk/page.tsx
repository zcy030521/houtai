// "use client";
import React from 'react'
import { Metadata } from 'next'
import Operation from '../components/Operation'
import './yyjk.css'
import { Card } from "antd";
// , DatePicker, Space
import './iconFont.css'

// const { RangePicker } = DatePicker;
// const onOk = (value) => {
//   console.log('onOk: ', value);
// };

export const metadata: Metadata = {
  title: 'operation'
}
export default function page() {
  return (
    <div>
      <div className='operation-header'>
        {/* 左侧盒子布局 */}
        <div className="peration-left">
          {/* 左侧盒子1 */}
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

          {/* 左侧盒子2 */}
          <div className="left-1">
            <Card>
              <p style={{ fontSize: '20px' }}>代办事项</p>
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
          {/* 左侧盒子3 */}
          <div className="left-1">
            <Card>
              <div className='left-center'>
                <p style={{ fontSize: '20px' }}>代办事项</p>
                <div className='left-center-1' style={{ fontSize: '20px' }}>
                  <div className="left-center-1-1">
                    <span>本周</span>
                    <span>本月</span>
                    <span>全年</span>
                  </div>
                  <div className="left-center-1-2">
                    {/* <Space direction="vertical" size={12}>
                      <DatePicker
                        showTime
                        onChange={(value, dateString) => {
                          console.log('Selected Time: ', value);
                          console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                      />
                      <RangePicker
                        showTime={{
                          format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(value, dateString) => {
                          console.log('Selected Time: ', value);
                          console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                      />
                    </Space> */}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <p>订单总数：
                <span><b>10000</b></span>
                <span style={{ marginLeft: '5px' }}>同比：</span>
                <span style={{ color: 'red' }}>口10%</span>
              </p>
              {/* Echarts图标 */}
              <Operation />
            </Card>
          </div>
          {/* 左侧盒子4 */}
          <div className="left-1">
            <Card>
            <div className='left-center'>
                <p style={{ fontSize: '20px' }}>代办事项</p>
                <div className='left-center-1' style={{ fontSize: '20px' }}>
                  <div className="left-center-1-1">
                    <span>本周</span>
                    <span>本月</span>
                    <span>全年</span>
                  </div>
                  <div className="left-center-1-2">
                    {/* <Space direction="vertical" size={12}>
                      <DatePicker
                        showTime
                        onChange={(value, dateString) => {
                          console.log('Selected Time: ', value);
                          console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                      />
                      <RangePicker
                        showTime={{
                          format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(value, dateString) => {
                          console.log('Selected Time: ', value);
                          console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                      />
                    </Space> */}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <p>订单总数：
                <span><b>10000</b></span>
                <span style={{ marginLeft: '5px' }}>同比：</span>
                <span style={{ color: 'red' }}>口10%</span>
              </p>
              {/* Echarts图标 */}
              <Operation />
            </Card>
          </div>
        </div>
        {/* 右侧盒子布局 */}
        <div className="peration-right">
          <div className="right-1">
            <Card>
              <p style={{ fontSize: '18px' }}>运营快捷入口</p>
            </Card>

            <Card >
              <div className='card-right'>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    新建商品
                  </span>
                </div>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    商品管理
                  </span>
                </div>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    发货管理
                  </span>
                </div>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    团长申请
                  </span>
                </div>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    订单管理
                  </span>
                </div>
                <div className='right-1-1'>
                  <span>
                    <i className='iconfont icon-tianjiatubiao'
                      style={{ marginRight: '5px' }}></i>
                    佣金明细
                  </span>
                </div>
              </div>


            </Card>
          </div>
          <div className="right-2">

            <Card>
              <div className="right-2-1">
                <p>商品销量排行</p>
                <div className='right-2-1-1'>
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span>全年</span>
                </div>
              </div>
            </Card>
            <div className="right-2-2">
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF0000', color: "white" }}>1</div>
                <div className="right-b">电动牙刷</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF0000', color: "white" }}>2</div>
                <div className="right-b">俏侬  牛油蛋挞皮 1020g 51个装烘焙食材</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF9C9C', color: "white" }}>3</div>
                <div className="right-b">汰渍 Tide 专业温和养护手洗洗衣液600G/瓶</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>4</div>
                <div className="right-b">LOVO乐蜗家纺60支全棉高支刺绣床上四件套</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>5</div>
                <div className="right-b">AOC AGON 爱攻3 27英寸</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>6</div>
                <div className="right-b">海天 酱油蚝油 味极鲜特级生抽 1.28L</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>7</div>
                <div className="right-b">光明 纯牛奶250mL*24盒</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>8</div>
                <div className="right-b">光明 纯牛奶250mL*24盒</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>9</div>
                <div className="right-b">光明 纯牛奶250mL*24盒</div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>10</div>
                <div className="right-b">光明 纯牛奶250mL*24盒</div>
                <div className="right-c">323,234</div>
              </div>
            </div>
          </div>

          <div className="right-3">
            <Card>
              <div className="right-2-1">
                <p>团长销量排行</p>
                <div className='right-2-1-1'>
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span>全年</span>
                </div>
              </div>
            </Card>


            <div className="right-2-3">
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF0000', color: "white" }}>1</div>
                <div className="right-3-b">mounika</div>
                <div className='right-3-d'>
                  石景山社区
                </div>
                <div className="right-c">323,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF0000', color: "white" }}>2</div>
                <div className="right-3-b">王多多</div>
                <div className='right-3-d'>
                  大竹林社区
                </div>
                <div className="right-c">223,234</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#FF9C9C', color: "white" }}>3</div>
                <div className="right-3-b">花嘟嘟</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">123,224</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>4</div>
                <div className="right-3-b">小乐乐</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">93,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>5</div>
                <div className="right-3-b">安心</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">83,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>6</div>
                <div className="right-3-b">小甜甜</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">64,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>7</div>
                <div className="right-3-b">sdgeee</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">45,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>8</div>
                <div className="right-3-b">王者荣耀</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">31,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>9</div>
                <div className="right-3-b">兴星</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">26,522</div>
              </div>
              <div className=' right-2-2-1'>
                <div className="right-a" style={{ backgroundColor: '#F0F2F5' }}>10</div>
                <div className="right-3-b">夯实</div>
                <div className='right-3-d'>
                  团购社区
                </div>
                <div className="right-c">323,2344</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  )
}
