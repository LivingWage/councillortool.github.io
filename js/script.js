document.addEventListener("DOMContentLoaded", () => {

// Grab form element from page
const form = document.querySelector("#postcode")
const splash = document.querySelector("#splash")
const resetLink = document.querySelector("#resetLink")
const message = document.querySelector("#message")
const error = document.querySelector("#error")
const councilName = document.querySelector("#councilName")
const outcomeFigure = document.querySelector("#outcomeFigure")
const loading = document.querySelector("#loading")

let council
let councilString
let totalCut
let original
let now

form.addEventListener("submit", e => {
  // Stop page refreshing
  e.preventDefault()
  // Make form data accessible as JS variable
  let formData = new FormData(form)
  let postcode = formData.get("postcode")

  function printMessageToScreen(councilString){
  fetch(`https://snpcuts.github.io/js/cuts.json`)
      .then(res => res.json())
      .then(data => {
      console.log(data);
      if(councilString == undefined) {
        error.style.display = "block";
        error.innerHTML = "Sorry, looks like that's an invalid postcode.";
      } else {
        loading.style.display = "block";
        error.style.display = "none";
  }}
            )
  }

function getCouncilName(postcode) {
  fetch(`https://represent.opennorth.ca/postcodes/${postcode}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.status != 200) {
        error.innerHTML = "Sorry, looks like that's an invalid postcode."
        error.style.display = "block";
      } else {
      let council = data.result.admin_district
      let councilString = council.toString();
      printMessageToScreen(councilString)
      }
    }
    )
}

getCouncilName(postcode);

})

})
