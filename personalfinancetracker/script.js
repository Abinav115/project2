// Get elements
const balanceElement = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');
const transactionTypeInput = document.getElementById('transaction-type');
const transactionDescriptionInput = document.getElementById('transaction-description');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionList = document.getElementById('transaction-list');

let balance = 0;
let transactions = [];

// Function to update balance
const updateBalance = () => {
  balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
};

// Function to display transactions
const displayTransactions = () => {
  transactionList.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const { type, description, amount } = transaction;
    const sign = type === 'income' ? '+' : '-';
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${description}</span> <span>${sign}$${amount.toFixed(2)}</span> <button onclick="deleteTransaction(${index})">Delete</button>`;
    transactionList.appendChild(listItem);
  });
};

// Function to add a transaction
const addTransaction = (event) => {
  event.preventDefault();
  
  const type = transactionTypeInput.value;
  const description = transactionDescriptionInput.value;
  const amount = parseFloat(transactionAmountInput.value);

  if (!description.trim() || isNaN(amount)) {
    return;
  }

  const transaction = {
    type,
    description,
    amount
  };

  transactions.push(transaction);

  if (type === 'income') {
    balance += amount;
  } else {
    balance -= amount;
  }

  updateBalance();
  displayTransactions();

  transactionDescriptionInput.value = '';
  transactionAmountInput.value = '';
};

// Function to delete a transaction
const deleteTransaction = (index) => {
  const transaction = transactions[index];
  if (transaction.type === 'income') {
    balance -= transaction.amount;
  } else {
    balance += transaction.amount;
  }

  transactions.splice(index, 1);

  updateBalance();
  displayTransactions();
};

// Event listener for form submit
transactionForm.addEventListener('submit', addTransaction);
