class CalcController {
    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';
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

        //Atualizar Display
        this.setLastNumberToDisplay();

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
                //console.log(btn.className.baseVal.replace('btn-', ''));
                let textBtn = btn.className.baseVal.replace('btn-', '');
                //Criando um método para execução do botão
                this.execBtn(textBtn);

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

    //Tratar a concatenação dos números
    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        //pode ser dessa forma
        // if (['+', '-', '*', '/', '%'].indexOf(value) > -1){//Esse método vai buscar se foi digitado algum desses sinais do array
        //     return true;
        // }else {
        //     return false;
        // }
        //Outra maneira mais simples
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);

        if (this._operation.length > 3){

            this.calc();
            //console.log(this._operation)
        }
    }

    //Método para o eval
    getResult(){
        console.log('getResult', this._operation);
        return eval(this._operation.join(''));
    }

    calc(){

        let last = '';

        this._lastOperator = this.getLastItem();//Pega o último operador e guarda na mémoria que criamos

        //Retirando o bug 
        if (this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3){//Tem que ter no mínimo três itens para fazer a operação
            last = this._operation.pop();

            this._lastNumber = this.getResult();//Como é true, ele pega a última operação

        } else if (this._operation.length == 3){
            
            this._lastNumber = this.getResult(false);//Como é false, ele irá pegar o número

        }

        console.log('_lastOperator', this._lastOperator);
        console.log('_lastNumber', this._lastNumber);

        let result = this.getResult();

        if (last == '%'){
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
        
        //Atualizar Display
        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){//Por padrão sempre trará o último operador

        let lastItem;
        //Uma maneira de fazer
        // for (let i = this._operation.length-1; i >= 0; i--){
        //     if (isOperator){
        //         if (this.isOperator(this._operation[i])){
        //             lastItem = this._operation[i];
        //             break;
        //         }
        //     } else {
        //         if (!this.isOperator(this._operation[i])){
        //             lastItem = this._operation[i];
        //             break;
        //         }
        //     }          
        // }
        //Outra forma
        for (let i = this._operation.length-1; i >= 0; i--){
            
                if (this.isOperator(this._operation[i]) == isOperator){
                    lastItem = this._operation[i];
                    break;
                }
        }

        if (!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;//if ternário
        }

        return lastItem;
    }

    setLastNumberToDisplay(){
        
        let lastNumber = this.getLastItem(false);

        //Por ter modificado o getLastItem eu posso suprir esse trecho
        // for (let i = this._operation.length-1; i >= 0; i--){
        //     if (!this.isOperator(this._operation[i])){
        //         lastNumber = this._operation[i];
        //         break;
        //     }
        // }

        if (!lastNumber) lastNumber = 0;//Se o lastNumber for vazio, coloca zero

        this.displayCalc = lastNumber;

    }

    addOperation(value){

        //console.log('A', value,  isNaN(this.getLastOperation()));
        if (isNaN(this.getLastOperation())){//String

            if (this.isOperator(value)){//Trocar Operador
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
                //Atualizar Display
                this.setLastNumberToDisplay();
            }

        }else {//Number

            if (this.isOperator(value)){
                this.pushOperation(value);
            } else {

                let newValue = this.getLastOperation().toString() + value.toString();//Concatenando os números
                this.setLastOperation(parseFloat(newValue));
                //Atualizar Display
                this.setLastNumberToDisplay();

            }     

        }

        //console.log(this._operation);
        
    }

    //Tratando o Ponto (.)
    addDot(){
        let lastOperation = this.getLastOperation();
        if (this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.')
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    //Execução do botão
    execBtn(value){

        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.cancelEnter();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        
        //Atualizar Display
        this.setLastNumberToDisplay();
    }

    cancelEnter(){
        this._operation.pop();//Retira o último do array
        //Atualizar Display
        this.setLastNumberToDisplay();
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