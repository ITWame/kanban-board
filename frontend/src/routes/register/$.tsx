import { createFileRoute, redirect } from "@tanstack/react-router";
import Register from "@/src/features/auth/components/register";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

const authStateFn = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (isAuthenticated) {
    throw redirect({
      to: "/",
    });
  }

  return { userId };
});

export const Route = createFileRoute("/register/$")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
