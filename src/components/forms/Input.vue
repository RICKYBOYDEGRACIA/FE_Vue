<script setup>
defineProps({
  label: {
    type: String,
    default: "Input Placeholder...",
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event) => {
  emit("update:modelValue", $event.target.value);
};
</script>

<template>
  <div class="table-search-container">
    <div class="table-search-container-input-icon-wrapper">
      <input
        id="input"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="label"
        :required="required"
        class="w-full placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </div>
  </div>
</template>
