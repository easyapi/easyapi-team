<template>
  <div class="mainPage">
    <div class="mainPage-title">
      <span>{{name}}</span>
    </div>
    <div class="row">
      <div
        style="width:100%;height:50px;line-height:30px;margin-top:30px;border-bottom: 1px solid#e2e2e2;margin-bottom:20px;">
        <span :class="{colour:category ===''}" @click="colorSwitching('')"
              style="font-size: 18px;color: #999999;cursor: pointer">全部</span>
        <span :class="{colour:category===1}" @click="colorSwitching(1)"
              style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer">接口服务</span>
        <span :class="{colour:category===2}" @click="colorSwitching(2)"
              style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer">场景服务</span>
        <span :class="{colour:category===3}" @click="colorSwitching(3)"
              style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer">数据服务</span>
      </div>
      <div class="region">
        <div class="region_block" v-for="information in teamInformation">
          <div class="information">
                <span
                  @click="jumpPagea(information.service.url,information.service.hasConsole,information.service.serviceId)"
                  class="information_img">
                <img style="width:80px;height: 80px" :src="information.service.img" alt="">
                  <span class="information_fase">
                    <strong style="font-size:16px;color:#333333;">{{information.service.name}}</strong>
                     <span class="block" v-if="information.service.type=='1' "
                           style="color: #24ac38;font-size:12px">免费</span>
                     <span class="block" v-if="information.service.type=='2' && information.teamService!==null"
                           style="font-size:12px">剩余{{information.teamService.balance}}次
                         <span v-if="information.teamService.balance<101"
                               @click.stop="renewalPage(information.service.serviceId,information.teamService.teamServiceId)"
                               style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px">续费</span>
                     </span>
                     <span class="block" v-if="information.service.type=='3'" style="font-size:12px">
                         <span v-if="information.teamService.endTime <= currentTime">
                           <span style="color: #ff4a53;">已到期</span>
                           <span
                             @click.stop="monthlyPage(information.service.serviceId,information.teamService.teamServiceId)"
                             style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px">续费</span>
                         </span>
                         <span v-if="information.teamService.endTime > currentTime">
                           <span style="color:#999;" v-if="information.teamService.remainDay > 30">剩余{{information.teamService.remainDay}}天</span>
                           <span style="color: #ff4a53;"
                                 v-if="information.teamService.remainDay <= 30 && information.teamService.remainDay!==0 ">剩余{{information.teamService.remainDay}}天</span>
                           <span style="color: #ff4a53;" v-if="information.teamService.remainDay === 0">已到期</span>
                           <span v-if="information.teamService.remainDay <= 30"
                                 @click.stop="monthlyPage(information.service.serviceId,information.teamService.teamServiceId)"
                                 style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px">续费</span>
                         </span>
                     </span>
                     <span class="block" v-if="information.service.type=='4' "
                           style="color: #999999;font-size: 12px">按需</span>
                 </span>
                </span>
            <span class="none">
                   <span class="none_j">...</span>
                   <ul class="ul_none">
                     <li
                       @click="ProjectileFrame(information.teamService.teamServiceId,information.service.serviceId,information.service.type,'秘钥管理',0,information.team.teamId)">秘钥管理</li>
                      <li
                        @click="ProjectileFrame(information.teamService.teamServiceId,information.service.serviceId,information.service.type,'成员管理',1,information.team.teamId)">成员管理</li>
                      <li v-if="information.service.type!==1 && information.service.type !== 4"
                          @click="ProjectileFrame(information.teamService.teamServiceId,information.service.serviceId,information.service.type,'余额提醒',2,information.team.teamId)">余额提醒</li>
                    </ul>
                 </span>
          </div>
        </div>
        <Modal
          :title="assignment"
          v-model="Close"
          :mask-closable="false"
          width="1081px"
          class="flk">
          <div class="Modal_l">
            <div class="Modal_right">
              <p :class="{state:assignment==='秘钥管理'}" @click="stand('秘钥管理',0)">
                <span class="fl" :class="{f1:assignment==='秘钥管理'}" @click="stand('秘钥管理')"></span>
                <i class="iconfont" style="padding-left:20px">&#xe600;</i>&nbsp;&nbsp;
                秘钥管理</p>
              <p :class="{state:assignment==='成员管理'}" @click="stand('成员管理',1)">
                <span class="fl" :class="{f1:assignment==='成员管理'}" @click="stand('成员管理')"></span>
                <i class="iconfont" style="padding-left:20px">&#xe61c;</i>&nbsp;&nbsp;
                成员管理</p>
              <p :class="{state:assignment==='余额提醒'}" @click="stand('余额提醒',2)" v-if="this.type!==1 && this.type !== 4">
                <span class="fl" :class="{f1:assignment==='余额提醒'}" @click="stand('余额提醒')"></span>
                <i class="iconfont" style="padding-left:20px">&#xe69e;</i>&nbsp;&nbsp;
                余额提醒</p>
            </div>
            <!--秘钥管理-->
            <div class="Modal_left" v-show="nowIndex===0">
              <div class="secret_key">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                  <FormItem label="AccessKey" prop="appKey" style="margin-top:20px;" class="fk">
                    <Input placeholder="AccessKey" v-model="formValidate.appKey" disabled style="width: 300px;"
                           id="copyAppKey"></Input>
                    <button type="button" class="copy" :data-clipboard-text="this.formValidate.appKey"
                            @click="copyappKey">复制
                    </button>
                  </FormItem>
                  <FormItem label="SecretKey" prop="appSecret" class="fk">
                    <Input :type="inputType" v-model="formValidate.appSecret" disabled placeholder="SecretKey"
                           style="width:300px" class="copyContent"></Input>
                    <button type="button" class="copy" :data-clipboard-text="this.formValidate.appSecret"
                            @click="copyappSecret">复制
                    </button>
                    <span class="display" @click="showInputData">{{btnContent}}</span>
                  </FormItem>
                  <FormItem>
                    <Button style="background-color: #18c1d6;color: #fff;font-size: 14px;" @click="modificationKey()">
                      更换秘钥
                    </Button>
                    <span style="display: block;margin-top:10px;color: #999999;font-size: 12px">此秘钥仅限于短信服务使用</span>
                    <span style="line-height:0px;color: #999999;font-size: 12px">出于安全考虑，建议您周期性的更换密钥</span>
                  </FormItem>
                </Form>

                <Modal
                  v-model="changeKeyHint"
                  title="温馨提示"
                  @on-ok="ok"
                  @on-cancel="cancel"
                  :styles="{top: '230px'}"
                  width="350">
                  <div class="changeKeyHint_box">
                    <p>重置之后，以前的appKey和appSecret将不能正常使用，并且会导致以前的API调用失效。重置appKey和appSecret后，请及时将以前的接口调用中的参数进行更新。</p>
                    <p>确认重置appKey和appSecret吗？</p>
                  </div>
                </Modal>
              </div>
            </div>
            <!--成员管理-->
            <div class="Modal_left" v-show="nowIndex===1">
              <div class="staff">
                     <span class="staff_member">
                         <img :src="defaultMemberImg" alt=""
                              style="width:40px;height:40px;border-radius:25px;margin-left:10px;margin-top:18px;">
                          <ul style="width:85px;height: 100%;padding-top:15px;">
                            <li style="color: #1bc1d6;font-size:16px;">{{defaultMemberNickname}}</li>
                            <li>{{defaultMemberType}}</li>
                          </ul>
                     </span>
                <span class="staff_member fq" v-for="staff in member" v-if="staff.type!=='创建人'"
                      style="position: relative">
                         <span class="lpha" @click="deleteMember(staff.userServiceId)">X</span>
                         <img :src="staff.user.photo" alt=""
                              style="width:40px;height:40px;border-radius:25px;margin-left:10px;margin-top:18px;">
                          <ul style="width:85px;height: 100%;padding-top:15px;">
                            <li style="color: #1bc1d6;font-size:16px;">{{staff.user.nickname}}</li>
                            <li>{{staff.type}}</li>
                          </ul>
                          <Modal
                            v-model="Dmember"
                            @on-ok="prompt"
                            :styles="{top: '230px'}">
                              <p style="height: 100px;line-height:100px;text-align: center;color: #333;font-size: 16px">确定删除成员{{nickname}}吗?</p>
                           </Modal>
                     </span>
                <span class="addTO" @click="displayAdd">
                         <Icon type="ios-add-circle-outline" style="color: #1bc0d6;font-size:40px;line-height: 70px;"/>
                       <span style="color: #333333;font-size:16px;line-height:70px;margin-left:10px;">添加成员</span>
                     </span>
              </div>
              <div class="addMembers" style="margin-top:15px;" v-if="show">
                <h3 style="padding-left:28px">添加其他成员</h3>
                <div style=" overflow: hidden;">
                      <span class="staff_member" @click="projectile(people.nickname,people.id)"
                            v-for="people in notAdded" style="position: relative;margin-top:0px"
                            v-if="notAdded.code!==0">
                         <img :src="people.photo" alt=""
                              style="width:40px;height:40px;border-radius:25px;margin-left:10px;margin-top:18px;">
                          <ul style="width:85px;height: 100%;padding-top:25px;">
                            <li style="color: #1bc1d6;font-size:16px;">{{people.nickname}}</li>
                            <li>{{people.type}}</li>
                          </ul>
                          <Modal
                            v-model="frame"
                            @on-ok="Sure"
                            :styles="{top: '230px'}"
                            class="dialogue">
                            <p style="height: 100px;line-height:100px;text-align: center;color: #333;font-size: 16px">确定添加成员{{nickname}}吗?</p>
                          </Modal>
                       </span>
                </div>
              </div>
            </div>
            <!--余额提醒-->
            <div class="Modal_left" v-show="nowIndex===2" v-if="this.type!==1 && this.type !== 4">
              <div class="secret_balance">
                <div class="balance_remind">
                  <p v-if="judgmentUnit===2"><span>当前剩余次数：&nbsp;&nbsp;&nbsp;&nbsp;{{balance}}次</span></p>
                  <p v-if="judgmentUnit===3"><span>当前剩余时间：&nbsp;&nbsp;&nbsp;&nbsp;{{remainDay}}天</span></p>
                  <p style="padding-left:48px">
                    <span>是否提醒：</span>
                    <i-switch size="large" v-model="switch1" @on-change="change" style="margin-left:14px;">
                      <span slot="open" style="color: #fff">开启</span>
                      <span slot="close" style="color: #fff">关闭</span>
                    </i-switch>
                  </p>
                  <p v-if="this.type==2 && this.type==1 && this.type==4">
                    <span>剩余提醒次数：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <InputNumber v-model="balanceWarnNo" :disabled="!switch1" :min="1"></InputNumber>
                    <span>&nbsp;&nbsp;次</span>
                  </p>
                  <p v-if="this.type==3">
                    <span>剩余提醒时间：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <InputNumber v-model="balanceWarnNo" :disabled="!switch1" :min="1"></InputNumber>
                    <span>&nbsp;&nbsp;天</span>
                  </p>
                  <div style="padding-left:48px;display:flex">
                    <span style="line-height:60px;color:#000;font-size: 14px">通知人员： </span>
                    <span style="margin-left:20px;height:auto;width:80%;">
                           <CheckboxGroup v-model="checkbox"
                                          style="width:100%;height:auto;line-height:60px;;float: left">
                             <Checkbox :label="User.user.id" v-for="User in tipsMember"
                                       style="width:150px;height:60px;margin-right:20px;position:relative">
                                 <img :src="User.user.photo" alt=""
                                      style="width:40px;height:40px;border-radius:25px;margin-left:5px;position:absolute;bottom:10px">
                                 <span
                                   style="margin-left:53px;color: #333333;font-size: 14px;">{{User.user.nickname}}</span>
                             </Checkbox>
                            </CheckboxGroup>
                         </span>
                  </div>
                </div>
                <div class="balance_btn">
                  <Button @click="renew"
                          style="	width:100px;height:40px;font-size:14px;background-color: #18c1d6;color: #fff;margin-top:40px">
                    续费
                  </Button>
                </div>
              </div>
              <div class="btn">
                <Button @click="reviseTheBalance"
                        style="	width:100px;height:40px;font-size:14px;background-color: #18c1d6;color: #fff;margin-left:120px;margin-top:10px">
                  保存设置
                </Button>
              </div>
              <div class="ea-warnBox">
                <p>备注：</p>
                <p>1、单击"开启"或"关闭" 控件改变提醒状态</p>
                <p>2、单机 进入编辑模式，更改余额提醒上限</p>
                <p>3、单机 添加提醒列表</p>
                <p>4、单机提醒列表中 按钮删除该联系人</p>
                <p>5、请注意： 提醒方式和提醒列表是账户共享设置</p>
              </div>
            </div>
          </div>
        </Modal>
        <div class="region_block">
          <div class="information1">
            <a href="https://market.easyapi.com">
              <span class="lcon"><Icon type="md-add"/></span>
              <span class="information_word">服务市场</span>
            </a>
          </div>
        </div>
      </div>
      <div class="configure">
        <p class="configure_p"><strong>配置</strong></p>

        <div class="informationa" @click="jumpPage">
          <span class="informationa_lcon"><img src="../assets/images/ip.png" alt=""></span>
          <strong style="font-size: 16px;color: #333333;text-align: center;display: block;height: 40px">IP白名单</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserService, Surplus, Reminding, memberList, modifyBalance, addMembers} from "../api/api"
  import Clipboard from 'clipboard';
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        defaultMemberImg: '',
        defaultMemberNickname: '',
        defaultMemberType: '',
        tipsMember: '',
        authenticationToken: '',
        teamInformation: '',
        startTime: '',
        currentTime: '',
        Close: false,
        btnContent: '显示',
        assignment: '秘钥管理',
        inputType: "password",
        switch1: '',//提醒开关
        tsID: '',
        nowIndex: 0,
        isShow: false,
        changeKeyHint: false,
        serveType: null,
        balance: '',
        serviceId: '',
        type: '',
        checkbox: [],
        member: '',
        balanceWarnNo: null,
        judgmentUnit: '',
        notAdded: '',
        frame: false,
        Dmember: false,
        nickname: '',
        userId: '',
        show: false,
        code: '',
        MemberId: '',
        category: '',
        titleSubscript: '',
        selectedPersonnel: '',
        teamId: '',
        name: '',
        remainDay: '',
        formValidate: {
          appKey: '',
          appSecret: '',
        },
        ruleValidate: {
          appKey: [
            {required: true, message: '请输入appKey，且不能为空', trigger: 'blur'}
          ],
          appSecret: [
            {required: true, message: '请输入appSecret，且不能为空', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      //点击复制
      copyappKey() {
        var clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          this.$Message.success('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$Message.error('该浏览器不支持自动复制');
          // 释放内存
          clipboard.destroy()
        })
      },
      copyappSecret() {
        var clipboard = new Clipboard('.copy')
        console.log(clipboard)
        clipboard.on('success', e => {
          this.$Message.success('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$Message.error('该浏览器不支持自动复制');
          // 释放内存
          clipboard.destroy()
        })
      },

      //显示未添加成员
      displayAdd() {
        this.show = true
      },
      change(status) {
        if (status) {
          this.$Message.info("开启提醒");
        } else {
          this.$Message.info("取消提醒");
        }
      },
      stand(pay, index) {
        this.assignment = pay;
        this.nowIndex = index;
      },
      ProjectileFrame(teamServiceId, serviceId, type, name, index, teamId) {
        this.Close = true;
        this.tsID = teamServiceId;
        this.serviceId = serviceId;
        this.type = type
        this.assignment = name;
        this.nowIndex = index;
        // console.log(index)
        this.secretKey()
        this.teamId = teamId;
        this.remindingOfTheBalance()
        this.getMemberList()
        this.getNmaeList()
        this.membersNotJoined();
        this.promptingStaff();
      },
      showInputData() {
        if (this.inputType === "password") {
          this.inputType = 'text';
          this.btnContent = "隐藏"
        } else {
          this.inputType = 'password';
          this.btnContent = "显示"
        }
      },

      //跳转到白名单页面
      jumpPage() {
        this.$router.push({path: "/white-list"})
      },
      jumpPagea(URL, hasConsole, serviceId) {
        if (hasConsole === true) {
          window.location.href = 'https://' + URL + '.easyapi.com/console/'
        } else {
          this.$router.push({path: "/stat", query: {serviceId: serviceId}})
        }
      },
      //次数续费
      renewalPage(serviceId, teamServiceId) {
        this.$router.push({path: "/renew/count", query: {serviceId: serviceId, teamServiceId: teamServiceId}})
      },
      //按月续费
      monthlyPage(serviceId, teamServiceId) {
        this.$router.push({path: "/renew/monthly", query: {serviceId: serviceId, teamServiceId: teamServiceId}})
      },
      //服务列表
      colorSwitching(category) {
        this.category = category;
        this.getUserServices()
      },
      getUserServices() {
        this.$ajax({
          method: 'GET',
          url: getUserService,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          },
          params: {
            serviceCategory: this.category,
            size: 50,
          }
        }).then(res => {
          this.teamInformation = res.data.content;
        }).catch(error => {
          console.log(error)
        })
      },
      //获取秘钥信息
      secretKey() {
        this.$ajax({
          method: 'get',
          url: Surplus + "/" + this.tsID,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          }
        }).then(res => {
          this.formValidate.appKey = res.data.appKey;
          this.formValidate.appSecret = res.data.appSecret;
          this.remainDay = res.data.remainDay
          this.balance = res.data.balance
          this.judgmentUnit = res.data.service.type
        }).catch(error => {
          console.log(error)
        })
      },
      //修改秘钥
      modificationKey() {
        this.changeKeyHint = true;
      },
      ok() {
        let obj = {};
        obj.id = this.tsID;
        this.$ajax({
          method: 'put',
          url: Surplus,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(obj)
        }).then(res => {
          this.formValidate.appKey = res.data.content.appKey;
          this.formValidate.appSecret = res.data.content.appSecret;
          this.secretKey()
          this.$Message.success(res.data.message);
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.data.message);
        })
      },
      cancel() {

      },
      //余额提醒上限
      remindingOfTheBalance() {
        this.$ajax({
          method: 'GET',
          url: Reminding + "/" + this.serviceId,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          if (res.data.code === 0) {
            // this.$Message.error("余额提醒上限暂无数据");
            this.switch1 = false;
          } else {
            this.switch1 = true
            this.balanceWarnNo = res.data.content.count;
          }
        }).catch(error => {
          console.log(error)
          if (error.data.code === -1) {
            this.$Message.warning(error.data.message);
          } else {
            this.$Message.error("数据错误");
          }
        })
      },
      //修改余额提醒设置
      reviseTheBalance() {
        let remindUserIds = this.checkbox.join(",")
        this.$ajax({
          method: 'PUT',
          url: modifyBalance,
          headers: {
            "authorization": this.authenticationToken,
          },
          params: {
            remindUserIds: remindUserIds,
            ifRemind: this.switch1,
            serviceId: this.serviceId,
            count: this.balanceWarnNo,
          },
        }).then(res => {
          this.$Message.success(res.data.message)
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.response.data.message)
        })
      },

      //提示人员
      promptingStaff() {
        this.$ajax({
          method: 'GET',
          url: modifyBalance,
          headers: {
            "authorization": this.authenticationToken,
          },
          params: {
            serviceId: this.serviceId
          }
        }).then(res => {
          this.selectedPersonnel = res.data.content;
          let code = res.data.code
          if (code !== 0) {
            for (let i = 0; i < this.selectedPersonnel.length; i++) {
              this.checkbox[i] = this.selectedPersonnel[i].remindUser.id
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //获取服务的成员列表
      getMemberList() {
        this.$ajax({
          method: 'GET',
          url: memberList + "/" + this.serviceId + "/users",
          headers: {
            "authorization": this.authenticationToken,
          },
          params: {
            size: 100,
          }
        }).then(res => {
          this.member = res.data.content
          this.defaultMemberImg = res.data.content[0].user.photo
          this.defaultMemberNickname = res.data.content[0].user.nickname
          this.defaultMemberType = res.data.content[0].type
        }).catch(error => {
          console.log(error)
        })
      },
      //余额提醒成员列表
      getNmaeList() {
        this.$ajax({
          method: 'GET',
          url: memberList + "/" + this.serviceId + "/users",
          headers: {
            "authorization": this.authenticationToken,
          },
          params: {
            size: 100,
            types: '创建人,管理员',
          }
        }).then(res => {
          this.tipsMember = res.data.content
        }).catch(error => {
          console.log(error)
        })
      },
      //未加入服务的成员列表
      membersNotJoined() {
        this.$ajax({
          method: 'get',
          url: memberList + "/" + this.serviceId + "/unJoinUsers",
          headers: {
            "authorization": this.authenticationToken,
          }
        }).then(res => {
          this.notAdded = res.data
          this.code = res.data.code;
        }).catch(error => {
          console.log(error)
        })
      },
      //添加成员
      projectile(nickname, id) {
        this.frame = true
        this.nickname = nickname
        this.userId = id
      },
      //添加成员
      Sure() {
        this.$ajax({
          method: 'POST',
          url: addMembers,
          headers: {
            "authorization": this.authenticationToken,
            'Content-Type': 'application/json',
          },
          params: {
            userId: this.userId,
            serviceId: this.serviceId,
            teamServiceId: this.teamServiceId,
          }
        }).then(res => {
          this.$Message.success(res.data.message)
          this.getMemberList()
          this.membersNotJoined()
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.response.data.message)
        })
      },
      //删除成员
      deleteMember(id) {
        this.Dmember = true;
        this.MemberId = id;
      },
      prompt() {
        this.$ajax({
          method: 'DELETE',
          url: addMembers + "/" + this.MemberId,
          headers: {
            "authorization": this.authenticationToken,
          },
        }).then(res => {
          this.$Message.success(res.data.message)
          this.getMemberList()
          this.membersNotJoined()
        }).catch(error => {
          console.log(error)
          this.$Message.error(error.response.data.message)
        })
      },
      //续费跳转页面
      renew() {
        if (this.type == 3) {
          this.$router.push({path: "/renew/monthly", query: {serviceId: this.serviceId, teamServiceId: this.tsID}})
        }
        if (this.type == 2 || this.type == 1 || this.type == 4) {
          this.$router.push({path: "/renew/count", query: {serviceId: this.serviceId, teamServiceId: this.tsID}})
        }
      },
    },
    created() {
      let that = this;
      this.authenticationToken = 'Bearer ' + Cookies.get("authenticationToken")
      this.name = this.$route.query.name;
      setTimeout(function () {
        that.name = localStorage.getItem("name");
      }, 1000)
    },
    mounted() {
      document.title = '服务中心 - EasyAPI'
      this.getUserServices()
    }
  }

</script>
<style>
  .row .ivu-tabs-bar {
    height: 100px;
    margin: 0px;
  }

  .row .ivu-tabs-mini .ivu-tabs-nav-container {
    padding-top: 60px;
    height: 100px;
  }

  .row .ivu-tabs-tab {
    width: 100px;
    font-size: 16px;
    text-align: center;
  }

  .row .ivu-tabs-ink-bar {
    background-color: #fff;
  }

  .flk .ivu-modal-content {
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.15);
  }

  .flk .ivu-modal-footer {
    display: none;
  }

  .fk .ivu-form-item-content {
    display: flex;
  }

  .flk .ivu-modal-header-inner {
    text-align: center;
    color: #333333;
    font-size: 18px;
    height: 50px !important;
    line-height: 50px !important;
  }

  .flk .ivu-modal-header {
    text-align: center;
    margin: 0px;
    padding: 0px;
  }

  .flk .ivu-modal-body {
    margin: 0px;
    padding: 0px;
  }

  .flk .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #f5f5f5;
    color: #515a6e;
    border-right: none;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
  }

  .addMembers .ivu-modal-body {
    height: 100px;
    margin: 0px;
    padding: 0px;
  }

  .dialogue .ivu-modal-mask {
    /*background-color:transparent;*/
    background-color: rgba(55, 55, 55, .1);
    /*background-color:#000;*/
    /*opacity:0.1;*/

  }

  .dialogue .ivu-modal-content {
    box-shadow: none;
  }

  .ivu-btn.active, .ivu-btn:active {
    border-color: #18d1c6 !important;
  }

  .ivu-btn:hover {
    border-color: #18d1c6 !important;
  }
</style>
<style scoped>
  .mainPage {
    width: 100%;
    height: auto;

  }

  .mainPage .mainPage-title {
    width: 100%;
    height: 80px;
    background-color: #ECF1F5;
  }

  .mainPage .mainPage-title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #333333;
  }

  .row {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }

  .region {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .region_block {
    width: 300px;
    height: 150px;
    float: left;
    margin-top: 10px;

  }

  .information {
    width: 275px;
    height: 120px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    display: flex;
    cursor: pointer;
    position: relative;
    margin-top: 10px;
  }

  .information:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .information .information_img {
    width: 90%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    display: flex;
  }

  .information .information_fase {
    width: 65%;
    height: 100%;
    display: block;
    padding-left: 20px;
  }

  .block {
    display: block;
    color: #999999;
  }

  .none {
    width: 10%;
    height: 30px;
    font-size: 18px;
    display: none;
  }

  .information:hover .none {
    display: block;
  }

  .ul_none {
    width: 100px;
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.15);
    display: none;
    position: absolute;
    left: 195px;
    top: 30px;
    padding: 0px;
  }

  .ul_none li {
    width: 100px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    list-style-type: none;
  }

  .ul_none li:hover {
    background-color: #1bc1d6;
    color: #ffffff;
  }

  .none:hover .ul_none {
    display: block;
  }

  .information1 {
    width: 275px;
    height: 120px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    cursor: pointer;
    margin-top: 10px;

  }

  .information1:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .lcon {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 40px;
    color: #1cc0d6;
    display: block;
  }

  .information_word {
    width: 100%;
    height: 40px;
    display: block;
    text-align: center;
    font-size: 14px;
    color: #333333;
  }

  .configure {
    width: 100%;
    height: auto;
    margin-bottom: 50px;
  }

  .configure .configure_p {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    color: #333333;
    margin-top: 40px;
    border-bottom: 1px solid #e2e2e2;
  }

  .configure .informationa {
    width: 275px;
    height: 235px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    cursor: pointer;
    margin-top: 40px;
  }

  .configure .informationa:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .configure .informationa .informationa_lcon {
    display: block;
    width: 100%;
    padding-top: 60px;
    height: 175px;
    text-align: center;
  }

  .Modal_l {
    width: 100%;
    height: auto;
    display: flex;
  }

  .Modal_l .Modal_right {
    width: 17%;
    height: 500px;
    border-right: 1px solid #e5e5e5;;
  }

  .Modal_l .Modal_right p {
    display: flex;
    width: 100%;
    height: 57px;
    line-height: 57px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
  }

  .Modal_l .Modal_right p:hover {
    color: #1bc1d6;
  }

  .state {
    color: #1bc1d6 !important;
  }

  .fl {
    display: block;
    width: 4px;
    height: 56px;
  }

  .f1 {
    width: 4px;
    height: 56px;
    background-color: #1bc1d6;
  }

  .Modal_l .Modal_right p:hover .fl {
    display: block;
    width: 4px;
    height: 56px;
    background-color: #1bc1d6;
  }

  .Modal_l .Modal_left {
    width: 83%;
    height: auto;
  }

  .secret_key {
    width: 100%;
    height: auto;
  }

  .secret_key {
    width: 100%;
    height: auto;
  }

  .display {
    width: 32px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #4a91f8;
    border-radius: 3px;
    border: solid 1px #427fd8;
    color: #ffffff;
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    left: 250px;
    top: 8px;
  }

  .secret_balance {
    width: 100%;
    height: auto;
    display: flex;
  }

  .secret_balance .balance_remind {
    width: 80%;
    height: auto;
  }

  .secret_balance .balance_remind p {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }

  .secret_balance .balance_remind p span {
    color: #000000;
    font-size: 14px;
  }

  .balance_btn {
    width: 20%;
    height: auto;
  }

  .ea-warnBox {
    width: 100%;
    height: auto;
    padding-left: 130px;
  }

  .ea-warnBox p {
    color: #999999;
    font-size: 14px;
  }

  .btn {
    width: 100%;
    height: 60px;
  }

  .staff {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .staff_member {
    width: 156px;
    height: 74px;
    background-color: #ffffff;
    border-radius: 4px;
    display: flex;
    float: left;
    margin-top: 20px;
    margin-left: 17px;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .lpha {
    color: #7e8e9f;
    font-size: 15px;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0px;
    top: 3px;
    display: none;
  }

  .fq:hover .lpha {
    display: block;
  }

  .addTO {
    width: 169px;
    height: 73px;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 17px;
    display: inline-block;
  }

  .fq:hover {
    width: 156px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.11);
    border-radius: 4px;
  }

  .staff_member ul {
    width: 42px;
    height: 100%;
    margin-left: 10px;
    list-style: none;
    font-size: 14px;
    color: #333;
  }

  .addMembers {
    width: 100%;
    height: auto;
  }

  .colour {
    color: #1ac1d6 !important;
  }

  .copy {
    display: block;
    width: 50px;
    height: 32px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #dcdee2;
    background-color: #f5f5f5;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
  }
</style>
