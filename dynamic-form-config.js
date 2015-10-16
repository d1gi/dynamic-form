//Описание условий и полей
initializationConditions = '{\
	"formarray": [{\
		"FieldLine": [{\
			"name":"exist",\
			"title":"Существует",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "is_exist",\
			"options": [{\
				"option": "Да",\
				"value": "1"\
			},\
			{\
				"option": "Нет",\
				"value": "0"\
			}]\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"create_order",\
			"title":"Создано заказов",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "orders_created_comparison",\
			"options": [{\
				"option": "Больше",\
				"value": "gt"\
			},\
			{\
				"option": "Больше или равно",\
				"value": "gte"\
			},\
			{\
				"option": "Меньше",\
				"value": "it"\
			},\
			{\
				"option": "Меньше или равно",\
				"value": "ite"\
			},\
			{\
				"option": "Равно",\
				"value": "eq"\
			}]\
		},\
		{\
			"type": "inputNum",\
			"field_name": "orders_created",\
			"value": 0\
		},\
		{\
			"type": "select",\
			"field_name": "orders_created_period",\
			"options": [{\
				"option": "За всё время",\
				"value":"all"\
			},\
			{\
				"option": "За последнюю неделю",\
				"value":"1w"\
			},\
			{\
				"option": "За последние две недели",\
				"value":"2w"\
			},\
			{\
				"option": "За последний месяц",\
				"value":"1m"\
			},\
			{\
				"option": "За последние два месяца",\
				"value":"2m"\
			},\
			{\
				"option": "За последние три месяца",\
				"value":"3m"\
			},\
			{\
				"option": "За последние полгода",\
				"value":"6m"\
			},\
			{\
				"option": "За последний год",\
				"value":"1y"\
			}]\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"email",\
			"title":"e-mail",\
			"quantity":1000,\
			"array":true\
		},\
		{\
			"type": "select",\
			"field_name": "email_comparison",\
			"options": [{\
				"option": "Содержит",\
				"value": "cont"\
			},\
			{\
				"option": "Не содержит",\
				"value": "not_cont"\
			},\
			{\
				"option": "Начинается с",\
				"value": "begin"\
			},\
			{\
				"option": "Не начинается с",\
				"value": "not_begin"\
			},\
			{\
				"option": "Кончается",\
				"value": "end"\
			},\
			{\
				"option": "Не кончается",\
				"value": "not_end"\
			},\
			{\
				"option": "Является",\
				"value": "is"\
			},\
			{\
				"option": "Не является",\
				"value": "is_not"\
			}]\
		},\
		{\
			"type": "inputText",\
			"field_name": "email_value",\
			"value": 0\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"username",\
			"title":"Имя пользователя",\
			"quantity":1000,\
			"array":true\
		},\
		{\
			"type": "select",\
			"field_name": "username_comparison",\
			"options": [{\
				"option": "Полное соответствие",\
				"value": "compliance"\
			},\
			{\
				"option": "Содержит",\
				"value": "cont"\
			},\
			{\
				"option": "Начинается с",\
				"value": "begin"\
			},\
			{\
				"option": "Пусто",\
				"value": "empty"\
			}]\
		},\
		{\
			"type": "inputText",\
			"field_name": "username_value",\
			"value": 0\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"tags",\
			"title":"Тэги",\
			"quantity":100,\
			"array":true\
		},\
		{\
			"type": "select",\
			"field_name": "tags_include",\
			"options": [{\
				"option": "Включая",\
				"value": "include"\
			},\
			{\
				"option": "Исключая",\
				"value": "exclude"\
			}]\
		},\
		{\
			"type": "select",\
			"field_name": "tags_condotion",\
			"options": [{\
				"option": "Каждый из указанных",\
				"value": "and"\
			},\
			{\
				"option": "Любой из указанных",\
				"value": "or"\
			}]\
		},\
		{\
			"type": "select_multiple",\
			"field_name": "tags_array",\
			"placeholder": "Тэги"\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"age",\
			"title":"Возраст",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "age_comparison",\
			"options": [{\
				"option": "Старше",\
				"value": "upward"\
			},\
			{\
				"option": "Старше или равно",\
				"value": "upward_or_equally"\
			},\
			{\
				"option": "Младше",\
				"value": "under"\
			},\
			{\
				"option": "Младше или равно",\
				"value": "under_or_equally"\
			},\
			{\
				"option": "Равно",\
				"value": "equally"\
			},\
			{\
				"option": "Диапазон дат рождения",\
				"value": "date_diapasone"\
			}]\
		},\
		{\
			"type": "inputData",\
			"field_name": "age_value",\
			"value": 0\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"ajax",\
			"title":"AJAX",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select_multiple_ajax",\
			"field_name": "tags_ajax",\
			"placeholder": "AJAX",\
			"url":"http://dynamic-form.msweb.org/domains.json"\
		}]\
	}]\
}';