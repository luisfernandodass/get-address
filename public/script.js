function initGetZipCode() {
  const buttonToSend = document.querySelector(".buttonToSend");
  const iconArrowRight = document.querySelector(".fa-arrow-right");

  buttonToSend.addEventListener("mouseenter", () => {
    iconArrowRight.classList.remove("fa-arrow-right");
    iconArrowRight.classList.add("fa-arrow-circle-right");
  });

  buttonToSend.addEventListener("mouseout", () => {
    iconArrowRight.classList.remove("fa-arrow-circle-right");
    iconArrowRight.classList.add("fa-arrow-right");
  });

  buttonToSend.addEventListener("click", (e) => {
    e.preventDefault();

    const input = document.querySelector("#zipCode");
    const zipCode = fetch(`https://viacep.com.br/ws/${input.value}/json/`);
    zipCode
      .then((addressResponse) => addressResponse.json())
      .then((address) => {
        const publicPlace = document.querySelector(".publicPlace");
        const neighborhood = document.querySelector(".neighborhood");
        const city = document.querySelector(".city");
        const state = document.querySelector(".state");
        const boxResponse = document.querySelector(".box-response");
        const stripAnimation = document.querySelector(".strip");

        input.style.visibility = "hidden";
        input.previousElementSibling.style.visibility = "hidden";
        input.nextElementSibling.style.visibility = "hidden";
        input.nextElementSibling.nextElementSibling.style.visibility = "hidden";

        publicPlace.innerText = `Lograduro: ${address.logradouro}`;
        neighborhood.innerText = `Bairro: ${address.bairro}`;
        city.innerText = `Cidade: ${address.localidade}`;
        state.innerText = `Estado: ${address.uf}`;

        boxResponse.classList.add("active");
        stripAnimation.classList.add("active");

        const animationElements = document.querySelectorAll("[data-anime]");
        animationElements.forEach((e) => {
          e.classList.add("animation");
        });

        const iconClose = document.querySelector(".fa-times");
        iconClose.classList.add("active");
        iconClose.addEventListener("click", () => {
          location.reload();
        });
      })
      .catch(() => {
        const error = document.querySelector("[data-error]");
        error.classList.add("active");
        error.innerText = "CEP INVÁLIDO";
      });
  });
}

initGetZipCode();
