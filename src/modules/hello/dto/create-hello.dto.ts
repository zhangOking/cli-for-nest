import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly id: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
