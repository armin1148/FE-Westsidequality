import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import ConfirmDialog from "@/components/dialogs/confirm";
import { DialogProvider } from "@/context/dialog-context";
import { BlockTemplateDialog } from "@/features/block-templates/components";
import { PageDialog } from "@/features/pages/components";
import { BlockTypeDialog } from "@/features/block-types/components";
import RootProvider from "@/providers/root-provider";
import { AppProvider } from "@/context/app-context";
import { CustomSessionProvider } from "@/providers/session-provider";

export const metadata = {
  title: "Westside CMS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <CustomSessionProvider>
        <RootProvider>
          <AppProvider>
            <DialogProvider>
              {children}
              <ConfirmDialog />
              <BlockTypeDialog />
              <BlockTemplateDialog />
              <PageDialog />
            </DialogProvider>
          </AppProvider>
        </RootProvider>
      </CustomSessionProvider>
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
