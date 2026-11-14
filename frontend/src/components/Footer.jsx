function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a href="/" className="logo logo-footer">
            <span className="logo-mark">B</span>
            <span className="logo-text">BookStore</span>
          </a>
          <p className="footer-text">
            Nhà sách trực tuyến tích hợp hệ thống gợi ý sách cá nhân hóa.
          </p>
        </div>
        <div>
          <h3>Danh mục</h3>
          <a href="/category/van-hoc">Văn học</a>
          <a href="/category/kinh-te">Kinh tế</a>
          <a href="/category/ky-nang-song">Kỹ năng sống</a>
          <a href="/category/thieu-nhi">Thiếu nhi</a>
        </div>
        <div>
          <h3>Hỗ trợ</h3>
          <a href="/huong-dan-mua-hang">Hướng dẫn mua hàng</a>
          <a href="/chinh-sach-doi-tra">Chính sách đổi trả</a>
          <a href="/van-chuyen">Phương thức vận chuyển</a>
        </div>
        <div>
          <h3>Tài khoản</h3>
          <a href="/login">Đăng nhập</a>
          <a href="/register">Đăng ký</a>
          <a href="/orders">Đơn hàng của tôi</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">Khóa luận tốt nghiệp - Khoa Công nghệ Thông tin - Trường Đại học Nông Lâm TP.HCM</div>
      </div>
    </footer>
  )
}

export default Footer
