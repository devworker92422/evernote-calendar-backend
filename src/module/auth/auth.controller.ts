import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body
} from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { AuthService } from "./auth.service";

@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    async signUp(@Body() body: Prisma.UserCreateInput) {
        return await this.authService.signUp(body);
    }

}