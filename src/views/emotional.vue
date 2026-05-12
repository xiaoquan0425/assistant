<template>
    <div>
        <PageHead title="情绪日志" />
        <TableSearch :formItem="formItem" @search="handleSearch" />
        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="id" label="用户ID" width="80" />
            <el-table-column label="会话ID" width="80" >
                <template #default="scope">
                    <el-avatar>{{ scope.row.nickname }}</el-avatar>
                </template>
               </el-table-column>
            <el-table-column prop="diaryDate" label="记录日期" width="120" />
            <el-table-column label="情绪评分" >
                <template #default="scope">
                    <el-rate :model-value="scope.row.moodScore" :max="10" disabled></el-rate>
                </template>
               </el-table-column>
            <el-table-column label="生活指标" width="120" >
                <template #default="scope">
                    <div>
                        <p>
                            睡眠：{{ scope.row.sleepQuality }}/5
                        </p>
                         <p>
                            压力：{{ scope.row.stressLevel }}/5
                        </p>
                    </div>
                </template>
               </el-table-column>
            <el-table-column prop="emotionTriggers" label="情绪触发因素" width="120" />
            <el-table-column prop="diaryContent" label="日记内容" width="150" />
             <el-table-column  label="操作" width="200" fixed="right">
                <template #default="scope">
                    <el-button @click="viewSessionDetail(scope.row)"text type ="primary">详情</el-button>
                    <el-button text type ="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
        style="margin-top: 25px"
        :page-size="pagination.size"
        layout="prev, pager, next" 
        :total="pagination.total" 
        @change="handleChange"></el-pagination>
        <el-dialog
        v-model="detailDialogVisible"
        title="情绪日志详情"
        width="800px"
        :close-on-click-modal="false"
        >
        <div v-if="currentDetail">
            <div class="detail-section">
                <h4>用户信息</h4>
                <el-descriptions>
                    <el-descriptions-item label="用户名">{{ currentDetail.username }}</el-descriptions-item>
                    <el-descriptions-item label="昵称">{{ currentDetail.nickname }}</el-descriptions-item>
                    <el-descriptions-item label="用户ID">{{ currentDetail.userId }}</el-descriptions-item>
                    <el-descriptions-item label="记录日期">{{ currentDetail.diaryDate }}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="detail-section">
                <h4>情绪状态</h4>
                <el-descriptions>
                    <el-descriptions-item label="情绪评分">
                        <el-rate :model-value="currentDetail.moodScore" :max="10" disabled></el-rate>
                    </el-descriptions-item>
                    <el-descriptions-item label="主要情绪">
                        <el-tag type="info">{{ currentDetail.nickname }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="用户ID">{{ currentDetail.userId }}</el-descriptions-item>
                    <el-descriptions-item label="记录日期">{{ currentDetail.diaryDate }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref,onMounted,reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import {getEmotionalPage} from '@/api/admin.js'

const getEmotionTagType = (emotion) => {
  const emotionTypes = {
    '快乐': 'success',
    '平静': 'info',
    '兴奋': 'warning',
    '愤怒': 'danger',
    '悲伤': 'info',
    '焦虑': 'warning'
  }
  return emotionTypes[emotion] || 'info'
}

const getAiEmotionTagType = (emotion) => {
  const emotionTagMap = {
    '快乐': 'success',
    '平静': 'success',
    '兴奋': 'warning',
    '满足': 'success',
    '愤怒': 'danger',
    '悲伤': 'info',
    '焦虑': 'warning',
    '恐惧': 'danger',
    '沮丧': 'info',
    '压力': 'warning'
  }
  return emotionTagMap[emotion] || 'info'
}

const getEmotionScoreColor = (score) => {
  if (score >= 80) return '#f56c6c'
  if (score >= 60) return '#e6a23c'
  if (score >= 40) return '#909399'
  return '#67c23a'
}

const getRiskLevelTagType = (riskLevel) => {
  const riskTagMap = {
    0: 'success',
    1: 'info',
    2: 'warning',
    3: 'danger'
  }
  return riskTagMap[riskLevel] || 'info'
}

const getRiskLevelText = (riskLevel) => {
  const riskTextMap = {
    0: '正常',
    1: '关注',
    2: '预警',
    3: '危机'
  }
  return riskTextMap[riskLevel] || '未知风险等级'
}

const formItem = [
    {name: 'input', prop: 'userId', label: '用户ID', placeholder: '请输入用户ID'},
    {name:'select',prop:'moodScreRange',label:'情绪评分',placeholder:'请选择网络计分',options:[{
        label:'低分(1-3)',
        value:'1-3'
    },{
        label:'中分(4-6)',
        value:'4-6'
    },{
        label:'高分(7-10)',
        value:'7-13'
    }]}
]
const tableData = ref([])
const handleSearch = async(formData) => {
        const params = {
        ...pagination,
        ...formData
    }
    console.log(params)
    const {records, total} = await getEmotionalPage(params)
    tableData.value = records
    pagination.total = total
    
}


const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})

const handleChange = (page) => {
    pagination.currentPage = page
    handleSearch()
}
const currentDetail = ref(null)
const detailDialogVisible = ref(false)
const viewSessionDetail = (row) => {
    currentDetail.value = row
    detailDialogVisible.value = true
}

onMounted(()=>{
    handleSearch()
})
</script>