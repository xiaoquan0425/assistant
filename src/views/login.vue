<script setup >
import { Back } from '@element-plus/icons-vue';
import { ref,reactive} from 'vue';
import { login } from '@/api/admin';
import { useRouter } from 'vue-router'; 
const formData = reactive({
    username: '',
    password: ''
    //接口文档里的请求参数
})
const rules=reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }//是否必填，blur代表失去焦点
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
const ruleFormRef = ref()
//登录
const router = useRouter()
const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid,fields) => {
        if (valid) {
            login(formData).then(data=>{
                //判断token是否存在
                if(!data.token){
                    return console.error('登录失败')
                }
                //登陆成功,保存token和用户信息
                localStorage.setItem('token',data.token)
                localStorage.setItem('userInfo',JSON.stringify(data.userInfo))//用户信息是对象转换成字符串再保存
                //根据用户角色决定跳转的路径
                if(data.userInfo.userType === 2){
                    router.push('/back/dashboard')
                }else{
                    router.push('/')
                }
            })
        }
    })
}

</script>

<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><Back /></el-icon>
                <span>返回首页</span>
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>请输入您的登录信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form
            ref="ruleFormRef"
            :model="formData"
            :rules="rules"
            label-position="top"
            >
            <el-form-item label="用户名或邮箱" prop="username">
                <el-input v-model="formData.username" size="large" placeholder="请输入用户名或邮箱" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password /> 
            </el-form-item>
            </el-form>
                <el-button class="btn" type="primary" size="large" @click="submitForm(ruleFormRef)">登录</el-button>
                
            </div>
            <div class="footer">
                <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
            </div>
        </div>

</template>
<style scoped lang="scss">
.container {
    width: 384px;
    .title {
        .back-home {
            margin-bottom: 60px;
        }
        .title-text {
            text-align: center;
            h2 {
                font-size: 36px;
                margin-bottom: 8px;
            }
            p {
                font-size: 14px;
                color: #6b7280;
            }
        }
        }
        .form-container {
        margin-top: 40px;
        .btn{
            margin-top:30px;
            width: 100%;
        }}
        .footer{
            padding:30px;
            text-align: center;
        }

    }
    
</style>