const wrapperSelector = () => {
  return  {
    invoiceListsWrapper: document.querySelector(".invoice-record__lists"),
    customSelect: document.querySelector("#customSelectBtn"),
    searchInput: document.querySelector("#searchInvoice"),
    customSelectWrapper: document.querySelector(".invoice-filter-wrapper"),
    dashboardSidebarWrapper: document.querySelector(".dashboard-sidebar"),
    contentSection: document.querySelector(".content-section"),
  }
};

const displayInvoiceRecord = {
  invoiceListItem: (listData) => {
    const { id, invoiceNumber, date, client, amount, status } = listData;
    const statusFormat = status.charAt(0).toUpperCase() + status.slice(1);
    const htmlStructure = `<ul class="invoice-list" id = "invoice${id}">
    <li class="invoice-number">${invoiceNumber}</li>
    <li class="invoice-date">${date}</li>
    <li class="invoice-client">${client}</li>
    <li class="invoice-amount">${amount}</li>
    <li class="invoice-status"><span class="pill pill-with-background ${
      status === "paid"
        ? "pill-background-greenish color-green"
        : status === "draft"
        ? "pill-background-grayish color-gray"
        : "pill-background-blueish"
    }">${statusFormat}</span></li>
  </ul>`;

    return htmlStructure;
  },
  generateLists: () => {
    const { filteredData, searchInputValue } = searchInvoiceRecord;
    const { invoiceListItem } = displayInvoiceRecord;
    const { invoiceListsWrapper } = wrapperSelector();
    invoiceListsWrapper.classList.remove("no-record-found");
    if (searchInputValue() && filteredData.length === 0) {
      invoiceListsWrapper.classList.add("no-record-found");
      return (invoiceListsWrapper.innerHTML = `<div class="no-record">No record found!</div>`);
    }
    if (filteredData.length > 0) {
      const html = filteredData.map((data) => invoiceListItem(data));
      return (invoiceListsWrapper.innerHTML = html.join(" "));
    }
    const html = invoiceDataSet.map((data) => invoiceListItem(data));
    invoiceListsWrapper.innerHTML = html.join(" ");
  },
};

const searchInvoiceRecord = {
  searchInputValue: () => {
    let setTimeStatus = false;
    const setTime = setTimeout(() => {
      setTimeStatus = true;
      return wrapperSelector().searchInput.value;
    }, 500);

    if (setTimeStatus) {
      clearTimeout(setTime);
      setTimeStatus = false;
    }
    return wrapperSelector().searchInput.value;
  },
  filteredData: [],
  onSearchKeyUp: () => {
    const { searchInputValue } = searchInvoiceRecord;
    const { generateLists } = displayInvoiceRecord;
    const { searchInput } = wrapperSelector();

    searchInput.addEventListener("keyup", () => {
      const searchText = searchInputValue().toString().toLowerCase();

      const data = invoiceDataSet.filter((data) => {
        const { id, invoiceNumber, client, date, amount, status } = data;
        return (
          id.toString().includes(searchText) ||
          invoiceNumber.toLowerCase().includes(searchText) ||
          date.toLowerCase().includes(searchText) ||
          client.toLowerCase().includes(searchText) ||
          amount.replace(",", "").includes(searchText) ||
          status.includes(searchText)
        );
      });
      if (searchText) {
        searchInvoiceRecord.filteredData = data;
      } else {
        searchInvoiceRecord.filteredData = [];
      }
      generateLists();
    });
  },
  onSelectFiler: () => {
    const { customSelect, customSelectWrapper } = wrapperSelector();
    const optionsList = customSelectWrapper.querySelectorAll('li');
    customSelect.addEventListener("click", () => {
      !customSelectWrapper.classList.contains("show-filter")
        ? customSelectWrapper.classList.add("show-filter")
        : customSelectWrapper.classList.remove("show-filter");
    });
    window.onclick = function (event) {
      if (
        event.target !== customSelect &&
        event.target !== customSelect.querySelector("span")
      ) {
        customSelectWrapper.classList.remove("show-filter");
      }
    };

    optionsList.forEach((option) => {
      const optionEventListener = option.addEventListener(
        "click",
        (element) => {
          const { target } = element;
          const selectedValue = target.getAttribute("data-value");
          const selectedValueText = target.innerText;
          target.setAttribute(
            "data-value",
            customSelect.getAttribute("data-value")
          );
          target.innerText = customSelect.innerText;
          customSelect.setAttribute("data-value", selectedValue);
          customSelect.innerHTML = `<span >${selectedValueText}</span>`;
        }
      );
    });
  },
};

const dashboardSidebar = {

  dashboardBasicStructure: (dashboard) => {
    const { title, body } = dashboard;
    const titleFormat = title.charAt(0).toUpperCase() + title.slice(1);
    const htmlStructure = `<section class="${title}-dashboard">
    <div class="${title}-dashboard__header">
      <p>${titleFormat}</p>
    </div>
    <div class="dashboard__body ${title}"><p>${body}</p></div>
    </section>`;

    return htmlStructure;
  },
  showDashboard: () => {
    wrapperSelector();
    const { dashboardSidebarWrapper, contentSection } = wrapperSelector();
    const menuLists = dashboardSidebarWrapper.querySelectorAll("a");

    // redirecting to payment page
    const {pathname} = window.location;
    window.location.replace(`${pathname}#payment`);

    contentSection.innerHTML = paymentHtml;


    menuLists.forEach((menu) => {
      menu.addEventListener("click", () => {

        const menuName = menu.getAttribute('href').split("#")[1];

        menuLists.forEach((item) => item.classList.remove("active"));
        menu.classList.add("active");

        // toggle dashboard
        const currentDashboard = menuListsData.find(
          (data) => data.title === menuName
        );
        if(currentDashboard.title === "payment"){
          contentSection.innerHTML = paymentHtml 
          displayInvoiceRecord.generateLists();
          searchInvoiceRecord.onSearchKeyUp();
          searchInvoiceRecord.onSelectFiler();
          return;
        }
        contentSection.innerHTML = dashboardSidebar.dashboardBasicStructure(currentDashboard);
      });
    });
  },
};

const initializeApp = () => {
  dashboardSidebar.showDashboard(); 
  const { onSelectFiler, onSearchKeyUp } = searchInvoiceRecord;
  displayInvoiceRecord.generateLists();
  onSearchKeyUp();
  onSelectFiler();
};

initializeApp();
