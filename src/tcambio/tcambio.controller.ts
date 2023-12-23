import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TcambioService } from './tcambio.service';
import { CreateTcambioDto } from './dto/create-tcambio.dto';
import { UpdateTcambioDto } from './dto/update-tcambio.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tipo Cambio')
@Controller('tcambio')
@UsePipes(new ValidationPipe())
export class TcambioController {
  constructor(private readonly tcambioService: TcambioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear nuevo de tipo de cambio' })
  create(@Body() createTcambioDto: CreateTcambioDto) {
    return this.tcambioService.create(createTcambioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener los tipos de cambio' })
  findAll() {
    return this.tcambioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener el tipo de cambio por id' })
  findOne(@Param('id') id: string) {
    return this.tcambioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar el tipo de cambio por id' })
  update(@Param('id') id: string, @Body() updateTcambioDto: UpdateTcambioDto) {
    return this.tcambioService.update(id, updateTcambioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar el tipo de cambio por id' })
  remove(@Param('id') id: string) {
    return this.tcambioService.remove(id);
  }
}
