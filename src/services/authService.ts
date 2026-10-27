import api from "@/api/axiosInstance";
import type { RegisterUser, UserLogin } from "@/types/auth.interface";

export const authService = {
    async login(credentials: {email: string, password: string}): Promise<UserLogin>{
        const response = await api.post<UserLogin>('/auth/login', credentials);
        return response.data
    },

    async registerUser(formvalue: any): Promise<RegisterUser>{
        const response = await api.post<RegisterUser>('/auth/register', formvalue)
        return response.data
        
    },

    logout(){
        localStorage.removeItem('token');
        return {
            message: 'Logged out successfully'
        }
    },

    isLogin(): boolean{
        const status = localStorage.getItem('token')
        return !!status
    }
}