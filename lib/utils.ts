import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJson(json: string) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return json || "";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSchema(schema: any, path = "") {
  if (schema.type === "object" && schema.properties) {
    return Object.entries(schema.properties).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, value]: [string, any]) => {
        const fullPath = key;
        if (value.type === "object" || value.type === "array") {
          return {
            name: fullPath,
            type: value.type,
            required: !!value.required,
            schema: value,
            children: parseSchema(value, fullPath),
          };
        }
        return {
          name: fullPath,
          type: value.type,
          required: !!value.required,
          schema: value,
        };
      }
    );
  }

  if (schema.type === "array" && schema.items) {
    return parseSchema(schema.items, path);
  }

  return [];
}

// handle split text /n to <br />
export function parseLineBreak(text: string) {
  return text?.replace(/\n/g, "<br />");
}

export function smoothScrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
