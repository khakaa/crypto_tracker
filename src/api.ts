const BASE_URL1 = `https://api.coinpaprika.com/v1`;
const BASE_URL2 = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL1}/coins`).then(res => res.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL1}/coins/${coinId}`).then(res => res.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL1}/tickers/${coinId}`).then(res => res.json());
}

export async function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000); // 현재를 초로 계산
  // const startDate = endDate - 60 * 60 * 24; // 현재부터 일주일 전
  const res = (await fetch(`${BASE_URL2}?coinId=${coinId}`)).json();
  return res;
}
