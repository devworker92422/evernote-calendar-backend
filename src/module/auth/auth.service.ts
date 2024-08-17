import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bycrypt from 'bcryptjs';
import { PrismaService } from "../prisma/prisma.service";

export class AuthService {

    constructor(
        private prisma: PrismaService
    ) { }

    signUp(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    // signInWithEmail(): Promise<void> {

    // }

    // changePassword(): Promise<void> {

    // }

    // updateProfile(): Promise<void> {

    // }

}