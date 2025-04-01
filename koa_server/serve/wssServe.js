const path = require("path");
const file_utils = require("../utils/file_utils");
const WebSocket = require("ws");
const Papa = require("papaparse");

const wss = new WebSocket.Server({
  port: 9998,
});

module.exports.listen = () => {
  wss.on("connection", (client) => {
    console.log("链接成功");
    client.on("message", async (msg) => {
      //console.log(msg);
      let pay = JSON.parse(msg);
      const action = pay.action;
      if (action === "getData") {
        if (pay.chartName.endsWith("DAta")) {
          let filePath = "../data/" + pay.chartName + ".csv";
          filePath = path.join(__dirname, filePath);
          const csvData = await file_utils.getFileJsonData(filePath);
          const parseData = Papa.parse(csvData, { header: true }).data;
          pay.data = parseData;
          //console.log(JSON.stringify(pay))
          client.send(JSON.stringify(pay));
        } else {
          let filePath = "../data/" + pay.chartName + ".json";
          filePath = path.join(__dirname, filePath);
          const ret = await file_utils.getFileJsonData(filePath);
          pay.data = ret;
          client.send(JSON.stringify(pay));
        }
      } else if(action === "getDataS"){
        let filePath = "../data/" + pay.chartName + ".csv";
          filePath = path.join(__dirname, filePath);
          const csvData = await file_utils.getFileJsonData(filePath);
          const parseData = Papa.parse(csvData, { header: true }).data;
          pay.data = parseData;
          //console.log(JSON.stringify(pay))
          client.send(JSON.stringify(pay));
      }else {
        wss.clients.forEach((client) => {
          client.send(msg);
        });
      }
    });
  });
};
