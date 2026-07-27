-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "albumLikesCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "photosLikesCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followerCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followingCount" INTEGER NOT NULL DEFAULT 0;
