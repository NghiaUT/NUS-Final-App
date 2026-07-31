-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "descriptionNoAccent" TEXT,
ADD COLUMN     "titleNoAccent" TEXT;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "descriptionNoAccent" TEXT,
ADD COLUMN     "titleNoAccent" TEXT;
