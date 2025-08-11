import Link from "next/link";
import { Button } from "../ui/button";

interface backButtonProps {
    href: string,
    label: string
}

const BackButton = ({ href, label }: backButtonProps) => {
    return (
        <Button size='sm' variant='link' className="font-normal text-center m-auto w-fit" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    );
}

export default BackButton;