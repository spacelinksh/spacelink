"use client";

import Image from "next/image";
import Icon from "../favicon.ico";
import { Label } from "@workspace/ui/components/label";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function LoginPage({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-start gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Image src={Icon} alt="Logo" className="size-8" />
            <Label className="font-semibold antialiased text-sm cursor-pointer">
              Spacelink
            </Label>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full p-4">
        <div className="flex flex-col w-full h-full rounded-lg bg-[url] bg-[url('/noise.png')] bg-cover" />
      </div>
    </div>
  );
}
