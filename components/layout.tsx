import Head from "next/head";
import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen mx-auto container flex flex-col">
      <Head>
        <title>jir.sh</title>
      </Head>
      <Header />
      <main className="pt-3 mx-3 md:mx-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
