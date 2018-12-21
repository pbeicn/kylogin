<template>
  <div id="rolemenu">
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
            <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>菜单树</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button type="primary"
                     icon="add"
                     @click="saveRoleMenu"><span class="el-icon-plus">&nbsp;</span>保存</el-button>
        </div>
        <div class="grid-content bg-purple"
             id="userlist">
          <el-tree :data="treedata"
                   :props="props"
                   ref="menutree"
                   node-key="menuid"
                   show-checkbox
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'rolemenu',
  data () {
    return {
      url: '/getRoleList',
      roleData: [],
      treedata: [],
      props: {
        label: 'title'
      },
      templateRadio: 0,
      croleid: ''
    }
  },
  created () {
    this.getRoleList()
  },
  mounted () {
    this.getRoleMenuList(this.templateRadio)
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
    getRoleMenuList (roleid) {
      let url = '/menu/menutreelist'
      this.$ajax.get(url, {
      }).then(res => {
        this.treedata = res.data.dataList
      }).catch(res => {
        console.log(res)
      })
    },
    handleNodeClick (data) {
      alert(JSON.stringify(data))
      console.log(data)
    },
    saveRoleMenu () {
      let pid = ''
      this.$refs.menutree.getHalfCheckedKeys().forEach(element => {
        this.$ajax.post('/role/addpermission', {
          roleid: this.croleid,
          menuid: element
        }).then((res) => {

        })
        pid += element + ','
      })
      this.$refs.menutree.getCheckedKeys().forEach(element => {
        this.$ajax.post('/role/addpermission', {
          roleid: this.croleid,
          menuid: element
        }).then((res) => {

        })
        pid += element + ','
      })
      if (pid.length > 1) {
        pid = pid.substring(0, pid.length - 1)
      }
      console.log(pid)
      this.$message({
        message: '添加成功',
        center: true
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
