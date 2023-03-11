interface IDataList {
    id: number;
    product: string,
    price: number,
    payeeName: string,
    setDate: string
}
interface ISingUpList {
    name: string,
    email: string,
    password: string,
    phone: string,
    id: number
}

interface ISingInList {
    email: string,
    password: string,
    id: number
}
export type {
    IDataList,
    ISingUpList,
    ISingInList
};
