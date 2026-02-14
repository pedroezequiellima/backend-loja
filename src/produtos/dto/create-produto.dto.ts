import { IsString, IsNumber, IsOptional, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @IsString({ message: 'A descrição deve ser um texto' })
  @IsOptional()
  descricao?: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0, { message: 'O preço não pode ser negativo' })
  preco: number;

  @IsNumber({}, { message: 'O estoque deve ser um número inteiro' })
  @IsOptional()
  estoque?: number;

  @IsString()
  @IsOptional()
  imagem_url?: string;
  
}