<template>
  <div class="m-wrapper">
    <section>
      <h3>账户余额</h3>
      <div class="m">
        <p class="amount">
          {{ accountGolbalInfo.balance.toFixed(2) }}
          <span class="amount-unit">元</span>
        </p>
        <router-link to="/bill">账户明细</router-link>
        <!-- <router-link to="/bill">充值列表</router-link> -->
        <span class="invoice" @click="jumpInvoice">索取发票</span>
        <Poptip placement="top" trigger="hover">
          <img class="invoiceQR" src="../assets/images/scan.png" alt/>
          <div slot="title" class="Code-title">手机端索取发票</div>
          <div class="Code-picture" slot="content">
            <img
              :src="'https://qr.topscan.com/api.php?text=' + picture"
              alt
              style="width: 100px; height: 100px"
            />
          </div>
        </Poptip>
      </div>
      <ea-button class="team-btn" text="账户充值" @click="toRecharge"/>
    </section>
    <section>
      <h3>余额预警</h3>
      <div class="m">
        <div class="warn-row grid">
          <p class="warn-row__key">状态:</p>
          <i-switch class="warn-row__v" v-model="needMoneyWarn"></i-switch>
        </div>
        <div class="warn-row grid">
          <p class="warn-row__key">预警阔值:</p>
          <div class="warn-row__v">
            <Input
              class="warn-input"
              :disabled="!needMoneyWarn"
              size="small"
              v-model="moneyWarnSize"
            />
            <p class="_unit">元</p>
          </div>
        </div>
      </div>
      <ea-button
        class="team-btn"
        text="确定"
        :space="true"
        @click="setMoneyWarn"
      />
    </section>
    <section>
      <h3>团队信息</h3>
      <div class="m">
        <div class="team-info grid">
          <div class="team-icon">
            <img :src="accountGolbalInfo.team.img + '!icon.jpg'" alt/>
          </div>
          <div>
            <ul class="team-info_list">
              <li>团队名称: {{ accountGolbalInfo.team.name }}</li>
              <li>行业: {{ accountGolbalInfo.team.industry }}</li>
              <li>
                创建时间: {{ accountGolbalInfo.team.addTime | dateFormat }}
              </li>
              <li>团队URL: {{ accountGolbalInfo.team.url }}</li>
            </ul>
          </div>
        </div>
        <p v-if="role == '管理员' || role == '创建人'" class="tip">
          可以修改团队名称, 团队描述和所属行业;
          团队信息会在团队列表和团队主页中显示。
        </p>
      </div>
      <ea-button
        v-if="role == '管理员' || role == '创建人'"
        class="team-btn"
        text="修改团队信息"
        :space="true"
        @click="toTeamChange"
      />
    </section>
    <section v-if="role == '创建人'">
      <h3>转让团队</h3>
      <div class="m">
        <p>
          所有者: {{ accountGolbalInfo.team.user.nickname }} &nbsp;&nbsp;{{
          accountGolbalInfo.team.user.username
          }}
        </p>
        <p class="tip">
          转让其他成员后，将无法再管理当前团队。该操作无法撤销。
        </p>
      </div>
      <ea-button
        class="team-btn"
        text="转让团队"
        :space="true"
        @click="teamTransfer = true"
      />
    </section>
    <section v-if="role == '创建人'">
      <h3>解散团队</h3>
      <div class="m">
        <p class="tip">
          解散后所有数据都将被彻底删除, 此操作无法撤销, 请谨慎。
        </p>
      </div>
      <ea-button
        class="team-btn"
        text="解散团队"
        type="red"
        :space="true"
        @click="teamClose = true"
      />
    </section>
    <section v-if="role == '成员' || role == '管理员'">
      <h3>退出团队</h3>
      <div class="m">
        <p class="tip">
          退出后所有数据都将被彻底删除, 此操作无法撤销, 请谨慎。
        </p>
      </div>
      <ea-button
        class="team-btn"
        text="退出团队"
        type="red"
        :space="true"
        @click="quitTeam"
      />
    </section>

    <!-- 充值 -->
    <ea-dialog
      title="账户充值"
      :open="recharge"
      width="600"
      @visibleChange="rcSDVisible"
    >
      <Row>
        <Col class="bottom-10 top-5" span="4">充值金额:</Col>
        <Col class="bottom-10 top-5" span="20">
          <Input
            class="pay-amount"
            v-model="rechargeAmount"
            placeholder="请输入充值金额"
          />
        </Col>
        <Col class="bottom-10 top-5" span="4">支付方式:</Col>
        <Col class="bottom-10 top-5" span="20">
          <Row>
            <Col span="8" class="type-wrapper">
              <div
                @click="setRechargeType(1)"
                :class="['zf-type', { 'p-active': rechargeType == 1 }]"
              >
                <img class="zfb" src="../assets/images/alipay.png" alt/>
              </div>
            </Col>
            <Col span="8" class="type-wrapper">
              <div
                @click="setRechargeType(2)"
                :class="['zf-type', { 'p-active': rechargeType == 2 }]"
              >
                <img class="wxzf" src="../assets/images/wxpay.png" alt/>
              </div>
            </Col>
            <Col span="8" class="type-wrapper">
              <div
                @click="setRechargeType(3)"
                :class="['zf-type', { 'p-active': rechargeType == 3 }]"
              >
                <img class="api-zf" src="../assets/images/apipay.png" alt/>
              </div>
            </Col>
          </Row>
          <p class="top-20 bottom-5 tips">
            如果有问题, 请发送邮件到leida@easyapi.com处理。 谢谢您的支持
          </p>
          <ea-button
            class="top-20 recharge-btn bottom-5"
            text="立即支付"
            @click="payNow"
          />
        </Col>
      </Row>
    </ea-dialog>
    <ea-dialog
      title="API充值"
      :open="apiRecharge"
      width="500"
      @visibleChange="arSDVisible"
    >
      <p class="top-10 bottom-10">
        为了更好的为您的团队，提供实时充值服务，我们提供了
        <span class="t-blue">API充值接口.</span>
      </p>
      <Row>
        <Row style="margin-bottom: 30px">
          <Col class="bottom-10 top-5" span="3">
            <div class="circle">01</div>
          </Col>
          <Col class="bottom-10 top-10" span="21">
            <p>
              请您，使用支付宝
              <span class="t-blue">单笔转账到支付宝账户接口</span>
              <br/>对我们的公司帐号leida@daoqun.net, 进行转账
            </p>
          </Col>
        </Row>
        <Row>
          <Col class="bottom-10 top-5" span="3">
            <div class="circle">02</div>
          </Col>
          <Col class="bottom-10 top-5" span="21">
            <p>
              转账成功后，请调用我们的
              <span class="t-blue">支付宝转账确认接口</span>
              <br/>如果传递的支付宝订单号正确，则自动为您充值到帐号上。
            </p>
          </Col>
        </Row>
      </Row>
    </ea-dialog>

    <!-- 转让团队 -->
    <ea-dialog
      title="转让团队"
      :open="teamTransfer"
      width="300"
      @visibleChange="ttSDVisible"
    >
      <Row>
        <Col class="bottom-10 top-5" span="8">选择成员:</Col>
        <Col class="bottom-10 top-5" span="16">
          <Select v-model="transferMember" size="small">
            <Option
              v-for="item in members"
              :value="item.user.username"
              :key="item.userTeamId"
            >{{ item.user.nickname }}
            </Option>
          </Select>
        </Col>
      </Row>
      <ea-button
        class="close-btn top-10 bottom-5"
        text="确认转让"
        @click="confirmTransferTeam"
      />
    </ea-dialog>

    <!-- 团队信息 -->
    <ea-dialog
      title="修改团队信息"
      :open="teamInfoChange"
      width="450"
      @visibleChange="tiSDVisible"
    >
      <Row>
        <Col class="bottom-10 top-5" span="8">团队Logo:</Col>
        <Col class="bottom-10 top-5" span="16">
          <div class="ti-img">
            <img :src="teamIcon" alt/>
            <input
              type="file"
              name="teamIcon"
              id="teamIcon"
              @change="uploadImg"
            />
          </div>
        </Col>
        <Col class="bottom-10 top-5" span="8">团队名称:</Col>
        <Col class="bottom-10 top-5" span="16">
          <Input v-model="teamName" placeholder="请输入团队名称"/>
        </Col>
        <Col class="bottom-10 top-5" span="8">行业类别:</Col>
        <Col class="bottom-10 top-5" span="16">
          <Select class="type-select" v-model="teamType" size="small">
            <Option v-for="item in industries" :value="item" :key="item">
              {{ item }}
            </Option>
          </Select>
        </Col>
        <Col class="bottom-10 top-5" span="8">团队URL:</Col>
        <Col class="bottom-10 top-5" span="16">
          <Input
            v-model="teamUrl"
            placeholder="团队URL"
            @on-blur="checkUrl"
          >
            <span slot="prepend">https://</span>
            <span slot="append">.easyapi.com</span>
          </Input>
          <!--<p v-if="baseUrlOccupy">-->
          <!--<small class="err">该团队URL已经被占用</small>-->
          <!--</p>-->
        </Col>
        <Col class="bottom-10 top-5" span="8">一句话描述:</Col>
        <Col class="bottom-10 top-5" span="16">
          <Input v-model="teamDes" placeholder="请输入团队描述"/>
        </Col>
      </Row>

      <ea-button
        class="close-btn top-10 bottom-5"
        text="修改团队信息"
        @click="changeTeamInfo"
      />
    </ea-dialog>

    <!-- 解散团队 -->
    <ea-dialog
      title="解散团队"
      :open="teamClose"
      width="300"
      @visibleChange="tcSDVisible"
    >
      <p class="tips red">解散团队后，所有内容都会被立即删除，不可恢复。</p>
      <p class="tips grey">如果你确定要这样做，请在下面输入账户密码确认</p>
      <Input
        class="top-10"
        v-model="phone"
        placeholder="请输入手机以获取验证码"
      >
        <Button class="capt-btn" slot="append" @click="getCaptcha"
        >获取验证码
        </Button
        >
      </Input>
      <Input
        class="top-10 captcha"
        v-model="captcha"
        :disabled="!captchaUse"
        placeholder="请输入验证码"
      />
      <ea-button
        class="close-btn top-10 bottom-5"
        text="解散团队"
        @click="delTeam"
      />
    </ea-dialog>
  </div>
</template>

<script>
  import {
    getAccountMoney,
    getCaptcha,
    moneyWarn,
    teamUrl,
    quitTeam,
    transferTeam,
  } from "../api/api";
  import {getTeamUserList, checkTeamUrl} from "../api/team";
  import {getQiniuToken} from "../api/qiniu";
  import {getInvoiceToken} from "../api/invoice";
  import {alipay, wxpay} from "../api/pay";
  import $ from "jquery";
  import md5 from "js-md5";
  import SockJS from "sockjs-client";
  import Stomp from "stompjs";

  export default {
    name: "Account",
    props: ["propMembers"],
    data: function () {
      return {
        members: [],
        fapiaoToken: "",
        picture: "",
        accountGolbalInfo: {
          balance: 0,
          team: {
            img: "",
            name: "",
            url: "",
            description: "",
            industry: "",
            user: {
              nickname: "",
              username: "",
            },
          },
        },
        // 帐号角色
        role: "",

        // 充值预警
        needMoneyWarn: false,
        moneyWarnSize: 0,

        //充值
        rechargeType: 1,
        rechargeAmount: 100,

        recharge: false,
        apiRecharge: false,

        // team-info
        teamInfoChange: false,
        teamIcon: "",
        teamName: "",
        teamType: "",
        teamUrl: "",
        newTeamUrl: "",
        teamDes: "",
        industries: [
          "互联网",
          "新媒体",
          "技术与服务",
          "娱乐",
          "生活服务",
          "教育",
          "制造业",
          "家具建材",
          "金融服务",
          "旅行与交通",
          "通讯",
          "医疗健康",
          "文化与设计",
          "其他",
        ],

        // team-transfer
        teamTransfer: false,
        transferMember: "",

        // team-close
        teamClose: false,
        phone: "",
        captcha: "",
        captchaUse: false,
        codeShow: false,
        codeHas: false,
        timer: null,
        visible: false,
      };
    },
    watch: {
      "$store.state.user.userTeam": function () {
        this.getTeamInfo();
        this.role = this.$store.state.user.userTeam.type;
      },
    },
    computed: {},
    created: function () {
      this.$store.dispatch("GetUserInfo");
      this.getTeamInfo();
      if ((this.role = this.$store.state.user.userTeam.type)) {
        this.role = this.$store.state.user.userTeam.type;
      }
    },
    mounted: function () {
      this.getInvoiceToken();
      document.title = "团队账户 - EasyAPI";
      this.getTeamUserList();
    },
    methods: {
      // 获取成员列表
      getTeamUserList: function () {
        getTeamUserList(this.$store.state.user.team.id).then((res) => {
          this.members = res.data.content;
        });
      },
      /**
       * 获取发票Token
       */
      getInvoiceToken() {
        let encryption = md5("" + this.$store.state.user.team.id);
        getInvoiceToken(encryption.toUpperCase()).then((res) => {
          if (res.data.code == 1) {
            this.fapiaoToken = res.data.content;
          }
        });
      },
      //跳转发票
      jumpInvoice() {
        this.getInvoiceToken();
        window.open(
          "https://fapiao-user-center-web.easyapi.com/?accessToken=" + this.fapiaoToken
        );
      },
      //生成二维码
      qrCode: function () {
        this.getInvoiceToken();
        this.picture = "https://fapiao-h5.easyapi.com?accessToken=" + this.fapiaoToken;
      },
      getTeamInfo: function () {
        if (!this.$store.state.user.team) {
          return;
        }
        this.$ajax({
          method: "GET",
          url: getAccountMoney,
          params: {
            teamId: this.$store.state.user.team.id,
          },
        }).then((res) => {
          if (res.data.code == 1) {
            this.accountGolbalInfo = res.data.content;
            // 设置预警值
            if (res.data.content.warningBalance > 0) {
              this.moneyWarnSize = res.data.content.warningBalance;
              this.needMoneyWarn = true;
            } else {
              this.needMoneyWarn = false;
            }
          }
        });
      },

      // 账户充值
      toRecharge: function () {
        this.recharge = true;
      },

      // 选择充值方式
      setRechargeType: function (type) {
        this.rechargeType = type;
      },

      // 立即支付
      payNow: function () {
        switch (this.rechargeType) {
          case 1:
            this.aliPay();// 支付宝
            break;
          case 2:
            this.wxpay();// 微信支付
            break;
          case 3:
            this.recharge = false;
            this.apiRecharge = true;
            break;
        }
      },

      aliPay: function () {
        if (!this.rechargeAmount) {
          this.$Message.error("请输入充值金额");
          return;
        }
        alipay(Number(this.rechargeAmount)).then((res) => {
          if (res.data.code) {
            let html = res.data.alipay;
            let form = $(html);
            form.attr("target", "_blank");
            $("#app").append(form);
            this.recharge = false;
            this.$Modal.confirm({
              title: "提示",
              content:
                "<p>请您在新打开的页面上完成充值。<br>充值完成后，根据您的情况点击下面按钮。</p>",
              okText: "充值成功",
              cancelText: "充值失败",
              onOk: () => {
                this.$Modal.remove();
                this.getTeamInfo();
              },
            });
          }
        }).catch((err) => {
          this.$Message.error("接口错误，请稍后再试");
        });
      },
      wxpay: function () {
        let _that = this;
        if (!this.rechargeAmount) {
          this.$Message.error("请输入充值金额");
          return;
        }
        wxpay(Number(this.rechargeAmount)).then((res) => {
          if (res.data.code === 1) {
            let url = res.data.codeUrl;
            this.recharge = false;
            this.$Modal.confirm({
              title: "微信扫码支付",
              content: `<div class="wx-pay"><p class="wx-pay_amount">支付${_that.rechargeAmount}元</p><p><img src="http://qr.topscan.com/api.php?text=${url}"></img></p><p>请使用微信扫描二维码以完成支付</p></div>`,
              okText: "",
              cancelText: "",
              onOk: () => {
                _that.$Modal.remove();
                _that.getTeamInfo();
              },
            });
            let socket = new SockJS(
              "https://account-api.easyapi.com/easyapi-socket"
            );
            let stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
              stompClient.subscribe(
                "/topic/wxpay/" + _that.accountGolbalInfo.team.user.id,
                (message) => {
                  var json = JSON.parse(message.body);
                  _that.$Modal.remove();
                  _that.$Message.success("充值成功！！");
                }
              );
            });
          }
        }).catch((err) => {
          this.$Message.error("接口错误，请稍后再试");
        });
      },

      // 设置余额预警
      setMoneyWarn: function () {
        let s = this.needMoneyWarn ? this.moneyWarnSize : 0;
        this.$ajax({
          method: "PUT",
          url: moneyWarn + "/" + this.accountGolbalInfo.id,
          data: {
            id: this.accountGolbalInfo.id,
            warningBalance: s,
          },
          json: true,
        })
          .then((res) => {
            if (res.data.code === 1) {
              this.$Message.success("余额预警设置成功!");
            }
          })
          .catch(function (err) {
            this.$Message.success("余额预警设置失败!");
          });
      },

      // 展开修改团队信息
      toTeamChange: function () {
        this.teamInfoChange = true;
        this.teamIcon = this.accountGolbalInfo.team.img;
        this.teamName = this.accountGolbalInfo.team.name;
        this.teamType = this.accountGolbalInfo.team.industry;
        this.teamUrl = this.accountGolbalInfo.team.url;
        this.newTeamUrl = this.accountGolbalInfo.team.url;
        this.teamDes = this.accountGolbalInfo.team.description;
      },
      // 修改团队
      changeTeamInfo: function () {
        this.$ajax({
          method: "PUT",
          url: `${teamUrl}/${this.$store.state.user.team.id}`,
          data: {
            name: this.teamName,
            img: this.teamIcon,
            url: this.teamUrl,
            description: this.teamDes,
            industry: this.teamType,
          },
          json: true,
        })
          .then((res) => {
            if (res.data.code) {
              this.$Message.success("修改成功!");
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
          .catch(error => {
            console.log(error.response);
            this.$Message.error(error.response.data.message);
          });
      },

      // 检查团队URL是否合法
      async checkUrl() {
        if (this.teamUrl == this.newTeamUrl) {
          return;
        }
        await this.checkTeamUrl().catch((err) => {
          this.urlOccupy = true;
          this.$Message.error("团队URL已经被占用");
        });
      },

      checkTeamUrl(success, fail) {
        return new Promise((resolve, reject) => {
          checkTeamUrl(this.teamUrl)
            .then((res) => {
              if (res.data.code == 1) {
                resolve("团队URL可用");
              } else {
                reject("团队URL已存在");
              }
            })
            .catch((err) => {
              if (
                err.responseJSON.code == -1 ||
                err.responseJSON.message == "该编码已存在"
              ) {
                reject("团队URL已存在");
              }
            });
        });
      },

      // 转让团队
      confirmTransferTeam: function () {
        let user = this.$store.state.user;
        this.$ajax({
          method: "put",
          url: transferTeam.replace("#id#", user.team.id),
          data: {
            username: this.transferMember,
          },
        })
          .then((res) => {
            if (res.data.code) {
              this.$Message.success("转让成功!");
              this.teamTransfer = false;
              this.getTeamInfo();
            }
          })
          .catch(error => {
            this.$Message.error("请选择成员");
          });
      },

      //上传图片
      uploadImg: function (e) {
        this.$loadingStart();

        let f = e.target.files[0];
        $("#teamIcon").val();
        this.getQiniu().then((tokenRes) => {
          const qiNiuFileDomain = "https://qiniu.easyapi.com";
          //
          let res = JSON.parse(tokenRes);
          let token = res.upToken;
          //start to upload
          var xhr = new XMLHttpRequest();

          xhr.open("POST", "https://upload.qiniu.com/", true);

          var formData, startDate;

          formData = new FormData();
          formData.append("token", token);
          formData.append("file", f);
          formData.append("key", `${new Date().getTime()}`);

          // var taking

          xhr.upload.addEventListener(
            "progress",
            (evt) => {
              // if (evt.lengthComputable) {
              //     var nowDate = new Date().getTime();
              //     taking = nowDate - startDate;
              //     var x = (evt.loaded) / 1024;
              //     var y = taking / 1000;
              //     var uploadSpeed = (x / y);
              //     var formatSpeed;
              //     if (uploadSpeed > 1024) {
              //         formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
              //     } else {
              //         formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
              //     }
              //     var percentComplete = Math.round(evt.loaded * 100 / evt.total);
              //     progressbar.progressbar("value", percentComplete);
              //     // console && //console.log(percentComplete, ",", formatSpeed);
            },
            false
          );

          xhr.onreadystatechange = (response) => {
            if (
              xhr.readyState == 4 &&
              xhr.status == 200 &&
              xhr.responseText != ""
            ) {
              let res = JSON.parse(response.currentTarget.response);
              this.$loadingEnd();
              this.teamIcon = `${qiNiuFileDomain}/${res.key}`;
            } else if (xhr.status != 200 && xhr.responseText) {
              this.$loadingEnd();
            }
          };

          startDate = new Date().getTime();

          xhr.send(formData);
        });
      },

      // 解散团队-获取验证码
      getCaptcha: function () {
        let email = this.email.trim();
        if (!email) {
          this.$Message.error("请输入邮箱");
          return;
        }
        if (
          !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
            email
          )
        ) {
          this.$Message.error("邮箱格式错误");
          return;
        }
        this.$ajax({
          method: "POST",
          url: getCaptcha,
          data: {
            username: email,
          },
        })
          .then((res) => {
            if (res.data.code === 1) {
              this.$Message.success("验证码发送成功，请查收");
              this.captchaUse = true;
            }
          })
          .catch((error) => {
            this.$Message.error(error.response.data.message);
          });
      },

      // 解散团队
      delTeam: function () {
        let user = this.$store.state.user;
        this.$ajax({
          method: "DELETE",
          url: `${teamUrl}/${user.team.id}`,
          data: {
            code: this.captcha,
          },
        }).then((res) => {
          if (res.data.code === 1) {
            this.$Message.success("解散成功");
            this.$store.dispatch("GetUserInfo");
            this.$router.replace("/launch");
          }
        });
      },

      // 退出团队
      quitTeam: function () {
        this.$Modal.confirm({
          title: "提示",
          content: "确定退出该团队？",
          onOk: () => {
            this.$ajax({
              method: "GET",
              url: quitTeam.replace("#id#", this.$store.state.user.team.id),
              params: {
                code: this.captcha,
              },
            }).then((res) => {
              if (res.data.code === 1) {
                this.$Message.success("解散成功");
                this.$router.replace("/launch");
              }
            });
          },
          onCancel: () => {
          },
        });
      },

      //获取七牛token
      getQiniu: function () {
        return new Promise((resolve, reject) => {
          getQiniuToken().then((res) => {
            resolve(res);
          });
        });
      },

      // dialog callback
      rcSDVisible: function (v) {
        if (!v) this.recharge = false;
      },
      arSDVisible: function (v) {
        if (!v) this.apiRecharge = false;
      },
      tcSDVisible: function (v) {
        if (!v) this.teamClose = false;
      },
      tiSDVisible: function (v) {
        if (!v) this.teamInfoChange = false;
      },
      ttSDVisible: function (v) {
        if (!v) this.teamTransfer = false;
      },
      open() {
        this.visible = true;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import '../styles/color.styl';

  .m-wrapper {
    max-width: 960px;
    padding: 50px 0;
  }

  a {
    color: #2d8cf0;
  }

  section {
    position: relative;
    padding: 20px 40px;
    border: 1px solid c-border;
    margin-bottom: 20px;

    h3 {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
    }

    .m {
      width: 70%;
      font-size: 14px;
      position: relative;
    }

    .tip {
      margin-top: 15px;
      color: c-black2;
      font-size: 0.9em;
    }
  }

  .amount {
    margin-bottom: 5px;
    color: #ff890f;
    font-size: 40px;
    font-weight: 500;

    .amount-unit {
      margin-left: 10px;
      color: c-black;
      font-size: 1rem;
    }
  }

  .warn-row {
    margin-bottom: 20px;

    .warn-row__key, .warn-row__v, ._unit {
      float: left;
    }

    .warn-row__v, .warn-row__key {
      margin-right: 10px;
      line-height: 25px;
    }

    .warn-input {
      float: left;
      width: 50px;
      margin-right: 5px;
    }
  }

  .team-btn {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }

  .team-icon {
    float: left;
    height: 75px;
    width: 75px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: c-grey;
    }
  }

  .team-info_list {
    margin-left: 110px;
    line-height: 22px;

    li {
      &:before {
        content: '';
        position: relative;
        display: inline-block;
        height: 4px;
        width: 4px;
        top: -2px;
        margin-right: 6px;
        background: c-blue;
        border-radius: 50%;
      }
    }
  }

  // team close dialog
  .ti-img {
    position: relative;
    height: 40px;
    width: 40px;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: c-grey;
    }

    #teamIcon {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }

  .captcha {
    width: 50%;
  }

  .capt-btn {
    background-color: c-white;
    color: c-blue;
    border: 1px solid c-border;
  }

  .close-btn {
    width: 100%;
  }

  .pay-amount {
    width: 31%;
  }

  .type-wrapper {
    padding-right: 10px;
  }

  .zf-type {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid c-border;
    height: 75px;
  }

  .zfb, .wxzf, .api-zf {
    width: 100%;
  }

  .p-active {
    border: 1px solid c-blue;
  }

  .tips {
    font-size: 12px;
    color: c-black2;
  }

  .recharge-btn {
    display: inline-block;
  }

  .circle {
    border: 2px solid c-blue;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
  }
</style>

<style lang="stylus">
  @import '../styles/color.styl';

  .wx-pay {
    text-align: center;
    margin-left: -48px;

    .wx-pay_amount {
      color: c-red;
      font-size: 1.2em;
    }
  }

  .type-select, .type-select .ivu-select-selection, .type-select .ivu-select-selected-value {
    height: 32px !important;
    line-height: 32px !important;
  }

  .invoice {
    color: #2d8cf0;
    cursor: pointer;
    padding-left: 10px;
  }

  .Code-title {
    text-align: center;
    font-size: 14px;
  }

  .Code-picture {
    text-align: center
  }

  .invoiceQR {
    cursor: pointer;
    margin-left: 10px;
    vertical-align: middle;
  }

  .code-show {
    opacity: 1;
    transition: all 0.2s linear 0.1s;
  }

  .code-hide {
    opacity: 0;
    transition: all 0.2s linear 0.1s;
  }
</style>
