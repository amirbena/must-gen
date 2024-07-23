import { Controller, Get } from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('generate')
export class GenerateController {
    constructor(private readonly templateService: TemplateService) { }

    @Get('/')
    async generateFile(): Promise<string> {
        const data = {
            controllerName: 'example',
            className: 'ExampleController',
            message: 'Hello from ExampleController!',
        };

        const content = await this.templateService.renderNewTemplate();

        return 'File generated successfully!';
    }
}
