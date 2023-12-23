import { NotFoundException } from "@nestjs/common";
import { HydratedDocument, Model } from "mongoose";

export const findAll = async <T>(ModelSchema: Model<T>, filterObj: object = {}) => {
    const data = await ModelSchema.find(filterObj);
    if (!data) {
        throw new NotFoundException(`${ModelSchema.modelName}s not found`);
    }
    return data;
};

export const create = async <T, CreateDto>(ModelSchema: Model<T>, payload: CreateDto) => {
    const data = await ModelSchema.create(payload);
    if (!data) {
        throw new NotFoundException(`${ModelSchema.modelName} not created`);
    }
    return data;
};

export const update = async <T, UpdateDto>(ModelSchema: Model<T>, id: string, payload: UpdateDto) => {
    const data = await ModelSchema.findByIdAndUpdate(id, payload, { new: true });
    if (!data) {
        throw new NotFoundException(`${ModelSchema.modelName} (${id}) not found`);
    }
    return data;
};

export const findOne = async <T>(ModelSchema: Model<T>, payload: string | object, findType?: "payload") => {
    let data: HydratedDocument<T>;
    if (findType === "payload") {
        data = await ModelSchema.findOne(payload as object);
    } else {
        data = await ModelSchema.findById(payload);
        if (!data) {
            throw new NotFoundException(`${ModelSchema.modelName} (${payload}) not found`);
        }
    }

    return data;
};

export const remove = async <T>(ModelSchema: Model<T>, id: string) => {
    const data = await ModelSchema.findByIdAndDelete(id);
    if (!data) {
        throw new NotFoundException(`${ModelSchema.modelName} (${id}) not found`);
    }
    return `${ModelSchema.modelName} removed Successfuly`;
};
