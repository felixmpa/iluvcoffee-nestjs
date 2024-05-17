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
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Res() response, @Query() paginationQuery) {
    //const { limit, offset } = paginationQuery;
    //const msg: string = `this action return all coffees. Limit: ${limit} and Offset: ${offset}`;
    const allCoffees: Coffee[] = this.coffeesService.findAll();
    return response.status(HttpStatus.OK).send(allCoffees);
  }

  @Get(':id')
  findOne(@Res() response, @Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id);
    return response.status(HttpStatus.OK).send(coffee);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
