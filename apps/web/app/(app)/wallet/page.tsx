"use client";

import { Button } from "@workspace/ui/components/button";
import { WalletCard } from "@workspace/ui/components/wallet-card";
import { WithdrawBalance } from "./components/withdraw-balance";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER_WALLET } from "../../../api/queries/get-user-wallet";
import { DataTable } from "@workspace/ui/components/data-table";

export default function WalletPage() {
  const { data: wallet, refetch } = useQuery(GET_USER_WALLET);
  const router = useRouter();
  const searchParams = useSearchParams();

  const containsWithdrawParams = searchParams.get("p") === "withdraw";

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-3 w-full gap-4">
        <WalletCard
          title="Saldo total"
          balance={`${wallet?.getUserWallet.wallet.balance || 0},00`}
          description="+ R$ 0,00 no ultimo mês"
          refresh={refetch}
        />
        <WalletCard
          title="Lançamentos futuros"
          balance={0}
          description="+ R$ 0,00 no ultimo mês"
          refresh={refetch}
        />
        <WalletCard
          title="Lançamentos futuros"
          balance={0}
          description="+ R$ 0,00 no ultimo mês"
          refresh={refetch}
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row items-center justify-end w-full gap-1">
          <Button variant="secondary">Baixar extrato</Button>
          <Button onClick={() => router.push("/wallet?p=withdraw")}>
            Solicitar saque
          </Button>
        </div>
        <DataTable columns={[]} data={[]} />
      </div>
      <WithdrawBalance
        isOpen={containsWithdrawParams}
        onClose={() => router.push("/wallet")}
        refetch={refetch}
      />
    </div>
  );
}
