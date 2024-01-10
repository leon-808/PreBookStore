import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

let server;
let db;
let token = issueTokenforTest("leehoosgg");

beforeAll((done) => {
  server = app.listen(0, done);
  db = Database.getInstance();
  token = issueTokenforTest("leehoosgg");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("장바구니 페이지 전송 테스트", () => {
  it("GET /basket 에서 basket.html 을 전송해야함", (done) => {
    test(app)
      .get("/basket")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>장바구니 페이지</title>"))
      .end(done);
  });
});

describe("장바구니 목록 불러오기 테스트", () => {
  it("GET /:user_id 에서 해당 유저의 장바구니 목록을 전송", (done) => {
    const answer = [
      {
        id: "8979142994",
        url: "2.jpg",
        title: "읽기 쉬운 코드가 좋은 코드다",
        price: 14000,
      },
      {
        id: "9788937437564",
        url: "7.jpg",
        title: "참을 수 없는 존재의 가벼움",
        price: 15000,
      },
    ];

    test(app)
      .get("/basket/leehoosgg")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("장바구니에 도서 추가 테스트", () => {
  it("POST /:user_id/:isbn 에서 해당 유저의 장바구니에 새로운 도서 하나를 추가", (done) => {
    test(app)
      .post("/basket/leehoosgg/9788950922382") // 반지의 제왕
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect((res) => expect(res.body).toEqual(true))
      .end(done);
  });

  it("POST /:user_id/:isbn 에서 해당 유저의 장바구니에 이미 담겨 있는 도서 하나를 추가", (done) => {
    test(app)
      .post("/basket/leehoosgg/9788937437564") // 참을 수 없는 존재의 가벼움
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.CONFLICT)
      .expect((res) => expect(res.body).toEqual("이미 존재하는 값입니다."))
      .end(done);
  });
});

describe("장바구니의 도서 삭제 테스트", () => {
  it("DELETE /:user_id 에서 해당 유저가 장바구니에서 선택한 도서들을 삭제", (done) => {
    test(app)
      .delete("/basket/leehoosgg")
      .set("Authorization", `Bearer ${token}`)
      .send({ isbn_list: ["9788950922382"] })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("장바구니의 도서 삭제"))
      .end(done);
  });
});

describe("장바구니 주문 확정 테스트", () => {
  it("POST /:user_id 에서 해당 유저가 장바구니에서 선택한 도서들을 주문", (done) => {
    test(app)
      .post("/basket/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        isbn_list: ["8979142994", "9788937437564"],
        quantity_list: [3, 2],
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.CREATED)
      .expect((res) => expect(res.body).toEqual("장바구니 주문 요청"))
      .end(done);
  });

  it("POST /:user_id 에서 해당 유저가 이미 진행중인 주문이 있을 때 재 주문 차단", (done) => {
    test(app)
      .post("/basket/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        isbn_list: ["8979142994", "9788937437564"],
        quantity_list: [3, 2],
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.INTERNAL_SERVER_ERROR)
      .expect((res) => expect(res.body).toEqual("서버 내부 오류 발생."))
      .end(done);
  });
});
