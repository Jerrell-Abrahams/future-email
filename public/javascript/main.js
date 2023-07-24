
const button = document.querySelectorAll(".time_buttons");
const submit_button = document.querySelector(".submit_button")
const letterContent = document.querySelector(".textarea")
const privacy_label = document.querySelector(".privacy_label")
const privacy_toggle = document.querySelector(".privacy_toggle")
const date = document.querySelector(".date")

privacy_toggle.setAttribute("value", "public")

date.addEventListener("click", () => {
    for (let index = 0; index < button.length; index++) {
        button[index].classList.remove("selected")
    }
    submit_button.addEventListener("click", () => {
        submit_button.setAttribute("value", date.value)
    })
    
})

function myFunction() {
    if (privacy_toggle.checked == true) {
        console.log(privacy_toggle.getAttribute("value"))
        privacy_toggle.setAttribute("value", "private")
        privacy_label.innerHTML = "Private"
        privacy_label.setAttribute("title", "No one can see your letter or email")
        
    } else {
        privacy_label.setAttribute("value", "public") 
        privacy_label.innerHTML = "Public, but anonymous"
        privacy_label.setAttribute("title", "Anyone can see your letter, but it remains anonymous")
        
    }
}




var addSelectClass = function(){
    removeSelectClass();
    this.classList.add('selected');
    submit_button.setAttribute("value", this.getAttribute("value"))
    
}

var removeSelectClass = function(){
    for (var i =0; i < button.length; i++) {
        button[i].classList.remove('selected')
        button[i].setAttribute("name", "")
    }
}

for (var i =0; i < button.length; i++) {
    button[i].addEventListener("click", addSelectClass);
}
		
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}