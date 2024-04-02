import {
    Length,
    IsString,
  } from 'class-validator';
  
  export class GetUsersQuery {
    @IsString()
    @Length(1, 100)
    surname: string;
  }