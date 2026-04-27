<template>
  <div class="backend-layout">
    <el-container>
      <el-header>
        <navbar/>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import sidebar from './sidebar.vue'
import Navbar from './Navbar.vue';

</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
}
</style>