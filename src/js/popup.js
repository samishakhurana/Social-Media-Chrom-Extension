var date1 = 0, date2 = 0
window.addEventListener('DOMContentLoaded', (event) => {
  // var bkg = chrome.extension.getBackgroundPage();
  let panelContainer = document.getElementsByClassName('tabcontent')[0]
  let appGridContainer = document.getElementsByClassName('tabcontent')[1]
  panelContainer.setAttribute('id', tabs[0].containerId)
  appGridContainer.setAttribute('id',tabs[1].containerId)
  // bkg.console.log(panelContainer)
  appInfo.forEach((app, index) => {
    let panel = document.createElement('app-panel')
    panel.info = app
    panelContainer.appendChild(panel)
    // document.getElementsByTagName('a')[index].addEventListener('click', () => {
    //   panel.socialMediaClick(appInfo[index].feedUrl)
    // })
    // document.getElementsByTagName('button')[index].addEventListener('click', () => {
    //   // chrome.tabs.getSelected(null, function(tab) {
        
    //   // });
    //   chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    //     var url = tabs[0].url;
    //     panel.shareClick(appInfo[index].shareUrl, tabs[0].url)
    //   });
    // })
  })
  apps.forEach((appData, index) => {
    let app = new AppGrid ()
    app.init = appData
    appGridContainer.appendChild(app)
    if (index < 3) {
      apps = app.setActiveApp(apps, index)
    }
    document.getElementsByClassName('grid-app-image')[index].addEventListener('click', (event) => {
      apps = app.setActiveApp(apps, index)
    })
  })
  let saveButton = new SaveButton ()
  appGridContainer.appendChild(saveButton)
  document.getElementById('save-preferences').addEventListener('click', () => {
    saveButton.saveChanges()
    panelContainer.innerHTML = ''
    appInfo.forEach((app, index) => {
      let panel = document.createElement('app-panel')
      panel.info = app
      panelContainer.appendChild(panel)
    })
  })
  let footer = document.getElementsByClassName('footer')[0]
  tabs.forEach((tabInfo, index) => {
    let tab = new CustomTab ()
    tab.init = tabInfo
    footer.appendChild(tab)
    document.getElementsByClassName('tablinks')[index].addEventListener('click', (event) => {
      this.setActiveTab(event, tabInfo.containerId)
      tab.setActiveTab(event, tabInfo.tabId)
    })
  })
  this.setActiveTab(event, tabs[0].containerId)
});
function fbShare () {
  chrome.tabs.getSelected(null, function(tab) {
    window.open( 'https://www.facebook.com/sharer.php?u=' + tab.url, 'sharer', 'toolbar=0, status=0, width=626, height=436');return false;
  });
}

function getSelectedTab () {
  // var bkg = chrome.extension.getBackgroundPage();
  let a = ''
  let sTab = chrome.tabs.getSelected(null, function(tab) {
    // bkg.console.log(tab.url, '========');
    a = tab.url
    // return tab.url
  });
  // bkg.console.log(sTab, a)
  return sTab
}

function setActiveTab (evt, containerId) {
  // var bkg = chrome.extension.getBackgroundPage();
  // bkg.console.log(evt, containerId);
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // bkg.console.log(document.getElementById(containerId))
  document.getElementById(containerId).style.display = "block";
}