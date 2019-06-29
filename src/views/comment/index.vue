<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>评论管理</span>
      <el-button style="float: right; padding: 3px 0"   type="text">操作按钮</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="200">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="评论粉丝数"
        width="200">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="评论状态"
        width="200">
        <!-- 处理每一项的评论状态，注意slot-scope的运用，该table就是把每一行的数据展现出来，而scope.row可以拿到该行的所有数据-->
        <template slot-scope='scope'>
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change='handstaus(scope.row)'
            ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :total='total'
      :page_size='page_size'
      layout="prev, pager, next">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tableData: [],
      total: 20,
      page_size: 10
    }
  },
  created () {
    this.loadComment()
  },
  methods: {
    // 发送请求评论列表
    async loadComment () {
      try {
        const data = await this.$http({
          url: '/articles',
          method: 'GET',
          params: {
            response_type: 'comment'
          }
        })
        // console.log(data)
        // 给每一项添加评论禁用状态
        data.results.forEach(item => {
          item.disabled = false
        })
        // 给每一项添加
        this.tableData = data.results
      } catch (error) {
        this.$message.error('加载文章列表失败')
      }
    },
    // 点击评论状态按钮触发事件
    async handstaus (item) {
      try {
        item.disabled = true
        await this.$http({
          url: '/comments/status',
          method: 'PUT',
          params: {
            article_id: item.id.toString()
          },
          data: {
            allow_comment: item.comment_status
          }
        })
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁  用'}评论状态成功`
        })
        item.disabled = false
      } catch (error) {
        this.$message.error('修改评论状态失败')
        item.comment_status = !item.comment_status
        item.disabled = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .el-table {
    margin-bottom:20px;
  }
</style>
