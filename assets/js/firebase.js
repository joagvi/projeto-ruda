import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3vz0FMEFda_OzsBwt8_pzh1CpGVHGe8U",
  authDomain: "projetoruda2.firebaseapp.com",
  projectId: "projetoruda2",
  storageBucket: "projetoruda2.appspot.com",
  messagingSenderId: "637190763867",
  appId: "1:637190763867:web:ac4bee08a5506b59af167e",
  measurementId: "G-7LFHYWV2MJ",
  databaseURL: "https://projetoruda2-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (field.type === "email" && !emailRegex.test(field.value)) {
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

export function setupFirestoreSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  let resultBox = input.parentNode.querySelector(".search-results");
  if (!resultBox) {
    resultBox = document.createElement("div");
    resultBox.classList.add("search-results");
    const content = document.createElement("div");
    content.classList.add("search-results__content");
    resultBox.appendChild(content);
    input.parentNode.appendChild(resultBox);
  }

  getDocs(collection(firestore, "conteudos"))
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        resultBox.innerHTML = "";

        if (!query) return;

        const results = items.filter((item) => item.keywords?.some((k) => k.toLowerCase().includes(query)));

        if (results.length === 0) {
          resultBox.innerHTML = "<p>Nenhum resultado encontrado</p>";
          return;
        }

        results.forEach((result) => {
          const link = document.createElement("a");
          link.href = result.url;
          link.textContent = result.title;
          resultBox.appendChild(link);
        });
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar dados de busca:", err);
    });
}
