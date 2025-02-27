import { AlertCircle } from "lucide-react";

function LowCreditWarning({ credits }) {
  return (
    <>
      {credits.currentCredits < 500 && (
        <div className="mt-6 flex items-start p-4 bg-yellow-50 text-yellow-800 rounded-md">
          <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium">Low Credit Warning</h4>
            <p className="text-sm">
              Your credit balance is below 500. Consider adding more credits to
              avoid service interruption.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LowCreditWarning;
