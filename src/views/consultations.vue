<template>
    <div>
        <PageHead title="咨询记录" />
        <el-table :data="tableData"style="width:100%">
            <el-table-column label="会话ID" width="200">
                <template #default="scope">
                    <el-avatar :src="scope.row.userNickname"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="情绪日志" width="200">
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
                    <el-button type="primary" text @click="viewSessionDetail">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import PageHead from '/components/PageHead.vue';
import {ref,onMounted,reactive} from 'vue'
import { getConsultationPage } from '@/api/admin';

const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})

const tableData = ref([])
onMounted(()=>{
    getConsultationPage(pagination).then(res=>{
        const{records,total} = res.records
        tableData.value =records
        pagination.total = total
    })
})

const viewSessionDetail = () => {
    
}


</script>