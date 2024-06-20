const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const problemInput = document.querySelector("#problem");
const submitButton = document.querySelector("button");
const successMessage = document.querySelector("#success-message");
const errorPhone = document.querySelector("#errorPhone");
const errorName = document.querySelector("#errorName");

const phoneMasc = IMask(phoneInput, {
  mask: "+{7}(000)000-00-00",
});

async function submitForm(event) {
  event.preventDefault();

  if (!nameInput.value || !phoneInput.value) {
    alert("Пожалуйста, заполните все обязательные поля.");
    return;
  }

  if (nameInput.value.search(/^[a-zA-zА-Яа-я ]*$/)) {
    errorName.innerHTML = "Это поле принимает только буквы";
  } else {
    errorName.innerHTML = "";
  }

  if (phoneMasc.unmaskedValue.length !== 11) {
    errorPhone.innerHTML = "Номер телефона должен содержать 11 цифр";
    return;
  } else {
    errorPhone.innerHTML = "";
  }

  try {
    const response = await addZaivka(nameInput, phoneInput, problemInput);

    if (response.ok) {
      nameInput.value = "";
      phoneInput.value = "";
      phoneMasc.value = "";
      problemInput.value = "";
      successMessage.style.display = "block";
      submitButton.disabled = true;
    } else {
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
      );
    }
  } catch (error) {
    alert(
      "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
    );
  } finally {
    submitButton.disabled = false;
  }
}

form.addEventListener("submit", submitForm);

async function addZaivka(nameInput, phoneInput, problemInput) {
  return await fetch("/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      phone: phoneInput.value,
      problem: problemInput.value,
    }),
  });
}
