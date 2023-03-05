<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">VUE3+TS</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <el-icon v-if="item.icon" :class="item.icon">
                <component :is="getIconComponentName(item.icon)"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem, item.children)"
              >
                <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
                <el-icon v-if="subitem.icon" :class="subitem.icon">
                  <component
                    :is="getIconComponentName(subitem.icon)"
                  ></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon" :class="item.icon">
              <component :is="getIconComponentName(item.icon)"></component>
            </el-icon>

            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
// import {useStore} from 'vuex'
import { useStore } from '@/store'
import router from '@/router'
// vuex - ts支持不好，store取值不能获取
export default defineComponent({
  name: 'nav-menu',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    /**
     * [
  {
    "id": 38,
    "name": "系统总览",
    "type": 1,
    "url": "/main/analysis",
    "icon": "el-icon-monitor",
    "sort": 1,
    "children": [
      {
        "id": 39,
        "url": "/main/analysis/overview",
        "name": "核心技术",
        "sort": 106,
        "type": 2,
        "children": null,
        "parentId": 38
      },
      {
        "id": 40,
        "url": "/main/analysis/dashboard",
        "name": "商品统计",
        "sort": 107,
        "type": 2,
        "children": null,
        "parentId": 38
      }
    ]
  },
  {
    "id": 1,
    "name": "系统管理",
    "type": 1,
    "url": "/main/system",
    "icon": "el-icon-setting",
    "sort": 2,
    "children": [
      {
        "id": 2,
        "url": "/main/system/user",
        "name": "用户管理",
        "sort": 100,
        "type": 2,
        "children": [
          {
            "id": 5,
            "url": null,
            "name": "创建用户",
            "sort": null,
            "type": 3,
            "parentId": 2,
            "permission": "system:users:create"
          },
          {
            "id": 6,
            "url": null,
            "name": "删除用户",
            "sort": null,
            "type": 3,
            "parentId": 2,
            "permission": "system:users:delete"
          },
          {
            "id": 7,
            "url": null,
            "name": "修改用户",
            "sort": null,
            "type": 3,
            "parentId": 2,
            "permission": "system:users:update"
          },
          {
            "id": 8,
            "url": null,
            "name": "查询用户",
            "sort": null,
            "type": 3,
            "parentId": 2,
            "permission": "system:users:query"
          }
        ],
        "parentId": 1
      },
      {
        "id": 3,
        "url": "/main/system/department",
        "name": "部门管理",
        "sort": 101,
        "type": 2,
        "children": [
          {
            "id": 17,
            "url": null,
            "name": "创建部门",
            "sort": null,
            "type": 3,
            "parentId": 3,
            "permission": "system:department:create"
          },
          {
            "id": 18,
            "url": null,
            "name": "删除部门",
            "sort": null,
            "type": 3,
            "parentId": 3,
            "permission": "system:department:delete"
          },
          {
            "id": 19,
            "url": null,
            "name": "修改部门",
            "sort": null,
            "type": 3,
            "parentId": 3,
            "permission": "system:department:update"
          },
          {
            "id": 20,
            "url": null,
            "name": "查询部门",
            "sort": null,
            "type": 3,
            "parentId": 3,
            "permission": "system:department:query"
          }
        ],
        "parentId": 1
      },
      {
        "id": 4,
        "url": "/main/system/menu",
        "name": "菜单管理",
        "sort": 103,
        "type": 2,
        "children": [
          {
            "id": 21,
            "url": null,
            "name": "创建菜单",
            "sort": null,
            "type": 3,
            "parentId": 4,
            "permission": "system:menu:create"
          },
          {
            "id": 22,
            "url": null,
            "name": "删除菜单",
            "sort": null,
            "type": 3,
            "parentId": 4,
            "permission": "system:menu:delete"
          },
          {
            "id": 23,
            "url": null,
            "name": "修改菜单",
            "sort": null,
            "type": 3,
            "parentId": 4,
            "permission": "system:menu:update"
          },
          {
            "id": 24,
            "url": null,
            "name": "查询菜单",
            "sort": null,
            "type": 3,
            "parentId": 4,
            "permission": "system:menu:query"
          }
        ],
        "parentId": 1
      },
      {
        "id": 25,
        "url": "/main/system/role",
        "name": "角色管理",
        "sort": 102,
        "type": 2,
        "children": [
          {
            "id": 26,
            "url": null,
            "name": "创建角色",
            "sort": null,
            "type": 3,
            "parentId": 25,
            "permission": "system:role:create"
          },
          {
            "id": 27,
            "url": null,
            "name": "删除角色",
            "sort": null,
            "type": 3,
            "parentId": 25,
            "permission": "system:role:delete"
          },
          {
            "id": 28,
            "url": null,
            "name": "修改角色",
            "sort": null,
            "type": 3,
            "parentId": 25,
            "permission": "system:role:update"
          },
          {
            "id": 29,
            "url": null,
            "name": "查询角色",
            "sort": null,
            "type": 3,
            "parentId": 25,
            "permission": "system:role:query"
          }
        ],
        "parentId": 1
      }
    ]
  },
  {
    "id": 9,
    "name": "商品中心",
    "type": 1,
    "url": "/main/product",
    "icon": "el-icon-goods",
    "sort": 3,
    "children": [
      {
        "id": 15,
        "url": "/main/product/category",
        "name": "商品类别",
        "sort": 104,
        "type": 2,
        "children": [
          {
            "id": 30,
            "url": null,
            "name": "创建类别",
            "sort": null,
            "type": 3,
            "parentId": 15,
            "permission": "system:category:create"
          },
          {
            "id": 31,
            "url": null,
            "name": "删除类别",
            "sort": null,
            "type": 3,
            "parentId": 15,
            "permission": "system:category:delete"
          },
          {
            "id": 32,
            "url": null,
            "name": "修改类别",
            "sort": null,
            "type": 3,
            "parentId": 15,
            "permission": "system:category:update"
          },
          {
            "id": 33,
            "url": null,
            "name": "查询类别",
            "sort": null,
            "type": 3,
            "parentId": 15,
            "permission": "system:category:query"
          }
        ],
        "parentId": 9
      },
      {
        "id": 16,
        "url": "/main/product/goods",
        "name": "商品信息",
        "sort": 105,
        "type": 2,
        "children": [
          {
            "id": 34,
            "url": null,
            "name": "创建商品",
            "sort": null,
            "type": 3,
            "parentId": 16,
            "permission": "system:goods:create"
          },
          {
            "id": 35,
            "url": null,
            "name": "删除商品",
            "sort": null,
            "type": 3,
            "parentId": 16,
            "permission": "system:goods:delete"
          },
          {
            "id": 36,
            "url": null,
            "name": "修改商品",
            "sort": null,
            "type": 3,
            "parentId": 16,
            "permission": "system:goods:update"
          },
          {
            "id": 37,
            "url": null,
            "name": "查询商品",
            "sort": null,
            "type": 3,
            "parentId": 16,
            "permission": "system:goods:query"
          }
        ],
        "parentId": 9
      }
    ]
  },
  {
    "id": 41,
    "name": "随便聊聊",
    "type": 1,
    "url": "/main/story",
    "icon": "el-icon-chat-line-round",
    "sort": 4,
    "children": [
      {
        "id": 42,
        "url": "/main/story/chat",
        "name": "你的故事",
        "sort": 108,
        "type": 2,
        "children": null,
        "parentId": 41
      },
      {
        "id": 43,
        "url": "/main/story/list",
        "name": "故事列表",
        "sort": 109,
        "type": 2,
        "children": [],
        "parentId": 41
      }
    ]
  }
]
     */
    const userMenus = computed(() => {
      const menu = store.state.login.userMenu
      return menu
    })
    const getIconComponentName = computed(() => (iconClass: string) => {
      const lastIndex = iconClass.lastIndexOf('-')
      const names = iconClass.substring(lastIndex + 1, iconClass.length)
      return names
    })
    const handleMenuItemClick = (item: any, g: any) => {
      // console.log('--------', g)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, handleMenuItemClick, getIconComponentName }
  }
})
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
