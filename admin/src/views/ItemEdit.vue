<template>
  <div>
    <h1>{{this.$route.params.id? '编辑': '新建'}}装备</h1>
    <el-form @submit.native.prevent="save" label-width="50px">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option v-for="item in parents" 
                     :key="item._id"
                     :label="item.name"
                     :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- <el-input v-model="model.icon"></el-input> -->
        <!-- action自带的ajax请求 必须用完整的路径 -->
        <el-upload
          class="avatar-uploader"
          :action="$request.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    // 照片上传 
    afterUpload(res) {
      // console.log(res.url)
      this.$set(this.model, 'icon', res.url)
      
    },

    // 定义一个res 以参数id作为新建和编辑分类判断条件
    // 当存在id的时候 进行的是编辑操作
    // 当不存在id的时候 进行的新建操作  新建操作时 当添加的输入框为空是不能进行分类添加的
    async save() {
      let res;
      if (this.$route.params.id) {
        res = await this.$request.put(
          "rest/items/" + this.$route.params.id,
          this.model
        );
        this.$router.push("/items/list");
        // console.log(res);
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        if (this.model.name) {
          res = await this.$request.post("rest/items", this.model);
          console.log(res);
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });
        } else {
          this.$message({
            type: "fail",
            message: "不好意思先生，请输入您要添加的分类名称"
          });
        }
      }
    },
    // 将修改id对应的name在页面上回显出来 方法 是根据id到后台取出内容
    async fetch() {
      const res = await this.$request.get(
        "rest/items/" + this.$route.params.id
      );
      // console.log(res);
      this.model = res.data;
    }
  },
  created() {
    // && 前面的方法正确之后再执行 &&后面的方法
    // 将修改id对应的name在页面上回显出来
    this.$route.params.id && this.fetch();
    // 获取父级分类标题 因为是无限制的父子辩题 所以每一个标题都是父级标题
    // this.fetchParents();
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>