import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Verifica se o email já existe para não dar erro de banco duplicado
    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Este e-mail já está cadastrado');
    }

    // Criptografia: transforma a senha em um hash seguro
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // Usaremos este método para o Login no futuro
  async findByEmail(email: string): Promise<User | null> { // Mude undefined para null
  return this.usersRepository.findOne({ where: { email } });
}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
  
}