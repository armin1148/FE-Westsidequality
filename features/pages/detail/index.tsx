"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { DirectionRow } from "@/components/ui/direction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, Plus, Save, SaveAll, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogType, useDialog } from "@/context/dialog-context";
import { PageDetailFormSchema, PageDetailFormType } from "../types";
import { usePages } from "../hooks";
import { useBlockTemplates } from "@/features/block-templates/hooks";
import { formatJson, parseSchema } from "@/lib/utils";
import { blockService } from "@/services/block.service";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FormFieldRenderer } from "../components";
import { Input } from "@/components/ui/input";
import { updatePage } from "@/store/features/pages";
import { useApp } from "@/context/app-context";
import { pageService } from "@/services/pages.service";
import { BlockStatus } from "@/types/common/block-entity";
import { Switch } from "@/components/ui/switch";
import { blockContentService } from "@/services/block-content.service";

const initialValues: PageDetailFormType = {
  seo: {
    title: "",
    description: "",
    keywords: "",
  },
  data: [],
};

const PageDetail = () => {
  const { dispatch } = useApp();
  const { selectedPage, loadingDetail, openDeleteDialog } = usePages();

  const { blockTemplates, blockTemplateOptions } = useBlockTemplates();
  const { openDialog } = useDialog();
  const form = useForm<PageDetailFormType>({
    resolver: zodResolver(PageDetailFormSchema),
    defaultValues: initialValues,
  });
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const handleAddContent = async () => {
    const selectedTemplateObject = blockTemplates.find(
      (template) => String(template.id) === selectedTemplateId
    );
    if (!selectedTemplateObject) {
      toast.error("Please select a template");
      return;
    }
    const response = await blockService.create({
      pageId: Number(selectedPage?.id),
      templateId: Number(selectedTemplateObject?.id),
      status: BlockStatus.ACTIVE,
      blockOrder: fields.length + 1,
      blockTypeId: Number(selectedTemplateObject?.blockTypeId),
    });
    if (response) {
      append({
        key: response.id?.toString() || "",
        title: selectedTemplateObject?.name,
        content: "",
        schemaJson: formatJson(selectedTemplateObject?.schemaJson),
        status: BlockStatus.ACTIVE,
      });
      setSelectedTemplateId("");
    }
  };

  const handleRemoveContent = (index: number) => {
    openDialog({
      type: DialogType.CONFIRM,
      title: "Delete Content",
      description: "Are you sure you want to delete this content?",
      onConfirm: async () => {
        await blockService
          .delete({
            id: Number(fields[index].key),
          })
          .then(() => {
            toast.success("Content deleted successfully");
            remove(index);
          })
          .catch(() => {
            toast.error("Failed to delete content");
          });
      },
    });
  };

  const saveAll = form.handleSubmit((data) => {
    dispatch(
      updatePage({
        id: selectedPage?.id || "",
        seo: JSON.stringify(data.seo),
        title: selectedPage?.title || "",
        slug: selectedPage?.slug || "",
      })
    );
  });

  const saveSingle = async (index: number) => {
    const item = form.getValues(`data.${index}`);
    await blockContentService
      .create({
        blockId: Number(item.key),
        contentJson: JSON.stringify(item.content),
      })
      .then(() => {
        toast.success("Content saved successfully");
      })
      .catch(() => {
        toast.error("Failed to save content");
      });
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // Nếu kéo ra ngoài hoặc không thay đổi vị trí
    if (!destination || source.index === destination.index) return;

    // Cập nhật thứ tự trong useFieldArray
    const newFields = [...fields];
    const [removed] = newFields.splice(source.index, 1);
    newFields.splice(destination.index, 0, removed);

    move(source.index, destination.index);
    await pageService
      .updateBlockOrder({
        id: Number(selectedPage?.id),
        blocks: newFields.map((block, index) => ({
          id: Number(block.key),
          blockOrder: index + 1,
        })),
      })
      .then(() => {
        toast.success("Block order updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update block order");
      });
  };

  useEffect(() => {
    if (selectedPage) {
      const blockData = selectedPage.blocks?.map((block) => ({
        key: block.id?.toString() || "",
        title: block.template?.name,
        content: JSON.parse(block.content?.contentJson || "{}"),
        schemaJson: formatJson(block.template?.schemaJson),
        status: block.status || BlockStatus.HIDDEN,
      }));
      form.reset({
        data: blockData,
        seo: JSON.parse(selectedPage.seo || "{}"),
      });
    }
  }, [selectedPage, form]);

  return (
    <DashboardLayout>
      {loadingDetail ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <>
          <DirectionRow className="justify-between">
            <DirectionRow className="gap-2">
              <Select
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {blockTemplateOptions.map((template) => (
                    <SelectItem
                      key={template.value}
                      value={template.value?.toString()}
                    >
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="primary"
                onClick={handleAddContent}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add block</span>
              </Button>
            </DirectionRow>
            <DirectionRow className="gap-2">
              <Button
                variant="danger"
                onClick={() => openDeleteDialog(selectedPage)}
                className="gap-2"
              >
                <Trash className="h-4 w-4" />
                <span>Delete page</span>
              </Button>
              <Button variant="primary" onClick={saveAll} className="gap-2">
                <SaveAll className="h-4 w-4" />
                <span>Save page</span>
              </Button>
            </DirectionRow>
          </DirectionRow>
          <Form {...form}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="seo.title"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.keywords"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>SEO Keywords</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="accordion-droppable">
                {(provided) => (
                  <Accordion
                    type="multiple"
                    className="w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {fields.map((fieldData, index) => (
                      <Draggable
                        key={fieldData.id}
                        draggableId={fieldData.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              userSelect: "none",
                              marginBottom: 8,
                              ...provided.draggableProps.style,
                            }}
                          >
                            <AccordionItem
                              key={fieldData.id}
                              value={fieldData.id}
                              className="relative"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab p-1"
                                  >
                                    <Menu className="h-4 w-4" />
                                  </div>
                                  <AccordionTrigger>
                                    {fieldData.title}
                                  </AccordionTrigger>
                                </div>
                                <FormField
                                  control={form.control}
                                  name={`data.${index}.status`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Switch
                                          checked={
                                            field.value === BlockStatus.ACTIVE
                                          }
                                          onCheckedChange={async (checked) => {
                                            const status = checked
                                              ? BlockStatus.ACTIVE
                                              : BlockStatus.HIDDEN;

                                            field.onChange(status);

                                            await blockService
                                              .update({
                                                id: Number(fieldData.key),
                                                status: status,
                                              })
                                              .then(() => {
                                                toast.success(
                                                  status === BlockStatus.ACTIVE
                                                    ? "Block is show successfully"
                                                    : "Block is hidden successfully"
                                                );
                                              })
                                              .catch(() => {
                                                toast.error(
                                                  "Failed to update block status"
                                                );
                                              });
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <AccordionContent className="flex flex-col gap-4">
                                {parseSchema(
                                  JSON.parse(fieldData.schemaJson)
                                ).map((fieldChild) => (
                                  <FormFieldRenderer
                                    parentName={`data.${index}.content`}
                                    key={fieldChild.name}
                                    rawField={fieldChild}
                                    control={form.control}
                                  />
                                ))}
                                <DirectionRow className="justify-end gap-2">
                                  <Button
                                    variant="danger"
                                    onClick={() => handleRemoveContent(index)}
                                  >
                                    <Trash className="h-4 w-4" />
                                    <span>Delete</span>
                                  </Button>
                                  <Button
                                    variant="default"
                                    onClick={() => saveSingle(index)}
                                  >
                                    <Save className="h-4 w-4" />
                                    <span>Save</span>
                                  </Button>
                                </DirectionRow>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Accordion>
                )}
              </Droppable>
            </DragDropContext>
          </Form>
        </>
      )}
    </DashboardLayout>
  );
};

export default PageDetail;
