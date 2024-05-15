document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fetchBTCPrice').addEventListener('click', fetchBitcoinPrice);
    document.getElementById('fetchETHPrice').addEventListener('click', fetchethPrice);
    document.getElementById('fetchBCHPrice').addEventListener('click', fetchBCHPrice);
    document.getElementById('fetchLTCPrice').addEventListener('click', fetchLTCPrice);

    document.getElementById('calculator').addEventListener('submit', function (event) {
        event.preventDefault();

        let AccountBalance = parseFloat(document.getElementById('AccountBalance').value);
        let marketPrice = parseFloat(document.getElementById('marketPrice').value);
        let riskAmount = parseFloat(document.getElementById('riskAmount').value);
        let stopLoss = parseFloat(document.getElementById('stopLoss').value);

        let priceDifference = Math.abs(marketPrice - stopLoss);

        let riskpercentage = (riskAmount / 100) * AccountBalance

        if (priceDifference > 0) {
            let lotSize = riskpercentage / priceDifference;
            document.getElementById("lotSizeResult").textContent = `${lotSize.toFixed(8)} `;
        } else {
            document.getElementById("lotSizeResult").textContent = 'Invalid calculation parameters. Check market price and stop loss values.';
        }
    });
});

function fetchBitcoinPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bitcoin.usd;
            document.getElementById('marketPrice').value = btcPrice;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchethPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const ethPrice = data.ethereum.usd;
            document.getElementById('marketPrice').value = ethPrice;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchBCHPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const bchPrice = data['bitcoin-cash'].usd;
            document.getElementById('marketPrice').value = bchPrice;
        })
        .catch(error => console.error('Error fetching BCH data:', error));
}


function fetchLTCPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const ltcPrice = data.litecoin.usd;
            document.getElementById('marketPrice').value = ltcPrice;
        })
        .catch(error => console.error('Error fetching LTC data:', error));
}
