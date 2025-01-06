"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Button } from "@workspace/ui/components/button";
import { TableHeader } from "@workspace/ui/components/table-header";
import { DataTable } from "@workspace/ui/components/data-table";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../../api/queries/get-customers";
import { CreateCustomer } from "./components/create-customer";
import { CustomerDetails } from "./components/customer-details";
import { Upload } from "lucide-react";
import { Customer } from "@/src/graphql/graphql";

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: customers, refetch } = useQuery(GET_CUSTOMERS);

  const containsCreateParams = searchParams.get("p") === "create";
  const containsCustomerId = searchParams.get("id") ? true : false;

  const columnHelper = createColumnHelper<Customer>();

  const columns: ColumnDef<Customer, string>[] = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Nome",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => info.getValue(),
      header: "Email",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "phone",
      cell: (info) => info.getValue(),
      header: "Telefone",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "button",
      cell: (info) => (
        <div className="flex flex-row gap-2 w-full items-center justify-end">
          <Button
            variant="outline"
            onClick={() => router.push(`/customers?id=${info.getValue()}`)}
            size="icon"
            className="w-7 h-7"
          >
            <Upload />
          </Button>
        </div>
      ),
      header: "",
      enableColumnFilter: false,
    }),
  ];

  return (
    <div className="flex flex-col w-full gap-2">
      <TableHeader
        handlePlusFunction={() => router.push("/customers?p=create&step=1")}
      />
      <DataTable columns={columns} data={customers?.getCustomers || []} />
      <CreateCustomer
        step={searchParams.get("step") || "1"}
        isOpen={containsCreateParams}
        onClose={() => router.push("/customers")}
      />
      <CustomerDetails
        isOpen={containsCustomerId}
        onClose={() => router.push("/customers")}
        refetch={refetch}
      />
    </div>
  );
}
