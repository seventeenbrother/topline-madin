<template>
  <div>
    <!-- 数据筛选 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <!-- /数据筛选 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        <!-- 文章列表 -->
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </template>
        <!-- /文章列表 -->
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
        <!-- /分页 -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.loadArtical()
  },
  methods: {
    // 请求文章数量
    async loadArtical () {
      /**
     * 除了登录接口，我们在访问其他接口时，必须在请求头中设置一个Authorization字段提供用户的token，token是用户在登陆成功后后台生成放置在用户信息中
     */
      const articles = await this.$http({
        url: '/articles',
        method: 'GET'
      })
      console.log(articles)
    }
  }
}
</script>

<style lang='less' scoped>
  .filter-card {
    margin-bottom: 10px;
  }
  .el-pagination {
    margin-top: 15px;
  }
</style>
