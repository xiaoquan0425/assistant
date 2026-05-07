<template>
    <el-dialog         
        title="文章详情"
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
        >
        <el-form :model="formData":rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>
            
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, computed} from 'vue'

// const dialogVisible = ref(false)

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
//子组件不能直接修改props的值，加一个计算属性

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
    get(){
        return props.modelValue
    },
    set(val){
        emit('update:modelValue',val)
    }

})

const handleClose = () => {//关闭弹窗
   dialogVisible.value = false
}
//表单数据
const formData = reactive({
    "title": "string",
    "content": "string",
    "coverImage": "string",
    "categoryId": 0,
    "summary": "string",
    "tags": "string",
    "id": "string"
})

const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        {max: 200, message: '长度最多200个字符', trigger: 'blur' }
    ]
})
</script>