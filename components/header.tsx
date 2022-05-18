import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BurgerButton from "./burgerbutton";
import NavLink from "./navlink";
import { useSession, signIn, signOut } from "next-auth/react";
import NavLinkClick from "./navlinkclick";

const Header = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileLinksRef.current &&
        !mobileLinksRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileLinksRef]);

  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="text-xl h-full flex items-center">chat application</a>
        </Link>
        <div className="ml-auto" />
        <nav className="space-x-3 hidden md:flex h-full">
          {(session && (
            <NavLinkClick onClick={() => signOut()}>Sign out</NavLinkClick>
          )) || <NavLinkClick onClick={() => signIn()}>Sign in</NavLinkClick>}
          {session && (
            <NavLink href="/profile">{session.user?.name || "Error"}</NavLink>
          )}
        </nav>
        <div className="block md:hidden">
          <BurgerButton opened={opened} setOpened={setOpened} />
        </div>
      </header>
      <nav
        ref={mobileLinksRef}
        className={`absolute z-[100] top-16 flex h-16 mt-3 container mx-auto md:hidden transition-transform ${
          opened ? "scale-100" : "scale-0"
        }`}
      >
        <div className="rounded-lg p-3 bg-slate-700 shadow-2xl outline outline-1 mx-3 outline-white w-full space-x-3 flex h-full">
          {(session && (
            <NavLinkClick onClick={() => signOut()}>Sign out</NavLinkClick>
          )) || <NavLinkClick onClick={() => signIn()}>Sign in</NavLinkClick>}
          {session && (
            <NavLink href="/profile">{session.user?.name || "Error"}</NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
