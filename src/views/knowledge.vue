<script setup>
import {onMounted,ref } from 'vue';
import PageHead from '@/components/PageHead.vue';
import Tablesearch from '@/components/Tablesearch.vue';
import { catagoryTree } from '@/api/admin.js';

const formItem = [
    {comp:'input',prop:'title',label:'文章标题',placeholder:'请输入文章标题'},
    {comp:'select',prop:'catagoryId',label:'分类',placeholder:'请选择分类'
    }
]
const handleSearch = (formData) => {
    console.log(formData,'查询参数')
    
}
</script>

<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">编辑</el-button>
            </template>
        </PageHead>
        <Tablesearch :formItem="formItem" @search="search" />
        <!--回调函数在组件内部调用然后拿到form表单的结果 -->
    </div>
</template>
