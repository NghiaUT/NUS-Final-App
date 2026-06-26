import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMGAE_TYPES = ['image/jpg', 'image/png', 'image/gif'];

export const photoSchema = z.object({
  title: z.string().min(1, 'Title không được để trống').max(140, 'Title tối đa 140 ký tự.'),

  description: z.string().max(300, 'Tối đa 300 ký tự').optional(),

  sharingMode: z.enum(['public', 'private'], {
    error: () => ({ message: 'Chọn chế độ chia sẻ hợp lệ' }),
  }),

  photo: z
    .any()
    .refine((file) => file, 'Vui lòng tải lên một hình ảnh')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Kích thước của ảnh không được vượt quá 5MB')
    .refine(
      (file) => ACCEPTED_IMGAE_TYPES.includes(file?.type),
      'Chỉ chấp nhận các định dạng .jpeg, .png, .gif',
    ),
});
