import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Importando seu serviço de usuários
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Injetando o UsersService
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Busca o usuário no banco pelo email
    const user = await this.usersService.findByEmail(email);

    // 2. Se o usuário não existir, lança erro
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // 3. Compara a senha digitada com a senha criptografada do banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // 4. Se tudo estiver ok, gera o Token JWT
    const payload = { sub: user.id, email: user.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}