<template>
  <el-card class="box-card">
    <el-tree
      :data="menus"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      :default-checked-keys="checkedKeys">
    </el-tree>
    <div style="text-align: center">
      <el-button @click="resetChecked">清空</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </el-card >
</template>

<script lang='ts'>
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'allocMenu',
  props: {
    roleId: {
      type: String || Number,
      required: true
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: [],
      menus: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    // 所有菜单
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    // 当前角色选中的菜单
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus:any) {
      menus.forEach((menu:any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    resetChecked () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    },
    async onSave () {
      const menuIdList = (this.$refs.tree as Tree).getCheckedKeys()
      console.log(menuIdList)
      // 拿到选中节点的数据 id 列表
      // 请求提交保存
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.replace({
        name: 'role'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card{
  height: 100%;
}
</style>
