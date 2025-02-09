import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Drug } from "../drugs/api/drug"
interface DrugSelectorProps {
  drugs: Drug[]
  selectedDrug: Drug | undefined
  onSelectDrug: (drug: Drug) => void
}
export function DrugSelector({ drugs, selectedDrug, onSelectDrug }: DrugSelectorProps) {
    return (
        <Select
        onValueChange={(value) =>
            onSelectDrug(drugs.find((item) => item.drug_id === Number.parseInt(value)) || drugs[0])
        }
        value={selectedDrug?.drug_id.toString()}
        >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a drug" />
        </SelectTrigger>
        <SelectContent>
            {drugs.map((item) => (
            <SelectItem key={item.drug_id} value={item.drug_id.toString()}>
                {item.name}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    )
    }