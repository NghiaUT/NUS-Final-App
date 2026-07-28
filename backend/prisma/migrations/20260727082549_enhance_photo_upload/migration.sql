-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "publicId" TEXT;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "publicId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarPublicId" TEXT;
