// src/routes/index.tsx
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useClerk } from "@clerk/tanstack-react-start";
import { Button } from "../components/ui/button";

const authStateFn = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/login/$",
    });
  }

  return { userId };
});

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => await authStateFn(),
});

function Home() {
  const { signOut } = useClerk();
  return (
    <Button onClick={() => signOut({ redirectUrl: "/login/$" })}>Log af</Button>
  );
}
