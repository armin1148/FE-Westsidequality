"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { EditIcon, TrashIcon } from "lucide-react";
import { useBlockTypes } from "./hooks";

const BlockTypes = () => {
  const { blockTypes, loading, openEditDialog, openDeleteDialog } =
    useBlockTypes();

  return (
    <DashboardLayout>
      <TypographyH2>Block Types</TypographyH2>
      <TypographyP className="mb-2">A list of your block types.</TypographyP>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : blockTypes.length === 0 ? (
        <TypographyP className="text-center text-gray-500">
          No block types found
        </TypographyP>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Descriptions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blockTypes.map((blockType) => (
              <TableRow key={blockType.id}>
                <TableCell>{blockType.name}</TableCell>
                <TableCell>{blockType.code}</TableCell>
                <TableCell>{blockType.descriptions}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => openEditDialog(blockType)}>
                    <EditIcon />
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-4"
                    onClick={() => openDeleteDialog(blockType)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DashboardLayout>
  );
};

export default BlockTypes;
