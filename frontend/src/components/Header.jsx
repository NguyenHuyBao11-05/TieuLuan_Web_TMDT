import { useState } from 'react'

function Header({ categories, cartCount }) {
  const [keyword, setKeyword] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
  }

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Miễn phí giao hàng cho đơn từ 300.000đ</span>
          <span className="topbar-right">Đổi trả trong 7 ngày</span>
        </div>
      </div>

      <div className="container header-main">
        <a href="/" className="logo">
          <span className="logo-mark">B</span>
          <span className="logo-text">BookStore</span>
        </a>

        <form className="search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Tìm theo tên sách, tác giả..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button type="submit">Tìm</button>
        </form>

        <div className="header-actions">
          <a href="/login" className="header-link">Đăng nhập</a>
          <a href="/cart" className="cart-button">
            Giỏ hàng
            <span className="cart-count">{cartCount}</span>
          </a>
        </div>
      </div>

      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-link active">Trang chủ</a>
          {categories.map((category) => (
            <a key={category.id} href={`/category/${category.slug}`} className="nav-link">
              {category.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
