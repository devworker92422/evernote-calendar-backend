import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from './module/schedule/schedule.module';
import { NoteModule } from './module/note/note.module';
import { TodoListModule } from './module/todolist/todolist.module';
import { AuthModule } from './module/auth/auth.module';
import { LibraryModule } from './module/library/library.module';
import { WorkSpaceModule } from './module/workspace/workspace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule,
    NoteModule,
    TodoListModule,
    AuthModule,
    WorkSpaceModule,
    LibraryModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "upload")
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
