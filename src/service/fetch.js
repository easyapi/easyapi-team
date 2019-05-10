// import {getStorage, setStorage} from './../lib/publicFun'

let accessToken = null
let authToken = null
// let authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZzIwMDg0QDEyNi5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTU0NjE2MDkzNX0.FQT398068pWR4vV5B1Rz_jaka6OLPJok5XZXDxThrH83pqn9FvQZpqRK94YNWOcWgPKKg8lvMR8KJKQo2iAxtQ'
// console.log(authToken)
export const setToken = (t) => {
    return new Promise((resolve, reject) => {
        accessToken = t
        resolve()
    })
}

export const setAuthToken = (t) => {
  return new Promise((resolve, reject) => {
    console.log(t)
    //   authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZzIwMDg0QDEyNi5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTU0NjE2MDkzNX0.FQT398068pWR4vV5B1Rz_jaka6OLPJok5XZXDxThrH83pqn9FvQZpqRK94YNWOcWgPKKg8lvMR8KJKQo2iAxtQ'
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
    cache: false,
    timeout: 8000
  }
  // console.log(options)

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

// 验证token
function checkToken () {
  // console.log(authToken)
  if (!authToken) {
    // 如果没有authToken存在
    location.href = 'https://account.easyapi.com/login';
    return false;
  }
  return true;
}

// 处理返回状态
function dealRes (resJson) {
  // console.log(resJson.code)
  if (resJson.code == -9) {
    location.href = 'https://account.easyapi.com/login';
    return false;
  }
  return true;
}



