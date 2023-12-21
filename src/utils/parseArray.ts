export const parseArray = (data: string | string[]) => {
    let dataArray = [];
    if (Array.isArray(data)) {
        dataArray = [...data];
    } else {
        dataArray.push(data);
    }
    return dataArray;
};
