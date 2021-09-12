class CalcController {
    constructor(){
        this._operation = [];
        this._locate = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');//Seleciona
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        //this._displayCalc = '0';//Atributos Privados
        this._currentDate;//Atributos Privados
        this.initialized();
        this.initButtonsEvents();
    }

    initialized(){

        //Selecionando
        // let displayCalcEl = document.querySelector('#display');//Seleciona
        // let dateEl = document.querySelector('#data');
        // let timeEl = document.querySelector('#hora');

        //Inserir dados
        //displayCalcEl.innerHTML = 2345;//insere o valor
        //this._dateEl.innerHTML = "10/09/2021";
        //this._timeEl.innerHTML = "20:03";

        this.setDisplayDateTime();//Para aparecer logo a data e a hora na Calculadora

        //Função de intervalo de tempo - setInterval, criei uma variável para pegar o id e fazer funcionar o setTimeout
        let interval = setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);

        //Criando o setTimeout, ele vai parar o time
        // setTimeout(()=>{

        //     clearInterval(interval);

        // }, 10000)

    }

    //Iniciando o evento com os botões
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //Criando evento clique
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {
                //console.log(e);
                console.log(btn.className.baseVal.replace('btn-', ''));
                let textBtn = btn.className.baseVal.replace('btn-', '');
                //Criando um método para execução do botão
                this.execBtn();

            });
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                //Criando a mãozinha na calculadora
                btn.style.cursor = "pointer";
            })
        })

    }

    //Criando método para vários eventos
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    //Execução do botão
    execBtn(value){

        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.cancelEntre();
                break;
            case 'soma':
                this.clearAll();
                break;
            case 'subtracao':
                this.clearAll();
                break;
            case 'multiplicacao':
                this.clearAll();
                break;
            case 'divisao':
                this.clearAll();
                break;
            case 'porcento':
                this.clearAll();
                break;
            case 'igual':
                this.clearAll();
                break;
            default:
                this.setError();
                break;
        }
    }

    clearAll(){

    }

    cancelEntre(){

    }

    addOperation(value){
        this._operation.push(value);
    }

    setError(){
        this.displayCalc = 'Error';
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locate, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });//se quiser colocar a data por extenso
        this.displayTime = this.currentDate.toLocaleTimeString(this._locate);

    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        //return this._currentDate;
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}