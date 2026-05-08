<template>
    <el-dialog         
        title="新增文章"
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
        >
        <el-form :model="formData":rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择分类" clearable>
                    <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要（可选）" maxlength="1000" show-word-limit :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-select v-model="formData.tagArray" placeholder="请输入文章标签" multiple filterable allow-create style="width:100%">
                    <el-option v-for="tag in commonTags"
                    :key ="tag"
                    :label="tag"
                    :value="tag"
                     />
                </el-select>
            </el-form-item>
             <el-form-item label="封面图片">
                <div class="cover-upload">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :http-request="handleUploadRequest"
                        accept="image/*"
                        >
                        <div v-if="!imgUrl" class="cover-placeholder">
                            <p>点击上传封面</p>
                        </div>
                        <img v-else :src="imgUrl" class="cover-image" alt="封面图片" />
                        
                    </el-upload>
                    <div v-if="imgUrl" class="cover-remove">
                        <el-button type="danger" size="mini" @click="handleRemove">移除封面</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" props="content">
                <RichTextEditor
                v-model="formData.content"
                placeholder="请输入文章内容,支持富文本格式"
                :maxCharCount="5000"
                @change="handleContentChange"
                @created="handleEditorCreated"
                min-height="400px"
                 />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, computed,nextTick} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/admin'
import { fileBaseUrl } from '@/config'
import RichTextEditor from '@/components/RichTextEditor.vue'


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []//数组对象
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
    emit('update:modelValue',false)
}
//表单数据
const formData = reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 1,
    "summary": "",
    "tags": [],
    "id": ""
})

const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        {max: 200, message: '长度最多200个字符', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择分类', trigger: 'change' },
    ]
  
})

const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]
//上传
const imgUrl = ref('')

const beforeUpload = (file) => {
    //上传文件校验
    console.log(file,"文件信息")
    const isImage=file.type.startsWith('image/')//判断是否是图片
    const isLt2M = file.size / 1024 / 1024 < 5;//判断文件大小
    if(!isImage){
        ElMessage.error('请选择图片文件')
       return false 
    }
    if(!isLt2M){
        ElMessage.error('图片大小不能超过5MB')
       return false 
    }

    return true
}


const handleUploadRequest = async({file}) => {//先解构
    //UUID生成
    const businessId = crypto.randomUUID()//生成一个唯一标识符
    const fileRes = await uploadFile(file,{
        businessId:businessId
    })
    console.log(fileRes)
    //拼接图片地址
    imgUrl.value = `${fileBaseUrl}${fileRes.filePath}`//后端接收相对路径,不需要完整路径
    formData.coverImage = fileRes.filePath

}

const handleRemove = () => {
    imgUrl.value = ''
    formData.coverImage = ''
}

const handleContentChange = (data) => {
    formData.content = data.html

}
const editorInstance = ref(null)
const handleEditorCreated = (editor) => {
    editorInstance.value = editor
    //编辑
    if(formData.content && editor){
        nextTick(()=>{
            editorInstance.value.setHtml(formData.content)
        })
       
}
}
</script>




<style lang ="scss" scoped>
.cover-placeholder{
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#8b949e;
    background: #f6f8fa;
}
.cover-image{
    width: 200px;
    height: 120px;
    display: block;
}
</style>