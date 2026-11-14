import BookCard from './BookCard'

function BookSection({ title, subtitle, badge, books, onAddToCart, highlight }) {
  const sectionId = title === 'Sách mới' ? 'sach-moi' : undefined

  return (
    <section id={sectionId} className={highlight ? 'section section-highlight' : 'section'}>
      <div className="section-header">
        <div>
          <div className="section-title">
            <h2>{title}</h2>
            {badge && <span className="badge">{badge}</span>}
          </div>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <a href="/books" className="see-all">Xem tất cả</a>
      </div>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default BookSection
