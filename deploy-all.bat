@echo off 
echo Deploying Codebase TL-DR... 

> codebase-tldr@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  61.61 kB  build\static\js\main.77b311dc.js
  3.08 kB   build\static\css\main.6ba0efcb.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment

echo ? Deployment complete! 
