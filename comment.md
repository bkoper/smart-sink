- main.js entry point to the application
- components/app.js route components
- store manages state of the application
- stateless function components
- inline style: <div className="row" style={{borderBottom: '1px solid #ccc'}}>

## building project

**build front side**
```bash
gulp build
```

**build server side**
```bash
gulp build --server
```

**webserver with hot module replacement reloading**
```bash
gulp webpack-dev-server
```

**start server**
```bash
npm start server
```
