let accessToken = null
let authToken = null

export const setToken = (t) => {
    return new Promise((resolve, reject) => {
        accessToken = t
        resolve()
    })
}

export const setAuthToken = (t) => {
  return new Promise((resolve, reject) => {
      authToken = t
      resolve()
  })
}

export const getAuthToken = () => {
  return authToken
}

//--- public ajax sender
export const ajaxSender = (params, vue) => {
  if(vue) {
    vue.$loadingStart()
  }

  if(!checkToken()) {
    return
  }


  let options = {
    method: params.method,
    url: params.url,
    data: params.data || {},
    headers: {'authorization': `Bearer ${authToken}`},
    // headers: {'authorization': `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZzIwMDg0QDEyNi5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTU1MDM4ODA1OX0.xCHlKP5_FjRyiDwAJNGib7MlOfRvzqG1dQcuvYzxUcqir9-WGXPbUItSIvQWDPaOHfnwxYGKROjOZUTYAGG_DQ'}`},
    cache: false,
    timeout: 8000
  }
  console.log(options)

  if (params.json) {
    options = Object.assign({}, {
      contentType: "application/json"
    }, options)
    options.data = JSON.stringify(params.data)
  }

  return $.ajax(options)
    .done((data, textStatus, jqXHR) => {
      if (vue) {
        vue.$loadingEnd()
      }
      if (jqXHR.status === 204) {
        params.successfun(null)
        return
      }

      if(data && Number(data.status) < 0) {
        vue.$Message.error(data.msg);
        return
      }

      if(typeof data == 'string') {
        let res = ''
        try {
          res = JSON.parse(data)
        } catch(e) {
          res = data
        }
        params.successfun(res)

      } else {
        params.successfun(data)
      }
    })
    .fail((data) => {
      if (vue) {
        vue.$loadingEnd()
      }

      let resJson = data.responseJSON

      if (!dealRes(resJson)) {
        return
      }

      console.log('fail', data)

      if(params.failfun) {
        params.failfun(data)
      }
    })
    .always(() => {
      if (params.always) {
        params.always()
      }
    });
}

/**
 * 验证token
 */
function checkToken () {
  return true
  console.log('authToken', authToken)
  if (!authToken) {
    // 如果没有authToken存在
    location.href = 'https://account.easyapi.com/login';
    return false
  }
}

// 处理返回状态
function dealRes (resJson) {
  if (resJson.code == -9) {
    location.href = 'https://account.easyapi.com/login';
    return false
  }
}



