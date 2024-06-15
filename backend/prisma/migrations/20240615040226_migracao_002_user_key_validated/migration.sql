-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" DATETIME NOT NULL,
    "activated" BOOLEAN NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_keys" ("activated", "created_at", "expired_at", "id", "key", "user_id") SELECT "activated", "created_at", "expired_at", "id", "key", "user_id" FROM "keys";
DROP TABLE "keys";
ALTER TABLE "new_keys" RENAME TO "keys";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
