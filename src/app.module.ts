import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerateController } from './generate/generate.controller';
import { TemplateService } from './template/template.service';

@Module({
  controllers: [AppController, GenerateController],
  providers: [AppService, TemplateService],
})
export class AppModule {}
