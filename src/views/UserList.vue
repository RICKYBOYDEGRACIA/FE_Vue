<template>
  <div class="flex flex-col gap-10">
    <div class="p-5 border border-[.1px] rounded-lg">
      <h1 class="font-bold text-2xl">User Management</h1>
    </div>

    <!--Header here-->
    <div class="flex items-center justify-between">
      <h1>This is the space for search bar</h1>
      <router-link
        :to="{ name: 'new' }"
        class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        + Create New User
      </router-link>
    </div>

    <div class="">
      <template v-if="data && data.length > 0">
        <div v-for="value in data" :key="value._id">
          <ul class="flex justify-evenly">
            <li>{{ value.firstName }}</li>
            <li>{{ value.lastName }}</li>
            <li>{{ value.age }}</li>
            <li>{{ value.role }}</li>
            <li class="flex gap-4">
              <router-link :to="{ name: 'edit', params: { id: value._id } }"
                >Edit</router-link
              >
              <button @click="handleDelete(value._id)" type="button">
                Delete
              </button>
            </li>
          </ul>
        </div>
      </template>

      <div v-else-if="!isLoading" class="text-center py-4">No data</div>
    </div>
  </div>
</template>

<script setup>
import { userService } from "@/services/userService";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const isLoading = ref(false);
const data = ref(null);

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const response = await userService.getUsers();
    data.value = response.data;
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    toast.err(errorMsg, {
      autoClose: 2000,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const handleDelete = async (id) => {
  isLoading.value = true;
  try {
    const response = await userService.deleteUser(id);
    toast.success(response.message, {
      autoClose: 3000,
    });
    await fetchUsers();
  } catch (err) {
    error.value =
      err.response?.data?.message || "An error occurred during submission";
    toast.error(error.value, {
      autoClose: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
