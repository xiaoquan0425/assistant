<template>
    <el-form :model="formData">
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
        <el-button type="primary"@click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
    </el-form>
</template>
<script setup>
import { ref,reactive } from 'vue'
const formData=reactive({})
const props=defineProps({
    formItem:
    {
        type: Array,
        default: () => []
    }
})
const isComp=(comp)=>{
    return {
        input: 'el-input',
        select: 'el-select',
    }[comp]
}
const handleSearch=()=>{
    
}
const handleReset=()=>{
    
}
</script>