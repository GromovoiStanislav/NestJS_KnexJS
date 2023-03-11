import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(//@InjectConnection() private readonly knex: Knex,
              @InjectConnection('dbIt_blogConnection')
              private knexConnection: Knex,) {}

  async findAll() {
    //const users = await this.knex.table('users');
    const users = await this.knexConnection.table('users2');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.knexConnection.table('users2').insert({
        name: createUserDto.name,
        age: createUserDto.age,
        json_col: createUserDto.json_col,
      }).returning(['id','name','age']);

      return  user[0];
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


}