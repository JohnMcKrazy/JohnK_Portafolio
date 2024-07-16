const $d = document;
const selector = (tag) => $d.querySelector(`${tag}`);
const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);

//^ SELECTORES
export const BODY = selector("body");
export const modal = selector(".modal");
export const nav = selector(".nav_menu");
export const btnLogo = selector(".logo_btn");
export const menuBtn = selector(".menu_btn");
export const phoneMenu = selector(".phone_menu_controler");
export const menuContainer = selector(".nav_menu_controler");
export const menuSocialContainer = selector(".menu_social_container");
export const modalInfoLegal = selector(".modal_info_legal");
export const alertModal = selector(".alert_modal");
export const contactModal = selector(".contact_modal");
export const menuSocialBtnsContainer = selector(".menu_social_btns_container");
//MY ILLUSTRATION CONTENT
export const watchMerAM = selector(".watch_am");
export const watchMerPM = selector(".watch_pm");
export const designScreen = selector(".design_screen");
export const designTabletScreen = selector(".design_tablet_screen");
export const devScreen = selector(".dev_listPortfolioBtnsscreen");
export const devTabletScreen = selector(".dev_tablet_screen");
export const shieldScreen = selector(".shield_screen");
export const illustrationScreen = selector(".illustration_screen");
export const illustrationTabletScreen = selector(".illustration_tablet_screen");
// BUBBLES
export const bubbleBio = selector(".bio_bubble");
export const bubbleInfo = selector(".info_bubble");
export const bubbleRex = selector(".rex_bubble");
// MODAL PORTFOLIO
export const searchPortfolioListBtn = selector(".search_portfolio_list_btn");
export const searchPortfolioListBtnLabel = searchPortfolioListBtn.querySelector(".label_btn");
export const portfolioListContainer = selector(".portfolio_list_btns_container");
export const extraListBtns = selectorAll(".extra_list_btn");
export const searchExtraListBtn = selector(".search_extra_list_btn");
export const searchExtraListBtnLabel = selector(".search_extra_list_btn").querySelector(".label_btn");
export const extraListContainer = selector(".extra_list_btns_container");
// UTILS FUNCTIONS
export const cardsHotContainer = selector(".cards_hot_container");
export const portfolioCardsContainer = selector(".cards_portfolio_container");

export const illustrationMe = selector(".desk_me");
export const illustrationRex = selector(".dog");

/*  */
export const legalModal = selector(".legal_modal");
export const acceptStorageBtn = selector(".storage_accept");
export const innerBtns = selectorAll(".inner_link_btn");
export const linkBtns = selectorAll(".link_btn");
export const legalAcceptBtn = selector(".legal_modal_accept_btn");
export const closeModalBtns = selectorAll(".close_modal");
export const sections = selectorAll(".section");
export const menuBtnBars = selectorAll(".bar");

export const btnDown = selector(".btn_down");
export const accesibilityBtns = selectorAll(".accessibility_btn");
export const actionBtns = selectorAll(".action_menu");
export const sectionBtns = selectorAll(".section_btn");
export const socialMenuBtns = selectorAll(".social_menu_btn");
export const contactBtns = selectorAll(".contact_btn");
export const heroBtns = selectorAll(".btn_hero");
export const portfolioBtns = selectorAll(".portfolio_btn");
export const animationKeys = selectorAll(".animation_key");
export const forms = selectorAll("FORM");
export const themeBtns = selectorAll(".theme_btn");
export const langBtns = selectorAll(".lang_btn");

export const tabletScreen = selector(".desk_tablet_screen");

export const certificationsContainer = selector(".certification_container");
export const designSkillsContainer = selector(".design_skills_container");

export const devSkillsContainer = selector(".dev_skills_container");
export const mainNavBtn = selector(".main_nav_btn ");

export const swipeAnimationContainerFull = selectorAll(".swipe_animation_container_full");
export const swipeAnimationContainerHalf = selectorAll(".swipe_animation_container_half");
export const cardsUp = selectorAll(".card_up");

export const devIcons = selectorAll(".dev_icon");
export const illustrationIcons = selectorAll(".illustration_icon");
export const designIcons = selectorAll(".design_icon");

export const skillBadges = selectorAll(".skill_badge");

export const listPortfolioBtns = selectorAll(".list_portfolio_btn");

export const sectionDividers = selectorAll(".section_divider");
