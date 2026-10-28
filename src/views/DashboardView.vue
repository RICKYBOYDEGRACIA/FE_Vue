<script setup>
import { userService } from '@/services/userService';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const apiCall = userService;

const isLoading = ref(false);
const data = ref(null);

const adminCount = computed(() => {
    return data.value.filter(user => user.role === 'admin').length
})

const userCount = computed(() => {
    return data.value.filter(user => user.role === 'user').length
})

const fetchData = async () => {
    isLoading.value = true;
    try {
        const response = await apiCall.getUsers();
        data.value = response.data;
        console.log(response)
    }catch(err){
        const errorMsg = err.response?.data?.message || err.message;
        toast.error(errorMsg,{
            autoClose: 2000
        })
    }finally{
        isLoading.value = false;
    }
}

onMounted(() => {
   fetchData(); 
});
</script>

<template>
    <div class="">
        <p v-if="isLoading">Data Fetching...</p>
        <div v-else-if="data">
            <h1>Dashboard</h1>
            <div class="flex-container">
                <div class="flex-item">
                    <p class="header">Total Admin Count</p>
                    <h1>{{adminCount}}</h1>
                </div>
                <div class="flex-item">
                    <p class="header">Total User Count</p>
                    <h1>{{userCount}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.flex-container{
    display: flex;
    flex-direction: row;
    gap: 10px;
    .flex-item{
        font-size: 30px;
        text-align: center;
        width: 100%;
        .header{
            border-bottom: 1px solid;
        }
        border-style: solid;
    }
}

@media (max-width: 600px) {
  .flex-container {
    flex-direction: column;
  }
}

</style>