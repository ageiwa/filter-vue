export const sendRequest = (url) => {
    return fetch(url).then(response => response.json())
}