import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

// Schema validate cho 1 file ảnh
export const singleImageSchema = z
  .any()
  .refine((file) => !!file, 'Vui lòng tải lên một hình ảnh')
  .superRefine((file, ctx) => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Chỉ chấp nhận các định dạng .jpeg, .png, .gif',
      });
      return; // Dừng lại nếu sai định dạng
    }

    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: 'custom',
        message: 'Kích thước mỗi ảnh không được vượt quá 5MB',
      });
    }
  });

export const albumImageSchema = z.array(singleImageSchema);

export const formInfoSchema = z.object({
  title: z.string().min(1, 'Title không được để trống').max(140, 'Title tối đa 140 ký tự.'),

  description: z.string().min(1, 'Description không được để trống').max(300, 'Tối đa 300 ký tự'),

  sharingMode: z.preprocess(
    (val) => {
      if (typeof val === 'string') return val.toLowerCase();
      return val;
    },
    z.enum(['public', 'private'], { error: () => ({ message: 'Chọn chế độ chia sẻ hợp lệ' }) }),
  ),
});

export const avatarSchema = z
  .any()
  .optional()
  .nullable()
  .superRefine((file, ctx) => {
    if (!file) return; // Không chọn avatar -> hợp lệ vì avatar là optional.

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Chỉ chấp nhận định dạng .jpeg, .png',
      });
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      ctx.addIssue({
        code: 'custom',
        message: 'Kích thước ảnh đại diện không được vượt quá 2MB',
      });
    }
  });

export const basicInfoSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name không được để trống'),

  lastName: z.string().trim().min(1, 'Last Name không được để trống'),

  email: z.string().trim().min(1, 'Email không được để trống').email('Email không hợp lệ'),

  avatar: avatarSchema,
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),

    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),

    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu mới'),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
      });
    }

    if (data.newPassword === data.currentPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới không được giống mật khẩu hiện tại',
        path: ['newPassword'],
      });
    }
  });
