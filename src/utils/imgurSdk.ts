import { ImgurClient } from 'imgur';
const client = new ImgurClient({ clientId: process.env.CLIENT_ID });

imgur.upload('../imgs/wall.jpeg', (err:Error, res:any) => {
    console.log(res.data.link);
});
