<script setup>

import {onMounted, ref, reactive } from 'vue';
import PageHead from '@/components/PageHead.vue';
import Tablesearch from '@/components/Tablesearch.vue';
import { categoryTree,articlePage} from '@/api/admin';
import { Timer } from '@element-plus/icons-vue';
import Articledialog from '@/components/Articledialog.vue';

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
//分页参数
const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})

//分类映射,将分类id映射为分类名称,所以定义成对象
const categoryMap =reactive({})

// 分类列表
const categories = ref([])

//列表数据
const tableData = ref([])//在调接口的时候要把data赋值

const handleSearch = async (formData = {}) => {
    //获取列表数据
    console.log('列表参数',formData)
    const params = {
        ...pagination,
        ...formData
    }

    const {records, total} = await articlePage(params)
    tableData.value = records
    pagination.total = total

}

const handleChange = (page) => {
    pagination.currentPage = page
    handleSearch()
}

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
    //获取列表数据
    handleSearch()
})

</script>


<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button @click="dialogVisible = true" type="primary">新增</el-button>
                <el-button type="primary">编辑</el-button>
            </template>
        </PageHead>
        <Tablesearch :formItem="formItem" @search="handleSearch" />
        <!--回调函数在组件内部调用然后拿到form表单的结果 -->
        <el-table :data ="tableData" style="width: 100%;margin-top: 25px;">
            <el-table-column  width="450" label="文章标题" fixed="left" >
                <template #default="scope">
                    <!-- 获取当前行数据 -->
                    <div style="display: flex; align-items: center"></div>
                    <el-icon><timer /></el-icon>
                    <span >{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <!-- 如果要实现自定义有一列是不能设置宽度的 -->

            <el-table-column  label="分类" width="200" >
                <template #default="scope">
                    <!-- 获取当前行数据 -->
                    <div style="display: flex; align-items: center"></div>
                    <el-icon><timer /></el-icon>
                    <span >{{categoryMap[ scope.row.categoryId ]}}</span>
                </template>
            </el-table-column>
            <!-- 这一块不是自定义的内容所以直接用传统的格式写 -->
            <el-table-column  prop="authorName" label="作者" width="150" />    
            <el-table-column  prop="readCount" label="阅读量" width="150" />    
            <el-table-column  prop="publishedAt" label="发布时间" width="150" />    

            <el-table-column  label="操作" width="240" fixed="right">
                <template #default="scope">
                    <el-button text type ="primary">编辑</el-button>
                    <el-button v-if ="scope.row.status === 0 ||scope.row.status === 2" text type ="success">发布</el-button>
                    <el-button v-if ="scope.row.status === 1" text type ="warning">下线</el-button>
                    <el-button text type ="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--  <el-pagination 
        style="margin-top: 25px"
        :page-size="pagination.size"
        layout="prev, pager, next" 
        :total="pagination.total" 
        @change="handleChange"></el-pagination> -->

        <Articledialog v-model:modelValue ="dialogVisible" />
    </div>
</template>
