import { Alert, AlertDescription } from "@/components/ui/alert"


const AlertBox = ({errMsg}: {errMsg: React.ReactNode}) => {
    return (
        <Alert className="bg-red-100">
            <AlertDescription className="text-center text-lg font-semibold text-red-600">
                {errMsg}
            </AlertDescription>
        </Alert>

    )
}

export default AlertBox