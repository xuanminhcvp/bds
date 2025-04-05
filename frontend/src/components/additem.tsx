import {
    Button, FormControl, FormErrorMessage, FormLabel,
    Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select
  } from "@chakra-ui/react"
import { userMution, useQueryClient, QueryClient } from "@tanstack/react-query"
import { type Submithandler, useForm } from "react-hook-form"
import { type ApiError, ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddItemProps {
    isOpen: boolean
    onClose: () => void 
}

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<ItemCreate>({
  mode: "onBlur",
  defaultValues: {
    title: "",
    description: "",
    price: 0,
    area: 0,
    address: "",
    propertyType: "apartment",
  },
})

const mutation = useMutation({
  mutationFn: (data: ItemCreate) =>
    ItemsService.createItem({ requestBody: data }),
  onSuccess: () => {
    showToast("Success!", "Property has created", "success")
    reset()
    onclose()
  },
  onError: (err: ApiError) => {
    handleError(err, showToast)
  },
  onSettled: () => {
    QueryClient.invalidateQueries({ queryKey: ["items"] })
  },
})

const onSubmit: Submithandler<ItemCreate> = (data) => {
  mutation.mutate(data)
}

return (
  <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
    <ModalOverlay />
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Create Property news</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        {/* title */}
        <FormControl isRequired isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">title</FormLabel>
          <Input
            id="title"
            placeholder="Nha Pho 3 tang gan trung tam"
            {...register("title", { required: "Tieu de khong duoc bo trong"})}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        {/* Mo ta*/}
        <FormControl mt={4}>
          <FormLabel htmlFor="description">Mo ta</FormLabel>
          <Input 
            id="description"
            placeholder="Nha moi xay, gan cho, co san rong"
            {...register("description")}
          />
        </FormControl>
        {/* gia */}
        <FormControl mt="4" isRequired isInvalid={!!errors.price}>
          <FormLabel htmlFor="price">Gia VND</FormLabel>
          <Input 
            id="price"
            type="number"
            placeholder="5000000000"
            {...register("price", {
              required: "Gia la bat buoc",
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        {/* Dien tich */}
        <FormControl mt={4} isRequired isInvalid={!!errors.area}>
          <FormLabel htmlFor="area">Dien tich (m2)</FormLabel>
          <Input 
            id="area"
            type="number"
            placeholder="100"
            {...register("area", {
              required: "Dien tich la bat buoc",
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>{errors.area?.message}</FormErrorMessage>
        </FormControl>

        {/* Địa chỉ */}
        <FormControl mt={4} isRequired isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Địa chỉ</FormLabel>
            <Input
              id="address"
              placeholder="123 Lê Văn Sỹ, Phường 10, Quận 3"
              {...register("address", { required: "Địa chỉ là bắt buộc." })}
            />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>

          {/* Loại bất động sản */}
          <FormControl mt={4}>
            <FormLabel htmlFor="propertyType">Loại BĐS</FormLabel>
            <Select id="propertyType" {...register("propertyType")}>
              <option value="apartment">Căn hộ</option>
              <option value="house">Nhà phố</option>
              <option value="land">Đất nền</option>
            </Select>
          </FormControl>
      </ModalBody>
      <ModalFooter gap={3}>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Đăng tin
          </Button>
          <Button onClick={onClose}>Hủy</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default AddItem
