<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider class="content-sider" v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" @select="changeMenu">
          <a-menu-item key="1">
            <a-icon type="user" />
            <span>首页</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout class="content" :style="{ marginLeft: collapsed ? `80px` : `200px` }">
        <a-layout-header class="content-header">
          <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content class="content-main">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    computed: {
      key() {
        return this.$route.path
      }
    },
    data() {
      return {
        collapsed: false
      }
    },
    methods: {
      changeMenu(menu) {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<style lang="less" scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .content-header {
    background-color: #ffffff;
    padding: 0;
    position: fixed;
    width: 100%;
    box-shadow: 0 1px 2px 0 #ddd;
    z-index: 98;
  }

  .content-main {
    margin: 80px 24px 16px;
    padding: 12px;
    background: rgb(255, 255, 255);
    min-height: calc(100vh - 96px);
    box-sizing: border-box;
  }

  .content-sider {
    position: fixed;
    height: 100%;
    top: 0;
    z-index: 99;
  }

  .content {
    transition: all 0.2s;
  }
</style>
