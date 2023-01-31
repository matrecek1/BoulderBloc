"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imgur_1 = require("imgur");
const client = new imgur_1.ImgurClient({ clientId: process.env.CLIENT_ID });
imgur.upload('../imgs/wall.jpeg', (err, res) => {
    console.log(res.data.link);
});
//# sourceMappingURL=imgurSdk.js.map