<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="角色名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="add" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" border class="table" :cell-style="cellStyle" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="roleid" label="角色编码" width="120">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增界面-->
      <template>
        <el-dialog title="新增" width="40%" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" ref="addForm">
            <el-form-item label="角色名称">
              <el-input v-model="addForm.rolename" auto-complete="off"></el-input>
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'roletable',
  data () {
    return {
      url: '/getRoleList',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      addFormVisible: false,
      editVisible: false,
      delVisible: false,
      form: {
        roleid: '',
        rolename: ''
      },
      addForm: {
        roleid: '',
        rolename: ''
      },
      addLoading: false,
      idx: -1
    }
  },
  created () {
    this.getRoleList()
  },
  computed: {
    data () {
      console.log(this.tableData)
      return this.tableData
    }
  },
  // mounted () {
  //   this.data = this.tableData
  // },
  methods: {
    cellStyle ({ row, rowIndex }) {
      return 'padding: 5px'
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        addr: ''
      }
    },
    addSubmit (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFormVisible = false
          console.log(this.addForm.username)
          this.$ajax.post('/user/role', {
            rolename: this.addForm.rolename,
            description: this.addForm.description
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
    getRoleList () {
      this.$ajax.get('/role/rolelist', {
      }).then(res => {
        console.log(res.data)
        console.log(res.data.dataList)
        this.tableData = res.data.dataList
      }).catch(res => {
        console.log(res)
      })
    },
    search () {
      this.getRoleList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
