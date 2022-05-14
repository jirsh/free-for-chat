import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

const NavLink: FC<{ href: string; children: ReactNode }> = ({
  children,
  href,
}) => {
  const router = useRouter();
  const active = router.pathname === href;
  return (
    <Link href={href}>
      <a className="relative flex h-full items-center group">
        {(active && (
          <span className="absolute bottom-0 left-0 bg-gray-500 w-full h-0.5" />
        )) || (
          <span className="absolute bottom-0 left-0 bg-gray-500 w-0 h-0.5 group-hover:w-full transition-all ease-out duration-100" />
        )}
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
