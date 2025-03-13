'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Operation = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // 初始化 echarts 实例
        const myChart = echarts.init(chartRef.current);

        // 指定图表的配置项和数据
        const option = {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        // 组件卸载时销毁图表实例，避免内存泄漏
        return () => {
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default Operation;