import { Schema } from "mongoose";
export interface ICategory {
    Name:string;
    ClasificationId:Schema.Types.ObjectId;
    ParentId:Schema.Types.ObjectId;
    CreatedAt:Date;
}
