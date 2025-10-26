<template>
  <div class="search-container">
    <input
      :value="searchQuery"
      type="text"
      placeholder="🔍 Search folders and files..."
      class="search-input"
      @keyup.enter="handleSearch"
      @input="onInput"
    />

    <div v-if="hasResults" class="search-results">
      <div class="results-section">
        <h4>📁 Folders</h4>
        <div
          v-for="folder in searchResults.folders"
          :key="folder.id"
          class="result-item"
          @click="$emit('select-folder', folder.id)"
        >
          {{ folder.name }}
        </div>
      </div>

      <div class="results-section">
        <h4>📄 Files</h4>
        <div
          v-for="file in searchResults.files"
          :key="file.id"
          class="result-item"
        >
          {{ file.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { SearchResult } from "../types";

defineProps<{
  searchQuery: string;
  searchResults: SearchResult;
  isSearching: boolean;
  hasResults: boolean;
}>();

defineEmits<{
  search: [];
  "select-folder": [folderId: string];
}>();

import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance()!;

const handleSearch = () => {
  emit("search");
};

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:searchQuery", value);
  emit("search");
};
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.results-section {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.results-section:last-child {
  border-bottom: none;
}

.results-section h4 {
  margin: 0;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
}

.result-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #f5f5f5;
}
</style>
