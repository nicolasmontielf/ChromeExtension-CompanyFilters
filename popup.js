import { setItem, getItem } from './storage.js';

const updateButton = document.getElementById('update-list-button');
const list = document.getElementById('list');
const resetButton = document.getElementById('reset-list-button');

list.value = await getItem()

updateButton.addEventListener('click', async function() {
    await setItem(list.value ?? '')
})

resetButton.addEventListener('click', async function(e) {
    await setItem('')
    list.value = ''
})