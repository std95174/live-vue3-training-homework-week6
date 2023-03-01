// get token from cookie
export function getToken() {
    const cookie = document.cookie
    const token = cookie.split(';').find(item => item.includes('hexToken'))
    if (token) {
        return token.split('=')[1]
    }
    return ''
}
