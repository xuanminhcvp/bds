"use client"

import {
  Portal,
  SelectRoot,
  SelectTrigger,
  SelectControl,
  SelectValueText,
  SelectIndicator,
  SelectIndicatorGroup,
  SelectContent,
  SelectItem,
  SelectPositioner,
  SelectHiddenSelect,
  createListCollection 
} from "@chakra-ui/react"

interface SortDropdownProps {
  onChange: (value: string) => void
}

const options =  createListCollection({
  items: [
    { label: "Mới nhất", value: "newest" },
    { label: "Mới cập nhật", value: "updated" },
    { label: "Giá cao nhất", value: "highest_price" },
    { label: "Giá thấp nhất", value: "lowest_price" },
    ],
})

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  return (
<SelectRoot
    collection={options}
    defaultValue={["newest"]} 
    onValueChange={({ value }) => onChange(Array.isArray(value) ? value[0] : value)} 
    size="xs"
    maxW={"120px"}
    variant={"subtle"}
>      
    <SelectHiddenSelect />
      <SelectControl width="auto" borderRadius="md">
        <SelectTrigger>
          <SelectValueText placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectIndicatorGroup>
          <SelectIndicator />
        </SelectIndicatorGroup>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            {options.items.map((opt) => (
              <SelectItem key={opt.value} item={opt}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </SelectRoot>
  )
}

export default SortDropdown
