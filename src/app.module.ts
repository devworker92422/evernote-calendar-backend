import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './module/schedule/schedule.module';
import { NoteModule } from './module/note/note.module';
import { TodoListModule } from './module/todolist/todolist.module';
import { AuthModule } from './module/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule,
    NoteModule,
    TodoListModule,
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
