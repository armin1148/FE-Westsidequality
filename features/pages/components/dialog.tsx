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
import { PageFormSchema, PageFormType } from "../types";
import { createPage } from "@/store/features/pages/pages.thunks";
import { useApp } from "@/context/app-context";

const initialValues: PageFormType = {
  title: "",
  slug: "",
  seo: "",
};

const PageDialog = () => {
  const { dispatch } = useApp();
  const form = useForm<PageFormType>({
    resolver: zodResolver(PageFormSchema),
    defaultValues: initialValues,
  });
  const { currentDialog, closeDialog } = useDialog();
  if (!currentDialog || currentDialog.type !== DialogType.CREATE_PAGE)
    return null;

  const handleCancel = () => {
    closeDialog();
    form.reset();
  };

  const onSubmit = (values: PageFormType) => {
    dispatch(createPage({ ...values }));
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter slug" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder={`{\n  "title": "value",\n  "description": "value",\n  "keywords": "value"\n}`}
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
          <Button onClick={() => form.handleSubmit(onSubmit)()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageDialog;
