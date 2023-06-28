export interface IBaseUseCase<I extends Array<any>, O> {
  execute(...args: I): Promise<O>;
}
