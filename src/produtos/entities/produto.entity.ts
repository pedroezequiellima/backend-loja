import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos') // Define o nome da tabela no seu banco de dados
export class Produto {
  
  @PrimaryGeneratedColumn() // Cria um ID numérico que aumenta sozinho (Auto-incremento)
  id: number;

  @Column({ type: 'varchar', length: 150 }) // Nome do produto, limitado a 150 caracteres
  nome: string;

  @Column({ type: 'text', nullable: true }) // Descrição opcional (pode ser nula)
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Preço (ex: 99.90)
  preco: number;

  @Column({ type: 'int', default: 0 }) // Quantidade em estoque, começa em 0 por padrão
  estoque: number;

  @Column({ type: 'varchar', nullable: true }) // Link da imagem do produto
  imagemUrl: string;
}