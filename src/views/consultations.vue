<template>
    <div>
        <PageHead title="咨询记录" />
        <el-table :data="tableData"style="width:100%">
            <el-table-column label="会话ID" width="100">
                <template #default="scope">
                    <el-avatar {{ scope.row.userNickname }}></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="情绪日志">
                <template #default="scope">
                    <div class="session-title">{{ scope.row.sessionTitle }}</div>
                    <div class="session-preview">{{scope.row.lastMessageContent}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="messageCount" label="消息数" width="100">
            </el-table-column>
            <el-table-column prop="lastMessageTime" label="时间" width="100">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button type="primary" text @click="viewSessionDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
        style="margin-top: 25px"
        :page-size="pagination.size"
        layout="prev, pager, next" 
        :total="pagination.total" 
        @change="handleChange"></el-pagination>
        <el-dialog>
            v-model="showDetailDialog"
            title="咨询会话详情"
            width="70%"
            :close-on-click-modal="false"
            <div class="session-detail">
                <div class="detail-header">
                    <div class="detail-row">
                        <div class="detail-label">用户：</div>
                        <div class="detail-value">{{ sessionDetail.userNickname }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">开始时间：</div>
                        <div class="detail-value">{{ sessionDetail.startedAt }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">消息数：</div>
                        <div class="detail-value">{{ sessionDetail.messageCount }}</div>
                    </div>
                </div>
                <div class="message-container"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import PageHead from '@/components/PageHead.vue';
import {ref,onMounted,reactive} from 'vue'
import { getConsultationPage } from '@/api/admin';

const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})

const tableData = ref([])
onMounted(()=>{
    handleSearch()
})
const sessionDetail = ref({})
const viewSessionDetail = (row) => {
    sessionDetail.value=row
    showDetailDialog.value = true
}
const handleChange = (page) => {
    pagination.currentPage = page
   handleSearch()
}

const handleSearch = () => {
    getConsultationPage(pagination).then(res=>{

        const{records,total} = res
        tableData.value =records
        pagination.total = total
    })
}

</script>