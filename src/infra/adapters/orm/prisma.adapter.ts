import { IUseCaseOptions } from '@domain/interfaces/common/useCaseOptions.interface';
import { OrmAdapterUtils } from '@infra/utils/ormAdapter.utils';
import { Prisma } from '@prisma/client';

export class PrismaAdapter<Entity, FilterColumns, Relations> {
  queryParams: {
    where?: Record<string, unknown>;
    include?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
    skip?: number;
    take?: number;
  } = {};
  paginationCountParams: {
    where?: Record<string, unknown>;
  } = {};

  constructor(
    private readonly useCaseOptions: IUseCaseOptions<
      Entity,
      FilterColumns,
      Relations
    >,
  ) {
    this.exec(this.useCaseOptions);
  }

  private exec(
    useCaseOptions: IUseCaseOptions<Entity, FilterColumns, Relations>,
  ) {
    OrmAdapterUtils.validate(useCaseOptions);

    this.handleFilters(useCaseOptions.filters);
    this.handleRelations(useCaseOptions.relations);
    this.handleOrders(useCaseOptions.orders);
    this.handlePagination(useCaseOptions.pagination);
  }

  private handleFilters(
    filters: IUseCaseOptions<Entity, FilterColumns, Relations>['filters'],
  ) {
    if (!filters?.where) return;

    this.queryParams.where = this.handleWhereOperations(filters.where);
  }

  private handleWhereOperations({
    AND,
    OR,
    NOT,
    CONTAINS,
  }: IUseCaseOptions<Entity, FilterColumns, Relations>['filters']['where']) {
    const queryWhere: Record<string, unknown> = {};

    if (AND?.length > 0) {
      AND.forEach((filter) => {
        queryWhere[filter.column as string] = filter.value;
      });
    }

    if (OR?.length > 1) {
      const filteredOR = OR.filter((filter) => filter.value !== undefined);

      if (filteredOR.length > 1) {
        queryWhere['OR'] = filteredOR.map((filter) => {
          return { [filter.column as string]: filter.value };
        });
      }
    }

    if (NOT?.length > 0) {
      NOT.forEach((filter) => {
        queryWhere['NOT'] = { [filter.column as string]: filter.value };
      });
    }

    if (CONTAINS?.length > 0) {
      CONTAINS.forEach((filter) => {
        queryWhere[filter.column as string] = {
          contains: filter.value,
        };
      });
    }

    return queryWhere;
  }

  private handleRelations(
    relations: IUseCaseOptions<Entity, FilterColumns, Relations>['relations'],
  ) {
    if (relations?.length > 0 === false) return;

    this.queryParams.include = relations.reduce((acc, relation) => {
      const { table, columns } = relation;

      if (columns?.length > 0) {
        return { ...acc, [table]: this.handleRelationSelect(columns) };
      } else {
        return { ...acc, [table]: true };
      }
    }, {});
  }

  private handleRelationSelect(columns: (string | number | symbol)[]) {
    return {
      select: columns.reduce((acc, column) => ({ ...acc, [column]: true }), {}),
    };
  }

  private handleOrders(
    orders: IUseCaseOptions<Entity, FilterColumns, Relations>['orders'],
  ) {
    if (orders?.length > 0 === false) return;

    this.queryParams.orderBy = orders.reduce((acc, orderObj) => {
      let order: Prisma.SortOrder = Prisma.SortOrder.asc;

      if (orderObj.order === 'DESC') {
        order = Prisma.SortOrder.desc;
      }

      return { ...acc, [orderObj.column]: order };
    }, {});
  }

  private handlePagination(
    pagination: IUseCaseOptions<Entity, FilterColumns, Relations>['pagination'],
  ) {
    if (pagination?.page && pagination?.take) {
      this.queryParams.skip = (pagination.page - 1) * pagination.take;
    }
    if (pagination?.take) {
      this.queryParams.take = pagination.take;
    }

    this.paginationCountParams = { where: this.queryParams.where };
  }
}
