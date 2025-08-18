import Navbar from "@/components/navbar";

const ProtectedRoutesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-6">
            <Navbar />
            {children}
        </div>

    );
}

export default ProtectedRoutesLayout;