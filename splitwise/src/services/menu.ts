import axios from "axios";
import { IDataList, ISingInList, ISingUpList } from "../model/IDataList";

const getDataFromServer = () => {
    return axios.get<IDataList[]>('http://localhost:3001/items').then(response => response.data);
}

const setDataFromServer = (finalData: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList[]>('http://localhost:3001/items', finalData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data);
}
const setSignupFromServer = (finalData: Omit<ISingUpList, 'id'>) => {
    return axios.post<ISingUpList[]>('http://localhost:3001/users', finalData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data);
}

const getSignupFromServer = async (finalData: Omit<ISingInList, 'id'>) => {
    let data = await axios.get<ISingInList[]>('http://localhost:3001/users').then(res => res.data.find(item => item.email === finalData.email));
    return data?.password;
}
export {
    getDataFromServer,
    setDataFromServer,
    setSignupFromServer,
    getSignupFromServer
};
