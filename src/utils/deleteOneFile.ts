import * as fs from "fs";
export const  deleteOneFile = (path: string) => {
     fs.unlink(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
