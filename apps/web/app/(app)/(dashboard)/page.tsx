"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col w-full gap-4">
        <Card>
          <CardHeader>
            <Label className="text-md font-semibold font-sans">
              Evolução mensal
            </Label>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <Label>Nenhum resultado para ser exibido.</Label>
              <Button variant="link">Atualizar gráficos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
