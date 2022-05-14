import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";

const Seperator = () => <div className="border border-r-white" />;

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Made with ❤️ using{" "}
        <Link href="https://nextjs.org/">
          <a target="_blank">Next.JS</a>
        </Link>
        ,{" "}
        <Link href="https://reactjs.org/">
          <a target="_blank">React</a>
        </Link>{" "}
        and{" "}
        <Link href="https://tailwindcss.com/">
          <a target="_blank">Tailwind</a>
        </Link>{" "}
      </div>
      <div className="ml-0 md:ml-auto flex space-x-2">
        <Link href="https://github.com/jirsh">
          <a className="footer-link" target="_blank">
            <FaGithub />
            <div>GitHub</div>
          </a>
        </Link>
        <Seperator />
        <Link href="https://www.npmjs.com/~jirsh">
          <a className="footer-link" target="_blank">
            <FaNpm />
            <div>NPM</div>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
