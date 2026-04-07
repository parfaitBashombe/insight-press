/*
  Warnings:

  - You are about to drop the column `createdAt` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the `admin_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reader_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `writer_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "reader_profiles" DROP CONSTRAINT "reader_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "writer_profiles" DROP CONSTRAINT "writer_profiles_user_id_fkey";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "twitter" TEXT;

-- DropTable
DROP TABLE "admin_profiles";

-- DropTable
DROP TABLE "reader_profiles";

-- DropTable
DROP TABLE "writer_profiles";
