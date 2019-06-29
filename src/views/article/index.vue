<template>
  <div>
    <!-- 数据筛选 -->
    <el-form :model='arForm'>
      <el-form-item label="状态" prop="resource">
        <el-radio-group  v-model="arForm.status">
          <el-radio label="">全部</el-radio>
          <el-radio
          v-for="(item, index) in statTypes"
          :key="item.label"
          :label="index">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="region">
        <el-select v-model="arForm.pd"  clearable placeholder="请选择频道">
          <el-option
          v-for="item in channels"
          :key='item.id'
          :label="item.name"
          :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='时间'>
        <el-date-picker
        v-model='range_date'
        value-format="yyyy-MM-dd"
        @change='timeChange'
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        :loading ="articleLoading"
        @click="handFilter">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- /数据筛选 -->
    <!-- 文章内容 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        <!-- 文章列表 -->
        <template>
          <el-table
            v-loading='articleLoading'
            :data="articles"
            style="width: 100%">
            <el-table-column
              label="封面"
              width="180">
              <!--
                el-table中只能显示文本内容，如果需要显示别的格式的内容，需要用到template，在template中可以自定义表格列的内容，如果需要访问表格遍历项中的数据，需要给template添加slot-scope='scope'
                slot-scope 属性名是固定的
                scope 值是自己随便起的名字
                我们就可以通过scope.row访问到每一个表格项。从而访问每一项中的数据
               -->
               <template slot-scope="scope">
                  <img
                  width='20px'
                  v-for='item in scope.row.cover.images'
                  :key='item'
                  :src='item'>
               </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              width="180">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <el-tag :type="statTypes[scope.row.status].type">{{statTypes[scope.row.status].label}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="pubdate"
              label="发布时间">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" type='primary' round>修改</el-button>
              <el-button
              size="small"
              @click='handDelet(scope.row)'
              type='danger'
              round>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- /文章列表 -->
        <!-- 分页
          分页标签中的total和page-size属性控制通过设置信息总数和每页数量从而自行得出总页数，
          layout是该分页组件显示的属性：上一页，下一页和总页数等
          current-change是currentPage 改变时会触发的事件
          currentPage是当前页数，我们可以通过current-change事件触发点击当前页码请求数据的行为
        -->
        <el-pagination
          background
          :current-page='page'
          :page-size="pageSize"
          :total="totalCount"
          layout="prev, pager, next"
          :disabled='articleLoading'
          @current-change='handleCurrentChange'>
        </el-pagination>
        <!-- /分页 -->
      </div>
    </el-card>
    <!-- /文章内容 -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 信息总数
      page: 1, // 当前页码
      articleLoading: false, // 加载中
      // 数据筛选对象
      arForm: {
        status: '',
        pd: '',
        time_bagin: '',
        time_end: ''
      },
      channels: [],
      range_date: '' // 这个是绑定date组件触发change事件
    }
  },
  created () {
    // 在可以访问到DOM时用axios发送请求得到文章第一页的数据
    this.loadArtical()
    // 请求频道总数
    this.loadPd()
  },
  methods: {
    // 请求指定页的文章数据
    async loadArtical () {
      /**
     * 除了登录接口，我们在访问其他接口时，必须在请求头中设置一个Authorization字段提供用户的token，token是用户在登陆成功后后台生成放置在用户信息中,我们在axios的请求拦截中同统一处理token
     */
      // 发送请求前，加载loading
      this.articleLoading = true

      // 将数据筛选中的数据放到请求中,并且去除筛选数据对象中没有值的项
      const filterData = {}
      for (let key in this.arForm) {
        const item = this.arForm[key]
        // 因为数据中有0，所以要分开判断
        if (item !== null && item !== undefined && item !== '') {
          filterData[key] = item
        }
      }
      const data = await this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          page: this.page,
          // 请求的每页数据数量要和组件中设置的相同
          par_page: this.pageSize,
          ...filterData
        }
      })
      console.log(data)
      // 将请求结果赋值给绑定数据的数据
      this.articles = data.results
      // 将请求的文章总数赋值给分页的信息总数
      this.totalCount = data.total_count
      this.articleLoading = false
    },
    // 点击页码获取当前页码的数据
    handleCurrentChange (page) {
      // page与组件中的current_page绑定,是单向绑定，只能page影响current-page，所以要通过CurrentChange事件获取当前点击的页并重新赋值给请求中的page
      this.page = page
      this.loadArtical()
    },
    // 请求频道总数
    async loadPd () {
      try {
        const pd = await this.$http({
          url: '/channels',
          method: 'GET'
        })
        this.channels = pd.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 将获取时间组件中的时间进行处理
    timeChange (value) {
      console.log(value)
      this.arForm.time_bagin = value[0]
      this.arForm.time_end = value[1]
    },
    // 点击查询发送请求
    handFilter () {
      this.page = 1
      this.loadArtical()
    },
    // 删除文章
    async handDelet (item) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        // 将大数据转化成字符串，然后在main.js中重新设置成数字
        item.id = item.id.toString()
        // console.log(item.id)
        await this.$http({
          url: `/articles/${item.id}`,
          method: 'DELETE'
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.loadArtical()
      } catch (error) {
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          this.$message.error('删除失败')
        }
      }
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
  .el-date-editor {
    margin-bottom: 20px;
  }
  .el-form {
    padding-left: 20px;
  }
</style>
