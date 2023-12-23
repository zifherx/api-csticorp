import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';

@ApiTags('Authorization')
@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  @ApiOperation({ summary: 'Login del usuario' })
  async handleLogin(@Body() loginBody: LoginAuthDto) {
    this.logger.log({ message: 'Logueando usuario' });
    const userLogged = await this.authService.validateUser(loginBody);
    return this.authService.generateToken(userLogged.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario Administrador' })
  async registerMasterUser(@Body() registerAuthDto: RegisterAuthDto) {
    this.logger.log({ message: 'Creando Masteruser' });
    return this.userService.create(registerAuthDto);
  }
}
