import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TCambioDocument = TCambio & Document;

@Schema({ timestamps: true, versionKey: false })
export class TCambio {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  fecha_registro: Date;

  @Prop({ required: true })
  moneda: string;

  @Prop({ required: true })
  tipo_cambio: number;
}

export const TCambioSchema = SchemaFactory.createForClass(TCambio);
