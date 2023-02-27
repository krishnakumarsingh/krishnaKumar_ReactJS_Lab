import { FormEvent, useEffect, useState } from "react";
import { setDataFromServer } from '../services/menu';

function ExpenseTracker() {
    const [errorMsg, setErrorMsg] = useState<null | Error>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [payeeName, setPayeeName] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [setDate, setSetDate] = useState<string>("");
    useEffect(() => {
        const helper = async () => {
            try {
                setSetDate(selectDefaultDate());
            } catch (error) {
                setErrorMsg(error as Error);
            }
        };
        helper();
    }, []);
    const selectDefaultDate = () => {
        const today = new Date();
        return (
            today.getFullYear() + "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) + "-" +
            ("0" + today.getDate()).slice(-2)
        )
    }
    const submitData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (
            payeeName !== "" && typeof payeeName === "string" &&
            typeof product === "string" &&
            typeof setDate === "string" &&
            typeof price === "number") {
            setIsValid(true);
            try {
                const finalData = {
                    payeeName, product, price, setDate
                }
                let data = await setDataFromServer(finalData);
                console.log(data);
            } catch (error) {
                setErrorMsg(error as Error);
            }
        }

    };

    return (
        <div className="container mb-3">
            {!isValid && errorMsg && <div className="alert alert-danger alert-dismissible fade show" role="alert">Please check getting issue duering submit the data!!</div>}
            {!errorMsg && isValid && <div className="alert alert-success" role="alert">
                Successfully submitted data.
            </div>}
            <form onSubmit={submitData}>
                <div className="mb-3 col-md-4">
                    <label htmlFor="fillName" className="form-label">Name</label>
                    <select className="form-control" name="fillName" onChange={(e) => setPayeeName(e.target.value)}>
                        <option value="">--Select Name--</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="fillProduct" className="form-label">Product</label>
                    <input type="text" className="form-control" name="fillProduct" placeholder="Please Fill Product..." onChange={(e) => setProduct(e.target.value)} />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="fillPrice" className="form-label">Price</label>
                    <input type="text" className="form-control" name="fillPrice" placeholder="Please Fill Price..." onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="fillDate" className="form-label">Date</label>
                    <input type="date" className="form-control" name="fillDate" placeholder="Please Fill Date..." onChange={(e) => setSetDate(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-outline-success">Save Data</button>
            </form>
        </div>
    )
}

export default ExpenseTracker;
