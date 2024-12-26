function changeImage(direction, event) {
    const pai = event.target.parentNode;
    const images = pai.querySelectorAll('.images img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[activeIndex].classList.remove('active');
    
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    // Adiciona a classe 'active' na nova imagem para aplicar a transição de opacidade
    images[newIndex].classList.add('active');

    // Animação com GSAP nos botões de navegação (setas)
    gsap.to(event.target, {
        scaleX: 1.2114, // Aumenta o tamanho do botão
        duration: 0.2, // Duração da animação
        ease: "power1.out", // Tipo de transição
        yoyo: true, // Faz a animação voltar ao estado inicial
        repeat: 1 // Repete a animação
    });
}

function createProject(restrictions, priority, title, team, description, imageArray, link) {
    let contem;

    // Criação do container principal
    const portfolioContainer = document.createElement('div');
    portfolioContainer.className = 'portfolio-box';

    // Título do projeto
    const projectTitle = document.createElement('div');
    projectTitle.className = 'project-title';
    projectTitle.textContent = title;
    portfolioContainer.appendChild(projectTitle);

    // Seção da equipe
    const teamSection = document.createElement('div');
    teamSection.className = 'section';

    const teamTitle = document.createElement('div');
    teamTitle.className = 'section-title';
    teamTitle.textContent = 'Equipe';
    teamSection.appendChild(teamTitle);

    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';

    team.forEach(member => {
        const memberP = document.createElement('p');
        memberP.textContent = member;
        teamDiv.appendChild(memberP);
    });

    teamSection.appendChild(teamDiv);
    portfolioContainer.appendChild(teamSection);

    // Seção de descrição
    contem = restrictions.includes("descricao");
    if(!contem) {
        const descriptionSection = document.createElement('div');
        descriptionSection.className = 'section';

        const descriptionTitle = document.createElement('div');
        descriptionTitle.className = 'section-title';
        descriptionTitle.textContent = 'Descrição';
        descriptionSection.appendChild(descriptionTitle);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'description';

        const descriptionP = document.createElement('p');
        descriptionP.textContent = description;
        descriptionDiv.appendChild(descriptionP);

        descriptionSection.appendChild(descriptionDiv);
        portfolioContainer.appendChild(descriptionSection);
    }

    // Seção de imagens
    const imageSection = document.createElement('div');
    imageSection.className = 'section';

    const imageTitle = document.createElement('div');
    imageTitle.className = 'section-title';
    imageTitle.textContent = 'Imagens do Aplicativo';
    imageSection.appendChild(imageTitle);

    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'images';

    imageArray.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Imagem do aplicativo ${index + 1}`;
        if (index === 0) img.className = 'active';
        imagesDiv.appendChild(img);
    });

    // Botões de navegação de imagens
    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow arrow-left';
    leftArrow.textContent = '<';
    leftArrow.addEventListener('click', event => changeImage(-1, event));
    imagesDiv.appendChild(leftArrow);

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow arrow-right';
    rightArrow.textContent = '>';
    rightArrow.addEventListener('click', event => changeImage(1, event));
    imagesDiv.appendChild(rightArrow);

    imageSection.appendChild(imagesDiv);
    portfolioContainer.appendChild(imageSection);
    
    // Seção de link do projeto
    contem = restrictions.includes("github");
    if(!contem) {
        const linkSection = document.createElement('div');
        linkSection.className = 'section';
    
        const linkTitle = document.createElement('div');
        linkTitle.className = 'section-title';
        linkTitle.textContent = 'Link do Projeto';
        linkSection.appendChild(linkTitle);
    
        const linkDiv = document.createElement('div');
        linkDiv.className = 'github-link';
    
        const linkAnchor = document.createElement('a');
        linkAnchor.href = link;
        linkAnchor.target = '_blank';
        linkAnchor.textContent = 'Veja no GitHub';
        linkDiv.appendChild(linkAnchor);
    
        linkSection.appendChild(linkDiv);
        portfolioContainer.appendChild(linkSection);
    }
    else if(!restrictions.includes("docs")) {
        const linkSection = document.createElement('div');
        linkSection.className = 'section';
    
        const linkTitle = document.createElement('div');
        linkTitle.className = 'section-title';
        linkTitle.textContent = 'Link do Projeto';
        linkSection.appendChild(linkTitle);
    
        const linkDiv = document.createElement('div');
        linkDiv.className = 'github-link';
    
        const linkAnchor = document.createElement('a');
        linkAnchor.href = link;
        linkAnchor.target = '_blank';
        linkAnchor.textContent = 'Veja no Google Docs';
        linkDiv.appendChild(linkAnchor);
    
        linkSection.appendChild(linkDiv);
        portfolioContainer.appendChild(linkSection);
    }

    // Retorna o elemento completo
    return portfolioContainer;
}

let listOfProjects = [];
let listOfDocumentation = [];
let listOfOthers = [];

function renderProjects(fatherID) {
    let section = document.getElementById(fatherID)

    // Adiciona os projetos ordenados pela prioridade
    switch(fatherID) {
        case 'projetos':
            listOfProjects
                .sort((a, b) => b.priority - a.priority) // Ordem decrescente por prioridade
                .forEach(project => {
                    section.appendChild(project.element);
                });
        case 'documentos':
            listOfDocumentation
                .sort((a, b) => b.priority - a.priority) // Ordem decrescente por prioridade
                .forEach(project => {
                    section.appendChild(project.element);
                });
        case 'outros':
            listOfOthers
                .sort((a, b) => b.priority - a.priority) // Ordem decrescente por prioridade
                .forEach(project => {
                    section.appendChild(project.element);
                });
    }
}

function addProject(restrictions, priority, title, team, description, imageArray, link, sectionID) {
    switch(sectionID) {
        case 'projetos':
            const projectElement = createProject(restrictions, priority, title, team, description, imageArray, link);
            listOfProjects.push({ priority, element: projectElement });
            break;
        case 'documentos':
            const documentationElement = createProject(restrictions, priority, title, team, description, imageArray, link);
            listOfDocumentation.push({ priority, element: documentationElement });
            break;
        case 'outros':
            const otherElement = createProject(restrictions, priority, title, team, description, imageArray, link);
            listOfOthers.push({ priority, element: otherElement });
            break;
    }
    renderProjects(sectionID);
}

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PROJETOS 
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

addProject(
    '',
    3000,
    'Compilador Online de Lua',
    ['João Gabriel, Emanuel Franklyn, Hugo e Leonardo'],
    'Criado para otimizar o tempo durante o minicurso (ministrado por mim e Emanuel) Desvendando Lua: Conceito, Sintaxe e Aplicações...',
    [
        './assets/desvendandoLua0.png',
        './assets/desvendandoLua1.png',
        './assets/desvendandoLua2.png',
        './assets/desvendandoLua3.png',
        './assets/desvendandoLua4.png',
        './assets/desvendandoLua5.png',
    ],
    'https://github.com/Osoapy/Desvendando-Lua',
    'projetos'
);

addProject(
    '',
    2000,
    'Flies And Food',
    ['João Gabriel'],
    'Uma rede neural artificial feita em Lua (e apresentada com o framework de jogos Love2D) que utiliza aleatoriedade, pesos e algoritmos geracionais para de adaptar a necessidade de chegar a comida. Com algumas gerações de prática a maioria das moscas se tornam capazes de chegar até a comida. No seu README é possível encontrar o modelo lógico por trás...',
    [
        './assets/FliesAndFood0.png',
        './assets/FliesAndFood1.png',
        './assets/FliesAndFood2.png',
        './assets/FliesAndFood3.png',
    ],
    'https://github.com/Osoapy/Flies-And-Food',
    'projetos'
);

addProject(
    '',
    1000,
    'Lan House Central',
    ['João Gabriel, Kahê Mikayas, Daniel Lima e Alexandre Evangelista'],
    'Um site que além de apresentar a Lan House Central e sua história torna possível a manutenção de horários digitalmente através de um CRUD em Javascript...',
    [
        './assets/lanHouse0.png',
        './assets/lanHouse1.png',
        './assets/lanHouse2.png',
        './assets/lanHouse3.png',
        './assets/lanHouse4.png',
        './assets/lanHouse5.png',
        './assets/lanHouse6.png',
    ],
    'https://github.com/Osoapy/Lan-House-Central-CRUD',
    'projetos'
);

addProject(
    '',
    1500,
    'Love2d Watchlist',
    ['João Gabriel'],
    'Projeto pra cadeira de POO, porém, utilizando Lua (e o framework Love2d) de um modo único para gerar o encapsulamento de variáveis e armazenamento de dados para fazer um CRUD de 3 entidades...',
    [
        './assets/watchlist0.png',
        './assets/watchlist1.png',
        './assets/watchlist2.png',
        './assets/watchlist3.png',
    ],
    'https://github.com/Osoapy/Love2d-Watchlist-CRUD',
    'projetos'
);

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
DOCUMENTAÇÃO
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

addProject(
    'github docs',
    1000,
    'Slides Do Minicurso Desvendando Lua',
    ['João Gabriel, Emanuel Franklyn'],
    'Conteúdo passado no laboratório para ensinar os conceitos, sintaxe e aplicações da Linguagem Lua...',
    [
        './assets/miniLua/1.png',
        './assets/miniLua/2.png',
        './assets/miniLua/3.png',
        './assets/miniLua/4.png',
        './assets/miniLua/5.png',
        './assets/miniLua/6.png',
        './assets/miniLua/7.png',
        './assets/miniLua/8.png',
        './assets/miniLua/9.png',
        './assets/miniLua/10.png',
        './assets/miniLua/11.png',
        './assets/miniLua/12.png',
        './assets/miniLua/13.png',
        './assets/miniLua/14.png',
        './assets/miniLua/15.png',
        './assets/miniLua/16.png',
        './assets/miniLua/17.png',
        './assets/miniLua/18.png',
        './assets/miniLua/19.png',
        './assets/miniLua/20.png',
        './assets/miniLua/21.png',
        './assets/miniLua/22.png',
        './assets/miniLua/23.png',
        './assets/miniLua/24.png',
        './assets/miniLua/25.png',
        './assets/miniLua/26.png',
    ],
    '',
    'documentos'
);

addProject(
    'github',
    3000,
    'Projeto BikeShare Connect',
    ['João Gabriel, Victor Ivis, Daniel Lima'],
    'Uma apresentação pitch, quadro branco e tecnologias utilizadas para o projeto BikeShare Connect, um aplicativo capaz de prover um meio de locomoção sustentável para as cidades...',
    [
        './assets/bikeShare/1.png',
        './assets/bikeShare/2.png',
        './assets/bikeShare/3.png',
        './assets/bikeShare/4.png',
        './assets/bikeShare/5.png',
        './assets/bikeShare/whiteBoard1.png',
        './assets/bikeShare/whiteBoard2.png',
        './assets/bikeShare/whiteBoard3.png',
    ],
    'https://docs.google.com/document/d/1MtKOUhWEWvP6k7cArGQNRSbvr2d7DX1SqmWGvzkNIEg/edit?tab=t.0',
    'documentos'
);

addProject(
    'github docs',
    2000,
    'Lan House Central',
    ['João Gabriel, Kahê Mikayas, Daniel Lima e Alexandre Evangelista'],
    'Slides do projeto da Lan House central, contendo as tecnologias utilizadas...',
    [
        './assets/lanHouse/1.png',
        './assets/lanHouse/2.png',
        './assets/lanHouse/3.png',
        './assets/lanHouse/4.png',
        './assets/lanHouse/5.png',
        './assets/lanHouse/6.png',
    ],
    '',
    'documentos'
);

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
OUTROS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

addProject(
    'github descricao docs',
    3000,
    'Logos criadas por mim',
    ['João Gabriel'],
    '',
    [
        './assets/logos/logo0.png',
        './assets/logos/logo1.png',
        './assets/logos/logo2.png',
        './assets/logos/logo3.png',
    ],
    '',
    'outros'
);