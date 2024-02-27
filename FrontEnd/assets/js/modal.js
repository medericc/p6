function openModal(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    
    // Check si caz existe
    if (!target) {
        console.error("L'élément cible n'existe pas dans le DOM.");
        return;
    }

    modalGal();

    setTimeout(function() {
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.removeAttribute('aria-modal', 'true');
    }, 100);
    
    modal = target;
    
    // there is classe js-modal-close
    const modalCloseButton = modal.querySelector('.js-modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    // same with .js-modal-stop
    const modalStopButton = modal.querySelector('.js-modal-stop');
    if (modalStopButton) {
        modalStopButton.addEventListener('click', stopPropagation);
    }

    // clic out screen
    window.addEventListener('click', outsideClickHandler);
}

function outsideClickHandler(event) {
    if (modal && !modal.contains(event.target) && event.target !== modal) {
        closeModal(event);
    }
}

function closeModal(e) {
    if (modal === null) return;
    e.preventDefault();

    const closeButton = modal.querySelector('.js-modal-close');
    const stopButton = modal.querySelector('.js-modal-stop');

    if (closeButton) {
        closeButton.removeEventListener('click', closeModal);
    }
    if (stopButton) {
        stopButton.removeEventListener('click', stopPropagation);
    }

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal = null;

    // remove event clic out
    window.removeEventListener('click', outsideClickHandler);
}

// close modal
function outsideClickHandler(event) {
    if (modal && !modal.contains(event.target) && event.target !== modal) {
        closeModal(event);
    }
}

const modaleSectionProjets = document.querySelector('.modal-wrapper');
async function populateModalWithData(data) {
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        modaleSectionProjets.appendChild(div);
        
        const img = document.createElement("img");
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        div.appendChild(img);
        
        const p = document.createElement("p");
        div.appendChild(p);
        
        const icon = document.createElement("i");
        p.appendChild(icon);

        // pour supprimùer
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Supprimer";
        deleteButton.addEventListener("click", async () => {
            try {
                // requete delete a api
                const response = await fetch(`http://localhost:5678/api/works/${data[i].id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("La suppression du travail a échoué.");
                }
                
                // sortir aussi du dom/html
                div.remove();
            } catch (error) {
                console.error("Erreur lors de la suppression du travail :", error);
            }
        });
        div.appendChild(deleteButton);
    }
}


// aller chercher les donnees
async function modalGal() { 
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        console.log('Projets récupérés:', data); 
        
        // call modal avec donnees collect
        await populateModalWithData(data);
        
        return data;
    } catch (error) {
        console.error('Erreur de récupération des données des travaux:', error);
        throw error; 
    }
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
});
