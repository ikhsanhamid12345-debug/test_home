<template>
  <div class="folder-content">
    <div v-if="!selectedFolderId" class="empty-state">
      <div class="empty-icon">📂</div>
      <p>Select a folder to view its contents</p>
    </div>

    <div v-else>
      <div class="content-header">
        <breadcrumb :items="breadcrumb" @navigate="$emit('navigate', $event)" />
      </div>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else class="content-area">
        <div class="section">
          <h3>📁 Subfolders ({{ children.length }})</h3>
          <div v-if="children.length === 0" class="empty-list">
            No subfolders
          </div>
          <div v-else class="item-list">
            <div
              v-for="folder in children"
              :key="folder.id"
              class="item folder-item"
              @click="$emit('select', folder.id)"
            >
              <span class="icon">📁</span>
              <span class="name">{{ folder.name }}</span>
              <span class="date">{{ formatDate(folder.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>📄 Files ({{ files.length }})</h3>
          <div v-if="files.length === 0" class="empty-list">No files</div>
          <div v-else class="item-list">
            <div v-for="file in files" :key="file.id" class="item file-item">
              <span class="icon">{{ getFileIcon(file.mimeType) }}</span>
              <span class="name">{{ file.name }}</span>
              <span class="size">{{ formatSize(Number(file.size)) }}</span>
              <span class="date">{{ formatDate(file.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import type { FolderDTO, FileDTO } from "../types";

defineProps<{
  selectedFolderId: string | null;
  children: FolderDTO[];
  files: FileDTO[];
  loading: boolean;
  error: string | null;
  breadcrumb: FolderDTO[];
}>();

defineEmits<{
  select: [folderId: string];
  navigate: [folderId: string];
}>();

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const getFileIcon = (mimeType: string): string => {
  if (mimeType.startsWith("image/")) return "🖼️";
  if (mimeType.startsWith("video/")) return "🎬";
  if (mimeType.startsWith("audio/")) return "🎵";
  if (mimeType.includes("pdf")) return "📕";
  if (mimeType.includes("word") || mimeType.includes("document")) return "📘";
  if (
    mimeType.includes("sheet") ||
    mimeType.includes("excel") ||
    mimeType.includes("spreadsheet")
  )
    return "📗";
  return "📄";
};
</script>

<style scoped>
.folder-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.content-header {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.loading,
.error {
  padding: 16px;
  text-align: center;
  font-size: 14px;
}

.error {
  color: #d32f2f;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empty-list {
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  user-select: none;
}

.item:hover {
  background-color: #f0f0f0;
}

.folder-item {
  font-weight: 500;
}

.icon {
  margin-right: 8px;
  font-size: 16px;
}

.name {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.size,
.date {
  margin-left: 12px;
  color: #999;
  font-size: 12px;
  white-space: nowrap;
}
</style>
