"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogType, useDialog } from "@/context/dialog-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createBlockTemplate,
  setSelectedBlockTemplate,
  updateBlockTemplate,
} from "@/store/features/block-templates";
import { useEffect } from "react";
import { BlockTemplateFormSchema, BlockTemplateFormType } from "../types";
import { useApp } from "@/context/app-context";
import { useBlockTemplates } from "../hooks";
import { useBlockTypes } from "@/features/block-types/hooks";

const BlockTemplateDialog = () => {
  const { dispatch } = useApp();
  const form = useForm<BlockTemplateFormType>({
    resolver: zodResolver(BlockTemplateFormSchema),
  });
  const { currentDialog, closeDialog } = useDialog();
  const { selectedBlockTemplate } = useBlockTemplates();
  const { blockTypeOptions } = useBlockTypes();
  useEffect(() => {
    if (selectedBlockTemplate) {
      form.reset({
        ...selectedBlockTemplate,
        css: selectedBlockTemplate.css || "",
        schemaJson: JSON.stringify(
          JSON.parse(selectedBlockTemplate.schemaJson || "{}"),
          null,
          2
        ),
      });
    }
  }, [selectedBlockTemplate]);
  if (
    !currentDialog ||
    (currentDialog.type !== DialogType.CREATE_BLOCK_TEMPLATE &&
      currentDialog.type !== DialogType.EDIT_BLOCK_TEMPLATE)
  )
    return null;

  const handleCancel = () => {
    closeDialog();
    form.reset({
      blockTypeId: "",
      name: "",
      descriptions: "",
      schemaJson: "",
      css: "",
      previewThumbnail: "",
    });
    dispatch(setSelectedBlockTemplate(null));
  };

  const onSubmit = (values: BlockTemplateFormType) => {
    if (currentDialog.type === DialogType.CREATE_BLOCK_TEMPLATE) {
      dispatch(createBlockTemplate({ ...values }));
    } else if (currentDialog.type === DialogType.EDIT_BLOCK_TEMPLATE) {
      dispatch(
        updateBlockTemplate({ ...values, id: selectedBlockTemplate?.id })
      );
    }
    handleCancel();
  };

  return (
    <Dialog open={!!currentDialog} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentDialog.title}</DialogTitle>
          <DialogDescription>{currentDialog.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="blockTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select block type" />
                    </SelectTrigger>
                    <SelectContent>
                      {blockTypeOptions.map((blockType) => (
                        <SelectItem
                          key={blockType.value}
                          value={blockType.value}
                        >
                          {blockType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schemaJson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Structure (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder={`{\n  "key": "value"\n}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="css"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Styles (CSS)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder={`.selector {\n  color: red;\n}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriptions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter descriptions"
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        <DialogFooter>
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => form.handleSubmit(onSubmit)()}>
            {currentDialog.type === DialogType.CREATE_BLOCK_TEMPLATE
              ? "Create"
              : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTemplateDialog;
