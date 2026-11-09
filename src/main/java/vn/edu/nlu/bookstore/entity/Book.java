package vn.edu.nlu.bookstore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(columnDefinition = "TEXT")
	private String description;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private Author author;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "publisher_id")
	private Publisher publisher;

	@Column(length = 20)
	private String isbn;

	@Column(nullable = false, precision = 12, scale = 2)
	private BigDecimal price;

	@Column(name = "stock_quantity", nullable = false)
	private Integer stockQuantity = 0;

	@Column(name = "cover_image_url", length = 500)
	private String coverImageUrl;

	@Column(name = "published_year")
	private Short publishedYear;

	@Column(name = "average_rating", nullable = false, precision = 3, scale = 2)
	private BigDecimal averageRating = BigDecimal.ZERO;

	@Column(name = "rating_count", nullable = false)
	private Integer ratingCount = 0;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "book_categories",
			joinColumns = @JoinColumn(name = "book_id"),
			inverseJoinColumns = @JoinColumn(name = "category_id")
	)
	private Set<Category> categories = new HashSet<>();
}
