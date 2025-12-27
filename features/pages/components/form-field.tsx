"use client";
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { UploadImage } from ".";
import { Input } from "@/components/ui/input";

const FormFieldRenderer = ({ rawField, control, parentName = "" }) => {
  const name = parentName ? `${parentName}.${rawField.name}` : rawField.name;

  if (rawField.type === "image") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{rawField.name.toUpperCase()}</FormLabel>
            <FormControl>
              <UploadImage
                value={field.value || ""}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  if (rawField.type === "color") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{rawField.name.toUpperCase()}</FormLabel>
            <FormControl>
              <Input type="color" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }
  if (rawField.type === "string" || rawField.type === "number") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{rawField.name.toUpperCase()}</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  // array field
  if (rawField.type === "array") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { fields, append, remove } = useFieldArray({ control, name });
    return (
      <div className="border p-4 rounded-md space-y-3">
        <h4>{rawField.name.toUpperCase()}</h4>
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2">
            {rawField.children?.map((child) => (
              <FormFieldRenderer
                key={child.name}
                rawField={child}
                control={control}
                parentName={`${name}.${index}`}
              />
            ))}
            <Button
              variant={"danger"}
              size={"icon"}
              onClick={() => remove(index)}
            >
              <Trash />
            </Button>
          </div>
        ))}
        <Button variant={"primary"} size={"icon"} onClick={() => append({})}>
          <Plus />
        </Button>
      </div>
    );
  }

  return null;
};

export default FormFieldRenderer;
