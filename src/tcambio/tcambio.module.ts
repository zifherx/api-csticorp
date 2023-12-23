import { Module } from '@nestjs/common';
import { TcambioService } from './tcambio.service';
import { TcambioController } from './tcambio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TCambio, TCambioSchema } from './models/tcambio.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TCambio.name, schema: TCambioSchema }]),
  ],
  controllers: [TcambioController],
  providers: [TcambioService],
})
export class TcambioModule {}
