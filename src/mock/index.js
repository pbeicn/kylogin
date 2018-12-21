import Mock from 'mockjs'

Mock.mock('http://10.19.95.5:8888/admin/login', {
  data: {
    'authtoken': '@id',
    'username': '@name',
    'factname': 'aaa'
  },
  'result_code': '0',
  'result_msg': '1'
})
// Mock.mock('http://localhost:8080/', {
//   'token': 'werwerwerwerwer'
// })

const produceNewsData = function () {
  // let redata = "{'result_code', '0';'result_msg', '成功'}"
  let dataList = []
  for (let i = 0; i < 10; i++) {
    let userlist = {
      userid: Mock.Random.region(),
      username: Mock.Random.region(),
      sex: Mock.Random.region(),
      factname: Mock.Random.cname(),
      email: Mock.Random.email(),
      description: Mock.Random.cname(),
      birthdate: Mock.Random.date()
    }
    dataList.push(userlist)
  }
  dataList.result_code = '0'
  console.log(dataList)
  return {
    dataList
  }
}

Mock.mock('http://10.19.95.5:8888/admin/user/userlist', 'get', produceNewsData)

const rolelistdata = function () {
  let dataList = []
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      roleid: Mock.Random.cname(),
      rolename: Mock.Random.cname()
    }
    dataList.push(newArticleObject)
  }
  return {
    dataList
  }
}
Mock.mock('http://10.19.95.5:8888/admin/role/rolelist', 'get', rolelistdata)
