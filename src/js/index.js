document.addEventListener("DOMContentLoaded", () => {
    //^ VARIABLES
    const flx = "flex";
    const blk = "block";
    const none = "none";

    const close = "close";
    const open = "open";
    const accepted = "accepted";

    let currentTheme = "dark_theme";

    let menuStatus = close;
    let menuSocialStatus = close;
    let dropDownStatus = close;

    let slidersServicesCount = 0;
    let sliderFullCountServices = 0;

    let typesOfProjects = [];
    let newProjectsListData = [];

    let storageContent;
    const portfolioData = "./portfolioDB.json";
    const storageName = "JohnK_Maker";
    let fetchData = [];
    let certificationsData = [
        { name: "Responsive Web Design", image: "./src/img/certifications/responsive_web_design.webp", link: "https://www.freecodecamp.org/certification/JohnGC/responsive-web-design" },
        { name: "Legacy - JavaScript Algoritms and Data Structures", image: "./src/img/certifications/legacy_js.webp", link: "https://www.freecodecamp.org/certification/JohnGC/javascript-algorithms-and-data-structures" },
        { name: "Front-End Development Libraries", image: "./src/img/certifications/frontend_development_libraries.webp", link: "https://www.freecodecamp.org/certification/JohnGC/front-end-development-libraries" },
        { name: "Data Visualization", image: "./src/img/certifications/data_visualization.webp", link: "https://www.freecodecamp.org/certification/JohnGC/data-visualization" },
        { name: "Scientific Computing With Python", image: "./src/img/certifications/scientific_computing_python.webp", link: "https://www.freecodecamp.org/certification/JohnGC/scientific-computing-with-python-v7" },
    ];
    const hotCardsSelection = ["js_documentation", "tribute", "pokedex", "black_jack", "verona", "afroduck", "smuffs", "mitos_y_leyendas", "berserkers", "creaciones_hermed", "we_are_disney", "navidad_2024"];
    const infoSoftware = [
        {
            type: "nule",
            db_name: "",
            tech_name_pre: "",
            tech_name: "Ilustracion Tradicional",
            tech_complete_name: "",
            tech_info: "",
            icon: '<div class="icon_container"><svg class="pallet_icon icon_svg tech_icon_card" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.98 64"><path class="cls-1" d="M48.84 41.61a11.58 11.58 0 0 1 0-19.22c8.78-6.33 5.84-19.17-5.1-21.52A39.79 39.79 0 0 0 35.51 0C15.07 0-1.34 15.57.09 34.26 1.3 50.13 15.63 62.95 33.25 63.94a39.81 39.81 0 0 0 10.19-.74c11.1-2.28 14.3-15.2 5.4-21.59ZM43 56a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z"/><path class="cls-2" d="M59.32 16.67a2.25 2.25 0 0 0-3-.16L36.26 32.75a44.12 44.12 0 0 0-12.79 16.91l2.87 2.87a44.12 44.12 0 0 0 16.91-12.79l16.23-20.05a2.25 2.25 0 0 0-.16-3.02Z"/><path class="cls-3" d="M26.34 52.53S26.34 64 12 64c0-14.34 11.47-14.34 11.47-14.34Z"/><circle class="cls-4" cx="41" cy="13" r="5"/><circle class="cls-5" cx="13" cy="33" r="5"/><circle class="cls-6" cx="23" cy="17" r="5"/></svg></div>',
        },
        {
            type: "design",
            db_name: "illustrator",
            tech_name_pre: "Adobe",
            tech_name: "Illustrator",
            tech_complete_name: "Adobe Illustrator",
            tech_info: "Programa para diseño usado principalmente para el dibujo vectorial.",
            icon: '<div class="icon_container"><svg class="illustrator_icon_svg adobe_icon tech_icon_card" data-name="illustrator_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><title>Adobe Illustrator</title><path class="cls-1" d="M3.91,0H21.09A3.91,3.91,0,0,1,25,3.91V21.09A3.91,3.91,0,0,1,21.09,25H3.91A3.91,3.91,0,0,1,0,21.09V3.91A3.91,3.91,0,0,1,3.91,0" /><path class="cls-2" d="M12.19,15.22H8.37l-.78,2.55a.19.19,0,0,1-.19.15H5.46c-.11,0-.15-.06-.11-.19L8.64,8.22c0-.1.07-.21.1-.34a2.1,2.1,0,0,0,.07-.56.1.1,0,0,1,.08-.12h2.66c.08,0,.12,0,.13.08l3.76,10.47c0,.11,0,.17-.1.17H13.19A.16.16,0,0,1,13,17.8ZM9,13.46h2.79c-.06-.22-.29-.73-.38-1s-.21-.5-.31-.81-.19-.63-.29-.94l-.28-.91c-.08-.29-.15-.56-.22-.8h0c-.09.44-.21.88-.34,1.32s-.32,1-.47,1.52S9.1,13,9,13.46Z"/><path class="cls-2" d="M17.67,8.93a1.17,1.17,0,0,1-.9-.37,1.26,1.26,0,0,1-.35-.94,1.23,1.23,0,0,1,.37-.92,1.31,1.31,0,0,1,.92-.35,1.25,1.25,0,0,1,.93.35,1.3,1.3,0,0,1,.34.92,1.3,1.3,0,0,1-.36.94,1.28,1.28,0,0,1-.95.37M16.6,17.75V10.2c0-.1,0-.15.14-.15h1.87c.09,0,.14,0,.14.15v7.55c0,.11-.05.17-.14.17H16.75c-.1,0-.15-.06-.15-.17"/></svg></div>',
        },
        {
            type: "design",
            db_name: "photoshop",
            tech_name_pre: "Adobe",
            tech_name: "Photoshop",
            tech_complete_name: "Adobe Photoshop",
            tech_info: "Programa para diseño usado principalmente para el retoque de fotografías y gráficos.",
            icon: '<div class="icon_container"><svg class="photoshop_icon_svg adobe_icon tech_icon_card" data-name="photoshop_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><title>Adobe Photoshop</title><path class="cls-1" d="M3.91,0H21.09A3.91,3.91,0,0,1,25,3.91V21.09A3.91,3.91,0,0,1,21.09,25H3.91A3.91,3.91,0,0,1,0,21.09V3.91A3.91,3.91,0,0,1,3.91,0" /><path class="cls-2" d="M5.58,17.77V7.21c0-.07,0-.11.1-.11h.63l.78,0H8.92A6.28,6.28,0,0,1,11,7.36a3.72,3.72,0,0,1,1.38.85,3.1,3.1,0,0,1,.75,1.16,3.81,3.81,0,0,1,.24,1.33,3.67,3.67,0,0,1-.62,2.18,3.48,3.48,0,0,1-1.65,1.25,6.71,6.71,0,0,1-2.31.39h-1v3.25a.13.13,0,0,1-.11.15h-2c-.08,0-.12,0-.12-.13M7.86,9.08V12.5l.4,0H8.8A3.92,3.92,0,0,0,10,12.35a1.91,1.91,0,0,0,.85-.54,1.62,1.62,0,0,0,.32-1.06,1.7,1.7,0,0,0-.24-.91,1.66,1.66,0,0,0-.72-.59A3.27,3.27,0,0,0,9,9.05h-.7l-.42,0"/><path class="cls-2" d="M19.82,11.84a6,6,0,0,0-1.19-.35,5.46,5.46,0,0,0-1.14-.13,2.15,2.15,0,0,0-.62.07.61.61,0,0,0-.33.21.54.54,0,0,0-.08.28.52.52,0,0,0,.1.27,1.31,1.31,0,0,0,.35.27,6.07,6.07,0,0,0,.73.34,7.08,7.08,0,0,1,1.57.75,2.28,2.28,0,0,1,.81.85,2.17,2.17,0,0,1,.24,1.06,2.42,2.42,0,0,1-.39,1.36,2.65,2.65,0,0,1-1.15.92,4.75,4.75,0,0,1-1.86.33,6.58,6.58,0,0,1-1.4-.14,4.42,4.42,0,0,1-1.11-.33.2.2,0,0,1-.12-.19V15.62a.11.11,0,0,1,0-.09.07.07,0,0,1,.09,0,4.92,4.92,0,0,0,1.34.5,5.5,5.5,0,0,0,1.21.16,1.78,1.78,0,0,0,.85-.15.45.45,0,0,0,.27-.43.52.52,0,0,0-.24-.41,4.06,4.06,0,0,0-1-.48A6.08,6.08,0,0,1,15.32,14a2.59,2.59,0,0,1-.78-.87,2.28,2.28,0,0,1-.24-1,2.35,2.35,0,0,1,.35-1.24,2.5,2.5,0,0,1,1.07-.94,3.48,3.48,0,0,1,1.67-.42,10.72,10.72,0,0,1,1.39,0,4.52,4.52,0,0,1,1.09.37A.12.12,0,0,1,20,10a.5.5,0,0,1,0,.12v1.67a.12.12,0,0,1,0,.1.13.13,0,0,1-.12,0Z"/></svg></div>',
        },
        {
            type: "design",
            db_name: "inDesign",
            tech_name_pre: "Adobe",
            tech_name: "InDesign",
            tech_complete_name: "Adobe InDesign",
            tech_info: "Programa para diseño dirigida a maquetadores profesionales",
            icon: ' <div class="icon_container"><svg class="inDesign_icon_svg adobe_icon tech_icon_card" data-name="inDesign_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-2" d="M3.91 0H21.1a3.91 3.91 0 0 1 3.91 3.91V21.1a3.91 3.91 0 0 1-3.91 3.91H3.91A3.91 3.91 0 0 1 0 21.1V3.91A3.91 3.91 0 0 1 3.91 0" /><path class="cls-1" d="M8.88 7.4v10.35c0 .11-.05.17-.15.17H6.84c-.09 0-.13-.05-.13-.17V7.4c0-.09.05-.13.15-.13h1.89c.06 0 .12.04.13.1v.03ZM15.01 18.14a5.28 5.28 0 0 1-2.21-.46c-.64-.3-1.18-.78-1.54-1.4-.4-.71-.59-1.52-.56-2.34 0-.76.19-1.5.56-2.16.39-.67.95-1.22 1.64-1.59.8-.42 1.69-.62 2.59-.59h.21c.09 0 .28.01.4.02V6.49c0-.08.03-.12.1-.12h1.92s.09.03.1.07v9.65c0 .19 0 .39.02.61.02.22.03.42.04.59 0 .07-.04.14-.1.17-.51.22-1.04.39-1.59.5a8.4 8.4 0 0 1-1.59.15m1.1-2.05v-4.51a4.447 4.447 0 0 0-.7-.07c-.4 0-.8.09-1.16.26-.79.38-1.27 1.19-1.21 2.06 0 .36.05.72.17 1.06.1.27.26.52.46.73.2.19.43.33.69.41.27.09.56.13.85.13.15 0 .3 0 .43-.02.15 0 .3-.03.45-.07Z"/</svg></div>',
        },
        {
            type: "design",
            db_name: "premier",
            tech_name_pre: "Adobe",
            tech_name: "Premier",
            tech_complete_name: "Adobe Premier",
            tech_info: "Programa para diseño destinado para edición de video",
            icon: '<div class="icon_container"><svg class="premier_icon_svg adobe_icon tech_icon_card" data-name="premier_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><title>Adobe Premier</title><path class="cls-1" d="M3.91,0H21.09A3.91,3.91,0,0,1,25,3.91V21.09A3.91,3.91,0,0,1,21.09,25H3.91A3.91,3.91,0,0,1,0,21.09V3.91A3.91,3.91,0,0,1,3.91,0" /><path class="cls-2" d="M5.9,17.69V7.16c0-.09,0-.14.08-.14H8.31c.31,0,.71.09,1,.09a6.53,6.53,0,0,1,2.1.32,3.28,3.28,0,0,1,1.38.84,3.53,3.53,0,0,1,.76,1.16,4.77,4.77,0,0,1,.23,1.34A3.62,3.62,0,0,1,13.17,13a3.26,3.26,0,0,1-1.65,1.25,6.78,6.78,0,0,1-2.32.4H8.71c-.09,0-.49-.09-.72-.09v3.26a.12.12,0,0,1-.1.14H6a.53.53,0,0,1-.08-.23M8,9v3.44c.13,0,.53.09.67.09h.53a3.48,3.48,0,0,0,1.16-.18,1.71,1.71,0,0,0,.85-.54,1.48,1.48,0,0,0,.31-1.07,2,2,0,0,0-.22-.89,1.44,1.44,0,0,0-.71-.58A3.87,3.87,0,0,0,9.42,9H8.71A2.49,2.49,0,0,1,8,9"/><path class="cls-2" d="M15.23,9.7H17a.29.29,0,0,1,.22.18.45.45,0,0,1,.09.22.7.7,0,0,1,.05.32v.35a3.82,3.82,0,0,1,1.11-.89,2.41,2.41,0,0,1,1.43-.36c.09,0,.14.05.14.09v2.06c0,.09-.05.13-.18.13a2.31,2.31,0,0,0-1,.09,2.49,2.49,0,0,0-.85.27,1.9,1.9,0,0,0-.67.4v5.22a.12.12,0,0,1-.1.14H15.36c-.09,0-.13-.05-.18-.14V11.31a5.29,5.29,0,0,0,0-.8c0-.23-.05-.45-.05-.67,0-.05,0-.05.05-.09s0-.05.09-.05"/></svg></div>',
        },
        {
            type: "design",
            db_name: "after_effects",
            tech_name_pre: "Adobe",
            tech_name: "AfterEffects",
            tech_complete_name: "Adobe AfterEffects",
            tech_info: "Programa para diseño destinado para la creación o aplicación en una composición, así como realización de gráficos en movimiento y efectos especiales.",
            icon: '<div class="icon_container"><svg class="after_icon_svg adobe_icon tech_icon_card" data-name="after_icon_svg 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>Adobe After Effects</title><path class="cls-2" d="m3.91,0h17.19c2.16,0,3.91,1.75,3.91,3.91v17.19c0,2.16-1.75,3.91-3.91,3.91H3.91c-2.16,0-3.91-1.75-3.91-3.91V3.91C0,1.75,1.75,0,3.91,0" /><path class="cls-1" d="m10.27,15.26h-3.82l-.78,2.52c-.02.09-.11.15-.2.15h-1.93c-.11,0-.15-.06-.12-.18l3.3-9.38c.03-.1.07-.21.1-.34.04-.22.07-.44.07-.67,0-.06.03-.11.09-.12,0,0,.02,0,.03,0h2.63c.08,0,.12.03.13.08l3.75,10.44c.03.11,0,.17-.1.17h-2.15c-.08,0-.15-.04-.17-.12l-.84-2.55Zm-3.22-1.76h2.61c-.07-.22-.14-.67-.23-.95-.09-.28-.18-.57-.28-.88-.1-.31-.2-.63-.3-.94s-.19-.62-.27-.91c-.08-.29-.16-.56-.22-.8h-.02c-.09.45-.21.89-.35,1.32-.15.5-.31,1-.47,1.52-.16.52-.32,1.2-.47,1.64"/><path class="cls-1" d="m19.58,14.36h-3.25c.05.33.16.66.34.95.18.28.45.49.75.62.42.19.88.29,1.34.28.31,0,.62-.02.92-.07.33-.06.66-.16.97-.29.05-.04.08-.02.08.08v1.57s0,.09-.02.12c-.02.03-.04.06-.07.07-.34.16-.7.28-1.07.36-.44.06-.89.08-1.34.05-.67.02-1.34-.1-1.97-.36-.5-.22-.94-.55-1.29-.97-.32-.4-.57-.85-.71-1.35-.14-.49-.22-.99-.21-1.49,0-.55.08-1.1.26-1.63.16-.51.43-.99.77-1.4.34-.41.76-.74,1.24-.97.54-.25,1.13-.37,1.72-.36.58,0,1.15.11,1.68.33.42.19.8.48,1.08.85.27.35.48.74.61,1.16.13.41.2.83.2,1.26,0,.24,0,.46-.02.66-.01.12-.04.24-.06.35,0,.08-.07.13-.15.13-.07,0-.18,0-.34.02-.16.02-.44,0-.68.02s-.49,0-.75,0m-3.26-1.31h2.16c.26,0,.46,0,.59,0,.08,0,.16,0,.24-.02v-.1c0-.2,0-.4-.03-.59-.18-.58-.73-.96-1.34-.94-.57-.03-1.1.27-1.36.78-.12.28-.21.58-.25.89"/></svg></div>',
        },
        {
            type: "design",
            db_name: "figma",
            tech_name_pre: "Figma",
            tech_name: "Figma",
            tech_complete_name: "Figma",
            tech_info: "Figma es un editor de gráficos vectorial y una herramienta de generación de prototipos, principalmente basada en la web.",
            icon: '<div class="icon_container"><svg class="figma_icon_svg adobe_icon tech_icon_card" data-name="figma_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><title>Figma</title><circle class="cls-1" cx="16.67" cy="12.5" r="4.17" /><path class="cls-2" d="M8.33,16.67a4.17,4.17,0,1,0,4.17,4.16V16.67Z" /><path class="cls-3" d="M16.67,0H12.5V8.33h4.17a4.17,4.17,0,0,0,0-8.33Z" /><path class="cls-4" d="M8.33,0a4.17,4.17,0,0,0,0,8.33H12.5V0Z" /><path class="cls-5" d="M8.33,8.33a4.17,4.17,0,0,0,0,8.34H12.5V8.33Z" /></svg></div>',
        },
        {
            type: "dev",
            db_name: "html",
            tech_name: "HTML",
            tech_complete_name: "HTML",
            tech_info: "Define una estructura básica para la presentación de contenido de una página web",
            icon: '<div class="icon_container"><svg class="html_icon_svg tech_icon_card" data-name="html_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20"><path class="cls-1" d="M5.29 18 3.68 0h17.64l-1.61 18-7.22 2-7.2-2z" /><path class="cls-2" d="m12.5 18.47 5.84-1.62 1.37-15.38H12.5v17z" /><path class="cls-3" d="M12.5 3.68H6.96l.06.59.54 6.09H15.21l-.26 2.86-2.46.66-2.46-.66-.16-1.76H7.66l.31 3.47 4.52 1.25h.01l4.52-1.25.03-.38.52-5.81.05-.59H9.58l-.2-2.26h8.45l.04-.5.1-1.12.05-.59H12.5z" /><path class="cls-4" d="M12.5 8.15H9.58l-.2-2.26h3.12V3.68H6.96l.06.59.54 6.09h4.94V8.15zM12.5 13.88h-.01l-2.46-.66-.16-1.76H7.66l.31 3.47 4.52 1.25h.01v-2.3z" /></svg></div>',
        },
        {
            type: "dev",
            db_name: "css",
            tech_name: "CSS",
            tech_complete_name: "CSS",
            tech_info: "Es muy usado para establecer el diseño visual en interfaces de usuario escritas en HTML",
            icon: '<div class="icon_container"><svg class="css_icon_svg tech_icon_card" data-name="css_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20"><path class="cls-1" d="M5.29 18 3.68 0h17.64l-1.61 18-7.22 2-7.2-2z"/><path class="cls-2" d="m12.5 18.47 5.84-1.62 1.37-15.38H12.5v17z"/><path class="cls-3" d="m6.77 5.63-.22-2.09h11.9l-.14 2.42-5.03 2.22h4.82l-.52 6.84-4.86 1.31-5.04-1.23-.31-3.47H9.6l.12 1.84 2.92.54 2.69-.83.13-2.93H7.18l-.16-2.18 5.48-2.4-5.73-.04z"/><path class="cls-4" d="m7.02 8.07.16 2.18h5.32V5.67l-5.48 2.4zM9.72 13.47l-.12-1.84H7.37l.31 3.47 4.82 1.17v-2.29l-2.78-.51zM6.55 3.54l.22 2.09 5.73.04V3.54H6.55z"/></svg></div>',
        },
        {
            type: "dev",
            db_name: "sass",
            tech_name: "SASS",
            tech_complete_name: "SASS",
            tech_info: "Sass es un metalenguaje de CSS, agrega configuraciones adicionales para facilitar su uso.",
            icon: '<div class="icon_container"><svg class="sass_icon_svg tech_icon_card" data-name="sass_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-1" d="M21.52 13.89a5.23 5.23 0 0 0-2.26.53 4.64 4.64 0 0 1-.51-1.17 3.2 3.2 0 0 1-.05-1 8.25 8.25 0 0 1 .3-1.05s-.05-.26-.56-.27-.93.1-1 .23a5.06 5.06 0 0 0-.21.75 18.35 18.35 0 0 1-1.53 2.94 3.1 3.1 0 0 1-.35-.86 3.54 3.54 0 0 1 0-1 7.21 7.21 0 0 1 .3-1.06s-.06-.26-.56-.27-.94.1-1 .23-.1.45-.21.75-1.32 3-1.64 3.73c-.16.36-.3.65-.4.84l-.13.25c-.07.12-.15.24-.18.24a1.77 1.77 0 0 1 0-.78c.18-.94.62-2.41.62-2.46s.08-.29-.29-.42a.45.45 0 0 0-.51.09s-.05.08-.05.08.39-1.66-.76-1.66a3.42 3.42 0 0 0-2.21 1.51l-1.7.94-.81.45-.06-.06c-1.39-1.49-4-2.54-3.87-4.55 0-.72.29-2.64 5-5 3.83-1.9 6.89-1.38 7.42-.22.76 1.66-1.64 4.75-5.61 5.19a3 3 0 0 1-2.51-.63C5.94 10 5.91 10 5.83 10s0 .28 0 .4a2.39 2.39 0 0 0 1.44 1.13 7.6 7.6 0 0 0 4.65-.46c2.41-.94 4.29-3.52 3.74-5.69S11.44 2.5 8 3.72A17.43 17.43 0 0 0 2.11 7.1C.2 8.88-.1 10.43 0 11.07c.44 2.3 3.61 3.8 4.88 4.91l-.18.1c-.63.31-3.05 1.58-3.65 2.91-.69 1.52.1 2.61.63 2.75A3.89 3.89 0 0 0 5.91 20a4.2 4.2 0 0 0 .38-3.88l.49-.3.92-.51A6.26 6.26 0 0 0 7.36 17a3.52 3.52 0 0 0 .75 2.41.83.83 0 0 0 .6.19c.54 0 .78-.44 1-1s.63-1.4.63-1.4-.37 2 .63 2c.37 0 .73-.47.9-.71v-.05l.06-.09c.15-.26.47-.84 1-1.8.63-1.24 1.24-2.79 1.24-2.79a6.85 6.85 0 0 0 .24 1A8.51 8.51 0 0 0 15 16l-.24.32c-.12.16-.25.33-.39.49a15.2 15.2 0 0 0-1.17 1.47.41.41 0 0 0 .11.54.94.94 0 0 0 .61.1 2.69 2.69 0 0 0 .92-.21 3 3 0 0 0 .79-.42 1.75 1.75 0 0 0 .76-1.56 3.27 3.27 0 0 0-.29-1.09l.13-.2A21.28 21.28 0 0 0 17.58 13a9.47 9.47 0 0 0 .24 1 7.65 7.65 0 0 0 .44 1 4.39 4.39 0 0 0-1.33 1.73c-.29.83-.06 1.2.36 1.29a1.27 1.27 0 0 0 .67-.14 3 3 0 0 0 .85-.43 1.93 1.93 0 0 0 .93-1.45 3.24 3.24 0 0 0-.21-.92 4.71 4.71 0 0 1 2.47-.31c2.17.25 2.6 1.61 2.52 2.17a1.46 1.46 0 0 1-.69 1c-.15.09-.2.13-.18.2s.08.09.22.07A1.69 1.69 0 0 0 25 16.68c.06-1.34-1.22-2.8-3.48-2.79ZM4.76 19.54c-.76.79-1.76 1.08-2.16.83s-.28-1.42.6-2.26a10.85 10.85 0 0 1 1.7-1.26l.44-.27.11-.07a3.1 3.1 0 0 1-.74 3.06ZM10 16c-.25.61-.78 2.18-1.09 2.09s-.44-1.26-.06-2.43a5.52 5.52 0 0 1 .86-1.57c.39-.44.82-.58.93-.4A8 8 0 0 1 10 16Zm4.34 2a.35.35 0 0 1-.25.07s.05-.1.05-.1.54-.58.75-.85.27-.33.43-.54v.06a1.79 1.79 0 0 1-1 1.36Zm3.34-.76c-.08-.06-.07-.24.2-.81a3 3 0 0 1 .74-.95 1.06 1.06 0 0 1 .07.42 1.37 1.37 0 0 1-1.01 1.38Z"/></svg></div>',
        },
        {
            type: "dev",
            db_name: "js",
            tech_name: "JavaScript",
            tech_complete_name: "JavaScript",
            tech_info: "JavaScript (abreviado comúnmente JS) es un lenguaje de programación interpretado, implementado como parte de un navegador web permitiendo mejoras en la interfaz de usuario y páginas web dinámicas.",
            icon: '<div class="icon_container"><svg class="js_icon_svg tech_icon_card" data-name="js_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-1" d="M0 0h25v25H0Z"/><path class="cls-2" d="m6.57 20.89 1.92-1.16c.37.66.7 1.21 1.51 1.21s1.26-.3 1.26-1.47v-8h2.34v8A3.19 3.19 0 0 1 10.1 23a3.65 3.65 0 0 1-3.53-2.15M14.88 20.64l1.91-1.11A2.58 2.58 0 0 0 19.11 21c1 0 1.59-.49 1.59-1.16s-.63-1.09-1.71-1.56l-.58-.28c-1.7-.72-2.82-1.63-2.82-3.54A3.14 3.14 0 0 1 19 11.34a3.48 3.48 0 0 1 3.34 1.88l-1.8 1.18a1.61 1.61 0 0 0-1.51-1 1 1 0 0 0-1.13 1c0 .7.44 1 1.44 1.42l.59.26c2 .85 3.12 1.72 3.12 3.69S21.39 23 19.16 23a4.52 4.52 0 0 1-4.28-2.4"/></svg></div>',
        },

        {
            type: "dev",
            db_name: "vue",
            tech_name: "Vue.js",
            tech_complete_name: "Vue.js",
            tech_info: "Vue.js (pronunciado 'viu') es una libreria para construir interfaces web interactivas. El objetivo de Vue.js es proporcionar los beneficios del enlace de datos reactivo y los componentes de vista componibles con una API que sea lo más simple posible.",
            icon: '<div class="icon_container"><svg class="vue_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-2" d="m20,1.72h5l-12.5,21.56L0,1.72h9.56l2.94,5,2.88-5h4.63Z"/><path class="cls-2" d="m0,1.72l12.5,21.56L25,1.72h-5l-7.5,12.94L4.94,1.72H0Z"/><path class="cls-1" d="m4.94,1.72l7.56,13L20,1.72h-4.63l-2.88,5-2.94-5h-4.62Z"/></svg></div>',
        },

        {
            type: "dev",
            db_name: "react",
            tech_name: "React",
            tech_complete_name: "React",
            tech_info: "React (también llamada React.js o ReactJS) es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario",
            icon: '<div class="icon_container"><svg class="react_icon_svg tech_icon_card" data-name="react_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-1" d="M20.56 8.59c-.27-.09-.53-.18-.8-.25.04-.18.09-.37.12-.55.61-2.96.21-5.34-1.15-6.12-1.3-.75-3.44.03-5.59 1.91-.21.19-.42.38-.62.57-.14-.13-.27-.26-.41-.38C9.84 1.75 7.58.91 6.22 1.69c-1.3.75-1.69 2.99-1.14 5.8.05.28.12.55.18.83-.32.09-.63.19-.93.29-2.65.92-4.34 2.37-4.34 3.87s1.81 3.1 4.57 4.05c.22.08.45.15.68.21-.07.3-.14.59-.2.89-.52 2.75-.11 4.94 1.18 5.69 1.34.77 3.59-.02 5.79-1.94.17-.15.35-.31.52-.48.22.21.44.42.68.62 2.12 1.83 4.22 2.57 5.52 1.82 1.34-.78 1.78-3.13 1.21-5.98-.04-.22-.09-.44-.15-.67.16-.05.31-.1.46-.15 2.87-.95 4.73-2.48 4.73-4.05s-1.74-2.96-4.44-3.89Zm-6.72-4.21c1.85-1.61 3.57-2.24 4.36-1.79.84.48 1.16 2.43.64 4.98-.03.17-.07.33-.11.5-1.1-.25-2.22-.43-3.34-.53-.64-.93-1.35-1.81-2.11-2.64.19-.18.38-.36.57-.53Zm-6.45 9.39a33.615 33.615 0 0 0 1.49 2.57c-.77-.08-1.54-.21-2.3-.37.22-.71.49-1.45.81-2.21Zm0-2.51c-.31-.74-.58-1.46-.79-2.16.71-.16 1.47-.29 2.27-.39-.27.41-.52.83-.77 1.26-.25.43-.48.86-.71 1.29Zm.57 1.26a29.68 29.68 0 0 1 2.27-3.95c.74-.06 1.51-.09 2.28-.09s1.54.03 2.28.09c.42.63.83 1.27 1.2 1.92.38.66.74 1.33 1.08 2.01-.33.69-.69 1.36-1.07 2.02-.38.66-.78 1.3-1.2 1.94-.74.05-1.51.08-2.29.08s-1.53-.02-2.26-.07c-.43-.63-.84-1.28-1.22-1.94-.38-.66-.74-1.33-1.07-2.01Zm8.97 2.54c.25-.44.49-.88.72-1.32.32.72.6 1.45.84 2.2-.77.17-1.55.31-2.33.4.26-.42.52-.84.77-1.27Zm.71-3.8c-.23-.44-.47-.87-.72-1.3-.24-.42-.5-.84-.76-1.25.8.1 1.56.23 2.28.4-.23.73-.5 1.45-.8 2.15Zm-5.12-5.58c.52.57 1.01 1.16 1.47 1.78-.98-.05-1.97-.05-2.95 0 .49-.64.98-1.24 1.48-1.78ZM6.76 2.63c.84-.48 2.69.21 4.64 1.94l.38.35c-.77.83-1.48 1.71-2.13 2.64-1.12.1-2.24.27-3.34.52-.06-.26-.12-.51-.17-.77-.47-2.4-.16-4.21.63-4.67ZM5.54 15.72c-.21-.06-.41-.12-.62-.19A9.026 9.026 0 0 1 2 13.98c-.5-.35-.84-.88-.93-1.49 0-.91 1.36-2.07 3.62-2.86.28-.1.57-.19.86-.27.34 1.08.74 2.13 1.22 3.16-.48 1.04-.89 2.11-1.23 3.2Zm5.79 4.87c-.82.75-1.77 1.34-2.8 1.75-.55.26-1.18.29-1.75.07-.79-.45-1.12-2.21-.67-4.57.05-.28.11-.55.18-.83 1.11.24 2.24.4 3.37.49.66.93 1.37 1.82 2.15 2.65-.16.15-.31.3-.48.44Zm1.22-1.21c-.51-.55-1.01-1.15-1.5-1.8a37.653 37.653 0 0 0 2.97 0c-.46.63-.95 1.23-1.47 1.81Zm6.49 1.49c-.05.61-.34 1.17-.82 1.55-.79.46-2.47-.14-4.29-1.7-.21-.18-.42-.37-.63-.57.76-.84 1.46-1.73 2.1-2.66 1.14-.1 2.27-.27 3.39-.52.05.21.1.41.14.6.24 1.08.28 2.2.12 3.3Zm.91-5.33c-.14.05-.28.09-.42.13-.35-1.08-.77-2.14-1.27-3.17.47-1.01.88-2.05 1.22-3.12.26.07.5.15.74.23 2.31.8 3.72 1.97 3.72 2.88 0 .97-1.52 2.22-4 3.04Z"/><path class="cls-1" d="M12.5 10.25c1.23 0 2.23 1 2.23 2.23s-1 2.23-2.23 2.23-2.23-1-2.23-2.23 1-2.23 2.23-2.23"/></svg></div>',
        },
        {
            type: "dev",
            db_name: "node",
            tech_name: "Node.js",
            tech_complete_name: "Node.js",
            tech_info: "Node.js es un entorno en tiempo de ejecución multiplataforma para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript.",
            icon: '<div class="icon_container"><svg class="node_icon_svg tech_icon_card" data-name="node_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-1" d="M12.5 24.86c-.34 0-.66-.09-.95-.25l-3.02-1.79c-.45-.25-.23-.34-.09-.39.61-.2.73-.25 1.36-.61.07-.05.16-.02.23.02l2.32 1.39c.09.05.2.05.27 0l9.06-5.25c.09-.05.14-.14.14-.25V7.26c0-.11-.05-.2-.14-.25l-9.07-5.22c-.09-.05-.2-.05-.27 0L3.28 7.01c-.09.05-.14.16-.14.25v10.47c0 .09.05.2.14.25l2.48 1.43c1.34.68 2.18-.11 2.18-.91V8.17c0-.14.11-.27.27-.27h1.16c.14 0 .27.11.27.27V18.5c0 1.79-.98 2.84-2.68 2.84-.52 0-.93 0-2.09-.57l-2.38-1.36c-.59-.34-.95-.98-.95-1.66V7.28c0-.68.36-1.32.95-1.66L11.55.38a2.02 2.02 0 0 1 1.91 0l9.06 5.25c.59.34.95.98.95 1.66v10.47c0 .68-.36 1.32-.95 1.66l-9.06 5.25c-.3.14-.64.2-.95.2Zm2.79-7.2c-3.97 0-4.79-1.82-4.79-3.36 0-.14.11-.27.27-.27h1.18c.14 0 .25.09.25.23.18 1.2.7 1.79 3.11 1.79 1.91 0 2.72-.43 2.72-1.45 0-.59-.23-1.02-3.2-1.32-2.48-.25-4.02-.79-4.02-2.77 0-1.84 1.54-2.93 4.13-2.93 2.91 0 4.34 1 4.52 3.18 0 .07-.02.14-.07.2-.05.05-.11.09-.18.09h-1.18c-.11 0-.23-.09-.25-.2-.27-1.25-.98-1.66-2.84-1.66-2.09 0-2.34.73-2.34 1.27 0 .66.3.86 3.11 1.23 2.79.36 4.11.89 4.11 2.84-.02 2-1.66 3.13-4.54 3.13Z" /></svg></div>',
        },
        {
            type: "dev",
            db_name: "python",
            tech_name: "Python",
            tech_complete_name: "Python",
            tech_info: "Python es un lenguaje de alto nivel de programación interpretado, se utiliza para desarrollar aplicaciones de todo tipo",
            icon: '<div class="icon_container"><svg class="python_icon_svg tech_icon_card" data-name="python_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M8.28 4.416c0-2.154.591-3.326 3.853-3.884 2.214-.379 5.053-.426 7.701 0 2.092.338 3.852 1.861 3.852 3.884v7.105c0 2.084-1.71 3.79-3.852 3.79h-7.701c-2.614 0-4.817 2.18-4.817 4.643v3.409H4.668c-2.24 0-3.544-1.58-4.092-3.789-.739-2.968-.707-4.736 0-7.58.614-2.48 2.574-3.788 4.814-3.788h10.595v-.948H8.28V4.415z"/><path class="cls-2" d="M23.686 27.154c0 2.154-1.912 3.244-3.852 3.788-2.919.82-5.261.695-7.701 0-2.037-.58-3.852-1.765-3.852-3.788v-7.105c0-2.045 1.743-3.791 3.852-3.791h7.701c2.565 0 4.817-2.168 4.817-4.737V8.207h2.887c2.243 0 3.3 1.629 3.852 3.788.77 3 .805 5.242 0 7.58-.778 2.27-1.612 3.788-3.852 3.788H15.985v.949h7.701v2.842z"/><path class="cls-3" d="M10.207 3.944c0-.787.645-1.423 1.444-1.423.796 0 1.444.636 1.444 1.423 0 .784-.648 1.42-1.444 1.42a1.431 1.431 0 0 1-1.444-1.42zm8.665 23.682c0-.785.648-1.42 1.444-1.42.8 0 1.444.636 1.444 1.42 0 .786-.645 1.422-1.444 1.422a1.434 1.434 0 0 1-1.444-1.422z"/></svg></div>',
        },

        {
            type: "dev",
            db_name: "gitHub",
            tech_name: "GitHub",
            tech_complete_name: "GitHub",
            tech_info: "GitHub es una plataforma de desarrollo colaborativo, para alojar proyectos utilizando el sistema de control de versiones Git.",
            icon: '<div class="icon_container"><svg class="gitHub_icon_svg tech_icon_card" data-name="gitHub_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path class="cls-1" d="M12.5.31a12.5 12.5 0 0 0-3.95 24.36c.62.12.85-.27.85-.6v-2.33c-3.48.76-4.22-1.47-4.22-1.47a3.26 3.26 0 0 0-1.38-1.83c-1.14-.78.08-.76.08-.76A2.63 2.63 0 0 1 5.79 19a2.66 2.66 0 0 0 3.64 1 2.68 2.68 0 0 1 .79-1.67C7.44 18 4.52 17 4.52 12.16A4.85 4.85 0 0 1 5.81 8.8a4.49 4.49 0 0 1 .12-3.31S7 5.16 9.37 6.77a12.56 12.56 0 0 1 3.13-.42 12.56 12.56 0 0 1 3.13.42c2.37-1.61 3.44-1.28 3.44-1.28a4.49 4.49 0 0 1 .12 3.31 4.84 4.84 0 0 1 1.28 3.36c0 4.8-2.92 5.85-5.7 6.16a3 3 0 0 1 .84 2.32v3.43c0 .43.23.72.86.6A12.5 12.5 0 0 0 12.5.31Z"/><path class="cls-2" d="M4.73 18.26c0 .06-.12.08-.21 0s-.14-.12-.11-.18.12-.09.21 0 .15.12.11.19ZM5.24 18.82c-.06.06-.18 0-.25-.06a.18.18 0 0 1 0-.26c.06-.05.17 0 .26.06a.19.19 0 0 1 0 .26ZM5.73 19.54c-.07.05-.2 0-.28-.11a.22.22 0 0 1 0-.3c.07-.05.2 0 .28.11s.07.25 0 .3ZM6.41 20.24a.24.24 0 0 1-.32 0c-.09-.15-.09-.3-.09-.37s.21-.06.32.05a.24.24 0 0 1 .07.32ZM7.34 20.64c0 .1-.17.14-.31.1s-.24-.16-.21-.26.17-.14.32-.1.23.16.2.26ZM8.36 20.71c0 .11-.11.19-.26.2s-.27-.08-.27-.19.11-.19.26-.19.27.08.27.18ZM9.32 20.55c0 .1-.09.21-.24.23s-.28 0-.3-.13.09-.21.24-.23.28 0 .3.13Z"/></svg></div>',
        },
    ];
    const btnLabels = [
        {
            welcome_section: {
                text_es: "Inicio",
                text_en: "Home",
                icon: '<svg class="icon_svg nav_menu_icon_svg" id="home_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Inicio</title><path class="cls-1" d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg>',
            },
        },
        {
            about_section: {
                text_es: "Acerca",
                text_en: "About",
                icon: '<svg class="icon_svg nav_menu_icon_svg" id="about_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Acerca de</title><circle class="cls-1" cx="12" cy="4" r="2"></circle><path class="cls-1"  d="M15 22V9h5V7H4v2h5v13h2v-7h2v7z"></path></svg>',
            },
        },
        {
            services_section: {
                text_es: "Servicios",
                text_en: "Services",
                icon: '<svg class="icon_svg nav_menu_icon_svg" id="services_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Servicios</title><path class="cls-1" d="M21 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8.001 8.001 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 1 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0H21zM7.76 15.785l1.06-1.696A5.972 5.972 0 0 0 12 15a5.972 5.972 0 0 0 3.18-.911l1.06 1.696A7.963 7.963 0 0 1 12 17a7.963 7.963 0 0 1-4.24-1.215z"/></svg>',
            },
        },
        {
            projects_section: {
                text_es: "Portafolio",
                text_en: "Portfolio",
                icon: '<svg class="icon_svg nav_menu_icon_svg" id="portfolio_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Portafolio</title><path class="cls-1" d="M17.409 19c-.776-2.399-2.277-3.885-4.266-5.602A10.954 10.954 0 0 1 20 11V3h1.008c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3H6V1h2v4H4v7c5.22 0 9.662 2.462 11.313 7h2.096zM18 1v4h-8V3h6V1h2zm-1.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
            },
        },
        {
            contact_section: {
                text_es: "Contacto",
                text_en: "Contact",
                icon: '<svg class="icon_svg nav_menu_icon_svg" id="contact_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Contactame</title><path class="cls-1" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z"/></svg>',
            },
        },
    ];
    let johnK_storage = {
        page_view_count: 1,
        page_alert_status: open,
        page_legal_content: accepted,
        page_theme: "dark_theme",
    };

    const $d = document;
    const selector = (tag) => $d.querySelector(`${tag}`);
    const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);
    const setIconContainer = (icon) => `<div class="icon_container label_btn">${icon}</div>`;
    const setBtnLabel = (label) => `<h3 class="label_btn">${label}</h3>`;
    const setAnimationText = (text) => `<h2 class="up_animation">${text}</h2>`;

    const fragmentHotProjects = $d.createDocumentFragment();
    const fragmentPortfolioProjects = $d.createDocumentFragment();
    const cardProjectTemplate = selector(".card_project_template").content;
    const certificationTemplate = selector(".certification_template").content;
    const skillTemplate = selector(".skill_badge_template").content;

    const loadersContainers = selectorAll(".loader_container");
    const loaderSearchCardsContainer = selector("#loader_cards_hot_container");
    const spinnerHotCardsContainer = selector("#spinner_container_cards_hot");
    const loaderHotCardsContainer = selector("#loader_cards_search_container");
    const spinnerSearchCardContainer = selector("#spinner_container_cards_search");

    const animationContainerText = selectorAll(".text_animation_container");
    //^ SELECTORES
    const BODY = selector("body");
    const modal = selector(".modal");
    const nav = selector(".nav_menu");
    const menuBtnConst = selector(".btn_construction");
    const btnLogo = selector(".logo_btn");
    const menuBtn = selector(".menu_btn");
    const phoneMenu = selector(".phone_menu_controler");
    const menuContainer = selector(".nav_menu_controler");
    const menuSocialContainer = selector(".menu_social_container");
    const lebelBtnMain = selector(".main_nav_btn");
    const lebelBtnAbout = selector(".about_nav_btn");
    const lebelBtnSkills = selector(".skills_nav_btn");
    const lebelBtnServices = selector(".services_nav_btn");
    const lebelBtnPortfolio = selector(".portfolio_nav_btn");
    const lebelBtnContact = selector(".contact_nav_btn");
    const lebelBtnLegals = selector(".legals_nav_btn");
    const modalInfoLegal = selector(".modal_info_legal");
    const alertModal = selector(".alert_modal");
    const contactModal = selector(".contact_modal");
    const menuSocialBtnsContainer = selector(".menu_social_btns_container");
    //MY ILLUSTRATION CONTENT
    const watchMerAM = selector(".watch_am");
    const watchMerPM = selector(".watch_pm");
    const designScreen = selector(".design_screen");
    const designTabletScreen = selector(".design_tablet_screen");
    const devScreen = selector(".dev_screen");
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
    const portfolioListContainer = selector(".portfolio_list_btns_container");
    const searchExtraListBtn = selector(".search_extra_list_btn");
    const extraListContainer = selector(".extra_list_btns_container");
    // UTILS FUNCTIONS
    certificationsData.forEach((certification) => {
        const certificationClone = certificationTemplate.cloneNode(true);
        const certificationBadge = certificationClone.querySelector(".certification_badge");
        const certificationImg = certificationClone.querySelector(".badge_image");
        const certificationBtn = certificationClone.querySelector(".btn");
        certificationImg.setAttribute("src", certification.image);
        certificationImg.setAttribute("alt", `Imagen de Certificado en '${certification.name}' emitido por FreeCodeCamp`);
        certificationClone.querySelector(".badge_name").textContent = certification.name;
        certificationBtn.setAttribute("href", certification.link);
        selector(".certification_container").appendChild(certificationBadge);
    });
    infoSoftware.forEach((software) => {
        const clone = skillTemplate.cloneNode(true);
        const badge = clone.querySelector(".skill_badge");
        badge.setAttribute("data-name", software.db_name);
        badge.innerHTML = `${software.icon}<h3 class="badge_name">${software.tech_name}</h3>`;
        if (software.type === "design") {
            selector(".design_skills_container").querySelector(".icons_container").appendChild(badge);
        } else if (software.type === "dev") {
            selector(".dev_skills_container").querySelector(".icons_container").appendChild(badge);
        }
    });

    const sanitizeInput = (inputValue) => {
        const div = document.createElement("div");
        div.textContent = inputValue;
        return div.innerHTML;
    };

    const changeTheme = (tm) => {
        const BODY = selector("body");
        const lightT = "light_theme";
        const darkT = "dark_theme";
        switch (tm) {
            case lightT:
                currentTheme = darkT;
                watchMerPM.style.opacity = 0;
                watchMerAM.style.opacity = 1;

                break;
            case darkT:
                currentTheme = lightT;
                watchMerAM.style.opacity = 0;
                watchMerPM.style.opacity = 1;

                break;
        }
        storageContent["page_theme"] = currentTheme;
        localStorage.setItem(storageName, JSON.stringify(storageContent));
        BODY.className = currentTheme;
    };
    const deleteChildElements = (parentElement) => {
        let child = parentElement.lastElementChild;
        while (child) {
            parentElement.removeChild(child);
            child = parentElement.lastElementChild;
        }
    };
    const deleteArrElements = (parentElement) => {
        while (parentElement.length > 0) {
            parentElement.forEach((item) => {
                parentElement.pop(item);
            });
        }
    };
    const animateItem = (container, opacity, transform) => {
        container.style.opacity = opacity;
        container.style.transform = transform;
    };
    // ! FETCH DATA //

    const fetchProjectsData = async () => {
        try {
            const raw = await fetch(portfolioData);
            const data = await raw.json();
            fetchData = data;
            createProjectCardHot();
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    fetchProjectsData();
    // ACTIONS FUNTION FOR NAV MENU
    const menuActions = (status) => {
        const navTop = nav.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        if (status === close) {
            menuStatus = open;
            phoneMenu.style.display = flx;
            setTimeout(() => {
                phoneMenu.style.opacity = 1;
                phoneMenu.style.transform = "translateY(0)";
                selector(".main_nav_btn ").focus();
            }, 200);
        } else if (status === open) {
            /* console.log("cerrando menu"); */
            menuStatus = close;
            phoneMenu.style.opacity = 0;
            if (navTop >= windowHeight) {
                /* console.log("cerrando menu abajo"); */
                phoneMenu.style.transform = "translateY(-100%)";
            } else {
                /* console.log("cerrando menu arriba"); */
                phoneMenu.style.transform = "translateY(100%)";
            }
            setTimeout(() => {
                phoneMenu.style.display = none;
            }, 1200);
        }
    };
    // ACTIONS FUNCTION FOR SOCIAL MENU
    const menuSocialActions = (action) => {
        if (action === open) {
            /* console.log("cerrando menu social"); */
            menuSocialStatus = close;
            menuSocialBtnsContainer.style.opacity = 0;
            setTimeout(() => {
                menuSocialBtnsContainer.style.display = none;
            }, 1000);
        } else if (action === close) {
            /* console.log("abriendo menu social"); */

            menuSocialStatus = open;
            menuSocialBtnsContainer.style.display = flx;
            setTimeout(() => {
                menuSocialBtnsContainer.style.opacity = 1;
            }, 200);
        }
    };
    // ACTIONS FUNCTION FOR MODAL BACKDROP
    const modalActions = (action) => {
        if (action === close) {
            modal.style.opacity = 0;
            setTimeout(() => (modal.style.display = none), 500);
        } else if (action === open) {
            modal.style.display = blk;
            setTimeout(() => (modal.style.opacity = 1), 500);
        }
    };
    // ACTION FUNCTION FOR MODAL WINDOWS
    const modalWindowActions = (window, action) => {
        if (action === close) {
            animateItem(window, 0, "translate(-50%,-50%)");
            setTimeout(() => {
                window.style.display = none;
                setTimeout(() => {
                    modalActions(close);
                }, 200);
            }, 1000);
        } else if (action === open) {
            modal.style.display = blk;
            setTimeout(() => {
                modal.style.opacity = 1;
                setTimeout(() => {
                    window.style.display = flx;
                    setTimeout(() => {
                        animateItem(window, 1, "translate(-50%,0)");
                    }, 200);
                }, 500);
            }, 200);
        }
    };
    // FUNCTION FOR CHECK LOCAL STORAGE CONFIGURATION IN START
    const checkAlertStorageAnswer = () => {
        storageContent = JSON.parse(localStorage.getItem(storageName));
        if (!storageContent) {
            localStorage.setItem(storageName, JSON.stringify(johnK_storage));
            console.log("local storage item is created");
        } else {
            if (storageContent["page_theme"] !== "dark_theme") {
                currentTheme = storageContent["page_theme"];
            }
            storageContent["page_view_count"] += 1;
            localStorage.setItem(storageName, JSON.stringify(storageContent));
            /* console.log(`local storage item answer= ${storageContent["page_alert_status"]}, page views= ${storageContent["page_view_count"]}`); */
        }

        if (currentTheme === "dark_theme") {
            watchMerAM.style.opacity = 1;
        } else if (currentTheme === "light_theme") {
            watchMerPM.style.opacity = 1;
        }
        BODY.className = currentTheme;
        /* console.log(storageContent); */
    };
    //^ANIMATION ITEM SWIPE
    const swipingAnimation = () => {
        selectorAll(".swipe_animation_container_full").forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = entry.target.querySelectorAll(".animation_up");
                if (entry.isIntersecting) {
                    animationUpContainers.forEach((container) => {
                        animateItem(selector(`#${container.getAttribute("id")}`), "1", "translateY(0)");
                    });
                }
            };
            const optionsIO_up = {
                threshold: ".8",
            };

            const skillsContainersObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_up);
            skillsContainersObserver.observe(container);
        });

        selectorAll(".swipe_animation_container_half").forEach((container) => {
            const watchSwipeAnimationContainer = ([entry]) => {
                const animationUpContainers = entry.target.querySelectorAll(".animation_up");

                animationUpContainers.forEach((container) => {
                    if (entry.isIntersecting) {
                        animateItem(selector(`#${container.id}`), "1", "translateY(0)");
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
                    animateItem(selector(`#${card.id}`), "1", "translateY(0)");
                }
            };

            const optionsIO_cards = {
                threshold: ".4",
            };

            const cardsObserver = new IntersectionObserver(watchSwipeAnimationContainer, optionsIO_cards);
            cardsObserver.observe(card);
        });
    };

    const createCard = (item, frac, extraClass = "") => {
        let iconsRow = "";
        const cloneProjectCard = cardProjectTemplate.cloneNode(true);
        const projectCard = cloneProjectCard.querySelector(".project_card");
        const imgCard = cloneProjectCard.querySelector(".img_card");
        const projectCardIconsContainer = cloneProjectCard.querySelector(".icons_project_container");
        const cardTitle = cloneProjectCard.querySelector(".title");
        const innerBtn = cloneProjectCard.querySelector(".btn");
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
            infoSoftware.forEach((technology) => {
                if (technology.tech_name === tech) {
                    iconsRow += technology.icon;
                }
            });
        });
        projectCardIconsContainer.innerHTML = iconsRow;
        cardTitle.textContent = clientName;
        innerBtn.setAttribute("href", `${item["projects"]["project_link"]}`);
        frac.appendChild(projectCard);
    };

    checkAlertStorageAnswer();
    const configSize = (widConf) => {
        const copyrightText = selector(".made_content");
        //~~SET CARD CHANGES--START -> // CHANGE FLEX DIRECTIION AND HEIGHT OF CARD
        const changeCardStyle = (container, fd, he) => {
            container.style.flexDirection = fd;
            container.style.height = he;
        };
        //~~SET CARD CHANGES--OVER
        //~~ ************************************************************************************************** *//
        const firstBreak = 899;
        const secondBreak = 749;
        if (widConf > firstBreak) {
            lebelBtnMain.innerHTML = setBtnLabel("Inicio");
            lebelBtnAbout.innerHTML = setBtnLabel("Acerca de");
            lebelBtnSkills.innerHTML = setBtnLabel("Habilidades");
            lebelBtnServices.innerHTML = setBtnLabel("Servicios");
            lebelBtnPortfolio.innerHTML = setBtnLabel("Portafolio");
            lebelBtnContact.innerHTML = setBtnLabel("Contacto");
            lebelBtnLegals.innerHTML = setBtnLabel("Legales");
            menuBtn.style.display = none;
            phoneMenu.style.display = none;
            menuContainer.style.display = flx;
            menuSocialContainer.style.display = flx;
        } else if (widConf > secondBreak || (widConf < firstBreak && widConf > secondBreak)) {
            copyrightText.style.marginLeft = "3rem";
            lebelBtnMain.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="home_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Inicio</title><path class="cls-1" d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg>'
            );
            lebelBtnAbout.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="about_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Acerca de</title><circle class="cls-1" cx="12" cy="4" r="2"></circle><path class="cls-1"  d="M15 22V9h5V7H4v2h5v13h2v-7h2v7z"></path></svg>'
            );
            lebelBtnSkills.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="skills_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Habilidades</title><path class="cls-1" d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"/></svg>'
            );
            lebelBtnServices.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="services_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Servicios</title><path class="cls-1" d="M21 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8.001 8.001 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 1 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0H21zM7.76 15.785l1.06-1.696A5.972 5.972 0 0 0 12 15a5.972 5.972 0 0 0 3.18-.911l1.06 1.696A7.963 7.963 0 0 1 12 17a7.963 7.963 0 0 1-4.24-1.215z"/></svg>'
            );
            lebelBtnPortfolio.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="portfolio_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Portafolio</title><path class="cls-1" d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path><path class="cls-1" d="m10 14-1-1-3 4h12l-5-7z"></path></svg>'
            );
            //*'<svg class="nav_menu_icon_svg" id="portfolio_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Portafolio</title><path class="cls-1" d="M17.409 19c-.776-2.399-2.277-3.885-4.266-5.602A10.954 10.954 0 0 1 20 11V3h1.008c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3H6V1h2v4H4v7c5.22 0 9.662 2.462 11.313 7h2.096zM18 1v4h-8V3h6V1h2zm-1.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>';
            //*'<svg class="nav_menu_icon_svg" id="portfolio_icon_svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Portafolio</title><path class="cls-1" d="m2 19v-14c0-.552.447-1 1-1 .542 0 4.418 2.028 9 2.028 4.593 0 8.456-2.028 9-2.028.55 0 1 .447 1 1v14c0 .553-.45 1-1 1-.544 0-4.407-2.028-9-2.028-4.582 0-8.458 2.028-9 2.028-.553 0-1-.448-1-1zm1.5-.791 6.449-7.691c.289-.344.879-.338 1.16.012 0 0 1.954 2.434 1.954 2.434l1.704-1.283c.319-.24.816-.168 1.054.154l4.679 6.335v-12.44c-1.58.58-4.819 1.798-8.5 1.798-3.672 0-6.918-1.218-8.5-1.799zm2.657-.834c1.623-.471 3.657-.903 5.843-.903 2.309 0 4.444.479 6.105.98l-3.041-4.117-1.065.802.275.344c.259.323.206.796-.117 1.054-.323.259-.795.207-1.054-.117l-2.591-3.236zm.698-9.534c-1.051 0-1.905.854-1.905 1.905s.854 1.904 1.905 1.904 1.904-.853 1.904-1.904-.853-1.905-1.904-1.905zm0 1.3c.333 0 .604.271.604.605 0 .333-.271.604-.604.604-.334 0-.605-.271-.605-.604 0-.334.271-.605.605-.605z" fill-rule="nonzero"/></svg>';
            //*'<svg class="nav_menu_icon_svg" id="clients_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Clientes</title><path class="cls-1" d="M12 8.5l2.116 5.088 5.492.44-4.184 3.584 1.278 5.36L12 20.1l-4.702 2.872 1.278-5.36-4.184-3.584 5.492-.44L12 8.5zM8 2v9H6V2h2zm10 0v9h-2V2h2zm-5 0v5h-2V2h2z"/></svg>';
            //*'<svg class="nav_menu_icon_svg" id="clients_icon_svg" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path class="cls-1" d="M3.5 16.343l1.07 2.207 2.43.335-1.769 1.7.432 2.415-2.163-1.157-2.163 1.157.432-2.415-1.769-1.7 2.43-.335 1.07-2.207zm8.5 0l1.07 2.207 2.43.335-1.769 1.7.432 2.415-2.163-1.157-2.163 1.157.432-2.415-1.769-1.7 2.43-.335 1.07-2.207zm8.5 0l1.07 2.207 2.43.335-1.769 1.7.432 2.415-2.163-1.157-2.163 1.157.432-2.415-1.769-1.7 2.43-.335 1.07-2.207zm-.993-3.343h-.01c.022-4.906-2.246-2.772-2.246-6.676 0-1.507.983-2.324 2.248-2.324 1.869 0 3.169 1.787 1.399 5.129-.581 1.099.62 1.359 1.91 1.657 1.118.258 1.192.805 1.192 1.751v2.463h-4.493v-2zm-19.507 2v-2.463c0-.946.074-1.493 1.192-1.751 1.29-.298 2.491-.558 1.91-1.657-1.77-3.342-.47-5.129 1.399-5.129 1.265 0 2.248.817 2.248 2.324 0 3.904-2.268 1.77-2.246 6.676h.005v2h-4.508zm6 0v-2.623c0-1.258.1-1.985 1.588-2.329 1.684-.389 3.344-.736 2.545-2.209-2.366-4.364-.674-6.839 1.866-6.839 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l.001 2.619h-12z"/></svg>';
            lebelBtnContact.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="contact_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><title>Contacto</title><path class="cls-1" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z"/></svg>'
            );
            lebelBtnLegals.innerHTML = setIconContainer(
                '<svg class="icon_svg nav_menu_icon_svg" id="legals_icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="clr-1"  d="M20 2C20.5523 2 21 2.44772 21 3V6.757L19 8.757V4H5V20H19V17.242L21 15.242V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM13 12V14H8V12H13ZM16 8V10H8V8H16Z"></path></svg>'
            );
            menuBtn.style.display = none;
            phoneMenu.style.display = none;
            menuContainer.style.display = flx;
            menuSocialContainer.style.display = flx;

            if (menuStatus === open) {
                menuActions(menuStatus);
            }
            if (menuSocialStatus === open) {
                menuSocialActions(menuSocialStatus);
            }
        } else if (widConf <= secondBreak) {
            copyrightText.style.marginLeft = "0";
            menuBtn.style.display = flx;
            menuContainer.style.display = none;
            menuSocialContainer.style.display = none;

            if (menuStatus === open) {
                menuActions(menuStatus);
            }
            if (menuSocialStatus === open) {
                menuSocialActions(menuSocialStatus);
            }
        }
    };
    setTimeout(() => configSize(window.innerWidth), 200);
    //! */

    //!
    const menuBtnBars = selectorAll(".bar");
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

            btnLogo.style.width = "7rem";
            btnLogo.style.height = "7rem";
            menuBtnBars.forEach((bar) => (bar.style.height = "4px"));

            setTimeout(() => {
                phoneMenu.style.top = 0;
                phoneMenu.style.bottom = "inherit";
                phoneMenu.style.flexDirection = "column";
                phoneMenu.style.borderRadius = `0 0 ${borderRadius} ${borderRadius}`;

                if (menuStatus === close) {
                    phoneMenu.style.transform = "translateY(-100%)";
                }
            }, 500);
        } else if (navTop < windowHeight) {
            nav.style.height = "6rem";

            menuBtnBars.forEach((bar) => (bar.style.height = "2px"));

            menuSocialContainer.style.top = "inherit";
            menuSocialContainer.style.bottom = "2rem";
            menuSocialContainer.style.flexDirection = "column-reverse";

            btnLogo.style.width = "5rem";
            btnLogo.style.height = "5rem";

            setTimeout(() => {
                phoneMenu.style.top = "inherit";
                phoneMenu.style.bottom = 0;
                phoneMenu.style.flexDirection = "column-reverse";
                phoneMenu.style.borderRadius = `${borderRadius} ${borderRadius} 0 0`;
                if (menuStatus === close) {
                    phoneMenu.style.transform = "translateY(100%)";
                }
            }, 500);
        }
    };
    setTimeout(() => checkWindowHeight(), 500);
    const toTheTop = () => {
        const currentPosition = BODY.getBoundingClientRect().top;
        window.scrollTo(currentPosition, 0);
    };
    const scrollToSection = (btn) => {
        const section = selector(`#${btn.name}`);
        const windowTop = window.top;
        const windowHeight = window.innerHeight / 2;
        const sectionTop = section.getBoundingClientRect().top;
        const navHeight = nav.getBoundingClientRect().height;
        const navTop = nav.getBoundingClientRect().top;

        if (navTop >= windowHeight) {
            let fixTop = sectionTop - navHeight;
            window.scrollBy(windowTop, fixTop);
        } else if (navTop < windowHeight) {
            let fixTop = sectionTop - navHeight;
            window.scrollBy(windowTop, fixTop);
        }
    };

    const createProjectCardHot = async () => {
        let filterHotData = [];
        hotCardsSelection.forEach((hotProject) => {
            fetchData.forEach((project) => {
                if (hotProject === project.db_name) {
                    filterHotData.push(project);
                }
            });
        });
        filterHotData.forEach((item) => {
            createCard(item, fragmentHotProjects, "card_up");
        });
        selector(".cards_hot_container").appendChild(fragmentHotProjects);
        setTimeout(() => {
            selector(".cards_hot_container")
                .querySelectorAll(".project_card")
                .forEach((card) => {
                    card.classList.add("card_up");
                });
        }, 100);
        setTimeout(swipingAnimation, 500);
    };

    const portfolioCardsContainer = selector(".cards_portfolio_container");
    const clearPortfolio = () => {
        deleteArrElements(fragmentPortfolioProjects);
        deleteChildElements(portfolioCardsContainer);
    };
    const openPortfolioModal = (target) => {
        clearListBtns();
        clearPortfolio();
        const modalToOpen = target.getAttribute("data-name");
        const currentProjectDetails = [];
        const createPortfolioProjects = () => {
            fetchData.forEach((data) => {
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
            extraListContainer.appendChild(fragmentBtns);
            portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
        };

        createPortfolioProjects();
        modalWindowActions(selector(`.${modalToOpen}`), open);
        let dataToCheck = [];
        const activateExtraBtns = (btn) => {
            listExtrasActions();
            portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });
            const newName = btn.getAttribute("data-name");
            searchExtraListBtn.setAttribute("data-name", newName);
            searchExtraListBtn.querySelector(".label_btn").textContent = newName;
            if (dataToCheck.length === 0) {
                dataToCheck = fetchData;
            }
            let extraDataToCheck = [];
            clearPortfolio();
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
            portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
        };
        selectorAll(".list_portfolio_btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                searchExtraListBtn.setAttribute("data-name", "Todo");
                searchExtraListBtn.querySelector(".label_btn").textContent = "Todo";
                portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });
                clearListBtns();
                const newName = btn.getAttribute("data-name");
                searchPortfolioListBtn.setAttribute("data-name", newName);
                searchPortfolioListBtn.querySelector(".label_btn").textContent = newName;
                listPortfolioActions();
                clearPortfolio();
                dataToCheck = [];
                newName !== "Todo" ? (dataToCheck = fetchData.filter((item) => item.projects.type_name === newName)) : (dataToCheck = fetchData);

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

                extraListContainer.appendChild(fragmentBtns);
                dataToCheck.forEach((data) => {
                    createCard(data, fragmentPortfolioProjects);
                });
                portfolioCardsContainer.appendChild(fragmentPortfolioProjects);
                selectorAll(".extra_list_btn").forEach((btn) => {
                    btn.addEventListener("click", () => activateExtraBtns(btn));
                });
            });
        });
        selectorAll(".extra_list_btn").forEach((btn) => {
            btn.addEventListener("click", () => activateExtraBtns(btn));
        });
    };
    //^CREATE PROJECT RANDOM CARDS

    /* loadersContainers.forEach((loader) => {
        const watchCardsContainers = ([entry]) => {
            animateItem(spinnerSearchCardContainer, "0", "translateY(-4rem)");
            setTimeout(() => {
                loaderHotCardsContainer.style.display = none;
                setTimeout(() => {
                    loadersObserver.unobserve(spinnerSearchCardContainer);
                }, 500);
            }, 1200);
        };
        const optionsIO_loaders = {
            threshold: ".5",
        };
        const loadersObserver = new IntersectionObserver(watchCardsContainers, optionsIO_loaders);
        loadersObserver.observe(loader);
    }); */

    selector(".storage_accept").addEventListener("click", () => {
        johnK_storage["page_alert_status"] = close;
        modalWindowActions(alertModal, close);

        localStorage.setItem(storageName, JSON.stringify(johnK_storage));
        console.log(localStorage.getItem(storageName));
    });
    const legalModal = selector(".legal_modal");
    selectorAll(".inner_link_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = btn.getAttribute("data-current");
            const next = btn.getAttribute("data-next");
            const currentModal = selector(`.${current}`);
            const nextModal = selector(`.${next}`);
            animateItem(currentModal, 0, "translate(-50%,-50%)");
            setTimeout(() => {
                currentModal.style.display = none;
                nextModal.style.display = flx;
                setTimeout(() => {
                    animateItem(nextModal, 1, "translate(-50%,0)");
                }, 200);
            }, 600);
        });
    });
    selectorAll(".link_btn").forEach((btn) =>
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
    selector(".legal_modal_accept_btn").addEventListener("click", () => {
        selector(".modal_info_legal").scrollTo({ top: 0, behavior: `smooth` });
        setTimeout(() => modalWindowActions(legalModal, close), 250);
    });
    selectorAll(".close_modal").forEach((btn) =>
        btn.addEventListener("click", () => {
            const btnName = btn.getAttribute("data-name");
            const currentBtn = selector(`.${btnName}`);

            const infoModal = selector(".modal_info_legal");

            if (btnName === "legal_modal") {
                infoModal.scrollTo({ top: 0, behavior: `smooth` });
                setTimeout(() => {
                    modalWindowActions(currentBtn, close);
                }, 500);
            } else if (btnName === "portfolio_modal") {
                portfolioCardsContainer.scrollTo({ top: 0, behavior: `smooth` });

                setTimeout(() => {
                    modalWindowActions(currentBtn, close);
                    setTimeout(() => {
                        searchExtraListBtn.setAttribute("data-name", "Todo");
                        searchExtraListBtn.querySelector(".label_btn").textContent = "Todo";
                        searchPortfolioListBtn.setAttribute("data-name", "Todo");
                        searchPortfolioListBtn.querySelector(".label_btn").textContent = "Todo";
                    }, 250);
                }, 500);
            } else {
                modalWindowActions(currentBtn, close);
            }
        })
    );
    selectorAll(".section").forEach((section) => {
        const watchPage = ([entry]) => {
            if (entry.isIntersecting) {
                const entryName = entry.target.attributes.id.value;
                selectorAll(".section_btn").forEach((btn) => {
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
    const navResizeObserve = new ResizeObserver(([entry]) => {
        configSize(entry.contentRect.width);
    });
    navResizeObserve.observe(nav);

    //! NO BORRAR --EDITAR SOLO MIENTRAS ES DEBIDO

    const listPortfolioActions = () => {
        portfolioListContainer.classList.toggle("list_down");
        searchPortfolioListBtn.classList.toggle("list_btn_active");
        searchPortfolioListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
        portfolioListContainer.children[0].focus();
    };
    const listExtrasActions = () => {
        extraListContainer.classList.toggle("list_down");
        searchExtraListBtn.classList.toggle("list_btn_active");
        searchExtraListBtn.querySelector(".arrow_list_icon").classList.toggle("arrow_list_icon_active");
        extraListContainer.children[0].focus();
    };
    searchPortfolioListBtn.addEventListener("click", () => {
        listPortfolioActions();
    });
    searchExtraListBtn.addEventListener("click", () => {
        listExtrasActions();
    });
    // ! START FETCHING PROJECTS DATA FOR ALL CARDS  //
    const extraListBtnTemplate = selector(".extra_list_btn_template").content;
    const fragmentBtns = $d.createDocumentFragment();
    const clearListBtns = () => {
        deleteArrElements(fragmentBtns);
        deleteChildElements(extraListContainer);
    };
    const createExtraListbtn = (type) => {
        const newTemplate = extraListBtnTemplate.cloneNode(true);
        const newBtn = newTemplate.querySelector(".extra_list_btn");
        const btnLabel = newTemplate.querySelector(".label_btn");
        btnLabel.textContent = type;
        newBtn.setAttribute("data-name", type);
        fragmentBtns.appendChild(newBtn);
    };

    selector(".btn_down").addEventListener("click", () => {
        const windowHeight = window.innerHeight;
        const navHeight = nav.getBoundingClientRect().height;
        const fixHeight = windowHeight - navHeight;
        window.scrollTo(0, fixHeight);
    });
    selectorAll(".accessibility_btn").forEach((btn) => {
        btn.addEventListener("click", () => scrollToSection(btn));
    });
    selectorAll(".action_menu").forEach((btn) => {
        btn.addEventListener("click", () => menuActions(menuStatus));
    });
    selectorAll(".section_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollToSection(btn);
        });
    });
    selectorAll(".social_menu_btn").forEach((btn) => {
        btn.addEventListener("enter", () => menuSocialActions(menuSocialStatus));
        btn.addEventListener("click", () => menuSocialActions(menuSocialStatus));
    });
    selectorAll(".contact_btn").forEach((btn) => {
        btn.addEventListener("enter", () => modalWindowActions(contactModal, open));
        btn.addEventListener("click", () => modalWindowActions(contactModal, open));
    });
    selectorAll(".btn_hero").forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollToSection(btn);
        });
    });
    selectorAll(".portfolio_btn").forEach((btn) => {
        btn.addEventListener("click", () => openPortfolioModal(btn));
    });
    const tooltipMargin = 12;
    const illustrationMe = selector(".desk_me");
    const illustrationRex = selector(".dog");
    illustrationMe.addEventListener("mouseover", (e) => {
        bubbleBio.style.display = flx;
        bubbleBio.style.opacity = 1;
        const containerWidth = bubbleBio.getClientRects()[0].width;
        const containerHeight = bubbleBio.getClientRects()[0].height;
        bubbleBio.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY - containerHeight / 2}px)`;
    });
    bubbleBio.addEventListener("mouseleave", () => {
        bubbleBio.style.display = none;
        bubbleBio.style.opacity = 0;
    });
    illustrationRex.addEventListener("mouseover", (e) => {
        bubbleRex.style.display = flx;
        bubbleRex.style.opacity = 1;
        const containerWidth = bubbleRex.getClientRects()[0].width;
        bubbleRex.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
    });
    illustrationRex.addEventListener("mouseleave", () => {
        bubbleRex.style.display = none;
        bubbleRex.style.opacity = 0;
    });
    selectorAll(".animation_key").forEach((key) => {
        const tabletScreen = selector(".desk_tablet_screen");
        key.addEventListener("mouseover", () => {
            switch (key.getAttribute("data-key")) {
                case "dev":
                    selectorAll(".dev_icon").forEach((icon) => {
                        icon.classList.add("icon_show");
                    });
                    shieldScreen.classList.remove("screen_hide");
                    devTabletScreen.classList.remove("screen_hide");
                    setTimeout(() => devScreen.classList.remove("screen_hide"), 250);
                    break;
                case "illustration":
                    selectorAll(".illustration_icon").forEach((icon) => {
                        icon.classList.add("icon_show");
                    });
                    illustrationScreen.classList.remove("screen_hide");
                    illustrationTabletScreen.classList.remove("screen_hide");
                    break;
                case "design":
                    selectorAll(".design_icon").forEach((icon) => {
                        icon.classList.add("icon_show");
                    });
                    designScreen.classList.remove("screen_hide");
                    designTabletScreen.classList.remove("screen_hide");
                    break;
            }

            tabletScreen.classList.add("tablet_screen_on");
        });

        key.addEventListener("mouseleave", () => {
            switch (key.getAttribute("data-key")) {
                case "dev":
                    selectorAll(".dev_icon").forEach((icon) => {
                        icon.classList.remove("icon_show");
                    });
                    devScreen.classList.add("screen_hide");

                    devTabletScreen.classList.add("screen_hide");
                    setTimeout(() => shieldScreen.classList.add("screen_hide"), 250);
                    break;
                case "illustration":
                    selectorAll(".illustration_icon").forEach((icon) => {
                        icon.classList.remove("icon_show");
                    });
                    illustrationScreen.classList.add("screen_hide");
                    illustrationTabletScreen.classList.add("screen_hide");
                    break;
                case "design":
                    selectorAll(".design_icon").forEach((icon) => {
                        icon.classList.remove("icon_show");
                    });
                    designScreen.classList.add("screen_hide");
                    designTabletScreen.classList.add("screen_hide");
                    break;
            }
            tabletScreen.classList.remove("tablet_screen_on");
        });
    });
    selectorAll("FORM").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            sanitizeInput(form.querySelector(".input_name"));
            sanitizeInput(form.querySelector(".input_last_name"));
            sanitizeInput(form.querySelector(".input_email"));
            sanitizeInput(form.querySelector(".input_description"));
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
                    formResponseContainer.style.display = "block";
                    setTimeout(() => {
                        formResponseContainer.style.opacity = "1";
                    }, 500);
                } else if (action === close) {
                    formResponseContainer.style.opacity = "0";
                    setTimeout(() => {
                        formResponseContainer.style.display = "none";
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
    selectorAll(".theme_btn").forEach((btn) => {
        btn.addEventListener("click", () => changeTheme(currentTheme));
    });
    setTimeout(() => {
        selectorAll(".skill_badge").forEach((badge) => {
            badge.addEventListener("mouseover", (e) => {
                const newData = infoSoftware.filter((item) => item.db_name === badge.getAttribute("data-name"));
                bubbleInfo.querySelector(".title").textContent = newData[0].tech_complete_name;
                bubbleInfo.querySelector(".description").textContent = newData[0].tech_info;
                bubbleInfo.style.display = flx;
                const containerWidth = bubbleInfo.getClientRects()[0].width;
                bubbleInfo.style.transform = `translate(${e.pageX - containerWidth / 2}px, ${e.pageY + tooltipMargin}px)`;
                bubbleInfo.style.opacity = 1;
            });
            badge.addEventListener("mouseleave", () => {
                bubbleInfo.style.opacity = 0;
                bubbleInfo.style.display = none;
            });
        });
    }, 250);
    btnLogo.addEventListener("click", toTheTop);
    window.addEventListener("scroll", () => {
        if (menuSocialStatus == open) {
            menuSocialActions(menuSocialStatus);
        }
        checkWindowHeight();
    });

    const observer = new PerformanceObserver((list) => {
        let perfEntries = list.getEntries();
        let lastEntry = perfEntries[perfEntries.length - 1];
        // Process the latest candidate for largest contentful paint
        /*  console.log(lastEntry); */
    });
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
});
