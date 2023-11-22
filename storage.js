const ITEM_KEY = 'list';

export async function setItem(value) {
    const aux = value.split(',').reduce((previous, current) => {
        previous.push(current.toUpperCase().trim());
        return previous;
    }, []);
    await chrome.storage.local.set({ [ITEM_KEY]: aux });
}

export async function getItem() {
    const result = await chrome.storage.local.get(ITEM_KEY);
    return result[ITEM_KEY];
}