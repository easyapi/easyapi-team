<template>
  <div class="main">
    <div class="m-wrapper">
      <leftNav :tabIndex="2"></leftNav>
      <div class="user-base-info">
        <div class="user-base-info-title">账号绑定</div>
        <div class="user-base-accountBind-list">
          <div class="user-base-accountBind-item">
            <div class="user-base-accountBind-item-left">
              <h4>
                <img src="../../assets/images/weixin.jpg" />
                <span>微信</span>
              </h4>
              <p v-if="wechatInfo == null">当前未绑定微信账号</p>
              <p v-else>
                当前已绑定
                <img
                  :src="wechatInfo.imageUrl"
                  alt=""
                  style="border-radius: 50%"
                />{{ wechatInfo.displayName }}
              </p>
            </div>
            <div class="user-base-accountBind-item-right">
              <a
                v-if="wechatInfo == null"
                href="https://account-api.easyapi.com/auth/wechat"
                >绑定</a
              >
              <a
                v-else
                href="javascript:;"
                @click="unlink(wechatInfo.thirdPartyId)"
                >解绑</a
              >
            </div>
          </div>
          <div class="user-base-accountBind-item border-none">
            <div class="user-base-accountBind-item-left">
              <h4>
                <img src="../../assets/images/qq.jpg" />
                <span>QQ</span>
              </h4>
              <p v-if="qqInfo == null">当前未绑定QQ账号</p>
              <p v-else>当前已绑定QQ账号</p>
            </div>
            <div class="user-base-accountBind-item-right">
              <a
                v-if="qqInfo == null"
                href="https://account-api.easyapi.com/auth/qq"
                >绑定</a
              >
              <a v-else href="javascript:;" @click="unlink(qqInfo.thirdPartyId)"
                >解绑</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from "./moudles/left";
import { getUserThirdPartyList, unbindThirdParty } from "../../api/third-party";
export default {
  name: "user-thirdParty",
  data() {
    return {
      wechatInfo: null,
      qqInfo: null,
    };
  },
  created() {
    document.title = "三方登录 - 个人设置 - EasyAPI";
    this.getUserThirdPartyList();
  },
  components: {
    leftNav,
  },
  methods: {
    getUserThirdPartyList() {
      getUserThirdPartyList().then((res) => {
        if (res.data.code === 1) {
          for (let item of res.data.content) {
            if (item.providerId == "wechat") {
              this.wechatInfo = item;
            }else{
              this.wechatInfo = null;
            }
            if (item.providerId == "qq") {
              this.qqInfo = item;
            }else{
              this.qqInfo = null;
            }
          }
        }else{
          this.wechatInfo = null;
          this.qqInfo = null;
        }
      });
    },
    //解绑
    unlink(thirdPartyId) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要解绑吗？",
        onOk: () => {
          unbindThirdParty(thirdPartyId)
            .then((res) => {
              if (res.data.code === 1) {
                this.$Message.success(res.data.message);
                this.getUserThirdPartyList();
              }
            })
            .catch((error) => {
              this.$Message.error(error.response.data.message);
            });
        },
      });
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
      .user-base-accountBind-list{
          width 623px;
          padding 0 20px;
      }
      .border-none{
          border:none !important;
      }
      .user-base-accountBind-item{
          width 100%;
          padding 20px 0
          border-bottom 1px solid #e8eaec;
          display flex;
          .user-base-accountBind-item-left{
              width 80%
          }
        img{
            width 24px;
            height 24px;
            vertical-align middle;
            margin-right 10px
        }
        span {
            font-weight bold;
            font-size 14px;
        }
        p{
            margin-top:15px;
        }
        .user-base-accountBind-item-right{
            width 20%;
            text-align center
            margin:auto 0;
        }
      }
    }
  }
}
</style>
