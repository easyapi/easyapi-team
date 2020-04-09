<template>
  <div class="m-wrapper grid">
    <div class="member-card" v-for="(item, i) in members" :key="i">
      <div class="member grid" @click="memberSetting(i)" v-if="item.user">
        <div class="fl icon">
          <img :src="item.user.photo + '!icon.jpg'" alt=""/>
        </div>
        <div class="fl info">
          <p class="name">{{ item.user.nickname }}</p>
          <p>{{ item.type }}</p>
        </div>
      </div>
    </div>
    <div>
      <p class="icon2-plus-circle new" @click="newMember"></p>
    </div>
    <ea-dialog
      title="成员设置"
      :open="memberSetDialog"
      width="520"
      @visibleChange="memberSDVisible"
    >
      <div class="n-row grid" v-if="memberSelect">
        <p class="bottom-5">
          从团队中移除<span class="t-blue">{{members[memberSelect].user.nickname}}</span>
        </p>
        <p class="bottom-5">被移除的成员, 将不能再访问EasyAPI上的项目信息, 但<span class="t-blue">跟他相关的数据不会被删除</span></p>
        <ea-button
          text="确认删除"
          size="small"
          type="red"
          class="bottom-5"
          @click="confirmClick"
        />

        <p class="bottom-5" v-if="hasInviter">在{{ members[memberSelect].addTime | dateFormat }},&nbsp;由管理员&nbsp;{{
          inviter }}&nbsp;邀请加入团队</p>

        <Spin fix v-if="hasInviter && !inviter"></Spin>

        <div class="permision-set">
          <h4 class="title">权限设置</h4>
          <RadioGroup v-model="permision" vertical>
            <Radio label="管理员">
              <p class="radio-label">管理员<span class="des">可以创建，修改和删除项目，也可以设置其他人为管理员</span></p>
            </Radio>
            <Radio label="成员">
              <p class="radio-label">成员<span class="des">普通成员,可以看到团队中所有成员以及他参与的内容</span></p>
            </Radio>
          </RadioGroup>
        </div>

        <ea-button text="保存设置" class="top-20" @click="setMemberType"/>
      </div>
    </ea-dialog>
    <ea-dialog
      title="确认移除"
      :open="confirmDelMember"
      width="420"
      @visibleChange="delSDVisible"
    >
      <p>被移除的成员，将不能再访问&nbsp;EasyAPI&nbsp;上的项目信息，但<span class="t-blue">跟他相关的数据不会被删除</span></p>
      <ea-button text="确认移除" type="red" class="top-20" @click="delMember"/>
    </ea-dialog>
    <ea-dialog
      title="添加新成员"
      :open="newMemberSet"
      width="420"
      @visibleChange="newMemberSDVisible"
    >
      <p>添加新成员</p>
      <Form ref="newMemberList" :model="newMemberList" :label-width="0">
        <div>
          <template v-for="(item, index) of newMemberList.items">
            <FormItem
              :key="index"
              :prop="'items.' + index + '.userName'"
              :rules="[
                {
                  required: true,
                  message: '成员邮箱不能为空',
                  trigger: 'blur'
                },
                { type: 'email', message: '成员邮箱错误', trigger: 'blur' }
              ]"
            >
              <Input
                v-model="item.userName"
                class="top-5"
                placeholder="请输入新成员邮箱"
              >
                <Select
                  v-model="item.type"
                  slot="append"
                  style="width: 70px"
                  :key="index"
                >
                  <Option
                    v-for="item of permisionList"
                    :value="item"
                    :key="item"
                  >{{ item }}
                  </Option
                  >
                </Select>
              </Input>
            </FormItem>
          </template>
          <a class="t-blue top-5 cur-pointer" @click="appendMember">继续添加</a>
        </div>
        <div>
          <p class="top-10 bottom-5">邀请邮件附言</p>
          <Input
            v-model="newMemberRemark"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="请把附言写在这里(可选)"
            class="top-5"
          />
          <div class="notice top-10">
            <p>管理员: 可以创建项目和邀请团队成员;</p>
            <p>成员: 只能看到自己参与的项目和团队可见的项目</p>
          </div>
        </div>
      </Form>
      <ea-button
        text="保存设置"
        type="main"
        class="top-20"
        @click="confirmNewMember"
      />
    </ea-dialog>
  </div>
</template>

<script>
  import {
    setMemberType,
    memberInvitedInfo,
    addMember,
    delMember
  } from "../../api/api";
  import {getTeamUserList} from "../../api/team";

  export default {
    name: "Members",
    components: {},
    props: ["propMembers"],
    data: function () {
      return {
        memberSetDialog: false,
        memberSelect: null,
        permision: "成员",
        permisionList: ["成员", "管理员"],
        inviter: "",
        hasInviter: true,
        confirmDelMember: false,
        members: this.propMembers,
        newMemberSet: false,
        newMemberList: {
          items: [
            {
              userName: "",
              type: "成员"
            }
          ]
        },
        memberRule: {
          userName: []
        },
        newMemberRemark: "",

        // 是否有设置他人权限
        hasPowerSetting: false
      };
    },
    created: function () {
      let t = this.$store.state.user.userTeam.type;
      this.hasPowerSetting = t === "创建人" || t === "管理员" ? true : false;
    },
    mounted: function () {
      document.title = "团队成员 - EasyAPI";
      this.getMemberInvite();
      this.getTeamUserList();
    },
    watch: {
      "$store.state.user.userTeam": function () {
        this.getTeamUserList();
        let t = this.$store.state.user.userTeam.type;
        this.hasPowerSetting = t === "创建人" || t === "管理员" ? true : false;
      }
    },
    methods: {
      getTeamUserList: function () {
        getTeamUserList(this.$store.state.user.team.id).then(res => {
          this.members = res.data.content;
        });
      },

      // 成员设置弹窗
      memberSetting: function (i) {
        if (!this.hasPowerSetting) {
          this.$Message.error("你没有权限!!");
          return;
        }
        this.memberSelect = i;
        if (this.members[this.memberSelect].type === "创建人") return;
        this.memberSetDialog = true;
        this.permision = this.members[this.memberSelect].type;
        this.getMemberInvite(this.members[i].user.id);
      }
      ,
      memberSDVisible: function (show) {
        if (!show) {
          this.memberSetDialog = false;
          this.inviter = "";
          this.hasInviter = true;
        }
      }
      ,
      closeMemberSD: function (resetSelect = true) {
        this.memberSetDialog = false;
        setTimeout(() => {
          this.inviter = "";
          this.hasInviter = true;
          if (resetSelect) this.memberSelect = null;
        }, 200);
      }
      ,

      // 获取成员被邀请信息
      getMemberInvite: function (id) {
        this.$ajax({
          method: "GET",
          url: memberInvitedInfo,
          params: {
            inviteeId: id,
            teamId: this.$store.state.user.team.id
          }
        }).then(res => {
          if (res.data && res.data.content && res.data.content.length > 0) {
            this.inviter = res.data.content[0].inviter.nickname;
          } else {
            this.hasInviter = false;
          }
        });
      }
      ,

      // 确认删除按钮
      confirmClick: function () {
        this.confirmDelMember = true;
        this.closeMemberSD(false);
      }
      ,

      // 确认移除弹窗
      delSDVisible: function (show) {
        if (!show) this.closeDelSD();
      }
      ,
      closeDelSD: function () {
        this.confirmDelMember = false;
      }
      ,

      // 添加新成员
      newMember: function () {
        this.newMemberSet = true;
      }
      ,
      newMemberSDVisible: function (show) {
        if (!show) this.newMemberSet = false;
      }
      ,
      closeNewSD: function () {
        this.newMemberSet = false;
        this.$refs["newMemberList"].resetFields();
      }
      ,
      appendMember: function () {
        this.newMemberList.items.push({
          userName: "",
          type: "成员"
        });
      }
      ,

      // 设置权限设置
      setMemberType: function () {
        this.$ajax({
          method: "PUT",
          url: setMemberType,
          data: {
            id: this.members[this.memberSelect].userTeamId,
            type: this.permision
          },
          json: true
        }).then(res => {
          this.$Message.success("修改成功!!");
          this.getTeamUserList();
          this.closeMemberSD();
        }).catch(function (err) {
          this.$Message.success("修改失败!!");
          this.closeMemberSD();
        }).then(function () {
        });
      }
      ,

      // 删除成员
      delMember: function () {
        this.$ajax({
          method: "delete",
          url: `${delMember}\\${this.members[this.memberSelect].userTeamId}`
        }).then(res => {
          this.$Message.success("删除成功!!");
          this.memberSelect = "";
          this.getTeamUserList();
          this.closeDelSD();
        }).catch(function (err) {
          this.$Message.success("删除失败!!");
        }).then(function () {
          this.closeDelSD();
        });
      }
      ,

      // 添加新成员
      confirmNewMember: function () {
        this.$refs["newMemberList"].validate().then(vaild => {
          if (vaild) {
            let type = [];
            let username = [];
            let teamId = [];
            let remark = [];
            let memberData = [];
            this.newMemberList.items.forEach(el => {
              memberData.push({
                type: el.type,
                teamId: this.$store.state.user.team.id,
                username: el.userName,
                remark: this.newMemberRemark
              });
            });
            this.$ajax.post(addMember, {
              json: true,
              data: memberData
            }).then(res => {
              if (res.data.code) {
                this.$Message.success({
                  content: res.data.message.replace("添加", "邀请"),
                  duration: 3
                });
                this.getTeamUserList();
                this.newMemberRemark = "";
                this.newMemberList.items = [
                  {
                    userName: "",
                    type: "成员"
                  }
                ];
              }
              this.closeNewSD();
            }).catch(function (err) {
              this.$Message.success("添加失败!!");
            });
          }
        });
      }
    }
  }
  ;
</script>

<style lang="stylus" scoped>
  @import '../../assets/styles/color.styl'

  .m-wrapper
    padding-top: 40px

  .member-card
    float: left
    padding: 20px
    width: (100 / 5) %
    min-width: 200px
    .member
      padding: 10px
      cursor: pointer
      transition: all .4s ease
      &:hover
        box-shadow 0 3px 8px c-background-dark
        transform: translateY(-5px)
      .icon
        height: 50px
        width: 50px
        img
          height: 100%
          width: 100%
          background-color: c-background-dark
          border-radius: 50%
      .info
        margin-left: 10px
        font-size: 14px
        .name
          color: c-blue
          margin: 5px 0

  .new
    float: left
    margin: 30px
    font-size: 50px
    color: c-blue
    cursor: pointer
    &:hover
      opacity: .8

  .radio-label
    display: inline-block
    .des
      margin-left: 15px
      color: c-black2

  .permision-set
    margin-top: 20px
    .title
      margin: 5px 0

  .notice
    color: c-black2
    font-size: .8em
</style>
