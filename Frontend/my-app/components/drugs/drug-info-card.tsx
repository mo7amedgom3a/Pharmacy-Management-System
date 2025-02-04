import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Drug } from "./mockData"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

interface DrugInfoCardProps {
  drug: Drug
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  isVisible: boolean
}

export function DrugInfoCard({ drug, isOpen, onClose, onEdit, isVisible }: DrugInfoCardProps) {
  const { t } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] sm:max-h-[600px] w-[90vw] h-[90vh] p-0 overflow-hidden rounded-xl">
        <div
          className={`transition-transform duration-300 ease-in-out transform ${isVisible ? "translate-y-0" : "-translate-y-full"} h-full overflow-y-auto`}
        >
          <DialogHeader className="p-6">
            <DialogTitle>{t("drugList.title")}</DialogTitle>
          </DialogHeader>
          <Card className="border-0 shadow-none h-full">
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex justify-center mb-2">
                <Image
                  src={drug.image || "/placeholder.svg"}
                  alt={drug.name}
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <h3 className="font-semibold">{t("drugList.name")}</h3>
                  <p>{drug.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.type")}</h3>
                  <p>{drug.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.price")}</h3>
                  <p>${drug.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.manufacturer")}</h3>
                  <p>{drug.manufacturer}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.supplier")}</h3>
                  <p>{drug.supplier}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.quantity")}</h3>
                  <p>{drug.total_quantity}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.quantity")}</h3>
                  <p>{drug.current_quantity}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t("drugList.quantity")}</h3>
                  <p>{drug.min_quantity}</p>
                </div>
              </div>
              <div className="col-span-2 mt-2">
                <h3 className="font-semibold">{t("drugList.Description")}</h3>
                <p className="text-sm">{drug.description}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-end p-4">
              <Button onClick={onEdit}>{t("drugList.update")}</Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
