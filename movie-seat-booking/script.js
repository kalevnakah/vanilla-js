const parkinglot = document.querySelector('.parkinglot');
const parkingspots = document.querySelectorAll('.strip .parkingspot:not(.reserved)');
const spotcount = document.getElementById('spotcount');
const sumcost = document.getElementById('sumcost');
const showSelect = document.getElementById('show');

populateUI();

let showPrice = +showSelect.value;

//Save picked show index and price
function setShowData(showIndex, showPrice) {
  localStorage.setItem('pickedShowIndex', showIndex);
  localStorage.setItem('pickedShowPrice', showPrice);
}

// Update sumcost and sumcount
function updatePickedCount() {
  const pickedSpots = document.querySelectorAll('.strip .parkingspot.picked');

  const pickedSpotsIndex = [...pickedSpots].map(spot => [...parkingspots].indexOf(spot));

  localStorage.setItem('pickedSpots', JSON.stringify(pickedSpotsIndex));

  const pickedSpotsCount = pickedSpots.length;
  
  spotcount.innerText = pickedSpotsCount;
  sumcost.innerText = pickedSpotsCount * showPrice;
}

//Get data from localstorage and populate UI
function populateUI() {
  const pickedParkingSpots = JSON.parse(localStorage.getItem('pickedSpots'));

  if(pickedParkingSpots !== null && pickedParkingSpots.length > 0) {
    parkingspots.forEach((spot, index) => {
      if(pickedParkingSpots.indexOf(index) > -1) {
        spot.classList.add('picked');
      }
    });
  }
  
  const pickedShowIndex = localStorage.getItem('pickedShowIndex');
  if (pickedShowIndex !== null) {
    showSelect.selectedIndex = pickedShowIndex;
  }

}

// Show picked event
show.addEventListener('change', e => {
  showPrice = +e.target.value;
  setShowData(e.target.selectedIndex, e.target.value);
  updatePickedCount;
})

// Parking spot click event
parkinglot.addEventListener('click', e => {
  if(e.target.classList.contains('parkingspot') &&
  !e.target.classList.contains('reserved')
  ) {
    e.target.classList.toggle('picked');
    updatePickedCount();
  }
});

//Initial piicked spots count and sum
updatePickedCount();