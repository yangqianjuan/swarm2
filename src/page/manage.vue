<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #545c64">
        <div class="logo">
          <div class="title">
            <img src="../image/logo.png" alt style="width:45px" />
            <span>Swarm</span>
          </div>
        </div>
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;"
          class="el-menu-vertical-demo"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <!-- <el-menu-item index="announcementCenter">
            <i class="el-icon-menu"></i>公告中心
          </el-menu-item> -->
          <el-menu-item index="nodeLook">
            <i class="el-icon-s-marketing"></i>节点查看
          </el-menu-item>
          <el-menu-item index="uncashList">
            <i class="el-icon-tickets"></i>有效支票列表
          </el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>有效支票列表
            </template>
            <el-menu-item index="uncashList">未提交支票</el-menu-item>
            <el-menu-item index="extractedcashList">已提取支票</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
import avator from '@/assets/auth/img/avator.jpg'
<script>
export default {
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.logo {
  height: 60px;
  border-bottom: 1px solid rgba(85, 69, 69, 0.5);
  .title {
    height: 100%;
    display: flex;
    padding-left: 15px;
    justify-content: start;
    align-items: center;
    span {
      margin-left: 5px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      line-height: 60px;
      letter-spacing: 1px;
    }
  }
}

.manage_page {
}
</style>
