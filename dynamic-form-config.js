//Описание условий и полей
initializationConditions = '{\
	"formarray": [\
	{\
		"FieldLine": [{\
			"name":"is_exist",\
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
			"name":"is_blacklist",\
			"title":"В черном списке",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "is_blacklist",\
			"options": [{\
				"option": "Нет",\
				"value": "0"\
			},\
			{\
				"option": "Да",\
				"value": "1"\
			}]\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"buyer",\
			"title":"Покупатель",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "buyer",\
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
			"name":"complaint",\
			"title":"Жаловался",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "complaint_comparison",\
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
			"field_name": "complaint",\
			"value": 0\
		},\
		{\
			"type": "select",\
			"field_name": "complaint_period",\
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
			"name":"unsubscribe",\
			"title":"Отписывался",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "unsubscribe_comparison",\
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
			"field_name": "unsubscribe",\
			"value": 1\
		},\
		{\
			"type": "select",\
			"field_name": "unsubscribe_period",\
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
			"name":"orders_created",\
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
			"name":"orders_approved",\
			"title":"Оплачено заказов",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "orders_approved_comparison",\
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
			"field_name": "orders_approved",\
			"value": 1\
		},\
		{\
			"type": "select",\
			"field_name": "orders_approved_period",\
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
	},\	\
	{\
		"FieldLine": [{\
			"name":"messages_sent",\
			"title":"Отправлено писем",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "messages_sent_comparison",\
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
			"field_name": "messages_sent",\
			"value": 1\
		},\
		{\
			"type": "select",\
			"field_name": "messages_sent_period",\
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
			"name":"clicks",\
			"title":"Кликов",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "clicks_comparison",\
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
			"field_name": "clicks",\
			"value": 1\
		},\
		{\
			"type": "select",\
			"field_name": "clicks_period",\
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
			"name":"opens",\
			"title":"Открытий",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "opens_comparison",\
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
			"field_name": "opens",\
			"value": 1\
		},\
		{\
			"type": "select",\
			"field_name": "opens_period",\
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
			"quantity":20,\
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
			"value": ""\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"username",\
			"title":"Имя пользователя",\
			"quantity":20,\
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
			"value": ""\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"gender",\
			"title":"Пол",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "gender",\
			"options": [{\
				"option": "Мужской",\
				"value": "1"\
			},\
			{\
				"option": "Женский",\
				"value": "2"\
			}]\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"tags",\
			"title":"Тэги",\
			"quantity":2,\
			"array":true\
		},\
		{\
			"type": "select",\
			"field_name": "mode",\
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
			"field_name": "comparison",\
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
			"field_name": "tags",\
			"placeholder": "Тэги"\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"birth_date",\
			"title":"Возраст",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "birth_date_comparison",\
			"options": [{\
				"option": "Старше",\
				"value": "age_gt"\
			},\
			{\
				"option": "Старше или равно",\
				"value": "age_gte"\
			},\
			{\
				"option": "Младше",\
				"value": "age_lt"\
			},\
			{\
				"option": "Младше или равно",\
				"value": "age_lte"\
			},\
			{\
				"option": "Равно",\
				"value": "age_eq"\
			},\
			{\
				"option": "Диапазон дат рождения",\
				"value": "range"\
			}]\
		},\
		{\
			"type": "inputData",\
			"field_name": "birth_date",\
			"value": 25\
		}]\
	},\
	{\
		"FieldLine": [{\
			"name":"cities",\
			"title":"Города",\
			"quantity":1,\
			"array":false\
		},\
		{\
			"type": "select",\
			"field_name": "cities",\
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
			"type": "select_multiple_ajax",\
			"field_name": "tags_ajax",\
			"placeholder": "Города",\
			"url":"/smart/ajax/citis.json"\
		}]\
	}]\
}';
