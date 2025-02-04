// DeleteDialog.tsx
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteDialog({ open, onOpenChange, onConfirm }: DeleteDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <p>{t("Are you sure you want to delete this?")}</p>
        <Button variant="destructive" onClick={onConfirm}>
          {t("delete")}
        </Button>
        <DialogClose asChild>
          <Button variant="outline">{t("cancel")}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
