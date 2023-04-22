"use strict";

const contactList = document.querySelector(".contact-list");

function readApi() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=12").then(
    (response) =>
      response.json().then((contactData) => {
        console.log(contactData);
        render(contactData);
      })
  );
}

function contactTemplate(contact) {
  const newLi = document.createElement("li");
  newLi.classList.add("connect");
  newLi.setAttribute(
    "id",
    contact.name.first.toLowerCase() + "-" + contact.name.last.toLowerCase()
  );

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", contact.picture);
  imgElement.setAttribute("alt", contact.name.first + " " + contact.name.last);
  imgElement.setAttribute(
    "title",
    contact.name.first + " " + contact.name.last
  );

  const fullName =
    contact.name.title + " " + contact.name.first + " " + contact.name.last;
  const h2element = document.createElement("h2");
  h2element.classList.add("name");
  h2element.innerText = fullName;

  const pElement = document.createElement("p");
  pElement.classList.add("profile-text");
  pElement.innerText = contact.title;

  const smallElement = document.createElement("small");
  smallElement.innerText = "Mutual Connections: " + contact.mutualConnections;

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("pending-button");
  buttonElement.innerText = "Connect";

  newLi.append(imgElement, h2element, pElement, smallElement, buttonElement);

  return newLi;
}

function render(contactData) {
  for (const contact of contactData) {
    const newListItem = contactTemplate(contact);
    contactList.appendChild(newListItem);
  }
}

readApi();
