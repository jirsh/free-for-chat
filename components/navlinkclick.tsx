import { useRouter } from "next/router";
import { FC, MouseEventHandler, ReactNode } from "react";

const NavLinkClick: FC<{
  children: ReactNode;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}> = ({ children, onClick }) => {
  const router = useRouter();
  return (
    <a className="relative flex h-full items-center group" onClick={onClick}>
      <span className="absolute bottom-0 left-0 bg-gray-500 w-0 h-0.5 group-hover:w-full transition-all ease-out duration-100" />
      {children}
    </a>
  );
};

export default NavLinkClick;
