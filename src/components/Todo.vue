<script setup lang="ts">
import { defineProps } from "vue";
import type { Todo as TodoType } from "../types/todo";
import TrashIcon from "./TrashIcon.vue";
import { getTimeAgo } from "../utils/getTimeAgo";

interface Props {
  todo: TodoType;
  deleteTodo: Function;
}

defineProps<Props>();
</script>

<template>
  <li class="flex flex-col gap-1">
    <p class="text-xs">{{ getTimeAgo(todo.date) }}</p>
    <div
      class="flex justify-between items-center bg-neutral-200 rounded-lg overflow-hidden gap-4 transition-colors hover:bg-neutral-300"
      :class="{ '!bg-green-100 text-green-900': todo.done }"
    >
      <label>
        <input type="checkbox" v-model="todo.done" class="mx-4" />
      </label>

      <input
        type="text"
        v-model="todo.todo"
        class="p-4 -m-4 bg-transparent border-none outline-none"
      />

      <div class="">
        <button
          @click="deleteTodo(todo)"
          class="inline-flex p-4 items-center justify-normal bg-red-500 text-white"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  </li>
</template>
