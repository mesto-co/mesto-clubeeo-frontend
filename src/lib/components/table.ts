export const defaultPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 1000,
}

export interface IPagination {
  page: number,
  rowsPerPage: number,
  rowsNumber: number,
  sortBy?: string,
  descending?: boolean
}

