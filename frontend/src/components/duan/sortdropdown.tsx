import { Select } from "@chakra-ui/react"

interface SortDropdownProps {
  onChange: (value: string) => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  return (
    <Select
      size="xs"
      maxW="120px"
      variant="subtle"
      placeholder="Sắp xếp"
      defaultValue="newest"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="newest">Mới nhất</option>
      <option value="updated">Mới cập nhật</option>
      <option value="highest_price">Giá cao nhất</option>
      <option value="lowest_price">Giá thấp nhất</option>
    </Select>
  )
}

export default SortDropdown