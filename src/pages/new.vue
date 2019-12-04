<template>
  <div class="m-wrapper team-new clearfix">
    <header class="title">新建团队</header>
    <main>
      <Row class="team-icon_row">
        <Col span="4" class="key">团队图标:</Col>
        <Col span="20">
          <div class="gird">
            <img class="team-logo" src="../assets/images/team-logo.png" alt />
            <div class="team-logo-select">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="[]"
                :format="['jpg', 'jpeg', 'png']"
                :data="{
                  token: uploadToken
                }"
                :max-size="2048"
                :on-success="handleSuccess"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                action="https://upload.qiniup.com/"
                style="display: inline-block;width:98px;"
              >
                <ea-button text="选择团队图标" :space="true" size="small" type="main" />
              </Upload>
              <p class="tips grey">你可以选择png/jpg图片(300x300)作为团队图标</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="key">团队名称:</Col>
        <Col span="20">
          <Input v-model="name" placeholder="例如: 帮趣网络"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="key">团队URL:</Col>
        <Col span="20">
          <Input placeholder="团队URL" @on-blur="checkUrl" @on-focus="cleanUrl" v-model="url">
            <span slot="prepend">https://</span>
            <span slot="append">.easyapi.com</span>
          </Input>
          <p v-if="baseUrlOccupy">
            <small class="err">该团队URL已经被占用</small>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="key">团队介绍:</Col>
        <Col span="20">
          <Input v-model="des" placeholder="请一句话介绍团队"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="key">行业选择:</Col>
        <Col span="20">
          <Select v-model="industry" size="small">
            <Option v-for="item in industries" :value="item" :key="item">
              {{
              item
              }}
            </Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="key">
          <p>
            <br />
          </p>
        </Col>
        <Col span="20">
          <ea-button
            class="new-btn"
            :disabled="urlOccupy"
            text="创建团队"
            type="main"
            @click="createTeam"
          />
          <ea-button class="cancel-btn" text="取消" type="main" @click="cancelCreate" />
        </Col>
      </Row>
    </main>
    <footer>
      <p>
        加入其他团队？ 请让管理员给您发送邀请链接，即可加入。
        <a href="https://www.easyapi.com/help/" target="_blank">查看帮助</a>
      </p>
    </footer>
  </div>
</template>

<script>
const qiNiuFileDomain = 'https://qiniu.easyapi.com'

import { teamUrl, checkTeamUrl, getQiniuToken } from '../api/api'
import $ from 'jquery'
export default {
  name: 'New',
  data: function() {
    return {
      teamIcon: '',
      iconUploadUrl: '',
      uploadToken: '',
      name: '',
      des: '',
      url: '',
      baseUrlOccupy: false,
      urlOccupy: false,
      industry: '',
      industries: [
        '互联网',
        '新媒体',
        '技术与服务',
        '娱乐',
        '生活服务',
        '教育',
        '制造业',
        '家具建材',
        '金融服务',
        '旅行与交通',
        '通讯',
        '医疗健康',
        '文化与设计',
        '其他'
      ]
    }
  },
  created: function() {
    this.getQiniu().then(tokenRes => {
      this.uploadToken = JSON.parse(tokenRes).upToken
    })
  },
  mounted: function() {
    document.title = '新建团队 - EasyAPI'
  },
  methods: {
    cleanUrl() {
      this.urlOccupy = false
    },

    // 检查团队URL是否合法
    async checkUrl() {
      if (!this.url) {
        return
      }
      await this.checkTeamUrl().catch(err => {
        this.urlOccupy = true
        this.$Message.error('团队URL已经被占用')
      })
    },

    checkTeamUrl(success, fail) {
      return new Promise((resolve, reject) => {
        let _data = {
          url: this.baseUrl
        }
        this.$ajax({
          url: checkTeamUrl,
          method: 'get',
          params: _data
        })
          .then(res => {
            if (res.data.code == 1) {
              resolve('团队URL可用')
            } else {
              reject('团队URL已存在')
            }
          })
          .catch(err => {
            if (
              err.responseJSON.code == -1 ||
              err.responseJSON.message == '该编码已存在'
            ) {
              reject('团队URL已存在')
            }
          })
      })
    },

    newTeam: function() {
      this.$ajax({
        method: 'POST',
        url: teamUrl,
        json: true,
        data: {
          name: this.name,
          description: this.des,
          img: this.teamIcon,
          industry: this.industry,
          url: this.url
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.$store.dispatch('GetUserInfo')
          this.$store.dispatch('getTeamList')
          this.$router.replace('new/success')
        }
      })
    },

    handleSuccess(res, file) {
      this.teamIcon = `${qiNiuFileDomain}/${res.key}`
      $('.team-logo').attr('src', this.teamIcon)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },

    //获取七牛token
    getQiniu: function() {
      return new Promise((resolve, reject) => {
        $.get(getQiniuToken, res => {
          resolve(res)
        })
      })
    },

    createTeam: function() {
      this.newTeam()
    },

    cancelCreate: function() {
      this.$router.replace('/launch')
      setTimeout(() => {
        window.location.reload()
      }, 400)
    },
    handleBeforeUpload() {}
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/color';

header {
  text-align: center;
  padding: 40px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid c-grey;
}

.m-wrapper {
  width: 540px;
}

.ivu-row {
  min-height: 50px;
  line-height: 50px;
}

.cancel-btn {
  color: c-black2 !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

footer {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid c-grey;
}

.team-logo {
  float: left;
  height: 80px;
  width: 80px;
}

.team-icon_row {
  margin-bottom: 10px;
}

.team-logo-select {
  margin-left: 90px;

  .tips {
    line-height: 1em;
  }
}
</style>

<style lang="stylus">
.team-new {
  .ivu-select, .ivu-select-selection, .ivu-select-placeholder, .ivu-select-selected-value {
    height: 32px !important;
    line-height: 32px !important;
  }
}

.team-logo-select {
  .ivu-upload-drag {
    border: none;
    height: 40px;
    text-align: left;
    cursor: pointer;
    overflow: auto;

    &:hover {
      border: none;
    }
  }
}
</style>
