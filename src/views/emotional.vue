<template>
    <div>
        <PageHead title="情绪日志" />
    </div>
</template>
<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'

const formItem = [
    {name: 'input', prop: 'userId', label: '用户ID', placeholder: '请输入用户ID'},
    {name:'select',prop:'moodScreRange',label:'网络计分',placeholder:'请选择网络计分',options:[{
        label:'低分（1-3）',
        value:'1-3'
    },{
        label:'中分（4-6）',
        value:'4-6'
    },{
        label:'高分（7-10）',
        value:'7-13'
    }]}
]

const handleSearch = () => {
    
}

</script>