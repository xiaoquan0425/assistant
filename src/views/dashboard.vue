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
            <el-row style="margin-top: 20px;" :gutter="20">
                <el-col :span="12">
                    <el-card style="width:100%">
                        <template #header>
                            <div class="card-header">
                                情绪趋势分析
                            </div>
                        </template>
                        <div class="chart-content">
                            <div ref="emotionChartRef" style="width:100%;height: 300px"></div>
                        </div>
                    </el-card>
                </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { onMounted ,ref} from 'vue';
import { getAnalyticsOverview } from '@/api/admin';
import * as echarts from 'echarts';

const iconUrl1 = new URL('@/assets/users.png', import.meta.url).href
const iconUrl2 = new URL('@/assets/like.png', import.meta.url).href
const iconUrl3 = new URL('@/assets/comments.png', import.meta.url).href
const iconUrl4 = new URL('@/assets/smile.png', import.meta.url).href

const aiData = ref({})

//情绪趋势
let emotionChart = null
const emotionChartRef = ref(null)

const initCharts = () => {
    initEmotionChart()
}

const initEmotionChart = () => {
    if(!emotionChartRef.value) return
    //数据变化时，销毁之前的图表
    if (emotionChart) {
        emotionChart.dispose()
    }
}
    //创建Echarts实例
    emotionChart = echarts.init(emotionChartRef.value)
    //获取情绪趋势的数据
    const TrendData = aiData.value.emotionTrend
    //配置项
    const option = {
        title: {
            text: '情绪趋势分析',
            textStyle: {
                color: '#2d3450',
                fontSize: 16,
                fontWeight:600
            },
            left: 'center',
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            borderColor: '#fab1a0',
            borderWidth: 1,
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
            data: TrendData.map(item => item.date),
            axisLine:{
                lineStyle:{
                    color:'#2d3436'
                }
            }
        },
        yAxis: [{
            type: 'value',
            name: '情绪评分',
            position: 'left',
            axisLine:{
                lineStyle:{
                    color:'#2d3436'
                }
             }
           },{
            type: 'value',
            name: '记录数量',
            position: 'right',
            axisLine:{
                lineStyle:{
                    color:'#2d3436'
                }
            }  
            }
        ],
        series:[{
            name: '平均情绪评分',
            type:'line',
            data: TrendData.map(item => item.avgMoodScore),
            smooth: true,
            LineStyle:{
                width:3,
                color:'#fae1a0'
            },
            itemStyle:{
                color:'#fae1a0'
            }
        },{
            name: '记录数量',
            type:'line',
            data: TrendData.map(item => item.recordCount),
            smooth: true,
            LineStyle:{
                width:3,
                color:'#eeb5a3'
            },
            itemStyle:{
                color:'#eeb5a3'
            }
        }]
   
    }
 emotionChart.setOption(option)

onMounted(() => {
    getAnalyticsOverview().then((res) => {
    console.log(res)
    aiData.value = res
    initCharts()
    })
})

</script>

<style lang ="scss" scoped>
.dashboard-container {
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
          margin-bottom: 4px
        }
        .subtitle-title {
          font-size: 12px;
          color: #95a5a6;
        }
      }
    }
    .chart-content {
      padding: 20px;
      height: 300px;
      position: relative;

      canvas {
        width: 100% !important;
        height: 100% !important;
      }

      .consultation-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;

        .stat-item {
          text-align: center;

          .stat-label {
            font-size: 12px;
            color: #7f8c8d;
            margin-bottom: 4px;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
          }
        }
      }
    }
  }
</style>