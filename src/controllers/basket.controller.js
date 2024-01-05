import path from "path";
const __dirname = path.resolve();

export const basket_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/basket.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const addBookinBasket = (req, res) => {
  try {
    res.status(201).json("장바구니에 도서 등록");
  } catch (err) {
    res.status(500);
  }
};

export const deleteBookinBasket = (req, res) => {
  try {
    res.status(200).json("장바구니의 도서 삭제");
  } catch (err) {
    res.status(500);
  }
};
