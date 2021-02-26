<template>
  <div>
    <baidu-map class="map"></baidu-map>
    <chiaot-table rowKey="id" store="home" :pager="true" :http="fetchList" :options="options" :searchList="searchList" :actions="['add']" />
  </div>
</template>

<script>
  import ChiaotTable from '@/components/ChiaotTable'
  import { home } from "@/services/api"

  export default {
    name: 'Home',
    components: {
      ChiaotTable
    },
    computed: {
      currentPage() {
        return this.$store.state['home'].page
      },
      pageSize() {
        return this.$store.state['home'].pageSize
      },
      total() {
        return this.$store.state['home'].total
      }
    },
    data() {
      return {
        options: [
          {
            title: '昵称',
            key: 'nickname',
            width: 100
          },
          {
            title: '头像',
            key: 'avatar',
            custom: true,
            type: 1
          },
          {
            title: '身高',
            key: 'height',
            custom: true,
            type: 2,
            color: 'blue'
          },
          {
            title: '身材',
            key: 'weight',
            custom: true,
            type: 2,
            color: 'blue'
          },
          {
            title: '出生地',
            key: 'birth',
            custom: true,
            type: 3,
            format: val => {
              return `${val.birthP}-${val.birthC}-${val.birthA}`
            }
          },
          {
            title: '房',
            key: 'house',
            custom: true,
            type: 3,
            format: val => `<b>${val.house.name}</b>`
          },
          {
            title: '车',
            key: 'car',
            custom: true,
            type: 3,
            format: val => `<b>${val.car.name}</b>`
          },
          {
            title: '操作',
            key: 'action',
            custom: true,
            type: 4,
            actions: ['info', 'edit', 'delete']
          }
        ],
        searchList: [
          {
            key: 'name',
            placeholder: '请输入搜索内容',
            type: 1
          },
          {
            key: 'type',
            placeholder: '请选择类型',
            options: [
              { value: 1, label: '同城' },
              { value: 2, label: '异地' }
            ],
            type: 2
          }
        ]
      }
    },
    methods: {
      fetchList(params) {
        return new Promise((resolve, reject) => {
          home.getList(params)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    mounted() {
      console.log('home初始化')
    }
  }
</script>

<style lang="less" scoped>
  .map {
    height: 300px;
  }
</style>
