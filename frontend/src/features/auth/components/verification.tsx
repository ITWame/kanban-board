import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { Spinner } from "@/src/components/ui/spinner";
import {
  SignUpErrors,
  SignUpFutureResource,
} from "@clerk/tanstack-react-start/types";
import { useNavigate } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ClerkAPIError } from "@clerk/tanstack-react-start/types";

interface VerificationProps {
  onVerify: (
    otp: string,
    setError: Dispatch<SetStateAction<ClerkAPIError | null | undefined>>,
  ) => void;
  onResendCode: () => void;
  emailAddress?: string | null;
  isFetching: boolean;
}

function Verfication({
  onVerify,
  onResendCode,
  emailAddress,
  isFetching,
}: VerificationProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<ClerkAPIError | null>();

  return (
    <div className="flex flex-col items-center gap-6">
      {error && (
        <Alert variant="destructive" className="p-4">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
        <BadgeCheck className="h-8 w-8 text-white" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold text-card-foreground">
          Tjek din email
        </h1>{" "}
        {emailAddress ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vi har sendt en bekræftelseskode til{" "}
            <span className="font-semibold text-card-foreground">
              {emailAddress}
            </span>
            . Indtast koden nedenfor.
          </p>
        ) : (
          <p>
            Vi har sendt en bekræftelseskode til den email du prøvede at login
            ind med. Indtast koden nedenfor.
          </p>
        )}
      </div>
      <div className="flex w-full flex-col space-y-6">
        <div className="flex justify-center gap-3">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={() => onVerify(otp, setError)}
          size={"2xl"}
          disabled={isFetching || otp.length < 6}
        >
          {isFetching ? (
            <>
              <Spinner />
              <span>Bekræfter...</span>
            </>
          ) : (
            "Bekræft"
          )}
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Har du ikke modtaget en bekræftelseskode i din mail?{" "}
          </span>
          <Button
            type="button"
            variant={"link"}
            size={"none"}
            onClick={onResendCode}
            disabled={isFetching}
          >
            Send ny kode
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Verfication;
