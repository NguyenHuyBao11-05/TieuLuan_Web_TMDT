export const categories = [
  { id: 1, name: 'Văn học', slug: 'van-hoc', count: 1240 },
  { id: 2, name: 'Kinh tế', slug: 'kinh-te', count: 860 },
  { id: 3, name: 'Kỹ năng sống', slug: 'ky-nang-song', count: 715 },
  { id: 4, name: 'Thiếu nhi', slug: 'thieu-nhi', count: 930 },
  { id: 5, name: 'Lịch sử', slug: 'lich-su', count: 420 },
  { id: 6, name: 'Khoa học', slug: 'khoa-hoc', count: 380 },
]

export const books = [
  { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho', category: 'Văn học', price: 79000, oldPrice: 99000, rating: 4.7, ratingCount: 2310 },
  { id: 2, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng sống', price: 86000, oldPrice: 108000, rating: 4.6, ratingCount: 3120 },
  { id: 3, title: 'Cây Cam Ngọt Của Tôi', author: 'José Mauro de Vasconcelos', category: 'Văn học', price: 92000, oldPrice: 115000, rating: 4.8, ratingCount: 1875 },
  { id: 4, title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari', category: 'Lịch sử', price: 189000, oldPrice: 239000, rating: 4.7, ratingCount: 1420 },
  { id: 5, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', category: 'Kỹ năng sống', price: 72000, oldPrice: 90000, rating: 4.4, ratingCount: 1640 },
  { id: 6, title: 'Rừng Na Uy', author: 'Haruki Murakami', category: 'Văn học', price: 128000, oldPrice: 160000, rating: 4.5, ratingCount: 980 },
  { id: 7, title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', category: 'Thiếu nhi', price: 59000, oldPrice: 75000, rating: 4.8, ratingCount: 2050 },
  { id: 8, title: 'Mắt Biếc', author: 'Nguyễn Nhật Ánh', category: 'Văn học', price: 96000, oldPrice: 120000, rating: 4.7, ratingCount: 1530 },
  { id: 9, title: 'Cha Giàu Cha Nghèo', author: 'Robert Kiyosaki', category: 'Kinh tế', price: 98000, oldPrice: 125000, rating: 4.5, ratingCount: 1760 },
  { id: 10, title: 'Nghĩ Giàu Và Làm Giàu', author: 'Napoleon Hill', category: 'Kinh tế', price: 105000, oldPrice: 132000, rating: 4.4, ratingCount: 890 },
  { id: 11, title: 'Lược Sử Thời Gian', author: 'Stephen Hawking', category: 'Khoa học', price: 115000, oldPrice: 145000, rating: 4.6, ratingCount: 640 },
  { id: 12, title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', author: 'Nguyễn Nhật Ánh', category: 'Văn học', price: 102000, oldPrice: 128000, rating: 4.8, ratingCount: 2240 },
  { id: 13, title: 'Thói Quen Nguyên Tử', author: 'James Clear', category: 'Kỹ năng sống', price: 145000, oldPrice: 189000, rating: 4.7, ratingCount: 1310 },
  { id: 14, title: 'Không Gia Đình', author: 'Hector Malot', category: 'Thiếu nhi', price: 135000, oldPrice: 168000, rating: 4.6, ratingCount: 720 },
  { id: 15, title: 'Súng, Vi Trùng Và Thép', author: 'Jared Diamond', category: 'Lịch sử', price: 210000, oldPrice: 265000, rating: 4.5, ratingCount: 410 },
  { id: 16, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', category: 'Kinh tế', price: 179000, oldPrice: 225000, rating: 4.5, ratingCount: 760 },
]

export const recommendedIds = [3, 12, 6, 8, 7, 14]
export const newBookIds = [13, 16, 4, 11, 15, 5]
export const bestSellerIds = [2, 1, 9, 3, 10, 5]

export function getBooksByIds(ids) {
  return ids.map((id) => books.find((book) => book.id === id))
}
