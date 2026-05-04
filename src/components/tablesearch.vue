<template>
    <el-form ref="ruleFormRef" :model="formData">
        <el-row :gutter="24">
            <template v-for="item in formItemAttrs" :key="item.prop">
            <!--遍历 -->
            <el-col v-bind="item.col">
                <el-form-item :label="item.label" :prop="item.prop">
                    <component v-model="formData[item.prop]":is="isComp(item.comp)":placeholder="item.placeholder">
                    <template v-if="item.comp==='select'">
                    <el-option v-for="option in item.options" 
                    :key="option.value" 
                    :label="option.label" 
                    :value="option.value"></el-option>
                </template>
            </component>
        </el-form-item>
            </el-col>

        </template>
        </el-row>

        <el-row>
        <el-button type="primary"@click="handleSearch">查询</el-button>
        <el-button @click="handleReset(ruleFormRef)">重置</el-button>
        </el-row>

    </el-form>
</template>
<script setup>
import { ref,reactive,computed } from 'vue'
//表单数据
const formData=reactive({})

const ruleFormRef=ref()

//表单配置
const props=defineProps({
    formItem:
    {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['search'])

const formItemAttrs = computed(()=>{
    const{formItem}=props
    formItem.forEach(item=>{
        item.col = {xs: 24,sm: 12,md: 8,lg: 6,xl: 6}
})
return formItem
})
const isComp=(comp)=>{
    return {
        input: 'el-input',
        select: 'el-select',
    }[comp]
}
const handleSearch=()=>{
    emit('search',formData)//子传递父
}
const handleReset=(formEl)=>{
    //先重置表单，再触发查询
    if(!formEl) return
    formEl.resetFields()
    emit('search',formData)
    //formEl哪来的
}
</script>