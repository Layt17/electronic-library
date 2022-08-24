import * as os from 'os';

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

export type PaginateDataType<T, D extends number = 2> = [D] extends [never]
  ? never
  : T extends Record<string, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Date
          ? `${K}`
          : T[K] extends Array<infer U>
          ? `${K}` | Join<K, PaginateDataType<U, Prev[D]>>
          : `${K}` | Join<K, PaginateDataType<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

export const PaginationDataProcceser = <T>(
  data: any,
  collection?: string,
): AltPaginated<T> => {
  const reactAdminPaginationData = new AltPaginated<T>();

  const host = os.hostname();

  reactAdminPaginationData.data = data.data ? data.data : data;
  reactAdminPaginationData.meta = data.meta
    ? {
        current_page: data.meta.currentPage,
        per_page: data.meta.itemsPerPage,
        last_page: null,
        total: data.meta.totalItems,
        path: `${host}/${collection}`,
        from: null,
      }
    : null;
  reactAdminPaginationData.total = data.meta ? data.meta.totalItems : null;

  return reactAdminPaginationData;
};

export class AltPaginated<T> {
  data: T;
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    total: number;
    path: string;
  };
  total?: number;
}
