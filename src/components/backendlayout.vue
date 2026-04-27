<template>
  <div class="backend-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import sidebar from './sidebar.vue'
</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
}
</style>