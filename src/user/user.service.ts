import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateUserDto } from './dto/update-use.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async updateUser(userId: number, dto: updateUserDto): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto }
    });

    delete user.hashedPassword;
    return user;
   };
}
