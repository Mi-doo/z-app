import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeSloteModule } from './modules/time-slote/time-slote.module';

@Module({
  imports: [TimeSloteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
