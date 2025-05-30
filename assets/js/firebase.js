import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBo_HZaCGGub7MY6JGtJdqGGQCzAbacUFE",
  authDomain: "projeto-ruda-8a04e.firebaseapp.com",
  databaseURL: "https://projeto-ruda-8a04e-default-rtdb.firebaseio.com/",
  projectId: "projeto-ruda-8a04e",
  storageBucket: "projeto-ruda-8a04e.appspot.com",
  messagingSenderId: "1048784578204",
  appId: "1:1048784578204:web:6c26eb73e49959250eaf59",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validação personalizada
    const fields = form.querySelectorAll("[required]");
    let valid = true;

    fields.forEach((field) => {
      field.style.borderColor = "#ddaec2";
      if (!field.value) {
        valid = false;
        field.style.borderColor = "#e57373";
      }
    });

    if (!valid) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const data = {
      nome: document.getElementById("first-name").value,
      sobrenome: document.getElementById("second-name").value,
      email: document.getElementById("email").value,
      assunto: document.getElementById("subject").value,
      pronomes: document.getElementById("pronomes").value,
      mensagem: document.getElementById("message").value,
      timestamp: new Date().toISOString(),
    };

    console.log("Enviando para Firebase:", data);

    push(ref(database, "mensagensContato/"), data)
      .then(() => {
        const msg = document.getElementById("success-message");
        msg.classList.remove("hidden");
        msg.classList.add("show");
        form.reset();
        setTimeout(() => {
          msg.classList.remove("show");
          msg.classList.add("hidden");
        }, 4000);
      })
      .catch((err) => {
        console.error("Erro:", err);
        alert("Erro ao enviar.");
      });
  });
});
