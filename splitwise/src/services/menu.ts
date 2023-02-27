import axios from "axios";
import IDataList from "../model/IDataList";

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

export {
    getDataFromServer,
    setDataFromServer
}