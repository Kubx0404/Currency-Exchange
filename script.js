let currencies = {};
currencies["PLN"] = {
  currency: "złoty",
  mid: 1,
};

fetch(`http://api.nbp.pl/api/exchangerates/tables/a/?format=json`)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    data[0].rates.forEach((element) => {
      currencies[element.code] = {
        currency: element.currency,
        mid: element.mid,
      };
      console.log(currencies[element.code]);

      document.querySelectorAll("select").forEach((select) => {
        const option = document.createElement("option");
        option.setAttribute("value", element.code);
        option.innerText = element.currency;
        select.append(option);
      });
    });
  });

document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  let from_currency = document.querySelector("#from_currency").value;
  let to_currency = document.querySelector("#to_currency").value;
  let amount = parseFloat(document.querySelector("#amount").value);

  if (
    from_currency == to_currency ||
    from_currency == "" ||
    to_currency == ""
  ) {
    if (document.querySelector("form p")) {
      document.querySelector("form p").remove();
    }
    let text = document.createElement("p");
    text.innerHTML = "Wprowadź dwie różne waluty";
    document.querySelector("form").appendChild(text);
  } else if (isNaN(amount)) {
    if (document.querySelector("form p")) {
      document.querySelector("form p").remove();
    }
    let text = document.createElement("p");
    text.innerHTML = "Wprowadź ilość";
    document.querySelector("form").appendChild(text);
  } else {
    let preConversionFactor =
      from_currency == "PLN" ? 1 : currencies[from_currency].mid;
    let conversionFactor = currencies[to_currency].mid;
    let result = (amount * preConversionFactor) / conversionFactor;
    if (document.querySelector("form p"))
      document.querySelector("form p").remove();
    let text = document.createElement("p");

    text.innerHTML = `${amount} ${from_currency} to ${result.toFixed(
      2
    )} ${to_currency}`;
    document.querySelector("form").appendChild(text);
  }
});
