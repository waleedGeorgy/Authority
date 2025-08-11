"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

const Social = () => {
    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button size='lg' variant='secondary' onClick={() => { }} className="grow cursor-pointer">
                <FaGithub />
            </Button>
            <Button size='lg' variant='secondary' onClick={() => { }} className="grow cursor-pointer">
                <FcGoogle />
            </Button>
        </div>
    )
}

export default Social;