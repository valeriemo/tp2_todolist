export default class ValidationFormulaire{

    // Pour les champs required
    static estVide(champFormulaire) {
        let estVide = champFormulaire == "";
        return estVide;
    }
    
}