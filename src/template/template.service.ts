import { Injectable } from '@nestjs/common';
import { render } from 'mustache';
import * as fs from 'fs';
import * as path from 'path';
import * as swaggerParser from 'swagger-parser';
import * as mustache from 'mustache';
import { execSync } from 'child_process';

@Injectable()
export class TemplateService {
    renderTemplate(data: any): string {
        console.log(process.cwd());
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'controller.template.mustache');
        const template = fs.readFileSync(templatePath, 'utf-8');
        console.log("render", template, data);
        return render(template, data);
    }


    async renderNewTemplate() {
        const api = await swaggerParser.parse(path.resolve(process.cwd(), "src", "swagger.yaml"));
        console.log(api);
    }

    generateFile(templatePath: string, data: any, outputPath: string) {
        const template = fs.readFileSync(path.join(process.cwd(), "src", 'templates', templatePath), 'utf8');
        const output = mustache.render(template, data);
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, output, 'utf8');
    }

    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    camelCase(str: string): string {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
}