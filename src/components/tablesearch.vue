<template>
  <el-form ref="ruleFormRef" :model="formData">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- 输入框 -->
            <el-input
              v-if="item.name === 'input'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              clearable
              style="width: 100%"
            />
            
            <!-- 选择框 -->
            <el-select
              v-else-if="item.name === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(ruleFormRef)">重置</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// 表单数据
const formData = reactive({})
const ruleFormRef = ref()

// 接收父组件传递的配置
const props = defineProps({
  formItem: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search'])

// 初始化表单数据
const initFormData = () => {
  props.formItem.forEach(item => {
    // 初始化每个字段为空值
    if (item.prop && !(item.prop in formData)) {
      formData[item.prop] = ''
    }
  })
}

// 监听 formItem 变化，初始化表单数据
watch(() => props.formItem, (newVal) => {
  initFormData()
}, { immediate: true, deep: true })

// 处理表单配置
const formItemAttrs = computed(() => {
  return props.formItem.map(item => {
    return {
      ...item,
      col: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
    }
  })
})

// 搜索
const handleSearch = () => {
  emit('search', formData)
}

// 重置
const handleReset = (formEl) => {
  if (!formEl) return
  
  // 重置表单字段
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  
  emit('search', formData)
}
</script>