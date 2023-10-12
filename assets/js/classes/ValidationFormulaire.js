export default class ValidationFormulaire{
    elInputTask = document.getElementById('task');
    elInputImportance = document.getElementById('importance');

    // Pour les champs required(le champs tache)
    static estVide(postData) {
        let estVide;
        if(postData.task == ""){
            estVide = true;
        } else {    
            estVide = false;
        }
        return estVide;
    }

    /**
     * Validation du formulaire
     * @returns
     */
    static validForm(postData) {
        console.log('validation', postData.task)
        let estValide = true;

        //  //Input 'Nouvelle tâche' */
        //  if (postData.task == '') {
        //      this._elInputTask.parentNode.classList.add('error');
        //      estValide = false;
        //  } else {
        //      if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
        //  }

        //  /* Inputs Radio 'Importance' */
        //  let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        //  if (elCheckedImportance) {
        //      if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
        //  } else {
        //      this._elInputImportance[0].parentNode.classList.add('error');
        //      estValide = false;
        //  }

        return estValide;
    }
}