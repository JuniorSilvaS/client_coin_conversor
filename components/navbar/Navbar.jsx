import Image from "next/image";
import logo from "./images/logo.png";

export const NavBar = () => {
    return (
        <div className="bg-green-950 h-15 text-white flex items-center justify-between p-7">
            <div className="">
                    <Image alt="logo" src={logo} width={40} height={40}  className=""/>

            </div>
            <div className="flex items-center">
                <p className="p-2">
                    name's user
                </p>
                <button className="bg-green-400  rounded-2xl p-2">
                    register
                </button>
            </div>
        </div>
    );
};