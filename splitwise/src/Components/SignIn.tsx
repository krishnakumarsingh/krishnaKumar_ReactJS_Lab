import { FormEvent, useState } from 'react';
import { getSignupFromServer } from '../services/menu';

const SignIn = () => {
    const [errorMsg, setErrorMsg] = useState<null | Error>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const submitData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (
            email !== "" && typeof email === "string" &&
            password !== "" && typeof password === "string") {
            try {
                const finalData = {
                    email, password
                }
                let data = await getSignupFromServer(finalData);

                if (data === password) {
                    setIsValid(true);
                    localStorage.setItem("token_react_lab", "xxxx-xxxx-xxxx");
                    window.location.href = "/"
                }
            } catch (error) {
                setErrorMsg(error as Error);
                setIsValid(false);
                window.location.href = "/sign-in"
            }
        }

    };
    return (
        <section className="">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={submitData}>
                                    <div className="mb-md-5 pb-2">
                                        {isValid && <p className='text-danger'>Successfully logged in your account.</p>}
                                        {errorMsg && <p className='text-danger'>Getting error during login your account.</p>}
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </div>
                                </form>
                                <div>
                                    <p className="mb-0">Don't have an account? <a href="/sign-up" className="text-white-50 fw-bold">Sign Up</a>
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

export default SignIn;