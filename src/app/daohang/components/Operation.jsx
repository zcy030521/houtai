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
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
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

    return <div ref={chartRef} style={{ width: '950px', height: '225px' }} />;
};

export default Operation;