import { defineStore } from "pinia";
import { ref } from "vue";
export const useAdminStore = defineStore('admin', () => {//把函数对外暴露
    const isCollapse = ref(false);

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value;
    }

    return {
        isCollapse,
        toggleCollapse
    }
})