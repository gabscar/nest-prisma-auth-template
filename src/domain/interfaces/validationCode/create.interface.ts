export interface IValidationCodeCreateParams {
  code: string;
  exp: Date;
  type: string;
  userId: string;
}
