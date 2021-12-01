<template>
  <el-menu
    default-active="2"
    class="el-menu"
    @open="handleOpen"
    @close="handleClose"
    router>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/role">角色列表</el-menu-item>
      <el-menu-item index="/menu">菜单列表</el-menu-item>
      <el-menu-item index="/resource">资源列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-menu"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
     <el-menu-item index="/user">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">广告管理</span>
      </template>
      <el-menu-item index="/advertise">广告列表</el-menu-item>
      <el-menu-item index="4-2">广告位列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
export default {
  methods: {
    handleOpen () {
      // console.log(key, keyPath)
    },
    handleClose () {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scope>
  .el-menu{
    height:100%;
  }
</style>
