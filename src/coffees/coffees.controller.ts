import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  async findAll(@Res() response, @Query() paginationQuery: PaginationQueryDto) {
    const allCoffees: Coffee[] = await this.coffeesService.findAll(paginationQuery);
    return response.status(HttpStatus.OK).send(allCoffees);
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const coffee = await this.coffeesService.findOne(id);
    return response.status(HttpStatus.OK).send(coffee);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return await this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
