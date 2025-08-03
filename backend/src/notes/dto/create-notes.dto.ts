import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  text;

  @IsNotEmpty()
  @IsString()
  category;
}
