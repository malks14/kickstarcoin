import web3 from './web3';
import  CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x13200137a5D78cB4Cb57E0C5cb588de272eBa49E'
);

export default instance;