import { Model } from "mongoose";

export const validateIsExist = async <T>(ModelSchema: Model<T>, payload: object) => {
    const data = await ModelSchema.findOne(payload);
    if (data) {
        return true;
    } else {
        return false;
    }
};
