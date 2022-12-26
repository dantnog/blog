import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  desc: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  text: string
}