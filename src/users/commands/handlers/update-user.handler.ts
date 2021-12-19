import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, catchError } from 'rxjs';
import { UpdateUserCommand } from '../impl';
import { User } from 'src/users/dto';
import { HttpException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private httpService: HttpService) {}

  async execute(command: UpdateUserCommand): Promise<AxiosResponse<any>> {
    const { userId, name } = command;
    console.log(
      `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/users/${userId}`,
    );
    return lastValueFrom(
      this.httpService
        .patch(
          `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/users/${userId}`,
          { name },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
            },
          },
        )
        .pipe(
          catchError((e) => {
            console.log(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
          map((res: AxiosResponse<any>) => {
            return { ...res.data, id: res.data.user_id };
          }),
        ),
    );
  }
}
