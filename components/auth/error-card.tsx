import CardWrapper from "./card-wrapper";
import { PiSmileyXEyes } from "react-icons/pi";

const ErrorCard = () => {
    return (
        <CardWrapper backButtonHref="/auth/login" headerLabel="Something went wrong" backButtonLabel="Back to log-in page">
            <div className="flex flex-row justify-center items-center">
                <PiSmileyXEyes size={90} className="text-destructive" />
            </div>
        </CardWrapper>);
}

export default ErrorCard;