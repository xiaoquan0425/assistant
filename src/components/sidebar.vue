<template>
    <el-aside width="264px">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <div class="brand">
<<<<<<< HEAD

        <el-image style="width: 50px; height: 50px;":src="iconUrl" alt="logo" />
=======
        <el-image style="width: 50px; height: 50px;margin-left: 10px;":src="iconUrl" alt="logo" />
>>>>>>> SideBar
        <div class="info-card">
            <h1 class="brand-title">心理健康AI助手</h1>
            <p class="brand-subtitle">管理后台</p>
        </div>
       </div> 
        <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
          <el-icon><component :is="item.meta.icon"/></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const iconUrl = new URL('@/assets/robot.png', import.meta.url).href;
console.log(router, 'router');
const handleOpen = () => {
    
}
const handleClose = () => {
    
}
</script>
<style lang="scss" scoped>
.brand{
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    .info-card{
        .brand-title{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #1f2937;
        }
        .brand-subtitle{
            font-size: 14px;
            color:#6b7280;
        }
    }
}
.el-menu-vertical-demo{
    height: 100vh;
    border-right: none;
}

</style>