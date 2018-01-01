//const CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";
const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/";
//https://min-api.cryptocompare.com/
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";
const UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {}
  },

  methods: {
    getCoinData: function() {
      let self = this;

      axios.get(CRYPTOCOMPARE_API_URI + "/api/data/coinlist")
        .then((res) => {
            this.coinData = res.data.Data;
            this.getCoins();
          })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },
    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
      .then((res) => {
        this.coins = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },
    getCoinImage: function(symbol) {
      console.log(json.stringify(symbol));
      console.log(json.stringify(this.coinData));
      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      return CRYPTOCOMPARE_API_URI + this.coinData[symbol].ImageUrl;
    },
    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    },
  },
  created: function() {
  this.getCoinData();
  }
});

setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);
