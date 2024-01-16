import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

let server;
let db;
let token;
let id;
let ordersAnswer;

beforeAll(async () => {
  server = await app.listen(0);
  db = Database.getInstance();
  token = issueTokenforTest("order");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("주문 페이지 테스트", () => {
  it("GET /order 에서 order.html 을 전송", (done) => {
    test(app)
      .get("/order")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>주문 페이지</title>"))
      .end(done);
  });
});

describe("현재 주문 정보 테스트", () => {
  it("GET /order/detail 에서 로그인한 사용자의 현재 주문 정보를 전송", (done) => {
    const answer = {
      books: [
        {
          isbn: "8979142994",
          price: 14000,
          quantity: 3,
        },
        {
          isbn: "9788937437564",
          price: 15000,
          quantity: 2,
        },
        {
          isbn: "9788950922382",
          price: 230000,
          quantity: 1,
        },
      ],
      id: "order20240116085229",
      total_price: 302000,
    };

    test(app)
      .get("/order/detail")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("수령인 목록 테스트", () => {
  it("GET /order/receiver/:page 에서 로그인한 사용자의 관계 있는 수령인 정보를 전송", (done) => {
    const answer = [
      {
        id: "order010-8888-8888",
        user_id: "order",
        name: "리시버2",
        address: "리시버2 네 집",
        tel: "010-8888-8888",
      },
    ];

    test(app)
      .get("/order/receiver/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("수령인 추가 테스트", () => {
  it("POST /order/receiver 에서 로그인한 사용자가 제출한 수령인 정보를 등록", (done) => {
    test(app)
      .post("/order/receiver")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "리시버3",
        address: "리시버3 네 집",
        tel: "010-9999-9999",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.CREATED)
      .expect((res) => expect(res.body).toEqual("수령인 정보 목록에 추가"))
      .end(done);
  });

  it("GET /order/receiver 에서 제출한 수령인 정보 등록 확인", (done) => {
    const answer = [
      {
        id: "order010-8888-8888",
        user_id: "order",
        name: "리시버2",
        address: "리시버2 네 집",
        tel: "010-8888-8888",
      },
      {
        id: "order010-9999-9999",
        user_id: "order",
        name: "리시버3",
        address: "리시버3 네 집",
        tel: "010-9999-9999",
      },
    ];

    test(app)
      .get("/order/receiver/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("수령인 삭제 테스트", () => {
  it("DELETE /order/receiver 에서 사용자가 선택한 수령인 정보 하나 삭제", (done) => {
    test(app)
      .delete("/order/receiver")
      .set("Authorization", `Bearer ${token}`)
      .send({
        tel: "010-9999-9999",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("수령인 정보 목록에서 삭제"))
      .end(done);
  });

  it("GET /order/receiver 에서 삭제 처리된 수령인 목록 확인", (done) => {
    const answer = [
      {
        id: "order010-8888-8888",
        user_id: "order",
        name: "리시버2",
        address: "리시버2 네 집",
        tel: "010-8888-8888",
      },
    ];

    test(app)
      .get("/order/receiver/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("주문 확정 테스트", () => {
  it("PUT /order/detail 에서 사용자가 작성한 주문을 결제 완료 처리로 업데이트", (done) => {
    test(app)
      .put("/order/detail")
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: "order20240116085229",
        receiver_id: "order010-8888-8888",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("사용자 주문 결제 진행"))
      .end(done);
  });

  it("결제 완료 처리를 롤백", async () => {
    const conn = await db.getConnection();
    const sql1 = "delete from delivery where orders_id = 'order20240116085229'";
    const sql2 = "update orders set payed_at = null where id = 'order20240116085229'";
    await conn.query(sql1);
    await conn.query(sql2);

    const res = await test(app)
      .get("/order/detail")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK);

    expect((res) => expect(res.body).toEqual(ordersAnswer));
  });
});
