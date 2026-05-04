<script setup lang="ts">
import { Back } from '@element-plus/icons-vue';

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
            >

            </el-form>
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
    }
</style>