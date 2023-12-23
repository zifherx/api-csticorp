import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compareHash } from './utils/handleBcryptjs';
import { User, UserDocument } from 'src/users/models/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userLoginBody: LoginAuthDto) {
    this.logger.log('Validando Usuario');

    const userExist = await this.userModel.findOne({
      username: userLoginBody.username,
    });
    if (!userExist) {
      this.logger.warn(`Login fallido del usuario: ${userLoginBody.username}`);
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const isChecked = await compareHash(
      userLoginBody.password,
      userExist.password,
    );
    if (!isChecked) {
      this.logger.warn(`Login fallido del usuario: ${userLoginBody.username}`);
      throw new HttpException('WRONG_PASSWORD', HttpStatus.FORBIDDEN);
    }

    this.logger.log(`Login existoso del usuario: ${userLoginBody.username}`);
    return {
      success: true,
      user: userExist,
    };
  }

  generateToken(user: UserDocument) {
    const payload = {
      userId: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    return {
      user: payload,
      token: this.jwtService.sign(payload),
    };
  }
}
