function CategoryList({ categories }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Thể loại</h2>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <a key={category.id} href={`/category/${category.slug}`} className={`category-card category-${category.id}`}>
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count.toLocaleString('vi-VN')} đầu sách</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default CategoryList
