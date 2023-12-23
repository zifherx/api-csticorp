import { PartialType } from '@nestjs/mapped-types';
import { CreateTcambioDto } from './create-tcambio.dto';

export class UpdateTcambioDto extends PartialType(CreateTcambioDto) {}
