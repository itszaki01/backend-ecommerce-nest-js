export const mongoObjParse = <T>(object: T) => {
    const newObj = JSON.stringify(object);
    return JSON.parse(newObj);
};
