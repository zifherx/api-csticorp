import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/users.model';
import { generateHash } from 'src/auth/utils/handleBcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creando usuario`);
    try {
      const { password, ...usuario } = createUserDto;
      const userHashed = { ...usuario, password: await generateHash(password) };
      const query = await this.userModel.create(userHashed);
      if (query) {
        this.logger.log(`Se creó el usuario`);
        return { message: 'Usuario creado con éxito', created: query };
      }
    } catch (err) {
      this.logger.error(`Sucedió un error al crear el usuario`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al crear el usuario',
      );
    }
  }

  async findAll() {
    this.logger.log(`Buscando a todos los usuarios`);
    try {
      const query = await this.userModel.find();
      if (query.length == 0)
        throw new HttpException('USERS_EMPTY', HttpStatus.NOT_FOUND);
      this.logger.log(`Obteniendo todos los usuarios`);
      return { total: query.length, all: query };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar usuarios`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al buscar usuarios',
      );
    }
  }

  async findOne(id: string) {
    this.logger.log(`Buscando usuario por el id: ${id}`);
    try {
      const query = await this.userModel.findOne({ id });
      if (!query)
        throw new HttpException(`USER_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`Se encontró el usuario ${id}`);
      return { one: query };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar el usuario ${id}`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al buscar el usuario',
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Actualizando el usuario por el id: ${id}`);
    try {
      const query = await this.userModel.findOneAndUpdate(
        { id },
        updateUserDto,
      );
      if (!query)
        throw new HttpException(`USER_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`El usuario ${id} se actualizó`);
      return {
        message: `El usuario ${id} actualizado con éxito`,
        updated: query,
      };
    } catch (err) {
      this.logger.error(`Sucedió un error al buscar el usuario ${id}`);
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al buscar el usuario',
      );
    }
  }

  async remove(id: string) {
    this.logger.log(`Eliminando el usuario por el id: ${id}`);
    try {
      const query = await this.userModel.findOneAndDelete({ id });
      if (!query)
        throw new HttpException(`USER_UNEXIST ${id}`, HttpStatus.NOT_FOUND);
      this.logger.log(`El usuario ${id} se eliminó`);
      return {
        message: `El usuario ${id} eliminado con éxito`,
        deleted: query,
      };
    } catch (err) {
      this.logger.error(`Sucedió un error al eliminar el usuario ${id}`, {
        err,
      });
      throw new InternalServerErrorException(
        'Sucedió un error al eliminar el tipo de cambio',
      );
    }
  }

  async findUserByUsername(username: string) {
    let user: User;

    try {
      user = await this.userModel.findOne({ username });
      if (user) {
        this.logger.log(`El usuario ${username} se encuentra registrado`);
        return {
          message: 'El usuario ya exuste',
          user,
        };
      }
    } catch (err) {
      this.logger.error(
        `Sucedió un error al realizar la búsqueda del usuario ${username}`,
        { err },
      );
      throw new InternalServerErrorException('Sucedió un error');
    }
  }

  async getUserById(userId: string) {
    this.logger.log(`Buscando usuario con id ${userId}`);
    try {
      const query = await this.userModel.findById({ _id: userId });
      if (!query)
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      return { one: query };
    } catch (err) {
      this.logger.error(
        `Sucedió un error al buscar el usuario con id ${userId}`,
      );
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Sucedió un error al buscar el usuario',
      );
    }
  }
}
