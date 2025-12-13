import { type PackageSettings } from 'arui-scripts';

const aruiScriptsConfig: PackageSettings = {
    serverEntry: './src/server.ts',
    clientEntry: './src/client.ts',
    clientServerPort: 8080,
    serverPort: 3000,
    keepCssVars: true,
    debug: true,
};

export default aruiScriptsConfig;
