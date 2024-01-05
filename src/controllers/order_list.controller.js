import path from "path";
const __dirname = path.resolve();

export const order_list_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/order_list.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const proceedToOrderList = (req, res) => {
  try {
    res.status(201).json("주문 확정 후 order_list 테이블에 추가");
  } catch (err) {
    res.status(500);
  }
};

export const getOrderList = (req, res) => {
  try {
    res.status(200).json("주문 조회 내역 가져오기");
  } catch (err) {
    res.status(500);
  }
};
