<template>
  <div class="main">
    <div class="m-wrapper">
      <leftNav :tabIndex="1"></leftNav>
      <div class="user-base-info">
        <div class="user-base-info-title">基本信息</div>
        <Form ref="password" :label-width="102" :rules="passwordRule" :model="passwordInfo">
          <FormItem label="原密码" prop="old">
            <Input v-model="passwordInfo.old" type="password"></Input>
          </FormItem>
          <FormItem label="新密码" prop="new">
            <Input v-model="passwordInfo.new" type="password"></Input>
          </FormItem>
          <FormItem label="确认新密码" prop="newAgain">
            <Input v-model="passwordInfo.newAgain" type="password"></Input>
          </FormItem>
          <div style="text-indent:102px;color:red;font-size:12px;">*强烈建议密码同时包含数字和英文字符</div>
          <FormItem>
            <Button
              class="submit-btn"
              type="primary"
              @click="changePassword()"
              :loading="changePasswordLoading"
            >{{submitBtnText}}</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from './components/leftNav'
export default {
  name: 'edit',
  data() {
    const newPwd = (rule, value, callback) => {
      console.log(value, rule)
      if (value === '') {
        callback(new Error('新密码不得为空'))
      } else {
        if (this.passwordInfo.newAgain !== '') {
          // 对第二个密码框单独验证
          this.$refs.password.validateField('newAgain')
        }
        callback()
      }
    }
    const newAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不得为空'))
      } else {
        if (this.passwordInfo.new !== value) {
          callback(new Error('两次输入密码不一致'))
        }
        callback()
      }
    }
    return {
      submitBtnText: '提交',
      passwordInfo: {
        old: '',
        new: '',
        newAgain: ''
      },
      passwordRule: {
        old: [{ required: 'true', message: '原密码不得为空', trigger: 'blur' }],
        new: [{ validator: newPwd, trigger: 'blur' }],
        newAgain: [{ validator: newAgain, trigger: 'blur' }]
      },
      changePasswordLoading: false
    }
  },
  created() {
    document.title = '基本信息 - EasyAPI'
  },
  components: {
    leftNav
  },
  methods: {
    changePassword() {
      this.$refs.password.validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
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

      >>>.ivu-form {
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

        >button {
          width: 100px;
          border-color: #3dc1d6;
          color: #3dc1d6;
        }
      }
    }
  }
}
</style>
