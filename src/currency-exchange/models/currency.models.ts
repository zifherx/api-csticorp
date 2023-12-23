import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CurrencyExchangeDocument = CurrencyExchange & Document;

@Schema({ timestamps: true, versionKey: false })
export class CurrencyExchange {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  monto: number;

  @Prop()
  moneda_origen: string;

  @Prop()
  moneda_destino: string;

  @Prop()
  tipo_cambio: number;

  @Prop()
  monto_cambiado: number;

  @Prop({ default: new Date() })
  fecha_cambio: Date;
}

export const CurrencyExchangeSchema =
  SchemaFactory.createForClass(CurrencyExchange);
