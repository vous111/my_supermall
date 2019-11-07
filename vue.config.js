// const path = require("path");
// function resolve(dir) {
// 	return path.join(__dirname, dir);
// }

// module.exports = {
// 	chainWebpack: config => {
// 		config.resolve.alias
// 			//set第一个参数：设置的别名，第二个参数：设置的路径
// 			// 在html里面需要在别名前加 ~
// 			.set("@", resolve("./src"))
// 			.set("components", resolve("./src/components"))
// 			.set("assets", resolve("./src/assets"))
// 			.set("views", resolve("./src/views"))
// 			.set("network", resolve("./src/network"))
// 			.set("common", resolve("./src/common"));
// 	}
// };

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
