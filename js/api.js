var API = (function (){
    const BASE_URL = 'https://study.duyiedu.com'
const TOKEN_KEY = "token"

// 封装get公共函数
function get(path) {
    const headers = {}  
    const token = localStorage.getItem(TOKEN_KEY);      //查看本地token是否存在
    if(token) {           //如果本地有token的话那就给header里面加进去
        headers.authorization = `Bearer ${token}`       //使用模板字符串拼接动态获取的token
    }
    return fetch(BASE_URL + path, { headers })
}

// 封装post公共函数
function post(path, bodyObj) {
    const headers = {
        'Content-Type': 'application/json'
    }  
    const token = localStorage.getItem(TOKEN_KEY);      //查看本地token是否存在
    if(token) {           //如果本地有token的话那就给header里面加进去
        headers.authorization = `Bearer ${token}`       //使用模板字符串拼接动态获取的token
    }
    return fetch(BASE_URL + path, { headers, method:"POST", body:JSON.stringify(bodyObj)})
}

// 注册函数
// 方法一
// async function reg(userInfo) {
//     // 将响应结果retun出来
//     return await fetch( BASE_URL + '/api/user/reg', {   //请求行传递
//         method: 'POST',                     
//         headers: {                          //请求头传递
//             'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify(userInfo),     //请求体传递
//     }).then( (resp) => resp.json())    //等待响应体传送完成，然后解析数据成json格式
// }

// 写法二
async function reg(userInfo) {
    // 响应头传递过来
    const resp = await post('/api/user/reg', userInfo)
    return await resp.json()
}

// 登录函数
async function login(loginInfo) {
    const resp = await  post('/api/user/login',loginInfo)
    const result = await resp.json()
    if(result.code === 0) {
        // 登录成功
        // 将响应头中的token保存起来(localStorage)
        const token = resp.headers.get('authorization');    //将相应的令牌获取并保存到token中
        localStorage.setItem(TOKEN_KEY, token)      //保存token到本地Storage中
    }
    return result;
}

// 验证账号
async function exists(loginId) {
    const resp = await get('/api/user/exists?loginId=' + loginId)
    return await resp.json()
}

// 当前登录的用户信息
async function profile() {
    const resp = await get('/api/user/profile')
    return await resp.json()    //将数据转换成json格式
}

// 发送聊天信息
async function sendChat(content) {
    const resp = await post('/api/chat', {
        content
    })
    return await resp.json()
}

// 获取聊天历史记录
async function  getHistory() {
    const resp = await get('/api/chat/history')
    return await resp.json()
}

// 退出登录
function loginOut() {
    localStorage.removeItem(TOKEN_KEY)
}
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
    }
})()