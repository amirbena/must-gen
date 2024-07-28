async function createDocument(app: INestApplication) {
    /* const parser = new SwaggerParser(); */
    const api = //await parser.parse('path/to/your/swagger.json');
    
    const paths = api.paths;
    const tagsToFilter = ['tag1', 'tag2'];
  
    const filteredPaths = Object.keys(paths).reduce((acc, path) => {
      const methods = Object.keys(paths[path]);
      methods.forEach(method => {
        if (paths[path][method].tags.some(tag => tagsToFilter.includes(tag))) {
          acc[path] = acc[path] || {};
          acc[path][method] = paths[path][method];
        }
      });
      return acc;
    }, {});
  
    const filteredApi = {
      ...api,
      paths: filteredPaths,
    };
  
    return filteredApi;
  }