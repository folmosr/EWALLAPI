import { Schema } from "mongoose";
export interface ICategory {
    name:String;
    clasificationId:Schema.Types.ObjectId;
    parentId:Schema.Types.ObjectId;
    createdAt: Date;
}
