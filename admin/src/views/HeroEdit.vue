<template>
  <div>
    <h1>{{this.$route.params.id? '编辑': '新建'}}英雄</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="base_info">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" placeholder="请选择" multiple style="width: 130px;">
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score v-model="model.scores.difficult">
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills">
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack">
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive">
            </el-rate>
          </el-form-item>
          <!-- 可多选 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 可多选 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- <el-input v-model="model.icon"></el-input> -->
            <!-- action自带的ajax请求 必须用完整的路径 -->
            <el-upload class="avatar-uploader" :action="$request.defaults.baseURL + '/upload'" :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" type="small" style="margin-bottom: 1rem;"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index" style="margin-bottom: 1rem;">
              <el-form-item label="技能名字">
                <el-input type="text" v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload 
                  class="avatar-uploader" 
                  :action="$request.defaults.baseURL + '/upload'" 
                  :show-file-list="false" :on-success="res => $set(item, 'icon', res.url)">
                  <!-- 这个方法虽然能赋值上去但是显示不出来 得显示的痛vue给的赋值方法（当一开始类没有这个属性的时候）
                     :on-success="res => item.icon = res.url" -->
                  <!-- :on-success="res => $set(item, 'icon', res.url)"  -->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="技能小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger"
                  @click="model.skills.splice(index, 1)"
                  style="margin-left: 8rem;">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

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
          name: '',
          avatar: '',
          title: '',
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0
          },
          skills: []
        },
        // 单独的属性 只是英雄用到了 进行关联
        // 装备
        items: [],
        // 分类 
        categories: [],

      };
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
            "rest/heroes/" + this.$route.params.id,
            this.model
          );
          this.$router.push("/heroes/list");
          // console.log(res);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          if (this.model.name) {
            res = await this.$request.post("rest/heroes", this.model);
            console.log(res);
            this.$router.push("/heroes/list");
            this.$message({
              type: "success",
              message: "保存成功"
            });
          } else {
            this.$message({
              type: "fail",
              message: "不好意思先生，请输入您要添加的英雄名称"
            });
          }
        }
      },
      
      // 将修改id对应的name在页面上回显出来 方法 是根据id到后台取出内容
      async fetch() {
        const res = await this.$request.get(
          "rest/heroes/" + this.$route.params.id
        );
        // console.log(res);
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
      
      // 获取装备
      async fetchItems() {
        const res = await this.$request.get("rest/items")
        // 这样进行赋值 属性有可能加不进去  加不进去的话 用下面的一个方法
        this.items = res.data;
        console.log(res)

      },

    },
    created() {
      // && 前面的方法正确之后再执行 &&后面的方法
      // 将修改id对应的name在页面上回显出来
      this.$route.params.id && this.fetch()
      // 获取父级分类标题 因为是无限制的父子辩题 所以每一个标题都是父级标题
      this.fetchCategories()
      // 获取装备 
      this.fetchItems()
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