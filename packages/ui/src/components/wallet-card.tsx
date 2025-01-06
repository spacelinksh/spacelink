import { RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";

interface WalletCardProps {
  title: string;
  balance: string | number;
  description: string;
  refresh: () => void;
}

export function WalletCard({ title, balance, description }: WalletCardProps) {
  return (
    <div className="flex flex-col gap-2 border border-thin p-8 rounded-lg">
      <div className="flex flex-row items-center justify-between w-full -mt-4">
        <Label className="text-sm font-mono font-bold text-gray-500/40">
          {title}
        </Label>
        <Button variant="ghost" size="icon" className="-mr-4">
          <RefreshCw />
        </Button>
      </div>
      <Label className="text-4xl font-bold">R$ {balance}</Label>
      <div className="flex flex-col w-full">
        <Label className="text-xs font-mono">{description}</Label>
      </div>
    </div>
  );
}
