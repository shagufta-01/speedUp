
// console.log("conttentscript loaded successfully");
window.addEventListener("load", () => {
    setTimeout(() => {
        let val = localStorage.getItem("value");
        let new_val = +val;
        if (new_val) {
            let video = document.querySelector("video", "audio");
            // console.log("inside the 3333");
            video.playbackRate = new_val / 100;
        }
    }, 1000);
})
let host = location.hostname
// console.log(host)
chrome.runtime.sendMessage({
    message: "hostdata",
    value: host
})
let geting_data = +localStorage.getItem("value");
// console.log(geting_data, "geting_data")
chrome.runtime.onMessage.addListener(function (event) {
    if (event.message === "get_storage") {
        let video = document.querySelector("video");

        if (video) {
            var duration = video.duration;

            // Convert duration to minutes
            var minutes = Math.floor(duration / 60);
            var seconds = Math.floor(duration % 60);

            // Format the time components
            var formattedDuration = (minutes < 10 ? "0" : "") + minutes + ":" +
                (seconds < 10 ? "0" : "") + seconds;

            console.log("Video duration: " + formattedDuration);
            chrome.runtime.sendMessage({
                message: "storage_Send",
                value: geting_data,
                value_1: formattedDuration
            })
        }

       
    }
})


chrome.runtime.onMessage.addListener(function (req) {
    if (req.message === "extension_start") {
        // console.log("extension_start");
        let condition = false;
        if (!condition) {
            let video = document.querySelector("video", "audio")
            let val = localStorage.getItem("value");
            // console.log(val, typeof val, "forefm,efme>>>>>>>>>>>>>>>>>>>>>>>>>f")
            let new_val = +val;
            video.playbackRate = new_val / 100;
            condition = true
        }
    }
})
let video = document.querySelector("video", "audio")
// let arr = []
// let current_url = location.href;
// arr.push(current_url);
// localStorage.setItem("current_url", JSON.parse(arr));

// if (arr.leng th > 0) {
//     arr.pop();
// }

// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
chrome.runtime.onMessage.addListener((req) => {
    if (req.message === "tab_id") {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>tab_idtab_idtab_id")
        let val = localStorage.getItem("value");
        // console.log(val, typeof val, "forefm,efme>>>>>>>>>>>>>>>>>>>>>>>>>f")
        let new_val = +val;
        let video = document.querySelector("video", "audio");

        // console.log(new_val, typeof new_val, "for new   >>>>", video, "for video>>>>");
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                if (new_val) {
                    // console.log("inside the 3333");
                    video.playbackRate = new_val / 100;
                }
            }, 1000);
        })

    }
    // setTimeout(() => {
    //     if (new_val) {
    //         console.log("inside the 3333");
    //         video.playbackRate = new_val / 100
    //     }
    // }, 1000);






    chrome.runtime.onMessage.addListener((req) => {
        // console.log(req)
        // console.log(req.message.substr(0, 3))
        if (req.message.substr(0, 4) === "data") {
            setTimeout(() => {
                // console.log("inside the result")
                let string = req.value;
                let result = +string.replace(/%/g, "");
                // console.log(result);
                let video = document.querySelector("video", "audio")
                video.playbackRate = result / 100
                // console.log(video, "playing")
                localStorage.setItem("value", result);
            }, 500);
        }
    })

    chrome.runtime.onMessage.addListener((req) => {
        // console.log(req.message.substr(0, 3))
        if (req.message === "reset") {
            video.playbackRate = '1'
        }
    })

    chrome.runtime.onMessage.addListener((req) => {
        // console.log(req.message.substr(0, 3))
        if (req.message === "on_ext") {
            let video = document.querySelector("video");
            video.playbackRate = +req.value / 100
        }
    })

}
)



chrome.runtime.onMessage.addListener(async (req) => {
    if (req.message === "for_all_tabs_1") {
        // console.log("first>>>>>>>>>>>>>>>>>>>>>")
        chrome.storage.local.get(["current_state"]).then(async (result) => {
            // console.log("Value currently is " + result.current_state);
            if (result.current_state === "for_all_tabs") {
                // console.log("first>>>>>>>>>>>>");
                setTimeout(() => {
                    let video = document.querySelector("video");
                    video.playbackRate = +(localStorage.getItem("value")) / 100;
                }, 2000);

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req)
                    // console.log(req.message.substr(0, 3))
                    if (req.message === "reset") {
                        video.playbackRate = '1'
                    }
                })

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req);
                    // console.log(req.message.substr(0, 3))
                    if (req.message === "on_ext") {
                        video.playbackRate = req.value / 100
                    }
                })

                // chrome.runtime.onMessage.addListener((req) => {
                //     console.log(req)
                //     if (req.message === "run_value") {
                //         localStorage.setItem("value", req.value);
                //         console.log("run_value")
                //         video.playbackRate = +(localStorage.getItem("value")) / 100;
                //     }
                // })

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req)
                    // console.log(req.message.substr(0, 3))
                    if (req.message.substr(0, 4) === "data") {
                        setTimeout(() => {
                            let video = document.querySelector("video");
                            let string = req.value;
                            let result = +string.replace(/%/g, "");
                            video.playbackRate = result / 100
                            localStorage.setItem("value", result);
                        },);
                    }
                })

            }
            else if (result.current_state === "tab_id") {
                // console.log("scond>>>>>>");
                // senddata("tab_id",2.5);
                // video.playbackRate = new_val / 100;
            }

            else if (result.current_state === "domain_id") {
                // console.log("third=====");

                setTimeout(() => {
                    let val = localStorage.getItem("value");
                    // console.log(val, typeof val, "forefm,efme>>>>>>>>>>>>>>>>>>>>>>>>>f")
                    let new_val = +val;
                    // console.log(new_val, "for new val>>>>>>>>>");
                    let video = document.querySelector("video");
                    video.playbackRate = +(localStorage.getItem("value")) / 100;
                }, 2000);

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req)
                    // console.log(req.message.substr(0, 3))
                    if (req.message === "reset") {
                        video.playbackRate = '1'
                    }
                })

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req);
                    // console.log(req.message.substr(0, 3));
                    if (req.message === "on_ext") {
                        video.playbackRate = req.value / 100
                    }
                })

                // chrome.runtime.onMessage.addListener((req) => {
                //     console.log(req)
                //     if (req.message === "run_value") {
                //         localStorage.setItem("value", req.value);
                //         console.log("run_value");
                //         video.playbackRate = +(localStorage.getItem("value")) / 100;
                //     }
                // })

                chrome.runtime.onMessage.addListener((req) => {
                    // console.log(req)
                    // console.log(req.message.substr(0, 3))
                    if (req.message.substr(0, 4) === "data") {
                        setTimeout(() => {
                            console.log("inside the result")
                            let string = req.value;
                            let result = +string.replace(/%/g, "");
                            video.playbackRate = result / 100
                            localStorage.setItem("value", result);
                        },);
                    }
                });
            }
        });
    }
});





chrome.runtime.onMessage.addListener(function (req) {
    if (req.message === "domain_id") {
        // console.log("domain_iddomain_id>>>>>>>>>>>");
        let val = +localStorage.getItem("value");
        // console.log(val, typeof val, "forefm,efme>>>>>>>>>>>>>>>>>>>>>>>>>f")
        video.playbackRate = val / 100;
        console.log(video, "video");
        console.log(video.playbackRate, "video.playbackRate")


    }
})


chrome.runtime.onMessage.addListener(function (req) {
    if (req.message === "for_all_tabs") {
        // console.log("for_all_tabs>>>>>>>>>>>>")
        let val = localStorage.getItem("value");
        // console.log(val, typeof val, "forefm,efme>>>>>>>>>>>>>>>>>>>>>>>>>f")
        let new_val = +val;
        if (new_val) {
            video.playbackRate = new_val / 100;
        }
        // chrome.storage.local.get(["value"]).then((result) => {
        //     console.log("Value currently is " + typeof result.value);
        //     video.playbackRate = '4'
        // });
    }
})




// }
// else {
//     console.error("video not found");
// }




chrome.runtime.onMessage.addListener((req) => {
    // console.log(req)
    // console.log(req.message.substr(0, 3))
    let video = document.querySelector("video", "audio");
    if (req.message === "reset") {
        video.playbackRate = '1'
    }
})

chrome.runtime.onMessage.addListener((req) => {
    // console.log(req);
    // console.log(req.message.substr(0, 3))
    let video = document.querySelector("video", "audio");

    if (req.message === "on_ext") {
        video.playbackRate = req.value / 100
    }
})

chrome.runtime.onMessage.addListener((req) => {
    // console.log(req)
    if (req.message === "run_value") {
        // console.log(parseInt(req.value), "for parseInt(req.value)");
        let value = req.value.toString();
        console.log(value)
        console.log(value.length, "for value");
        if (value.length === 5) {
            let antho = value.substr(0, 2);
            console.log(antho, "for value");
            localStorage.setItem("value", parseInt(antho));
        }
        else {
            // console.log("inside else");
            let antho = value.substr(0, 3);
            console.log(antho, "for value line");
            // console.log(antho, "ffsc>>>>>.");
            localStorage.setItem("value", parseInt(antho));
        }
        // console.log(value, "for parseIntreq.value", typeof value);
        // console.log("run_value");
        let video = document.querySelector("video");
        video.playbackRate = +(localStorage.getItem("value")) / 100;
    }
})



