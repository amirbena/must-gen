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
        console.log(api.paths);
        console.log(api.paths["/user/{id}"].delete);
        
      /*   const paths = api.paths;

        console.log(api.tags);
        const controllers = {};

        for (const [routePath, methods] of Object.entries(paths)) {
            for (const [method, details] of Object.entries(methods)) {
                //@ts-ignore
                const operationId = details.operationId;
                if (operationId) {
                    const controllerName = `${operationId.charAt(0).toUpperCase() + operationId.slice(1)}Controller`;
                    const route = {
                        method: method.toUpperCase(),
                        path: routePath,
                        handlerName: operationId,
                        pathParams: (details as any).parameters?.filter(param => param.in === 'path') || [],
                        queryParams: (details as any).parameters?.filter(param => param.in === 'query') || [],
                        bodyParam: (details as any).parameters?.find(param => param.in === 'body')?.name,
                        bodyType: (details as any).parameters?.find(param => param.in === 'body')?.schema?.$ref.split('/').pop()
                    };

                    if (!controllers[controllerName]) {
                        controllers[controllerName] = {
                            controllerName,
                            routes: []
                        };
                    }
                    controllers[controllerName].routes.push(route);
                }
            }
        }

        console.log(controllers); */

       /*  const controllerTemplate = fs.readFileSync(path.join(__dirname, 'controller.mustache'), 'utf8');
        for (const [controllerName, controllerData] of Object.entries(controllers)) {
          const renderedController = mustache.render(controllerTemplate, {
            //@ts-ignore
            ...controllerData,
            importedMethods: ['UseGuards', 'UseInterceptors'],
            isBodyUsed: controllerData.routes.some(route => route.bodyParam),
            isParamsUsed: controllerData.routes.some(route => route.pathParams.length > 0),
            isQueriesUsed: controllerData.routes.some(route => route.queryParams.length > 0),
            guards: [], // Add guards if necessary
            interceptors: [] // Add interceptors if necessary
          });
          fs.writeFileSync(path.join(__dirname, `${controllerName}.ts`), renderedController);
        } */

        
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