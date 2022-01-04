// JS 1
console.log('Restaurant and Recipe Finder');

// JS 2





const recipeModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay") 


recipeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    recipeModal(modal)
  })
}); 

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active")
  modals.forEach(modal => {
    closeModal(modal)
  })
}); 

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest(".modal")
    closeModal(modal)
  })
}); 

function recipeModal(modal) { 
  if (modal === null) return 
  modal.classList.add("active")
  overlay.classList.add(active)
}; 

function closeModal(modal) { 
  if (modal === null) return 
  modal.classList.remove("active")
  overlay.classList.remove("active")
}; 



