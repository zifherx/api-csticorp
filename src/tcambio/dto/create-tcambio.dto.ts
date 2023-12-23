import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTcambioDto {
  @ApiProperty()
  @IsNotEmpty()
  fecha_registro: Date;

  @ApiProperty()
  @IsNotEmpty()
  moneda: string;

  @ApiProperty()
  @IsNotEmpty()
  tipo_cambio: number;
}
