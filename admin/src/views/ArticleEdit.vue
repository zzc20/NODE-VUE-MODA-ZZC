<template>
  <div>
    <h1>{{this.$route.params.id? '编辑': '新建'}}文章</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <el-form-item label="文章主题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select placeholder="请选择" v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容">
        <!-- 自定义上传图片 将图片放到服务器/本地的路径 -->
        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="model.area">
        </vue-editor>
      </el-form-item>

      <!-- 修改 删除 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">{{this.$route.params.id? '修改': '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor"
  export default {
    data() {
      return {
        // 单个英雄的属性
        model: {
          // title: '',
          // area: ''
        },
        // 分类 
        categories: [],


      }
    },
    //引入的 插件 富文本编辑器
    components: {
      VueEditor
    },

    methods: {
      // 头像上传 
      afterUpload(res) {
        console.log(res.url)
        this.model.avatar = res.url
        // this.$set(this.model, 'icon', res.url)

      },

      // 定义一个res 以参数id作为新建和编辑分类判断条件
      // 当存在id的时候 进行的是编辑操作
      // 当不存在id的时候 进行的新建操作  新建操作时 当添加的输入框为空是不能进行分类添加的
      async save() {
        let res;
        if (this.$route.params.id) {
          res = await this.$request.put(
            "rest/articles/" + this.$route.params.id,
            this.model
          );
          this.$router.push("/articles/list");
          // console.log(res);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          if (this.model.title) {
            res = await this.$request.post("rest/articles", this.model);
            console.log(res);
            this.$router.push("/articles/list");
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
          "rest/articles/" + this.$route.params.id
        );
        console.log(res.data);
        this.model = res.data;
        // 同名 覆盖 没有的加上去
        // this.model = Object.assign({}, this.model, res.data)
      },

      // 获取父级分类标题 存在子分类的就是父类标题
      async fetchCategories() {
       const res = await this.$request.get("rest/categories")
        // 这样进行赋值 属性有可能加不进去  加不进去的话 用下面的一个方法
        this.categories = res.data;
      },

      // 富文本编辑器 插件 用于图片上传的方法
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        const formData = new FormData();
        formData.append("file", file);
        // 请求服务端定义好的路径进行存储
        const res = await this.$request.post('/upload', formData)
        // Get url from response
        // 一定要嵌套到 "image" 这是个固定值 表示嵌套到 图片的标签里面
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
        // axios({
        //   url: "https://fakeapi.yoursite.com/images",
        //   method: "POST",
        //   data: formData
        // })
        //   .then(result => {
        //     let url = result.data.url; // Get url from response
        //     Editor.insertEmbed(cursorLocation, "image", url);
        //     resetUploader();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    }, 
    created() {
      // && 前面的方法正确之后再执行 &&后面的方法
      // 将修改id对应的name在页面上回显出来
      this.$route.params.id && this.fetch()
      // 获取父级分类标题 因为是无限制的父子辩题 所以每一个标题都是父级标题
      this.fetchCategories()
      // 获取装备 
      // this.fetchItems()
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
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-rate {
    margin-top: 0.6rem;
  }
</style>