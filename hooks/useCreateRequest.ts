import { useMutation } from 'react-query';
import { IRequest } from '@/models/request';
import createRequest from '@/actions/createRequest';

export const useCreateRequestMutation = () => {
  return useMutation((req: IRequest) => createRequest(req));
};
