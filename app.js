let startingCurrency = document.querySelector("#start_currency");
let endingCurrency = document.querySelector("#end_currency");
let startingAmount = document.querySelector("#start_amount");
let endingAmount = document.querySelector("#end_amount");
let convertButton = document.querySelector("button");
let startingCurrencyOptions = document.querySelector("#start_currency").options; //collection of options in starting Currency dropdownlist
let endingCurrencyOptions = document.querySelector("#end_currency").options; //collection of options in ending Currency dropdown list
let nextConversion = document.querySelector("#clear_reset");
let defaultOption = document.querySelectorAll(".default_option"); //default option in list

axios.get("https://api.exchangerate.host/symbols").then(function (response) {
  console.log(response);
  let currencyAbbreviations = response.data.symbols;
  console.log(currencyAbbreviations);

  // for in loop used to iterate over each property of an object.
  // these 2 for in loops iterate over each individual abbreviation in the symbols object.  Each time that happens, a new option in the select dropdown box is created and the full description of the currency abbreviation is inserted into the new option.
  for (const curr in currencyAbbreviations) {
    const currencyListing = document.createElement("option");

    currencyListing.text = `${currencyAbbreviations[curr].description} - ${curr}`;
    startingCurrency.add(currencyListing);
  }

  for (const curr in currencyAbbreviations) {
    const currencyListing = document.createElement("option");
    currencyListing.text = `${currencyAbbreviations[curr].description} - ${curr}`;
    endingCurrency.add(currencyListing);
  }
});

// let optionsCurr = document.querySelector("#start_currency").options;
//button used to do currency conversion - makes call to api and uses 2 get parameters: from & to
convertButton.addEventListener("click", () => {
  // var requestURL = "https://api.exchangerate.host/convert?from=USD&to=EUR";
  let example = Number(startingAmount.value);
  if (isNaN(example) || example == "") {
    console.log(typeof example);
    console.log("what");
    alert("Please type a number");
    startingAmount.value = "";
  }
  console.log(example);
  let selectedCurrency = startingCurrency.selectedIndex;
  var currencyStartSymbol =
    startingCurrencyOptions[selectedCurrency].value.slice(-3);
  let selectedEndCurrency = endingCurrency.selectedIndex;
  var currencyEndSymbol =
    endingCurrencyOptions[selectedEndCurrency].value.slice(-3);

  var conversionURL = `https://api.exchangerate.host/convert?from=${currencyStartSymbol}&to=${currencyEndSymbol}`;

  axios
    // .get("https://api.exchangerate.host/convert?from=USD&to=EUR")
    .get(conversionURL)
    .then(function (response) {
      console.log(response);
      //using starting currency amount and multiplying by currency rate to get ending currency amount
      let conversionRate = response.data.info.rate;
      let newCurrencyAmount = (startingAmount.value * conversionRate).toFixed(
        5
      );
      console.log(response.data.query.from);
      endingAmount.value = newCurrencyAmount;
    });
});

//button used to clear lists and amount boxes and start new conversion
nextConversion.addEventListener("click", () => {
  clearAndReset();
});

function clearAndReset() {
  //loop resets both currency lists to default option by making it selected again
  for (const opt of defaultOption) {
    opt.selected = "selected";
  }
  startingAmount.value = "";
  endingAmount.value = "";
}
