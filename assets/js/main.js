// Função genérica para atualizar elementos de perfil
function updateElementText(elementId, textContent) {
    const element = document.getElementById(elementId)
    if (element) element.innerText = textContent
}

function updateElementHref(elementId, textContent, hrefPrefix) {
    const element = document.getElementById(elementId)
    if (element) {
        element.innerText = textContent
        element.href = `${hrefPrefix}:${textContent}`
    }
}

function updateProfileInfo(profileData) {
    const { photo, name, job, location, phone, email } = profileData

    const photoElement = document.getElementById('profile.photo')
    if (photoElement) {
        photoElement.src = photo
        photoElement.alt = name
    }

    updateElementText('profile.name', name)
    updateElementText('profile.job', job)
    updateElementText('profile.location', location)
    updateElementHref('profile.phone', phone, 'tel')
    updateElementHref('profile.email', email, 'mailto')
}

function updateList(elementId, items, templateCallback) {
    const element = document.getElementById(elementId)
    if (element) {
        let content = ''
        items.forEach(item => content += templateCallback(item))
        element.innerHTML = content
    }
}

function updateSoftSkills(profileData) {
    updateList('profile.skills.softSkills', profileData.skills.softSkills, skill => `<li>${skill}</li>`)
}

function updateHardSkills(profileData) {
    updateList('profile.skills.hardSkills', profileData.skills.hardSkills, skill => `
        <li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>
    `)
}

function updateLanguages(profileData) {
    updateList('profile.languages', profileData.languages, language => `<li>${language}</li>`)
}

function updatePortfolio(profileData) {
    updateList('profile.portfolio', profileData.portfolio, project => `
        <li>
            <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
            <a href="${project.url}" target="_blank">${project.url}</a>
        </li>
    `)
}

function updateProfessionalExperience(profileData) {
    updateList('profile.professionalExperience', profileData.professionalExperience, experience => `
        <li>
            <h3 class="title">${experience.name}</h3>
            <p class="period">${experience.period}</p>
            <p>${experience.description}</p>
        </li>
    `)
}

async function init() {
    try {
        const profileData = await fetchProfileData()
        updateProfileInfo(profileData)
        updateSoftSkills(profileData)
        updateHardSkills(profileData)
        updateLanguages(profileData)
        updatePortfolio(profileData)
        updateProfessionalExperience(profileData)
    } catch (error) {
        console.error('Failed to load profile data:', error)
    }
}

init()
