import path from "path";
const __dirname = path.resolve();

export const getRecentReviews = (req, res) => {
  try {
    res.status(200).json("해당 도서 최근 리뷰 가져오기");
  } catch (err) {
    res.status(500);
  }
};

export const getReviewsbyPage = (req, res) => {
  try {
    res.status(200).json("해당 도서 페이지별 리뷰 가져오기");
  } catch (err) {
    res.status(500);
  }
};

export const createReview = (req, res) => {
  try {
    res.status(200).json("리뷰 작성");
  } catch (err) {
    res.status(500);
  }
};

export const updateReview = (req, res) => {
  try {
    res.status(200).json("리뷰 수정");
  } catch (err) {
    res.status(500);
  }
};

export const deleteReview = (req, res) => {
  try {
    res.status(200).json("리뷰 삭제");
  } catch (err) {
    res.status(500);
  }
};
