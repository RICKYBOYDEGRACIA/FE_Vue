<script setup>
import { reactive, ref, watch } from "vue";
import Input from "@/components/forms/Input.vue";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  title: {
    type: String,
    default: "Editable title here",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isCreate: {
    type: Boolean,
  },
});

const isLoading = ref(false);
defineEmits(["on-submit"]);

const form = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  location: {
    city: "",
    barangay: "",
  },
  role: "",
  email: "",
  password: "",
});

watch(
  () => props.userData,
  (newData) => {
    if (newData) {
      form.firstName = newData.firstName || "";
      form.middleName = newData.middleName || "";
      form.lastName = newData.lastName || "";
      form.age = newData.age || "";
      form.location.city = newData.location?.city || "";
      form.location.barangay = newData.location?.barangay || "";
      form.role = newData.role || "";
      form.email = newData.email || "";
      form.password = newData.password || "";
    }
  },
  { immediate: true, deep: true }, // immediate: true runs it on mount as well
);
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1 class="text-2xl">{{ title }}</h1>
    <form
      @submit.prevent="$emit('on-submit', form)"
      class="flex flex-col gap-4"
    >
      <div class="row">
        <div class="flex flex-col gap-2">
          <label>First Name</label>
          <Input v-model="form.firstName" label="Enter first name" />
        </div>
      </div>

      <div class="row">
        <div class="flex flex-col gap-2">
          <label>Middle Name</label>
          <Input v-model="form.middleName" label="Enter middle name" />
        </div>
      </div>
      <div class="row">
        <div class="flex flex-col gap-2">
          <label>Last Name</label>
          <Input v-model="form.lastName" label="Enter last name" />
        </div>
      </div>

      <div class="row">
        <div class="flex flex-col gap-2">
          <label>Age</label>
          <Input v-model="form.age" label="Enter age" type="number" />
        </div>
      </div>

      <div class="row">
        <div class="flex flex-col gap-2">
          <label>City</label>
          <Input v-model="form.location.city" label="Enter city" />
        </div>
      </div>

      <div class="row">
        <div class="flex flex-col gap-2">
          <label>Barangay</label>
          <Input v-model="form.location.barangay" label="Enter barangay" />
        </div>
      </div>

      <div class="row">
        <div class="flex flex-col gap-2">
          <label>Role</label>
          <Input v-model="form.role" label="Enter role" />
        </div>
      </div>

      <template v-if="!isCreate">
        <div class="row">
          <div class="flex flex-col gap-2">
            <label>Email</label>
            <Input v-model="form.email" label="Enter email" />
          </div>
        </div>

        <div class="row">
          <div class="flex flex-col gap-2">
            <label>Password</label>
            <Input
              v-model="form.password"
              label="Enter pasword"
              type="password"
            />
          </div>
        </div>
      </template>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<style></style>
