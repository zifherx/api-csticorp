import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TcambioModule } from './tcambio/tcambio.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI_LOCAL),
    AuthModule,
    UsersModule,
    TcambioModule,
    CurrencyExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
