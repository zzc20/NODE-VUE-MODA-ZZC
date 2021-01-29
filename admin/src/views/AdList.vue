<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items" label-width="50px">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="广告位主题" width="150"></el-table-column>            
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/ads/edit/' + scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []

    };
  },
  methods: {
    async fetch() {
      // app.use('/admin/api/rest/:resource', router)
      const res = await this.$request.get("rest/ads");
      // console.log(res);
      this.items = res.data;
      
    },
  async remove(row) {
      // 到elementui找 messageBox 弹框
      this.$confirm('此操作将永久删除' + row.title + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$request.delete('rest/ads/' + row._id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      })
      
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>