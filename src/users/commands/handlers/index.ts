import { UpdateUserHandler } from './update-user.handler';
import { ResendEmailVerificationHandler } from './resend-email-verification.handler';

export const CommandHandlers = [
  UpdateUserHandler,
  ResendEmailVerificationHandler,
];
