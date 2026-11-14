function Banner() {
  return (
    <section className="banner">
      <div className="banner-main">
        <p className="banner-eyebrow">Tuần lễ sách mới</p>
        <h1>Mỗi cuốn sách là một hành trình</h1>
        <p className="banner-text">
          Hàng nghìn đầu sách văn học, kinh tế, kỹ năng và thiếu nhi. Giảm đến 25% cho sách mới phát hành.
        </p>
        <a href="#sach-moi" className="button button-light">Khám phá ngay</a>
      </div>

      <div className="banner-side">
        <div className="promo promo-green">
          <p className="promo-title">Gợi ý dành riêng cho bạn</p>
          <p className="promo-text">Hệ thống học từ sở thích đọc của bạn để đề xuất sách phù hợp</p>
        </div>
        <div className="promo promo-yellow">
          <p className="promo-title">Freeship toàn quốc</p>
          <p className="promo-text">Cho đơn hàng từ 300.000đ</p>
        </div>
      </div>
    </section>
  )
}

export default Banner
