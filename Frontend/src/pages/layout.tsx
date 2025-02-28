import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout(){

    return<div>
        <header className="h-10 w-full text-white bg-blue-400 text-center">
             Paytm-lite
        </header>
        <main>
            <div>
                <Link to={"/signin"}>SigninPage</Link>
                <Link to={"/signup"}>SignupPage</Link>
                <Link to={"/Dashboard"}>Dashboard</Link>
                <Link to={"/send"}>SendMoney</Link>
                
            </div>
            <Outlet/>
        </main>
    </div>
}