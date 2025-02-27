// Menu Functions
import * as lists from './lists.js';
import { isElement, writeById, createLink, getFilename, urlExists, getBase, createLMNT, appendNestLMNT, appendLMNT } from './utilities.js';


function getWeeknum(menuweek) {
    let weekno;
    if (menuweek.substr(0, 4) === "week") {
        weekno = menuweek.substr(4, 2);
    }
    return weekno;
}

const siteTitle = (el) => {
    let elheader = `autoheader${el}`;
    let elhref;
    // set header
    switch (elheader) {
        case "autoheader330":
            elhref = "/330/";
            break;
        case "autoheaderhome":
            elhref = "/";
            //console.log(elhref);
            break;
        case "autoheaderchallenge":
            elhref = "../../";
            console.log(elhref);
            break;
        case `autoheader${el}`:
            elhref = "/courses/" + el + "/";
            break;
        default:
            elhref = "../";
            break;
    }
    // set header
    //console.log(elhref);
    //console.log(createLink(elhref, "Back to Index"));
    if (isElement(elheader)) {
        writeById(elheader, `<h1 id="siteTitle2" class="title">Doris Rush-Lopez <br> My BYU-Idaho Portfolio <br>  Major: Applied Technology</h1><h3 class="normal-text centered ">In solidarity with the Ukraine, the color scheme is based on<a href="https://en.wikipedia.org/wiki/Flag_of_Ukraine#Design"> their flag colors.</a><br><br>${createLink(elhref, "Back to Index")}</h3>`);
    }
}
siteTitle("327");
siteTitle("330");
siteTitle("340");
// Todo: get other courses added here with their index and links
siteTitle("home");
siteTitle("csa");
siteTitle("courses");
siteTitle("palette");


// set footer
if (isElement("autofooter")) {
    writeById("autofooter", "&copy; 2019-2022 | Doris Rush-Lopez, BYU-Idaho Candidate for <br> Bachelor of Science in Applied Technology");
}

const getTerm = (term) => {
    switch (term) {
        case "01":
            return "Winter";
            break;
        case "02":
            return "Spring";
            break;
        case "03":
            return "Summer";
            break;
        case "04":
            return "Fall";
            break;
        default:
            return "";
            break;
    }
}

const getIndexPageTitle = (id) => {
    //console.table(`mainNav.sort: ${mainNav.sort((a, b) => (a.term.toLowerCase() > b.term.toLowerCase()) ? 1 : -1)}`);
    const courses = lists.mainNav.sort((a, b) => ((a.cert + a.year + a.term) > (b.cert + b.year + b.term)) ? 1 : -1);
    //console.table(courses);
    if (isElement(id)) {
        let spot;
        let title;
        courses.forEach(course => {
            const termtext = getTerm(course.term);
            const term = `${course.term}: 20${course.year} - ${termtext}`;
            spot = id.indexOf("-");
            if ((course.code.toLowerCase() === id.substr(0, spot).toLowerCase()) && (isElement(id)) && (isElement(`${id}`))) {
                title = course.code + ' ' + course.name + '<br> Technology learned:<br>' + course.tech;
                // title = `${course.code} - ${course.name}

                //   Technology learned:
                //   ${course.tech}

                //   `;
                  writeById(id, title);
                  let id2 = `${id}2`;
                  writeById(id2, title);
              }
        });
    }
}
getIndexPageTitle("CS101-indexpagetitle");
getIndexPageTitle("CIT327-indexpagetitle");
getIndexPageTitle("WDD330-indexpagetitle");
getIndexPageTitle("CSE340-indexpagetitle");
getIndexPageTitle("WDD331-indexpagetitle");
getIndexPageTitle("CSA-indexpagetitle");


// set page title for WDD330 weekly pages
const header330 = `WDD330 - Web Frontend II | Week ${getWeeknum(getFilename()) }`;
if (isElement("wdd330pagetitle") && substr(0, 4, getFilename()) === "week") {
    document.getElementById("wdd330pagetitle").innerText = header330;
}

const setTitle = (course) => {
    if (isElement(course)) {
        writeById(course, `My ${course} Portfolio`);
    }
}

const setTitles = (list) => {
    list.forEach(course => {
        setTitle(course.code);
    });
}

const getTitles = (list) => {
    let courseCodes = [];
    list.forEach(course => {
        courseCodes.push(course.code);
    });
    console.log(courseCodes);
    return courseCodes;
}
const courseCodes = getTitles(lists.mainNav);
setTitles(courseCodes);

const getWeekPageTitle = (id, page) => {
    let weekNo = getWeeknum(getFilename()) || '5';
        // set page title for weekly pages
        let pageTitle = `${page} | Week ${weekNo}`;
        console.log(pageTitle);
    if (isElement(id)) {
        writeById(id, pageTitle);
    }
    let id2 = id + "2";
    console.log(id2);
    if (isElement(id2)) {
        console.log(id2, pageTitle)
        writeById(id2, pageTitle);
    }
}
getWeekPageTitle("cs101weekpagetitle", "CS101");
getWeekPageTitle("cit327weekpagetitle", "CIT327 Paper");
getWeekPageTitle("wdd330weekpagetitle", "WDD330 Tasks");
getWeekPageTitle("wdd330weekexercisetitle", "Exercises");
getWeekPageTitle("wdd330challengetitle", "Challenges");
getWeekPageTitle("wdd330weekpageheading", "WDD330 Tasks");

function getWeekPaperTitle(array) {
    let weekFile = `week${getWeeknum(getFilename())}`;
    // get paper title from menu array where filename is the week number
    array.forEach(element => {
        //console.log(element.url.substr(-11, 6))
        //console.log(weekFile)
        if ((element.url.substr(-11, 6) === weekFile) && (isElement("paperTitle"))) {
            //console.log(element.name)
            //console.log(document.getElementById("paperTitle"))
            document.getElementById("paperTitle").innerHTML = element.name;
            return;
        }
    });
}
getWeekPaperTitle(lists.paperslist);

function createCertNav(array, id) {
    // create link list container element
    if (isElement(id)) {
        const certbox = document.getElementById(id);
        console.log(certbox)
        // sort cert list by certdate
        lists.certs.sort(function(a, b) {
            var dateA = a.certdate;
            var dateB = b.certdate;
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            // dates must be equal
            return 0;
        });
        // create cert list element
        const certmenu = createLMNT('ul', '', 'menu', '', 'nodots', '');
        // create submenu of links for each cert's courses
        let certcount = 1;
        lists.certs.forEach((element) => {
            // get cert number
            const certCheck = element.cert;
            // create list item for this cert
            const certitem = createLMNT('li', '', `cert${certcount}` , '', '', '');
            const certh3 = createLMNT('h3', '', '', '', 'title', '');
            const certa = createLMNT('a', '', '', '', '', 'cert-text', '');
            certa.setAttribute('href', getBase() + 'images/' + element.certurl);
            // set text for item
            certa.innerText = `${element.certname}, Issue date: ${element.certdate}`;
            //console.log(certa);
            // add item to cert menu list
            appendNestLMNT(certmenu, certitem, certh3, certa, '', '');
            // create submenu list element
            let submenu = createLMNT('ul', '', `submenu${certcount}`, '', ' nodots', '');
            //submenu.style.listStyleType = "none";
            // set count of courses
            let coursecount = 1;
            // get list of courses to create links under each cert
            let certcourses = [];
            lists.mainNav.forEach((element) => {
                // console.log('element.cert === certCheck' + element.cert === certCheck);
                // console.log('element.cert: ' + element.cert);
                // console.log('certCheck: ' + certCheck);
                // if subitem's cert number = item's cert number, add to submenu list
                if (element.cert === certCheck) {
                    certcourses.push(element);
                }
            });
            //console.log(certcourses);
            // sort courses by name
            certcourses = certcourses.sort(function(a, b) {
                var nameA = a.year + a.term + a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.year + b.term + b.name.toUpperCase(); // ignore upper and lowercase
                //console.log(nameA, nameB);
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
            console.log(certcourses);
            certcourses.forEach((element) => {
                const submenuitem = createLMNT('li', '', `course${coursecount}`, '', '', '');
                const submenuh3 = createLMNT('h3', '', '', '', 'title', '');
                // if url does not exist AND data url length is less than 100, exit program
                if ((!urlExists(element.url)) && (element.url.length < 100)) {
                    return;
                } else {  // create link
                    const link = createLMNT('a', '', '', '', 'sub-text', '');
                    console.log(link);
                    // url and term exist, create the link and post to page
                    if ((element.term) && (element.term.length > 0)) {
                        const linktext = document.createTextNode(`${getTerm(element.term)} 20${element.year}, ${element.code} - ${element.name}`); //, (${element.tech})`);
                        link.setAttribute('href', element.url);
                        appendLMNT(link, linktext);
                    } else {
                        link.setAttribute('href', element.url);
                        const linktext = document.createTextNode(`${createLink(element.url, element.name)}`);
                        link.appendChild(linktext);
                    }
                    appendNestLMNT(submenu, submenuitem, submenuh3, link, '', '');
                }
                certitem.appendChild(submenu);
                coursecount++;
            });
            certcount++;
            appendNestLMNT(certbox, certmenu, certitem, '', '');
            certmenu.appendChild(certitem);
            //console.log(certmenu);
            certbox.appendChild(certmenu);
        });
    }
}
createCertNav(lists.mainNav,'certnav');

function createNav(array, id) {
  // create link list container element
  if (isElement(id)) {
    const container = document.getElementById(id);
    // sort array by name
    array.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // make non-case-sensitive
      var nameB = b.name.toUpperCase(); // make non-case-sensitive
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    // create link list element
    let menu = '<ul class="nodots">';
    // get list of files to create links for each menu entry
    array.forEach((element) => {
        if ((element.term) && (element.term.length > 0)) {
          const linktext = `${element.term}, ${element.code} - ${element.name}`;
          // TODO: save as variable for adding to index.html page as parameter? (${element.tech})
          menu += `<li class="nav">${createLink(element.url, linktext)}</li>`;
        } else {
            console.log(element.url, element.name);
          menu += `<li class="normal-text nodots">${createLink(element.url, element.name)}</li>`;
        }
    });
    menu += "</ul>";
    container.innerHTML = menu;
    return;
  }
}
// createNav(mainNav, "main-nav");
createNav(lists.list330, "notes");
createNav(lists.paperslist, "papers");
createNav(lists.presentations, "presentations");
