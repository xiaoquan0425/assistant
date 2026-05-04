<script setup>
import PageHead from '@/components/PageHead.vue';
import Tablesearch from '@/components/Tablesearch.vue';
const formItem = [
    {comp:'input',prop:'title',label:'文章标题',placeholder:'请输入文章标题'},
    {comp:'select',prop:'catagoryId',label:'分类',placeholder:'请选择分类',options:[{
        label:'心理健康基础',
        value:'1'
    },{
        label:'心理测试',
        value:'2'
    },{
        label:'心理科普',
        value:'3'
    },{
        label:'心理干预',
        value:'4'}
    ]
    }
]

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
