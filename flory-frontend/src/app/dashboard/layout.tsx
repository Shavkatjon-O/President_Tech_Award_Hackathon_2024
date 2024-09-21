import React from "react";
import Header from "./_components/header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8 sm:px-0 px-4">{children}</main>
    </div>
  );
};

export default Layout;
