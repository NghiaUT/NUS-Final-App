// Gen mockdata for db
import { SharingMode, UserRole } from '../generated/prisma/enums.js';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

import bcrypt from 'bcrypt';
import { generateDefaultAvatar } from '../src/utils/avatar.util.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

// --------------------------------------------------
// HÀM HỖ TRỢ (HELPERS)
// --------------------------------------------------

async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

// --------------------------------------------------
// POOL ẢNH UNSPLASH (24 ảnh chất lượng cao, đa chủ đề)
// --------------------------------------------------
const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Núi non
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', // Đại dương
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80', // Rừng cây
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80', // Sa mạc
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80', // Thành phố đêm
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80', // Đường phố
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80', // Kiến trúc
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80', // Đường phố cổ điển
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', // Đồ ăn
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', // Cà phê
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', // Ẩm thực Á Đông
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80', // Chân dung
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80', // Chân dung nghệ thuật
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80', // Chó cưng
  'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=1200&q=80', // Mèo cưng
  'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=1200&q=80', // Động vật hoang dã
  'https://images.unsplash.com/photo-1517849845537-4d257902861a?w=1200&q=80', // Công nghệ
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', // Mạch điện tử
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80', // Tranh nghệ thuật
  'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80', // Tượng điêu khắc
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80', // Hồ nước
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80', // Bình minh
  'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=1200&q=80', // Hoàng hôn
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', // Bầu trời sao
];

function pickImage(i: number) {
  return MOCK_IMAGES[i % MOCK_IMAGES.length];
}

// --------------------------------------------------
// DANH SÁCH 10 USERS (2 ADMIN + 8 USER)
// --------------------------------------------------
const usersData = [
  {
    email: 'admin1@photoapp.com',
    firstName: 'Minh',
    lastName: 'Nguyễn',
    role: UserRole.ADMIN,
  },
  {
    email: 'admin2@photoapp.com',
    firstName: 'Lan',
    lastName: 'Trần',
    role: UserRole.ADMIN,
  },
  {
    email: 'user1@photoapp.com',
    firstName: 'Hùng',
    lastName: 'Phạm',
    role: UserRole.USER,
  },
  {
    email: 'user2@photoapp.com',
    firstName: 'Hoa',
    lastName: 'Lê',
    role: UserRole.USER,
  },
  {
    email: 'user3@photoapp.com',
    firstName: 'Tuấn',
    lastName: 'Đặng',
    role: UserRole.USER,
  },
  {
    email: 'user4@photoapp.com',
    firstName: 'Linh',
    lastName: 'Vũ',
    role: UserRole.USER,
  },
  {
    email: 'user5@photoapp.com',
    firstName: 'Khoa',
    lastName: 'Bùi',
    role: UserRole.USER,
  },
  {
    email: 'user6@photoapp.com',
    firstName: 'Trang',
    lastName: 'Hoàng',
    role: UserRole.USER,
  },
  {
    email: 'user7@photoapp.com',
    firstName: 'Đức',
    lastName: 'Đỗ',
    role: UserRole.USER,
  },
  {
    email: 'user8@photoapp.com',
    firstName: 'Mai',
    lastName: 'Ngô',
    role: UserRole.USER,
  },
];

// --------------------------------------------------
// 30 PHOTOS ĐƠN LẺ (KHÔNG THUỘC ALBUM)
// --------------------------------------------------
const standalonePhotosData = [
  {
    title: 'Bình minh trên đỉnh núi',
    description: 'Khoảnh khắc mặt trời ló dạng sau dãy núi mờ sương.',
    alt_text: 'Bình minh trên núi',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Sóng biển vỗ bờ',
    description: 'Những con sóng xanh biếc đập vào bờ cát trắng.',
    alt_text: 'Sóng biển',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Con đường xuyên rừng',
    description: 'Lối mòn nhỏ len lỏi giữa những hàng cây cổ thụ.',
    alt_text: 'Đường rừng',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Cồn cát mênh mông',
    description: 'Những đụn cát trải dài dưới ánh nắng chiều.',
    alt_text: 'Sa mạc cát',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Thành phố về đêm',
    description: 'Ánh đèn lung linh phản chiếu trên những tòa nhà cao tầng.',
    alt_text: 'Thành phố đêm',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Góc phố cổ kính',
    description: 'Một góc phố nhỏ mang đậm dấu ấn thời gian.',
    alt_text: 'Phố cổ',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Kiến trúc hiện đại',
    description: 'Đường nét sắc sảo của một công trình kiến trúc mới.',
    alt_text: 'Tòa nhà hiện đại',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Con hẻm hoài niệm',
    description: 'Bức tường loang lổ gợi nhớ về một thời đã qua.',
    alt_text: 'Con hẻm cũ',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Bữa tiệc ẩm thực',
    description: 'Bàn tiệc đầy màu sắc với những món ăn hấp dẫn.',
    alt_text: 'Bàn ăn thịnh soạn',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Ly cà phê buổi sáng',
    description: 'Hương thơm cà phê tan trong không khí se lạnh.',
    alt_text: 'Cà phê sáng',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Món ăn đường phố Á Đông',
    description: 'Hương vị đậm đà của ẩm thực đường phố châu Á.',
    alt_text: 'Ẩm thực đường phố',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Chân dung nghệ thuật',
    description: 'Ánh sáng tự nhiên tôn lên nét đẹp chân thực.',
    alt_text: 'Ảnh chân dung',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Nét đẹp đời thường',
    description: 'Một khoảnh khắc bình dị nhưng đầy cảm xúc.',
    alt_text: 'Chân dung đời thường',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Chú chó tinh nghịch',
    description: 'Ánh mắt hồn nhiên của một người bạn bốn chân.',
    alt_text: 'Chó cưng',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Mèo con lười biếng',
    description: 'Chú mèo cuộn tròn ngủ ngon trong nắng chiều.',
    alt_text: 'Mèo cưng',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Muông thú hoang dã',
    description: 'Vẻ đẹp tự nhiên của động vật nơi hoang dã.',
    alt_text: 'Động vật hoang dã',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Thế giới công nghệ',
    description: 'Những thiết bị hiện đại trong không gian làm việc.',
    alt_text: 'Công nghệ',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Bo mạch điện tử',
    description: 'Chi tiết tinh vi của một bảng mạch máy tính.',
    alt_text: 'Mạch điện tử',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Tác phẩm hội họa',
    description: 'Những nét cọ đầy cảm xúc trên khung tranh.',
    alt_text: 'Tranh nghệ thuật',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Tượng điêu khắc cổ',
    description: 'Dấu ấn thời gian trên từng đường nét điêu khắc.',
    alt_text: 'Tượng điêu khắc',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Mặt hồ tĩnh lặng',
    description: 'Mặt nước phẳng lặng phản chiếu bầu trời.',
    alt_text: 'Hồ nước',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Bình minh trên biển',
    description: 'Tia nắng đầu tiên xuyên qua làn mây mỏng.',
    alt_text: 'Bình minh',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Hoàng hôn rực rỡ',
    description: 'Bầu trời nhuộm cam khi ngày sắp tàn.',
    alt_text: 'Hoàng hôn',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Bầu trời đầy sao',
    description: 'Dải ngân hà lấp lánh giữa đêm tối.',
    alt_text: 'Bầu trời sao',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Đỉnh núi phủ tuyết',
    description: 'Lớp tuyết trắng xóa bao phủ đỉnh núi cao.',
    alt_text: 'Núi tuyết',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Bờ biển hoang sơ',
    description: 'Bãi biển vắng người với làn nước trong xanh.',
    alt_text: 'Bãi biển',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Rừng thu lá vàng',
    description: 'Sắc vàng cam bao trùm cả khu rừng mùa thu.',
    alt_text: 'Rừng mùa thu',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Ánh đèn đường phố',
    description: 'Những vệt sáng dài do xe cộ để lại trong đêm.',
    alt_text: 'Đèn đường',
    sharingMode: SharingMode.PRIVATE,
  },
  {
    title: 'Quán cà phê góc phố',
    description: 'Không gian ấm cúng của một quán cà phê nhỏ.',
    alt_text: 'Quán cà phê',
    sharingMode: SharingMode.PUBLIC,
  },
  {
    title: 'Khoảnh khắc sáng tạo',
    description: 'Góc nhìn độc đáo về những vật dụng quen thuộc.',
    alt_text: 'Ảnh nghệ thuật',
    sharingMode: SharingMode.PUBLIC,
  },
];

// --------------------------------------------------
// 25 ALBUMS (mỗi album có 2-20 photos)
// --------------------------------------------------
const albumsData = [
  {
    title: 'Hành trình chinh phục núi rừng',
    description: 'Tuyển tập ảnh về những chuyến đi khám phá núi rừng hùng vĩ.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 8,
  },
  {
    title: 'Biển xanh cát trắng',
    description: 'Những khoảnh khắc thư giãn bên bờ biển trong xanh.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 12,
  },
  {
    title: 'Sài Gòn về đêm',
    description: 'Vẻ đẹp lung linh của thành phố khi lên đèn.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 6,
  },
  {
    title: 'Kiến trúc đương đại',
    description: 'Bộ sưu tập những công trình kiến trúc ấn tượng.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 5,
  },
  {
    title: 'Ẩm thực bốn phương',
    description: 'Hành trình khám phá các món ăn đặc sắc khắp nơi.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 15,
  },
  {
    title: 'Ly cà phê mỗi sáng',
    description: 'Những góc quán cà phê yêu thích trong tuần.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 4,
  },
  {
    title: 'Chân dung con người',
    description: 'Series ảnh chân dung ghi lại nhiều cảm xúc khác nhau.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 10,
  },
  {
    title: 'Thú cưng đáng yêu',
    description: 'Tổng hợp ảnh những người bạn bốn chân đáng yêu.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 20,
  },
  {
    title: 'Thế giới hoang dã',
    description: 'Ghi lại vẻ đẹp tự nhiên của động vật hoang dã.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 9,
  },
  {
    title: 'Công nghệ và đời sống',
    description:
      'Những thiết bị công nghệ hiện diện trong cuộc sống hằng ngày.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 3,
  },
  {
    title: 'Góc nhìn nghệ thuật số',
    description: 'Bộ sưu tập ảnh mang phong cách nghệ thuật hiện đại.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 7,
  },
  {
    title: 'Tranh và điêu khắc',
    description: 'Những tác phẩm nghệ thuật thị giác đầy cảm hứng.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 6,
  },
  {
    title: 'Mặt hồ yên bình',
    description: 'Những khoảnh khắc tĩnh lặng bên các hồ nước.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 5,
  },
  {
    title: 'Bình minh và hoàng hôn',
    description: 'Sưu tập những khung cảnh đẹp nhất trong ngày.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 14,
  },
  {
    title: 'Đêm không trăng sao',
    description: 'Ảnh chụp bầu trời đêm đầy sao lấp lánh.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 4,
  },
  {
    title: 'Tuyết trắng núi cao',
    description: 'Cảnh sắc mùa đông tại các đỉnh núi phủ tuyết.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 11,
  },
  {
    title: 'Bờ biển hoang sơ',
    description: 'Những bãi biển chưa nhiều dấu chân người.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 8,
  },
  {
    title: 'Sắc thu vàng',
    description: 'Mùa thu với những gam màu vàng cam ấm áp.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 6,
  },
  {
    title: 'Ánh sáng đô thị',
    description: 'Ánh đèn và chuyển động của cuộc sống thành phố.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 5,
  },
  {
    title: 'Góc quán quen thuộc',
    description: 'Những quán xá thân thuộc mỗi cuối tuần.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 3,
  },
  {
    title: 'Sáng tạo không giới hạn',
    description: 'Góc nhìn độc lạ về những vật dụng đời thường.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 9,
  },
  {
    title: 'Kỷ niệm chuyến đi xa',
    description:
      'Album lưu giữ những khoảnh khắc trong chuyến du lịch dài ngày.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 18,
  },
  {
    title: 'Ngày mưa Sài Gòn',
    description: 'Vẻ đẹp lãng mạn của thành phố trong những cơn mưa.',
    sharingMode: SharingMode.PRIVATE,
    photoCount: 2,
  },
  {
    title: 'Chợ quê ngày Tết',
    description: 'Không khí rộn ràng của phiên chợ Tết truyền thống.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 13,
  },
  {
    title: 'Những khung hình vu vơ',
    description: 'Bộ sưu tập ảnh chụp ngẫu hứng không chủ đề cố định.',
    sharingMode: SharingMode.PUBLIC,
    photoCount: 16,
  },
];

async function main() {
  console.log(
    '🚀 Bắt đầu quá trình seed dữ liệu (Users, Photos, Albums, Follow, Likes)...'
  );

  // --------------------------------------------------
  // BƯỚC 1: TẠO 10 USERS (2 ADMIN + 8 USER)
  // --------------------------------------------------
  const defaultPasswordHash = await hashPassword('Password123!');

  const createdUsers = [];
  for (let i = 0; i < usersData.length; i++) {
    const u = usersData[i];
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        password: defaultPasswordHash,
        role: u.role,
        isVerified: true,
        isActive: true,
        avatarUrl: generateDefaultAvatar(u?.firstName, u?.lastName),
      },
    });
    createdUsers.push(user);
  }
  console.log(`✅ Đã tạo ${createdUsers.length} Users (2 ADMIN + 8 USER).`);

  // --------------------------------------------------
  // BƯỚC 2: TẠO 30 PHOTOS ĐƠN LẺ (KHÔNG THUỘC ALBUM)
  // --------------------------------------------------
  for (let i = 0; i < standalonePhotosData.length; i++) {
    const p = standalonePhotosData[i];
    const owner = createdUsers[i % createdUsers.length];
    await prisma.photo.create({
      data: {
        title: p.title,
        description: p.description,
        alt_text: p.alt_text,
        sharingMode: p.sharingMode,
        imageUrl: pickImage(i),
        mimeType: 'image/jpeg',
        userId: owner.id,
      },
    });
  }
  console.log(
    `✅ Đã tạo ${standalonePhotosData.length} Photos đơn lẻ (không thuộc album).`
  );

  // --------------------------------------------------
  // BƯỚC 3: TẠO 25 ALBUMS, MỖI ALBUM CÓ 2-20 PHOTOS
  // --------------------------------------------------
  const createdAlbums = [];
  let imageCursor = 0; // tiếp tục xoay vòng pool ảnh cho album, khác điểm bắt đầu với standalone photos

  for (let i = 0; i < albumsData.length; i++) {
    const a = albumsData[i];
    const owner = createdUsers[i % createdUsers.length];

    const album = await prisma.album.create({
      data: {
        title: a.title,
        description: a.description,
        sharingMode: a.sharingMode,
        userId: owner.id,
      },
    });
    createdAlbums.push(album);

    for (let j = 0; j < a.photoCount; j++) {
      await prisma.photo.create({
        data: {
          title: `${a.title} - Ảnh ${j + 1}`,
          description: `Một khoảnh khắc thuộc bộ sưu tập "${a.title}".`,
          alt_text: `${a.title} ${j + 1}`,
          sharingMode: a.sharingMode,
          imageUrl: pickImage(imageCursor),
          mimeType: 'image/jpeg',
          userId: owner.id,
          albumId: album.id,
        },
      });
      imageCursor++;
    }
  }

  const totalAlbumPhotos = albumsData.reduce((sum, a) => sum + a.photoCount, 0);
  console.log(
    `✅ Đã tạo ${createdAlbums.length} Albums với tổng cộng ${totalAlbumPhotos} Photos bên trong.`
  );

  // --------------------------------------------------
  // BƯỚC 4: TẠO ÍT NHẤT 40 RECORDS FOLLOW
  // --------------------------------------------------
  const followPairs = new Set<string>();
  const followsToCreate: { followerId: string; followingId: string }[] = [];

  // Mỗi user follow một số user khác theo chu kỳ để đảm bảo đa dạng và đủ >= 40 bản ghi, không tự follow chính mình
  const followOffsets = [1, 2, 3, 4, 5]; // mỗi user follow 5 người khác nhau => 10 * 5 = 50 records
  for (let i = 0; i < createdUsers.length; i++) {
    for (const offset of followOffsets) {
      const followerIndex = i;
      const followingIndex = (i + offset) % createdUsers.length;
      if (followerIndex === followingIndex) continue;

      const follower = createdUsers[followerIndex];
      const following = createdUsers[followingIndex];
      const key = `${follower.id}-${following.id}`;

      if (!followPairs.has(key)) {
        followPairs.add(key);
        followsToCreate.push({
          followerId: follower.id,
          followingId: following.id,
        });
      }
    }
  }

  for (const f of followsToCreate) {
    await prisma.$transaction(async (tx) => {
      await tx.follow.upsert({
        where: {
          followerId_followingId: {
            followerId: f.followerId,
            followingId: f.followingId,
          },
        },
        update: {},
        create: f,
      });

      await tx.user.update({
        where: {
          id: f.followerId,
        },
        data: {
          followingCount: { increment: 1 },
        },
      });

      await tx.user.update({
        where: {
          id: f.followingId,
        },
        data: {
          followerCount: { increment: 1 },
        },
      });
    });
    // Cập nhật trường follower và following của followerId và following Id.
  }
  console.log(`✅ Đã tạo ${followsToCreate.length} records Follow.`);

  // --------------------------------------------------
  // BƯỚC 5: TẠO ÍT NHẤT 50 RECORDS PHOTO LIKE
  // --------------------------------------------------
  const allPhotos = await prisma.photo.findMany({ select: { id: true } });
  const photoLikePairs = new Set<string>();
  const photoLikesToCreate: { userId: string; photoId: string }[] = [];

  let userCursorForPhotoLike = 0;
  let attempts = 0;
  while (
    photoLikesToCreate.length < 55 &&
    attempts < allPhotos.length * createdUsers.length
  ) {
    const photo = allPhotos[attempts % allPhotos.length];
    const user = createdUsers[userCursorForPhotoLike % createdUsers.length];
    const key = `${user.id}-${photo.id}`;

    if (!photoLikePairs.has(key)) {
      photoLikePairs.add(key);
      photoLikesToCreate.push({ userId: user.id, photoId: photo.id });
    }
    userCursorForPhotoLike++;
    attempts++;
  }

  for (const l of photoLikesToCreate) {
    await prisma.$transaction(async (tx) => {
      await tx.photoLike.upsert({
        where: { userId_photoId: { userId: l.userId, photoId: l.photoId } },
        update: {},
        create: l,
      });

      await tx.photo.update({
        where: {
          id: l.photoId,
        },
        data: {
          photosLikesCount: { increment: 1 },
        },
      });
    });
  }
  console.log(`✅ Đã tạo ${photoLikesToCreate.length} records PhotoLike.`);

  // --------------------------------------------------
  // BƯỚC 6: TẠO ÍT NHẤT 50 RECORDS ALBUM LIKE
  // --------------------------------------------------
  const albumLikePairs = new Set<string>();
  const albumLikesToCreate: { userId: string; albumId: string }[] = [];

  let userCursorForAlbumLike = 0;
  let albumAttempts = 0;
  while (
    albumLikesToCreate.length < 55 &&
    albumAttempts < createdAlbums.length * createdUsers.length
  ) {
    const album = createdAlbums[albumAttempts % createdAlbums.length];
    const user = createdUsers[userCursorForAlbumLike % createdUsers.length];
    const key = `${user.id}-${album.id}`;

    if (!albumLikePairs.has(key)) {
      albumLikePairs.add(key);
      albumLikesToCreate.push({ userId: user.id, albumId: album.id });
    }
    userCursorForAlbumLike++;
    albumAttempts++;
  }

  for (const l of albumLikesToCreate) {
    await prisma.$transaction(async (tx) => {
      await tx.albumLike.upsert({
        where: { userId_albumId: { userId: l.userId, albumId: l.albumId } },
        update: {},
        create: l,
      });

      await tx.album.update({
        where: {
          id: l.albumId,
        },
        data: {
          albumLikesCount: { increment: 1 },
        },
      });
    });
  }
  console.log(`✅ Đã tạo ${albumLikesToCreate.length} records AlbumLike.`);

  console.log('🎉 Seed dữ liệu hoàn tất!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi trong quá trình seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
