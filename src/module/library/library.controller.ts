import {
    Controller,
    Post,
    Get,
    UploadedFile,
    StreamableFile,
    UseGuards,
    UseInterceptors,
    BadRequestException,
    Query,
    Req
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { LibraryService } from "./library.service";

@Controller('library')
@UseGuards(AuthGuard('jwt'))

export class LibraryController {
    constructor(
        private libraryService: LibraryService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload/library',
            filename: (req, file, cb) => {
                return cb(null, `${Date.now()}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (!file)
            throw new BadRequestException("No File");
        let library: Prisma.LibraryCreateInput = {
            owner: { connect: { id: req.user.id } },
            fileName: file.filename,
            type: 'DOC',
            originName: file.originalname,
            mimeType: file.mimetype
        };
        if (file.mimetype.startsWith('image') || file.mimetype.startsWith('audio'))
            library.type = 'MEDIA';
        if (file.mimetype.startsWith('text') || file.mimetype.startsWith('application/pdf'))
            library.type = 'DOC';
        return await this.libraryService.create(library);
    }

    @Get()
    async findAll(@Req() req: any) {
        return await this.libraryService.findAll(req.user.id);
    }

    @Get('download')
    async downloadFile(@Query('fileName') fileName: string) {
        const file = await this.libraryService.findOne(fileName);
        const stream = createReadStream(join(process.cwd() + "/upload/library/", fileName));
        return new StreamableFile(stream, {
            type: file.mimeType,
            disposition: `attachment; filename="${file.originName}"`,
        });
    }

}