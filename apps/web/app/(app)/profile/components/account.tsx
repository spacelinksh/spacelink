import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";

export default function Account() {
  return (
    <div className="flex flex-col w-full gap-4 col-span-2">
      <div className="flex flex-col w-full">
        <Label className="text-lg font-bold font-sans">Conta</Label>
        <Label className="font-light font-sans">
          É assim que os outros te verão no site.
        </Label>
      </div>
      <Separator />
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row w-full items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Email:</Label>
          <Input placeholder="email@email.com" />
        </div>
        <div className="flex flex-row w-full items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Nome:</Label>
          <Input placeholder="Seu nome" />
        </div>
        <div className="flex flex-row w-full items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Senha:</Label>
          <Input placeholder="***********" type="password" />
        </div>
        <div>
          <Button className="bg-white hover:bg-white/80 text-black">
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
}
