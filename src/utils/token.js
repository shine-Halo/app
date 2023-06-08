
export const usertoken = (token) =>{
    localStorage.setItem('TOKEN',token)
}

export const removetoken = () => {
    localStorage.removeItem('TOKEN')
}