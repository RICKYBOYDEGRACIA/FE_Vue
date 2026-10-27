<script setup>
import { authService } from '@/services/authService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    const router = useRouter();
    const isLoading = ref(false);
    const error = ref(null)

    const loginForm = ref({
        email: '',
        password: '',
    })

    const handleSubmit = async () => {
        isLoading.value = true;
        error.value = null;
        try{
            const responseData = await authService.login(loginForm.value);
            localStorage.setItem('token', responseData.token)
            router.push('/dashboard')
        }catch (err){
            error.value = err.response?.data?.message || 'Invalid email of password';
            toast.error(error.value, {
                autoClose: 1000
            })
        } finally {
            isLoading.value = false;    
        }
    }

</script>

<template>
    <div class="login-form">
        <h1>Login Page</h1>
        <form @submit.prevent="handleSubmit()">
            <input v-model="loginForm.email" placeholder="Enter valid email here" type="email" required>
            <input v-model="loginForm.password" placeholder="Enter password here" type="password" required>
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Submitting...' : 'Submit' }}
            </button>
            <p v-if="error" style="color: red">{{ error }}</p>
        </form>
    </div>
</template>

<style>
.login-form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    form{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>