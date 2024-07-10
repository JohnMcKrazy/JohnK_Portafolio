import { DB } from "./DB.js";
import * as selectors from "./selectors.js";
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
document.addEventListener("DOMContentLoaded", () => {
    const checkAlertStorageAnswer = () => {
        storageContent = JSON.parse(localStorage.getItem(storageName));
        console.log(storageContent);
        if (!storageContent) {
            localStorage.setItem(storageName, JSON.stringify(utils.johnKStorage));
            console.log("local storage item is created");
            storageContent = utils.johnKStorage;
        } else {
            if (storageContent["page_theme"] !== "dark_theme") {
                currentTheme = storageContent["page_theme"];
            }
            storageContent["page_view_count"] += 1;
            localStorage.setItem(storageName, JSON.stringify(storageContent));
            /* console.log(`local storage item answer= ${storageContent["page_alert_status"]}, page views= ${storageContent["page_view_count"]}`); */
        }

        selectors.BODY.className = currentTheme;
        /* console.log(storageContent); */
    };
    const changeLang = (lang) => {
        if (lang === es) {
            currentLang = en;
        } else {
            currentLang = es;
        }
        selectorAll("[data-change]").forEach((item) => (item.textContent = item.getAttribute(`data-${currentLang}`)));
        selectorAll("[data-change-input]").forEach((item) => item.setAttribute("placeholder", item.getAttribute(`data-${currentLang}`)));
    };

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
    const bubbleInfo = selector(".info_bubble");
    const setAssets = () => {
        utils.infoSoftware.forEach((software) => {
            const clone = skillTemplate.cloneNode(true);
            const badge = clone.querySelector(".skill_badge");
            badge.id = `skill_badge_${software.db_name}`;
            badge.setAttribute("data-name", software.db_name);
            badge.innerHTML = `${software.icon}<h3 class="badge_name">${software.tech_name}</h3>`;
            if (software.type === "design") {
                selectors.designSkillsContainer.querySelector(".icons_container").appendChild(badge);
            } else if (software.type === "dev") {
                selectors.devSkillsContainer.querySelector(".icons_container").appendChild(badge);
            }
            setTimeout(() => {
                badge.addEventListener("mouseover", (e) => {
                    const newData = utils.infoSoftware.find((item) => item.db_name === badge.getAttribute("data-name"));
                    bubbleInfo.querySelector(".title").textContent = newData.tech_complete_name;
                    bubbleInfo.querySelector(".description").textContent = newData[`tech_info_${currentLang}`];
                    bubbleInfo.classList.add("show_flex");
                    const containerWidth = selectors.bubbleInfo.getClientRects()[0].width;
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
            certificationImg.setAttribute("alt", `Imagen de Certificado en '${certification[`name_${currentLang}`]}' emitido por FreeCodeCamp`);
            certificationName.textContent = certification[`name_${currentLang}`];
            certificationBtn.setAttribute("href", certification.link);

            certificationName.setAttribute("data-es", certification[`name_${es}`]);
            certificationName.setAttribute("data-en", certification[`name_${en}`]);
            selectors.certificationsContainer.appendChild(certificationBadge);
        });

        let filterHotData = utils.hotCardsSelection.map((itemHotCard) => DB.find((itemDB) => itemDB.db_name === itemHotCard));
        filterHotData.forEach((item) => createCard(item, fragmentHotProjects, "card_up"));
        selectors.cardsHotContainer.appendChild(fragmentHotProjects);

        setTimeout(() => {
            setLang();

            selectors.cardsHotContainer.querySelectorAll(".project_card").forEach((card) => {
                card.classList.add("card_up");
            });
            setTimeout(() => {
                swipingAnimation();
                selectorAll("[data-change]").forEach((item) => (item.textContent = item.getAttribute(`data-${currentLang}`)));
                selectorAll("[data-change-input]").forEach((item) => item.setAttribute("placeholder", item.getAttribute(`data-${currentLang}`)));

                selectors.langBtns.forEach((btn) => btn.addEventListener("click", () => changeLang(currentLang)));
            }, 250);
        }, 250);
    };
    const setStart = () => {
        checkAlertStorageAnswer();

        setAssets();
    };
    const toTheTop = () => {
        const currentPosition = selectors.BODY.getBoundingClientRect().top;
        window.scrollTo(currentPosition, 0);
    };
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

        const clientName = item["project_name"];
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
            utils.infoSoftware.forEach((technology) => {
                if (technology.tech_name === tech) {
                    iconsRow += technology.icon;
                }
            });
        });
        projectCardIconsContainer.innerHTML = iconsRow;
        cardTitle.textContent = clientName;
        innerBtn.setAttribute("href", `${item["projects"]["project_link"]}`);
        innerBtn.textContent = innerBtn.getAttribute(`data-${currentLang}`);
        makeText.textContent = makeText.getAttribute(`data-${currentLang}`);
        frac.appendChild(projectCard);
    };
    const createExtraListbtn = (type) => {
        const newTemplate = extraListBtnTemplate.cloneNode(true);
        const newBtn = newTemplate.querySelector(".extra_list_btn");
        const btnLabel = newTemplate.querySelector(".label_btn");
        btnLabel.textContent = type;
        newBtn.setAttribute("data-name", type);
        fragmentBtns.appendChild(newBtn);
    };
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
        selectors.BODY.className = currentTheme;
    };
    const menuActions = (status) => {
        const navTop = selectors.nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        if (status === close) {
            menuStatus = open;
            selectors.phoneMenu.classList.add("show_flex");
            setTimeout(() => {
                selectors.phoneMenu.classList.add("show_opacity");
                setTimeout(() => selectors.phoneMenu.classList.add("show_menu"), 500);
                selectors.mainNavBtn.focus();
            }, 200);
        } else if (status === open) {
            /* console.log("cerrando menu"); */
            menuStatus = close;
            selectors.phoneMenu.classList.remove("show_menu");
            setTimeout(() => selectors.phoneMenu.classList.remove("show_opacity"), 500);
            setTimeout(() => {
                selectors.phoneMenu.classList.remove("show_flex");
            }, 1200);
        }
    };

    // ACTIONS FUNCTION FOR SOCIAL MENU
    const menuSocialActions = (action) => {
        if (action === open) {
            /* console.log("cerrando menu social"); */
            menuSocialStatus = close;
            selectors.menuSocialBtnsContainer.classList.remove("show_opacity");
            setTimeout(() => {
                selectors.menuSocialBtnsContainer.classList.remove("show_flex");
            }, 1000);
        } else if (action === close) {
            /* console.log("abriendo menu social"); */

            menuSocialStatus = open;
            selectors.menuSocialBtnsContainer.classList.add("show_flex");
            setTimeout(() => {
                selectors.menuSocialBtnsContainer.classList.add("show_opacity");
            }, 200);
        }
    };
    // ACTIONS FUNCTION FOR MODAL BACKDROP
    const modalActions = (action) => {
        if (action === close) {
            selectors.modal.classList.remove("show_opacity");
            setTimeout(() => selectors.modal.classList.remove("show_flex"), 500);
        } else if (action === open) {
            selectors.modal.classList.add("show_flex");
            setTimeout(() => selectors.modal.classList.add("show_opacity"), 500);
        }
    };
    // ACTION FUNCTION FOR MODAL WINDOWS
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
    // FUNCTION FOR CHECK LOCAL STORAGE CONFIGURATION IN START

    //^ANIMATION ITEM SWIPE

    const swipingAnimation = () => {
        const show = (currentEntry) => currentEntry.classList.add(`show_card`);
        const hide = (currentEntry) => currentEntry.classList.remove(`show_card`);

        selectors.swipeAnimationContainerFull.forEach((container) => {
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

        selectors.swipeAnimationContainerHalf.forEach((container) => {
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
        selectors.sectionDividers.forEach((container) => {
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

    //! */

    //!

    const checkWindowHeight = () => {
        const rem = 20;
        const navTop = selectors.nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        let borderRadius = "1rem";

        if (navTop >= windowHeight) {
            selectors.nav.style.height = "8rem";

            selectors.menuSocialContainer.style.bottom = "inherit";
            selectors.menuSocialContainer.style.top = "2rem";
            selectors.menuSocialContainer.style.flexDirection = "column";

            /* btnLogo.style.width = "7rem"; */
            selectors.btnLogo.style.height = "4rem";
            selectors.menuBtnBars.forEach((bar) => (bar.style.height = "4px"));

            setTimeout(() => {
                selectors.phoneMenu.style.top = 0;
                selectors.phoneMenu.style.bottom = "inherit";
                selectors.phoneMenu.style.flexDirection = "column";
                selectors.phoneMenu.style.borderRadius = `0 0 ${borderRadius} ${borderRadius}`;

                selectors.phoneMenu.style.setProperty("--menuPosition", "translateY(-100%)");
            }, 250);
        } else if (navTop < windowHeight) {
            selectors.nav.style.height = "6rem";

            selectors.menuBtnBars.forEach((bar) => (bar.style.height = "2px"));

            selectors.menuSocialContainer.style.top = "inherit";
            selectors.menuSocialContainer.style.bottom = "2rem";
            selectors.menuSocialContainer.style.flexDirection = "column-reverse";
            /* btnLogo.style.width = "5rem"; */
            selectors.btnLogo.style.height = "3rem";

            setTimeout(() => {
                selectors.phoneMenu.style.top = "inherit";
                selectors.phoneMenu.style.bottom = 0;
                selectors.phoneMenu.style.flexDirection = "column-reverse";
                selectors.phoneMenu.style.borderRadius = `${borderRadius} ${borderRadius} 0 0`;
                selectors.phoneMenu.style.setProperty("--menuPosition", "translateY(100%)");
            }, 250);
        }
    };
    setTimeout(() => checkWindowHeight(), 500);

    const openPortfolioModal = (target) => {
        utils.deleteArrElements(fragmentPortfolioProjects);
        utils.deleteChildElements(selectors.portfolioCardsContainer);
        utils.deleteArrElements(fragmentBtns);
        utils.deleteChildElements(selectors.extraListContainer);
        const modalToOpen = target.getAttribute("data-name");
        const currentProjectDetails = [];
        const createPortfolioProjects = () => {
            DB.forEach((data) => {
                data.projects.skills.forEach((skill) => {
                    if (!currentProjectDetails.includes(skill)) {
                        currentProjectDetails.push(skill);
                    }
                });
                createCard(data, fragmentPortfolioProjects);
            });
            currentProjectDetails.forEach((detail) => {
                createExtraListbtn(detail);
            });
            selectors.extraListContainer.appendChild(fragmentBtns);
            selectors.portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
        };

        createPortfolioProjects();
        modalWindowActions(selector(`.${modalToOpen}`), open);
        let dataToCheck = [];
        const activateExtraBtns = (btn) => {
            listExtrasActions();
            selectors.portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });
            console.log(btn);
            const newName = btn.getAttribute("data-name");
            selectors.searchExtraListBtn.setAttribute("data-name", newName);
            selectors.searchExtraListBtn.querySelector(".label_btn").textContent = newName;
            if (dataToCheck.length === 0) {
                dataToCheck = DB;
            }
            let extraDataToCheck = [];
            utils.deleteArrElements(fragmentPortfolioProjects);
            utils.deleteChildElements(selectors.portfolioCardsContainer);
            if (btn.getAttribute("data-name") !== "Todo") {
                dataToCheck.forEach((data) => {
                    if (data.projects.skills.includes(btn.getAttribute("data-name"))) {
                        extraDataToCheck.push(data);
                    }
                });
            } else {
                extraDataToCheck = dataToCheck;
            }

            extraDataToCheck.forEach((extraData) => {
                createCard(extraData, fragmentPortfolioProjects);
            });
            selectors.portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
        };
        const serachExtraListBtn = selectors.searchExtraListBtn.querySelector(".label_btn");
        selectors.listPortfolioBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                selectors.searchExtraListBtn.setAttribute("data-name", "Todo");
                serachExtraListBtn.textContent = serachExtraListBtn.getAttribute(`data_${utils.currentLang}`);
                selectors.portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });

                utils.deleteArrElements(fragmentBtns);
                utils.deleteChildElements(selectors.extraListContainer);
                const newName = btn.getAttribute("data-name");
                selectors.searchPortfolioListBtn.setAttribute("data-name", newName);
                selectors.searchPortfolioListBtn.querySelector(".label_btn").textContent = newName;
                listPortfolioActions();
                utils.deleteArrElements(fragmentPortfolioProjects);
                utils.deleteChildElements(selectors.portfolioCardsContainer);
                dataToCheck = [];
                newName !== "Todo" ? (dataToCheck = DB.filter((item) => item.projects.type_name === newName)) : (dataToCheck = DB);

                const currentProjectDetails = [];
                dataToCheck.forEach((project) => {
                    project.projects.skills.forEach((skill) => {
                        if (!currentProjectDetails.includes(skill)) {
                            currentProjectDetails.push(skill);
                        }
                    });
                });
                currentProjectDetails.unshift("Todo");
                currentProjectDetails.forEach((detail) => {
                    createExtraListbtn(detail);
                });

                selectors.extraListContainer.appendChild(fragmentBtns);
                dataToCheck.forEach((data) => {
                    createCard(data, fragmentPortfolioProjects);
                });
                selectors.portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
                selectors.extraListBtns.forEach((btn) => {
                    btn.addEventListener("click", () => activateExtraBtns(btn));
                });
            });
        });
        selectors.extraListBtns.forEach((btn) => {
            btn.addEventListener("click", () => activateExtraBtns(btn));
        });
    };
    //^CREATE PROJECT RANDOM CARDS

    selectors.acceptStorageBtn.addEventListener("click", () => {
        johnKStorage["page_alert_status"] = close;
        modalWindowActions(alertModal, close);

        localStorage.setItem(storageName, JSON.stringify(johnKStorage));
        console.log(localStorage.getItem(storageName));
    });

    selectors.innerBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = btn.getAttribute("data-current");
            const next = btn.getAttribute("data-next");
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
        });
    });
    selectors.likBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            const btnName = btn.getAttribute("data-name");
            const currentBtn = selector(`.${btnName}`);
            const currentPosition = selectors.modalInfoLegal.getBoundingClientRect().top;
            if (btnName === "legal_section") {
            } else {
                modalWindowActions(currentBtn, open);
            }
        })
    );
    selectors.legalAcceptBtn.addEventListener("click", () => {
        selectors.modalInfoLegal.scrollTo({ top: 0, behavior: `smooth` });
        setTimeout(() => modalWindowActions(legalModal, close), 250);
    });
    selectors.closeModalBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            const btnName = btn.getAttribute("data-name");
            const currentBtn = selector(`.${btnName}`);

            if (btnName === "legal_modal") {
                selectors.infoModal.scrollTo({ top: 0, behavior: `smooth` });
                setTimeout(() => {
                    modalWindowActions(currentBtn, close);
                }, 500);
            } else if (btnName === "portfolio_modal") {
                selectors.portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });

                setTimeout(() => {
                    modalWindowActions(currentBtn, close);
                    setTimeout(() => {
                        selectors.searchExtraListBtn.setAttribute("data-name", "Todo");
                        selectors.searchExtraListBtn.querySelector(".label_btn").textContent = "Todo";
                        selectors.searchPortfolioListBtn.setAttribute("data-name", "Todo");
                        selectors.searchPortfolioListBtn.querySelector(".label_btn").textContent = "Todo";
                    }, 250);
                }, 500);
            } else {
                modalWindowActions(currentBtn, close);
            }
        })
    );
    selectors.sections.forEach((section) => {
        const watchPage = ([entry]) => {
            if (entry.isIntersecting) {
                const entryName = entry.target.attributes.id.value;
                selectors.sectionBtns.forEach((btn) => {
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

    //! NO BORRAR --EDITAR SOLO MIENTRAS ES DEBIDO

    const listPortfolioActions = () => {
        selectors.portfolioListContainer.classList.toggle("list_down");
        selectors.searchPortfolioListBtn.classList.toggle("list_btn_active");
        selectors.searchPortfolioListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
        selectors.portfolioListContainer.children[0].focus();
    };
    const listExtrasActions = () => {
        selectors.extraListContainer.classList.toggle("list_down");
        selectors.searchExtraListBtn.classList.toggle("list_btn_active");
        selectors.searchExtraListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
        selectors.extraListContainer.children[0].focus();
    };
    selectors.searchPortfolioListBtn.addEventListener("click", () => {
        listPortfolioActions();
    });
    selectors.searchExtraListBtn.addEventListener("click", () => {
        listExtrasActions();
    });

    selectors.btnDown.addEventListener("click", () => {
        const windowHeight = window.innerHeight;
        const navHeight = selectors.nav.getBoundingClientRect().height;
        const fixHeight = windowHeight - navHeight;
        window.scrollTo(0, fixHeight);
    });
    selectors.accesibilityBtns.forEach((btn) => {
        btn.addEventListener("click", () => utils.scrollToSection(btn));
    });
    selectors.actionBtns.forEach((btn) => {
        btn.addEventListener("click", () => menuActions(menuStatus));
    });
    selectors.sectionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            utils.scrollToSection(btn);
        });
    });
    selectors.socialMenuBtns.forEach((btn) => {
        btn.addEventListener("enter", () => menuSocialActions(menuSocialStatus));
        btn.addEventListener("click", () => menuSocialActions(menuSocialStatus));
    });
    selectors.contactBtns.forEach((btn) => {
        btn.addEventListener("enter", () => modalWindowActions(selectors.contactModal, open));
        btn.addEventListener("click", () => modalWindowActions(selectors.contactModal, open));
    });
    selectors.heroBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            utils.scrollToSection(btn);
        });
    });
    selectors.portfolioBtns.forEach((btn) => {
        btn.addEventListener("click", () => openPortfolioModal(btn));
    });

    selectors.illustrationMe.addEventListener("mouseover", (e) => {
        selectors.bubbleBio.classList.add("show_flex");
        const containerWidth = selectors.bubbleBio.getClientRects()[0].width;
        const containerHeight = selectors.bubbleBio.getClientRects()[0].height;
        selectors.bubbleBio.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - containerHeight / 2}px)`;
    });
    selectors.bubbleBio.addEventListener("mouseleave", () => {
        selectors.bubbleBio.classList.remove("show_flex");
    });

    const tooltipMargin = 12;
    selectors.illustrationRex.addEventListener("mouseover", (e) => {
        selectors.bubbleRex.classList.add("show_flex");
        const containerWidth = selectors.bubbleRex.getClientRects()[0].width;
        selectors.bubbleRex.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
    });
    selectors.illustrationRex.addEventListener("mouseleave", () => {
        selectors.bubbleRex.classList.remove("show_flex");
    });

    const devIconsActions = (action) => {
        if (action === open) {
            selectors.devIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            selectors.shieldScreen.classList.remove("screen_hide");
            selectors.devTabletScreen.classList.remove("screen_hide");
            setTimeout(() => selectors.devScreen.classList.remove("screen_hide"), 250);
        } else {
            selectors.devIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            selectors.devScreen.classList.add("screen_hide");

            selectors.devTabletScreen.classList.add("screen_hide");
            setTimeout(() => selectors.shieldScreen.classList.add("screen_hide"), 250);
        }
    };
    const illustrationIconsActions = (action) => {
        if (action === open) {
            selectors.illustrationIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            selectors.illustrationScreen.classList.remove("screen_hide");
            selectors.illustrationTabletScreen.classList.remove("screen_hide");
        } else {
            selectors.illustrationIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            selectors.illustrationScreen.classList.add("screen_hide");
            selectors.illustrationTabletScreen.classList.add("screen_hide");
        }
    };
    const designIconsActions = (action) => {
        if (action === open) {
            selectors.designIcons.forEach((icon) => {
                icon.classList.add("icon_show");
            });
            selectors.designScreen.classList.remove("screen_hide");
            selectors.designTabletScreen.classList.remove("screen_hide");
        } else {
            selectors.designIcons.forEach((icon) => {
                icon.classList.remove("icon_show");
            });
            selectors.designScreen.classList.add("screen_hide");
            selectors.designTabletScreen.classList.add("screen_hide");
        }
    };

    selectors.animationKeys.forEach((key) => {
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

            selectors.tabletScreen.classList.add("tablet_screen_on");
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
            selectors.tabletScreen.classList.remove("tablet_screen_on");
        });
    });
    selectors.forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            utils.sanitizeInput(form.querySelector(".input_name"));
            utils.sanitizeInput(form.querySelector(".input_last_name"));
            utils.sanitizeInput(form.querySelector(".input_email"));
            utils.sanitizeInput(form.querySelector(".input_description"));
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
    selectors.themeBtns.forEach((btn) => {
        btn.addEventListener("click", () => changeTheme(currentTheme));
    });

    selectors.btnLogo.addEventListener("click", toTheTop);
    window.addEventListener("scroll", () => {
        if (menuStatus === open) {
            menuActions(menuStatus);
        }
        if (menuSocialStatus === open) {
            menuSocialActions(menuSocialStatus);
        }
    });
    setStart();
});
