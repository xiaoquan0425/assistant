<script setup>
import {onMounted, ref, reactive } from 'vue';
import PageHead from '@/components/PageHead.vue';
import Tablesearch from '@/components/Tablesearch.vue';
import { categoryTree } from '@/api/admin';

const formItem = [
    {comp:'input',prop:'title',label:'文章标题',placeholder:'请输入文章标题'},
    {comp:'select',prop:'categoryId',label:'分类',placeholder:'请选择分类'},
    {comp:'select',prop:'status',label:'状态',placeholder:'请选择状态',options:[{
        label:'草稿',
        value:0
    },{
        label:'已发布',
        value:1
    },{
        label:'已下线',
        value:2
    }
]}
]
const handleSearch = (formData) => {
    console.log(formData,'查询参数')
    
}
//分类映射,将分类id映射为分类名称,所以定义成对象
const categoryMap =reactive({})

// 分类列表
const categories = ref([])

onMounted(async() => {
    const data = await categoryTree()
    categories.value = data.map(item => {
        categoryMap[item.id] = item.categoryName
        return {
            label: item.categoryName,
            value: item.id
        }
    })
    formItem[1].options = categories.value//将分类列表赋值给formItem
})

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
