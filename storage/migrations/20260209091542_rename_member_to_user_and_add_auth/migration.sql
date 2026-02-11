/*
  Warnings:

  - You are about to drop the column `sso_auth_id` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `sso_auth_provider` on the `members` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "display_name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" DATETIME,
    "avatar_url" TEXT,
    "user_name" TEXT,
    "credential" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_loggedin" DATETIME,
    "deleted_at" DATETIME
);
INSERT INTO "new_members" ("created_at", "credential", "deleted_at", "display_name", "email", "id", "last_loggedin", "user_name") SELECT "created_at", "credential", "deleted_at", "display_name", "email", "id", "last_loggedin", "user_name" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
CREATE UNIQUE INDEX "members_user_name_key" ON "members"("user_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");
