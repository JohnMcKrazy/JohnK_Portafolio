import { DB } from "./DB.js";
import * as utils from "./utils.js";

/* FUNCTION SELECTORS */
const $d = document;
const selector = (tag, queryContainer = $d) => queryContainer.querySelector(`${tag}`);
const selectorAll = (tag, queryContainer = $d) => queryContainer.querySelectorAll(`${tag}`);
/* FRAGMENTS */

const lightT = "light";
const darkT = "dark";
const es = "es";
const en = "en";
const close = "close";
const open = "open";
const storageName = "JK_Dev_storage";
let menuActive = false;
let menuSocialActive = false;
let storageContent;
let currentTheme = darkT;
let audioItsActive = true;

//^ SELECTORES
/* BASIC CONTAINER */
const BODY = selector("body");
export const nav = selector("[nav-menu]");
const phoneMenu = selector("[phone-menu]");
const menuSocialContainer = selector("[contact-menu]");
const menuSocialBtnsContainer = selector("[contact-menu-container]");
const sections = selectorAll(".section");

// MODAL PORTFOLIO
const portfolioCardsContainer = selector("[portfolio-container]");
// BUBBLES //

const bubbleBio = selector("[bio]");
const bubbleInfo = selector("[info]");
const bubbleRex = selector("[rex]");
const illustrationRex = selector("[illustration-rex]");
const tooltipMargin = 12;
/* MODAL */
const acceptStorageBtn = selector("[accept-storage]");
/* BTNS */
const accesibilityBtns = selectorAll("[accesibility-btn]");
const actionBtns = selectorAll("[action-menu]");
const sectionBtns = selectorAll("[section-action]");
const socialMenuBtns = selectorAll(".social_menu_btn");
const heroBtns = selectorAll(".btn_hero");
const langBtns = selectorAll(".lang_btn");
const mainNavBtn = selector(".main_nav_btn");
const animationKeys = selectorAll(".animation_key");
const typeDisplay = selector("[display_portfolio='type']");
const skillDisplay = selector("[display_portfolio='skill']");
document.addEventListener("DOMContentLoaded", () => {
    let currentLang;
    /* AUDIO CONTENT */
    const audioEnterBtn = selector("[audio=enter]");
    const audioTeleportBtn = selector("[audio=teleport]");
    /* AUDIO CONFIGURATION */
    audioEnterBtn.volume = 0.4;
    audioTeleportBtn.volume = 0.4;
    const sanitazer = (item) => utils.sanitizeInput(item);
    const retTop = (sec) => utils.returnTop(sec);
    const scrollSection = (sec) => utils.scrollToSection(sec);
    const skillTypeAll = utils.skillTypeAll;
    /* SOUND FUNCTIONS */
    const playHover = () => audioEnterBtn.play();
    const playClick = () => audioTeleportBtn.play();
    const mutePage = (itemAudio) => (itemAudio.muted = true);
    const backSoundPage = (itemAudio) => (itemAudio.muted = false);
    const updateStorage = () => localStorage.setItem(storageName, JSON.stringify(storageContent));
    const getStorage = () => JSON.parse(localStorage.getItem(storageName));

    const skillsData = utils.skillTypes;
    const skills = utils.skills;
    const storage = utils.johnKStorage;
    const infSoftware = utils.infoSoftware;
    // FUNCTION FOR GO TO SPECIFIC PAGE
    const teleportToPage = (item) => setTimeout(() => (window.location.href = item.getAttribute("link-ref")), 1500);
    // FUNCTION FOR CHANGE LANGUAGE
    const setTextLang = (newLang) => {
        selectorAll("[change]").forEach((item) => (item.textContent = item.getAttribute(`${newLang}`)));
        selectorAll("[change-input]").forEach((item) => item.setAttribute("placeholder", item.getAttribute(`${newLang}`)));
    };
    // FUNCTION FOR CHECK LOCAL STORAGE CONFIGURATION IN START
    const oldName = "JohnK_Maker";
    const oldStorage = JSON.parse(localStorage.getItem(oldName));
    const navLang = window.navigator.language;
    const checkStorage = () => {
        if (oldStorage) localStorage.removeItem(oldName);
        storageContent = getStorage();
        if (!storageContent) {
            console.log("local storage item is created");
            storageContent = storage;
        }
        if (!storageContent["data_stamp"]) storageContent["data_stamp"] = new Date().toLocaleString();
        if (!storageContent["page_lang"]) {
            navLang === "es" || (navLang[0] === "e" && navLang[1] === "s" && navLang[2] === "-") ? (currentLang = es) : (currentLang = en);
            storageContent["page_lang"] = currentLang;
        } else {
            currentLang = storageContent["page_lang"];
        }
        if (!storageContent["page_sound"]) {
            audioItsActive = false;
            selectorAll("AUDIO").forEach((itemAudio) => {
                mutePage(itemAudio);
            });
        }
        storageContent["page_view_count"] += 1;
        currentTheme = storageContent["page_theme"];
        setTextLang(currentLang);
        selectorAll("[icon-sound='on']").forEach((soundOn) => soundOn.setAttribute("hidden", storageContent["page_sound"] === true ? false : true));
        selectorAll("[icon-sound='off']").forEach((soundOff) => soundOff.setAttribute("hidden", storageContent["page_sound"] === true ? true : false));
        selectorAll("[icon='theme']").forEach((icon) => icon.setAttribute("hidden", icon.getAttribute("icon-theme") === currentTheme ? "false" : "true"));
        selectorAll(`[bg-img]`).forEach((bg) => bg.setAttribute("hidden", bg.getAttribute("bg-img") === currentTheme ? false : true));

        updateStorage();
        BODY.setAttribute("color-scheme", currentTheme);
    };
    const changeLang = (lang) => {
        currentLang = lang === es ? en : es;
        storageContent["page_lang"] = currentLang;
        setTextLang(currentLang);
        updateStorage();
    };
    // SET HEIGHT PAGE CONFIGURATION
    const checkWindowHeight = () => {
        const navTop = nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;

        if (navTop >= windowHeight) {
            menuSocialContainer.setAttribute("position-social", "top");

            nav.setAttribute("size", "big");
            setTimeout(() => {
                phoneMenu.setAttribute("position-menu", "top");
            }, 250);
        } else if (navTop < windowHeight) {
            nav.setAttribute("size", "small");
            menuSocialContainer.setAttribute("position-social", "bottom");

            setTimeout(() => {
                phoneMenu.setAttribute("position-menu", "bottom");
            }, 250);
        }
    };

    const setTextData = (item, data) => {
        item.setAttribute(en, !data.en ? data.es : data.en);
        item.setAttribute(es, !data.es ? data.en : data.es);
        item.textContent = item.getAttribute(currentLang);
    };
    const listItemTemplate = selector("[option-btn-template]").content;
    const setOptionActions = (newBtn) => {
        newBtn.addEventListener("click", () => {
            /* console.log(newBtn); */
            const optionRef = newBtn.getAttribute("option-btn");
            const optionsDroper = selector(`[options-droper='${optionRef}']`);
            const isDroperHidding = optionsDroper.getAttribute(`hidden`);
            const isMenuActive = optionsDroper.getAttribute(`options-active`);
            if (isDroperHidding === "false") {
                optionsDroper.setAttribute("options-active", isMenuActive === "true" ? false : true);
                setTimeout(() => optionsDroper.setAttribute("hidden", isDroperHidding === "true" ? false : true), 500);
            } else {
                optionsDroper.setAttribute("hidden", isDroperHidding === "true" ? false : true);
                setTimeout(() => optionsDroper.setAttribute("options-active", isMenuActive === "true" ? false : true), 500);
            }
        });
    };
    selectorAll(`[option-btn]`).forEach((btn) => {
        setOptionActions(btn);
    });
    // FUNCTION FOR RETUN PAGE TO THE TOP
    const toTheTop = () => {
        const currentPosition = BODY.getBoundingClientRect().top;
        window.scrollTo(currentPosition, 0);
    };
    // FUNCTION FOR CREATE DINAMIC PROJECT CARDS
    const projectCardTemplate = selector("[project-card-template]").content;
    const createCard = (item, container) => {
        let iconsRow = "";
        const cloneProjectCard = projectCardTemplate.cloneNode(true);
        const projectCard = selector("[project-card]", cloneProjectCard);
        const imgCard = selector("[card-img]", cloneProjectCard);
        /* const projectCardIconsContainer = selector("[card-icons-container]", cloneProjectCard); */
        const cardTitle = selector("[card-title]", cloneProjectCard);
        const innerBtn = selector("[card-action-btn]", cloneProjectCard);
        const makeText = selector("[card-description]", cloneProjectCard);
        //* ******************************************************************************** *//

        const cardImg = item.img;
        const cardDescription = item.info;

        projectCard.setAttribute("id", `${item["db_name"]}_project_card`);
        imgCard.setAttribute("src", cardImg);
        imgCard.setAttribute("alt", cardDescription);
        /* 
        const clientTechnologiesInProjects = item.technologies;
        clientTechnologiesInProjects.forEach((tech) => {
            infSoftware.forEach((technology) => {
                if (technology.tech_name === tech) {
                    iconsRow += technology.icon;
                }
            });
        });
        projectCardIconsContainer.innerHTML = iconsRow;
 */
        setTextData(cardTitle, item.project_name);

        innerBtn.setAttribute("link-ref", `${item.project_link}`);
        innerBtn.addEventListener("click", () => teleportToPage(innerBtn));
        innerBtn.addEventListener("mouseenter", playHover);
        innerBtn.addEventListener("click", playClick);
        container.appendChild(projectCard);
        return projectCard;
    };
    // FUNCTION FOR CHANGE PAGE COLOR SCHEMA THEME
    const changeTheme = (tm) => {
        currentTheme = tm === lightT ? darkT : lightT;
        storageContent["page_theme"] = currentTheme;
        selectorAll("[bg-img]").forEach((bg) => bg.setAttribute("hidden", bg.getAttribute("bg-img") === currentTheme ? false : true));
        updateStorage();
        BODY.setAttribute("color-scheme", currentTheme);
    };
    // FUNCTION FOR PHONE MENU ACTIONS
    const menuActions = (status) => {
        const delay = 250;
        if (status === false) {
            phoneMenu.setAttribute("hidden", false);
            setTimeout(() => {
                /* phoneMenu.setAttribute("show", true); */
                setTimeout(() => phoneMenu.setAttribute("show-transform", true), delay);
                mainNavBtn.focus();
            }, 200);
        } else if (status === true) {
            /* phoneMenu.classList.remove("show_menu"); */
            phoneMenu.setAttribute("show-transform", false);
            setTimeout(() => {
                phoneMenu.setAttribute("hidden", true);
            }, 1000);
        }
        menuActive = !status;
    };
    // FUNCTION FOR SOCIAL MENU ACTIONS
    const menuSocialActions = (status) => {
        if (status === true) {
            menuSocialBtnsContainer.setAttribute("show", false);
            setTimeout(() => {
                menuSocialBtnsContainer.setAttribute("hidden", true);
            }, 1000);
        } else if (status === false) {
            menuSocialBtnsContainer.setAttribute("hidden", false);
            setTimeout(() => {
                menuSocialBtnsContainer.setAttribute("show", true);
            }, 200);
        }
        menuSocialActive = !status;
    };
    const setObservers = () => {
        const setAttributeObserver = (item, intersecting) => {
            if (intersecting) {
                item.setAttribute(`show-transform`, true);
            } else {
                item.setAttribute(`show-transform`, false);
            }
        };

        selectorAll("[animation-text]").forEach((observedItem) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                setAttributeObserver(observedItem, entry.isIntersecting);
            };
            const optionsIO_up = {
                threshold: ".8",
            };
            const skillsContainersObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_up);
            skillsContainersObserver.observe(observedItem);
        });

        selectorAll("[animation-card]").forEach((observedItem) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                setAttributeObserver(observedItem, entry.isIntersecting);
            };
            const optionsIO_skills = {
                threshold: ".4",
            };

            const skillsContainersObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_skills);
            skillsContainersObserver.observe(observedItem);
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
        selectorAll("[divider]").forEach((observerdItem) => {
            const watchAnimationContainer = ([entry]) => {
                if (entry.isIntersecting) {
                    selector("[quote]", observerdItem).setAttribute(`show-quote`, true);
                } else {
                    selector("[quote]", observerdItem).setAttribute(`show-quote`, false);
                }
            };
            const optionsIO = {
                threshold: ".4",
            };

            const containersObserver = new IntersectionObserver(watchAnimationContainer, optionsIO);
            containersObserver.observe(observerdItem);
        });
    };
    const setModalActions = () => {
        const closeModalBtn = selector("[close-btn]");
        const modal = selector(`[modal]`);
        const modalWindows = selectorAll(`[modal-window]`);
        const modalBtns = selectorAll(`[modal-btn]`);
        modalBtns.forEach((btn) =>
            btn.addEventListener("click", () => {
                const modalStatus = modal.getAttribute("modal-active");
                const currentBtn = btn.getAttribute(`modal-btn`);
                const menuWindow = selector(`[modal-window='${currentBtn}']`);
                closeModalBtn.setAttribute(`modal-btn`, currentBtn);
                if (modalStatus === "false") {
                    modal.showModal();
                    modal.setAttribute("modal-active", true);
                    menuWindow.setAttribute("hidden", false);
                    setTimeout(() => menuWindow.setAttribute("modal-active", true), 100);
                } else {
                    modal.setAttribute("modal-active", false);
                    setTimeout(() => {
                        modal.close();
                        modalWindows.forEach((window) => window.setAttribute("hidden", true));
                    }, 500);
                }
            })
        );
        selectorAll(`[window-btn]`).forEach((btn) =>
            btn.addEventListener("click", () => {
                let nextWindowRef = btn.getAttribute(`window-btn`);
                let nextWindow = selector(`[modal-window='${nextWindowRef}']`);
                let currentWindow = selector(`[modal-window][modal-active='true']`);
                let currentWindowRef = currentWindow.getAttribute(`window`);
                if (currentWindowRef !== nextWindowRef) {
                    modalWindows.forEach((window) => window.setAttribute("modal-active", false));
                    closeModalBtn.setAttribute(`btn`, nextWindowRef);

                    setTimeout(() => {
                        currentWindow.setAttribute("hidden", true);
                        nextWindow.setAttribute("hidden", false);
                        setTimeout(() => nextWindow.setAttribute("modal-active", true), 500);
                    }, 500);
                }
            })
        );
    };
    const iconsAnimation = () => {
        let count = 1;
        const animationIconsList = ["illustration-icon", "dev-icon", "design-icon"];
        const animationScreensList = ["illustration-screen", ["dev-screen", "shield-screen"], "design-screen"];
        const animationTabletScreensList = ["illustration-tablet-screen", "dev-tablet-screen", "design-tablet-screen"];
        selectorAll(`[${animationIconsList[0]}]`).forEach((iconToShow) => iconToShow.classList.add("icon_show"));
        selectorAll(`[${animationScreensList[0]}]`).forEach((screenToShow) => screenToShow.classList.add("screen_show"));
        selectorAll(`[${animationTabletScreensList[0]}]`).forEach((screenTabletToShow) => screenTabletToShow.classList.add("screen_show"));
        setInterval(() => {
            selectorAll("[icon-animation]").forEach((item) => item.classList.remove("icon_show"));
            selectorAll("[screen-animation]").forEach((item) => item.classList.remove("screen_show"));
            selectorAll("[screen-tablet-animation]").forEach((item) => item.classList.remove("screen_show"));

            setTimeout(() => {
                selectorAll(`[${animationIconsList[count]}]`).forEach((iconToShow) => iconToShow.classList.add("icon_show"));
                selectorAll(`[${animationTabletScreensList[count]}]`).forEach((screenTabletToShow) => screenTabletToShow.classList.add("screen_show"));
                switch (typeof animationScreensList[count]) {
                    case "object":
                        animationScreensList[count].forEach((screenToShow) => {
                            selector(`[${screenToShow}]`).classList.add("screen_show");
                        });
                        break;
                    case "string":
                        selector(`[${animationScreensList[count]}]`).classList.add("screen_show");
                        break;
                }
                count < 2 ? count++ : (count = 0);
            }, 1000);
        }, 5000);
    };
    const logoAnimation = () => {
        const johnIconFull = selector(".johnK_full");
        const johnIconSmall = selector(".johnK_icon");
        setTimeout(() => {
            johnIconFull.classList.add("show_logo");
            setTimeout(() => {
                johnIconFull.classList.remove("show_logo");
                setTimeout(() => {
                    johnIconFull.classList.add("remove");
                    setTimeout(() => {
                        johnIconSmall.classList.add("add");
                        setTimeout(() => {
                            johnIconSmall.classList.add("show_logo");
                        }, 100);
                    }, 250);
                }, 500);
            }, 4000);
        }, 500);
    };
    const oneSectionStep = () => {
        const windowHeight = window.innerHeight;
        const navHeight = nav.getBoundingClientRect().height;
        const fixHeight = windowHeight - navHeight;
        window.scrollTo(0, fixHeight);
    };
    const acceptStorage = () => {
        storageContent["page_alert_status"] = close;
        updateStorage();
    };
    acceptStorageBtn.addEventListener("click", acceptStorage);

    selector("[btn-down]").addEventListener("click", oneSectionStep);

    accesibilityBtns.forEach((btn) => {
        btn.addEventListener("click", () => scrollSection(btn));
    });
    actionBtns.forEach((btn) => {
        btn.addEventListener("click", () => menuActions(menuActive));
    });
    sectionBtns.forEach((btn) => {
        btn.addEventListener("click", () => scrollSection(btn));
    });
    socialMenuBtns.forEach((btn) => {
        btn.addEventListener("click", () => menuSocialActions(menuSocialActive));
    });
    heroBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollSection(btn);
        });
    });
    // SET DINAMIC CONTENT FOR PAGE
    const setBubbles = () => {
        selector("[illustration-me]").addEventListener("mouseover", (e) => {
            bubbleBio.setAttribute("hidden", false);
            const containerWidth = bubbleBio.getClientRects()[0].width;
            const containerHeight = bubbleBio.getClientRects()[0].height;
            bubbleBio.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - containerHeight / 2}px)`;
        });

        bubbleBio.addEventListener("mouseleave", () => {
            bubbleBio.setAttribute("hidden", true);
        });

        illustrationRex.addEventListener("mouseover", (e) => {
            bubbleRex.setAttribute("hidden", false);
            const containerWidth = bubbleRex.getClientRects()[0].width;
            const containerHeight = bubbleRex.getClientRects()[0].height;
            bubbleRex.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - parseInt(containerHeight) - tooltipMargin}px)`;
        });

        illustrationRex.addEventListener("mouseleave", () => {
            bubbleRex.setAttribute("hidden", true);
        });
    };
    const setBtnActions = () => {
        selectorAll("[sound-btn]").forEach((btn) => {
            btn.addEventListener("click", () => {
                audioItsActive = !audioItsActive;
                selectorAll("[icon='sound']").forEach((icon) => icon.setAttribute("hidden", icon.getAttribute("hidden") === "false" ? "true" : "false"));
                storageContent["page_sound"] = !storageContent["page_sound"];
                updateStorage();
                if (!audioItsActive) {
                    selectorAll("AUDIO").forEach((audioElem) => mutePage(audioElem));
                } else {
                    selectorAll("AUDIO").forEach((audioElem) => backSoundPage(audioElem));
                }
            });
        });
        selectorAll("BUTTON").forEach((btn) => {
            btn.addEventListener("mouseenter", playHover);
            btn.addEventListener("click", playClick);
        });
        selectorAll("[theme-btn]").forEach((btn) => {
            btn.addEventListener("click", () => {
                selectorAll("[icon='theme']").forEach((icon) => icon.setAttribute("hidden", icon.getAttribute("hidden") === "false" ? "true" : "false"));
                changeTheme(currentTheme);
            });
        });

        selector("[logo-btn]").addEventListener("click", toTheTop);
        langBtns.forEach((btn) => btn.addEventListener("click", () => changeLang(currentLang)));
        selectorAll(".href_btn").forEach((btn) => btn.addEventListener("click", () => teleportToPage(btn)));
    };
    const setScrollActions = () => {
        window.addEventListener("scroll", () => {
            checkWindowHeight();
            if (menuActive === true) menuActions(menuActive);
            if (menuSocialActive === true) menuSocialActions(menuSocialActive);
        });
    };
    const setDisplay = (display, data) => {
        /* console.log(display, data); */
        display.setAttribute(es, data.es);
        display.setAttribute(en, data.en);
        display.textContent = data[currentLang];
    };
    const setAssets = () => {
        // SET ALL START CONFIGURATIONS

        infSoftware.forEach((software) => {
            const clone = selector("[skill-badge-template]").content.cloneNode(true);
            const badge = selector("[skill-badge]", clone);
            const icon = selector("[badge-icon]", clone);
            const label = selector("[badge-label]", clone);
            badge.setAttribute("tech-ref", software.db_name);
            icon.innerHTML = software.icon;
            label.textContent = software.tech_name;
            if (software.type) {
                selector(`[skills-container="${software.type}"]`).appendChild(badge);
            }
            badge.addEventListener("mouseover", (e) => {
                const newData = infSoftware.find((item) => item.db_name === badge.getAttribute("tech-ref"));
                selector(".title", bubbleInfo).textContent = newData.tech_complete_name;
                selector(".description", bubbleInfo).textContent = newData[`tech_info_${currentLang}`];
                bubbleInfo.setAttribute("hidden", false);
                const containerWidth = bubbleInfo.getClientRects()[0].width;
                bubbleInfo.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
            });
            badge.addEventListener(
                "mouseleave",
                () => {
                    bubbleInfo.setAttribute("hidden", true);
                },
                250
            );
        });
        utils.certificationsData.forEach((certification) => {
            const certificationClone = selector("[certification-template]").content.cloneNode(true);
            const certificationBadge = selector("[certification]", certificationClone);
            const certificationImg = selector("[certification-img]", certificationClone);
            const certificationBtn = selector("[certification-btn]", certificationClone);
            const certificationName = selector("[certification-name]", certificationClone);
            certificationImg.setAttribute("src", certification.image);
            certificationImg.setAttribute("alt", `Imagen de Certificado en '${certification[currentLang]}' emitido por FreeCodeCamp`);
            certificationBtn.setAttribute("link-ref", certification.link);
            setTextData(certificationName, certification);

            selector("[certification-container]").appendChild(certificationBadge);
            certificationBtn.addEventListener("mouseenter", playHover);
            certificationBtn.addEventListener("click", playClick);
        });

        let filterHotData = utils.hotCardsSelection.map((itemHotCard) => DB.find((itemDB) => itemDB.db_name === itemHotCard));
        filterHotData.forEach((item) => {
            const currentCard = createCard(item, selector("[hot-container]"));
            currentCard.setAttribute("animation-card", "");
            currentCard.setAttribute("show-transform", false);
        });

        DB.forEach((item) => {
            const currentCard = createCard(item, portfolioCardsContainer);
            currentCard.setAttribute("portfolio-project", "");
        });
        setDisplay(typeDisplay, skillTypeAll.lang);
        setDisplay(skillDisplay, skillTypeAll.lang);

        const skillSelectiionBtnsContainer = selector(`[options-droper="skills"]`);

        const createSkillSelectionBtn = (skillName, skillLang, subskillName) => {
            const newTemplate = listItemTemplate.cloneNode(true);
            const optionItem = selector("[option-item]", newTemplate);
            const newBtn = selector("[option-btn]", newTemplate);
            const btnLabel = selector("[label]", newBtn);
            /*   console.log(skillLang); */
            setTextData(btnLabel, skillLang);
            btnLabel.setAttribute("skill", skillName);
            newBtn.setAttribute("option-btn", "skills");
            newBtn.setAttribute("option-skill", skillName);
            newBtn.setAttribute("option-subskill", subskillName);
            skillSelectiionBtnsContainer.appendChild(optionItem);

            /* CREANDO ACCION PARA BOTONES DE SELECCION DE HABILIDAD */
            setTimeout(() => {
                selectorAll(`[option-subskill="${subskillName}"]`).forEach((subskillBtn) => {
                    subskillBtn.addEventListener("click", () => {
                        /* console.log("activando habilidad " + skillName); */
                        /* console.log("btn de subskill clicked " + subskillName); */

                        utils.deleteChildElements(portfolioCardsContainer);
                        let currentData;
                        /* console.log(DB); */
                        switch (skillName) {
                            case "all":
                                /* console.log("crear todo de " + skillName); */
                                if (skillName === "all") {
                                    currentData = DB;
                                    if (subskillName === "all") {
                                        setDisplay(skillDisplay, skillTypeAll.lang);
                                    }
                                } else {
                                    currentData = DB.filter((dbItem) => dbItem.type.includes(subskillName));
                                    setDisplay(skillDisplay, skillTypeAll.lang);
                                }
                                break;
                            default:
                                /* console.log("crear solo de " + subskillName); */
                                if (subskillName === "all") {
                                    currentData = DB;
                                    setDisplay(skillDisplay, skillTypeAll.lang);
                                } else {
                                    currentData = DB.filter((dbItem) => dbItem.skills.includes(subskillName));
                                    /* console.log(skills.filter((item) => item.skill === skillName)); */
                                    /* console.log(skills.find((item) => item.skill === skillName)); */
                                    const currentSkill = skills.find((item) => item.skill === skillName);
                                    const currentSubskill = currentSkill.subskills.find((subskill) => subskill.subskill === subskillName);
                                    /* console.log(currentSubskill); */
                                    setDisplay(skillDisplay, currentSubskill.lang);
                                }

                                break;
                        }

                        /* console.log(currentData); */
                        currentData.forEach((item) => {
                            const currentCard = createCard(item, portfolioCardsContainer);
                            currentCard.setAttribute("portfolio-project", "");
                        });
                        const optionRef = subskillBtn.getAttribute("option-btn");
                        const optionsDroper = selector(`[options-droper='${optionRef}']`);
                        const isDroperHidding = optionsDroper.getAttribute(`hidden`);
                        const isMenuActive = optionsDroper.getAttribute(`options-active`);
                        if (isDroperHidding === "false") {
                            optionsDroper.setAttribute("options-active", isMenuActive === "true" ? false : true);
                            setTimeout(() => optionsDroper.setAttribute("hidden", isDroperHidding === "true" ? false : true), 500);
                        } else {
                            optionsDroper.setAttribute("hidden", isDroperHidding === "true" ? false : true);
                            setTimeout(() => optionsDroper.setAttribute("options-active", isMenuActive === "true" ? false : true), 500);
                        }
                    });
                });
            }, 250);
        };
        createSkillSelectionBtn(skillTypeAll.name, skillTypeAll.lang, "all");
        skills.forEach((skill) => {
            /* console.log(skill); */
            skill.subskills.forEach((subskill) => {
                createSkillSelectionBtn(skill.skill, subskill.lang, subskill.subskill);
            });
        });

        setObservers();
        setModalActions();
        setTextLang(currentLang);

        const options = ["type", "skill"];
        options.forEach((option) => {
            selectorAll(`[option-${option}]`).forEach((optionBtn) => {
                optionBtn.addEventListener("click", () => {
                    /* console.log(optionBtn); */
                    const btnSelection = optionBtn.getAttribute(`option-${option}`);
                    /* console.log(btnSelection); */

                    utils.deleteChildElements(skillSelectiionBtnsContainer);
                    utils.deleteChildElements(portfolioCardsContainer);
                    createSkillSelectionBtn(skillTypeAll.name, { es: "todo", en: "all" }, btnSelection);
                    if (btnSelection === "all") {
                        skills.forEach((skill) => {
                            /* console.log(skill); */
                            skill.subskills.forEach((subskill) => {
                                createSkillSelectionBtn(skill.skill, subskill.lang, subskill.subskill);
                            });
                        });
                        setDisplay(typeDisplay, skillTypeAll.lang);
                        DB.forEach((item) => {
                            const currentCard = createCard(item, portfolioCardsContainer);
                            currentCard.setAttribute("portfolio-project", "");
                        });
                    } else {
                        const currentSkills = skills.find((itemSkill) => itemSkill.skill === btnSelection);
                        setDisplay(typeDisplay, currentSkills.lang);

                        currentSkills.subskills.forEach((subskill) => {
                            createSkillSelectionBtn(currentSkills.skill, subskill.lang, subskill.subskill);
                        });
                        const currentDB = DB.filter((dbItem) => dbItem.type.includes(btnSelection));

                        /* console.log(currentDB); */
                        currentDB.forEach((item) => {
                            const currentCard = createCard(item, portfolioCardsContainer);
                            currentCard.setAttribute("portfolio-project", "");
                        });
                    }

                    setDisplay(skillDisplay, skillTypeAll.lang);
                });
            });
        });

        selectorAll(".form").forEach((thisForm) => {
            /* 
            console.log(thisForm); 
            console.log(selector(".send_btn", thisForm));
            */

            selector(".send_btn", thisForm).addEventListener("click", (e) => {
                console.log(e);
                e.preventDefault();
                const newName = sanitazer(selector("[input-name]", thisForm));
                const newLastname = sanitazer(selector("[input-last-name]", thisForm));
                const newEmail = sanitazer(selector("[input-email]", thisForm));
                const newDescription = sanitazer(selector("[input-description]", thisForm));
                let formResponse = selector("[form-response]", thisForm);
                let formResponseContainer = selector("[form-response-container]", thisForm);

                const formResponseActions = (status) => {
                    if (status === "good") {
                        formResponseContainer.setAttribute(status, "");
                        formResponse.textContent = currentLang === es ? "!Enviado satisfactoriamente, gracias por contactarme¡" : "Succes, thanks for contact me¡";
                    } else if (status === "danger") {
                        formResponseContainer.setAttribute(status, "");
                        formResponse.textContent = currentLang === es ? "Algo ah salido mal, por favor intentalo de nuevo" : "Something go wrong, please try again";
                    }
                    formResponseContainer.setAttribute("hidden", false);
                    setTimeout(() => {
                        formResponseContainer.setAttribute("show", true);
                    }, 500);
                    setTimeout(() => {
                        formResponseContainer.setAttribute("hidden", false);
                        setTimeout(() => {
                            formResponseContainer.setAttribute("show", true);
                        }, 500);
                    }, 5000);
                };
                const formData = new FormData(thisForm);
                let newData = {};

                formData.forEach((value, key) => {
                    newData[key] = value;
                });
                const jsonData = JSON.stringify(newData);

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
                            formResponseActions("good");
                        } else {
                            throw error;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        formResponseActions("danger");
                    });
            });
        });
    };
    const setStart = () => {
        checkStorage();
        checkWindowHeight();
        logoAnimation();
        iconsAnimation();
        setBubbles();
        setAssets();
        setBtnActions();
        setScrollActions();
    };
    setStart();
});
