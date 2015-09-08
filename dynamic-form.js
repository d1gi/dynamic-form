$(document).ready(function(){

    form = JSON.parse(initializationConditions); //Парсим в объект
    formLines=[];
    formLinesElement=0;
    getStringArray=[];


    //Добавляем по клику строку
    $("#add_form_button").click(function(){
        formLines[formLinesElement]=new LineSelect(form.formarray,formLinesElement); //Элемент массива становится "объектом" (насколько это возможно в js)
        $("#forms_panel").append(formLines[formLinesElement].html);
        formLinesElement++;
    });

    //Выбор условия
    $("#forms_panel").on("change",".selectCondition",function(){
        $(".lineFields",$(this).parent(".FieldLineContainer")).remove();
        $("[type='del']",this).remove();
        $(this).parent(".FieldLineContainer").append("<div class='lineFields'></div>");
        thisFieldLineType=parseInt($(":selected",this).attr("FieldLine"));
        thisFieldLineNumber=parseInt($(this).parent(".FieldLineContainer").attr("lineNum"));
        getStringArray[thisFieldLineNumber]=[];
        getStringArray[thisFieldLineNumber][0]="form_name="+form.formarray[thisFieldLineType].FieldLine[0].name;
        if(form.formarray[thisFieldLineType].FieldLine[0].array){
            getStringArray[thisFieldLineNumber].array=true;
        } else {
            getStringArray[thisFieldLineNumber].array=false;
        }
        if(form.formarray[thisFieldLineType].FieldLine[0].quantity>0){
            form.formarray[thisFieldLineType].FieldLine[0].quantity--;
            if (form.formarray[thisFieldLineType].FieldLine[0].quantity<1){
                $("[fieldline='"+thisFieldLineType+"']:not(:selected)").attr("class","display-no");
            }
        }
        if(!isNaN(this.selectedType)){
            form.formarray[this.selectedType].FieldLine[0].quantity++;
            $("[fieldline='"+this.selectedType+"']:not(:selected)").attr("class","display-yes");
        }
        this.selectedType=thisFieldLineType;

        //Собсна тут вся магия, берём данные из json и добавляем объекты
        for(thisFieldLineFields=1;thisFieldLineFields<form.formarray[thisFieldLineType].FieldLine.length;thisFieldLineFields++){
            switch(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type){
                case "select":
                    newFieldLine=new FieldSelect(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект Select
                    $(".lineFields",$(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields]=form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"="+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value;
                    break
                case "inputNum":
                    newFieldLine=new FieldInputNumber(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value,thisFieldLineFields);//Объект InputNumber
                    $(".lineFields",$(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields]=form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"="+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value;
                    break
                case "inputText":
                    newFieldLine=new FieldInputText(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value,thisFieldLineFields);//Объект InputText
                    $(".lineFields",$(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields]=form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"="+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value;
                    break
            }
        }
    });

    $("#forms_panel").on("change",".lineFields>select, .lineFields>input",function(){
        thisFieldLineNumber=parseInt($(this).parents(".FieldLineContainer").attr("linenum"));
        thisFieldLineFields=parseInt($(this).attr("fieldnum"));
        thisFieldLineType=parseInt($(".selectCondition option:selected",($(this).parents(".FieldLineContainer"))).attr("FieldLine"));
        getStringArray[thisFieldLineNumber][thisFieldLineFields]=form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"="+$(this).val();
    });

    //Отправляем данные на сервер (сейчас в алерт просто выводим)
    $("#search_button").click(function(){
        getStringArray.sort();
        formName=[];
        formNameNum=0;
        getForwarding="?";
        //getForwarding="?"+formName;
        for(var a=0;a<getStringArray.length;a++){
            /*if(getStringArray[a][0]==formName){
             formNameNum++;
             }
             if(getStringArray[a][0]!=formName){
             formName=getStringArray[a][0];
             getForwarding+="&"+formName;
             formNameNum=0;
             }*/
            for(var b=1;b<getStringArray[a].length;b++){
                /*if(getStringArray[a].array){
                 getForwarding+="&"+getStringArray[a][b].replace("=","["+formNameNum+"]=");
                 } else {
                 getForwarding+="&"+getStringArray[a][b];
                 }*/
                getForwarding+="&"+getStringArray[a][b];
            }
        }

        getForwarding=getForwarding.replace("&","");
        console.log(getForwarding);
        document.getElementById("head_form").submit();
    });

    //------------------------------------------------------------------------------------------------------------------------------------

    //Объект "Выбор условия"
    function LineSelect(optionsArray,formLinesElement){
        this.optionsArray = optionsArray;
        this.formLinesElement=formLinesElement;
        this.html = "<div class='FieldLineContainer' lineNum='"+formLinesElement+"'><select class='selectCondition'><option type='del'>Выберите условие</option>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            if (this.optionsArray[optionNumber].FieldLine[0].quantity>0){
                this.html += "<option FieldLine='"+optionNumber+"' class='display-yes'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
            } else {
                this.html += "<option FieldLine='"+optionNumber+"' class='display-no'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
            }
        }
        this.html += "</select></div>";
    }

    //Объект Select
    function FieldSelect(optionsArray,thisFieldLineFields,fieldName) {
        this.optionsArray = optionsArray;
        this.thisFieldLineFields=thisFieldLineFields;
        this.fieldName=fieldName;
        this.html = "<select fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            this.html += "<option value='"+this.optionsArray[optionNumber].value+"'>" + this.optionsArray[optionNumber].option + "</option>";
        }
        this.html += "</select>";
    }

    //Объект InputText
    function FieldInputText(text,thisFieldLineFields) {
        this.text = text;
        this.thisFieldLineFields=thisFieldLineFields;
        this.html="<input type='text' value='"+this.text+"' fieldNum='"+thisFieldLineFields+"'>";
    }

    //Объект InputNumber
    function FieldInputNumber(number,thisFieldLineFields) {
        this.number = number;
        this.thisFieldLineFields=thisFieldLineFields;
        this.html="<input type='number' value='"+this.number+"' fieldNum='"+thisFieldLineFields+"'>";
    }

});
