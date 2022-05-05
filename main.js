const btnUrlSave = document.querySelector('#btn-save-url')
const btnTabSave = document.querySelector('#btn-save-tab')
const btnDeleteAll = document.querySelector('#btn-delete-all')
const inputUrl = document.querySelector('#input-url')
const listUrl = document.querySelector('#list')

const nameStorage = 'urls'

function show() {
    const urls = loadUrl()
    let htmlText = ''
    for (index in urls) {
        htmlText += `
                    <li>
                        <a href="${urls[index].url}" target="_blank">${urls[index].url}</a>
                        <button class="delete-btn" data-id="${index}">Delete</button>
                    </li>
                    `
    }
    list.innerHTML = htmlText
}

function addNew(url) {
    let urls = loadUrl()
    if (Object.values(urls).map((i) => i.url).includes(url)) {
        console.log('- add defore');
    } else {
        index = Object.keys(urls).length ? Math.max.apply(null, Object.keys(urls)) + 1 : 0
        urls[index] = { 'url': url }
        localStorage.setItem(nameStorage, JSON.stringify(urls))
        show()

    }
}

function loadUrl() {
    let data = JSON.parse(localStorage.getItem(nameStorage))
    return data ? data : {}
}

function deleteAll() {
    localStorage.setItem(nameStorage, JSON.stringify({}))
    show()
}

function deleteByIndex(index) {
    let urls = loadUrl()
    delete urls[index]
    localStorage.setItem(nameStorage, JSON.stringify(urls))
    show()
}

show()

btnUrlSave.addEventListener('click', (eo) => {
    url = inputUrl.value.trim()
    if (url == '' || !url.includes('http')) {
        console.log('- non')
    } else {
        addNew(url)
    }
    inputUrl.value = ''
})
btnDeleteAll.addEventListener('click', deleteAll)
list.addEventListener('click', (eo) => {
    if (eo.target.classList.contains('delete-btn')) {
        index = eo.target.getAttribute('data-id')
        deleteByIndex(index)
    }
})

btnTabSave.addEventListener('click', (eo) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        addNew(tabs[0].url)
        console.log(tabs[0])
    });
})