import { ReactNode } from "react";

function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-100 dark:bg-background">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex w-full max-w-xl">
          <div className="flex w-full flex-col rounded-3xl bg-white p-10 dark:bg-card dark:text-card-foreground">
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full max-w-lg flex-col px-4">
                <div className="flex flex-col gap-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
