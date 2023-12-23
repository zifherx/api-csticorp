import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CreateCurrencyExchangeDto } from './dto/create-currency-exchange.dto';
import { UpdateCurrencyExchangeDto } from './dto/update-currency-exchange.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Cambio de Divisas')
@Controller('currency-exchange')
@UsePipes(new ValidationPipe())
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Post()
  create(@Body() createCurrencyExchangeDto: CreateCurrencyExchangeDto) {
    return this.currencyExchangeService.create(createCurrencyExchangeDto);
  }

  @Get()
  findAll() {
    return this.currencyExchangeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('change')
  @ApiOperation({ summary: 'Se realiza el cambio de divisas' })
  changeCurrency(
    @Query() createCurrencyExchangeDto: CreateCurrencyExchangeDto,
  ) {
    return this.currencyExchangeService.changeCurrency(
      createCurrencyExchangeDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyExchangeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyExchangeDto: UpdateCurrencyExchangeDto,
  ) {
    return this.currencyExchangeService.update(+id, updateCurrencyExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyExchangeService.remove(+id);
  }
}
