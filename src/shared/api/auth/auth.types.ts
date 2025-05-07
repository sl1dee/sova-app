export interface IPerson {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  website: string;
  gender: string;
  image: string;
  birthday: string;
}

export interface IPersonResponse {
  code: number;
  status: string;
  data: IPerson[];
}