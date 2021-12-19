import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, catchError } from 'rxjs';
import { ResendEmailVerificationCommand } from '../impl';
import { HttpException } from '@nestjs/common';

@CommandHandler(ResendEmailVerificationCommand)
export class ResendEmailVerificationHandler
  implements ICommandHandler<ResendEmailVerificationCommand>
{
  constructor(private httpService: HttpService) {}

  async execute(command: ResendEmailVerificationCommand): Promise<boolean> {
    const { userId } = command;
    return lastValueFrom(
      this.httpService
        .post(
          `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/jobs/verification-email`,
          { user_id: userId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
            },
          },
        )
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          }),
          map(() => {
            return true;
          }),
        ),
    );
  }
}
