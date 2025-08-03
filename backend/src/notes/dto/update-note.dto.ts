import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotesDto {
  @IsNumber()
  @IsNotEmpty()
  id;

  @IsString()
  text;

  @IsString()
  category;
}
