import { useMutation } from 'react-query';
import { IMeeting } from '@/models/meeting';
import createMeeting from '@/actions/createMeeting';

export const useCreateMeetingMutation = () => {
  return useMutation((req: IMeeting) => createMeeting(req));
};
