$(document).ready(function() {

    form = JSON.parse(initializationConditions); //Парсим в объект
    formLines = [];
    formLinesElement = 0;
    getStringArray = [];


    //Добавляем по клику строку
    $("#add_form_button").click(function() {
        formLines[formLinesElement] = new LineSelect(form.formarray, formLinesElement); //Элемент массива становится "объектом" (насколько это возможно в js)
        $("#forms_panel").append(formLines[formLinesElement].html);
        formLinesElement++;
    });

    //Выбор условия
    $("#forms_panel").on("change", ".selectCondition", function() {
        $(".lineFields", $(this).parent(".FieldLineContainer")).remove();
        $("[type='del']", this).remove();
        $(this).parent(".FieldLineContainer").append("<div class='lineFields'></div>");
        thisFieldLineType = parseInt($(":selected", this).attr("FieldLine"));
        thisFieldLineNumber = parseInt($(this).parent(".FieldLineContainer").attr("lineNum"));
        getStringArray[thisFieldLineNumber] = [];
        getStringArray[thisFieldLineNumber][0] = '{"FieldLine":[{"name":"' + form.formarray[thisFieldLineType].FieldLine[0].name + '"},';
        if (form.formarray[thisFieldLineType].FieldLine[0].array) {
            getStringArray[thisFieldLineNumber].array = true;
        } else {
            getStringArray[thisFieldLineNumber].array = false;
        }
        if (form.formarray[thisFieldLineType].FieldLine[0].quantity > 0) {
            form.formarray[thisFieldLineType].FieldLine[0].quantity--;
            if (form.formarray[thisFieldLineType].FieldLine[0].quantity < 1) {
                $("[fieldline='" + thisFieldLineType + "']:not(:selected)").attr("class", "display-no");
            }
        }
        if (!isNaN(this.selectedType)) {
            form.formarray[this.selectedType].FieldLine[0].quantity++;
            $("[fieldline='" + this.selectedType + "']:not(:selected)").attr("class", "display-yes");
        }
        this.selectedType = thisFieldLineType;
        //Собсна тут вся магия, берём данные из json и добавляем объекты
        for (thisFieldLineFields = 1; thisFieldLineFields < form.formarray[thisFieldLineType].FieldLine.length; thisFieldLineFields++) {
            switch (form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type) {
                case "select":
                    newFieldLine = new FieldSelect(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект Select
                    $(".lineFields", $(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value + '"}]}';
                    break
                case "select_multiple":
                    newFieldLine = new FieldSelectMultiple(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект SelectMultiple
                    $(".lineFields", $(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value + '"}]}';
                    $("select[name='tags_array']").select2();
                    break
                case "inputNum":
                    newFieldLine = new FieldInputNumber(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputNumber
                    $(".lineFields", $(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
                case "inputText":
                    newFieldLine = new FieldInputText(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputText
                    $(".lineFields", $(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
                case "inputData":
                    newFieldLine = new FieldInputData(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputData
                    $(".lineFields", $(this).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
            }
        }
    });

    $("#forms_panel").on("change", ".lineFields>select, .lineFields>input", function() {
        thisFieldLineNumber = parseInt($(this).parents(".FieldLineContainer").attr("linenum"));
        thisFieldLineFields = parseInt($(this).attr("fieldnum"));
        thisFieldLineType = parseInt($(".selectCondition option:selected", ($(this).parents(".FieldLineContainer"))).attr("FieldLine"));
        if (form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type != "select_multiple") {
            getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + $(this).val() + '"}]}';
        } else {
            getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":[{"element":"' + $(this).val().toString().replace(/,/g, '"},{"element":"') + '"}]}]}';
        }
        if ($(this).val().toString() == "date_diapasone") {
            $('input[name="datapicker"]').daterangepicker({
                singleDatePicker: false,
                showDropdowns: true,
                format: 'YYYY-MM-DD',
                locale: {
                    applyLabel: "Применить",
                    cancelLabel: "Отменить",
                    fromLabel: "От",
                    toLabel: "До",
                    customRangeLabel: "Custom",
                    daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    firstDay: 1
                }
            });
        } else {
            $('input[name="datapicker"]', $(this).parents(".lineFields")).data('daterangepicker').remove();
        }
    });

    $("#forms_panel").on("click", ".removeline", function() {
        thisFieldLineNumber = parseInt($(this).parents(".FieldLineContainer").attr("linenum"));
        getStringArray.splice(thisFieldLineNumber, 1);
        $(this).parents(".FieldLineContainer").remove();
    });

    //Отправляем данные на сервер
    $("#search_button").click(function() {
        //getStringArray.sort();
        formName = [];
        formNameNum = 0;
        getForwarding = '{"formarray":[';
        for (var a = 0; a < getStringArray.length; a++) {
            if (getStringArray[a]) {
                getForwarding += getStringArray[a][0];
                for (var b = 1; b < getStringArray[a].length; b++) {
                    getForwarding += getStringArray[a][b] + ((b < getStringArray[a].length - 1) ? ',' : '');
                }
                getForwarding += ']}' + ((a < getStringArray.length - 1) ? ',' : '');
            }
        }
        getForwarding += ']}';
        console.log(getForwarding);
        //Кидаем на сервер
        location.href = "test.php?json=" + getForwarding;
    });

    //------------------------------------------------------------------------------------------------------------------------------------

    //Объект "Выбор условия"
    function LineSelect(optionsArray, formLinesElement) {
        this.optionsArray = optionsArray;
        this.formLinesElement = formLinesElement;
        this.html = "<div class='FieldLineContainer' lineNum='" + formLinesElement + "'><button class='btn btn-danger btn-mini remove removeline' title='Удалить' type='button'><b>x</b></button><select class='selectCondition'><option type='del'>Выберите условие</option>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            if (this.optionsArray[optionNumber].FieldLine[0].quantity > 0) {
                this.html += "<option FieldLine='" + optionNumber + "' class='display-yes'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
            } else {
                this.html += "<option FieldLine='" + optionNumber + "' class='display-no'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
            }
        }
        this.html += "</select></div>";
    }

    //Объект Select
    function FieldSelect(optionsArray, thisFieldLineFields, fieldName) {
        this.optionsArray = optionsArray;
        this.thisFieldLineFields = thisFieldLineFields;
        this.fieldName = fieldName;
        this.html = "<select fieldNum='" + thisFieldLineFields + "' name='" + fieldName + "'>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            this.html += "<option value='" + this.optionsArray[optionNumber].value + "'>" + this.optionsArray[optionNumber].option + "</option>";
        }
        this.html += "</select>";
    }

    //Объект SelectMultiple
    function FieldSelectMultiple(optionsArray, thisFieldLineFields, fieldName) {
        this.optionsArray = optionsArray;
        this.thisFieldLineFields = thisFieldLineFields;
        this.fieldName = fieldName;
        this.html = "<select class='select_multiple' multiple='multiple' fieldNum='" + thisFieldLineFields + "' name='" + fieldName + "'>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            this.html += "<option value='" + this.optionsArray[optionNumber].value + "'>" + this.optionsArray[optionNumber].option + "</option>";
        }
        this.html += "</select>";
    }


    //Объект InputText
    function FieldInputText(text, thisFieldLineFields, fieldName) {
        this.text = text;
        this.fieldName = fieldName;
        this.thisFieldLineFields = thisFieldLineFields;
        this.html = "<input type='text' value='" + this.text + "' fieldNum='" + thisFieldLineFields + "'>";
    }

    //Объект InputData
    function FieldInputData(text, thisFieldLineFields, fieldName) {
        this.text = text;
        this.fieldName = fieldName;
        this.thisFieldLineFields = thisFieldLineFields;
        this.html = "<input type='text' value='" + this.text + "' fieldNum='" + thisFieldLineFields + "' name='datapicker' >";
    }



    //Объект InputNumber
    function FieldInputNumber(number, thisFieldLineFields, fieldName) {
        this.number = number;
        this.fieldName = fieldName;
        this.thisFieldLineFields = thisFieldLineFields;
        this.html = "<input type='number' value='" + this.number + "' fieldNum='" + thisFieldLineFields + "' name='" + fieldName + "'>";
    }

});
