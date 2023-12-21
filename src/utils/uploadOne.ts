import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as sharp from "sharp";
export const uploadOne = async (file: any, pathName: "categories" | "brands" | "products" | "users") => {
    const filename = `${pathName}-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/${pathName}/${filename}`);
    return filename;
};
