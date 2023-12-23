import { Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CurrencyExchange,
  CurrencyExchangeSchema,
} from './models/currency.models';
import { TCambio, TCambioSchema } from 'src/tcambio/models/tcambio.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CurrencyExchange.name, schema: CurrencyExchangeSchema },
      { name: TCambio.name, schema: TCambioSchema },
    ]),
  ],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
