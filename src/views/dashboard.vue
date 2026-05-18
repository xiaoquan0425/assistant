<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar users">
                            <el-image style="width: 40px;height:40px" :src="iconUrl1"></el-image>
                        </div>
                        <div class="info">
                            <p class="title">总用户数</p>
                            <p class="number">{{ aiData.systemOverview.totalUsers }}</p>
                            <p class="subtitle-title">活跃用户：{{ aiData.systemOverview.activeUsers }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar like">
                            <el-image style="width: 40px;height:40px" :src="iconUrl2"></el-image>
                        </div>
                        <div class="info">
                            <p class="title">情绪日志</p>
                            <p class="number">{{ aiData.systemOverview.totalDiaries }}</p>
                            <p class="subtitle-title">今日新增：{{ aiData.systemOverview.todayNewDiaries }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar comments">
                            <el-image style="width: 40px;height:40px" :src="iconUrl3"></el-image>
                        </div>
                        <div class="info">
                            <p class="title">咨询会话</p>
                            <p class="number">{{ aiData.systemOverview.totalSessions }}</p>
                            <p class="subtitle-title">今日新增：{{ aiData.systemOverview.todayNewSessions }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar smile">
                            <el-image style="width: 40px;height:40px" :src="iconUrl4"></el-image>
                        </div>
                        <div class="info">
                            <p class="title">平均情绪</p>
                            <p class="number">{{ aiData.systemOverview.avgMoodScore }}</p>
                            <p class="subtitle-title">情绪健康指数</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
        <!-- 修改：将条件判断移到外层，确保图表容器始终渲染 -->
        <el-row style="margin-top: 20px;" :gutter="20">
            <el-col :span="12">
                <el-card style="width:100%">
                    <template #header>
                        <div class="card-header">
                            情绪趋势分析
                        </div>
                    </template>
                    <div class="chart-content">
                        <!-- 这里不添加条件判断，确保图表容器始终存在 -->
                        <div ref="emotionChartRef" style="width:100%;height: 300px"></div>
                        <!-- 如果没有数据，显示提示 -->
                        <div v-if="!aiData.emotionTrend || aiData.emotionTrend.length === 0" 
                             style="text-align: center; padding: 50px; color: #999;">
                            <el-icon :size="40">
                                <DataLine />
                            </el-icon>
                            <p style="margin-top: 10px;">暂无数据</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick, watch } from 'vue';
import { getAnalyticsOverview } from '@/api/admin';
import * as echarts from 'echarts';
import { DataLine } from '@element-plus/icons-vue';

const iconUrl1 = new URL('@/assets/users.png', import.meta.url).href
const iconUrl2 = new URL('@/assets/like.png', import.meta.url).href
const iconUrl3 = new URL('@/assets/comments.png', import.meta.url).href
const iconUrl4 = new URL('@/assets/smile.png', import.meta.url).href

const aiData = ref({})
const loading = ref(false)

// 情绪趋势
let emotionChart = null
const emotionChartRef = ref(null)

// 修改：监听aiData的变化
watch(() => aiData.value.emotionTrend, (newVal) => {
    if (newVal && newVal.length > 0) {
        // 等待DOM更新
        nextTick(() => {
            initEmotionChart()
        })
    } else {
        // 如果没有数据，销毁图表
        if (emotionChart) {
            emotionChart.dispose()
            emotionChart = null
        }
    }
}, { deep: true, immediate: true })

const initEmotionChart = () => {
    console.log('初始化图表，容器：', emotionChartRef.value)
    
    if (!emotionChartRef.value) {
        console.error('图表容器未找到')
        return
    }
    
    // 数据变化时，销毁之前的图表
    if (emotionChart) {
        emotionChart.dispose()
        emotionChart = null
    }
    
    // 获取情绪趋势的数据
    const trendData = aiData.value.emotionTrend || []
    
    if (trendData.length === 0) {
        console.warn('没有情绪趋势数据')
        return
    }
    
    console.log('图表数据:', trendData)
    
    // 创建Echarts实例
    emotionChart = echarts.init(emotionChartRef.value)
    
    // 配置项
    const option = {
        title: {
            text: '情绪趋势分析',
            textStyle: {
                color: '#2d3450',
                fontSize: 16,
                fontWeight: 600
            },
            left: 'center',
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            borderColor: '#fab1a0',
            borderWidth: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textStyle: {
                color: '#2d3436',
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 30
        },
        legend: {
            data: ['平均情绪评分', '记录数量'],
            top: 40
        },
        xAxis: {
            type: 'category',
            data: trendData.map(item => item.date),
            axisLine: {
                lineStyle: {
                    color: '#2d3436'
                }
            }
        },
        yAxis: [{
            type: 'value',
            name: '情绪评分',
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#2d3436'
                }
            }
        }, {
            type: 'value',
            name: '记录数量',
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#2d3436'
                }
            }  
        }],
        series: [{
            name: '平均情绪评分',
            type: 'line',
            yAxisIndex: 0,
            data: trendData.map(item => item.avgMoodScore),
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#fae1a0'
            },
            itemStyle: {
                color: '#fae1a0'
            }
        }, {
            name: '记录数量',
            type: 'line',
            yAxisIndex: 1,
            data: trendData.map(item => item.recordCount),
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#eeb5a3'
            },
            itemStyle: {
                color: '#eeb5a3'
            }
        }]
    }
    
    emotionChart.setOption(option)
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
}

// 窗口大小变化时重绘图表
const handleResize = () => {
    if (emotionChart) {
        emotionChart.resize()
    }
}

onMounted(async () => {
    try {
        console.log('开始获取数据...')
        loading.value = true
        
        const res = await getAnalyticsOverview()
        console.log('获取到的数据:', res)
        
        aiData.value = res
        
        // 这里不再调用initCharts，由watch自动监听数据变化
    } catch (error) {
        console.error('获取数据失败:', error)
    } finally {
        loading.value = false
    }
})

onUnmounted(() => {
    // 清理图表实例
    if (emotionChart) {
        emotionChart.dispose()
        emotionChart = null
    }
    // 移除事件监听
    window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.dashboard-container {
    padding: 20px;
    
    .card-content {
        display: flex;
        align-items: center;
        .avatar {
            margin-right: 12px;
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.users {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            &.like {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
            &.comments {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }
            &.smile {
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            }
        }
        .info {
            .title {
                font-size: 14px;
                color: #7f8c8d;
                margin-bottom: 4px;
            }
            .number {
                font-size: 24px;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 4px;
            }
            .subtitle-title {
                font-size: 12px;
                color: #95a5a6;
            }
        }
    }
    
    .card-header {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
    }
    
    .chart-content {
        height: 300px;
        position: relative;
        
        canvas {
            width: 100% !important;
            height: 100% !important;
        }
    }
}
</style>