export interface ApiExceptionBody {
  code: string;
  message: string;
  shortMessage: string;
  [index: string]: unknown;
}
