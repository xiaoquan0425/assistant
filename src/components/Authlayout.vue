<template>
    <div class="auth-layout">
        <div class="left-section">
            <div class="content">
                <h2 class="title">心理AI助手</h2>
                <p class="text">每个深夜，每个焦虑的时刻，我们都在这里。不必独自承受，让心与心的连接温暖您的每一天</p>
                <div class="robot">
                    <el-image style="width:90px;height:90px" :src="iconUrl" alt="心理AI助手" />
                </div>
            </div>
        </div>
    </div>
    <div class="right-section">    
        <router-view></router-view>
    </div>

</template>
<script setup>
const iconUrl = new URL('@/assets/robot-fill.png', import.meta.url).href
</script>
