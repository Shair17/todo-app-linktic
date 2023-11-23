<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import Todo from "./components/Todo.vue";
import type { Todo as TodoType } from "./types/todo";
import { TODOS_STORAGE_KEY } from "./constants";

const todosRef = ref<TodoType[]>([]);
const todoRef = ref<string>("");

watch(
  todosRef,
  (todos) => {
    window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  },
  { deep: true }
);

onMounted(getTodosFromStorage);

onMounted(() => {
  window.addEventListener("storage", getTodosFromStorage);
});

onUnmounted(() => {
  window.removeEventListener("storage", getTodosFromStorage);
});

function getTodosFromStorage(event?: StorageEvent) {
  if (event && event.key !== TODOS_STORAGE_KEY) return;

  const todosFromStorage = window.localStorage.getItem(TODOS_STORAGE_KEY);

  if (!todosFromStorage) return;

  const todosFromStorageParsed = JSON.parse(todosFromStorage) as TodoType[];

  todosRef.value = todosFromStorageParsed;
}

function onSubmit() {
  const newTodo = todoRef.value;

  if (newTodo.trim() === "") return;

  todosRef.value.unshift({
    id: todosRef.value.length > 0 ? todosRef.value[0].id + 1 : 1,
    todo: newTodo,
    done: false,
    date: new Date(),
  });

  todoRef.value = "";
}

function deleteTodo(todo: TodoType) {
  todosRef.value = todosRef.value.filter((x) => x.id !== todo.id);
}
</script>

<template>
  <div class="bg-gray-200 min-h-screen flex justify-center items-center gap-10">
    <section>
      <form
        @submit.prevent="onSubmit"
        class="bg-white p-4 rounded-lg flex flex-col w-60 gap-4 shadow"
      >
        <h1 class="text-center font-bold text-xl">Todo App</h1>

        <input
          type="text"
          class="px-4 py-2 bg-gray-200 rounded-lg"
          placeholder="Ingresa tu tarea"
          v-model="todoRef"
        />

        <button
          type="submit"
          class="px-4 py-2 bg-neutral-800 transition-colors hover:bg-neutral-950 rounded-lg text-white"
        >
          Agregar
        </button>
      </form>
    </section>

    <section
      v-if="todosRef.length > 0"
      class="bg-white p-4 rounded-lg flex flex-col gap-4 shadow"
    >
      <ul class="flex flex-col gap-2 max-h-96 overflow-auto">
        <Todo
          v-for="todo in todosRef"
          :key="todo.id"
          :todo="todo"
          :delete-todo="deleteTodo"
        />
      </ul>
    </section>
  </div>
</template>
