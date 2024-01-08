const url =
  "localhost:8888/books/search?keyword=해리&category=판타지&sDate=2023-01-01&eDate=2023-12-31&orderBy=expansive&page=1";
let encoded = url.replace(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g, (match) => {
  return encodeURIComponent(match);
});
