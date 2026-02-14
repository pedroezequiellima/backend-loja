import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
  ) {}

  // Criar um novo produto
  async create(data: CreateProdutoDto) {
    const produto = this.repo.create(data);
    return await this.repo.save(produto);
  }

  // Listar todos os produtos da loja
  async findAll() {
    return await this.repo.find();
  }

  // Buscar um produto pelo ID
  async findOne(id: number) {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  // Atualizar dados de um produto (ex: mudar preço ou estoque)
  async update(id: number, data: Partial<CreateProdutoDto>) {
    const produto = await this.findOne(id);
    this.repo.merge(produto, data);
    return await this.repo.save(produto);
  }

  // Deletar produto
  async remove(id: number) {
    const produto = await this.findOne(id);
    return await this.repo.remove(produto);
  }
}