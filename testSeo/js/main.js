// progress bar

let step = 'step1';
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

const next = function() {

    step3.classList.add("is-complete");
    step4.classList.add("is-active");
    step4.classList.add("is-complete");

}

// end progress bar

// take data


const getCompetitors = function(callback) {

    const competitors = [

        { "id": 272, "domain_name": "emag.ro" },
        { "id": 7277, "domain_name": "altex.ro" },
        { "id": 280, "domain_name": "cel.ro" },
        { "id": 12095, "domain_name": "ideall.ro" },
        { "id": 407, "domain_name": "compari.ro" },
        { "id": 6452, "domain_name": "flanco.ro" },
        { "id": 357, "domain_name": "olx.ro" },
        { "id": 285, "domain_name": "ro.wikipedia.org" },
        { "id": 28679, "domain_name": "retete.unica.ro" },
        { "id": 56477, "domain_name": "badabum.ro" },
        { "id": 25022, "domain_name": "foodstory.stirileprotv.ro" },
        { "id": 12118, "domain_name": "domo.ro" },
        { "id": 337, "domain_name": "antena3.ro" }
    ]

    callback(competitors);

}

getCompetitors(function(data) {
    console.log('entryData:', data);

    // display all competitors

    let listCompetitor = document.querySelector('.competitor-container');
    let addDomain = document.getElementById('add-domain');

    const render = function(array) {

        array.forEach((competitor) => {
            listCompetitor.innerHTML += `<div class="element-competitor"><label class="element-competitor_label"><input class="checkbox" type="checkbox" data-id = ${competitor.domain_name}><span class="checkmark"></span></label><img class="element-competitor_image" src="https://www.google.com/s2/favicons?domain=www.${competitor.domain_name}"/><li class="competitor-item"> ${competitor.domain_name}</li></div>`;

        })
    }

    render(data);

    // add new competitor

    const newCompetitor = function(domain_name) {
        this.domain_name = domain_name
    }

    // handle error

    const handleError = function(wrongArgument) {
        alert(wrongArgument + ' already exist or incorrect domain !');
    }

    const addCompetitor = function() {


        let domainNameValue = document.getElementById('input').value;

        var arr2 = [];

        var val;

        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        for (let i = 0; i < data.length; i++) {
            var dataArray = data[i].domain_name;
            arr2.push(dataArray);

        }

        val = domainNameValue;

        // verify if it's a valid domain and it's not empty and url

        if (arr2.indexOf(val) === -1 && val !== "" && pattern.test(domainNameValue) == true) {


            arr2.push(val);
            data.push(new newCompetitor(domainNameValue));


            let competitorDisplay = document.createElement('DIV');
            competitorDisplay.classList.add('element-competitor');
            listCompetitor.appendChild(competitorDisplay);

            competitorDisplay.innerHTML = `<label class="element-competitor_label"><input type="checkbox" class="checkbox" data-id = ${domainNameValue}><span class="checkmark"></span></label><img class="element-competitor_image" src="https://www.google.com/s2/favicons?domain=www.${domainNameValue}"/><li class="competitor-item">${domainNameValue}</li>`;

        } else {
            handleError(domainNameValue);
        }

        console.log('val:', val);
        console.log('arr2:', arr2);
        console.log('newData:', data);

    }


    let nextStep = document.querySelector("#next-step");
    let checkBox = document.getElementsByClassName('checkbox');

    // counter the checkboxes

    const checkBoxCount = function() {

        let numChecked = 0;

        for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].type == 'checkbox' && checkBox[i].checked == true) {
                numChecked = numChecked + 1;
            }

        }

        if (numChecked < 5) {
            alert('please select minimum 5 competitors');
        } else {
            next();
            setTimeout(function() {
                changePage();
            }, 800)

        }

    }

    // parse data from another page with verification

    const changePage = function(e) {

        let arrChecked = [];
        let checkedValue;

        for (let i = 0; i < checkBox.length; i++) {            
            if (checkBox[i].type == 'checkbox' && checkBox[i].checked == true) {
                checkedValue = `<div class="element-competitor"><img class="element-competitor_image" src="https://www.google.com/s2/favicons?domain=www.${checkBox[i].dataset.id}"/><li class="competitor-item">${checkBox[i].dataset.id}</li></div>`;
                arrChecked.push(checkedValue);
                sessionStorage.setItem('arrChecked', arrChecked.join(" "));
            }
        }
        window.document.location = './competitors.html';
    };

    // add website on enter or click

    let domainNameButton = document.getElementById('input');

    addDomain.addEventListener('click', addCompetitor);
    nextStep.addEventListener('click', checkBoxCount);
    domainNameButton.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            addCompetitor();
        }
    });

});