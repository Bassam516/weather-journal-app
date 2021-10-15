/*TODO: get the date of day*/
let d = new Date();
let newDate = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();

/*TODO: store url and api key */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=3041615562b3da17a05e19ac6b1566ee&units=metric";

/*TODO: callback function when click on generate button*/
function whenGenerate(event) {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeather(baseURL, !isNaN(zipCode) && zipCode.length == 5 ? zipCode : alert("please, Enter a valid zip code"), apiKey).then(function (data) {
        console.log(data);
        postData("/add", {
            date: newDate,
            temp: data.list[0].main.temp,
            content: feelings
        });
    }).then(function () {
        updateUI();
    });
}
/*TODO: function to get data*/
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

document.getElementById("generate").addEventListener("click", function () {
    whenGenerate();
    document.getElementById("entryHolder").style.display = "block";
});

/*TODO: function to post data*/
const postData = async (url = '', data = {}) => {
    console.log(data);
        const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
        console.log(`You saved`, newData);
        return newData;
    } catch (error) {
        console.log("error",error);
    }
}
/*TODO: update UI by the data*/
const updateUI = async () => {
    const req = await fetch("/all");
    try {
        const myData = await req.json();
        document.getElementById("date").innerHTML = `Date : ${myData.date}`;
        document.getElementById("temp").innerHTML = `temperature : ` + Math.round(myData.temp) + `&deg;C`;
        document.getElementById("content").innerHTML = `I feel : ${myData.content}`;
    } catch (error) {
        console.log("error", error);
    }
}


