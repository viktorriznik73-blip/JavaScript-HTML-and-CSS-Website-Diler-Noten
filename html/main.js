let apikey = null;
const rawGrades = [
    { subject: "Mathe", type: "Kurs", attempt: 1, grade: 10, date: "02.06.2026"},
    { subject: "Mathe", type: "Klassenarbeit", attempt: 1, grade: 13, date: "01.06.2026"},
    { subject: "Physik", type: "Klassenarbeit", attempt: 1, grade: 8, date: "28.05.2026"}
]
function createCustomButton(id, text) {
     const btn = document.createElement('button');
        btn.id = id;

        btn.textContent = text;


        btn.addEventListener("click", () => {
            btn.classList.add("shake");

            setTimeout(() => {
                btn.classList.remove("shake")
            }, 500)
        });
        return btn;
    }
    function parseGermanDate(dateStr) {
        const parts = dateStr.split('.')
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    function filterLatestGrades(grades) {
        const latest = {};

       grades.forEach(item => {
        const key = `${item.subject}_${item.type}`;

        if (!latest[key] || parseGermanDate(item.date) > parseGermanDate(latest[key].date)) {
            latest[key] = item;
        }
       });
       return Object.values(latest);
    };
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
document.addEventListener("DOMContentLoaded", () => {
    const btnNoten = document.getElementById("schüler");
    const btnInfo = document.getElementById("schülerl");
    const textPP = document.getElementById("pp");
    const textPPP = document.getElementById("ppp");
    const tableNoten = document.getElementById("table");
    const tableInfo = document.getElementById("tablee");
    const loaderNoten = document.getElementById("loading-container");
    const barNoten = document.getElementById("progress-bar");
    const loaderInfo = document.getElementById("loading-containerp");
    const barInfo = document.getElementById("progress-barr");
    const btnCopy = document.getElementById("copybtn");
    const buttonCopy = document.getElementById("copybtn2");
    const imgLoadcontainer = document.getElementById("img-loader-container");
    const dilerImg = document.getElementById("digitale-lernumgebung");
function loadNoten() {
    loaderNoten.classList.remove("hidden");
    loaderNoten.classList.add("loading-active");
    if (barNoten) barNoten.style.width = "100%";
    setTimeout(() => {
        loaderNoten.classList.remove("loading-active");
        loaderNoten.classList.add("hidden");
     const gelings = document.getElementById("grade-geling")
     const kurs = document.getElementById("grade-kurs")
      const modulprüfung =  document.getElementById("grade-modul")
       const klassenarbeit = document.getElementById("grade-arbeit")
 
           if (gelings) gelings.innerText = "10NP";
            if (kurs) kurs.innerText = "7NP";
            if (modulprüfung) modulprüfung.innerText = "9NP";
            if (klassenarbeit) klassenarbeit.innerText = "12NP";
        tableNoten.classList.remove("table-hidden");
        tableNoten.classList.add("table-show");
   if (btnCopy) btnCopy.classList.add("show-btn");
    }, 1500);
}

function loadInfo() {
    if (!loaderInfo || !tableInfo) return;
    loaderInfo.classList.remove("hidden");
    loaderInfo.classList.add("loading-active");
   if (barInfo) barInfo.style.width = "100%"
    setTimeout(() => {
        loaderInfo.classList.remove("loading-active");
        loaderInfo.classList.add("hidden");
        tableInfo.classList.remove("table-hidden");
        tableInfo.classList.add("table-show");
        if (buttonCopy) buttonCopy.classList.add("show-btn");
    }, 1500);
}
function handleCopy(button, textToCopy, originalText) {
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
        button.innerText = "Copied :)";
        button.style.backgroundColor = "white";
        button.style.color = "black";

        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "green";
            button.style.color = "";
        }, 2000)
    })
    .catch(err => {
        console.log("Mistake :/", err);
    })
}
if (btnCopy) {
    btnCopy.addEventListener("click", () => {
        const textnoten = "Gelingsnachweis Kurs Modulprüfung Klassenarbeit Note 1 Note 2 Note 3 Note 4";
        handleCopy(btnCopy, textnoten, "Copy Noten");
    })
}
if (buttonCopy) {
    buttonCopy.addEventListener("click", () => {
        const textinfo = "Jahren Blutgruppe Jahrgang Sozialverhalten Info1 Info2 Info3 Info4";
        handleCopy(buttonCopy, textinfo, "Copy Info");
    })
}
if (btnNoten && tableNoten) {
    btnNoten.addEventListener("click", () => {
      if (textPP) {
        textPP.classList.add("shake");
        setTimeout(() => {
            textPP.classList.remove("shake")
        }, 500);
      }
      if (tableNoten.classList.contains("table-show")) {
        tableNoten.classList.replace("table-show", "table-hidden");
        if (btnCopy) btnCopy.classList.remove("show-btn");
      } else {
        loadNoten();
      }
    });
}
if (btnInfo && tableInfo) {
    btnInfo.addEventListener("click", () => {
        if (textPPP) {
            textPPP.classList.add("shake");
            setTimeout(() => {
            textPPP.classList.remove("shake")
        }, 500)
        }

        if (tableInfo.classList.contains("table-show")) {
            tableInfo.classList.replace("table-show", "table-hidden");
            if (buttonCopy) buttonCopy.classList.remove("show-btn");
        } else {
            loadInfo();
        }
    });
}
if (dilerImg && imgLoadcontainer) {
        dilerImg.addEventListener("click", () => {
            imgLoadcontainer.classList.remove("hidden");
            imgLoadcontainer.classList.add("loading-active")

            const bar = document.getElementById("img-progress-bar")
            if (bar) bar.style.width = '30%';

            setTimeout(() => {
                imgLoadcontainer.classList.remove("loading-active");
                imgLoadcontainer.classList.add("hidden");
                 window.open('https://campus.digitale-lernumgebung.de/index.php?option=com_dilerreg&view=loggedout&Itemid=314&lang=de');
            }, 1500)
        });
    }
    
    const cleanGrades = filterLatestGrades(rawGrades);
    const finalResult = calculateWeightedAverage(cleanGrades);

    console.log("Bekannte Note:", finalResult);
});