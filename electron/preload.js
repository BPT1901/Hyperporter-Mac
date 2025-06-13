const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script loading...');

// Test if contextBridge is available
if (typeof contextBridge !== 'undefined') {
  console.log('ContextBridge is available');
  
  contextBridge.exposeInMainWorld('electron', {
    dialog: {
      selectDirectory: async () => {
        console.log('selectDirectory called from renderer');
        try {
          const result = await ipcRenderer.invoke('select-directory');
          console.log('selectDirectory result:', result);
          return result;
        } catch (error) {
          console.error('Error in selectDirectory:', error);
          throw error;
        }
      }
    },
    ipcRenderer: {
      send: (channel, data) => {
        const validChannels = [
          'connect-to-hyperdeck',
          'disconnect-hyperdeck',
          'start-monitoring',
          'stop-monitoring',
          'get-clip-list',
          'path-join'
        ];
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
        }
      },
      on: (channel, func) => {
        const validChannels = [
          'connect-to-hyperdeck-response',
          'disconnect-hyperdeck-response',
          'start-monitoring-response',
          'stop-monitoring-response',
          'get-clip-list-response',
          'hyperdeck-slot-status',
          'hyperdeck-error',
          'path-join-response',
          'directory-selected'
        ];
        if (validChannels.includes(channel)) {
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      },
      invoke: (channel, ...args) => {
        const validChannels = ['select-directory'];
        if (validChannels.includes(channel)) {
          return ipcRenderer.invoke(channel, ...args);
        }
      }
    }
  });
  
  console.log('ContextBridge setup complete');
} else {
  console.error('ContextBridge not available');
  
  // Fallback for development or if contextBridge fails
  window.electron = {
    dialog: {
      selectDirectory: async () => {
        return await ipcRenderer.invoke('select-directory');
      }
    }
  };
}