import { IPaginationInput } from './pagination.interface';
import { IWhereFilter } from './where.interface';

export interface IUseCaseOptions<Entity, FilterColumns, Relations> {
  filters?: IFilter<FilterColumns>;
  orders?: IOrder<keyof Entity>[];
  pagination?: IPaginationInput;
  relations?: IRelation<Relations>[];
  transaction?: unknown;
}

interface IFilter<Column = unknown> {
  where: IWhereFilter<Column>;
}

interface IOrder<KeyOfEntity = string, Order = 'DESC' | 'ASC' | 'RAND'> {
  column?: KeyOfEntity;
  order: Order;
}

type IRelation<Relation> = {
  [Key in keyof Relation]: {
    table: Key;
    columns: Relation[Key] extends Array<unknown>
      ? (keyof Relation[Key][number])[]
      : (keyof Relation[Key])[];
    relations?: IRelation<Relation[Key]>[];
  };
}[keyof Relation];
