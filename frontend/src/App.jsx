import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'
import BookSection from './components/BookSection'
import Footer from './components/Footer'
import { categories, recommendedIds, newBookIds, bestSellerIds, getBooksByIds } from './data/books'

function App() {
  const [cartCount, setCartCount] = useState(0)

  const handleAddToCart = () => {
    setCartCount((count) => count + 1)
  }

  return (
    <>
      <Header categories={categories} cartCount={cartCount} />
      <main className="container main">
        <Banner />
        <CategoryList categories={categories} />
        <BookSection
          title="Dành cho bạn"
          subtitle="Gợi ý dựa trên những cuốn sách bạn đã xem, mua và đánh giá"
          badge="Gợi ý cá nhân hóa"
          books={getBooksByIds(recommendedIds)}
          onAddToCart={handleAddToCart}
          highlight
        />
        <BookSection
          title="Sách mới"
          subtitle="Những đầu sách vừa phát hành"
          books={getBooksByIds(newBookIds)}
          onAddToCart={handleAddToCart}
        />
        <BookSection
          title="Bán chạy"
          subtitle="Được nhiều độc giả lựa chọn nhất tháng này"
          books={getBooksByIds(bestSellerIds)}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
