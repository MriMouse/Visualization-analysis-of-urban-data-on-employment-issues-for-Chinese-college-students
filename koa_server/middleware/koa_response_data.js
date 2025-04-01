// 处理业务逻辑的中间件,读取某个json文件的数据
const path = require("path");
const fileUtils = require("../utils/file_utils");
const Papa = require("papaparse");

module.exports = async (ctx, next) => {
  // 根据url
  const url = ctx.request.url;
  let filePath = url.replace("/api", "");
  console.log(filePath)
  if (filePath.endsWith("DAta")) {
    filePath = "../data" + filePath + ".csv";
    filePath = path.join(__dirname, filePath);
    try {
      const ret = await fileUtils.getFileJsonData(filePath);
      const parseData = Papa.parse(ret, { header: true }).data;
      ctx.response.body = JSON.stringify(parseData);
    } catch (error) {
      const errorMsg = {
        message: "读取文件内容失败, 文件资源不存在",
        status: 404,
      };
      ctx.response.body = JSON.stringify(errorMsg);
    }
  } else {
    filePath = "../data" + filePath + ".json"; // ../data/seller.json
    filePath = path.join(__dirname, filePath);
    try {
      const ret = await fileUtils.getFileJsonData(filePath);
      ctx.response.body = ret;
    } catch (error) {
      const errorMsg = {
        message: "读取文件内容失败, 文件资源不存在",
        status: 404,
      };
      ctx.response.body = JSON.stringify(errorMsg);
    }
  }
  console.log(filePath);
  await next();
};
