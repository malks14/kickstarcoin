import Campaign from "./build/Campaign.json";
import web3 from "./web3";

export default (address) => {//funcion que trae problema al crear nueva campaign y tira problema de header
    return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};



