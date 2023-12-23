import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCurrencyExchangeDto } from './dto/create-currency-exchange.dto';
import { UpdateCurrencyExchangeDto } from './dto/update-currency-exchange.dto';
import {
  CurrencyExchange,
  CurrencyExchangeDocument,
} from './models/currency.models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TCambio, TCambioDocument } from 'src/tcambio/models/tcambio.model';

@Injectable()
export class CurrencyExchangeService {
  private readonly logger = new Logger(CurrencyExchangeService.name);
  constructor(
    @InjectModel(CurrencyExchange.name)
    private readonly currencyModel: Model<CurrencyExchangeDocument>,
    @InjectModel(TCambio.name)
    private readonly tCambioModel: Model<TCambioDocument>,
  ) {}

  create(createCurrencyExchangeDto: CreateCurrencyExchangeDto) {
    return 'This action adds a new currencyExchange';
  }

  findAll() {
    return `This action returns all currencyExchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currencyExchange`;
  }

  update(id: number, updateCurrencyExchangeDto: UpdateCurrencyExchangeDto) {
    return `This action updates a #${id} currencyExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} currencyExchange`;
  }

  async changeCurrency(createCurrencyExchangeDto: CreateCurrencyExchangeDto) {
    this.logger.log(
      `Buscando la tasa de conversión de la moneda: ${createCurrencyExchangeDto.moneda_origen}`,
    );
    const today = new Date().toISOString().substring(0, 10);

    try {
      const tcambio = await this.tCambioModel.findOne({
        fecha_registro: new Date(today),
        moneda: createCurrencyExchangeDto.moneda_origen,
      });

      if (!tcambio)
        throw new HttpException(
          `TCAMBIO_UNEXIST_ON_DATE ${tcambio.fecha_registro}`,
          HttpStatus.NOT_FOUND,
        );
      this.logger.log(
        `Se encontró el tipo de cambio ${createCurrencyExchangeDto.moneda_origen}`,
      );

      const query = await this.currencyModel.create({
        ...createCurrencyExchangeDto,
        monto_cambiado: tcambio.tipo_cambio * createCurrencyExchangeDto.monto,
      });
      this.logger.log(`Se registró el cambio de divisa`);
      return {
        message: 'Cambio de divisas realizado con éxito',
        exchange: query,
      };
    } catch (err) {
      this.logger.error(`Sucedió un error al convertir el importe`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al convertir el importe',
      );
    }
  }
}
