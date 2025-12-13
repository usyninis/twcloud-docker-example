import { type PackageSettings } from 'arui-scripts';

const aruiScriptsConfig: PackageSettings = {
    serverEntry: './src/server.ts',
    clientEntry: './src/client.ts',
    clientServerPort: 9090,
    serverPort: 4000,
    keepCssVars: true,
    debug: true,
};

export default aruiScriptsConfig;
