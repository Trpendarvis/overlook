const getAPIData = (url) => {
    return fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error(`Error ${response.status}, please reload and try again`)
        }
        return response.json()
    
    })
    .catch(err => {
        throw new Error(`Network error: ${err.message}`)
    })
}

export { getAPIData }
