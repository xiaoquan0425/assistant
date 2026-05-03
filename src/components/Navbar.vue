<template>
        <div class="navbar">
            <div class="flex-box">
                <el-button @click="handleCollaspe">
                    <el-icon><Expand /></el-icon>
                </el-button>
                <p class="page-title">导航栏</p>
            </div>
            <div class="flex-box">
            <el-dropdown @command="handleCommand">
                <div class="flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    <p class="user-name">admin</p>
                    <el-icon><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </div>
        </div>
</template>
<script setup>
import { el } from 'element-plus/es/locale/index.mjs';
import { useAdminStore } from "@/stores/admin";
const handleCommand = (command) => {
    if (command === 'logout') {

}
const handleCollaspe = () => {
    useAdminStore().toggleSidebar()//先调用拿到一个实例，在调用实例中的方法，这样就能进行状态的修改
}
</script>
<style lang="scss" scoped>
.navbar {
    height: 100%;//继承父类高度
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 15px;
    background-color: #fff;
    box-shadow:0 1px 4px rgb(0, 21, 41,0.08);
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