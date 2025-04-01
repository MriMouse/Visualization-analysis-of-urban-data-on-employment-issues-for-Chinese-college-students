export default class Socket {
  static instance = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new Socket();
    }
    return this.instance;
  }
  ws = null;

  callBackMap = {};
  connected = false;
  retryCnt1 = 0;
  retryCnt2 = 0;

  connect () {
    if (!window.WebSocket) {
      return console.log("webSocket加载失败，您的浏览器可能不支持webSocket");
    }
    this.ws = new WebSocket("ws://localhost:9998");

    this.ws.onopen = () => {
      console.log("链接成功");
      this.connected = true;
      this.retryCnt2 = 0;
    };
    this.ws.onclose = () => {
      console.log("链接失败");
      this.connected = false;
      setTimeout(() => {
        this.retryCnt2++;
        this.connect();
      }, 500 * this.retryCnt2);
    };
    this.ws.onmessage = (msg) => {
      const recvData = JSON.parse(msg.data);
      //console.log(recvData)
      const socketType = recvData.socketType;
      if (this.callBackMap[socketType]) {
        const action = recvData.action;
        if (action === "getData") {
          //console.log(recvData.data);
          //const realData = JSON.parse(recvData.data);
          //console.log(recvData.data);
          this.callBackMap[socketType].call(this, recvData.data);
        } else if (action === "fullScreen") {
        }
      }
    };
  }

  registerCallBack(socketType, callBack) {
    this.callBackMap[socketType] = callBack;
  }

  unRgisterCallBack(socketType) {
    this.callBackMap[socketType] = null;
  }

  send(data) {
    if (this.connected) {
      this.retryCnt1 = 0;
      this.ws.send(JSON.stringify(data));
    } else {
      setTimeout(() => {
        this.retryCnt++;
        this.send(data);
      }, this.retryCnt1 * 250);
    }
  }
}
