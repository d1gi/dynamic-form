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
				"value": "2"\
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
	}]\
}';
