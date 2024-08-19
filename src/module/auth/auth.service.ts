import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bycrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { AUTH_400_ERROR, AUTH_401_ERROR } from "src/const/message";
import { SignInDTO } from "src/dto";

@Injectable()

export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async signUp(data: Prisma.UserCreateInput): Promise<User> {
        const old = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });
        data.password = await bycrypt.hash(data.password, 10);
        if (old)
            throw new BadRequestException(AUTH_400_ERROR);
        else
            return this.prisma.user.create({ data });
    }

    async signInWithEmail(data: SignInDTO): Promise<{ token: string, user: User }> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (!user)
            throw new UnauthorizedException(AUTH_401_ERROR);
        const isPwdMatched = await bycrypt.compare(data.password, user.password)
        if (!isPwdMatched)
            throw new UnauthorizedException(AUTH_401_ERROR);
        const token = this.jwt.sign({ id: user.id });
        return {
            token,
            user
        }
    }
}