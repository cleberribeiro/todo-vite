<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const tasks = ref<Task[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));
const newTask = ref("");

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push({ id: Date.now(), text: newTask.value, completed: false });
  newTask.value = "";
  saveTasks();
};

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
};

const removeTask = (id: number) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  saveTasks();
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <div class="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg dark:bg-gray-800">
    <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">ToDo List</h1>
    
    <div class="flex mt-4">
      <input v-model="newTask" @keyup.enter="addTask" 
        class="flex-1 p-2 border rounded-l-md dark:bg-gray-700 dark:text-white" placeholder="Nova tarefa..."/>
      <button @click="addTask" 
        class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
        Add
      </button>
    </div>

    <ul class="mt-4 space-y-2">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between bg-gray-100 p-2 rounded-md dark:bg-gray-700">
        <span :class="{ 'line-through text-gray-500': task.completed }" class="flex-1 text-gray-900 dark:text-white">
          {{ task.text }}
        </span>
        <div class="space-x-2">
          <button @click="toggleTask(task.id)" class="text-green-500 hover:text-green-600">
            ✔
          </button>
          <button @click="removeTask(task.id)" class="text-red-500 hover:text-red-600">
            ✖
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
/* Modo escuro automático */
@media (prefers-color-scheme: dark) {
  html {
    background-color: #1a202c;
  }
}
</style>
