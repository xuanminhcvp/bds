interface ProjectItem {
    id: number;
    title: string;
    area: string;
    location: string;
    description: string;
    image: string;
    views: number;
  }

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  daysAgo: number;
}
interface NewsCategory {
    id: number;
    title: string;
    items: string[];
  }
  
export const newsCategories: NewsCategory[] = [
    {
      id: 1,
      title: 'Chủ đề nóng',
      items: ['Tin tức bất động sản', 'Bất động sản Hà Nội', 'Bất động sản Hồ Chí Minh', 'Báo cáo thị trường', 'Mua bất động sản', 'Xem thêm'],
    },
    {
      id: 2,
      title: 'Bất động sản bán',
      items: ['Bán căn hộ chung cư Hà Nội', 'Bán chung cư mini, căn hộ dịch vụ Hà Nội', 'Bán nhà riêng Hà Nội', 'Bán nhà biệt thư, liền kề Hà Nội', 'Bán nhà mặt phố Hà Nội', 'Xem thêm'],
    },
    {
      id: 3,
      title: 'Bất động sản cho thuê',
      items: ['Cho thuê căn hộ chung cư Hà Nội', 'Cho thuê chung cư mini, căn hộ dịch vụ Hà Nội', 'Cho thuê nhà riêng Hà Nội', 'Cho thuê nhà biệt thư, liền kề Hà Nội', 'Cho thuê nhà mặt phố Hà Nội', 'Xem thêm'],
    },
    {
      id: 4,
      title: 'Khuyến mãi thời điểm hiện tại',
      items: ['Bán căn hộ chung cư Hà Nội từ 3 đến 5 tỷ', 'Bán căn hộ chung cư Hồ Chí Minh từ 3 đến 5 tỷ', 'Bán nhà riêng Hà Nội từ 10 đến 20 tỷ', 'Bán nhà riêng Hồ Chí Minh từ 10 đến 20 tỷ', 'Bán nhà biệt thư, liền kề Hà Nội từ 10 đến 20 tỷ', 'Xem thêm'],
    },
  ];

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Căn Hộ Thủ Đức Tăng Giá, Thanh Khoản Tốt',
    description: 'Hôm nay',
    image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    daysAgo: 3,
  },
  {
    id: 2,
    title: 'Điền Biên Trí Chiều Gid Chung Cư Hà Nội',
    description: '3 ngày trước',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    daysAgo: 3,
  },
  {
    id: 3,
    title: 'Căn Hộ Sở Cấp Trong Quy 1/2025',
    description: '4 ngày trước',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    daysAgo: 4,
  },
];
  
export const projectData: ProjectItem[] = [
    {
      id: 1,
      title: 'Cà Ná New City',
      area: '64.46 ha',
      location: 'Xã Phú Điền và Xã Cà Ná, Huyện Thuận Nam, Ninh Thuận',
      description: 'Cà Ná New City là dự án Khu đô thị mới Đầm Cà Ná thuộc huyện Thuận Nam, tỉnh Ninh Thuận do Công ty cổ phần ACT Holdings làm chủ đầu tư...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 10,
    },
    {
      id: 2,
      title: 'Vinhome Grand Park',
      area: '271 ha',
      location: 'Phường Long Thạnh Mỹ, Quận 9, TP. Hồ Chí Minh',
      description: 'Vinhome Grand Park là khu đô thị thông minh với quy mô lớn tại TP. Hồ Chí Minh, do Vingroup phát triển, tích hợp nhiều tiện ích hiện đại...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 25,
    },
    {
      id: 3,
      title: 'Eco Green Sài Gòn',
      area: '14.36 ha',
      location: 'Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
      description: 'Eco Green Sài Gòn là dự án khu căn hộ cao cấp với không gian xanh, đầy đủ tiện ích như công viên, trường học, và trung tâm thương mại...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 18,
    },
    {
      id: 4,
      title: 'NovaWorld Phan Thiết',
      area: '1000 ha',
      location: 'Phường Tiến Thành, TP. Phan Thiết, Bình Thuận',
      description: 'NovaWorld Phan Thiết là khu nghỉ dưỡng tích hợp với sân golf, biệt thự biển, và nhiều tiện ích giải trí cao cấp do Novaland phát triển...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 32,
    },
    {
      id: 5,
      title: 'Sun Grand City',
      area: '35 ha',
      location: 'Phường An Thới, TP. Phú Quốc, Kiên Giang',
      description: 'Sun Grand City là khu đô thị đảo với phong cách kiến trúc Địa Trung Hải, cung cấp các sản phẩm shophouse, biệt thự và căn hộ cao cấp...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 15,
    },
    {
      id: 6,
      title: 'The Metropole Thủ Thiêm',
      area: '7.6 ha',
      location: 'Khu đô thị mới Thủ Thiêm, Quận 2, TP. Hồ Chí Minh',
      description: 'The Metropole Thủ Thiêm là dự án căn hộ hạng sang với vị trí đắc địa, view sông Sài Gòn, tích hợp nhiều tiện ích cao cấp...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 28,
    },
    {
      id: 7,
      title: 'Aqua City',
      area: '1000 ha',
      location: 'Xã Long Hưng, TP. Biên Hòa, Đồng Nai',
      description: 'Aqua City là khu đô thị sinh thái với hệ thống sông bao quanh, cung cấp không gian sống xanh và tiện ích hiện đại...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 22,
    },
    {
      id: 8,
      title: 'Empire City',
      area: '14.56 ha',
      location: 'Khu đô thị mới Thủ Thiêm, Quận 2, TP. Hồ Chí Minh',
      description: 'Empire City là dự án phức hợp với tòa tháp 88 tầng, khu căn hộ cao cấp, và trung tâm thương mại hiện đại...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 19,
    },
    {
      id: 9,
      title: 'Meyhomes Capital Phú Quốc',
      area: '56.9 ha',
      location: 'Phường An Thới, TP. Phú Quốc, Kiên Giang',
      description: 'Meyhomes Capital Phú Quốc là khu đô thị cao cấp với các sản phẩm biệt thự, nhà phố thương mại, và không gian sống xanh...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 17,
    },
    {
      id: 10,
      title: 'The Global City',
      area: '117.4 ha',
      location: 'Phường An Phú, Quận 2, TP. Hồ Chí Minh',
      description: 'The Global City là khu đô thị phức hợp với các sản phẩm nhà phố, biệt thự, và căn hộ cao cấp, tích hợp tiện ích quốc tế...',
      image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      views: 30,
    },
  ];
 