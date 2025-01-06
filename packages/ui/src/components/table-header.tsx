import { Plus, Search, X } from "lucide-react";
import { Label } from "./label";
import { Button } from "./button";
import { Input } from "./input";

interface TableHeaderProps {
  handlePlusFunction: () => void;
}

export const TableHeader = ({ handlePlusFunction }: TableHeaderProps) => {
  return (
    <div className="flex flex-row w-full items-center gap-2">
      <Label className="font-bold">Filtros:</Label>
      <Input placeholder="Nome do usuário" />
      <Button variant="secondary">
        <Search size={16} />
        Filtrar resultados
      </Button>
      <Button variant="outline">
        <X size={16} />
        Remover filtros
      </Button>
      <div>
        <Button variant="secondary" size="icon" onClick={handlePlusFunction}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};
