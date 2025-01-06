"use client";

import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import Account from "./components/account";
import { useSearchParams, useRouter } from "next/navigation";
import Finance from "./components/finance";
import clsx from "clsx";

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getProfileParams = searchParams.get("p");

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col w-full gap-2">
        <Label className="text-2xl font-bold font-sans">
          Configurações de conta
        </Label>
        <Label className="font-light font-sans">
          Acesse suas informações pessoais e configure-as da maneira que
          preferir
        </Label>
      </div>
      <Separator className="mt-2" />
      <div className="grid grid-cols-4 gap-8 w-full">
        <div className="flex flex-col gap-1 items-start w-full col-span-1">
          <Button
            variant="ghost"
            className={clsx(
              searchParams.get("p") === "account" && "bg-accent",
              "w-full justify-start items-start"
            )}
            onClick={() => router.push("/profile?p=account")}
          >
            Conta
          </Button>
          <Button
            variant="ghost"
            className={clsx(
              searchParams.get("p") === "finance" && "bg-accent",
              "w-full justify-start items-start"
            )}
            onClick={() => router.push("/profile?p=finance")}
          >
            Financeiro
          </Button>
        </div>
        {getProfileParams === "account" && <Account />}
        {getProfileParams === "finance" && <Finance />}
      </div>
    </div>
  );
}
