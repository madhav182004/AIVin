import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;
// webcontainerInstance = await WebContainer.boot();

export const getWebContainer = () => {
    if(webcontainerInstance === null)
    {
        webcontainerInstance = new WebContainer();
    }
    return webcontainerInstance;
}