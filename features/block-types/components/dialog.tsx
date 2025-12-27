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
  createBlockType,
  setSelectedBlockType,
  updateBlockType,
} from "@/store/features/block-types";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toast } from "sonner";
import { useEffect } from "react";
import { BlockTypeFormSchema, BlockTypeFormType } from "../types";
import { useBlockTypes } from "../hooks";

const initialValues: BlockTypeFormType = {
  name: "",
  code: "",
  descriptions: "",
};

const BlockTypeDialog = () => {
  const dispatch = useAppDispatch();
  const { selectedBlockType } = useBlockTypes();
  const form = useForm<BlockTypeFormType>({
    resolver: zodResolver(BlockTypeFormSchema),
    defaultValues: initialValues,
  });
  const { currentDialog, closeDialog } = useDialog();
  useEffect(() => {
    if (selectedBlockType) {
      form.reset({
        name: selectedBlockType.name,
        code: selectedBlockType.code,
        descriptions: selectedBlockType.descriptions,
      });
    }
  }, [selectedBlockType]);
  if (
    !currentDialog ||
    (currentDialog.type !== DialogType.CREATE_BLOCK_TYPE &&
      currentDialog.type !== DialogType.EDIT_BLOCK_TYPE)
  )
    return null;

  const handleCancel = () => {
    closeDialog();
    form.reset();
    dispatch(setSelectedBlockType(null));
  };

  const onSubmit = (values: BlockTypeFormType) => {
    if (currentDialog.type === DialogType.CREATE_BLOCK_TYPE) {
      dispatch(createBlockType({ ...values }));
    } else if (currentDialog.type === DialogType.EDIT_BLOCK_TYPE) {
      dispatch(updateBlockType({ ...values, id: selectedBlockType?.id }));
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriptions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder="Enter descriptions"
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
            {currentDialog.type === DialogType.CREATE_BLOCK_TYPE
              ? "Create"
              : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTypeDialog;
