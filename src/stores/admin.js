import { defineStore } from "pinia";
import { ref } from "vue";
export const useAdminStore = defineStore("admin", () => {
    const isCollaspe = ref(false);
    const toggleCollaspe = () => {
        isCollaspe.value = !isCollaspe.value;
    }
    return {
        isCollaspe,
        toggleCollaspe
    }
})