"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DirectionRow } from "@/components/ui/direction";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlockTemplates } from "./hooks";
import { useBlockTypes } from "../block-types/hooks";

const BlockTemplates = () => {
  const { blockTemplates, loading, openEditDialog, openDeleteDialog } =
    useBlockTemplates();
  const { blockTypeOptions } = useBlockTypes();
  const [selectedBlockType, setSelectedBlockType] = useState<string>("#");
  const filteredBlockTemplates = blockTemplates.filter((template) => {
    if (selectedBlockType === "#") return true;
    return template.blockTypeId === selectedBlockType;
  });

  return (
    <DashboardLayout>
      <TypographyH2>Block Templates</TypographyH2>
      <TypographyP className="mb-2">
        A list of your block templates.
      </TypographyP>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <>
          <Select
            value={selectedBlockType}
            onValueChange={setSelectedBlockType}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select block type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"#"}>All block types</SelectItem>
              {blockTypeOptions.map((blockType) => (
                <SelectItem key={blockType.value} value={blockType.value}>
                  {blockType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filteredBlockTemplates.length === 0 ? (
            <div className="text-center mt-4">
              <TypographyP className="text-gray-500">
                No block templates found
              </TypographyP>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredBlockTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="overflow-hidden cursor-pointer hover:opacity-80"
                  onClick={() => openEditDialog(template)}
                >
                  <div className="p-5">
                    <CardTitle className="text-base mb-2 font-semibold">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-sm mb-4 line-clamp-2">
                      {template.descriptions || "No description"}
                    </CardDescription>
                    <DirectionRow className="justify-between">
                      <Badge variant={"info"} className="capitalize">
                        {template.blockTypeCode}
                      </Badge>
                      <Button
                        variant={"danger"}
                        size={"icon"}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(template);
                        }}
                      >
                        <Trash />
                      </Button>
                    </DirectionRow>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default BlockTemplates;
