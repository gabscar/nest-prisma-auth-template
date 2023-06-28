import { IUseCaseOptions } from '@domain/interfaces/common/useCaseOptions.interface';

export class OrmAdapterUtils {
  static validate<E, F, R>(useCaseOptions: IUseCaseOptions<E, F, R>) {
    this.validatePagination(useCaseOptions?.pagination);
  }

  private static validatePagination<E, F, R>(
    pagination: IUseCaseOptions<E, F, R>['pagination'],
  ) {
    if (!pagination) return;

    if (pagination.page < 1 || pagination.take < 1) {
      throw new Error(
        `Invalid pagination. Expect "page" and "take" to be greater than 0 but got "${JSON.stringify(
          pagination,
          null,
          2,
        )}".`,
      );
    }
  }
}
