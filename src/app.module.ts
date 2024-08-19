import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './module/schedule/schedule.module';
import { NoteModule } from './module/note/note.module';
import { TodoListModule } from './module/todolist/todolist.module';
import { AuthModule } from './module/auth/auth.module';
import { WorkSpaceModule } from './module/workspace/workspace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule,
    NoteModule,
    TodoListModule,
    AuthModule,
    WorkSpaceModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
