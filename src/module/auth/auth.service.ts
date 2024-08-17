import { Injectable, BadRequestException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bycrypt from 'bcryptjs';
import { PrismaService } from "../prisma/prisma.service";
import { AUTH_400_ERROR } from "src/const/message";

@Injectable()

export class AuthService {

    constructor(
        private prisma: PrismaService
    ) { }

    async signUp(data: Prisma.UserCreateInput): Promise<User> {
        const old = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
        if (old)
            throw new BadRequestException(AUTH_400_ERROR);
        else
            return this.prisma.user.create({
                data
            });
    }

    // signInWithEmail(): Promise<void> {

    // }

    // changePassword(): Promise<void> {

    // }

    // updateProfile(): Promise<void> {

    // }

}