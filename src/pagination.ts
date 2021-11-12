import { Repository } from "typeorm";
export interface IPaginationResponse<T> {
  totalPages: number;
  count: number;
  items: T[];
}

export interface IPageOptions {
  page: number;
  offset?: number;
}
export async function pagination<R>(
  repository: Repository<R>,
  options: IPageOptions
): Promise<IPaginationResponse<R>> {
  const offset = options.offset ? options.offset : 10;

  const page = options.page ? Number(options.page) - 1 : 0;

  const skip = page === 0 ? 0 : page * offset;

  const result = await repository.findAndCount({
    take: offset,
    skip,
  });

  const totalPage: number = Math.ceil(result[1] / offset);

  const data: any = {
    items: result[0],
    totalPage,
    count: result[1],
  };
  return data;
}
