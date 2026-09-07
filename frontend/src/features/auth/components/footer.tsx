import { Button } from "@/src/components/ui/button";
import { Link } from "@tanstack/react-router";

interface FooterProps {
  text: string;
  href: string;
  hrefText: string;
}

function Footer({ text, href, hrefText }: FooterProps) {
  return (
    <div className="mt-2 text-center">
      <span className="text-sm text-gray-400">{text} </span>
      <Link to={href}>
        <Button variant={"link"} size={"none"} className={"text-indigo-600"}>
          {hrefText}
        </Button>
      </Link>
    </div>
  );
}

export default Footer;