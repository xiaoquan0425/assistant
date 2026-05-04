<template>
  <div class="page-head">
    <p class="page-title">页面标题</p>
    <div class="action-btns">
        <slot name="buttons"></slot>
    </div>
  </div>
</template>
<style lang="scss"scoped>
.page-head {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-title {
        font-size: 24px;
        color:#2d3748;
    }
}
</style>