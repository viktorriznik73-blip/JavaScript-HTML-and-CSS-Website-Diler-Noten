let apikey = null;
const rawGrades = [
    { subject: "Mathe", type: "Kurs", attempt: 1, grade: 10, date: "02.06.2026"},
    { subject: "Mathe", type: "Klassenarbeit", attempt: 1, grade: 13, date: "01.06.2026"},
    { subject: "Physik", type: "Klassenarbeit", attempt: 1, grade: 8, date: "28.05.2026"}
]
const btnNoten = document.getElementById("schüler");
const tableNoten = document.getElementById("table");
const loaderNoten = document.getElementById("loading-container");
const barNoten = document.getElementById("progress-bar");
const copytext = document.getElementById("myInput");
const btnInfo = document.getElementById("schülerl");
const tableInfo = document.getElementById("tablee");
const loaderInfo = document.getElementById("loading-containerp");
const barInfo = document.getElementById("progress-barr");
const btnCopy = document.getElementById("copy-btn");
const dilerImg = document.getElementById("digitale-lernumgebung");

function loadNoten() {
    loaderNoten.classList.remove("hidden");
    loaderNoten.classList.add("loading-active");
    barNoten.style.width = "100%"
    setTimeout(() => barNoten.style.width = "100%", 100)
    setTimeout(() => {
        loaderNoten.classList.remove("loading-active");
        loaderNoten.classList.add("hidden");
        document.getElementById("grade-geling").innerText = "10NP";
        document.getElementById("grade-kurs").innerText = "7NP";
        document.getElementById("grade-modul").innerText = "9NP";
        document.getElementById("grade-arbeit").innerText = "12NP";

        tableNoten.classList.remove("table-hidden");
        tableNoten.classList.add("table-show");
    }, 1500);
}

function loadInfo() {
    loaderInfo.classList.remove("hidden");
    loaderInfo.classList.add("loading-active");
    barInfo.style.width = "100%"
    setTimeout(() => barInfo.style.width = "100%", 100)
    setTimeout(() => {
        loaderInfo.classList.add("hidden");
        tableInfo.classList.remove("table-hidden");
        tableInfo.classList.add("table-show");
    }, 1500);
}
btnNoten.addEventListener("click", () => {
    if (tableNoten.classList.contains("table-show")) {
        tableNoten.classList.replace("table-show", "table-hidden");
    } else {
        loadNoten();
    }
})
btnInfo.addEventListener("click", () => {
    if (tableInfo.classList.contains("table-show")) {
        tableInfo.classList.replace("table-show", "table-hidden");
    } else {
        loadInfo();
    }
})
    function copyText() {
        const infoText = "Gelingsnachweis Kurs Modulprüfung Klassenarbeit Note 1 Note 2 Note 3 Note 4";
        navigator.clipboard.writeText(infoText)
        .then(() => {
            btnCopy.innerText = "Copied :)";
            btnCopy.style.backgroundColor = "white";
            setTimeout(() => {
                btnCopy.innerText = "Copy Info";
                btnCopy.style.backgroundColor = "green";

            }, 2000);
        })
        .catch(err => {
            console.log("Mistake :(", err);
        });
    }
    function handleButtonClick(button, url) {
        button.classList.add("button-active");
        setTimeout(() => {
            button.classList.remove("button-active");
            window.open(url, '_blank')
        }, 200);
    }
    if (dilerImg) {
        dilerImg.addEventListener("click", () => {
            handleButtonClick(dilerImg, 'https://campus.digitale-lernumgebung.de/index.php?option=com_dilerreg&view=loggedout&Itemid=314&lang=de');
        });
    }
    function filterLatestGrades(grades) {
        const latest = {};

       grades.forEach(item => {
        const key = `${item.subject}_${item.type}`;

        if (!latest[key] || new Date(item.date) > new Date(latest[key].date)) {
            latest[key] = item;
        }
       });
       return Object.values(latest);
    }
    function calculateWeightedAverage(grades) {
    let totalScore = 0;
    let totalWeight = 0;

    grades.forEach(item => {
        if (item.type === "Klassenarbeit") {
            totalScore += item.grade * 0.6;
            totalWeight += 0.6;
        } else {
            totalScore += item.grade * 0.4;
            totalWeight += 0.4;
        }
    });
if (totalWeight === 0) return 0;

    const finalAverage = totalScore / totalWeight;
    return finalAverage.toFixed(1);
    }
    const cleanGrades = filterLatestGrades(rawGrades);
    const finalResult = calculateWeightedAverage(cleanGrades);

     console.log("Bekannte Note:", finalResult);  
