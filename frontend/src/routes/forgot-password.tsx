import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../features/auth/components/forgot-password";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
