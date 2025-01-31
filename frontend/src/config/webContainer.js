import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;
// webcontainerInstance = await WebContainer.boot();

export const getWebContainer = async () => {
    if(webcontainerInstance === null)
    {
        webcontainerInstance = await WebContainer.boot();
    }
    return webcontainerInstance;
}