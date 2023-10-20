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
    fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        let conversionFactor = data["rates"][to_currency];
        let result = amount * conversionFactor;
        if (document.querySelector("form p"))
          document.querySelector("form p").remove();
        let text = document.createElement("p");

        text.innerHTML = `${amount} ${from_currency} to ${result.toFixed(
          2
        )} ${to_currency}`;
        document.querySelector("form").appendChild(text);
      });
  }
  console.log(from_currency, to_currency);
});
