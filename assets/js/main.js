/*=============== MOSTRAR MENU (MOBILE) ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        searchInput = document.querySelector(".search_input");

  toggle.addEventListener('click', () => {
    searchInput.classList.remove("show-search");
    nav.classList.toggle('show-menu');
    toggle.classList.toggle('show-icon');
  })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== MOSTRAR DROPDOWN PRINCIPAL ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector('.dropdown__button')

  dropdownButton.addEventListener('click', () => {
    const showDropdown = document.querySelector('.dropdown__item.show-dropdown')

    toggleItem(item)

    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown)
    }
  })
})

const toggleItem = (item) => {
  const dropdownContainer = item.querySelector('.dropdown__container')

  if (item.classList.contains('show-dropdown')) {
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else {
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}

/*=============== MOSTRAR SUB-DROPDOWN ===============*/
const dropdownGroups = document.querySelectorAll('.dropdown__group')

dropdownGroups.forEach((group) => {
  const groupButton = group.querySelector('.dropdown__group-button')
  const groupList = group.querySelector('.dropdown__list')

  groupButton.addEventListener('click', () => {
    const container = group.closest('.dropdown__container') 
    const isOpen = group.classList.contains('show-subdropdown')

    document.querySelectorAll('.dropdown__group.show-subdropdown').forEach((openGroup) => {
      if (openGroup !== group) {
        openGroup.classList.remove('show-subdropdown')
        openGroup.querySelector('.dropdown__list').removeAttribute('style')
      }
    })

    if (isOpen) {
      group.classList.remove('show-subdropdown')
      groupList.removeAttribute('style')
    } else {
      group.classList.add('show-subdropdown')
      groupList.style.height = groupList.scrollHeight + 'px'
    }

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
      navMenu.classList.remove("show-menu");
      navToggle.classList.remove("show-icon");
      searchInput.classList.toggle("show-search");
    });
  });
});
