import { Module } from '@nestjs/common';
import { ScheduleModule } from './module/schedule/schedule.module';
import { NoteModule } from './module/note/note.module';
import { TodoListModule } from './module/todolist/todolist.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule,
    NoteModule,
    TodoListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
