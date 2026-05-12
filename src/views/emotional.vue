<template>
    <div>
        <PageHead title="情绪日志" />
        <TableSearch :formItem="formItem" @search="handleSearch" />
        <el-table :data:="tableData" style="width:100%">
            <el-table-column prop="userId" label="用户ID" width="100" />
            <el-table-column prop="moodScore" label="情绪评分" width="100" />
            <el-table-column prop="moodScreRange" label="情绪评分范围" width="100" />
            <el-table-column prop="createdAt" label="创建时间" width="100" />
        </el-table>
    </div>
</template>
<script setup>
import { ref,onMounted,reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import {getEmotionalPage} from '@/api/admin.js'

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

    const {records, total} = await getEmotionalPage(params)
    tableData.value = records
    pagination.total = total
    
}


const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})

onMounted(()=>{
    handleSearch()
})
</script>