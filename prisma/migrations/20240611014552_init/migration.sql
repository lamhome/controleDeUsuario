-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_default" BOOLEAN NOT NULL DEFAULT false,
    "admin_default" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "change_password" BOOLEAN NOT NULL DEFAULT true,
    "type_id" TEXT NOT NULL,
    CONSTRAINT "users_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "keys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activated" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "request_ip" TEXT NOT NULL,
    "user_action" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "user_reference" TEXT NOT NULL,
    CONSTRAINT "logs_user_action_fkey" FOREIGN KEY ("user_action") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "logs_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "actions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "logs_user_reference_fkey" FOREIGN KEY ("user_reference") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
