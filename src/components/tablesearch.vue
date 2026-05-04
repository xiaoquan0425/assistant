<template>
    <el-form :model="formData">
        <el-row>
            <template v-for="item in formItem" :key="item.prop">
            <!--遍历 -->
        <el-form-item :label="item.label" :prop="item.prop">
            <component v-model="formData[item.prop]":is="isComp(item.comp)":placeholder="item.placeholder">
                <!-- 动态组件 -->
                 <template v-if="item.comp==='select'">
                    <el-option v-for="option in item.options" 
                    :key="option.value" 
                    :label="option.label" 
                    :value="option.value"></el-option>
                </template>
            </component>
        </el-form-item>
        </template>
        </el-row>
        <el-row>
        <el-button type="primary"@click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        </el-row>
    </el-form>
</template>
<script setup>
import { ref,reactive } from 'vue'
//表单数据
const formData=reactive({})

//表单配置
const props=defineProps({
    formItem:
    {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['search'])

const isComp=(comp)=>{
    return {
        input: 'el-input',
        select: 'el-select',
    }[comp]
}
const handleSearch=()=>{
    emit('search',formData)//子传递父
}
const handleReset=()=>{
    
}
</script>