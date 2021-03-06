$(document).ready(function(){
	form = JSON.parse(initializationConditions); //Парсим конфиг в объект
	formLines=[];
	formLinesElement=0;
	getStringArray=[];

	//Получаем JSON из GET если есть, то восстанавливаем форму
	formRestoreJson = $.getUrlVar('options');
	if (formRestoreJson!='' && formRestoreJson!=undefined){
		formRestoreJson=formRestoreJson.replace(/%22/g,'"');
		formRestore=JSON.parse(formRestoreJson);

		//Восстанавливаем форму из JSON
		for (restoreElement=0;restoreElement<formRestore.formarray.length;restoreElement++){
			formLines[formLinesElement]=new LineSelect(form.formarray,formLinesElement,formRestore.formarray[restoreElement].FieldLine[0].name);
			$("#forms_panel").append(formLines[formLinesElement].html);
			$('[linenum="'+restoreElement+'"]>.selectCondition>.selected-condition').attr("selected","selected");
			selectConditionLine('[linenum="'+restoreElement+'"]>.selectCondition');
			formRestoreArrayElement=1;
			$('[linenum="'+restoreElement+'"]>.lineFields>select, [linenum="'+restoreElement+'"]>.lineFields>input').each(function(){
				if($(this).is("select")){
					$('[value="'+formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value+'"]',this).attr("selected","selected");
					if($(this).attr("name")=="birth_date_comparison"){
						if($(this).val().toString()=="range") {
							initDatePicker(this);
							$('input[name="datapicker"]',$(this).parent(".lineFields")).attr("name","data-range");
						}
					}
				}
				if($(this).hasClass("select_multiple")){
					tagElements=[];
					for (mselectElement=0;mselectElement<formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value.length;mselectElement++){
						tagElements[mselectElement]=parseInt(formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value[mselectElement].id);
					}
					$(this).val(tagElements).trigger("change");
				}

				if($(this).hasClass("select_multiple_ajax")){
					tagElements=eval(formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].field_name);
					for (aselectElement=0;aselectElement<tagElements.length;aselectElement++){
						option = new Option(tagElements[aselectElement].text, tagElements[aselectElement].id, true, true);
						$(this).append(option);
					}
					$(this).trigger("change");
				}

				if($(this).is("input:not(select_multiple)") && $(this).is("input:not(select2-search__field)")){
					$(this).val(formRestore.formarray[restoreElement].FieldLine[formRestoreArrayElement].options[0].value);
				}
				formRestoreArrayElement++;
			});

			formLinesElement++;
		}
		$(".lineFields>select, .lineFields>input").each(function(el){
			fieldsChange(this);
		});
	}

	//Добавляем по клику строку
	$("#add_form_button").click(function(){
		formLines[formLinesElement]=new LineSelect(form.formarray,formLinesElement); //Элемент массива становится "объектом" (насколько это возможно в js)
		$("#forms_panel").append(formLines[formLinesElement].html);
		formLinesElement++;
	});

	//Выбор условия
	$("#forms_panel").on("change",".selectCondition",function(){selectConditionLine(this);});

	$("#forms_panel").on("change",".lineFields>select, .lineFields>input",function(){fieldsChange(this);});

	$("#forms_panel").on("click",".removeline",function(){
		thisFieldLineNumber=parseInt($(this).parents(".FieldLineContainer").attr("linenum"));
		getStringArray.splice(thisFieldLineNumber,1);
		$(this).parents(".FieldLineContainer").remove();
	});

	//Отправляем данные на сервер
	$("#search_button").click(function(){
		//getStringArray.sort();
		formName=[];
		formNameNum=0;
		getForwarding='{"formarray":[';
		for(var a=0;a<getStringArray.length;a++){
			if(getStringArray[a]){
				getForwarding+=getStringArray[a][0];
				for(var b=1;b<getStringArray[a].length;b++){
					getForwarding+=getStringArray[a][b]+((b<getStringArray[a].length-1)?',':'');
				}
				getForwarding+=']}'+((a<getStringArray.length-1)?',':'');
			}
		}
		getForwarding+=']}';
		console.log(getForwarding);
		// Кидаем на сервер
		location.href="/?options="+getForwarding;
	});

	//------------------------------------------------------------------------------------------------------------------------------------
	//Добавляются условия соответственно конфига
	function selectConditionLine(domElement){
		this.domElement=domElement;
		$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).remove();
		$("[type='del']",this.domElement).remove();
		$(this.domElement).parent(".FieldLineContainer").append("<div class='lineFields'></div>");
		thisFieldLineType=parseInt($(":selected",this.domElement).attr("FieldLine"));
		thisFieldLineNumber=parseInt($(this.domElement).parent(".FieldLineContainer").attr("lineNum"));
		getStringArray[thisFieldLineNumber]=[];
		getStringArray[thisFieldLineNumber][0]='{"FieldLine":[{"name":"'+form.formarray[thisFieldLineType].FieldLine[0].name+'"},';
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
		if(!isNaN(this.domElement.selectedType)){
			form.formarray[this.domElement.selectedType].FieldLine[0].quantity++;
			$("[fieldline='"+this.domElement.selectedType+"']:not(:selected)").attr("class","display-yes");
		}
		this.domElement.selectedType=thisFieldLineType;
		//Собсна тут вся магия, берём данные из json и добавляем объекты
		for(thisFieldLineFields=1;thisFieldLineFields<form.formarray[thisFieldLineType].FieldLine.length;thisFieldLineFields++){
			switch(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type){
				case "select":
					newFieldLine=new FieldSelect(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект Select
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options[0].value+'"}]}';
					break
				case "select_multiple":
					newFieldLine=new FieldSelectMultiple(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект SelectMultiple
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+0+'"}]}';
					$("input[name='"+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"']",$(this.domElement).parent(".FieldLineContainer"))
						.select2({
                            allowClear: false,
                            data: eval(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name),
                            multiple: true,
                            placeholder: form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].placeholder,
                            theme: "classic"
                        });
					break
				case "inputNum":
					newFieldLine=new FieldInputNumber(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект InputNumber
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value+'"}]}';
					break
				case "inputText":
					newFieldLine=new FieldInputText(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект InputText
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value+'"}]}';
					break
				case "inputData":
					newFieldLine=new FieldInputData(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект InputData
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].value+'"}]}';
					break
				case "select_multiple_ajax":
					newFieldLine=new FieldSelectMultipleAJAX(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].options,thisFieldLineFields,form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name);//Объект SelectMultipleAJAX
					$(".lineFields",$(this.domElement).parent(".FieldLineContainer")).append(newFieldLine.html);
					getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'"}';
					$("select[name='"+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+"']").select2({
						multiple: true,
						minimumInputLength: 1,
						dataType: 'json',
							ajax: {
							  delay: 250,
							  url: form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].url,
							  data: function (q) {return { q: q.term };},
							  processResults: function (data) {
								return {
									results: $.map(data, function (item) {
										return {
											text: item.name,
											id: item.id
										}
									})
								};
							  }
						}
					});
					break
			}
		}
	}

	//Действия когда меняются значения в полях
	function fieldsChange(domElement){
		this.domElement=domElement;
		thisFieldLineNumber=parseInt($(this.domElement).parents(".FieldLineContainer").attr("linenum"));
		thisFieldLineFields=parseInt($(this.domElement).attr("fieldnum"));
		thisFieldLineType=parseInt($(".selectCondition option:selected",($(this.domElement).parents(".FieldLineContainer"))).attr("fieldline"));
		if(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type!="select_multiple" && form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type!="select_multiple_ajax"){
			getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":"'+$(this.domElement).val()+'"}]}';
		}
		if(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type=="select_multiple"){
			select2Array=[];
			select2Array[0]="id";
			getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":'+JSON.stringify($(this.domElement).select2('data'), select2Array)+'}]}';
		}
		if(form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].type=="select_multiple_ajax"){
			ajaxArray=[];
			ajaxArray[0]="id";
			getStringArray[thisFieldLineNumber][thisFieldLineFields]='{"field_name":"'+form.formarray[thisFieldLineType].FieldLine[thisFieldLineFields].field_name+'","options":[{"value":'+JSON.stringify($(this.domElement).select2('data'), ajaxArray)+'}]}';
		}
		if($(this.domElement).val()){

		if($(this.domElement).val().toString()=="range" && $(this.domElement).attr("name")=="birth_date_comparison"){
            initDatePicker(this.domElement);
			$('input[name="datapicker"]',$(this.domElement).parent(".lineFields")).attr("name","data-range");
			$('input[name="data-range"]',$(this.domElement).parent(".lineFields")).val('1990-01-01 - 2000-01-01');
		}

		if($(this.domElement).attr("name")=="birth_date_comparison"
            && $('input[name="data-range"]',$(this.domElement).parent(".lineFields")).attr("name") == "data-range"
            && $(this.domElement).val().toString()!="range"
        ){
			$('input[name="data-range"]',$(this.domElement).parent(".lineFields")).data('daterangepicker').remove();
			$('input[name="data-range"]',$(this.domElement).parent(".lineFields")).val(25);
			$('input[name="data-range"]',$(this.domElement).parent(".lineFields")).attr("name","datapicker");
		}
		}
	}

	//Инициализация
	function initDatePicker(domElement, singleDatePicker){
		this.singleDatePicker=singleDatePicker;
		this.singleDatePicker ? true : false;
		this.domElement=domElement;
		$('input[name="datapicker"]',$(this.domElement).parent(".lineFields")).daterangepicker({
			singleDatePicker: this.singleDatePicker,
            showDropdowns: true,
            format: 'YYYY-MM-DD',
			locale: {
                applyLabel: "Применить",
                cancelLabel: "Отменить",
                fromLabel: "От",
                toLabel: "До",
                customRangeLabel: "Custom",
			    daysOfWeek: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
			    monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
			    firstDay: 1
            }
		});
	}

	//Объект "Выбор условия"
	function LineSelect(optionsArray,formLinesElement,conditionName){
		this.conditionName=conditionName;
		this.optionsArray=optionsArray;
		this.formLinesElement=formLinesElement;
		this.html = "<div class='FieldLineContainer' lineNum='"+formLinesElement+"'><button class='btn btn-danger btn-mini remove removeline' title='Удалить' type='button'><b>x</b></button><select class='selectCondition'><option type='del'>Выберите условие</option>";
		for (optionNumber = 0; optionNumber < this.optionsArray.length; optionNumber++) {
			if (this.optionsArray[optionNumber].FieldLine[0].quantity>0){
				if(this.optionsArray[optionNumber].FieldLine[0].name==this.conditionName){
					this.html += "<option FieldLine='"+optionNumber+"' class='display-yes selected-condition'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
				} else {
					this.html += "<option FieldLine='"+optionNumber+"' class='display-yes'>" + this.optionsArray[optionNumber].FieldLine[0].title + "</option>";
				}
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

	//Объект SelectMultiple
	function FieldSelectMultiple(optionsArray,thisFieldLineFields,fieldName) {
		this.optionsArray = optionsArray;
		this.thisFieldLineFields=thisFieldLineFields;
		this.fieldName=fieldName;
		this.html="<input type='hidden' class='select_multiple' fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'>";
	}


	//Объект InputText
	function FieldInputText(text,thisFieldLineFields,fieldName) {
		this.text = text;
		this.fieldName=fieldName;
		this.thisFieldLineFields=thisFieldLineFields;
		this.html="<input type='text' value='"+this.text+"' fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'>";
	}

	//Объект InputData
	function FieldInputData(text,thisFieldLineFields,fieldName) {
		this.text = text;
		this.fieldName=fieldName;
		this.thisFieldLineFields=thisFieldLineFields;
		this.html="<input type='text' value='"+this.text+"' fieldNum='"+thisFieldLineFields+"' name='datapicker' name='"+fieldName+"'>";
	}



	//Объект InputNumber
	function FieldInputNumber(number,thisFieldLineFields,fieldName) {
		this.number = number;
		this.fieldName=fieldName;
		this.thisFieldLineFields=thisFieldLineFields;
		this.html="<input type='number' value='"+this.number+"' fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'>";
	}

	//Объект SelectMultipleAJAX
	function FieldSelectMultipleAJAX(optionsArray,thisFieldLineFields,fieldName) {
		this.optionsArray = optionsArray;
		this.thisFieldLineFields=thisFieldLineFields;
		this.fieldName=fieldName;
		//this.html="<input type='hidden' class='select_multiple_ajax' fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'>";
		this.html="<select class='select_multiple_ajax' fieldNum='"+thisFieldLineFields+"' name='"+fieldName+"'></select>"
	}

});

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
