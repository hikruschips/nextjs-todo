import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Open_Sans } from "@next/font/google";
const open_Sans = Open_Sans({ subsets: ["latin"] });

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div
      className={`flex flex-col min-h-screen relative bg-slate-900 text-white ${open_Sans.className}`}
    >
      <Header />
      <main className="flex-1 flex flex-col p-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
