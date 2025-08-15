import { ReactNode } from "react";
import Header from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import CartSidebar from "@/components/CartSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <CartSidebar />
    </div>
  );
}
