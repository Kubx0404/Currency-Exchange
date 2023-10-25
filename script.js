let currencies = {};
currencies["PLN"] = {
  currency: "złoty",
  mid: 1,
};
const fetchData = async () => {
  fetch(`http://api.nbp.pl/api/exchangerates/tables/a/?format=json`)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      data[0].rates.forEach((element) => {
        currencies[element.code] = {
          currency: element.currency,
          mid: element.mid,
        };

        document.querySelectorAll("select").forEach((select) => {
          const option = document.createElement("option");
          option.setAttribute("value", element.code);
          option.innerText = element.currency;
          select.append(option);
        });
      });
    })
    .catch(() => {
      currencies["EUR"] = {
        currency: "euro",
        mid: 4.24,
      };

      document.querySelectorAll("select").forEach((select) => {
        const option = document.createElement("option");
        option.setAttribute("value", "EUR");
        option.innerText = "euro";
        select.append(option);
      });
    });
};

const showData = () => {
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
        while (document.querySelector("form p")) {
          document.querySelector("form p").remove();
        }
      }
      let text = document.createElement("p");
      text.innerHTML = "Wprowadź dwie różne waluty";
      document.querySelector("form").appendChild(text);
    } else if (isNaN(amount)) {
      if (document.querySelector("form p")) {
        while (document.querySelector("form p")) {
          document.querySelector("form p").remove();
        }
      }
      let text = document.createElement("p");
      text.innerHTML = "Wprowadź ilość";
      document.querySelector("form").appendChild(text);
    } else if (amount < 1) {
      if (document.querySelector("form p")) {
        while (document.querySelector("form p")) {
          document.querySelector("form p").remove();
        }
      }
      let text = document.createElement("p");
      text.innerHTML = "Wprowadź wartość minimalną - co najmniej 1";
      document.querySelector("form").appendChild(text);
    } else {
      let preConversionFactor =
        from_currency == "PLN" ? 1 : currencies[from_currency].mid;
      let conversionFactor = currencies[to_currency].mid;
      let result = (amount * preConversionFactor) / conversionFactor;

      if (document.querySelector("form p"))
        while (document.querySelector("form p")) {
          document.querySelector("form p").remove();
        }
      let text = document.createElement("p");

      text.innerHTML = `${amount} ${from_currency} to ${result.toFixed(
        2
      )} ${to_currency}`;
      let today = new Date();
      let text2 = document.createElement("p");
      text2.setAttribute("id", "text2");

      text2.innerHTML = `Stan na dzień ${
        today.getDate() < 10 ? "0" : ""
      }${today.getDate()}.${
        today.getMonth() < 10 ? "0" : ""
      }${today.getMonth()}.${today.getFullYear()} 
      ${today.getHours() < 10 ? "0" : ""}${today.getHours()}:${
        today.getMinutes() < 10 ? "0" : ""
      }${today.getMinutes()}
      `;

      document.querySelector("form").appendChild(text);
      document.querySelector("form").appendChild(text2);
    }
  });
};
const main = async () => {
  const data = await fetchData();
  showData();
};
main();
