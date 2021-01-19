// global variables:
console.log('map + ');
const myMap = document.getElementById('map');
const errormaptest = document.getElementsByClassName('errorMap');
const mapDis = document.getElementsByClassName('map_tab');
const calcDiv = document.getElementsByClassName('calc_tab');
const comp = document.getElementsByClassName('comp_tab');
const mapTitle = document.getElementsByClassName('mapTitle');
const getting = 'getting info';
const error = document.getElementsByClassName('error');
const tableDiv = document.getElementById('tableDiv');
const calc = document.getElementById('calculator');
calc.style.display = 'none';
const addList = document.getElementById('AddBtn');

// booleans variables:
// use compTabMessage function to show the correct message- "will appear.."
let preSubmit = true;
// this is to conceal or show the messages in the map area during
let xmlTestmap = false;
//  conceal or show elements in map area based on xml data- this is another way.
let xmlTest = true;

const Ajax = {};
// submitBtn is clicked->use url route, if succede use callback, that goes to controller on server
Ajax.AxiosRequest = (url, callback, postData, file) => {
    // if we received the data, send it to the callback to populate the comparison tab or map
    axios.post(`${url}`, { gajax: `${postData}` })
        .then((response) => {
            // handle success
            // console.log(response);
            if (postData) {
                // console.log(response.data);
                callback(response);
            }
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

function getFormAddress() {
    /*
        Returns object literal address from the form of data
    */
    return {
        zip: $('#zip'),
        address: $('#address'),
        city: $('#city'),
        state: $('#state'),
    };
}

function textToXML(text) {
    /*
    Prepare text received from server for insertion into html by converting to xml
    */
    try {
        let xml = null;
        if (window.DOMParser) {
            const parser = new DOMParser();
            xml = parser.parseFromString(text, 'text/xml');
            const found = xml.getElementsByTagName('parsererror');
            if (!found || !found.length || !found[0].childNodes.length) {
                return xml;
            }
            return null;
        }
        xml = new ActiveXObject('Microsoft.XMLDOM');
        xml.async = false;
        xml.loadXML(text);
        return xml;
    } catch (e) {
        return e;
    }
}

function handleRequestComp(req) {
    /*
    This function gets the data for the "comp" tab from zillow.
    It is called from the handelRequest  function, after the google map is init.
    */

    // response will be the final html table with the data returned
    const response = document.getElementById('response');
    preSubmit = false;

    // retrive from the request object the response with the data from the server
    let xml = req.data;

    // convert it to xml data so you can insert into html
    xml = textToXML(xml);

    // this is where the display error style should be implemented if a error in zillow data occurs
    const testerror = xml.getElementsByTagName('text');

    if (testerror[0].textContent === 'Error: no exact match found for input address') {
        xmlTest = false;
        error[0].style.display = 'block';
        const table = document.getElementsByTagName('table');
        table.parentNode.removeChild(table);
        return;
    }
    xmlTest = true;
    xmlTestmap = true;

    // where most our data is going to come from
    const items = xml.getElementsByTagName('address');
    const amount = xml.getElementsByTagName('amount');

    // get the length of the path same as title
    const len = items.length;
    let output = '<table><thead><tr><th>Address</th><th>City</th><th>State</th><th>Zip</th><th>Amount</th></tr></thead><tbody>';
    for (let i = 0; i < len; i += 1) {
        output += '<tr>';

        // get data of elements
        output += `<td>${items[i].getElementsByTagName('street')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('city')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('state')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('zipcode')[0].firstChild.nodeValue}</td>`;
        output += `<td>${amount[i].textContent}</td>`;
        output += '</tr>';
    }
    output += '</tbody></table>';
    response.innerHTML = output;
    if (error[0].textContent === 'Error: no exact match found for input address') {
        error[0].style.display = 'block';
        return;
    }
    error[0].style.display = 'none';
    const th = document.getElementsByTagName('th');
    for (let i = th.length - 1; i >= 0; i -= 1) {
        th[i].style.backgroundColor = 'blue';
    }
    const td = document.getElementsByTagName('td');
    for (let i = td.length - 1; i >= 0; i -= 1) {
        td[i].style.borderBottom = '1px solid orange';
        td[i].style.outline = '1px solid orange';
        td[i].style.backgroundColor = '#E6E6E6';
    }

    // style the table
    const table = document.getElementsByTagName('table');
    table[0].style.width = '510px';
    table[0].style.borderColor = '#E6E6E6';
    table[0].style.borderBottom = 'thick solid #E6E6E6';
    table[0].style.borderLeft = 'thick solid #E6E6E6';
    table[0].style.borderRight = 'thick solid #E6E6E6';
    table[0].style.borderRightWidth = '50px';
    table[0].style.borderLeftWidth = '50px';
    table[0].style.borderBottomWidth = '150px';

    // put focus on the add to list button now that the 2nd handel request was triggered
    addList.focus();
    function display() {
        const form1 = document.getElementById('submitBtn');
        myMap.style.display = 'none';
        if (error[0].textContent === 'Error: no exact match found for input address') {
            error[0].style.display = 'block';
            mapTitle[0].style.display = 'none';
            calc.style.display = 'none';
            tableDiv.style.display = 'block';
            error[0].style.display = 'block';
            error[0].innerHTML = 'no comparison';
            return; // end the function now.
        }
        if (!xmlTest) {
            table[0].style.display = 'none';
            tableDiv.style.display = 'block';
            const errotest = document.getElementsByClassName('error');
            errotest[0].style.display = 'block';
            errormaptest[0].style.display = 'none';
        } else {
            tableDiv.style.display = 'block';
            table[0].style.display = 'table';
            error[0].style.display = 'none';
        }
        myMap.style.display = 'none';
        calc.style.display = 'none';
        table[0].style.width = '510px';

        // display only map when clicking map tab
        function HideTable() {
            const dynamicMap = document.getElementById('map');
            dynamicMap.style.display = 'none';
            table[0].style.display = 'none';
            calc.style.display = 'none';
            tableDiv.style.display = 'none';
            myMap.style.display = 'none';
        }
        form1.addEventListener('click', HideTable, false);
    }
    comp[0].addEventListener('click', display, false);
    table[0].style.display = 'none';
}

function handleRequest(req) {
    /*
    seems like req should be named response..
    This function gets the data for the map tab.
    It initilizes the google map and then calls the handelReqComp for the zillow data.
    */

    // no longer preSubmit situtation
    preSubmit = false;

    // hide messages
    mapTitle[0].style.display = 'none';

    // here we use  req.responseText and then
    // covert it to an xml object.
    // let xml = req.responseText;
    // xml = textToXML(xml);

    let xml = req.data;

    // convert it to xml data so you can insert into html
    xml = textToXML(xml);

    /// this is where the display error style should be implemented if a error in zillow data occurs
    const testerror = xml.getElementsByTagName('text');// grab the text from the zillow xml
    if (testerror[0].textContent === 'Error: no exact match found for input address') {
        xmlTest = false;
        const googlemap = document.getElementsByClassName('gm-style');
        // const table = document.getElementsByTagName('table');
        if (googlemap[0]) {
            googlemap[0].parentNode.removeChild(googlemap[0]);
        }
        errormaptest[0].style.display = 'block';
        return; // end the function now.
    }

    /*
    next is what happens if the xml data was returned successfully.
    display the map, grab zpid for
    next automatic ajax call for comparison data.
    */
    xmlTest = true;
    xmlTestmap = true;
    myMap.style.display = 'block';
    errormaptest[0].style.display = 'none';
    const latitude = xml.getElementsByTagName('latitude');
    const longitude = xml.getElementsByTagName('longitude');

    // zpid is required for the data from zillow
    const zpid = xml.getElementsByTagName('zpid');
    const zpidNum = (zpid[0].innerHTML);
    const latitudeA = Number(latitude[0].textContent);// turn in to a number
    const longitudeA = Number(longitude[0].textContent);
    function initMap() {
        myMap.style.width = '510px';
        myMap.style.height = '480px';

        // get cordinates from google maps
        // get map from google maps
        // notice the second argument is a set of object properties
        // myMap is the HTML element wheere we are going to display the map
        const map = new google.maps.Map(myMap, { zoom: 15, center: { lat: latitudeA, lng: longitudeA }, myTypeId: google.maps.MapTypeId.ROADMAP });
    }
    initMap();
    // get the data from zillow
    Ajax.AxiosRequest('/rest', handleRequestComp, zpidNum);
}

function viewRow() {
    /*
    A function to view in the map one of the properties stored in the list
    */
    myMap.style.display = 'none';
    errormaptest[0].style.none = 'none';
    mapTitle[0].style.none = 'block';
    const x = event.target;

    // grab stored propertes list data you wish to view
    const city = x.parentNode.getElementsByClassName('city1');
    const citytext = city[0].innerHTML;
    const address = x.parentNode.getElementsByClassName('address1');
    const addresstext = address[0].innerHTML;
    const state = x.parentNode.getElementsByClassName('state1');
    const stateText = state[0].innerHTML;
    const zip = x.parentNode.getElementsByClassName('zip1');
    const zipText = zip[0].innerHTML;

    // grab the form values you populated
    // populate into the form the stored list item you want to view
    const formObject = getFormAddress();
    formObject.zip.val(zipText);
    formObject.address.val(addresstext);
    formObject.city.val(citytext);
    formObject.state.val(stateText);

    // over here we are grabing the from theform data that we dynamically populated from the
    // the list prop we clicked, but why? better to just used the zipText etc.. above
    // hide the tab in preparation to view the other tab
    tableDiv.style.display = 'none';
    calc.style.display = 'none';
    const map = { address1: addresstext, city1: citytext, state1: stateText };
    const mapString = JSON.stringify(map);

    // send xml request using the route/controller on the server
    // NOTE: JavaScript does not allow you to do cross domain requests so we have to make the
    // request to the server then use the request module to get the data.
    // const getting = 'getting info';
    mapTitle[0].innerHTML = getting;
    Ajax.AxiosRequest('/restmap', handleRequest, mapString);
}

function deleterow() {
    /*
    A function to delete one of the stored real estate properties from the users list
    */

    // grab the target of the event
    const x = event.target;

    // remove the targe and parentnode of the target
    x.parentNode.remove();
    const strngview = document.getElementById('addListProp').innerHTML;

    // grab inner html of the entire list of perpreties
    sessionStorage.setItem('view', strngview.toString());

    // store into sessionStorage the list
    // clear the storage if spliing on id of state1 results in array shorter than 1 indexes
    if (strngview.split('state1').length < 1) {
        sessionStorage.clear();
    }
    if (sessionStorage.view === undefined) {
    // if sessionsStorage is undefined wipe the list clear with "" string
        document.getElementById('addListProp').innerHTML = '';
    } else {
        document.getElementById('addListProp').innerHTML = sessionStorage.view;
    }

    // IF THE LIST IS NOT EMPY then store the view storage data into the addListprop HTML elemeent
    // restore the events
    $('.view').on('click', viewRow);
    $('.remove').on('click', deleterow);
}

function addListEvents() {
    //  add event listeners to the list of save real-estate
    $('.view').on('click', viewRow);
    $('.remove').on('click', deleterow);
}

function propList() {
    /*
    A function to store the address to the list of real-estate properties
    */

    // get the address from the form
    const formObject = getFormAddress();
    const zip = formObject.zip.val();
    const address = formObject.address.val();
    const city = formObject.city.val();
    const state = formObject.state.val();
    if ((zip === '') && (address === '') && (city === '') && (state === '')) {
        return;
    }

    // get the storage list target elements for storing the list
    // is session storage view variable not empty
    if (sessionStorage.view !== undefined && sessionStorage.view !== '') {
        const testCity1 = $('.city1').text();
        const testAddress1 = $('.address1').text();
        const testState1 = $('.state1').text();
        const testZip1 = $('.zip1').text();

        //  here we deny a dupicate add request!
        if ((zip === testZip1)
        && (address === testAddress1)
        && (city === testCity1)
        && (state === testState1)) {
            return;
        }
    }

    // undefined here means the storage is empty.
    // store the form data
    if (sessionStorage.view === undefined) {
        sessionStorage.view = `<p>[<span class='remove'>remove</span>][<span class='view'>view</span>] <span class='city1'>${city}</span> <span class='address1'>${address}</span> <span class='state1'>${state}</span> <span class='zip1'>${zip}</span></p>`;
    } else {
        sessionStorage.view += `<p>[<span class='remove'>remove</span>][<span class='view'>view</span>] <span class='city1'>${city}</span> <span class='address1'>${address}</span> <span class='state1'>${state}</span> <span class='zip1'>${zip}</span></p>`;
    }

    // assign the stored list to the element
    document.getElementById('addListProp').innerHTML = sessionStorage.view;

    // grab and color font for add properties if a list exists
    if (document.getElementsByClassName('remove')) {
        $('.remove').css('color', 'blue');
        $('.view').css('color', 'blue');
    }

    // add the event listeners
    addListEvents();

    // empty the fields, prep for next data input..
    formObject.zip.val('');
    formObject.address.val('');
    formObject.city.val('');
    formObject.state.val('');
    const addressfocus = document.getElementById('address');
    addressfocus.focus();
}

function compTabMessage() {
    /*
    comp tabs display logic
    This will get this event listener, activate it, and then overwrite it with
    the eventhandeler nesed function called display. once we have a successful submission.
    The logic:
    a) there is no data,
    b) there is a request that brought back no data,
    c)there is a request that brought data and we will use that data to overwrite the
    else clause in compTabMessage
    */
    if (preSubmit) {
        mapTitle[0].style.display = 'none';
        calc.style.display = 'none';
        tableDiv.style.display = 'block';
        error[0].style.display = 'block';
        error[0].innerHTML = 'comparison data will appear here';
    } else {
        tableDiv.style.display = 'block';
        errormaptest[0].style.display = 'none';
        error[0].innerHTML = ' no comparison data available';
        error[0].style.display = 'block';
        calc.style.display = 'none';
    }
}

document.getElementById('submitBtn').addEventListener('click', (event) => {
    /*
    This annonymous function is here it grabs the event and prevents the
    default reloading of the page which is default for "required" in form.
    submitBtn->restCallMap->handelrequest->restmap->handleComp
    */
    errormaptest[0].style.display = 'none';
    myMap.style.display = 'none';
    mapTitle[0].style.display = 'block';

    // second time we use these elements in the file.
    const formAddress = getFormAddress();
    const zip = formAddress.zip.val();
    const city = formAddress.city.val();
    const state = formAddress.state.val();
    const address = formAddress.address.val();

    calc.style.display = 'none';
    const map = { address1: address, city1: city, state1: state };
    const mapString = JSON.stringify(map);

    // Dont allow the default of the required for the forms if all the feilds are populated
    if ((address) && (city) && (state) && (zip)) {
        event.preventDefault();
        mapTitle[0].innerHTML = getting;
        Ajax.AxiosRequest('/restmap', handleRequest, mapString);
    }
});

// might just use onload here with jquery
if (sessionStorage.view !== undefined) {
    document.getElementById('addListProp').innerHTML = sessionStorage.view;
    addListEvents();
}

function showCalc() {
    /*
    A function to show the calculator tab
    */
    myMap.style.display = 'none';
    calc.style.display = 'block';
    tableDiv.style.display = 'none';
    mapTitle[0].style.display = 'none';
    errormaptest[0].style.display = 'none';
}

function displayMap() {
    error[0].style.display = 'none';
    myMap.style.display = 'none';

    // test for error style to make sure you are not in zillow error moment
    if (!xmlTest) {
        myMap.style.display = 'none';
        calc.style.display = 'none';
        error[0].style.display = 'none';
        errormaptest[0].style.display = 'block';
    } else {
        myMap.style.display = 'block';
        if (xmlTestmap) {
            mapTitle[0].style.display = 'none';
        } else {
            mapTitle[0].style.display = 'block';
        }
    }
    calc.style.display = 'none';

    // dynamically created table
    const table2 = document.getElementsByTagName('table');
    table2[0].style.display = 'none';
}

// event listeners:
mapDis[0].addEventListener('click', displayMap, false);
addList.addEventListener('click', propList, false);
calcDiv[0].addEventListener('click', showCalc, false);
comp[0].addEventListener('click', compTabMessage, false);
