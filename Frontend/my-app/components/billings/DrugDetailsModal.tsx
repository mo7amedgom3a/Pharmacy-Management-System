import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Drug } from "../drugs/api/drug"
import { useLanguage } from "@/contexts/LanguageContext"

interface DrugDetailsModalProps {
  drugs: Drug[]
  onClose: () => void
}

export default function DrugDetailsModal({ drugs, onClose }: DrugDetailsModalProps) {
  const { t, language } = useLanguage()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[80vh] overflow-y-auto ${language === 'ar' ? 'rtl' : ''}`}>
        <DialogHeader>
          <DialogTitle>{t("drugList.title")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {drugs.map((drug) => (
            <Card key={drug.drug_id}>
              <CardHeader>
                <CardTitle>{drug.name}</CardTitle>
                <CardDescription>{drug.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Image
                      src={drug.image_url || "/placeholder.svg"}
                      alt={drug.name}
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>{t("drugList.Description")}:</strong> {drug.description}
                    </p>
                    <p>
                      <strong>{t("drugList.manufacturer")}:</strong> {drug.manufacturer}
                    </p>
                    <p>
                      <strong>{t("drugList.price")}:</strong> ${drug.price_per_unit.toFixed(2)}
                    </p>
                    <p>
                      <strong>{t("drugList.quantity")}:</strong> {drug.current_quantity}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
