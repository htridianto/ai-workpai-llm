-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "display_name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" DATETIME,
    "avatar_url" TEXT,
    "user_name" TEXT,
    "sso_auth_provider" TEXT,
    "sso_auth_id" TEXT,
    "credential" TEXT,
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'default',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_loggedin" DATETIME,
    "deleted_at" DATETIME
);
INSERT INTO "new_users" ("avatar_url", "created_at", "credential", "deleted_at", "display_name", "email", "email_verified", "id", "last_loggedin", "sso_auth_id", "sso_auth_provider", "user_name") SELECT "avatar_url", "created_at", "credential", "deleted_at", "display_name", "email", "email_verified", "id", "last_loggedin", "sso_auth_id", "sso_auth_provider", "user_name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
