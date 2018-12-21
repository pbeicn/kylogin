<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" placeholder="用户名称" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="search"><span class="el-icon-search">&nbsp;</span>搜索</el-button>
        <el-button type="primary" @click="handleAdd"><span class="fa fa-plus">&nbsp;</span>新增</el-button>
      </div>
      <el-table :data="data" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="userid" label="" v-if="hideRow" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" cell-style="padding:0" align="center" width="120">
        </el-table-column>
        <el-table-column prop="factname" label="实际姓名" align="center" width="120">
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" width="220">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <!--新增界面-->
    <template>
      <el-dialog title="新增" width="40%" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="登录名">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="addForm.factname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthdate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="addForm.sex" label="1">男</el-radio>
            <el-radio v-model="addForm.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit('addForm')" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </template>
    <!-- 编辑弹出框 -->
    <template>
      <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
        <el-form ref="editform" :model="editform" label-width="80px">
          <el-form-item label="登录名">
            <el-input v-model="editform.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editform.factname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editform.birthdate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="editform.sex" label="1">男</el-radio>
            <el-radio v-model="editform.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="editform.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editform.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="editform.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'basetable',
  data () {
    return {
      url: '/user/table',
      tableData: [],
      cur_page: 1,
      total: 100,
      pagesize: 10,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      hideRow: false,
      is_search: false,
      addFormVisible: false,
      editVisible: false,
      delVisible: false,
      editform: {
        username: '',
        factname: ''
      },
      addForm: {
        name: '',
        address: ''
      },
      addLoading: false,
      addFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        factname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      idx: -1
    }
  },
  created () {
    this.getData()
  },
  computed: {
    data () {
      return this.tableData
      //   return this.tableData.filter((d) => {
      //     let isdel = false
      //     for (let i = 0; i < this.del_list.length; i++) {
      //       if (d.name === this.del_list[i].name) {
      //         isdel = true
      //         break
      //       }
      //     }
      //     if (!isdel) {
      //       if (d.address.indexOf(this.select_cate) > -1 &&
      //         (d.name.indexOf(this.select_word) > -1 ||
      //           d.address.indexOf(this.select_word) > -1)
      //       ) {
      //         return d
      //       }
      //     }
      //   })
    }
  },
  methods: {
    cellStyle ({ row, rowIndex }) {
      return 'padding: 0px'
    },
    // 分页导航
    handleCurrentChange (val) {
      console.log(val)
      this.cur_page = val
      this.getData()
    },
    getData () {
      // if (process.env.NODE_ENV === 'development') {
      //   this.url = '/user/userlist'
      // };
      let url = '/user/userlist?pagenum=' + this.cur_page
      console.log(this.select_word)
      if (this.select_word !== '') {
        url += '&username=' + this.select_word
      }
      console.log(url)
      this.$ajax.get(url, {
        page: this.cur_page
      }).then((res) => {
        console.log(res)
        this.tableData = res.data.dataList
        this.total = res.data.pagingInfo.total
      })
    },
    search () {
      this.is_search = true
      this.getData()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        addr: ''
      }
    },
    handleEdit (index, row) {
      this.idx = index
      const item = this.tableData[index]
      let url = '/user/userinfo'
      console.log(item.userid)
      if (item.userid !== '') {
        url += '?userid=' + item.userid
      }
      console.log(url)
      this.$ajax.get(url).then((res) => {
        console.log(res)
        this.editform = res.data.data
        this.editVisible = true
      })
    },
    handleDelete (index, row) {
      this.idx = index
      this.delVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addSubmit (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFormVisible = false
          console.log(this.addForm.username)
          this.$ajax.post('/user/adduser', {
            username: this.addForm.username,
            factname: this.addForm.username,
            birthdate: this.addForm.birthdate,
            description: this.addForm.description,
            email: this.addForm.email,
            sex: this.addForm.sex,
            password: this.addForm.password
          }).then(res => {
            console.log(res.data.result_code)
            if (res.data.result_code === -1) {
              this.$message({
                dangerouslyUseHTMLString: true,
                message: res.data.result_msg,
                center: true
              })
              this.$message.success('添加成功')
            }
            this.search()
          }).catch(res => {
            alert(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 保存编辑
    saveEdit () {
      // this.$set(this.tableData, this.idx, this.form)
      this.editVisible = false
      console.log(this.editform.username)
      this.$ajax.post('/user/modifyuser', {
        userid: this.editform.userid,
        username: this.editform.username,
        factname: this.editform.username,
        birthdate: this.editform.birthdate,
        description: this.editform.description,
        email: this.editform.email,
        sex: this.editform.sex,
        password: this.editform.password
      }).then(res => {
        console.log(res.data.result_code)
        if (res.data.result_code === -1) {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: res.data.result_msg,
            center: true
          })
        }
        this.$message.success('修改成功')
        this.search()
      }).catch(res => {
        alert(res)
      })
      // this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow () {
      // this.tableData.splice(this.idx, 1)
      let url = '/user/removeuser'
      const item = this.tableData[this.idx]
      console.log(item.userid)
      if (item.userid !== '') {
        url += '?userid=' + item.userid
      }
      console.log(url)
      this.$ajax.get(url).then((res) => {
        console.log(res)
      })
      this.$message.success('删除成功')
      this.delVisible = false
      this.search()
    }
  }
}

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
