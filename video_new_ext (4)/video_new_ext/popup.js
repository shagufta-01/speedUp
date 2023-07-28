chrome.runtime.sendMessage({
  message: "popup_open"
})
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "storage_clear") {
    console.log("inside_the_storage_clear");
  }
})


let tab_id_2 = document.getElementById("tab_id");
if (tab_id_2.checked){
  console.log("this is console for tab_id>>>>><><<><>///");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "get_storage"
    })
  });

}


let tab_id_3 = document.getElementById("domain_id");
if (tab_id_3.checked) {
  console.log("this is console for domain_id/////");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "get_storage"
    })
  })
}


let tab_id_4 = document.getElementById("for_all_tabs");
if (tab_id_4.checked) {
  console.log("this is console for for_all_tabs????");
}






chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "storage_Send") {
    console.log("inside_the_storage_" + request.value, "storage", typeof request.value );
    if (request.value_1) {
      let speed = document.getElementById("speed");
      speed.value = request.value;
      console.log(speed, "For speed", speed.value);
      console.log(request.value_1, "For speed");
      let time_y = document.getElementById("time_y");
      time_y.innerHTML = request.value_1;
      let page_title = document.getElementById("page_title");
      chrome.tabs.query({active: true,currentWindow:true},(tabs)=>{
        let title = tabs[0].title;
        page_title.innerHTML = title
      })

    }

  }
})

// let a_tabs = document.getElementById("for_all_tabs");

// console.log(a_tabs, "for atabsss")

// let a_domain = document.getElementById("domain_id");
// console.log(a_domain, "for atabsss")


// if (a_tabs.checked) {
//   console.log("a_tabs")

// }

// else if (a_domain.checked){
//   console.log("a_domain")
//   chrome.runtime.sendMessage({
//     message: "popup_open"
//   })
// }





let arr = []
let check_extension = false
arr = arr = localStorage.getItem("links") !== null ? JSON.parse(localStorage.getItem("links")) : [];
console.log(arr, "for arrr");
chrome.tabs.query({
  active: true,
  currentWindow: true
}, (tabs) => {
  let tab_data = tabs[0].url;
  console.log(tab_data, "tab_data");
})


function extractDomain(url) {
  var domain;
  // Find and remove the protocol (e.g., "https://")
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
    console.log(domain)
    let link = document.getElementById("links");
    link.innerHTML = domain;
  }
  else {
    domain = url.split('/')[0];
  }
  // Find and remove the port number
  domain = domain.split(':')[0];
  return domain;
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  let tabs_url = tabs[0].url;
  extractDomain(tabs_url);
});
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log(tabs, "for tabsssss>>>>>>");
  let window_id = tabs[0].id;
  arr.push(window_id);
  localStorage.setItem("links", JSON.stringify(arr));
})

let preset = document.querySelectorAll(".preset");
console.log(preset, "preset");
let speed = document.getElementById("speed");
let a = localStorage.getItem("data");
console.log(a, "for aaa");
speed.value = a;
let data = true;

chrome.storage.local.get(["current_state"]).then((result) => {
  console.log("Value currently is " + result.current_state);
  if (result.current_state === "for_all_tabs") {
    console.log("first>>>>>>>>>>>>");
    // senddata("for_all_tabs", 0);
    let a = document.getElementById("for_all_tabs");
    a.checked = true;
    data = false;

  }
  else if (result.current_state === "tab_id") {
    console.log("scond>>>>>>");
    console.log("inside domain_id");

    let a = document.getElementById("tab_id");
    a.checked = true;
    chrome.runtime.sendMessage({
      message: "popup_open"
    })
  }

  else if (result.current_state === "domain_id") {
    console.log("inside domain_id");
    let a = document.getElementById("domain_id");
    a.checked = true;
    console.log("third=====");
    // senddata("domain_id", 0);
    data = false;
    chrome.runtime.sendMessage({
      message: "popup_open"
    })
  }


});

speed.addEventListener("change", (e) => {
  console.log(e.target.value, "for e.target.valuee.target.value")
  // console.log(e.target.value, " for e targerjwkkw")
  senddata("run_value", e.target.value);

})
setTimeout(() => {
  if (data) {
    console.log("inside data")
    let tab_id_1 = document.getElementById("tab_id");
    if (tab_id_1.checked) {
      senddata("tab_id", 0)
    }
  }
}, 1000);



// let tab_id_1 = document.getElementById("tab_id");
// if (tab_id_1.checked) {
//   senddata("tab_id", 0)
// }


// let tab_id_1 = document.getElementById("tab_id");
// if (tab_id_1.checked) {
//   senddata("tab_id", 0)
// }
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});



function senddata(key_1, data) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: key_1,
      value: data
    })
  })

}

preset.forEach(function (item, i) {
  item.addEventListener("click", (e) => {
    console.log(e.target.id, e.target.innerHTML, "for >>>>>")
    let string = e.target.innerHTML;
    let result = +string.replace(/%/g, "");
    speed.value = result;
    console.log(result, "for result")
    let result_1 = +string.replace(/%/g, "") / 100;
    console.log(result_1, "for>>>")
    let set = result_1.toString();
    chrome.action.setBadgeText({ text: set });

    localStorage.setItem(`data`, result);
    chrome.storage.local.set({ value: result })
    senddata(e.target.id, e.target.innerHTML);
  })
  // item.classList.add('active');
})


document.getElementById("reset-all").addEventListener("click", () => {
  console.log("?????????????????????")
  senddata("reset", 1);
  localStorage.clear();
  console.log("inside reset")
  chrome.storage.local.clear(function () {
    console.log("API storage cleared successfully.");

  });
  let speed = document.getElementById("speed");
  console.log(speed, "toggle");
  speed.value = 100;


})
let toggle = document.getElementById("toggle");
toggle.addEventListener('click', function () {
  if (this.checked) {
    console.log("Toggle button is ON");
    senddata("on_ext", a)
    let preset = document.querySelectorAll(".preset");
    let arr = Array.from(preset);
    arr.map((item) => {
      item.disabled = false;
      let disable = document.querySelector('.content');
      disable.style.filter = '';
    })
  } else {
    console.log("Toggle button is OFF");
    senddata("reset", 1)
    let preset = document.querySelectorAll(".preset");
    let arr = Array.from(preset);
    arr.map((item) => {
      item.disabled = true;
      let disable = document.querySelector('.content');
      disable.style.filter = 'grayscale(100%)'
    })
  }
});

// let domain_id = document.getElementById("domain_id");
// console.log(domain_id, "for domain id>>>>")
// domain_id.addEventListener("change",(e)=>{
//   console.log(e)
//   if (e.checked) {
//     console.log("this is console for domain_id=" )
//   }
// })


// Get a reference to the checkbox element
const checkbox = document.getElementById('domain_id');
checkbox.addEventListener('change', function () {
  if (this.checked) {
    console.log('Checkbox is checked!!!!!!!!!');
    chrome.storage.local.set({ current_state: "domain_id" })
    senddata("domain_id", 0)
  } else {
    console.log('Checkbox is uncheckedddddddddddddddd!');
  }
});


const tab_id = document.getElementById('tab_id');
tab_id.addEventListener('change', function () {
  if (this.checked) {
    console.log('Checkbox is checked!sssssss');
    chrome.storage.local.set({ current_state: "tab_id" });
    // senddata("tab_id", 0);
  } else {
    console.log('Checkbox is unchecked!');
  }
});


const for_all_tabs = document.getElementById('for_all_tabs');
for_all_tabs.addEventListener('change', function () {
  if (this.checked) {
    console.log('Checkbox is checked!?????????');
    chrome.storage.local.set({ current_state: "for_all_tabs" })
    // senddata("for_all_tabs", 0)
  } else {
    console.log('Checkbox is unchecked!');
  }
});

let change_speed_five = document.getElementById("change_speed_five");
change_speed_five.addEventListener("click", () => {
  let speed = document.getElementById("speed");
  let a = parseInt(speed.value) - 5;
  console.log(a, "for aaaa");
  speed.value = a;
  console.log(speed.value, "for spedd vajddwjdwd")


  senddata("run_value", speed.value);
});


let change_speed_one = document.getElementById("change_speed_one");
change_speed_one.addEventListener("click", () => {
  let speed = document.getElementById("speed");
  let a = parseInt(speed.value) - 1;
  console.log(a, "for aaaa");
  speed.value = a;
  console.log(speed.value, "for spedd vajddwjdwd")
  senddata("run_value", speed.value);
});


let change_speed_onee = document.getElementById("change_speed_onee");
change_speed_onee.addEventListener("click", () => {
  let speed = document.getElementById("speed");
  let a = parseInt(speed.value) + 1;
  console.log(a, "for aaaa");
  speed.value = a;
  senddata("run_value", speed.value);

});

let change_speed_fivee = document.getElementById("change_speed_fivee");
change_speed_fivee.addEventListener("click", () => {
  let speed = document.getElementById("speed");
  let a = parseInt(speed.value) + 5;
  console.log(a, "for aaaa");
  speed.value = a;
  senddata("run_value", speed.value);
});

console.log("first>>>>>>>")




