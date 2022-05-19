const moneysEl_one = document.getElementById('money-one');
const totalEl_one = document.getElementById('total-one');
const moneysEl_two = document.getElementById('money-two');
const totalEl_two = document.getElementById('total-two');
const runEl = document.getElementById('run');
const siwtch = document.getElementById('switch');

// Get exhchange rates and update teh DOM
function tabulate() {
  const moneys_one = moneysEl_one.value;
  const moneys_two = moneysEl_two.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${moneys_one}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const run = data.rates[moneys_two];

      runEl.innerText = `1 ${moneys_one} = ${run} ${moneys_two}`;

      totalEl_two.value = (totalEl_one.value * run).toFixed(2);
    });
}

// Event listeners
moneysEl_one.addEventListener('change', tabulate);
totalEl_one.addEventListener('input', tabulate);
moneysEl_two.addEventListener('change', tabulate);
totalEl_two.addEventListener('input', tabulate);

siwtch.addEventListener('click', () => {
  const temp = moneysEl_one.value;
  moneysEl_one.value = moneysEl_two.value;
  moneysEl_two.value = temp;
  tabulate();
});

tabulate();
