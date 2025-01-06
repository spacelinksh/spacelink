import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Modal } from "@workspace/ui/components/modal";

interface CreateFinancialAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFinancialAccount({
  isOpen,
  onClose,
}: CreateFinancialAccountProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full gap-4">
        <div className="grid grid-cols-4 items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Número:</Label>
          <Input className="col-span-3" placeholder="1234567-89" />
        </div>
        <div className="grid grid-cols-4 items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Agência:</Label>
          <Input className="col-span-3" placeholder="1234567-89" />
        </div>
        <div className="grid grid-cols-4 items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">Chave PIX:</Label>
          <Input
            className="col-span-3"
            placeholder="CPF, email, chave aleatória..."
          />
        </div>
        <div className="grid grid-cols-4 items-center justify-start gap-4">
          <Label className="text-sm font-semibold font-sans">
            Proprietário:
          </Label>
          <Input className="col-span-3" placeholder="Nome do responsável" />
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <Button variant="secondary">Cancelar</Button>
          <Button>Criar</Button>
        </div>
      </div>
    </Modal>
  );
}
