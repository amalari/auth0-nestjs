import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { GetStatsQuery } from '../impl';
import { User } from 'src/users/dto';

@QueryHandler(GetStatsQuery)
export class GetStatsHandler implements IQueryHandler<GetStatsQuery> {
  constructor(private httpService: HttpService) {}

  async execute(query: GetStatsQuery): Promise<AxiosResponse<any>> {
    const { from, to } = query;
    console.log({ from, to });
    return lastValueFrom(
      this.httpService
        .get(
          `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/stats/daily`,
          {
            params: { from, to },
            headers: { Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}` },
          },
        )
        .pipe(
          map((res: AxiosResponse) => {
            const data = res.data;
            return data.map((stat) => ({
              ...stat,
              id: stat.date,
              date: stat.updated_at,
            }));
          }),
        ),
    );
  }
}
