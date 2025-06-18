import { FilterItem, Article, FAQ } from '../types/index.ts';

export const priceRanges: FilterItem[] = [
  { label: '1 - 2 tỷ', value: '1-2' },
  { label: '2 - 3 tỷ', value: '2-3' },
  { label: '3 - 5 tỷ', value: '3-5' },
  { label: '5 - 7 tỷ', value: '5-7' },
  { label: '7 - 10 tỷ', value: '7-10' },
  { label: '10 - 20 tỷ', value: '10-20' },
  { label: '20 - 30 tỷ', value: '20-30' },
  { label: '30 - 40 tỷ', value: '30-40' },
  { label: '40 - 60 tỷ', value: '40-60' },
  { label: 'Trên 60 tỷ', value: '60-' },
];

export const areas: FilterItem[] = [
  { label: 'Dưới 30 m²', value: '-30' },
  { label: '30 - 50 m²', value: '30-50' },
  { label: '50 - 80 m²', value: '50-80' },
  { label: '80 - 100 m²', value: '80-100' },
  { label: '100 - 150 m²', value: '100-150' },
  { label: '150 - 200 m²', value: '150-200' },
  { label: '200 - 250 m²', value: '200-250' },
  { label: '250 - 300 m²', value: '250-300' },
  { label: '300 - 500 m²', value: '300-500' },
  { label: 'Trên 500 m²', value: '500-' },
];

export const featuredArticles: Article[] = [
  { id: 1, title: 'Bình Chánh Tỏa Sáng Trên Bản Đồ Phát Triển Đô Thị' },
  { id: 2, title: 'Vì Sao Thị Trường Bất Động Sản Đang Tăng Nhiệt?' },
  { id: 3, title: 'Đất Nền Hòa Lạc Nổi Sóng Đầu Năm 2025' },
  { id: 4, title: 'Nhà Ở Xã Hội Sẽ Bùng Nổ Năm 2025?' },
  {
    id: 5,
    title: '5 Điểm Nóng Sốt Đất Trước Tình Sắp Nhập - Cơ Hội Hay Rủi Ro?',
  },
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Hợp đồng thuê nhà đất có bắt buộc phải công chứng không?',
    answer:
      'Theo Luật Nhà ở 2014, hợp đồng thuê nhà không bắt buộc phải công chứng, trừ trường hợp thuê nhà ở xã hội hoặc thuê dài hạn trên 5 năm. Tuy nhiên, công chứng giúp đảm bảo tính pháp lý và tránh tranh chấp.',
  },
  {
    id: 2,
    question: 'Người nước ngoài có được thuê nhà tại Việt Nam không?',
    answer:
      'Có, người nước ngoài được phép thuê nhà tại Việt Nam nếu có giấy tờ hợp pháp như visa, giấy phép lao động, hoặc thẻ tạm trú. Thời hạn thuê thường không vượt quá thời gian của giấy tờ lưu trú.',
  },
  {
    id: 3,
    question: 'Có cần đăng ký tạm trú cho người thuê nhà không?',
    answer:
      'Có, theo Luật Cư trú 2020, người thuê nhà cần đăng ký tạm trú tại địa phương nơi sinh sống. Chủ nhà có trách nhiệm hỗ trợ người thuê làm thủ tục này trong vòng 30 ngày kể từ ngày đến ở.',
  },
  {
    id: 4,
    question: 'Chủ nhà có phải đóng thuế khi cho thuê nhà không?',
    answer:
      'Có, chủ nhà phải nộp thuế thu nhập cá nhân và thuế môn bài nếu cho thuê nhà. Thuế thu nhập cá nhân được tính dựa trên doanh thu, với mức giảm trừ tùy theo quy định hiện hành (thường 10% doanh thu).',
  },
  {
    id: 5,
    question:
      'Khi xảy ra tranh chấp về hợp đồng thuê nhà, giải quyết như thế nào?',
    answer:
      'Khi xảy ra tranh chấp, hai bên nên thương lượng hòa giải trước. Nếu không đạt được thỏa thuận, có thể khởi kiện ra tòa án nhân dân có thẩm quyền tại địa phương nơi có bất động sản để giải quyết.',
  },
  {
    id: 6,
    question:
      'Người thuê nhà có quyền gì khi hợp đồng bị chấm dứt trước thời hạn?',
    answer:
      'Người thuê có quyền yêu cầu bồi thường thiệt hại nếu hợp đồng bị chấm dứt không đúng thỏa thuận. Ngoài ra, họ có thể được hoàn lại tiền thuê đã trả trước hoặc yêu cầu thời gian để tìm chỗ ở mới.',
  },
  {
    id: 7,
    question: 'Có thể cho thuê nhà đang thế chấp ngân hàng không?',
    answer:
      'Có, nhưng cần có sự đồng ý của ngân hàng đang thế chấp. Theo Luật Dân sự, việc cho thuê tài sản thế chấp phải được ngân hàng chấp thuận bằng văn bản để tránh vi phạm hợp đồng thế chấp.',
  },
  {
    id: 8,
    question: 'Quy định về mức phạt khi vi phạm hợp đồng thuê nhà là gì?',
    answer:
      'Mức phạt vi phạm hợp đồng thuê nhà do hai bên thỏa thuận trong hợp đồng, nhưng không được vượt quá 8% giá trị phần hợp đồng bị vi phạm theo Bộ luật Dân sự 2015. Ngoài ra, có thể áp dụng bồi thường thiệt hại.',
  },
];
