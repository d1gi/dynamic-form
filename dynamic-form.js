$(document).ready(function() {

    form = JSON.parse(initializationConditions); //Парсим в объект
    formLines = [];
    formLinesElement = 0;
    getStringArray = [];

    //Получаем JSON
    //formRestoreJson='{"formarray":[{"FieldLine":[{"name":"exist"},{"field_name":"is_exist","options":[{"value":"1"}]}]},{"FieldLine":[{"name":"create_order"},{"field_name":"orders_created_comparison","options":[{"value":"gt"}]},{"field_name":"orders_created","options":[{"value":"0"}]},{"field_name":"orders_created_period","options":[{"value":"all"}]}]},{"FieldLine":[{"name":"email"},{"field_name":"email_comparison","options":[{"value":"cont"}]},{"field_name":"email_value","options":[{"value":"0"}]}]},{"FieldLine":[{"name":"username"},{"field_name":"username_comparison","options":[{"value":"compliance"}]},{"field_name":"username_value","options":[{"value":"0"}]}]},{"FieldLine":[{"name":"age"},{"field_name":"age_comparison","options":[{"value":"upward"}]},{"field_name":"age_value","options":[{"value":"0"}]}]},{"FieldLine":[{"name":"tags"},{"field_name":"tags_include","options":[{"value":"include"}]},{"field_name":"tags_condotion","options":[{"value":"and"}]},{"field_name":"tags_array","options":[{"value":[{"element":"kozinaki"},{"element":"cookie"},{"element":"cheesecake"}]}]}]}]}';
    formRestoreJson = $.getUrlVar('options').replace(/%22/g, '"');
    console.log(formRestoreJson);
    if (formRestoreJson != '') {
        formRestore = JSON.parse(formRestoreJson);
        //Восстанавливаем форму из JSON
        for (restoreElement = 0; restoreElement < formRestore.formarray.length; restoreElement++) {
            formLines[formLinesElement] = new LineSelect(form.formarray, formLinesElement, formRestore.formarray[restoreElement].FieldLine[0].name);
            $("#forms_panel").append(formLines[formLinesElement].html);
            $('[linenum="' + restoreElement + '"]>.selectCondition>.selected-condition').attr("selected", "selected");
            selectConditionLine('[linenum="' + restoreElement + '"]>.selectCondition');
            formRestoreArrayElement = 1;
            $('[linenum="' + restoreElement + '"]>.lineFields>select, [linenum="' + restoreElement + '"]>.lineFields>input').each(function() {
                if ($(this).is("select")) {
                    $('[value="' + formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value + '"]', this).attr("selected", "selected");
                    if ($(this).attr("name") == "age_comparison") {
                        if ($(this).val().toString() == "date_diapasone") {
                            $('input[name="datapicker"]', $(this).parent(".lineFields")).daterangepicker({
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
                            $('input[name="datapicker"]', $(this).parent(".lineFields")).attr("name", "data-range");
                        }
                    }
                    if ($(this).hasClass("select_multiple")) {
                        tagElements = [];
                        for (mselectElement = 0; mselectElement < formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value.length; mselectElement++) {
                            tagElements[mselectElement] = formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value[mselectElement].element;
                        }
                        $(this).val(tagElements).trigger("change");
                    }
                }
                if ($(this).is("input")) {
                    $(this).val(formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value);
                }
                formRestoreArrayElement++;
            });
            formLinesElement++;
        }
    }

    //Добавляем по клику строку
    $("#add_form_button").click(function() {
        formLines[formLinesElement] = new LineSelect(form.formarray, formLinesElement); //Элемент массива становится "объектом" (насколько это возможно в js)
        $("#forms_panel").append(formLines[formLinesElement].html);
        formLinesElement++;
    });

    //Выбор условия
    $("#forms_panel").on("change", ".selectCondition", function() {
        selectConditionLine(this);
    });

    $("#forms_panel").on("change", ".lineFields>select, .lineFields>input", function() {
        fieldsChange(this);
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
        //location.href="test.php?json="+getForwarding;
    });

    //------------------------------------------------------------------------------------------------------------------------------------

    function selectConditionLine(domElement) {
        this.domElement = domElement;
        $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).remove();
        $("[type='del']", this.domElement).remove();
        $(this.domElement).parent(".FieldLineContainer").append("<div class='lineFields'></div>");
        thisFieldLineType = parseInt($(":selected", this.domElement).attr("FieldLine"));
        thisFieldLineNumber = parseInt($(this.domElement).parent(".FieldLineContainer").attr("lineNum"));
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
        if (!isNaN(this.domElement.selectedType)) {
            form.formarray[this.domElement.selectedType].FieldLine[0].quantity++;
            $("[fieldline='" + this.domElement.selectedType + "']:not(:selected)").attr("class", "display-yes");
        }
        this.domElement.selectedType = thisFieldLineType;
        //Собсна тут вся магия, берём данные из json и добавляем объекты
        for (thisFieldLineFields = 1; thisFieldLineFields < form.formarray[thisFieldLineType].FieldLine.length; thisFieldLineFields++) {
            switch (form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type) {
                case "select":
                    newFieldLine = new FieldSelect(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект Select
                    $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value + '"}]}';
                    break
                case "select_multiple":
                    newFieldLine = new FieldSelectMultiple(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект SelectMultiple
                    $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value + '"}]}';
                    $("select[name='tags_array']").select2();
                    break
                case "inputNum":
                    newFieldLine = new FieldInputNumber(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputNumber
                    $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
                case "inputText":
                    newFieldLine = new FieldInputText(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputText
                    $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
                case "inputData":
                    newFieldLine = new FieldInputData(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value, thisFieldLineFields, form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name); //Объект InputData
                    $(".lineFields", $(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
                    getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value + '"}]}';
                    break
            }
        }
    }

    function fieldsChange(domElement) {
        this.domElement = domElement;
        thisFieldLineNumber = parseInt($(this.domElement).parents(".FieldLineContainer").attr("linenum"));
        thisFieldLineFields = parseInt($(this.domElement).attr("fieldnum"));
        thisFieldLineType = parseInt($(".selectCondition option:selected", ($(this.domElement).parents(".FieldLineContainer"))).attr("FieldLine"));
        if (form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type != "select_multiple") {
            getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":"' + $(this.domElement).val() + '"}]}';
        } else {
            getStringArray[thisFieldLineNumber][thisFieldLineFields] = '{"field_name":"' + form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name + '","options":[{"value":[{"element":"' + $(this.domElement).val().toString().replace(/,/g, '"},{"element":"') + '"}]}]}';
            console.log(domElement);
        }
        if ($(this.domElement).val().toString() == "date_diapasone" && $(this.domElement).attr("name") == "age_comparison") {
            $('input[name="datapicker"]', $(this.domElement).parent(".lineFields")).daterangepicker({
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
            $('input[name="datapicker"]', $(this.domElement).parent(".lineFields")).attr("name", "data-range");
            $('input[name="data-range"]', $(this.domElement).parent(".lineFields")).val("");
        }

        if ($(this.domElement).attr("name") == "age_comparison" && $('input[name="data-range"]', $(this.domElement).parent(".lineFields")).attr("name") == "data-range" && $(this.domElement).val().toString() != "date_diapasone") {
            $('input[name="data-range"]', $(this.domElement).parent(".lineFields")).data('daterangepicker').remove();
            $('input[name="data-range"]', $(this.domElement).parent(".lineFields")).val("");
            $('input[name="data-range"]', $(this.domElement).parent(".lineFields")).attr("name", "datapicker");
        }
    }

    //Объект "Выбор условия"
    function LineSelect(optionsArray, formLinesElement, conditionName) {
        this.conditionName = conditionName;
        this.optionsArray = optionsArray;
        this.formLinesElement = formLinesElement;
        this.html = "<div class='FieldLineContainer' lineNum='" + formLinesElement + "'><button class='btn btn-danger btn-mini remove removeline' title='Удалить' type='button'><b>x</b></button><select class='selectCondition'><option type='del'>Выберите условие</option>";
        for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
            if (this.optionsArray[optionNumber].FieldLine[0].quantity > 0) {
                if (this.optionsArray[optionNumber].FieldLine[0].name == this.conditionName) {
                    this.html += "<option FieldLine='" + optionNumber + "' class='display-yes selected-condition'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
                } else {
                    this.html += "<option FieldLine='" + optionNumber + "' class='display-yes'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
                }
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
        this.html = "<input type='text' value='" + this.text + "' fieldNum='" + thisFieldLineFields + "' name='" + fieldName + "'>";
    }

    //Объект InputData
    function FieldInputData(text, thisFieldLineFields, fieldName) {
        this.text = text;
        this.fieldName = fieldName;
        this.thisFieldLineFields = thisFieldLineFields;
        this.html = "<input type='text' value='" + this.text + "' fieldNum='" + thisFieldLineFields + "' name='datapicker' name='" + fieldName + "'>";
    }



    //Объект InputNumber
    function FieldInputNumber(number, thisFieldLineFields, fieldName) {
        this.number = number;
        this.fieldName = fieldName;
        this.thisFieldLineFields = thisFieldLineFields;
        this.html = "<input type='number' value='" + this.number + "' fieldNum='" + thisFieldLineFields + "' name='" + fieldName + "'>";
    }

});

$.extend({
    getUrlVars: function() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});
