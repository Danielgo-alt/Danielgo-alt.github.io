// Data: array to store all transactions
// Each transaction: { amount: number, type: "income" | "expense", description: string }
let transactions = [];

// ---- Utility function WITH return value ----
function calculateBalance(transactionsArray) {
    // Uses reduce (advanced array method)
    return transactionsArray.reduce((total, tx) => {
        if (tx.type === "income") {
            return total + tx.amount;
        } else {
            return total - tx.amount;
        }
    }, 0);
}

// ---- Function WITHOUT return value: updates the DOM ----
function renderTransactions() {
    const list = document.getElementById("list");
    const filter = document.getElementById("filter").value;

    // Clear current list
    list.innerHTML = "";

    // Filter array (another array method)
    const filtered = transactions.filter(tx => {
        if (filter === "all") return true;
        return tx.type === filter;
    });

    // Loop through filtered transactions and create DOM elements
    filtered.forEach(tx => {
        const item = document.createElement("div");
        item.classList.add("transaction");
        item.classList.add(tx.type); // income or expense (for color)

        // Left side: description
        const descSpan = document.createElement("span");
        descSpan.textContent = tx.description || "(No description)";

        // Right side: amount
        const amountSpan = document.createElement("span");
        const sign = tx.type === "income" ? "+ $" : "- $";
        amountSpan.textContent = sign + tx.amount.toFixed(2);

        item.appendChild(descSpan);
        item.appendChild(amountSpan);

        list.appendChild(item);
    });

    // Update balance display using our helper function
    const balance = calculateBalance(transactions);
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// ---- Function WITHOUT return: event for Add button ----
function addEntry() {
    const amountInput = document.getElementById("amount");
    const descriptionInput = document.getElementById("description");
    const typeSelect = document.getElementById("type");

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();
    const type = typeSelect.value;

    // Conditional logic: validate input
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive number for amount.");
        return;
    }

    // Create transaction object and push into array
    const newTransaction = {
        amount: amount,
        type: type,
        description: description
    };

    transactions.push(newTransaction);

    // Clear inputs
    amountInput.value = "";
    descriptionInput.value = "";

    // Re-render list and balance
    renderTransactions();
}

// ---- Function WITHOUT return: clears all data ----
function clearAll() {
    if (transactions.length === 0) {
        alert("There are no transactions to clear.");
        return;
    }

    // Confirm and reset array
    const confirmed = confirm("Are you sure you want to clear all transactions?");
    if (!confirmed) return;

    transactions = [];
    renderTransactions();
}

// ---- Setup event listeners once DOM is loaded ----
document.addEventListener("DOMContentLoaded", () => {
    // Filter dropdown changes the view
    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", renderTransactions);

    // Clear All button
    const clearButton = document.getElementById("clearBtn");
    clearButton.addEventListener("click", clearAll);

    // Optional: allow Enter key on amount to trigger Add
    document.getElementById("amount").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addEntry();
        }
    });
});
