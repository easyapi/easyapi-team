<template>
  <div class="main">
    <div class="m-wrapper">
      <leftNav :tabIndex="0"></leftNav>
      <div class="user-base-info">
        <div class="user-base-info-title">基本信息</div>
        <Form ref="accountInfo" :label-width="102">
          <FormItem label="个人头像" prop="name">
            <div style="height: 72px; width: 100%; display: flex">
              <img
                :src="this.$store.getters.photo"
                alt
                class="user-base-info-head-img"
              />
              <div class="upload-head-img">
                <Upload
                  action
                  :before-upload="handleUploadImg"
                  accept="image/jpeg, image/png, image/jpg"
                  :format="['jpg', 'png', 'jpeg']"
                >
                  <Button size="default">选择头像</Button>
                </Upload>
                <div style="color: #999">
                  你可以选择png/jpg图片（200x200）作为个人头像
                </div>
              </div>
            </div>
          </FormItem>
          <FormItem label="账号" prop="username">
            <Input v-model="accountInfo.username" placeholder disabled />
          </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input v-model="accountInfo.nickname" placeholder="请输入昵称" />
          </FormItem>
          <FormItem label="手机号码" prop="mobile">
            <Input v-model="accountInfo.mobile" placeholder="请输入手机号码" />
          </FormItem>
          <FormItem label="常用语言" prop="language">
            <Input
              v-model="accountInfo.language"
              placeholder="例如：Java、Ruby、Objective-C"
            />
          </FormItem>
          <FormItem label="目前职业" prop="profession">
            <Input
              v-model="accountInfo.profession"
              placeholder="例如：Java工程师，iOS工程师，Android工程师"
            />
          </FormItem>
          <FormItem label="个人介绍" prop="intro">
            <Input
              v-model="accountInfo.intro"
              type="textarea"
              :rows="4"
              placeholder="介绍一下自己"
            />
          </FormItem>
          <FormItem>
            <Button
              class="submit-btn"
              type="primary"
              @click="handleSubmit()"
              :loading="submitLoading"
              >{{ submitBtnText }}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from "./moudles/left";
import { updateAccountInfo } from "../../api/account";
import { mapGetters } from "vuex";

export default {
  name: "user-edit",
  data() {
    return {
      submitBtnText: "提交",
      submitLoading: false,
      photo: "",
    };
  },
  created() {
    document.title = "基本信息 - 个人设置 - EasyAPI";
    this.photo = this.$store.getters.photo;
  },
  components: {
    leftNav,
  },
  computed: {
    ...mapGetters(["accountInfo"]),
  },
  methods: {
    handleSubmit() {
      this.submitLoading = true;
      updateAccountInfo(this.accountInfo)
        .then((res) => {
          this.submitLoading = false;
        })
        .catch((err) => {
          this.submitLoading = false;
        });
    },
    handleUploadImg(file) {
      return false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.main {
  background: #f5f5f5;
  min-height: calc(100vh - 50px);
  box-sizing: border-box;

  .m-wrapper {
    padding-top: 50px;
    max-width: 960px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .user-base-info {
      width: 623px;
      background-color: #ffffff;

      .user-base-info-title {
        line-height: 60px;
        width: 90px;
        text-align: right;
        color: #0f0f0f;
        font-size: 16px;
      }

      >>> .ivu-form {
        .ivu-form-item {
          align-items: center;
          display: flex;

          .ivu-form-item-label {
            font-size: 14px;
          }

          .ivu-form-item-content {
            margin-left: 0 !important;
            flex: 1;

            .ivu-input {
              width: 80%;
            }

            button.submit-btn {
              margin-left: 102px;
              background-color: #1bc0d6;
              border-color: #1bc0d6;
            }
          }
        }
      }

      .user-base-info-head-img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
      }

      .upload-head-img {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;

        > button {
          width: 100px;
          border-color: #3dc1d6;
          color: #3dc1d6;
        }
      }
    }
  }
}
</style>
