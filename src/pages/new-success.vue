<template>
  <div class="m-wrapper clearfix">
    <header class="title">团队创建成功</header>
    <main>
      <p>您可以选择以下服务， 进一步操作</p>
      <Row>
        <Col span="12" class="ts-btn">
          <a href="/members">
            <div class="ts-btn_t">
              <img class="icon" src="../../static/images/success_member.png" />
              <span class="p">添加成员</span>
            </div>
          </a>
        </Col>
        <Col span="12" class="ts-btn">
          <a href="/account">
            <div class="ts-btn_t">
              <img
                class="icon"
                src="../../static/images/success_recharge.png"
              />
              <span class="p">账户充值</span>
            </div>
          </a>
        </Col>
      </Row>
    </main>
    <footer>
      <p>直接进入服务</p>
      <Row class="tb-row">
        <Col span="6" class="tb-btn">
          <a href="https://doc.easyapi.com">
            <div class="tb-btn_t">
              <img class="icon" src="../../static/images/success_api.png" />
              <p class="p">API文档</p>
            </div>
          </a>
        </Col>
        <Col span="6" class="tb-btn">
          <a href="https://monitor.easyapi.com">
            <div class="tb-btn_t">
              <img class="icon" src="../../static/images/success_monitor.png" />
              <p class="p">API监控</p>
            </div>
          </a>
        </Col>
        <Col span="6" class="tb-btn">
          <a href="https://gateway.easyapi.com">
            <div class="tb-btn_t">
              <img class="icon" src="../../static/images/success_gateway.png" />
              <p class="p">API网关</p>
            </div>
          </a>
        </Col>
        <Col span="6" class="tb-btn">
          <a href="https://market.easyapi.com">
            <div class="tb-btn_t">
              <img class="icon" src="../../static/images/success_service.png" />
              <p class="p">API服务</p>
            </div>
          </a>
        </Col>
      </Row>
    </footer>
  </div>
</template>

<script>
export default {
  name: "NewSuccess",
  mounted: function() {
    document.title = "团队创建成功 - EasyAPI";
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/styles/color'

header {
  padding: 40px 0;
  margin-bottom: 60px;
  border-bottom: 1px solid c-grey;
  &.title {
    font-size: 16px;
  }
}

.m-wrapper {
  width: 720px;
  text-align: center;
}

footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid c-grey;
}

.ts-btn {
  margin-top: 30px;
  padding-right: 10px;
  text-align: right;
  &:last-child {
    padding-left: 10px;
    padding-right: 0;
    text-align: left;
  }
}

.ts-btn_t {
  display: inline-block;
  padding: 10px 50px;
  text-align: center;
  border: 1px solid c-border;
  border-radius: 4px;

  .icon {
    float: left;
    margin-right: 10px;
    height: 26px;
    width: 26px;
  }
  .p {
    line-height: 26px;
  }
}

.tb-btn {
  padding: 5px 10px;
}

.tb-btn_t {
  margin-top: 30px;
  padding: 15px 0;
  border: 1px solid c-border;
  border-radius: 4px;
  .icon {
    float: none;
    height: 46px;
    width: auto;
  }
}

.ts-btn_t,
.tb-btn_t {
  cursor: pointer;
  &:hover {
    background: c-background-dark
  }
}
</style>
