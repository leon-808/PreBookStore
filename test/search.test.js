import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

let server;
let db;

beforeAll(async () => {
  server = app.listen(0);
  db = Database.getInstance();
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("도서 검색 페이지 테스트", () => {
  it("/books 에서 search.html 을 전송", (done) => {
    test(app)
      .get("/books")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>검색 페이지</title>"))
      .end(done);
  });
});

describe("도서 검색 기능 테스트", () => {
  it("/books/search 에서 파라미터가 전부 null 일 경우", (done) => {
    const answer = [
      {
        id: "9791158393915",
        category: "컴퓨터, IT",
        title: "파이브 라인스 오브 코드",
        author: "크리스찬 클라우젠",
        publication_date: "2023-01-19",
        catchpharase: "다섯 줄 제한 규칙으로 시작하는 체계적이고 효과적인 리팩터링 수련법",
        price: 28000,
        url: "1.jpg",
        like_count: 0,
      },
      {
        id: "8979142994",
        category: "컴퓨터, IT",
        title: "읽기 쉬운 코드가 좋은 코드다",
        author: "박진수",
        publication_date: "2004-09-01",
        catchpharase: "더 나은 코드를 작성하는 간단하고 실전적인 테크닉",
        price: 14000,
        url: "2.jpg",
        like_count: 1,
      },
      {
        id: "9788983925664",
        category: "판타지",
        title: "해리포터",
        author: "J.K. 롤링",
        publication_date: "2014-12-22",
        catchpharase: "해리포터 20주년 기념 개정판 세트",
        price: 236000,
        url: "3.jpg",
        like_count: 0,
      },
    ];

    test(app)
      .get("/books/search/?keyword=null&category=null&sDate=null&eDate=null&orderBy=null&page=null")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("/books/search 에서 키워드가 '해리' 일 경우", (done) => {
    const answer = [
      {
        id: "9788983925664",
        category: "판타지",
        title: "해리포터",
        author: "J.K. 롤링",
        publication_date: "2014-12-22",
        catchpharase: "해리포터 20주년 기념 개정판 세트",
        price: 236000,
        url: "3.jpg",
        like_count: 0,
      },
    ];

    test(app)
      .get("/books/search/?keyword=%ED%95%B4%EB%A6%AC&category=null&sDate=null&eDate=null&orderBy=null&page=1")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("/books/search 에서 카테고리가 '컴퓨터, IT' 일 경우", (done) => {
    const answer = [
      {
        id: "9791158393915",
        category: "컴퓨터, IT",
        title: "파이브 라인스 오브 코드",
        author: "크리스찬 클라우젠",
        publication_date: "2023-01-19",
        catchpharase: "다섯 줄 제한 규칙으로 시작하는 체계적이고 효과적인 리팩터링 수련법",
        price: 28000,
        url: "1.jpg",
        like_count: 0,
      },
      {
        id: "8979142994",
        category: "컴퓨터, IT",
        title: "읽기 쉬운 코드가 좋은 코드다",
        author: "박진수",
        publication_date: "2004-09-01",
        catchpharase: "더 나은 코드를 작성하는 간단하고 실전적인 테크닉",
        price: 14000,
        url: "2.jpg",
        like_count: 1,
      },
    ];

    test(app)
      .get("/books/search/?keyword=null&category=0&sDate=null&eDate=null&orderBy=null&page=1")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("/books/search 에서 시작일이 2024-01-01, 종료일이 2024-01-07 일 경우", (done) => {
    const answer = [
      {
        id: "9791171173525",
        category: "과학",
        title: "퍼펙트 게스",
        author: "이인아",
        publication_date: "2024-01-03",
        catchpharase: "불확실성을 확신으로 바꾸는 맥락의 뇌 과학",
        price: 19800,
        url: "6.jpg",
        like_count: 0,
      },
    ];

    test(app)
      .get("/books/search/?keyword=null&category=null&sDate=2024-01-01&eDate=2024-01-07&orderBy=null&page=1")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("/books/search 에서 정렬 순서가 expansive 일 경우", (done) => {
    const answer = [
      {
        id: "9788983925664",
        category: "판타지",
        title: "해리포터",
        author: "J.K. 롤링",
        publication_date: "2014-12-22",
        catchpharase: "해리포터 20주년 기념 개정판 세트",
        price: 236000,
        url: "3.jpg",
        like_count: 0,
      },
      {
        id: "9788950922382",
        category: "판타지",
        title: "반지의 제왕",
        author: "J.R.R. 톨킨",
        publication_date: "2023-03-20",
        catchpharase: "반지의 제왕 일러스트 특별판",
        price: 230000,
        url: "4.jpg",
        like_count: 0,
      },
      {
        id: "9791158393915",
        category: "컴퓨터, IT",
        title: "파이브 라인스 오브 코드",
        author: "크리스찬 클라우젠",
        publication_date: "2023-01-19",
        catchpharase: "다섯 줄 제한 규칙으로 시작하는 체계적이고 효과적인 리팩터링 수련법",
        price: 28000,
        url: "1.jpg",
        like_count: 0,
      },
    ];

    test(app)
      .get("/books/search/?keyword=null&category=null&sDate=null&eDate=null&orderBy=expansive&page=1")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("/books/search 에서 페이지가 2 일 경우", (done) => {
    const answer = [
      {
        id: "9788950922382",
        category: "판타지",
        title: "반지의 제왕",
        author: "J.R.R. 톨킨",
        publication_date: "2023-03-20",
        catchpharase: "반지의 제왕 일러스트 특별판",
        price: 230000,
        url: "4.jpg",
        like_count: 0,
      },
      {
        id: "9791160079982",
        category: "경제, 경영",
        title: "더 커밍 웨이브",
        author: "무스타파 술레이만",
        publication_date: "2024-01-11",
        catchpharase: "알파고와 딥마인드의 창조자가 말하는 AI 와 인류의 새로운 미래",
        price: 25000,
        url: "5.jpg",
        like_count: 0,
      },
      {
        id: "9791171173525",
        category: "과학",
        title: "퍼펙트 게스",
        author: "이인아",
        publication_date: "2024-01-03",
        catchpharase: "불확실성을 확신으로 바꾸는 맥락의 뇌 과학",
        price: 19800,
        url: "6.jpg",
        like_count: 0,
      },
    ];

    test(app)
      .get("/books/search/?keyword=null&category=null&sDate=null&eDate=null&orderBy=null&page=2")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});
