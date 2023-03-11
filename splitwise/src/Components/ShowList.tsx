import { useEffect, useState } from 'react';
import { IDataList } from '../model/IDataList';
import { getDataFromServer } from '../services/menu';

function ShowList() {
    const [list, setList] = useState<IDataList[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [totalRahul, setTotalRahul] = useState<number>(0);
    const [totalRamesh, setTotalRamesh] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<null | Error>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const helper = async () => {
            try {
                let data = await getDataFromServer();
                setTotal(data.reduce((result, pre) => (result = result + pre.price), 0));
                setList(data);
                setLoading(true);
            } catch (error) {
                setErrorMsg(error as Error);
                setLoading(true);
            }
        };
        helper();
    }, []);
    useEffect(() => {
        const allPayByRahulMarks = list.map(item => item.payeeName === 'Rahul' ? item.price : 0);
        const allPayByRameshMarks = list.map(item => item.payeeName !== 'Rahul' ? item.price : 0);
        const totalBaidByRahul = allPayByRahulMarks.reduce(totalValue, 0);
        const totalBaidByRamesh = allPayByRameshMarks.reduce(totalValue, 0);
        setTotalRahul(totalBaidByRahul);
        setTotalRamesh(totalBaidByRamesh);
        setName(totalBaidByRahul > totalBaidByRamesh ? "Rahul" : "Ramesh");
    }, [list]);
    const totalValue = (prev: number, cur: number) => prev + cur;
    if (!list) return null;
    if (errorMsg) return <h2>Please check, getting issue during fetching data!!</h2>
    return (
        <div className="container">
            {loading ? <table className="table">
                <thead>
                    <tr className='table-primary'>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Product Purchased</th>
                        <th scope="col">Price</th>
                        <th scope="col">Payee Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id} className={item.payeeName === 'Rahul' ? 'table-warning' : 'table-info'}>
                                <td>{item.id}</td>
                                <td>{item.setDate}</td>
                                <td>{item.product}</td>
                                <td>{item.price}</td>
                                <td>{item.payeeName}</td>
                            </tr>
                        ))
                    }
                    {
                        <tr className='table-dark'>
                            <th scope="col">Total: </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">{total}</th>
                        </tr>
                    }
                    {
                        <tr className='table-success'>
                            <th scope="col">Rahul Paid: </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">{totalRahul}</th>
                        </tr>
                    }
                    {
                        <tr className='table-success'>
                            <th scope="col">Ramesh Paid: </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">{totalRamesh}</th>
                        </tr>
                    }
                    {
                        <tr className='table-danger'>
                            <th scope="col">Pay {name}: </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">{Math.abs(totalRamesh - totalRahul) / 2}</th>
                        </tr>
                    }
                </tbody>
            </table> :
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
        </div>
    )
}

export default ShowList;