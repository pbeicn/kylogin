<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :collapse="collapse"
             background-color="white"
             text-color="black"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="item in routes">
        <template v-if="item.children">
          <el-submenu :index="item.path"
                      :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">&nbsp;&nbsp;{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children"
                          :index="subItem.path"
                          :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.children"
                              :key="i"
                              :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="!subItem.hidden"
                            :index="subItem.path"
                            :key="subItem.index">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path"
                        :key="item.index"
                        v-if="!item.hidden">
            <i :class="item.icon">&nbsp;</i><span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus'
export default {
  data () {
    return {
      routes: global.antRouter,
      collapse: false
    }
  },
  created () {
    // alert(JSON.stringify(global.antRouter))
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
