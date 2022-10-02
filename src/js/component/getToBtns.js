export function getToBtns(evt) {
    evt.preventDefault()

    setTimeout(() => {
        const watchedModalBtn = document.querySelector("#backdrop > div > div > div > div > ul > li:nth-child(1) > button") 
        const queueModalBtn = document.querySelector("#backdrop > div > div > div > div > ul > li:nth-child(2) > button") 

        const watchedList = JSON.parse(localStorage.getItem("watched_list"))
        const queuedList = JSON.parse(localStorage.getItem("queue_list"))
        const currentLink = watchedModalBtn.closest("div")
        const currentId = currentLink.getAttribute("id")

        const watchedInfoItems = watchedList.map(item => {
            if (item.id === Number(currentId))
                watchedModalBtn.textContent = "remove from watched"
        })
        const queuedListItems = queuedList.map(item => {
            if (item.id === Number(currentId))
                queueModalBtn.textContent = "remove from queue"
        })
    }, 200);
}