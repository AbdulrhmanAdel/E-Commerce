import { IProduct } from './product';

interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}
