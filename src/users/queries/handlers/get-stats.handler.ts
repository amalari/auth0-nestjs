import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { DateTime } from 'luxon';
import { GetStatsQuery } from '../impl';
import { User } from 'src/users/dto';

@QueryHandler(GetStatsQuery)
export class GetStatsHandler implements IQueryHandler<GetStatsQuery> {
  constructor(private httpService: HttpService) {}

  async execute(query: GetStatsQuery): Promise<any[]> {
    const { from, to } = query;
    const q = `type:s AND date:[${from} TO ${to}]`;
    return lastValueFrom(
      this.httpService
        .get(
          `${process.env.AUTH0_DOMAIN}${process.env.AUTH0_API_BASE_PATH}/logs`,
          {
            params: { q },
            headers: { Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}` },
          },
        )
        .pipe(
          map((res: AxiosResponse) => {
            const newResult: any = {};
            for (const log of res.data) {
              const date = DateTime.fromISO(log.date).toFormat('yyyy-MM-dd');
              if (!newResult[date]) {
                newResult[date] = {
                  id: date,
                  date,
                  logins: 1,
                  user_ids: [log.user_id],
                };
              } else {
                if (!newResult[date].user_ids.includes(log.user_id)) {
                  newResult[date].logins += 1;
                  newResult[date].user_ids.push(log.user_id);
                }
              }
            }
            return Object.values<any>(newResult);
          }),
        ),
    );
  }
}
