const parkinglot = document.querySelector('.parkinglot');
const parkingspots = document.querySelectorAll('.strip .parkingspot:not(.reserved)');
const spotcount = document.getElementById('spotcount');
const sumcost = document.getElementById('sumcost');
const showSelect = document.getElementById('show');

let showPrice = +showSelect.value;

// Update sumcost and sumcount
function updatePickedCount() {
  const pickedSpots = document.querySelectorAll('.strip .parkingspot.picked');

  const pickedSpotsIndex = [...pickedSpots].map(spot => [...parkingspots].indexOf(spot));

  console.log(pickedSpotsIndex);

  const pickedSpotsCount = pickedSpots.length;
  
  spotcount.innerText = pickedSpotsCount;
  sumcost.innerText = pickedSpotsCount * showPrice;
}

// Show picked event
show.addEventListener('change', e => {
  showPrice = +e.target.value;
  updatePickedCount;
})

parkinglot.addEventListener('click', e => {
  if(e.target.classList.contains('parkingspot') &&
  !e.target.classList.contains('reserved')
  ) {
    e.target.classList.toggle('picked');
  
    updatePickedCount();
  }
})