"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePages } from "./hooks";
import { useEffect, useState } from "react";
import { DirectionRow } from "@/components/ui/direction";
import { pageService } from "@/services/pages.service";
import { toast } from "sonner";

const Pages = () => {
  const router = useRouter();
  const { pages, loading, homePageId } = usePages();
  const [defaultHomePage, setDefaultHomePage] = useState<string>("");
  useEffect(() => {
    if (homePageId) {
      setDefaultHomePage(homePageId);
    }
  }, [homePageId]);
  const handleSetDefaultHomePage = async (pageId: string) => {
    await pageService
      .updateDefaultHomePage({ id: Number(pageId) })
      .then(() => {
        toast.success("Default home page updated");
        setDefaultHomePage(pageId);
      })
      .catch(() => {
        toast.error("Failed to update default home page");
      });
  };
  return (
    <DashboardLayout>
      <TypographyH2>Pages</TypographyH2>
      <TypographyP className="mb-2">A list of your pages.</TypographyP>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : pages.length === 0 ? (
        <TypographyP className="text-center text-gray-500">
          No pages found
        </TypographyP>
      ) : (
        <>
          <DirectionRow className="items-center gap-8 mb-4">
            <TypographyP className="font-bold">Home Page</TypographyP>
            <Select
              value={defaultHomePage}
              onValueChange={handleSetDefaultHomePage}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select default home page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={String(page.id)}>
                    {page.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DirectionRow>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                {/* <TableHead>SEO</TableHead>
              <TableHead>Blocks</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  {/* <TableCell>
                  <p>Title: {JSON.parse(page.seo || "{}").title}</p>
                  <p>Description: {JSON.parse(page.seo || "{}").description}</p>
                  <div>
                    Keywords:{" "}
                    {JSON.parse(page.seo || "{}").keywords?.map(
                      (keyword: string) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="capitalize mr-2"
                        >
                          {keyword}
                        </Badge>
                      )
                    )}
                  </div>
                </TableCell> */}
                  {/* <TableCell>
                  <DirectionRow className="gap-2">
                    {page.blocks?.map((block) => (
                      <Badge
                        key={block}
                        variant="outline"
                        className="capitalize"
                      >
                        {block}
                      </Badge>
                    ))}
                  </DirectionRow>
                </TableCell> */}
                  <TableCell className="text-right">
                    <Button
                      onClick={() => router.push(`/admin/pages/${page.id}`)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </DashboardLayout>
  );
};

export default Pages;
