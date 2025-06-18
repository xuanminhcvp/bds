export function formatPrice(price: number | string) {
  const numPrice = typeof price === 'string' ? Number(price) : price;
  if (isNaN(numPrice)) return 'Liên hệ';
  if (numPrice < 1_000_000_000) {
    // Giá < 1 tỷ, hiển thị theo triệu
    const priceInMillion = numPrice / 1_000_000;
    return Number.isInteger(priceInMillion)
      ? priceInMillion.toLocaleString('vi-VN') + ' triệu'
      : priceInMillion.toLocaleString('vi-VN', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) + ' triệu';
  } else {  
    // Giá >= 1 tỷ, hiển thị theo tỷ
    const priceInBillion = numPrice / 1_000_000_000;
    let str = priceInBillion.toLocaleString('vi-VN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // Xóa số 0 cuối nếu có
    if (str.endsWith('00')) str = str.slice(0, -3);
    else if (str.endsWith('0')) str = str.slice(0, -1);
    // Xóa dấu phẩy cuối nếu cần
    if (str.endsWith(',')) str = str.slice(0, -1);
    return str + ' tỷ';
  }
}