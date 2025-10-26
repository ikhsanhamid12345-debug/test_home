<template>
  <div class="tree-node">
    <div class="node-content">
      <button
        v-if="node.hasChildren"
        class="expand-btn"
        :class="{ expanded: expanded }"
        @click="$emit('toggle', node.id)"
      >
        ▶
      </button>
      <div v-else class="expand-btn-placeholder"></div>

      <button class="folder-btn" @click="$emit('select', node.id)">
        📁 {{ node.name }}
      </button>
    </div>

    <div v-if="expanded && node.children" class="children">
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event)"
        :is-expanded="isExpandedFn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FolderTreeNode } from "../types";

const props = defineProps<{
  node: FolderTreeNode;
  isExpanded: (id: string) => boolean;
}>();

defineEmits<{
  select: [folderId: string];
  toggle: [folderId: string];
}>();

const expanded = computed(() => props.isExpanded(props.node.id));
const isExpandedFn = props.isExpanded;
</script>

<style scoped>
.tree-node {
  user-select: none;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 4px 4px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.node-content:hover {
  background-color: #e0e0e0;
}

.expand-btn,
.expand-btn-placeholder {
  visibility: hidden;
}

.expand-btn.expanded {
  transform: rotate(90deg);
}

.folder-btn {
  flex: 1;
  border: none;
  background: none;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 13px;
  text-align: left;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.folder-btn:hover {
  background-color: #d0d0d0;
}

.children {
  margin-left: 12px;
}
</style>
