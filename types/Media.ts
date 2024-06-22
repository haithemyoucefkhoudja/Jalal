import { IRequest } from "./request";

export default interface IMedia {
    id:string;
    url:string;
    requestId:string;
    type:string;
    createdAt:Date;
    request:IRequest
}