import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KnexModule } from "nest-knexjs";
import { UsersModule } from "./users/users.module";


@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: "pg",
          connection: {
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "root",
            database: "It_blog"
          },
          pool: {
            min: 2,
            max: 10
          }
        }
      })
    },
      'dbIt_blogConnection'// for Multi Connection
    ),

    UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
