<template>
  <div>
    <h1>{{this.$route.params.id? '编辑': '新建'}}广告位</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <el-form-item label="广告主题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="广告位">
        <el-button @click="model.items.push({})" type="small">添加广告位</el-button>
      <el-row type="flex" style="flex-wrap: wrap; margin-bottom: 1rem;" :gutter="20">
        <el-col :md="12" v-for="(item, index) in model.items" :key="index" style="margin-top: 1rem;">
          <el-form-item label="广告位图片">
            <el-upload 
                  class="avatar-uploader" 
                  :action="$request.defaults.baseURL + '/upload'" 
                  :show-file-list="false" :on-success="res => $set(item, 'image', res.url)">
                  <!-- 这个方法虽然能赋值上去但是显示不出来 得显示的痛vue给的赋值方法（当一开始类没有这个属性的时候）
                     :on-success="res => item.icon = res.url" -->
                  <!-- :on-success="res => $set(item, 'icon', res.url)"  -->
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item label="广告位链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form-item>
      
      <!-- 修改 删除 -->
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
        // 单个英雄的属性
        model: {
          title: '',
          items: []
        }
        // 分类 
        // categories: [],
      }
    },

    methods: {
      // 头像上传 
      // afterUpload(res) {
      //   console.log(res.url)
      //   this.model.avatar = res.url
      //   // this.$set(this.model, 'icon', res.url)

      // },

      // 定义一个res 以参数id作为新建和编辑分类判断条件
      // 当存在id的时候 进行的是编辑操作
      // 当不存在id的时候 进行的新建操作  新建操作时 当添加的输入框为空是不能进行分类添加的
      async save() {
        let res;
        if (this.$route.params.id) {
          res = await this.$request.put(
            "rest/ads/" + this.$route.params.id,
            this.model
          );
          this.$router.push("/ads/list");
          // console.log(res);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          if (this.model.title) {
            res = await this.$request.post("rest/ads", this.model);
            console.log(res);
            this.$router.push("/ads/list");
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
          "rest/ads/" + this.$route.params.id
        );
        this.model = res.data;
        // 同名 覆盖 没有的加上去
        // this.model = Object.assign({}, this.model, res.data)
      },

      // 获取父级分类标题 存在子分类的就是父类标题
      // async fetchCategories() {
      //   const res = await this.$request.get("rest/categories")
      //   // 这样进行赋值 属性有可能加不进去  加不进去的话 用下面的一个方法
      //   this.categories = res.data;
      // },
    },

    created() {
      // && 前面的方法正确之后再执行 &&后面的方法
      // 将修改id对应的name在页面上回显出来
      this.$route.params.id && this.fetch()
      // 获取父级分类标题 因为是无限制的父子辩题 所以每一个标题都是父级标题
      // this.fetchCategories()
      // 获取装备 
      // this.fetchItems()
    }
  }

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

  .el-rate {
    margin-top: 0.6rem;
  }
</style>