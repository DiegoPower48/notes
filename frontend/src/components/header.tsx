"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Fetch from "@/services/authservice";
import { IconDoorExit } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  authorized: boolean;
}

export default function Header({ authorized }: Props) {
  const router = useRouter();

  const logout = async () => {
    try {
      await Fetch.logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        "w-screen bg-sidebar z-50 h-40 md:h-20 p-2 grid grid-cols-[2fr_1fr] md:grid-cols-[1fr_2fr_1fr] grid-rows-2 md:grid-rows-1"
      )}
    >
      <div
        className={cn(
          !authorized && "col-span-2",
          "w-full md:col-span-1 flex justify-center gap-4"
        )}
      >
        <div className="w-16 h-16 flex  justify-center items-center bg-white rounded-full shadow-md border border-yellow-400">
          <Image
            src="/noteIcon.png"
            alt="icono de nota"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-2xl text-white font-bold">Notes</div>
        </div>
      </div>
      {authorized ? (
        <>
          <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
            <div className="p-4 bg-white rounded-xl h-4/6 w-5/6 md:w-4/6 flex justify-center items-center">
              <div className="text-sidebar lg:text-2xl uppercase font-bold flex gap-2">
                <div>Dashboard</div> <div>⭐</div>
              </div>
            </div>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2 md:col-start-3 md:col-end-4 w-full flex justify-center items-center">
            <Button
              className="h-9 px-4 py-2 border-1 border-red-500 rounded flex items-center justify-center text-white bg-red-400  shadow-xs hover:bg-red-500/80 hover:text-accent-foreground active:scale-105  duration-300 transition-all mr-4"
              onClick={() => logout()}
            >
              <div>Logout</div>
              <IconDoorExit />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center items-center col-span-2 md:col-span-1">
          <div className="p-4 bg-white rounded-xl w-full flex justify-center">
            <div className="text-sidebar lg:text-2xl uppercase font-bold">
              Welcome to my notes app
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
