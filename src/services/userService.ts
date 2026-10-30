import api from "@/api/axiosInstance";
import type { RegisterUser } from "@/types/auth.interface";
import type { User } from "@/types/user.interface";

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/user");
    return response.data;
  },

  async getUser(_id: string): Promise<User[]> {
    const response = await api.get<User[]>(`/user/${_id}`);
    return response.data;
  },

  async getUserWithAuth(_id: string): Promise<User[]> {
    const response = await api.get<RegisterUser[]>(`/user/getAll/${_id}`);
    return response.data;
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/user", userData);
    return response.data;
  },

  async updateUser(id: string, userData: User): Promise<User> {
    const response = await api.put<User>(`/user/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<any> {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },
};
