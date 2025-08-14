"use client";

import { signOut } from "@/lib/actions/signout.action";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

const UserMenuItems = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;


  const userMenuItems = [
    {
      icon: <LogOutIcon />,
      text: "Log out",
      onclick: signOut,
    },
  ];
  return userMenuItems.map((item) => (
    <div
      key={item.text}
      onClick={item.onclick}
      className="h-10 p-2 hover:bg-muted w-full cursor-pointer text-sm text-foreground flex gap-2 items-center rounded hover:text-primary font-normal"
    >
      {item.icon} {item.text}
    </div>
  ));
};
export default UserMenuItems;
