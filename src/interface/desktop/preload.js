window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})

contextBridge.exposeInMainWorld('storeValueAPI', {
    handleFileOpen: (key) => ipcRenderer.invoke('handleFileOpen', key)
})

contextBridge.exposeInMainWorld('getFilesAPI', {
    getFiles: () => ipcRenderer.invoke('getFiles')
})

contextBridge.exposeInMainWorld('getFoldersAPI', {
    getFolders: () => ipcRenderer.invoke('getFolders')
})

contextBridge.exposeInMainWorld('updateStateAPI', {
    onUpdateState: (callback) => ipcRenderer.on('update-state', callback)
})

contextBridge.exposeInMainWorld('removeFileAPI', {
    removeFile: (filePath) => ipcRenderer.invoke('removeFile', filePath)
})

contextBridge.exposeInMainWorld('removeFolderAPI', {
    removeFolder: (folderPath) => ipcRenderer.invoke('removeFolder', folderPath)
})

contextBridge.exposeInMainWorld('hostURLAPI', {
    setURL: (url) => ipcRenderer.invoke('setURL', url),
    getURL: () => ipcRenderer.invoke('getURL')
})

contextBridge.exposeInMainWorld('syncDataAPI', {
    syncData: (regenerate) => ipcRenderer.invoke('syncData', regenerate)
})
