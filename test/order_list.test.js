import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

let server;
let db;
let token;

beforeAll(async () => {
  server = await app.listen(0);
  db = Database.getInstance();
  token = issueTokenforTest("orderlist");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("주문 조회 페이지 테스트", () => {
  it("GET /ordered 에서 order_list.html 을 전송", (done) => {
    test(app)
      .get("/ordered")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>주문 조회 페이지</title>"))
      .end(done);
  });
});

describe("사용자별 주문 정보 테스트", () => {
  it("GET /ordered/wrong 에서 올바른 경로로 접근하지 않았을 때 대응", (done) => {
    test(app)
      .get("/ordered/wrong")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("올바른 URL 로 접근해주세요"))
      .end(done);
  });

  it("GET /ordered/orderlist 에서 로그인한 사용자의 결제 완료 이후 주문 정보를 전송", (done) => {
    const answer = {
      orderlist20240116075840: [
        {
          address: "리시버네 집",
          name: "리시버",
          payed_at: "2024-01-15 22:58:40",
          state: "payed",
          tel: "010-7777-7777",
          total_price: 302000,
        },
        { book_id: "8979142994", quantity: 3 },
        { book_id: "9788937437564", quantity: 2 },
        { book_id: "9788950922382", quantity: 1 },
      ],
    };

    test(app)
      .get("/ordered/orderlist")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});
