<script setup>
import { authService } from '@/services/authService';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    const isLoading = ref(false);

    const userForm = ref({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        location: {
            city: '',
            barangay: ''
        },
        role: '',
        email: '',
        password: '',
    })

    const handleSubmit = async() => {
        isLoading.value = true;

        try {
            const response = await authService.registerUser(userForm.value)
            toast.success(response.message, {
                autoClose: 1000
            })
        }catch (err){
            const errorMo = err.response.data.message;
            toast.error(errorMo, {
                autoClose: 3000
            })
        } finally {
            isLoading.value = false;
        }
    }
</script>

<template>
    <form @submit.prevent="handleSubmit()">
        <input v-model="userForm.firstName" placeholder="Enter firstname here" type="string" required>
        <input v-model="userForm.middleName" placeholder="Enter middlename here" type="string" required>
        <input v-model="userForm.lastName" placeholder="Enter lastname here" type="string" required>
        <input v-model="userForm.age" placeholder="Enter age here" type="number" required>
        <input v-model="userForm.location.city" placeholder="Enter city here" type="string" required>
        <input v-model="userForm.location.barangay" placeholder="Enter barangay here" type="string" required>
        <input v-model="userForm.role" placeholder="Enter role here" type="string" required>
        <input v-model="userForm.email" placeholder="Enter email here" type="email" required>
        <input v-model="userForm.password" placeholder="Enter password here" type="password" required>
        <button type="submit">
            {{isLoading ? 'Submitting...' : 'Submit'}}
        </button>
    </form>

</template>

<style>
form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    input, button{
        height: 32px;
    }
}
</style>