<template>
  <div class="parent">
    <el-card class="el-card">
      <el-form @submit.native.prevent="save" label-width="25%">
        <el-form-item label="登录名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        type: Object
      }
    }
  },
  methods: {
    async save() {
      const res = await this.$request.post('/login', this.model)
      // console.log(res.data.token);
      localStorage.setItem('token', res.data.token)
      if(res.data.token) {
        this.$router.push("/");
      }
      
    }
  }
}
</script>

<style>
  .el-card {
    width: 300px;
    align-self: center;
    align-content: center;
    align-items: center;
    margin-top: 8%;
    margin-left: 65%;
    
  }
</style>