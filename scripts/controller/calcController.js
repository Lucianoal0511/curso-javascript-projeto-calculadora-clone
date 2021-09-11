class CalcController {
    constructor(){
        this._displayCalcEl = document.querySelector('#display');//Seleciona
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        //this._displayCalc = '0';//Atributos Privados
        this._currentDate;//Atributos Privados
        this.initialized();
    }

    initialized(){

        //Selecionando
        // let displayCalcEl = document.querySelector('#display');//Seleciona
        // let dateEl = document.querySelector('#data');
        // let timeEl = document.querySelector('#hora');

        //Inserir dados
        //displayCalcEl.innerHTML = 2345;//insere o valor
        this._dateEl.innerHTML = "10/09/2021";
        this._timeEl.innerHTML = "20:03";

    }

    get displayTime(){

    }

    get displayDate(){
        
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }

    get currentDate(){
        //return this._currentDate;
        return new Date();
    }

    set currentDate(valor){
        this._currentDate = valor;
    }
}