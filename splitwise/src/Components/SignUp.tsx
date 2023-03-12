import { FormEvent, useState } from 'react';
import { getSignupFromServer, setSignupFromServer } from '../services/menu';

const SignUp = () => {
    const [errorMsg, setErrorMsg] = useState<null | Error | boolean>(null);
    const [errorUserExitMsg, setErrorUserExitMsg] = useState<null | Error | boolean>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const submitData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (
            name !== "" && typeof name === "string" &&
            email !== "" && typeof email === "string" &&
            password !== "" && typeof password === "string" &&
            confirmPassword === password && typeof confirmPassword === "string" &&
            phone !== "" && typeof phone === "string" && phone.length === 10) {
            try {
                const finalData = {
                    name, email, password, phone
                }
                let userExit = await getSignupFromServer(finalData);
                if(!userExit) { 
                    let data = await setSignupFromServer(finalData);
                    console.log(data, userExit);
                    setIsValid(true);
                    localStorage.setItem("token_react_lab", "xxxx-xxxx-xxxx");
                    window.location.href = "/"
                } else {
                    setErrorUserExitMsg(true);
                }
            } catch (error) {
                setErrorMsg(error as Error);
                setIsValid(false);
            }
        } else {
            setErrorMsg(true);
        }
        window.scrollTo(0, -10000);
    };
    return (
        <section className="">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 pt-3 pb-3 text-center">
                                <div>
                                    <form onSubmit={submitData}>
                                        <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                        <p className="text-white-50 mb-1">Please enter your details!</p>
                                        {errorUserExitMsg && <p className='text-warning'>Already user exists.</p>}
                                        {isValid && <p className='text-success'>Successfully created your account.</p>}
                                        {errorMsg && <p className='text-danger'>Getting error during creating your account.</p>}
                                        <div className="form-outline form-white mb-1">
                                            <label className="form-label" htmlFor="typeEmailX">Email *</label>
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-1">
                                            <label className="form-label" htmlFor="typeNameX">Name *</label>
                                            <input type="text" id="typeNameX" className="form-control form-control-lg" onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-1">
                                            <label className="form-label" htmlFor="typePasswordX">Password *</label>
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-1">
                                            <label className="form-label" htmlFor="typePasswordCX">Confirm Password *</label>
                                            <input type="password" id="typePasswordCX" className="form-control form-control-lg" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePhoneX">Phone *</label>
                                            <input type="tel" id="typePhoneX" className="form-control form-control-lg" onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
                                    </form>
                                </div>

                                <div>
                                    <p className="mb-0">Do you have an account? <a href="/sign-in" className="text-white-50 fw-bold">Sign In</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp