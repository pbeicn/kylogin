<template>
  <div id="menu"
       class="table">
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>菜单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word"
                  placeholder="菜单名称"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   icon="search"
                   @click="search">搜索</el-button>
        <el-button type="primary"
                   icon="add"
                   @click="search">新增</el-button>
      </div>
      <el-table :data="data"
                border
                class="table"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="menuid"
                         label="菜单编码"
                         width="120">
        </el-table-column>
        <el-table-column prop="title"
                         label="菜单名称">
        </el-table-column>
        <el-table-column prop="parentid"
                         label="parentid">
        </el-table-column>
        <el-table-column prop="url"
                         label="url">
        </el-table-column>
        <el-table-column prop="description"
                         label="描述">
        </el-table-column>
        <el-table-column prop="occurdate"
                         label="创建日期">
        </el-table-column>
        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  name: 'menuList',
  data () {
    return {
      url: '/menu/menulist',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        menuid: '',
        title: '',
        parentid: '',
        url: '',
        description: '',
        occurdate: ''
      },
      idx: -1
    }
  },
  created () {
    this.getMenuList()
  },
  computed: {
    data () {
      return this.tableData
    }
  },
  // mounted () {
  //   this.data = this.tableData
  // },
  methods: {
    getMenuList () {
      this.$ajax.get('/menu/menulist').then(res => {
        console.log(res.data)
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
