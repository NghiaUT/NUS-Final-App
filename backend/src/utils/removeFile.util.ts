import path from 'node:path';
import fs from 'fs/promises';

export const removeFile = async (filename: string) => {
  try {
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
