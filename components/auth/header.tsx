import { FaUserLock } from "react-icons/fa6";

const Header = ({ label }: { label: string }) => {
    return (
        <div className="w-full flex flex-col gap-y-2 items-center justify-center mb-2">
            <div className="flex flex-row items-center justify-center space-x-2">
                <FaUserLock size={33} className="mb-0.5" />
                <h1 className='text-4xl font-semibold font-roboto'>
                    <span className="text-indigo-700">Auth</span>ority
                </h1>
            </div>
            <p className="text-md">{label}</p>
        </div>

    );
}

export default Header;