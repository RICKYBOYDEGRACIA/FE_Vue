<script setup>
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

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
            const response = authService.registerUser(userForm.value)
            toast(response.message)
        }catch (err){
            console.error(err)
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