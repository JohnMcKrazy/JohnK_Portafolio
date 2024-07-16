import { DB } from "./DB.js";
import * as utils from "./utils.js";

//^ UTILS FRAGMENTS
const $d = document;
const selector = (tag) => $d.querySelector(`${tag}`);
const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);
const fragmentHotProjects = $d.createDocumentFragment();
const fragmentPortfolioProjects = $d.createDocumentFragment();
const cardProjectTemplate = selector(".card_project_template").content;
const extraListBtnTemplate = selector(".extra_list_btn_template").content;
const certificationTemplate = selector(".certification_template").content;
const skillTemplate = selector(".skill_badge_template").content;
const fragmentBtns = $d.createDocumentFragment();

const es = "es";
const en = "en";
const close = "close";
const open = "open";
const storageName = "JohnK_Maker";
let menuStatus = close;
let menuSocialStatus = close;
let storageContent;
let currentTheme = "dark_theme";
let currentLang;

//^ SELECTORES
const BODY = selector("body");
const modal = selector(".modal");
export const nav = selector(".nav_menu");
const btnLogo = selector(".logo_btn");
const menuBtn = selector(".menu_btn");
const phoneMenu = selector(".phone_menu_controler");
const menuContainer = selector(".nav_menu_controler");
const menuSocialContainer = selector(".menu_social_container");
const modalInfoLegal = selector(".modal_info_legal");
const alertModal = selector(".alert_modal");
const contactModal = selector(".contact_modal");
const menuSocialBtnsContainer = selector(".menu_social_btns_container");
//MY ILLUSTRATION CONTENT
const designScreen = selector(".design_screen");
const designTabletScreen = selector(".design_tablet_screen");
const devScreen = selector(".dev_listPortfolioBtnsscreen");
const devTabletScreen = selector(".dev_tablet_screen");
const shieldScreen = selector(".shield_screen");
const illustrationScreen = selector(".illustration_screen");
const illustrationTabletScreen = selector(".illustration_tablet_screen");
// BUBBLES
const bubbleBio = selector(".bio_bubble");
const bubbleInfo = selector(".info_bubble");
const bubbleRex = selector(".rex_bubble");
// MODAL PORTFOLIO
const searchPortfolioListBtn = selector(".search_portfolio_list_btn");
const searchPortfolioListBtnLabel = searchPortfolioListBtn.querySelector(".label_btn");
const portfolioListContainer = selector(".portfolio_list_btns_container");
const extraListBtns = selectorAll(".extra_list_btn");
const searchExtraListBtn = selector(".search_extra_list_btn");
const searchExtraListBtnLabel = selector(".search_extra_list_btn").querySelector(".label_btn");
const extraListContainer = selector(".extra_list_btns_container");
// UTILS FUNCTIONS
const cardsHotContainer = selector(".cards_hot_container");
const portfolioCardsContainer = selector(".cards_portfolio_container");

const illustrationMe = selector(".desk_me");
const illustrationRex = selector(".dog");

/*  */
const legalModal = selector(".legal_modal");
const acceptStorageBtn = selector(".storage_accept");
const innerBtns = selectorAll(".inner_link_btn");
const linkBtns = selectorAll(".link_btn");
const legalAcceptBtn = selector(".legal_modal_accept_btn");
const closeModalBtns = selectorAll(".close_modal");
const sections = selectorAll(".section");
const menuBtnBars = selectorAll(".bar");

const btnDown = selector(".btn_down");
const accesibilityBtns = selectorAll(".accessibility_btn");
const actionBtns = selectorAll(".action_menu");
const sectionBtns = selectorAll(".section_btn");
const socialMenuBtns = selectorAll(".social_menu_btn");
const contactBtns = selectorAll(".contact_btn");
const heroBtns = selectorAll(".btn_hero");
const portfolioBtns = selectorAll(".portfolio_btn");
const animationKeys = selectorAll(".animation_key");
const forms = selectorAll("FORM");
const themeBtns = selectorAll(".theme_btn");
const langBtns = selectorAll(".lang_btn");

const tabletScreen = selector(".desk_tablet_screen");

const certificationsContainer = selector(".certification_container");
const designSkillsContainer = selector(".design_skills_container");

const devSkillsContainer = selector(".dev_skills_container");
const mainNavBtn = selector(".main_nav_btn ");

const swipeAnimationContainerFull = selectorAll(".swipe_animation_container_full");
const swipeAnimationContainerHalf = selectorAll(".swipe_animation_container_half");
const devIcons = selectorAll(".dev_icon");
const illustrationIcons = selectorAll(".illustration_icon");
const designIcons = selectorAll(".design_icon");

const listPortfolioBtns = selectorAll(".list_portfolio_btn");

const sectionDividers = selectorAll(".section_divider");

document.addEventListener("DOMContentLoaded", () => {
    const skillsData = utils.skillTypes;
    const sanitazer = (item) => utils.sanitizeInput(item);
    const deleteArr = (item) => utils.deleteArrElements(item);
    const deleteChild = (item) => utils.deleteChildElements(item);
    const retTop = (sec) => utils.returnTop(sec);
    const storage = utils.johnKStorage;
    const scrollSection = (sec) => utils.scrollToSection(sec);

    // FUNCTION FOR CHECK LOCAL STORAGE CONFIGURATION IN START
    const checkAlertStorageAnswer = () => {
        storageContent = JSON.parse(localStorage.getItem(storageName));
        console.log(storageContent);
        if (!storageContent) {
            localStorage.setItem(storageName, JSON.stringify(storage));
            console.log("local storage item is created");
            storageContent = storage;
        } else {
            if (storageContent["page_theme"] !== "dark_theme") {
                currentTheme = storageContent["page_theme"];
            }
            storageContent["page_view_count"] += 1;
            localStorage.setItem(storageName, JSON.stringify(storageContent));
            /* console.log(`local storage item answer= ${storageContent["page_alert_status"]}, page views= ${storageContent["page_view_count"]}`); */
        }

        BODY.className = currentTheme;
        /* console.log(storageContent); */
    };
    // FUNCTION FOR CHANGE LANGUAGE
    const changeLang = (lang) => {
        if (lang === es) {
            currentLang = en;
        } else {
            currentLang = es;
        }
        selectorAll("[data-change]").forEach((item) => (item.textContent = item.getAttribute(`data-${currentLang}`)));
        selectorAll("[data-change-input]").forEach((item) => item.setAttribute("placeholder", item.getAttribute(`data-${currentLang}`)));
    };
    // SET SYSTEM LANGUAGE FOR CHANGE LANGUAGE REFERENCE
    const setLang = () => {
        const navLang = window.navigator.language;
        if (navLang === "es" || (navLang[0] === "e" && navLang[1] === "s" && navLang[2] === "-")) {
            console.log("navegador en idioma español");
            currentLang = es;
        } else {
            console.log("navegador en otro idioma no español");
            currentLang = en;
        }
    };
    // SET HEIGHT PAGE CONFIGURATION
    const checkWindowHeight = () => {
        const rem = 20;
        const navTop = nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        let borderRadius = "1rem";

        if (navTop >= windowHeight) {
            nav.style.height = "8rem";

            menuSocialContainer.style.bottom = "inherit";
            menuSocialContainer.style.top = "2rem";
            menuSocialContainer.style.flexDirection = "column";

            btnLogo.style.height = "4rem";
            menuBtnBars.forEach((bar) => (bar.style.height = "4px"));

            setTimeout(() => {
                phoneMenu.style.top = 0;
                phoneMenu.style.bottom = "inherit";
                phoneMenu.style.flexDirection = "column";
                phoneMenu.style.borderRadius = `0 0 ${borderRadius} ${borderRadius}`;
                phoneMenu.style.setProperty("--menuPosition", "translateY(-100%)");
            }, 250);
        } else if (navTop < windowHeight) {
            nav.style.height = "6rem";

            menuBtnBars.forEach((bar) => (bar.style.height = "2px"));

            menuSocialContainer.style.top = "inherit";
            menuSocialContainer.style.bottom = "2rem";
            menuSocialContainer.style.flexDirection = "column-reverse";
            btnLogo.style.height = "3rem";

            setTimeout(() => {
                phoneMenu.style.top = "inherit";
                phoneMenu.style.bottom = 0;
                phoneMenu.style.flexDirection = "column-reverse";
                phoneMenu.style.borderRadius = `${borderRadius} ${borderRadius} 0 0`;
                phoneMenu.style.setProperty("--menuPosition", "translateY(100%)");
            }, 250);
        }
    };
    // SET DINAMIC CONTENT FOR PAGE

    const infSoftware = utils.infoSoftware;
    const setAssets = () => {
        infSoftware.forEach((software) => {
            const clone = skillTemplate.cloneNode(true);
            const badge = clone.querySelector(".skill_badge");
            badge.id = `skill_badge_${software.db_name}`;
            badge.setAttribute("data-name", software.db_name);
            badge.innerHTML = `${software.icon}<h3 class="badge_name">${software.tech_name}</h3>`;
            if (software.type === "design") {
                designSkillsContainer.querySelector(".icons_container").appendChild(badge);
            } else if (software.type === "dev") {
                devSkillsContainer.querySelector(".icons_container").appendChild(badge);
            }
            setTimeout(() => {
                badge.addEventListener("mouseover", (e) => {
                    const newData = infSoftware.find((item) => item.db_name === badge.getAttribute("data-name"));
                    bubbleInfo.querySelector(".title").textContent = newData.tech_complete_name;
                    bubbleInfo.querySelector(".description").textContent = newData[`tech_info_${currentLang}`];
                    bubbleInfo.classList.add("show_flex");
                    const containerWidth = bubbleInfo.getClientRects()[0].width;
                    bubbleInfo.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
                });
                badge.addEventListener(
                    "mouseleave",
                    () => {
                        bubbleInfo.classList.remove("show_flex");
                    },
                    250
                );
            });
        });
        utils.certificationsData.forEach((certification) => {
            const certificationClone = certificationTemplate.cloneNode(true);
            const certificationBadge = certificationClone.querySelector(".certification_badge");
            const certificationImg = certificationClone.querySelector(".badge_image");
            const certificationBtn = certificationClone.querySelector(".btn");
            const certificationName = certificationClone.querySelector(".badge_name");
            certificationImg.setAttribute("src", certification.image);
            certificationImg.setAttribute("alt", `Imagen de Certificado en '${certification[currentLang]}' emitido por FreeCodeCamp`);
            certificationName.textContent = certification[currentLang];
            certificationBtn.setAttribute("href", certification.link);

            certificationName.setAttribute("data-es", certification.es);
            certificationName.setAttribute("data-en", certification.en);
            certificationsContainer.appendChild(certificationBadge);
        });

        let filterHotData = utils.hotCardsSelection.map((itemHotCard) => DB.find((itemDB) => itemDB.db_name === itemHotCard));
        filterHotData.forEach((item) => createCard(item, fragmentHotProjects, "card_up"));
        cardsHotContainer.appendChild(fragmentHotProjects);

        setTimeout(() => {
            setLang();

            cardsHotContainer.querySelectorAll(".project_card").forEach((card) => {
                card.classList.add("card_up");
            });
            setTimeout(() => {
                setObservers();
                selectorAll("[data-change]").forEach((item) => (item.textContent = item.getAttribute(`data-${currentLang}`)));
                selectorAll("[data-change-input]").forEach((item) => item.setAttribute("placeholder", item.getAttribute(`data-${currentLang}`)));

                langBtns.forEach((btn) => btn.addEventListener("click", () => changeLang(currentLang)));
            }, 250);
        }, 250);
    };
    // SET ALL START CONFIGURATIONS
    const setStart = () => {
        checkWindowHeight();
        checkAlertStorageAnswer();

        setAssets();
    };
    // FUNCTION FOR TRANSLATE PAGE POSITION TO TOP
    const toTheTop = () => {
        const currentPosition = BODY.getBoundingClientRect().top;
        window.scrollTo(currentPosition, 0);
    };
    // FUNCTION FOR CREATE DINAMIC PROJECT CARDS
    const createCard = (item, frac, extraClass = "") => {
        let iconsRow = "";
        const cloneProjectCard = cardProjectTemplate.cloneNode(true);
        const projectCard = cloneProjectCard.querySelector(".project_card");
        const imgCard = cloneProjectCard.querySelector(".img_card");
        const projectCardIconsContainer = cloneProjectCard.querySelector(".icons_project_container");
        const cardTitle = cloneProjectCard.querySelector(".title");
        const innerBtn = cloneProjectCard.querySelector(".btn");
        const makeText = cloneProjectCard.querySelector("H3");
        //* ******************************************************************************** *//

        const cardImg = item["projects"]["img"];
        const cardDescription = item["projects"]["info"];
        if (extraClass === "") {
            projectCard.className += ` ${extraClass}`;
        }
        projectCard.setAttribute("id", `${item["db_name"]}_project_card`);
        imgCard.setAttribute("src", cardImg);
        imgCard.setAttribute("alt", cardDescription);

        const clientTechnologiesInProjects = item["projects"]["technologies"];
        clientTechnologiesInProjects.forEach((tech) => {
            /* console.log(tech); */
            infSoftware.forEach((technology) => {
                if (technology.tech_name === tech) {
                    iconsRow += technology.icon;
                }
            });
        });
        projectCardIconsContainer.innerHTML = iconsRow;

        if (item.project_name.es && item.project_name.en) {
            cardTitle.setAttribute("data-es", item["project_name"].es);
            cardTitle.setAttribute("data-en", item["project_name"].en);
        } else if (item.project_name.es && !item.project_name.en) {
            cardTitle.setAttribute("data-es", item["project_name"].es);
            cardTitle.setAttribute("data-en", item["project_name"].es);
        } else if (!item.project_name.es && item.project_name.en) {
            cardTitle.setAttribute("data-en", item["project_name"].en);
            cardTitle.setAttribute("data-es", item["project_name"].en);
        }

        if (currentLang) {
            cardTitle.textContent = item.project_name[currentLang];
        }
        innerBtn.setAttribute("href", `${item["projects"]["project_link"]}`);
        innerBtn.textContent = innerBtn.getAttribute(`data-${currentLang}`);
        makeText.textContent = makeText.getAttribute(`data-${currentLang}`);
        frac.appendChild(projectCard);
    };

    // FUNCTION FOR CHANGE PAGE COLOR SCHEMA THEME
    const changeTheme = (tm) => {
        const lightT = "light_theme";
        const darkT = "dark_theme";
        switch (tm) {
            case lightT:
                currentTheme = darkT;
                break;
            case darkT:
                currentTheme = lightT;
                break;
        }
        storageContent["page_theme"] = currentTheme;
        localStorage.setItem(storageName, JSON.stringify(storageContent));
        BODY.className = currentTheme;
    };
    // FUNCTION FOR PHONE MENU ACTIONS
    const menuActions = (status) => {
        const navTop = nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        if (status === close) {
            menuStatus = open;
            phoneMenu.classList.add("show_flex");
            setTimeout(() => {
                phoneMenu.classList.add("show_opacity");
                setTimeout(() => phoneMenu.classList.add("show_menu"), 500);
                mainNavBtn.focus();
            }, 200);
        } else if (status === open) {
            /* console.log("cerrando menu"); */
            menuStatus = close;
            phoneMenu.classList.remove("show_menu");
            setTimeout(() => phoneMenu.classList.remove("show_opacity"), 500);
            setTimeout(() => {
                phoneMenu.classList.remove("show_flex");
            }, 1200);
        }
    };
    // FUNCTION FOR SOCIAL MENU ACTIONS
    const menuSocialActions = (action) => {
        if (action === open) {
            /* console.log("cerrando menu social"); */
            menuSocialStatus = close;
            menuSocialBtnsContainer.classList.remove("show_opacity");
            setTimeout(() => {
                menuSocialBtnsContainer.classList.remove("show_flex");
            }, 1000);
        } else if (action === close) {
            /* console.log("abriendo menu social"); */

            menuSocialStatus = open;
            menuSocialBtnsContainer.classList.add("show_flex");
            setTimeout(() => {
                menuSocialBtnsContainer.classList.add("show_opacity");
            }, 200);
        }
    };
    //  FUNCTION FOR MODAL BACKDROP ACTIONS
    const modalActions = (action) => {
        if (action === close) {
            modal.classList.remove("show_opacity");
            setTimeout(() => modal.classList.remove("show_flex"), 500);
        } else if (action === open) {
            modal.classList.add("show_flex");
            setTimeout(() => modal.classList.add("show_opacity"), 500);
        }
    };
    // FUNCTION FOR MODAL WINDOWS ACTIONS
    const modalWindowActions = (window, action) => {
        if (action === close) {
            window.classList.remove("modal_open");
            setTimeout(() => {
                window.classList.remove("show_flex");
                setTimeout(() => {
                    modalActions(close);
                }, 100);
            }, 700);
        } else if (action === open) {
            modalActions(open);
            setTimeout(() => {
                window.classList.add("show_flex");
                setTimeout(() => {
                    window.classList.add("modal_open");
                }, 100);
            }, 700);
        }
    };

    const setObservers = () => {
        const show = (currentEntry) => currentEntry.classList.add(`show_card`);
        const hide = (currentEntry) => currentEntry.classList.remove(`show_card`);

        swipeAnimationContainerFull.forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = entry.target.querySelectorAll(".animation_up");
                animationUpContainers.forEach((container) => {
                    if (entry.isIntersecting) {
                        show(container);
                    } else {
                        hide(container);
                    }
                });
            };
            const optionsIO_up = {
                threshold: ".8",
            };
            const skillsContainersObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_up);
            skillsContainersObserver.observe(container);
        });

        swipeAnimationContainerHalf.forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = entry.target.querySelectorAll(".animation_up");

                animationUpContainers.forEach((container) => {
                    if (entry.isIntersecting) {
                        show(container);
                    } else {
                        hide(container);
                    }
                });
            };
            const optionsIO_skills = {
                threshold: ".4",
            };

            const skillsContainersObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_skills);
            skillsContainersObserver.observe(container);
        });
        selectorAll(".card_up").forEach((card) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                if (entry.isIntersecting) {
                    show(card);
                } else {
                    hide(card);
                }
            };

            const optionsIO_cards = {
                threshold: ".4",
            };

            const cardsObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_cards);
            cardsObserver.observe(card);
        });
        const watchIllustration = ([entry]) => {
            if (entry.isIntersecting) {
                selector(".desk_me").classList.add("show_krazy");
            } else {
                selector(".desk_me").classList.remove("show_krazy");
            }
        };

        const options_illustration = {
            threshold: ".4",
        };

        const illustrationObserver = new IntersectionObserver(watchIllustration, options_illustration);
        illustrationObserver.observe(selector(".deskwork_icon"));
        sectionDividers.forEach((container) => {
            const watchAnimationContainer = ([entry]) => {
                const contentContainer = entry.target.querySelectorAll(".content");

                contentContainer.forEach((container) => {
                    if (entry.isIntersecting) {
                        container.classList.add(`show_quote`);
                    } else {
                        container.classList.remove(`show_quote`);
                    }
                });
            };
            const optionsIO = {
                threshold: ".4",
            };

            const containersObserver = new IntersectionObserver(watchAnimationContainer, optionsIO);
            containersObserver.observe(container);
        });
    };

    /* ! *********************************************** */

    // FUNCTION FOR CREATE DINAMIC PORTFOLIO LIST BTNS
    /* 
    const createExtraListbtn = (skill, key) => {
        let typeData = "";
        if (skill !== "all") {
            typeData = skillsData[skill].types[key];
        } else {
            typeData = skillsData.all;
        }

        const newTemplate = extraListBtnTemplate.cloneNode(true);
        const newBtn = newTemplate.querySelector(".extra_list_btn");
        const btnLabel = newTemplate.querySelector(".label_btn");
        let reference = "";
        if (typeData.en && typeData.es) {
            btnLabel.textContent = typeData[currentLang];
            btnLabel.setAttribute("data-en", typeData.en);
            btnLabel.setAttribute("data-es", typeData.es);
        } else if (typeData.es && !typeData.en) {
            btnLabel.textContent = typeData.es;
            btnLabel.setAttribute("data-en", typeData.es);
            btnLabel.setAttribute("data-es", typeData.es);
        } else if (!typeData.es && typeData.en) {
            btnLabel.textContent = typeData.en;
            btnLabel.setAttribute("data-en", typeData.en);
            btnLabel.setAttribute("data-es", typeData.en);
        }

        if (typeData.en === "all") {
            btnLabel.setAttribute("data-ref", "all");
        } else {
            btnLabel.setAttribute("data-ref", typeData.ref);
        }
        btnLabel.setAttribute("data-skill", skill);

        fragmentBtns.appendChild(newBtn);
    };
   
  

    

     */
    /* ! *********************************************** */

    const clearPortfolio = () => {
        deleteArr(fragmentPortfolioProjects);
        deleteChild(portfolioCardsContainer);
    };
    const clearExtraListBtns = () => {
        deleteArr(fragmentBtns);
        deleteChild(extraListContainer);
    };
    const listPortfolioActions = () => {
        portfolioListContainer.classList.toggle("list_down");
        searchPortfolioListBtn.classList.toggle("list_btn_active");
        searchPortfolioListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
    };
    const listExtrasActions = () => {
        extraListContainer.classList.toggle("list_down");
        searchExtraListBtn.classList.toggle("list_btn_active");
        searchExtraListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
        extraListContainer.children[0].focus();
    };
    const activateExtraBtns = (btn) => {
        listExtrasActions();
        clearPortfolio();
        retTop(portfolioCardsContainer);
        const label = btn.querySelector(".label_btn");
        const tag = label.getAttribute("data-ref");
        const skillType = label.getAttribute("data-skill");
        let currentData;
        if (tag === "all") {
            searchExtraListBtnLabel.setAttribute(`data-es`, skillsData.all.es);
            searchExtraListBtnLabel.setAttribute(`data-en`, skillsData.all.en);
            searchExtraListBtnLabel.textContent = skillsData.all[currentLang];
        } else {
            if (Object.hasOwn(skillsData[skillType].types[tag], currentLang)) {
                searchExtraListBtnLabel.setAttribute(`data-es`, skillsData[skillType].types[tag].es);
                searchExtraListBtnLabel.setAttribute(`data-en`, skillsData[skillType].types[tag].en);
                searchExtraListBtnLabel.textContent = skillsData[skillType].types[tag][currentLang];
            } else {
                searchExtraListBtnLabel.setAttribute(`data-es`, skillsData[skillType].types[tag][0]);
                searchExtraListBtnLabel.setAttribute(`data-en`, skillsData[skillType].types[tag][0]);
                searchExtraListBtnLabel.textContent = skillsData[skillType].types[tag][0];
            }
        }
        if (tag === "all" && skillType === "all") {
            currentData = DB;
        } else if (tag === "all" && skillType !== "all") {
            currentData = DB.filter((item) => item.projects.type === skillType);
        } else if (tag !== "all") {
            currentData = DB.filter((item) => item.projects.skills.includes(tag));
        }

        currentData.forEach((item) => createCard(item, fragmentPortfolioProjects));
        portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
        /*  */
    };
    searchPortfolioListBtn.addEventListener("click", () => {
        listPortfolioActions();
        portfolioListContainer.children[0].focus();
    });
    searchExtraListBtn.addEventListener("click", listExtrasActions);
    const openPortfolioModal = (target) => {
        clearPortfolio();
        clearExtraListBtns();

        const modalToOpen = target.getAttribute("data-name");
        DB.forEach((data) => createCard(data, fragmentPortfolioProjects));

        Object.keys(skillsData).forEach((skill) => {
            if (skill === "all") {
                const typeData = skillsData.all;
                const newTemplate = extraListBtnTemplate.cloneNode(true);
                const newBtn = newTemplate.querySelector(".extra_list_btn");
                const btnLabel = newBtn.querySelector(".label_btn");

                btnLabel.textContent = typeData[currentLang];
                btnLabel.setAttribute("data-en", typeData.en);
                btnLabel.setAttribute("data-es", typeData.es);
                btnLabel.setAttribute("data-ref", "all");
                btnLabel.setAttribute("data-skill", skill);
                newBtn.addEventListener("click", () => activateExtraBtns(newBtn));
                fragmentBtns.appendChild(newBtn);
            } else {
                Object.keys(skillsData[skill].types).forEach((key) => {
                    const typeData = skillsData[skill].types[key];
                    const newTemplate = extraListBtnTemplate.cloneNode(true);
                    const newBtn = newTemplate.querySelector(".extra_list_btn");
                    const btnLabel = newTemplate.querySelector(".label_btn");
                    if (typeData.en && typeData.es) {
                        btnLabel.textContent = typeData[currentLang];
                        btnLabel.setAttribute("data-en", typeData.en);
                        btnLabel.setAttribute("data-es", typeData.es);
                    } else if (typeData.es && !typeData.en) {
                        btnLabel.textContent = typeData.es;
                        btnLabel.setAttribute("data-en", typeData.es);
                        btnLabel.setAttribute("data-es", typeData.es);
                    } else if (!typeData.es && typeData.en) {
                        btnLabel.textContent = typeData.en;
                        btnLabel.setAttribute("data-en", typeData.en);
                        btnLabel.setAttribute("data-es", typeData.en);
                    }
                    btnLabel.setAttribute("data-ref", typeData.ref);
                    btnLabel.setAttribute("data-skill", skill);
                    newBtn.addEventListener("click", () => activateExtraBtns(newBtn));
                    fragmentBtns.appendChild(newBtn);
                });
            }
        });
        extraListContainer.appendChild(fragmentBtns);
        portfolioCardsContainer.appendChild(fragmentPortfolioProjects);

        modalWindowActions(selector(`.${modalToOpen}`), open);

        listPortfolioBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                listPortfolioActions();
                clearExtraListBtns();
                searchExtraListBtnLabel.setAttribute(`data-es`, skillsData.all.es);
                searchExtraListBtnLabel.setAttribute(`data-en`, skillsData.all.en);
                searchExtraListBtnLabel.textContent = skillsData.all[`data_${currentLang}`];

                retTop(portfolioCardsContainer);

                const btnLabel = btn.querySelector(".label_btn");
                const btnData = btnLabel.getAttribute("data-en");
                let newName = "";
                if (Object.hasOwn(skillsData[btnData], currentLang)) {
                    newName = skillsData[btnData][currentLang];
                    console.log(newName);
                } else {
                    newName = skillsData[btnData][0];
                }
                searchPortfolioListBtnLabel.setAttribute("data-en", skillsData[btnData].en);
                searchPortfolioListBtnLabel.setAttribute("data-es", skillsData[btnData].es);
                searchPortfolioListBtnLabel.textContent = newName;

                searchExtraListBtnLabel.setAttribute(`data-es`, skillsData.all.es);
                searchExtraListBtnLabel.setAttribute(`data-en`, skillsData.all.en);
                searchExtraListBtnLabel.textContent = skillsData.all[currentLang];

                searchExtraListBtn.focus();
                deleteArr(fragmentPortfolioProjects);
                deleteChild(portfolioCardsContainer);
                let dataToCheck = [];
                btnData !== "all" ? (dataToCheck = DB.filter((item) => item.projects.type === btnData)) : (dataToCheck = DB);
                dataToCheck.forEach((data) => createCard(data, fragmentPortfolioProjects));
                /*  */

                if (btnData === "all") {
                    /*  */
                    Object.keys(skillsData).forEach((skill) => {
                        if (skill === "all") {
                            const typeData = skillsData.all;
                            const newTemplate = extraListBtnTemplate.cloneNode(true);
                            const newBtn = newTemplate.querySelector(".extra_list_btn");
                            const btnLabel = newBtn.querySelector(".label_btn");

                            btnLabel.textContent = typeData[currentLang];
                            btnLabel.setAttribute("data-en", typeData.en);
                            btnLabel.setAttribute("data-es", typeData.es);
                            btnLabel.setAttribute("data-ref", "all");
                            btnLabel.setAttribute("data-skill", skill);
                            newBtn.addEventListener("click", () => activateExtraBtns(newBtn));
                            fragmentBtns.appendChild(newBtn);
                        } else {
                            Object.keys(skillsData[skill].types).forEach((key) => {
                                const typeData = skillsData[skill].types[key];
                                const newTemplate = extraListBtnTemplate.cloneNode(true);
                                const newBtn = newTemplate.querySelector(".extra_list_btn");
                                const btnLabel = newTemplate.querySelector(".label_btn");
                                if (typeData.en && typeData.es) {
                                    btnLabel.textContent = typeData[currentLang];
                                    btnLabel.setAttribute("data-en", typeData.en);
                                    btnLabel.setAttribute("data-es", typeData.es);
                                } else if (typeData.es && !typeData.en) {
                                    btnLabel.textContent = typeData.es;
                                    btnLabel.setAttribute("data-en", typeData.es);
                                    btnLabel.setAttribute("data-es", typeData.es);
                                } else if (!typeData.es && typeData.en) {
                                    btnLabel.textContent = typeData.en;
                                    btnLabel.setAttribute("data-en", typeData.en);
                                    btnLabel.setAttribute("data-es", typeData.en);
                                }
                                btnLabel.setAttribute("data-ref", typeData.ref);
                                btnLabel.setAttribute("data-skill", skill);
                                newBtn.addEventListener("click", () => activateExtraBtns(newBtn));
                                fragmentBtns.appendChild(newBtn);
                            });
                        }
                    });

                    /*  */
                } else {
                    const newTemplate = extraListBtnTemplate.cloneNode(true);
                    const allBtn = newTemplate.querySelector(".extra_list_btn");
                    const labelAllBtn = allBtn.querySelector(".label_btn");

                    labelAllBtn.textContent = skillsData.all[currentLang];
                    labelAllBtn.setAttribute("data-en", skillsData.all.en);
                    labelAllBtn.setAttribute("data-es", skillsData.all.es);
                    labelAllBtn.setAttribute("data-ref", "all");
                    labelAllBtn.setAttribute("data-skill", btnData);
                    allBtn.addEventListener("click", () => activateExtraBtns(allBtn));
                    fragmentBtns.appendChild(allBtn);
                    Object.keys(skillsData[btnData].types).forEach((key) => {
                        const typeExtraData = skillsData[btnData].types[key];
                        const newTemplate = extraListBtnTemplate.cloneNode(true);
                        const newExtraBtn = newTemplate.querySelector(".extra_list_btn");
                        const extraBtnLabel = newExtraBtn.querySelector(".label_btn");
                        if (typeExtraData.en && typeExtraData.es) {
                            extraBtnLabel.textContent = typeExtraData[currentLang];
                            extraBtnLabel.setAttribute("data-en", typeExtraData.en);
                            extraBtnLabel.setAttribute("data-es", typeExtraData.es);
                        } else if (typeExtraData.es && !typeExtraData.en) {
                            extraBtnLabel.textContent = typeExtraData.es;
                            extraBtnLabel.setAttribute("data-en", typeExtraData.es);
                            extraBtnLabel.setAttribute("data-es", typeExtraData.es);
                        } else if (!typeExtraData.es && typeExtraData.en) {
                            extraBtnLabel.textContent = typeExtraData.en;
                            extraBtnLabel.setAttribute("data-en", typeExtraData.en);
                            extraBtnLabel.setAttribute("data-es", typeExtraData.en);
                        }
                        extraBtnLabel.setAttribute("data-ref", typeExtraData.ref);
                        extraBtnLabel.setAttribute("data-skill", btnData);
                        newExtraBtn.addEventListener("click", () => activateExtraBtns(newExtraBtn));
                        fragmentBtns.appendChild(newExtraBtn);
                    });
                }

                extraListContainer.appendChild(fragmentBtns);
                /*  */
                portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
            });
        });
    };

    const devIconsActions = (action) => {
        if (action === open) {
            devIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            shieldScreen.classList.remove("screen_hide");
            devTabletScreen.classList.remove("screen_hide");
            setTimeout(() => devScreen.classList.remove("screen_hide"), 250);
        } else {
            devIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            devScreen.classList.add("screen_hide");

            devTabletScreen.classList.add("screen_hide");
            setTimeout(() => shieldScreen.classList.add("screen_hide"), 250);
        }
    };
    const illustrationIconsActions = (action) => {
        if (action === open) {
            illustrationIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            illustrationScreen.classList.remove("screen_hide");
            illustrationTabletScreen.classList.remove("screen_hide");
        } else {
            illustrationIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            illustrationScreen.classList.add("screen_hide");
            illustrationTabletScreen.classList.add("screen_hide");
        }
    };
    const designIconsActions = (action) => {
        if (action === open) {
            designIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            designScreen.classList.remove("screen_hide");
            designTabletScreen.classList.remove("screen_hide");
        } else {
            designIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            designScreen.classList.add("screen_hide");
            designTabletScreen.classList.add("screen_hide");
        }
    };
    const oneSectionStep = () => {
        const windowHeight = window.innerHeight;
        const navHeight = nav.getBoundingClientRect().height;
        const fixHeight = windowHeight - navHeight;
        window.scrollTo(0, fixHeight);
    };
    const acceptStorage = () => {
        storage["page_alert_status"] = close;
        modalWindowActions(alertModal, close);
        localStorage.setItem(storageName, JSON.stringify(storage));
        console.log(localStorage.getItem(storageName));
    };
    const closeLegalModal = () => {
        retTop(modalInfoLegal);
        setTimeout(() => modalWindowActions(legalModal, close), 250);
    };
    const changeModalWindow = (currentBtn) => {
        const current = currentBtn.getAttribute("data-current");
        const next = currentBtn.getAttribute("data-next");
        const currentModal = selector(`.${current}`);
        const nextModal = selector(`.${next}`);
        currentModal.classList.remove("modal_open");
        setTimeout(() => {
            currentModal.classList.remove("show_flex");
            nextModal.classList.add("show_flex");
            setTimeout(() => {
                nextModal.classList.add("modal_open");
            }, 200);
        }, 600);
    };
    acceptStorageBtn.addEventListener("click", acceptStorage);

    innerBtns.forEach((btn) => btn.addEventListener("click", () => changeModalWindow(btn)));

    linkBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            const btnName = btn.getAttribute("data-name");
            const currentBtn = selector(`.${btnName}`);
            const currentPosition = modalInfoLegal.getBoundingClientRect().top;
            if (btnName === "legal_section") {
            } else {
                modalWindowActions(currentBtn, open);
            }
        })
    );

    legalAcceptBtn.addEventListener("click", closeLegalModal);

    closeModalBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            const btnName = btn.getAttribute("data-name");
            const currentBtn = selector(`.${btnName}`);

            if (btnName === "legal_modal") {
                closeLegalModal();
            } else if (btnName === "portfolio_modal") {
                retTop(portfolioCardsContainer);

                setTimeout(() => {
                    modalWindowActions(currentBtn, close);
                    setTimeout(() => {
                        searchExtraListBtnLabel.setAttribute("data-es", skillsData.all.es);
                        searchExtraListBtnLabel.setAttribute("data-en", skillsData.all.en);
                        searchExtraListBtnLabel.textContent = skillsData.all[currentLang];
                        searchPortfolioListBtnLabel.setAttribute("data-es", skillsData.all.es);
                        searchPortfolioListBtnLabel.setAttribute("data-en", skillsData.all.en);
                        searchPortfolioListBtnLabel.textContent = skillsData.all[currentLang];
                    }, 250);
                }, 500);
            } else {
                modalWindowActions(currentBtn, close);
            }
        })
    );

    sections.forEach((section) => {
        const watchPage = ([entry]) => {
            if (entry.isIntersecting) {
                const entryName = entry.target.attributes.id.value;
                sectionBtns.forEach((btn) => {
                    const btnName = btn.name;
                    if (btnName === entryName) {
                        btn.classList.add("btn_active");
                    } else {
                        btn.classList.remove("btn_active");
                    }
                });
            }
        };
        const optionsIO_sections = {
            rootMargin: "5%",
            threshold: 0.3,
        };
        const pageObserver = new IntersectionObserver(watchPage, optionsIO_sections);
        pageObserver.observe(section);
    });

    btnDown.addEventListener("click", oneSectionStep);

    accesibilityBtns.forEach((btn) => {
        btn.addEventListener("click", () => scrollSection(btn));
    });

    actionBtns.forEach((btn) => {
        btn.addEventListener("click", () => menuActions(menuStatus));
    });

    sectionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollSection(btn);
        });
    });

    socialMenuBtns.forEach((btn) => {
        btn.addEventListener("enter", () => menuSocialActions(menuSocialStatus));
        btn.addEventListener("click", () => menuSocialActions(menuSocialStatus));
    });

    contactBtns.forEach((btn) => {
        btn.addEventListener("enter", () => modalWindowActions(contactModal, open));
        btn.addEventListener("click", () => modalWindowActions(contactModal, open));
    });

    heroBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollSection(btn);
        });
    });

    portfolioBtns.forEach((btn) => {
        btn.addEventListener("click", () => openPortfolioModal(btn));
    });
    illustrationMe.addEventListener("mouseover", (e) => {
        bubbleBio.classList.add("show_flex");
        const containerWidth = bubbleBio.getClientRects()[0].width;
        const containerHeight = bubbleBio.getClientRects()[0].height;
        bubbleBio.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - containerHeight / 2}px)`;
    });

    bubbleBio.addEventListener("mouseleave", () => {
        bubbleBio.classList.remove("show_flex");
    });

    const tooltipMargin = 12;
    illustrationRex.addEventListener("mouseover", (e) => {
        bubbleRex.classList.add("show_flex");
        const containerWidth = bubbleRex.getClientRects()[0].width;
        bubbleRex.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
    });

    illustrationRex.addEventListener("mouseleave", () => {
        bubbleRex.classList.remove("show_flex");
    });

    animationKeys.forEach((key) => {
        key.addEventListener("mouseover", () => {
            switch (key.getAttribute("data-key")) {
                case "dev":
                    devIconsActions(open);
                    break;
                case "illustration":
                    illustrationIconsActions(open);
                    break;
                case "design":
                    designIconsActions(open);
                    break;
            }

            tabletScreen.classList.add("tablet_screen_on");
        });

        key.addEventListener("mouseleave", () => {
            switch (key.getAttribute("data-key")) {
                case "dev":
                    devIconsActions(close);
                    break;
                case "illustration":
                    illustrationIconsActions(close);
                    break;
                case "design":
                    designIconsActions(close);
                    break;
            }
            tabletScreen.classList.remove("tablet_screen_on");
        });
    });

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            sanitazer(form.querySelector(".input_name"));
            sanitazer(form.querySelector(".input_last_name"));
            sanitazer(form.querySelector(".input_email"));
            sanitazer(form.querySelector(".input_description"));
            let formName = form.querySelector(".send_btn").getAttribute("data-form");
            let formResponse = form.querySelector(".form_response");
            let formResponseContainer = form.querySelector(".form_response_container");
            const formResponseActions = (action, status = "", msg = "") => {
                if (action === open) {
                    formResponseContainer.style.background = `var(--${status})`;
                    if (status === "good") {
                        form.reset();
                    }
                    if (status === "warning") {
                        formResponse.style.color = "var(--blackOff)";
                    } else {
                        formResponse.style.color = "var(--whiteOff)";
                    }
                    formResponse.textContent = msg;
                    formResponseContainer.classList.add("show_flex");
                    setTimeout(() => {
                        formResponseContainer.classList.add("show_opacity");
                    }, 500);
                } else if (action === close) {
                    formResponseContainer.classList.remove("show_opacity");
                    setTimeout(() => {
                        formResponseContainer.classList.remove("show_flex");
                    }, 500);
                }
            };
            console.log(formName);

            const formData = new FormData(form);
            let newData = {};

            formData.forEach((value, key) => {
                newData[key] = value;
            });
            const jsonData = JSON.stringify(newData);
            console.log(jsonData);
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: jsonData,
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        formResponseActions(open, "good", "!Enviado satisfactoriamente, gracias por contactarme¡");
                    } else {
                        console.log(response);
                        formResponseActions(open, "danger", "Algo ah salido mal, por favor intentalo de nuevo");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    formResponseActions(open, "danger", "Algo ah salido mal, por favor intentalo de nuevo");
                })
                .then(function () {
                    setTimeout(() => {
                        formResponseActions(close);
                    }, 5000);
                });
        });
    });

    themeBtns.forEach((btn) => {
        btn.addEventListener("click", () => changeTheme(currentTheme));
    });

    btnLogo.addEventListener("click", toTheTop);

    window.addEventListener("scroll", () => {
        checkWindowHeight();
        if (menuStatus === open) {
            menuActions(menuStatus);
        }
        if (menuSocialStatus === open) {
            menuSocialActions(menuSocialStatus);
        }
    });

    setTimeout(setStart, 250);
});
