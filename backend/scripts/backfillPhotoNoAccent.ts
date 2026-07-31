// scripts/backfillPhotoNoAccent.ts
import prisma from '../src/config/prisma/prisma.init.js';
import { removeVietnameseAccent } from '../src/utils/removeVietnameseAccent.util.js';
const BATCH_SIZE = 100;

async function backfillPhotoNoAccent() {
  console.log(
    '[Backfill] Bắt đầu backfill Photo.titleNoAccent / descriptionNoAccent...'
  );

  let totalUpdated = 0;

  while (true) {
    // Lấy các photo còn thiếu titleNoAccent HOẶC descriptionNoAccent
    const photos = await prisma.photo.findMany({
      where: {
        OR: [
          { title: { not: null }, titleNoAccent: null },
          { description: { not: null }, descriptionNoAccent: null },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
      take: BATCH_SIZE,
      orderBy: { createdAt: 'asc' },
    });

    if (photos.length === 0) {
      console.log('[Backfill] Không còn photo nào cần backfill. Hoàn tất.');
      break;
    }

    console.log(
      `[Backfill] Đang xử lý batch ${totalUpdated + 1} -> ${totalUpdated + photos.length}...`
    );

    await prisma.$transaction(
      photos.map((photo) =>
        prisma.photo.update({
          where: { id: photo.id },
          data: {
            titleNoAccent: photo.title
              ? removeVietnameseAccent(photo.title)
              : null,
            descriptionNoAccent: photo.description
              ? removeVietnameseAccent(photo.description)
              : null,
          },
        })
      ),
      {
        timeout: 20000, // tăng lên 20s thay vì mặc định 5s
        maxWait: 10000,
      }
    );

    totalUpdated += photos.length;
    console.log(`[Backfill] Đã update tổng cộng: ${totalUpdated} photos.`);
  }

  console.log(
    `[Backfill] HOÀN TẤT. Tổng số photo đã backfill: ${totalUpdated}`
  );
}

backfillPhotoNoAccent()
  .catch((error) => {
    console.error('[Backfill] Lỗi khi backfill:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
