<script setup lang="ts">
import { ref } from "vue";
import { Check, X } from "lucide-vue-next";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Tasks data management
 * @type {Ref<Task[]>} tasks - Reactive array of tasks loaded from local storage
 * @type {Ref<string>} newTask - Reactive string for storing the new task input value
 */
const tasks = ref<Task[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));
const newTask = ref("");

/**
 * Adds a new task to the task list.
 * - If the new task input is empty or contains only whitespace, the function returns early.
 * - Otherwise, it creates a new task object with a unique ID, the text from the new task input, and a completed status of false.
 * - The new task is then added to the tasks list.
 * - The new task input is cleared.
 * - Finally, the tasks are saved.
 */
const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push({ id: Date.now(), text: newTask.value, completed: false });
  newTask.value = "";
  saveTasks();
};
/**
 * Toggles the completion status of a task.
 * - Finds the task by its ID.
 * - If the task is found, it toggles its completed status.
 * - Finally, the tasks are saved.
 *
 * @param {number} id - The ID of the task to toggle.
 */
const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
};

/**
 * Removes a task from the list by its ID and saves the updated list.
 *
 * @param {number} id - The ID of the task to be removed.
 */
const removeTask = (id: number) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  saveTasks();
};

/**
 * Saves the current tasks to localStorage.
 * 
 * This function takes the current value of the tasks reactive reference,
 * converts it to a JSON string, and stores it in the browser's localStorage
 * under the key "tasks". This allows the tasks to persist between page refreshes.
 */
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <div class="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg dark:bg-gray-800">
    <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">ToDo List</h1>
    
    <div class="flex mt-4">
      <!-- 
        Input field and button for adding new tasks.
        
        Components:
        - Input element:
          - v-model="newTask": Two-way data binding to newTask variable
          - @keyup.enter="addTask": Triggers addTask method when Enter key is pressed
          - Uses dark mode responsive styling with Tailwind CSS
        
        - Button element:
          - @click="addTask": Triggers addTask method when clicked
          - Styled with Tailwind CSS for a blue button with hover effect
          
        Both elements work together to collect user input and add new tasks to the list.
      -->
      <input v-model="newTask" @keyup.enter="addTask" 
        class="flex-1 p-2 border rounded-l-md dark:bg-gray-700 dark:text-white" placeholder="Nova tarefa..."/>
      <button @click="addTask" 
        class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
        Add
      </button>
    </div>

    <ul class="mt-4 space-y-2">
      <!-- 
        Task item component in the ToDo list
        
        Elements:
        - v-for: Iterates through 'tasks' array to render each task item
        - :key: Provides unique identifier for Vue's virtual DOM rendering optimization
        - :class: Applies conditional CSS classes based on task completion status
        - @click: Attaches click event handlers to buttons
        
        Components:
        - Check: Icon component for the complete/toggle task button
        - X: Icon component for the delete/remove task button
        
        Functions:
        - toggleTask(): Toggles the completion status of a task
        - removeTask(): Deletes a task from the list
        
        Styling:
        - Uses Tailwind CSS classes for responsive design
        - Supports dark mode with dark: prefixed classes
        - Uses flex layout for alignment of task text and action buttons
      -->
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between bg-gray-100 p-2 rounded-md dark:bg-gray-700">
        <span :class="{ 'line-through text-gray-500': task.completed }" class="flex-1 text-gray-900 dark:text-white">
          {{ task.text }}
        </span>
        <div class="space-x-2">
          <button @click="toggleTask(task.id)" class="text-green-500 hover:text-green-600">
            <Check />
          </button>
          <button @click="removeTask(task.id)" class="text-red-500 hover:text-red-600">
            <X />
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
