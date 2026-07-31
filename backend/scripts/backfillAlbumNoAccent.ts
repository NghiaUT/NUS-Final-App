// scripts/backfillAlbumNoAccent.ts
import prisma from '../src/config/prisma/prisma.init.js';
import { removeVietnameseAccent } from '../src/utils/removeVietnameseAccent.util.js';

const BATCH_SIZE = 100; // Số record xử lý mỗi vòng lặp, tránh quá tải DB/memory

async function backfillAlbumNoAccent() {
  console.log(
    '[Backfill] Bắt đầu backfill Album.titleNoAccent / descriptionNoAccent...'
  );

  let skip = 0;
  let totalUpdated = 0;

  while (true) {
    // Lấy các album còn thiếu dữ liệu NoAccent (chỉ cần titleNoAccent null là đủ điều kiện,
    // vì title luôn bắt buộc có, còn description có thể null sẵn từ đầu)
    const albums = await prisma.album.findMany({
      where: {
        titleNoAccent: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
      take: BATCH_SIZE,
      skip: 0, // luôn lấy từ đầu vì sau mỗi vòng, các record đã update sẽ không còn null nữa
      orderBy: { createdAt: 'asc' },
    });

    if (albums.length === 0) {
      console.log('[Backfill] Không còn album nào cần backfill. Hoàn tất.');
      break;
    }

    console.log(
      `[Backfill] Đang xử lý batch ${totalUpdated + 1} -> ${totalUpdated + albums.length}...`
    );

    // Update tuần tự trong batch bằng transaction để đảm bảo tính nhất quán
    await prisma.$transaction(
      albums.map((album) =>
        prisma.album.update({
          where: { id: album.id },
          data: {
            titleNoAccent: removeVietnameseAccent(album.title),
            descriptionNoAccent: album.description
              ? removeVietnameseAccent(album.description)
              : null,
          },
        })
      )
    );

    totalUpdated += albums.length;
    console.log(`[Backfill] Đã update tổng cộng: ${totalUpdated} albums.`);
  }

  console.log(
    `[Backfill] HOÀN TẤT. Tổng số album đã backfill: ${totalUpdated}`
  );
}

backfillAlbumNoAccent()
  .catch((error) => {
    console.error('[Backfill] Lỗi khi backfill:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
