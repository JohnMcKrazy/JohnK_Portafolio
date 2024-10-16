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
const forms = selectorAll("FORM");
const certificationsContainer = selector("[certification-container]");
const sectionDividers = selectorAll("[divider]");

// MODAL PORTFOLIO
const cardsHotContainer = selector("[hot-container]");
const portfolioCardsContainer = selector("[portfolio-container]");

/* MODAL */
const acceptStorageBtn = selector("[accept-storage]");
/* BTNS */
const btnLogo = selector("[logo-btn]");
const accesibilityBtns = selectorAll("[accesibility-btn]");
const actionBtns = selectorAll("[action-menu]");
const sectionBtns = selectorAll("[section-action]");
const socialMenuBtns = selectorAll(".social_menu_btn");
const heroBtns = selectorAll(".btn_hero");
const langBtns = selectorAll(".lang_btn");
const mainNavBtn = selector(".main_nav_btn");
const animationKeys = selectorAll(".animation_key");

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
    /* SOUND FUNCTIONS */
    const playHover = () => audioEnterBtn.play();
    const playClick = () => audioTeleportBtn.play();
    const mutePage = (itemAudio) => (itemAudio.muted = true);
    const backSoundPage = (itemAudio) => (itemAudio.muted = false);

    const updateStorage = () => localStorage.setItem(storageName, JSON.stringify(storageContent));
    const getStorage = () => JSON.parse(localStorage.getItem(storageName));

    const skillsData = utils.skillTypes;
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
    const setOptionActions = () => {
        selectorAll(`[option-btn]`).forEach((btn) => {
            btn.addEventListener("click", () => {
                const optionRef = btn.getAttribute("option-btn");
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
    };
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
        const projectCardIconsContainer = selector("[card-icons-container]", cloneProjectCard);
        const cardTitle = selector("[card-title]", cloneProjectCard);
        const innerBtn = selector("[card-action-btn]", cloneProjectCard);
        const makeText = selector("[card-description]", cloneProjectCard);
        //* ******************************************************************************** *//

        const cardImg = item.img;
        const cardDescription = item.info;

        /* projectCard.setAttribute("id", `${item["db_name"]}_project_card`); */
        imgCard.setAttribute("src", cardImg);
        imgCard.setAttribute("alt", cardDescription);

        const clientTechnologiesInProjects = item.technologies;
        clientTechnologiesInProjects.forEach((tech) => {
            /* console.log(tech); */
            infSoftware.forEach((technology) => {
                if (technology.tech_name === tech) {
                    iconsRow += technology.icon;
                }
            });
        });
        projectCardIconsContainer.innerHTML = iconsRow;

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
        console.log(status);
        const delay = 250;
        if (status === false) {
            phoneMenu.classList.add("show_flex");
            setTimeout(() => {
                phoneMenu.classList.add("show_opacity");
                setTimeout(() => phoneMenu.classList.add("show_menu"), delay);
                mainNavBtn.focus();
            }, 200);
        } else if (status === true) {
            phoneMenu.classList.remove("show_menu");
            setTimeout(() => phoneMenu.classList.remove("show_opacity"), delay);
            setTimeout(() => {
                phoneMenu.classList.remove("show_flex");
            }, 1200);
        }
        menuActive = !status;
    };
    // FUNCTION FOR SOCIAL MENU ACTIONS
    const menuSocialActions = (status) => {
        console.log(status);
        if (status === true) {
            menuSocialBtnsContainer.classList.remove("show_opacity");
            setTimeout(() => {
                menuSocialBtnsContainer.classList.remove("show_flex");
            }, 1000);
        } else if (status === false) {
            menuSocialBtnsContainer.classList.add("show_flex");
            setTimeout(() => {
                menuSocialBtnsContainer.classList.add("show_opacity");
            }, 200);
        }
        menuSocialActive = !status;
    };

    const setObservers = () => {
        const show = (currentEntry) => currentEntry.classList.add(`show_card`);
        const hide = (currentEntry) => currentEntry.classList.remove(`show_card`);

        selectorAll("[observer-full]").forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = selectorAll("[animation-text]", entry.target);
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

        selectorAll("[observer-half]").forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = selectorAll("[animation-text]", entry.target);

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
        selectorAll("[animation-card]").forEach((card) => {
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
                const contentContainer = selectorAll(".divider_content", entry.target);

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
        console.table(getStorage());
    };

    acceptStorageBtn.addEventListener("click", acceptStorage);

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

    selector("[btn-down]").addEventListener("click", oneSectionStep);

    accesibilityBtns.forEach((btn) => {
        btn.addEventListener("click", () => scrollSection(btn));
    });

    actionBtns.forEach((btn) => {
        btn.addEventListener("click", () => menuActions(menuActive));
    });

    sectionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollSection(btn);
        });
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

    const setAssets = () => {
        const bubbleBio = selector("[bio]");
        const bubbleInfo = selector("[info]");
        const bubbleRex = selector("[rex]");
        const illustrationRex = selector("[illustration-rex]");
        selector("[illustration-me]").addEventListener("mouseover", (e) => {
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
            const containerHeight = bubbleRex.getClientRects()[0].height;
            bubbleRex.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - parseInt(containerHeight) - tooltipMargin}px)`;
        });

        illustrationRex.addEventListener("mouseleave", () => {
            bubbleRex.classList.remove("show_flex");
        });

        forms.forEach((thisForm) => {
            thisForm.addEventListener("submit", (e) => {
                e.preventDefault();
                sanitazer(selector("[input-name]", thisForm));
                sanitazer(selector("[input-last-name]", thisForm));
                sanitazer(selector("[input-email]", thisForm));
                sanitazer(selector("[input-description]", thisForm));
                let formName = selector("[send-form]", thisForm).getAttribute("form");
                let formResponse = selector("[form-response]", thisForm);
                let formResponseContainer = selector("[form-response-container]", thisForm);

                const formResponseActions = (action, status = "") => {
                    if (action === open) {
                        if (status === "good") {
                            formResponseContainer.setAttribute(status, "");
                            formResponse.textContent = currentLang === es ? "!Enviado satisfactoriamente, gracias por contactarme¡" : "Succes, thanks for contact me¡";
                        } else if (status === "danger") {
                            formResponseContainer.setAttribute(status, "");
                            formResponse.textContent = currentLang === es ? "Algo ah salido mal, por favor intentalo de nuevo" : "Something go wrong, please try again";
                        }
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
                            formResponseActions(open, "good");
                        } else {
                            throw error;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        formResponseActions(open, "danger");
                    })
                    .then(function () {
                        setTimeout(() => {
                            formResponseActions(close);
                        }, 5000);
                    });
            });
        });

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

        btnLogo.addEventListener("click", toTheTop);

        window.addEventListener("scroll", () => {
            checkWindowHeight();
            if (menuActive === true) menuActions(menuActive);
            if (menuSocialActive === true) menuSocialActions(menuSocialActive);
        });
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
            setTimeout(() => {
                badge.addEventListener("mouseover", (e) => {
                    const newData = infSoftware.find((item) => item.db_name === badge.getAttribute("tech-ref"));
                    selector(".title", bubbleInfo).textContent = newData.tech_complete_name;
                    selector(".description", bubbleInfo).textContent = newData[`tech_info_${currentLang}`];
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
            const certificationClone = selector("[certification-template]").content.cloneNode(true);
            const certificationBadge = selector("[certification]", certificationClone);
            const certificationImg = selector("[certification-img]", certificationClone);
            const certificationBtn = selector("[certification-btn]", certificationClone);
            const certificationName = selector("[certification-name]", certificationClone);
            certificationImg.setAttribute("src", certification.image);
            certificationImg.setAttribute("alt", `Imagen de Certificado en '${certification[currentLang]}' emitido por FreeCodeCamp`);
            certificationBtn.setAttribute("link-ref", certification.link);
            setTextData(certificationName, certification);

            certificationsContainer.appendChild(certificationBadge);
            certificationBtn.addEventListener("mouseenter", playHover);
            certificationBtn.addEventListener("click", playClick);
        });

        let filterHotData = utils.hotCardsSelection.map((itemHotCard) => DB.find((itemDB) => itemDB.db_name === itemHotCard));
        filterHotData.forEach((item) => {
            const currentCard = createCard(item, cardsHotContainer);
            currentCard.setAttribute("card-up", "");
        });

        DB.forEach((item) => {
            const currentCard = createCard(item, portfolioCardsContainer);
            currentCard.setAttribute("portfolio-project", "");
            item.skills.forEach((skill) => currentCard.setAttribute(`skill-${skill}`, ""));
            item.type.forEach((type) => currentCard.setAttribute(`type-${type}`, ""));
        });

        Object.keys(skillsData).forEach((skill) => {
            Object.keys(skillsData[skill].types).forEach((key) => {
                const data = skillsData[skill].types[key];
                const newTemplate = listItemTemplate.cloneNode(true);
                const optionItem = selector("[option-item]", newTemplate);
                const newBtn = selector("[option-btn]", newTemplate);
                const btnLabel = selector("[label]", newBtn);
                setTextData(btnLabel, data);
                btnLabel.setAttribute("skill", data.ref);
                newBtn.setAttribute("option-btn", "skills");
                newBtn.setAttribute("option-skill", key);
                selector(`[options-droper="skills"]`).appendChild(optionItem);
            });
        });

        setOptionActions();
        setObservers();
        setModalActions();
        setTextLang(currentLang);
        langBtns.forEach((btn) => btn.addEventListener("click", () => changeLang(currentLang)));
        selectorAll(".href_btn").forEach((btn) => btn.addEventListener("click", () => teleportToPage(btn)));
        const options = ["type", "skill"];
        options.forEach((option) => {
            selectorAll(`[option-${option}]`).forEach((optionBtn) => {
                optionBtn.addEventListener("click", () => {
                    console.log(optionBtn);
                });
            });
        });
    };

    const setStart = () => {
        checkStorage();
        checkWindowHeight();
        logoAnimation();
        iconsAnimation();
        setAssets();
    };
    setStart();
});
