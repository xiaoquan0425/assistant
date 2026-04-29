<script setup>
import { Expand } from '@element-plus/icons-vue'
</script>

<template>
        <div class="navbar">
            <div class="flex-box">
                <el-botton>
                    <el-icon><Expand /></el-icon>
                </el-botton>
                <p class="page-title">导航栏</p>
            </div>
            <div class="flex-box"></div>
        </div>
</template>
<style lang="scss" scoped>
.navbar {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 15px;
    background-color: #fff;
    box-shadow:0 1px 4px rgb(0, 21, 41);
    border-bottom: 1px solid #e5e7eb;
    .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .page-title {
        margin-left: 20px;
        font-weight: bold;
        font-size: 26px;
        color: #1f2937;
    }
}
</style>