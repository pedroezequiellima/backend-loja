import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module'; // Importa o módulo de produtos
import { Produto } from './entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root', 
      database: 'loja_db',
      entities: [Produto],
      synchronize: true,
    }),
    ProdutosModule, // <--- IMPORTANTE ESSA BOMBA AQUI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


