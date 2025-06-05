import { FaList, FaPen, FaAd, FaUsers, FaUserTie, FaMoneyBillWave, FaCube, FaWallet } from "react-icons/fa";
import { VStack, Text } from "@chakra-ui/react";

export const PostStatus = {
    PENDING: "pending",
    APPROVED: "approved",
    WAITING_PAYMENT: "waiting_payment",
    DRAFT: "draft",
    ACTIVE: "active", 
};

export const SIDEBAR_ITEMS = [
  {
    label: "Quản lý tin đăng",
    icon: FaList,
    onClick: (navigate: any, setPostFilters: any, onClose?: any) => {
      setPostFilters({ status: undefined });
      navigate("/posts");
      onClose?.();
    },
    children: [
      {
        label: "Danh sách tin",
        icon: FaList,
        onClick: (navigate: any, setPostFilters: any, onClose?: any) => {
          setPostFilters({ status: undefined });
          navigate("/posts");
          onClose?.();
        },
      },
      {
        label: "Tin nháp",
        icon: FaPen,
        onClick: (navigate: any, setPostFilters: any, onClose?: any) => {
          setPostFilters({ status: PostStatus.DRAFT });
          navigate(`/posts?status=${PostStatus.DRAFT}`);
          onClose?.();
        },
      },
      {
        label: "Danh sách tin tài trợ",
        icon: FaAd,
        onClick: (navigate: any, setPostFilters: any, onClose?: any) => {
          setPostFilters({ status: PostStatus.ACTIVE });
          navigate(`/posts?status=${PostStatus.ACTIVE}`);
          onClose?.();
        },
      },
    ],
  },
  {
    label: "Quản lý khách hàng",
    icon: FaUsers,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/customers");
      onClose?.();
    },
  },
  {
    label: (
      <VStack align="start" spacing={0}>
        <Text>Gói Hội viên</Text>
        <Text fontSize="sm" color="blue.500">Tiết kiệm đến -39%</Text>
      </VStack>
    ),
    icon: FaUserTie,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/membership");
      onClose?.();
    },
  },
  {
    label: "Đăng ký mua",
    icon: FaMoneyBillWave,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/subscriptions");
      onClose?.();
    },
  },
  {
    label: (
      <VStack align="start" spacing={0}>
        <Text>Tài khoản Pro</Text>
        <Text fontSize="sm" color="gray.500">Đăng ký mua</Text>
      </VStack>
    ),
    icon: FaCube,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/pro-account");
      onClose?.();
    },
  },
  {
    label: "Quản lý tài chính",
    icon: FaWallet,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/finance");
      onClose?.();
    },
  },
  {
    label: "Thông tin số dư",
    icon: FaWallet,
    onClick: (navigate: any, _: any, onClose?: any) => {
      navigate("/balance");
      onClose?.();
    },
  },
];
