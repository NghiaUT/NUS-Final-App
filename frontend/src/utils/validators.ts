import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

// Schema validate cho 1 file ảnh
const singleImageSchema = z
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

export const albumSchema = z.object({
  title: z.string().trim().min(1, 'Title không được để trống').max(140, 'Title tối đa 140 ký tự'),

  description: z
    .string()
    .trim()
    .min(1, 'Description không được để trống')
    .max(300, 'Description tối đa 300 ký tự'),

  sharingMode: z.enum(['public', 'private'], {
    error: () => ({ message: 'Vui lòng chọn chế độ chia sẻ hợp lệ' }),
  }),

  photos: z
    .array(singleImageSchema)
    .min(1, 'Vui lòng đính kèm ít nhất 1 hình ảnh')
    .max(25, 'Tối đa được tải lên 25 hình ảnh'),
});

export const photoSchema = z.object({
  title: z.string().min(1, 'Title không được để trống').max(140, 'Title tối đa 140 ký tự.'),

  description: z.string().max(300, 'Tối đa 300 ký tự').optional(),

  sharingMode: z.enum(['public', 'private'], {
    error: () => ({ message: 'Chọn chế độ chia sẻ hợp lệ' }),
  }),

  // Dùng lại đúng schema file cho ảnh duy nhất đã định nghĩa ở trên
  photo: singleImageSchema,
});
