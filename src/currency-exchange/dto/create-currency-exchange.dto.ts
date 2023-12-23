import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCurrencyExchangeDto {
  @ApiProperty()
  @IsNotEmpty()
  monto: number;

  @ApiProperty()
  @IsNotEmpty()
  moneda_origen: string;

  @ApiProperty()
  @IsNotEmpty()
  moneda_destino: string;

  @ApiProperty()
  tipo_cambio: number;

  @ApiProperty()
  monto_cambiado: number;
}
