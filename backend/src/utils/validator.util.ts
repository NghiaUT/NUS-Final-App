import { z, ZodType } from 'zod';
import { BadRequestError } from './apiError.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

export function validateData<TSchema extends ZodType>(
  schema: TSchema,
  data: unknown
): z.infer<TSchema> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errorMessage = Object.values(z.flattenError(result.error).fieldErrors)
      .flat()
      .filter(Boolean)
      .join(', ');

    console.error('[Validation] Gặp lỗi khi validate dữ liệu: ', errorMessage);
    throw new BadRequestError('Invalid Data Format, Please try again!');
  }

  return result.data;
}
// Schema validate cho 1 file ảnh

const multerFileSchema = z.looseObject({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  destination: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
});

export const singleImageSchema = multerFileSchema.superRefine((file, ctx) => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Chỉ chấp nhận các định dạng .jpeg, .png, .gif, .webp',
    });
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
  title: z
    .string()
    .min(1, 'Title không được để trống')
    .max(140, 'Title tối đa 140 ký tự.'),

  description: z
    .string()
    .min(1, 'Description không được để trống')
    .max(300, 'Tối đa 300 ký tự'),

  sharingMode: z.enum(['PUBLIC', 'PRIVATE'], {
    error: () => ({ message: 'Chọn chế độ chia sẻ hợp lệ' }),
  }),
});

export const avatarSchema = multerFileSchema
  .nullable()
  .optional()
  .superRefine((file, ctx) => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Chỉ chấp nhận định dạng .jpeg, .png',
      });
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

  email: z.email('Email không hợp lệ'),
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

export const adminProfileSchema = z.object({
  firstName: z.string().min(1, 'Vui lòng nhập First Name'),
  lastName: z.string().min(1, 'Vui lòng nhập Last Name'),
  email: z.email('Email không hợp lệ'),
  password: z.union([
    z.string().length(0),
    z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  ]),
  isActive: z.boolean(),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name không thể để trống')
    .max(25, 'First name không được dài quá 25 ký tự'),

  lastName: z
    .string()
    .min(1, 'Last name không thể để trống')
    .max(25, 'Last name không được dài quá 25 ký tự'),

  email: z
    .email('Email không hợp lệ!')
    .min(1, 'Email không được để trống')
    .max(255, 'Email phải nhỏ hơn 255 ký tự'),

  password: z
    .string()
    .min(1, 'Password cannot be empty')
    .max(64, 'Password must be a maximum of 64 characters long'),

  confirmedPassword: z
    .string()
    .min(1, 'Confirmed password cannot be empty')
    .max(64, 'Confirmed password must be a maximum of 64 characters long'),
});

export const loginSchema = z.object({
  email: z.email('Email không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(64, 'Mật khẩu phải nhỏ hơn 64 ký tự'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .email('Email không hợp lệ!')
    .max(255, 'Email phải nhỏ hơn 255 ký tự'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password cannot be empty')
    .max(64, 'Password must be a maximum of 64 characters long'),
  confirmedPassword: z
    .string()
    .min(1, 'Confirmed password cannot be empty')
    .max(64, 'Confirmed password must be a maximum of 64 characters long'),
});
