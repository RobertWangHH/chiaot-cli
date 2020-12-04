<template>
  <div>
    <div class="header">
      <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent v-if="searchList">
        <a-form-model-item v-for="(item, index) in searchList" :key="`search-${index + 1}`">
          <a-input class="w-150" v-model="formInline[item.key]" :placeholder="item.placeholder" v-if="item.type === 1" />
          <a-select class="w-150" v-model="formInline[item.key]" v-else-if="item.type === 2" :placeholder="item.placeholder">
            <a-select-option :value="val.value" v-for="val in item.options" :key="val.value">{{ val.label }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-space>
            <a-button
                type="primary"
                html-type="submit"
            >
              查询
            </a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>

      <div>
        <a-space>
          <a-button type="primary" icon="plus" v-if="actions && actions.includes('add')" @click="$emit('add')" ghost>新增</a-button>
          <a-button type="primary" icon="edit" v-if="actions && actions.includes('edit')" :disabled="selectedRowKeys.length !== 1" ghost>修改</a-button>
          <a-button type="danger" icon="delete" v-if="actions && actions.includes('remove')" :disabled="selectedRowKeys.length < 1" ghost>删除</a-button>
        </a-space>
      </div>
    </div>

    <div class="table">
      <a-table :rowKey="item => item[rowKey]"
               :loading="loading"
               :data-source="data"
               :pagination="pagination"
               :row-selection="selectionType ? { type: selectionType, selectedRowKeys: selectedRowKeys, onChange: onSelectChange } : null"
               @change="handleTableChange">
        <a-table-column :title="item.title" v-for="item in options" :key="item.key" :width="item.width ? item.width : null">
          <template slot-scope="record">
            <div v-if="item.custom">
              <a-avatar :src="record[item.key]" v-if="item.type === 1"></a-avatar>
              <a-tag v-else-if="item.type === 2" :color="item.color">{{ record[item.key] }}</a-tag>
              <span v-else-if="item.type === 3" v-html="item.format(record)"></span>
              <div v-else-if="item.type === 4">
                <a-space>
                  <a-button size="small" v-if="item.actions.includes('info')" @click="detail(record.id)">详情</a-button>
                  <a-button size="small" v-if="item.actions.includes('edit')" @click="edit(record.id)">修改</a-button>
                  <a-button type="danger" size="small" v-if="item.actions.includes('delete')" ghost @click="remove(record.id)">删除</a-button>
                </a-space>
              </div>
            </div>
            <span v-else>{{ record[item.key] }}</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { Modal } from 'ant-design-vue'

  // type 1- 头像 2- Tag标签 3- 自定义格式化 4- 操作按钮
  export default {
    name: 'ChiaotTable',
    props: {
      // 唯一键名
      rowKey: String,
      // 对应状态管理名
      store: String,
      // 表格配置信息
      options: Array,
      // 是否开启分页
      pager: Boolean,
      // 主列表http请求函数
      http: Function,
      // 搜索栏
      searchList: Array,
      // 表格左侧选中框
      selectionType: String,
      // 上侧操作按钮
      actions: Array
    },
    computed: {
      currentPage() {
        return this.$store.state[this.store].page
      },
      pageSize() {
        return this.$store.state[this.store].pageSize
      },
      total() {
        return this.$store.state[this.store].total
      },
      selectedRowKeys: {
        get() {
          return this.$store.state[this.store].selectedRowKeys
        },
        set(keys) {
          this.$store.commit(`${this.store}/SET_SELECTED`, keys)
        }
      }
    },
    data() {
      return {
        formInline: {},
        data: [],
        columns: this.options,
        loading: false,
        pagination: {
          current: 1,
          pageSize: 0,
          total: 0,
          showSizeChanger: true,
          // 每页中显示的数据
          pageSizeOptions: ["10", "20", "50", "100"],
          // 分页中显示总的数据
          showTotal: total => `共有 ${total} 条数据`
        }
      }
    },
    methods: {
      detail(id) {
        this.$emit('detail', id)
      },

      edit(id) {
        this.$emit('edit', id)
      },

      remove(id) {
        const that = this
        Modal.confirm({
          title: '系统提示',
          content: '是否确定要删除该条信息？',
          okText: '确定删除',
          cancelText: '取消',
          onOk() {
            that.$emit('remove', id)
            that.$store.dispatch(`${that.store}/removeOne`, id)
          },
          onCancel() {

          }
        })
      },

      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },

      resetSearchForm() {
        if (this.searchList) {
          this.searchList.map(item => {
            _.set(this.formInline, item.key, '')
          })
        }
      },

      async handleSubmit(e) {
        await this.fetch(this.currentPage, this.pageSize, _.cloneDeep(this.formInline))
      },

      /**
       * 切换页
       */
      async handleTableChange(pagination) {
        await this.fetch(pagination.current, pagination.pageSize, {})
      },

      /**
       * 请求列表
       */
      async fetch(page, pageSize, params) {
        this.loading = true
        try {
          let res = await this.http({ page, pageSize, params })
          this.data = res.list
          this.$store.commit(`${this.store}/SET_PAGE`, res.page)
          this.$store.commit(`${this.store}/SET_SIZE`, pageSize)
          this.$store.commit(`${this.store}/SET_TOTAL`, res.total)
          console.log(this.pagination, res, this.currentPage)
          this.pagination.current = this.currentPage
          this.pagination.pageSize = this.pageSize
          this.pagination.total = res.total
        } catch (e) {

        } finally {
          this.loading = false
        }
      }
    },
    async mounted() {
      console.log('组件初始化')
      this.resetSearchForm()
      await this.fetch(this.currentPage, this.pageSize, {})
    }
  }
</script>

<style lang="less" scoped>
  .header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
