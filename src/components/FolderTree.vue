<template>
  <div class="folder-tree">
    <div class="tree-header">
      <h2>📁 Folders</h2>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="tree-content">
      <tree-node
        v-for="node in tree"
        :key="node.id"
        :node="node"
        @select="$emit('select', node.id)"
        @toggle="handleToggle"
        :is-expanded="isFolderExpanded"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
// import TreeNode from "./TreeNode.vue";
import type { FolderTreeNode } from "../types";

defineProps<{
  tree: FolderTreeNode[];
  loading: boolean;
  error: string | null;
  isFolderExpanded: (id: string) => boolean;
}>();

defineEmits<{
  select: [folderId: string];
  toggle: [folderId: string];
}>();

const handleToggle = (folderId: string) => {
  emit("toggle", folderId);
};

const { emit } = getCurrentInstance()!;
import { getCurrentInstance } from "vue";
</script>

<style scoped>
.folder-tree {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.tree-header {
  padding: 12px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.tree-header h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.tree-content {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.loading,
.error {
  padding: 12px;
  text-align: center;
  font-size: 12px;
}

.error {
  color: #d32f2f;
}
</style>
