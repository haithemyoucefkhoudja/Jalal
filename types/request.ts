import {FileInfo} from "./Media";

export type RequestStatus = 'PENDING'  |'APPROVED' | 'REJECTED'
export interface IRequest {
    _id: string;
    name: string;
    email: string;
    description:string;
    status:RequestStatus;
    media:FileInfo[]
    createdAt:Date;
    updatedAt:Date;
}