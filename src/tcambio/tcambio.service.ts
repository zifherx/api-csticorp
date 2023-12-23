import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTcambioDto } from './dto/create-tcambio.dto';
import { UpdateTcambioDto } from './dto/update-tcambio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TCambio, TCambioDocument } from './models/tcambio.model';
import { Model } from 'mongoose';

@Injectable()
export class TcambioService {
  private readonly logger = new Logger(TcambioService.name);

  constructor(
    @InjectModel(TCambio.name)
    private readonly tCambioModel: Model<TCambioDocument>,
  ) {}

  async create(createTcambioDto: CreateTcambioDto) {
    this.logger.log(
      `Creando Tipo de Cambio del día ${createTcambioDto.fecha_registro}`,
    );
    try {
      const query = await this.tCambioModel.create(createTcambioDto);
      if (query) {
        this.logger.log(`Se creó el tipo de cambio`);
        return { message: 'Tipo de Cambio creado con éxito', created: query };
      }
    } catch (err) {
      this.logger.error(`Sucedió un error al crear tipo de cambio`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al crear tipo de cambio',
      );
    }
  }

  async findAll() {
    this.logger.log(`Buscando a todos los tipos de cambio`);
    try {
      const query = await this.tCambioModel.find();
      if (query.length == 0) return { message: 'No existen tipos de cambio' };
      // throw new HttpException('TCAMBIO_EMPTY', HttpStatus.NOT_FOUND);
      this.logger.log(`Obteniendo todos los tipos de cambio`);
      return { total: query.length, all: query };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar tipos de cambio`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al obtener tipos de cambio',
      );
    }
  }

  async findOne(id: string) {
    this.logger.log(`Buscando tipo de cambio por el id: ${id}`);
    try {
      const query = await this.tCambioModel.findOne({ id });
      if (!query)
        throw new HttpException(`TCAMBIO_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`Se encontró el tipo de cambio ${id}`);
      return { one: query };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar el tipo de cambio ${id}`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al buscar el tipo de cambio',
      );
    }
  }

  async update(id: string, updateTcambioDto: UpdateTcambioDto) {
    this.logger.log(`Actualizando el tipo de cambio por el id: ${id}`);
    try {
      const query = await this.tCambioModel.findOneAndUpdate(
        { id },
        updateTcambioDto,
      );
      if (!query)
        throw new HttpException(`TCAMBIO_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`El tipo de cambio ${id} se actualizó`);
      return {
        message: `El tipo de cambio ${id} actualizado con éxito`,
        updated: query,
      };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar el tipo de cambio ${id}`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al actualizar el tipo de cambio',
      );
    }
  }

  async remove(id: string) {
    this.logger.log(`Eliminando el tipo de cambio por el id: ${id}`);
    try {
      const query = await this.tCambioModel.findOneAndDelete({ id });
      if (!query)
        throw new HttpException(`TCAMBIO_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`El tipo de cambio ${id} se eliminó`);
      return {
        message: `El tipo de cambio ${id} eliminado con éxito`,
        deleted: query,
      };
    } catch (err) {
      this.logger.error(
        `Sucedió un error al eliminar el tipó de cambio ${id}`,
        { err },
      );
      throw new InternalServerErrorException(
        'Sucedió un error al eliminar el tipo de cambio',
      );
    }
  }
}
