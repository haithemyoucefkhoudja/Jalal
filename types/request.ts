import IMedia from "./Media";

export type RequestStatus = 'PENDING'  |'APPROVED' | 'REJECTED'
export interface IRequest {
    id: string;
    name: string;
    email: string;
    description:string;
    status:RequestStatus;
    media:IMedia[]
    createdAt:Date;
    updatedAt:Date;
}