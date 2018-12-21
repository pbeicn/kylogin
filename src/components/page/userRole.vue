<template>
  <div id="userRole">
    <el-row :gutter="10"
            justify="center">
      <el-col :span="9">
        <div class="grid-content bg-purple"
             id="rolelist">
          <div>
            <el-breadcrumb>
              <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-table :data="roleData"
                    border
                    class="table">
            <el-table-column label=""
                             align="center"
                             width="55">
              <template slot-scope="scope">
                <el-radio :label="scope.row.roleid"
                          v-model="templateRadio"
                          @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="roleid"
                             label="角色编码"
                             width="120">
            </el-table-column>
            <el-table-column prop="rolename"
                             label="角色名称">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="handle-box"
             align="right">
          <el-breadcrumb>
            <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button type="primary"
                     icon="add"
                     @click="addRoleUser"><span class="el-icon-plus">&nbsp;</span>新增</el-button>
          <el-button type="primary"
                     icon="add"
                     @click="delRoleUser"><span class="el-icon-delete">&nbsp;</span>删除</el-button>
        </div>
        <div class="grid-content bg-purple"
             id="userlist">
          <el-table :data="userData"
                    border
                    class="table"
                    ref="singelTable"
                    @selection-change="handleUserSelectionChange">
            <el-table-column type="selection"
                             width="55"
                             align="center"></el-table-column>
            <el-table-column prop="username"
                             label="用户登录名"
                             width="120">
            </el-table-column>
            <el-table-column prop="factname"
                             label="用户名称">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--新增界面-->
    <template>
      <el-dialog title="新增角色用户"
                 width="40%"
                 :visible.sync="addFormVisible"
                 :close-on-click-modal="false">
        <el-table :data="forAddUserData"
                  border
                  class="table"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"
                           align="center"></el-table-column>
          <el-table-column prop="userid"
                           label=""
                           v-if="hideRow"
                           header-align="center"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="用户名"
                           align="center"
                           width="120">
          </el-table-column>
          <el-table-column prop="factname"
                           label="实际姓名"
                           align="center"
                           width="320">
          </el-table-column>
        </el-table>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary"
                     @click.native="addSubmit()">提交</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  name: 'userrole',
  data () {
    return {
      url: '/getRoleList',
      roleData: [],
      userData: [],
      forAddUserData: [],
      forUserData: [],
      userRoldData: [],
      templateRadio: 0,
      addFormVisible: false,
      hideRow: false,
      croleid: ''
    }
  },
  created () {
    this.getRoleList()
  },
  mounted () {
    this.getRoleUserList(this.templateRadio)
  },
  methods: {
    getRoleList () {
      this.$ajax.get('/role/rolelist', {
      }).then(res => {
        console.log(res.data)
        console.log(res.data.dataList)
        this.roleData = res.data.dataList
        this.croleid = res.data.dataList[0].roleid
      }).catch(res => {
        console.log(res)
      })
    },
    getTemplateRow (index, row) {
      this.croleid = row.roleid
      this.getRoleUserList(row.roleid)
    },
    getRoleUserList (roleid) {
      let url = '/role/roleuserlist?roleid=' + roleid
      this.$ajax.get(url, {
      }).then(res => {
        this.userData = res.data.dataList
      }).catch(res => {
        console.log(res)
      })
    },
    addRoleUser () {
      this.addFormVisible = true
      let url = '/user/userlist'
      this.$ajax.get(url, {
        page: this.cur_page
      }).then((res) => {
        this.forAddUserData = res.data.dataList
      })
    },
    addSubmit () {
      this.userRoldData.forEach(userd => {
        console.log('sssssssssssssssssssssss')
        console.log(userd.userid)
        this.$ajax.post('/role/addroleuser', {
          roleid: this.croleid,
          userid: userd.userid
        }).then(res => {
          console.log(res.data.result_code)
          if (res.data.result_code === -1) {
            this.$message({
              message: res.data.result_msg,
              center: true
            })
          }
          this.$message.success('添加成功')
          this.getRoleUserList(this.croleid)
          this.addFormVisible = false
        }).catch(res => {
          alert(res)
        })
      })
    },
    handleSelectionChange (val) {
      this.userRoldData = val
    },
    handleUserSelectionChange (val) {
      this.forUserData = val
    },
    delRoleUser () {
      this.forUserData.forEach(userd => {
        this.$ajax.post('role/removeroleuser', {
          roleid: this.croleid,
          userid: userd.userid
        }).then(res => {
          console.log(res.data.result_code)
          if (res.data.result_code === -1) {
            this.$message({
              message: res.data.result_msg,
              center: true
            })
          }
          this.$message.success('删除成功')
          this.getRoleUserList(this.croleid)
        }).catch(res => {
          alert(res)
        })
      })
    }
  }
}
</script>
<style scope>
/* .box-card {
  width: 400px;
  margin: 20px auto;
}
.block {
  padding: 30px 24px;
  background-color: rgb(27, 16, 16);
}
.alert-item {
  margin-bottom: 10px;
}
.tag-item {
  margin-right: 15px;
}
.link-title {
  margin-left: 35px;
}
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}

.left-container-twoOne {
  background-color: rgb(110, 75, 75);
  height: 100%;
}

.container-onetoOne {
  background-color: rgb(47, 80, 74);
  height: 100%;
  width: 50%;
}

.container-onetoTwo {
  background-color: rgb(61, 19, 56);
  height: 100%;
  width: 50%;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #57926b;
}
.bg-purple {
  background: #7e2970;
}
.bg-purple-light {
  background: #071c4d;
}
.grid-content {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 150px;
  min-width: 100px;
}
.grid-contentB {
  background-color: rgb(64, 56, 134);
  border-radius: 4px;
  min-height: 150px;
  min-width: 100px;
}
.grid-a-contentWidth {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 100px;
}
.grid-a-content-a-Width {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 220px;
}

.grid-one-contentheight {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 100%;
} */
</style>
