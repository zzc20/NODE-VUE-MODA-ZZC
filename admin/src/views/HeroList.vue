<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items" label-width="50px">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="150"></el-table-column>
      <el-table-column prop="title" label="英雄称号" width="150"></el-table-column>
      <!-- <el-table-column prop="scores.difficult" label="难度" width="150"></el-table-column>
      <el-table-column prop="scores.skills" label="技能" width="150"></el-table-column>
      <el-table-column prop="scores.attack" label="攻击" width="150"></el-table-column>
      <el-table-column prop="scores.survive" label="生存" width="150"></el-table-column> -->
      <el-table-column prop="avatar" label="英雄头像" width="150">
        <!-- element-ui template自己定义怎样写这个显示的样式  table表格 自定义列模板 -->
        <template slot-scope="scope"> 
          <!-- scope.row 获取到这一行的参数 -->
          <img :src="scope.row.avatar" style="height: 3rem"/>
        </template>
      
      </el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类" width="150"></el-table-column> -->
      
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/heroes/edit/' + scope.row._id)">编辑</el-button>
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
      const res = await this.$request.get("rest/heroes");
      console.log(res);
      this.items = res.data;
      
    },
  async remove(row) {
      // 到elementui找 messageBox 弹框
      this.$confirm('此操作将永久删除' + row.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$request.delete('rest/heroes/' + row._id);
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