<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", (event) => {
    
  
const aside = document.querySelector('#modall');
const modalAjout = document.getElementById('modalAjoutPhoto');
const closeButton = document.querySelector('.close');
const ferme = document.getElementById('ferme');
let modalShouldClose = true;
modalGal();


ferme.addEventListener('click', function () {
    closeModal()
});


const modifier = document.getElementById('modifierProjetLink');
modifier.addEventListener('click', function () {
    aside.classList.remove("dnone");
});

function openModal(e) {
    e.preventDefault();

    // modall
    const target = document.querySelector(e.target.getAttribute('href'));
   

    const modifier = document.getElementById('ajouterProjetLink');
    modifier.addEventListener('click', function () {
        modalAjoutPhoto();
        return;
    });
 
    if (!target) {
        console.error("L'élément cible n'existe pas dans le DOM.");
        return;
    }

    modal = target;

    
   /* const modalCloseButton = modal.querySelector('.js-modal-close');
=======
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
>>>>>>> faa00a01777323224d54b3bd6035f8caaa686220
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

<<<<<<< HEAD
  
    const modalStopButton = modal.querySelector('.js-modal-stop');
    if (modalStopButton) {
        modalStopButton.addEventListener('click', stopPropagation);
    } */

  
    // window.addEventListener('click', outsideClickHandler);
}


/* function outsideClickHandler(event) {
    if (modal && !modal.contains(event.target) && event.target !== modal) {
        if (modalShouldClose) {
            closeModal(event);
        }
=======
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
>>>>>>> faa00a01777323224d54b3bd6035f8caaa686220
    }
}
*/

Array.from(closeButton).forEach(element => {
    element.addEventListener('click',closeModal())
});

function closeModal() {
    aside.classList.add("dnone");
    modalAjout.classList.add("dnone");
    // if (modal === null) return;
    // e.preventDefault();

    // const closeButton = modal.querySelector('.js-modal-close');

    /* if (closeButton) {
        closeButton.removeEventListener('click', closeModal);
    } */

    //modal.style.display = 'none';
    //modal.setAttribute('aria-hidden', 'true');
    //modal.removeAttribute('aria-modal');
    // modal.removeEventListener('click', closeModal);
    // modal = null;

   
   // window.removeEventListener('click', outsideClickHandler);
}

// create modal gallery project
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

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Supprimer";
        deleteButton.addEventListener("click", async (event) => {
            event.stopPropagation(); 

            modalShouldClose = false; 

            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error("L'utilisateur n'est pas authentifié.");
                }

               
                const response = await fetch(`http://localhost:5678/api/works/${data[i].id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("La suppression du travail a échoué.");
                }

                
                div.remove();
            } catch (error) {
                console.error("Erreur lors de la suppression du travail :", error);
            } finally {
                modalShouldClose = true; 
            }
        });
        div.appendChild(deleteButton);
    }
}

async function modalGal() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        console.log('Projets récupérés:', data);

      
        await populateModalWithData(data);

        return data;
    } catch (error) {
        console.error('Erreur de récupération des données des travaux:', error);
        throw error;
    }
}


<<<<<<< HEAD
const stopPropagation = function (e) {
    e.stopPropagation();
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});


window.addEventListener('keydown', function (e) {
=======
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
>>>>>>> faa00a01777323224d54b3bd6035f8caaa686220
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
});
<<<<<<< HEAD


async function modalAjoutPhoto() {
    aside.classList.add("dnone");
    modalAjout.classList.remove("dnone");
    
    // add project form
    const formAjoutPhoto = document.getElementById('formAjoutPhoto');

    const backButton = modalAjout.querySelector('#retourGalerie');
    console.log(backButton)
    
    backButton.addEventListener('click', function() {
        event.preventDefault();
       
        aside.classList.remove("dnone");
        modalAjout.classList.add("dnone");
        
       
    });

   
    // modalAjout.style.display = 'block';
    // modalAjout.removeAttribute('aria-hidden');
    // modalAjout.removeAttribute('aria-modal', 'true');


    const modalCloseButton = document.getElementById(ferme)
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    
    const modalStopButton = document.getElementById(ferme)
    if (modalStopButton) {
        modalStopButton.addEventListener('click', stopPropagation);
    }

  
    //window.addEventListener('click', outsideClickHandler);

  
    formAjoutPhoto.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        const formData = new FormData(); 
       console.log(formAjoutPhoto)
      const titrePhoto = document.getElementById('titrePhoto').value
      const catPhoto = document.getElementById('categoriePhoto').value
      const imgPhoto = document.getElementById('pictureProjet').files
       formData.append('image',imgPhoto[0])
       formData.append('title',titrePhoto)
       formData.append('category',catPhoto)
       console.log(formData)
        try {
            const token = sessionStorage.getItem('token'); 
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` 
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Échec de l'ajout de la photo.");
            }
            
            if (response.ok) {
               
                const galerie = document.getElementById('gallery');

                const figure = document.createElement('figure');

                const image = document.createElement('img');
                image.src = 'http://localhost:5678/images/'+imgPhoto[0].name;
                console.log(imgPhoto[0])
                image.alt = titrePhoto;
                figure.appendChild(image);
      
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = titrePhoto;
                figure.appendChild(figcaption);
      
                galerie.appendChild(figure);
                this.reset();

                // return modal gallery
                aside.classList.remove("dnone");
                modalAjout.classList.add("dnone");
            }
         

            
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la photo :", error); 
        } 
    });
}
});
=======
>>>>>>> faa00a01777323224d54b3bd6035f8caaa686220
