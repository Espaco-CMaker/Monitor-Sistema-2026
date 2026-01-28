const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => require('./package.json').version,
});
