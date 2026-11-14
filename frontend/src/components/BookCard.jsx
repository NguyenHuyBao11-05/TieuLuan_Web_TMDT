const coverColors = ['#7a3b2e', '#2f5d50', '#3d4f7c', '#8a6a2f', '#5b3a6b', '#2e6170', '#7c4a3a', '#44603a']

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ'
}

function BookCard({ book, onAddToCart }) {
  const discount = Math.round((1 - book.price / book.oldPrice) * 100)
  const coverColor = coverColors[book.id % coverColors.length]

  return (
    <article className="book-card">
      <a href={`/books/${book.id}`} className="book-cover" style={{ backgroundColor: coverColor }}>
        <span className="discount">-{discount}%</span>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">{book.author}</span>
      </a>
      <div className="book-info">
        <span className="book-category">{book.category}</span>
        <a href={`/books/${book.id}`} className="book-title">{book.title}</a>
        <span className="book-author">{book.author}</span>
        <span className="book-rating">
          <span className="star">★</span> {book.rating} ({book.ratingCount.toLocaleString('vi-VN')})
        </span>
        <div className="book-price">
          <span className="price">{formatPrice(book.price)}</span>
          <span className="old-price">{formatPrice(book.oldPrice)}</span>
        </div>
        <button type="button" className="button add-to-cart" onClick={() => onAddToCart(book)}>
          Thêm vào giỏ
        </button>
      </div>
    </article>
  )
}

export default BookCard
