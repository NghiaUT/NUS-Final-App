import path from 'node:path';
import fs from 'fs/promises';
import { InternalServerError } from './apiError.js';
import { cloudinary } from '../config/cloudinary/cloudinary.config.js';
import { constant } from '../config/constant/constant.js';

let STORAGE_PLACE: StoragePlace = 'cloud';
type StoragePlace = 'cloud' | 'folder';

function isLocalhost(url: string) {
  const localhostRegex =
    /^(https?:\/\/)?(localhost|127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\])(:\d+)?(\/.*)?$/i;
  return localhostRegex.test(url);
}

// Remove file cho giai đoạn dev local
const removeFileOnFolder = async (input: string) => {
  try {
    if (!input)
      throw new InternalServerError('Wrong Remove Filename parameter');
    if (!isLocalhost(input)) {
      console.log(
        `[FileCleaner] File ${input} không thuộc về folder uploads, không cần chạy tiếp file cleaner`
      );
      return;
    }
    const arr = input.split('/');
    const filename = arr[arr.length - 1] as string;
    const filePath = path.resolve(process.cwd(), 'uploads', filename);

    await fs.unlink(filePath);
    console.log(`[FileCleaner] Đã dọn dẹp thành công file rác: ${filename}`);
  } catch (fsError) {
    console.error(
      '[FileCleaner] CẢNH BÁO: Rollback xóa file thất bại!',
      fsError
    );
  }
};

const removeFileCloudinary = async (id: string | null) => {
  // Xóa file đã tải lên Cloudinary
  try {
    if (!id) {
      throw new InternalServerError('Wrong Remove Filename parameter');
    }
    const result = await cloudinary.uploader.destroy(id);
    if (result.result === 'ok') {
      console.log(`[FileCleaner] Đã dọn dẹp thành công file rác: ${id}`);
    } else if (result.result === 'not found') {
      console.log(`[FileCleaner] Không tìm thấy file rác có id: ${id}`);
    } else {
      throw new InternalServerError('Xóa ảnh thất bại');
    }
  } catch (error) {
    console.error('[FileCleaner] CẢNH BÁO: Rollback xóa file thất bại!', error);
  }
};

export const removeFile =
  STORAGE_PLACE === 'cloud' ? removeFileCloudinary : removeFileOnFolder;
