import path from 'node:path';
import fs from 'fs/promises';
import { InternalServerError } from './apiError.js';

function isLocalhost(url: string) {
  const localhostRegex =
    /^(https?:\/\/)?(localhost|127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\])(:\d+)?(\/.*)?$/i;
  return localhostRegex.test(url);
}

export const removeFile = async (input: string) => {
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
