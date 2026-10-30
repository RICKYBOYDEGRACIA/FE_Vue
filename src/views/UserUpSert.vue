<style></style>

<script setup>
import RegisterForm from "@/components/RegisterForm.vue";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const isLoading = ref(false);
const isSubmitting = ref(false);

const error = ref(null);

const router = useRouter();
const route = useRoute();

const userId = computed(() => route.params.id);
const isEditMode = computed(() => !!userId.value);

const PageTitle = computed(() =>
  isEditMode.value ? "Edit Form" : "Create Form",
);
const buttonTitle = computed(() =>
  isEditMode.value ? "Update Form" : "Create Form",
);

const formData = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  role: "",
  location: {
    city: "",
    barangay: "",
  },
});

const fetchUserData = async (id) => {
  isSubmitting.value = true;
  error.value = null;

  try {
    const response = await userService.getUser(id);
    const form = response.data || response;
    console.log(form);
    formData.value = {
      firstName: form.firstName || "",
      middleName: form.middleName || "",
      lastName: form.lastName || "",
      age: form.age || "",
      role: form.role || "",
      location: {
        city: form.location?.city || "",
        barangay: form.location?.barangay || "",
      },
    };
  } catch (err) {
    error.value =
      err.response?.data?.message || "An error occurred during submission";
    toast.error(error.value, { autoClose: 3000 });
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (isEditMode.value) {
    fetchUserData(userId.value);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchUserData(newId);
    } else {
      // Reset form if switching back to create mode
      formData.value = {
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        role: "",
        email: "",
        location: { city: "", barangay: "" },
      };
    }
  },
);

const handleSubmit = async (submittedFormValues) => {
  isSubmitting.value = true;
  error.value = null;
  try {
    if (isEditMode.value) {
      const res = await userService.updateUser(
        userId.value,
        submittedFormValues,
      );
      if (res) {
        toast.success(res.message, { autoClose: 3000 });
      }
    } else {
      const response = await authService.registerUser(submittedFormValues);
      toast.success(response?.message || "Registration successful!", {
        autoClose: 3000,
      });
    }
    router.push("/user");
  } catch (err) {
    error.value =
      err.response?.data?.message || "An error occurred during submission";
    toast.error(error.value, { autoClose: 1000 });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="">
    <div v-if="isLoading" class="py-12 text-center text-gray-500">
      Loading resource data...
    </div>
    <RegisterForm
      v-else
      :userData="formData"
      :loading="isSubmitting"
      :submit-label="buttonTitle"
      @on-submit="handleSubmit"
      :is-create="isEditMode"
      :title="PageTitle"
    />
  </div>
</template>
