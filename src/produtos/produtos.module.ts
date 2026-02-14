import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Produto } from './entities/produto.entity'; // Importando do lugar novo

@Module({
  imports: [
    // Isso aqui é o mais importante: avisa ao módulo que ele pode usar a tabela 'Produto'
    TypeOrmModule.forFeature([Produto]) 
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService], // Útil caso outros módulos precisem usar produtos no futuro
})
export class ProdutosModule {}

 