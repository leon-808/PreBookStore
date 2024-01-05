import path from "path";
const __dirname = path.resolve();

export const order_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/order.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const proceedToOrder = (req, res) => {
  try {
    res.status(200).json("장바구니의 도서 주문해서 order 테이블에 추가");
  } catch (err) {
    res.status(500);
  }
};

export const getUserOrder = (req, res) => {
  try {
    res.status(200).json("유저의 주문 정보 가져오기");
  } catch (err) {
    res.status(500);
  }
};
