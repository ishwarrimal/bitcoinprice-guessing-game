const BTC_FETCH_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

async function getBTCLatestData(){
    const response = await fetch(BTC_FETCH_URL);
    const data = await response.json();
    return data
}

export async function fetchAndParseBTCPriceData(){
    const btcData = await getBTCLatestData()
    return {'price': btcData?.bpi?.USD?.rate_float, 'lastUpdated': btcData?.time?.updated}
}
