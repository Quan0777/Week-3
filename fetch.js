const dataTable = document.querySelector("#data tbody")

async function Table() {
    const url = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/11ra.px"
    const query = await fetch("./population_query.json")
    const queryJSON = await query.json()

    const url1 = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyokay/115b.px"
    const query1 = await fetch("./employment_query.json")
    const queryJSON1 = await query1.json()

    const usersPromise = await fetch(url, {
        method: "POST",
        body: JSON.stringify(queryJSON),
    })
    const userJSON = await usersPromise.json()

    const usersPromise1 = await fetch(url1, {
        method: "POST",
        body: JSON.stringify(queryJSON1),
    })
    const userJSON1 = await usersPromise1.json()

    const population = userJSON.value
    const employment_amount = userJSON1.value
    Object.values(userJSON.dimension.alue_23_20260101.category.label).forEach((data, index) => {
        const employmentPercent = (employment_amount[index] / population[index]) * 100
        const tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        td1.innerText = data
        td2.innerText = population[index]
        td3.innerText = employment_amount[index]
        td4.innerText = employmentPercent.toFixed(2)

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        if (employmentPercent > 45) {
            tr.style.backgroundColor = "#abffbd"
        } else if (employmentPercent < 25) {
            tr.style.backgroundColor = "#ff9e9e"
        }

        dataTable.appendChild(tr)
    })
}
Table()

