# Thử nghiệm Collaborative Filtering

Thử nghiệm ban đầu để kiểm tra hai thuật toán lọc cộng tác (User-based, Item-based) trên bộ dữ liệu sách công khai, đo bằng Precision@K và Recall@K. Đây là bản cơ bản, chưa tinh chỉnh tham số.

## 1. Dữ liệu

Bộ **Goodbooks-10k** (nguồn: https://github.com/zygmuntz/goodbooks-10k): khoảng 6 triệu lượt đánh giá 1–5 sao của 53 nghìn người dùng cho 10 nghìn đầu sách trên Goodreads.

Để chạy nhanh trên máy cá nhân, chỉ lấy một phần:

| Thông số | Giá trị |
|---|---|
| Số sách | 2.000 sách có nhiều lượt đánh giá nhất |
| Số người dùng | 2.000 người, chọn ngẫu nhiên trong số người đánh giá ít nhất 20 sách |
| Số đánh giá | 153.405 (train 122.735, test 30.670) |
| Độ thưa của ma trận | 96,93% ô trống |

Độ thưa 96,93% nghĩa là mỗi người chỉ đánh giá khoảng 3% số sách. Đây chính là bài toán của hệ gợi ý: đoán xem người dùng sẽ thích những ô trống nào.

## 2. Cách làm

1. **Chia dữ liệu:** với mỗi người dùng, giấu ngẫu nhiên 20% đánh giá làm tập test, 80% còn lại làm tập train.
2. **Tạo ma trận người dùng – sách** từ tập train: hàng là người dùng, cột là sách, giá trị là số sao, ô trống là 0.
3. **Tính độ tương đồng cosine:**
   - *User-based:* so sánh hai hàng (hai người dùng). Hai người chấm điểm giống nhau trên nhiều sách thì tương đồng cao.
   - *Item-based:* so sánh hai cột (hai cuốn sách). Hai cuốn được cùng nhóm người thích thì tương đồng cao.
4. **Tính điểm gợi ý:**
   - *User-based:* lấy 30 người giống nhất, sách nào họ chấm cao thì được điểm cao.
   - *Item-based:* sách nào giống với những cuốn người dùng đã chấm cao thì được điểm cao.
5. **Gợi ý top-K:** bỏ các sách người dùng đã đánh giá, lấy K sách điểm cao nhất.
6. **Đánh giá:** sách trong tập test được chấm từ 4 sao trở lên coi là sách người dùng "thích". So sánh danh sách gợi ý với các sách này.

**Phương pháp so sánh (baseline):** gợi ý sách phổ biến nhất, giống nhau cho mọi người. Đây cũng là cách hệ thống dùng cho người dùng mới (cold-start).

## 3. Độ đo

- **Precision@K:** trong K sách gợi ý, có bao nhiêu phần trăm là sách người dùng thực sự thích. Đo độ chính xác.
- **Recall@K:** trong tất cả sách người dùng thích (ở tập test), gợi ý trúng được bao nhiêu phần trăm. Đo độ bao phủ.

Ví dụ: gợi ý 10 cuốn, trúng 2 cuốn, người dùng thích tổng cộng 8 cuốn thì Precision@10 = 2/10 = 0,2 và Recall@10 = 2/8 = 0,25.

## 4. Kết quả

Kết quả chạy ngày 14/11/2026:

| Phương pháp | P@5 | R@5 | P@10 | R@10 | P@20 | R@20 |
|---|---|---|---|---|---|---|
| Phổ biến (baseline) | 0,1003 | 0,0456 | 0,0778 | 0,0712 | 0,0612 | 0,1102 |
| User-based CF | 0,2650 | 0,1310 | **0,1994** | 0,1936 | 0,1417 | 0,2725 |
| Item-based CF | **0,2673** | **0,1321** | 0,1960 | 0,1926 | 0,1405 | **0,2746** |

**Nhận xét:**
- Cả hai phương pháp CF đều tốt hơn baseline khoảng **2,5 đến 3 lần**. Ví dụ với 10 sách gợi ý, CF trúng trung bình 2 cuốn, còn gợi ý theo độ phổ biến chỉ trúng chưa tới 1 cuốn. Gợi ý cá nhân hóa có hiệu quả rõ rệt.
- User-based và Item-based cho kết quả gần như bằng nhau trên tập dữ liệu này.
- K càng lớn thì Precision giảm, Recall tăng: gợi ý nhiều sách thì dễ trúng hơn, nhưng tỉ lệ trúng trên mỗi cuốn thấp đi.

**Ví dụ một người dùng:** người dùng số 16 chấm 5 sao cho *A Farewell to Arms*, *The Good Earth*, *The Prince and the Pauper*. Item-based gợi ý *1984*, *To Kill a Mockingbird*, *The Great Gatsby*, *Of Mice and Men*. Cùng là văn học kinh điển, dù thuật toán không hề biết thể loại sách mà chỉ dựa vào hành vi đánh giá.

## 5. Hướng áp dụng vào hệ thống

- Chọn **Item-based** làm phương pháp chính: độ tương đồng giữa các sách ít thay đổi nên tính trước theo lô được, và cũng dùng luôn cho mục "Sách liên quan" ở trang chi tiết.
- Viết lại thuật toán bằng Java trong Spring Boot, chạy định kỳ rồi lưu kết quả vào bảng `recommendation_cache`.
- Người dùng mới chưa có dữ liệu thì dùng gợi ý theo độ phổ biến.

**Việc tiếp theo:** chuẩn hóa điểm theo trung bình của mỗi người dùng, thử nhiều giá trị số láng giềng, so sánh thêm Matrix Factorization, chạy trên toàn bộ dữ liệu.

## 6. Cách chạy

Cần Python 3 với `numpy` và `pandas`.

1. Tải `ratings.csv` và `books.csv` từ repo Goodbooks-10k, đặt vào thư mục `docs/05-recommendation/data/`. Thư mục này không đưa lên git.
2. Chạy lệnh:

```bash
python docs/05-recommendation/cf_experiment.py
```

Mất khoảng 5 giây. Các thông số (số người dùng, số sách, số láng giềng, K) khai báo ở đầu file [cf_experiment.py](cf_experiment.py).
