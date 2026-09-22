const form = document.getElementById("budgetForm");

let transactions = [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (amount <= 0) {
        alert("Du må fylle ut feltene.");
        return;
    }

    transactions.push({
        amount: amount,
        type: type,
        category: category
    });

    form.reset();

    visBudsjett();
});


function visBudsjett() {

    let oversikt = document.getElementById("transactions");

    oversikt.innerHTML = "";

    let inntekter = 0;
    let utgifter = 0;

    for (let i = 0; i < transactions.length; i++) {

        let post = transactions[i];

        let tekst = document.createElement("p");

        tekst.textContent = post.category + " - " +
                            post.amount + " kr";

        oversikt.appendChild(tekst);

        if (post.type == "income") {
            inntekter = inntekter + post.amount;
        } else {
            utgifter = utgifter + post.amount;
        }
    }

    let saldo = inntekter - utgifter;

    document.getElementById("income").textContent = inntekter;
    document.getElementById("expenses").textContent = utgifter;
    document.getElementById("balance").textContent = saldo;

    if (saldo < 0) {
        document.getElementById("balance").style.color = "red";
    } else {
        document.getElementById("balance").style.color = "green";
    }
}
