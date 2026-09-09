import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "@/src/features/auth/components/login";
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

export const Route = createFileRoute("/login/$")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
