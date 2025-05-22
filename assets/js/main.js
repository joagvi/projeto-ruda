/*=============== MOSTRAR MENU (MOBILE) ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        searchInput = document.querySelector(".search_input");

  toggle.addEventListener('click', () => {
    // Fechar busca se estiver aberta
    searchInput.classList.remove("show-search");

    // Alternar visibilidade do menu
    nav.classList.toggle('show-menu');
    toggle.classList.toggle('show-icon');
  })
}

// Inicializa o menu passando os IDs do botão e do menu
showMenu('nav-toggle', 'nav-menu')



/*=============== MOSTRAR DROPDOWN PRINCIPAL ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// Para cada item do menu dropdown
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector('.dropdown__button')

  // Adiciona o evento de clique ao botão
  dropdownButton.addEventListener('click', () => {
    // Verifica se já existe algum dropdown aberto
    const showDropdown = document.querySelector('.dropdown__item.show-dropdown')

    // Alterna o dropdown atual
    toggleItem(item)

    // Fecha o dropdown anterior, se for diferente do atual
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown)
    }
  })
})

// Função para abrir ou fechar um item do dropdown
const toggleItem = (item) => {
  const dropdownContainer = item.querySelector('.dropdown__container')

  if (item.classList.contains('show-dropdown')) {
    // Fecha o dropdown se já estiver aberto
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else {
    // Abre o dropdown definindo a altura e adicionando a classe
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}



/*=============== MOSTRAR SUB-DROPDOWN ===============*/
const dropdownGroups = document.querySelectorAll('.dropdown__group')

// Para cada grupo dentro do dropdown
dropdownGroups.forEach((group) => {
  const groupButton = group.querySelector('.dropdown__group-button')
  const groupList = group.querySelector('.dropdown__list')

  groupButton.addEventListener('click', () => {
    const container = group.closest('.dropdown__container') // container pai
    const isOpen = group.classList.contains('show-subdropdown')

    // Fecha todos os outros submenus abertos
    document.querySelectorAll('.dropdown__group.show-subdropdown').forEach((openGroup) => {
      if (openGroup !== group) {
        openGroup.classList.remove('show-subdropdown')
        openGroup.querySelector('.dropdown__list').removeAttribute('style')
      }
    })

    if (isOpen) {
      // Fecha o submenu atual
      group.classList.remove('show-subdropdown')
      groupList.removeAttribute('style')
    } else {
      // Abre o submenu atual
      group.classList.add('show-subdropdown')
      groupList.style.height = groupList.scrollHeight + 'px'
    }

    // Ajusta a altura do container pai para caber o conteúdo expandido
    setTimeout(() => {
      container.style.height = container.scrollHeight + 'px'
    }, 300)
  })
})

/*=============== SEARCH ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const searchIcons = document.querySelectorAll(".nav__search-icon");
  const searchInput = document.querySelector(".search_input");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navData = document.querySelector(".nav__data");

  searchIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      // Fecha o menu se estiver aberto
      navMenu.classList.remove("show-menu");
      navToggle.classList.remove("show-icon");

      // Alterna a visibilidade do campo de busca
      searchInput.classList.toggle("show-search");
    });
  });
});
