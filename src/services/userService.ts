import api from "@/api/axiosInstance";
import type { User } from "@/types/user.interface";

export const userService = {
    async getUsers(): Promise<User[]> {
        const response = await api.get<User[]>('/user');
        return response.data
    },

    async createUser(userData: Omit<User, 'id'>): Promise<User>{
        const response = await api.post<User>('/user', userData)
        return response.data
    }
}