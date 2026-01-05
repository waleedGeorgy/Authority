import { PiSmileyXEyes } from "react-icons/pi";
import CardWrapper from "./card-wrapper";

const ErrorCard = () => {
    return (
        <CardWrapper backButtonHref="/auth/login" headerLabel="Something went wrong" backButtonLabel="Back to log-in page">
            <div className="flex flex-row justify-center items-center">
                <PiSmileyXEyes size={90} className="text-destructive" />
            </div>
        </CardWrapper>);
}

export default ErrorCard;