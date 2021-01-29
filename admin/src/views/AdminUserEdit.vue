<template>
  <div>
    <h1>{{this.$route.params.id? '编辑': '新建'}}用户</h1>
    <el-form @submit.native.prevent="save">  
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" for="password">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{this.$route.params.id? '修改': '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        type: Object
      },
    };
  },

  methods: {
    // 定义一个res 以参数id作为新建和编辑分类判断条件
    // 当存在id的时候 进行的是编辑操作
    // 当不存在id的时候 进行的新建操作  新建操作时 当添加的输入框为空是不能进行分类添加的
    async save() {
        let res;
        if (this.$route.params.id) {
          res = await this.$request.put(
            "rest/admin_users/" + this.$route.params.id,
            this.model
          );
          this.$router.push("/admin_users/list");
          // console.log(res);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          if (this.model.username) {
            res = await this.$request.post("rest/admin_users", this.model);
            console.log(res);
            this.$router.push("/admin_users/list");
            this.$message({
              type: "success",
              message: "保存成功"
            });
          } else {
            this.$message({
              type: "fail",
              message: "不好意思先生，请输入您要添加的文章名称"
            });
          }
        }
      },
    // 将修改id对应的name在页面上回显出来 方法 是根据id到后台取出内容
    async fetch() {
      const res = await this.$request.get(
        "rest/admin_users/" + this.$route.params.id
      );
      // console.log(res);
      this.model = res.data;
    },

  },
  created() {
    // && 前面的方法正确之后再执行 &&后面的方法
    // 将修改id对应的name在页面上回显出来
    this.$route.params.id && this.fetch();
  }
};
</script>

<style>
</style>