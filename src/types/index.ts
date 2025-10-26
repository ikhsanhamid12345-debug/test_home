export interface FolderTreeNode {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: FolderTreeNode[];
}

export interface FolderDTO {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FileDTO {
  id: string;
  name: string;
  folderId: string;
  size: bigint;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  folders: FolderDTO[];
  files: FileDTO[];
}
