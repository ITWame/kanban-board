import { createFileRoute } from "@tanstack/react-router";
import Header from "../features/auth/components/header";
import SingInForm from "../features/auth/components/sign-in-form";
import Footer from "../features/auth/components/footer";
import AuthContainer from "../features/auth/components/container";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthContainer>
      <Header title="Velkommen tilbage! 👋" subtitle="Log ind på din konto" />
      <SingInForm />
      <Footer
        text={"Har du ikke en konto?"}
        href={"/register"}
        hrefText={"Register"}
      />
    </AuthContainer>
  );
}
