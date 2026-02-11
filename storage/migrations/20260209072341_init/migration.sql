-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT,
    "credential" TEXT,
    "sso_auth_provider" TEXT,
    "sso_auth_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_loggedin" DATETIME,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "workspace_members" (
    "member_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,

    PRIMARY KEY ("member_id", "workspace_id"),
    CONSTRAINT "workspace_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "workspace_members_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parent_folder_id" TEXT,
    "workspace_id" TEXT NOT NULL,
    "is_system" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "folders_parent_folder_id_fkey" FOREIGN KEY ("parent_folder_id") REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "folders_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "folder_id" TEXT,
    "workspace_id" TEXT NOT NULL,
    "meta" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "files_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "document_contexts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file_id" TEXT,
    "type" TEXT,
    "workspace_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "meta" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "document_contexts_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_contexts_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_contexts_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "members_user_name_key" ON "members"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE INDEX "folders_workspace_id_idx" ON "folders"("workspace_id");

-- CreateIndex
CREATE INDEX "files_folder_id_idx" ON "files"("folder_id");

-- CreateIndex
CREATE INDEX "document_contexts_workspace_id_idx" ON "document_contexts"("workspace_id");
