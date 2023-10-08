export default class Routeur{

    constructor() {
        
        // this.routes = {
        //     "/": //Fonction du gestionnaire,
        //     "id": //Fonction du gestionnaire qui affiche le detail du id
        // }
    }


    // va mettre des écouteurs d'événement 
    init() {
      // ce serai mieux d'écouter la liste (bubling) parce que les enfants sont dynamique
      //Écouter au clic de la liste, on change l'url avec # et on appelle gererURL
        
        
     //Écouter l'événement popstate, quand ca se déclenche, on appelle gererURL
    }

    gererURL() {
        //On recupere le hash
        //On récupere le id sinon on appelle la page d'accueil(si il n'y a pas de id).
        //Si id, le gestionnaire trouve la bonne tache dans sa liste et appelle la fonction afficheDetail
    }



}