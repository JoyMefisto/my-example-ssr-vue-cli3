const setCookieParser = require('set-cookie-parser')

function setCookiesToBrowser (res, cookies) {
  const cookiesFromAPI = setCookieParser.parse(cookies)
  const cookiesToBrowser = {}

  cookiesFromAPI.forEach((cookie) => {
    cookiesToBrowser[cookie.name] = cookie
  })

  Object.keys(cookiesToBrowser).forEach((key) => {
    const cookie = cookiesToBrowser[key]
    const cookieParams = {}

    if (cookie.domain) cookieParams.domain = cookie.domain
    if (cookie.path) cookieParams.path = cookie.path
    if (cookie.secure) cookieParams.secure = cookie.secure
    if (cookie.httpOnly) cookieParams.httpOnly = cookie.httpOnly
    if (cookie.expires) cookieParams.expires = cookie.expires
    if (cookie.maxAge) cookieParams.maxAge = cookie.maxAge

    if (cookie.value === 'deleted') {
      res.clearCookie(cookie.name, cookieParams)
    } else {
      res.cookie(cookie.name, cookie.value, cookieParams)
    }
  })
}

module.exports = setCookiesToBrowser
