from pathlib import Path

import numpy as np
import pandas as pd

DATA_DIR = Path(__file__).parent / "data"
NUM_USERS = 2000
NUM_BOOKS = 2000
MIN_RATINGS_PER_USER = 20
NEIGHBORS = 30
TEST_RATIO = 0.2
LIKE_THRESHOLD = 4
K_VALUES = [5, 10, 20]
SEED = 42


def load_data():
    ratings = pd.read_csv(DATA_DIR / "ratings.csv")
    books = pd.read_csv(DATA_DIR / "books.csv", usecols=["book_id", "title", "authors"])

    top_books = ratings["book_id"].value_counts().head(NUM_BOOKS).index
    ratings = ratings[ratings["book_id"].isin(top_books)]

    user_counts = ratings["user_id"].value_counts()
    active_users = user_counts[user_counts >= MIN_RATINGS_PER_USER].index
    rng = np.random.default_rng(SEED)
    sample_users = rng.choice(active_users, size=NUM_USERS, replace=False)
    ratings = ratings[ratings["user_id"].isin(sample_users)]

    return ratings, books


def split_train_test(ratings):
    test = ratings.groupby("user_id").sample(frac=TEST_RATIO, random_state=SEED)
    train = ratings.drop(test.index)
    return train, test


def build_matrix(train):
    user_ids = sorted(train["user_id"].unique())
    book_ids = sorted(train["book_id"].unique())
    user_index = {user_id: i for i, user_id in enumerate(user_ids)}
    book_index = {book_id: i for i, book_id in enumerate(book_ids)}

    matrix = np.zeros((len(user_ids), len(book_ids)), dtype=np.float32)
    rows = train["user_id"].map(user_index).to_numpy()
    cols = train["book_id"].map(book_index).to_numpy()
    matrix[rows, cols] = train["rating"].to_numpy()

    return matrix, user_index, book_index, book_ids


def build_test_liked(test, user_index, book_index):
    liked = test[(test["rating"] >= LIKE_THRESHOLD) & test["book_id"].isin(book_index.keys())]
    test_liked = {}
    for user_id, group in liked.groupby("user_id"):
        test_liked[user_index[user_id]] = {book_index[b] for b in group["book_id"]}
    return test_liked


def cosine_similarity(vectors):
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    norms[norms == 0] = 1
    normalized = vectors / norms
    return normalized @ normalized.T


def user_based_scores(matrix):
    similarity = cosine_similarity(matrix)
    np.fill_diagonal(similarity, 0)
    scores = np.zeros_like(matrix)
    for u in range(matrix.shape[0]):
        neighbors = np.argsort(similarity[u])[::-1][:NEIGHBORS]
        scores[u] = similarity[u, neighbors] @ matrix[neighbors]
    return scores


def item_based_scores(matrix):
    similarity = cosine_similarity(matrix.T)
    np.fill_diagonal(similarity, 0)
    return matrix @ similarity


def popularity_scores(matrix):
    popularity = (matrix > 0).sum(axis=0).astype(np.float32)
    return np.tile(popularity, (matrix.shape[0], 1))


def recommend_top_k(scores, matrix, k):
    scores = scores.copy()
    scores[matrix > 0] = -np.inf
    return np.argsort(-scores, axis=1)[:, :k]


def evaluate(top_items, test_liked, k):
    precisions = []
    recalls = []
    for u, liked in test_liked.items():
        hits = len(set(top_items[u, :k]) & liked)
        precisions.append(hits / k)
        recalls.append(hits / len(liked))
    return np.mean(precisions), np.mean(recalls)


def print_example(user_id, matrix, user_index, book_ids, top_items, books, k=5):
    titles = books.set_index("book_id")["title"]
    u = user_index[user_id]

    print(f"\nVi du nguoi dung {user_id}")
    print("Sach da danh gia cao:")
    rated = np.argsort(-matrix[u])[:k]
    for i in rated:
        print(f"  {int(matrix[u, i])} sao - {titles[book_ids[i]]}")

    print("Sach duoc goi y (Item-based):")
    for i in top_items[u, :k]:
        print(f"  {titles[book_ids[i]]}")


def main():
    ratings, books = load_data()
    train, test = split_train_test(ratings)
    matrix, user_index, book_index, book_ids = build_matrix(train)
    test_liked = build_test_liked(test, user_index, book_index)

    print(f"So nguoi dung: {matrix.shape[0]}")
    print(f"So sach: {matrix.shape[1]}")
    print(f"So danh gia: train {len(train)}, test {len(test)}")
    print(f"Do thua ma tran: {1 - (matrix > 0).mean():.2%}")
    print(f"So nguoi dung duoc danh gia: {len(test_liked)}")

    methods = {
        "Pho bien (baseline)": popularity_scores(matrix),
        "User-based CF": user_based_scores(matrix),
        "Item-based CF": item_based_scores(matrix),
    }

    max_k = max(K_VALUES)
    header = "| Phuong phap | " + " | ".join(f"P@{k} | R@{k}" for k in K_VALUES) + " |"
    print("\n" + header)
    print("|---" * (1 + 2 * len(K_VALUES)) + "|")

    top_items_by_method = {}
    for name, scores in methods.items():
        top_items = recommend_top_k(scores, matrix, max_k)
        top_items_by_method[name] = top_items
        cells = []
        for k in K_VALUES:
            precision, recall = evaluate(top_items, test_liked, k)
            cells.append(f"{precision:.4f} | {recall:.4f}")
        print(f"| {name} | " + " | ".join(cells) + " |")

    example_user = sorted(user_index.keys())[0]
    print_example(example_user, matrix, user_index, book_ids, top_items_by_method["Item-based CF"], books)


if __name__ == "__main__":
    main()
