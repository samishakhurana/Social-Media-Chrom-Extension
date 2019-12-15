class CustomTab extends HTMLElement {
  constructor () {
    super ()
    this.innerHTML+=`
    <style>
      .tablinks {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 4px 6px;
        transition: 0.3s;
        font-size: 12px;
        width: 50%;
        border: 1px solid #ccc;
      }
      
      .tablinks:hover {
        background-color: #ddd;
      }
      
      .tablinks.active {
        background-color: #ccc;
      }

      .tab-image {
        width: 20px;
        height: 20px;
      }
    </style>
    `
  }
  set init (tab) {
    this.innerHTML+= `
    <button class="tablinks">
      <img class="tab-image" src="${tab.icon}" id="${tab.tabId}">
    </button>
    `
  }

  setActiveTab (evt, tabId) {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // let bkg = chrome.extension.getBackgroundPage()
    // bkg.console.log(document.getElementById(tabId), '=======')
    document.getElementById(tabId).className += " active";
  }
}

customElements.define('custom-tab', CustomTab)