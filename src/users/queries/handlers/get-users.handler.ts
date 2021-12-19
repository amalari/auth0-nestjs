import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { GetUsersQuery } from '../impl';
import { User } from 'src/users/dto';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private httpService: HttpService) {}

  async execute(query: GetUsersQuery): Promise<AxiosResponse<any>> {
    return lastValueFrom(
      this.httpService
        .get(
          `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/users`,
          {
            headers: { Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}` },
          },
        )
        .pipe(
          map((res: AxiosResponse) => {
            const data = res.data;
            return data.map((user) => ({ ...user, id: user.user_id }));
          }),
        ),
    );
  }
}
