<?php

    $comparisonsGT = [
        //'never' => 'Ниразу (never)',
        //'even_once' => 'Хотя бы раз',
        'gt'  => 'Больше (gt)',
        'gte' => 'Больше или равно (gte)',
        'lt'  => 'Меньше (lt)',
        'lte' => 'Меньше или равно (lte)',
        'eq'  => 'Равно (eq)',
    ];

    $periods = [
        'all' => 'За всё время',
        '1w'  => 'За последнюю неделю',
        '2w'  => 'За последние две недели',
        '1m'  => 'За последний месяц',
        '2m'  => 'За последние два месяца',
        '3m'  => 'За последние три месяца',
        '6m'  => 'За последние полгода',
        '1y'  => 'За последний год',
    ];

    $conditions = [
        'is_exist' => [
            'title' => 'Существует',
            'type'  => 'choice',
            'choices' => [
                '1' => 'Да',
                '0' => 'Нет',
            ],
        ],
        'is_buyer' => [
            'title' => 'Покупатель',
            'type'  => 'choice',
            'choices' => [
                '1' => 'Да',
                '0' => 'Нет',
            ],
        ],
        'gender' => [
            'title' => 'Пол',
            'type' => 'choice',
            'fields' => [
                'select' => [
                    '1' => 'Мужской',
                    '2' => 'Женский',
                ],
            ],
        ],
        'username' => [
            'title' => 'Имя',
            'fields' => [
                [
                    'name' => 'username_comparison',
                    'type' => 'select',
                    'select' => [
                        'is'        => 'Полное соответсвие (is)',
                        'contains'  => 'Содержит (contains)',
                        'begin'     => 'Начинается с (begin)',
                        'is_null'   => 'Пусто (is null)',
                    ],
                ],
                [
                    'name' => 'username',
                    'type' => 'string',
                ],
            ],
        ],
        'orders_created' => [
            'title' => 'Создано заказов',
            'type'  => 'number_with_period',
            'default'  => 1,
            'comparisons' => $comparisonsGT,
            'periods' => $periods,
        ],
        'clicks' => [
            'title' => 'Кликал',
            'type'  => 'number_with_period',
            'default'  => 1,
            'comparisons' => $comparisonsGT,
            'periods' => $periods,
        ],
        'email' => [
            'title' => 'Email',
            // Данные отправляются в виде массива, например
            // ?email[2][comparison]=contains&email[2][value]=admin&email[3][comparison]=not_contains&email[3][value]=hi
            'input_name' => 'array',
            'type'  => 'string',
            'comparisons' => [
                'contains'      => 'Содержит (contains)',
                'not_contains'  => 'Не содержит (not_contains)',
                'begin'         => 'Начинается с (begin)',
                'not_begin'     => 'Не начинается с (not_begin)',
                'end'           => 'Кончается (end)',
                'not_end'       => 'Не кончается (not_end)',
                'is'            => 'Является (is)',
                'not_is'        => 'Не является (not_is)',
            ],
        ],
        // ---------------------------------------------
        'tags' => [
            'title' => 'Тэги',
            'type'  => 'multiselect', // Основное поле ввода с применением либы Select2.
            'name_modifier' => [ // Кол-во условий в случае применения
                'include' => 'Включая',
                'exclude' => 'Исключая',
            ],
            'quantity' => 2,
            'comparisons' => [
                'and' => 'Каждый из указанных (and)',
                'or'  => 'Любой из указанных (or)',
            ],
            'data'  => 'tags', // Данные берутся из переменной tags
            'hint'  => 'Выбор тэгов',
        ],
        // ---------------------------------------------
        'countries' => [
            'title' => 'Страны',
            'type'  => 'ajax', // Данные берутся из аякс запроса.
            'name_modifier' => [
                'include' => 'Включая',
                'exclude' => 'Исключая',
            ],
            'quantity' => 1, // Фильтр по странам может быть только один т.к. они не могут пересекаться.
            'url'   => 'countries.php',
            'hint'  => 'Поиск стран по первым символам',
        ],
        // ---------------------------------------------
        'birth_date' => [
            'title' => 'Возраст',
            'type'  => 'date_with_range', // Использовать функцию assignDaterangepicker():
            'default'  => 25, //'1990-01-01',
            'comparisons' => [
                'age_gt'  => 'Старше (age_gt)',
                'age_gte' => 'Старше или равно (age_gte)',
                'age_lt'  => 'Младше (age_lt)',
                'age_lte' => 'Младше или равно (age_lte)',
                'age_eq'  => 'Равно (age_eq)',
                //'age_range' => 'Диапазон возрастов (age_range)',
                'range' => 'Диапазон дат рождения (range)',
            ],
        ],
    ];

    $conditions_2 = [
        [
            'title' => 'Существует',
            'fields' => [
                [
                    'name' => 'is_exist',
                    'type' => 'select',
                    'options' => [
                        '1' => 'Да',
                        '0' => 'Нет',
                    ],
                ],
            ],
        ],
        [
            'title' => 'Пол',
            'fields' => [
                [
                    'name' => 'gender',
                    'type' => 'select',
                    'options' => [
                        '1' => 'Мужской',
                        '2' => 'Женский',
                    ],
                ],
            ],
        ],
        [
            'title' => 'Имя',
            'fields' => [
                [
                    'name' => 'username_comparison',
                    'type' => 'select',
                    'options' => [
                        'is'        => 'Полное соответсвие (is)',
                        'contains'  => 'Содержит (contains)',
                        'begin'     => 'Начинается с (begin)',
                        'is_null'   => 'Пусто (is null)',
                    ],
                ],
                [
                    'name' => 'username',
                    'type' => 'text',
                ],
            ],
        ],
        [
            'title' => 'Создано заказов',
            'fields' => [
                [
                    'name' => 'orders_created_comparison',
                    'type' => 'select',
                    'options' => $comparisonsGT,
                ],
                [
                    'name' => 'orders_created',
                    'type' => 'text',
                    'default'  => 1, // Значение по умолчанию.
                ],
                [
                    'name' => 'orders_created_period',
                    'type' => 'select',
                    'options' => $periods,
                ],
            ],
        ],
        [
            'title' => 'Email',
            'quantity' => 'multiple', // Может быть произвольное кол-во условий
            // Данные отправляются в виде массива, например:
            // ?email[2][comparison]=contains&email[2][value]=admin&email[3][comparison]=not_contains&email[3][value]=hi
            'fields' => [
                [
                    // Здесь вместо {condition_id} подставляется любое число, например порядковый номер условия, который генерируется автоматически...
                    'name' => 'email[{condition_id}][comparison]',
                    'type' => 'select',
                    'options' => [
                        'contains'      => 'Содержит (contains)',
                        'not_contains'  => 'Не содержит (not_contains)',
                        'begin'         => 'Начинается с (begin)',
                        'not_begin'     => 'Не начинается с (not_begin)',
                        'end'           => 'Кончается (end)',
                        'not_end'       => 'Не кончается (not_end)',
                        'is'            => 'Является (is)',
                        'not_is'        => 'Не является (not_is)',
                    ],
                ],
                [
                    'name' => 'email[{condition_id}][value]',
                    'type' => 'text',
                ],
            ],

        ],
        [
            'title' => 'Тэги',
            'fields' => [
                [
                    // Внешне выглядит как обычный select, но по сути он занимается только модифицированием имён остальных полей в данном условии.
                    'type' => 'name_modifier',
                    'options' => [
                        'tags_include' => 'Включая',
                        'tags_exclude' => 'Исключая',
                    ],
                ],
                [
                    // Здесь вместо {this} подставляется текущий выбранный name_modifier
                    'name' => '{this}_comparison', // Например tags_include_comparison и tags_exclude_comparison
                    'type' => 'select',
                    'options' => [
                        'and' => 'Каждый из указанных (and)',
                        'or'  => 'Любой из указанных (or)',
                    ],
                ],
                [
                    'name' => '{this}', // Например tags_include и tags_exclude
                    'type' => 'select2', // Используется библиотека Select2, по сути это обычный <input type="text" class="select2-input input-xxlarge" autocomplete="on">
                    'function' => 'MultiAutoComplete', // Например будет вызвана функция: MultiAutoComplete('#3tags', 'Выбор тэгов', tags);
                    'function_args' => ['element_id', 'placeholder', 'data'],
                    'data' => 'tags', // Данные берутся из переменной tags, а если типа data будет массив, то подставить его в функцию.
                    'placeholder' => 'Выбор тэгов',
                ],
            ],
        ],
        [
            'title' => 'Страны',
            'quantity' => 1, // Условие по странам может быть только одно т.к. они не могут пересекаться.
            'fields' => [
                [
                    'type' => 'name_modifier',
                    'options' => [
                        'countries_include' => 'Включая',
                        'countries_exclude' => 'Исключая',
                    ],
                ],
                [
                    'name' => '{this}', // Например countries_include и countries_exclude
                    // Как вариант можно вообще не использовать тип select2, а сделать вот так:
                    'type' => 'text', // Вместо 'select2', как пример с тэгами, можно делать вот так :)
                    'attr' => [
                        'class' => 'select2-input input-xxlarge',
                        'autocomplete' => 'on',
                    ],
                    'function' => 'MultiAjaxAutoComplete', // Например будет вызвана функция: MultiAjaxAutoComplete('#3countries', '/countries.php', 'Поиск стран по первым символам');
                    'function_args' => ['element_id', 'url', 'placeholder'],
                    'placeholder'   => 'Поиск стран по первым символам',
                    'url'   => '/countries.php',
                ],
            ],
        ],
        [
            'title' => 'Возраст',
            'fields' => [
                [
                    'name' => 'birth_date_comparison',
                    'type' => 'select',
                    'options' => [
                        'age_gt'  => 'Старше (age_gt)',
                        'age_gte' => 'Старше или равно (age_gte)',
                        'age_lt'  => 'Младше (age_lt)',
                        'age_lte' => 'Младше или равно (age_lte)',
                        'age_eq'  => 'Равно (age_eq)',
                        //'age_range' => 'Диапазон возрастов (age_range)',
                        'range' => 'Диапазон дат рождения (range)',
                    ],
                    'on_change' => [
                        // Вызвать при выборе 'range', при этом продумать момент чтобы при выборе не 'range' выставлялось значение по умолчанию, как указано в 'birth_date'
                        'range' => [
                            'function' => 'assignDaterangepicker;',
                            'function_args' => ['birth_date', false],
                        ],
                    ],
                ],
                [
                    [
                        'name' => 'birth_date',
                        'type' => 'text',
                        'default'  => 25,
                    ],
                ],
            ],
        ],
    ];

?><!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Динамическая форма</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">

    <link href="assets/select2/select2.css" rel="stylesheet">
    <link href="assets/select2/select2-bootstrap.css" rel="stylesheet">

    <style type="text/css">
        body {
            padding-top: 60px;
            padding-bottom: 40px;
        }
        label span {
            color: red;
        }
        .clear {
            clear: both;
            display: block;
            overflow: hidden;
            visibility: hidden;
            width: 0;
            height: 0;
        }
        .form-button {
            margin: 3px 0px 5px 20px;
            float: left;
        }
        .form-horizontal {
            margin: 5px 0 5px;
        }
        .form-horizontal .control-group {
            margin-bottom: 12px;
        }
        .form-horizontal .control-label {
            width: 180px;
        }
        .form-horizontal .controls {
            margin-left: 200px;
        }
        .form-horizontal option[selected=selected] {
            color: blue;
            font-weight: bold;
        }
        .container-wide {
            width: 95%;
        }
        .navbar a {
            text-decoration: none;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: normal;
            font-size: 14px;
        }
        .navbar ul.nav li.dropdown:hover ul.dropdown-menu {
            display: block;
            margin: 0;
        }
        .navbar a.menu:after,
        .navbar .dropdown-toggle:after {
            content: none;
        }
        .wysiwyg {
            height: 388px;
        }
        .pm_period_selector a {
            margin-left: 6px;
            border-bottom: dotted 1px;
        }
        .pm_period_selector a:hover {
            margin-left: 6px;
            text-decoration: none;
            border-bottom: 1px solid;
        }
        .pm_period_selector {
            float: right;
        }
    </style>

    <link rel="stylesheet" type="text/css" href="assets/bootstrap-daterangepicker/daterangepicker-bs2.css">
    <style type="text/css">
        .conditions {
            display: inline;
        }
        .task_select_group {
            margin-top: 4px;
        }
        .task_select_group select {
            margin-right: 4px;
        }
        .remove {
            margin-top: 4px;
            margin-right: 4px;
            float: left;
        }
        .ms-choice {
            margin-left: 3px;
            margin-bottom: 12px;
            height: 30px;
            line-height: 30px;
        }
        .ms-drop {
            margin-left: 3px;
            margin-top: -12px;
        }
    </style>
    <script src="assets/jquery-1.11.2.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>

    <script src="assets/select2/select2.min.js"></script>
    <script src="assets/select2/select2_locale_ru.js"></script>
    <script src="assets/bootstrap-daterangepicker/moment.js"></script>
    <script src="assets/bootstrap-daterangepicker/daterangepicker.js"></script>

</head>
<body>

    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a class="brand" href="#">Dynamic Form</a>

                <div class="nav-collapse collapse">
                    <ul class="nav">
                    </ul>

                    <ul class="nav pull-right">

                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user icon-white"></i> root <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class=""><a href="#user"><i class="icon-cog"></i> Мой профиль</a></li>
                                <li class="divider"></li>
                                <li class=""><a href="#logout"><i class="icon-off"></i> Выход</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>
    </div><!--/.navbar -->

    <div class="container">
        <form method="get">

            <!-- type = choice (is_exist) -->
            <div class="controls" id="and_conditions">
                <div id="criteria_2">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_2" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option selected="selected" value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option value="email">Email</option>
                        <option value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>
                    <div id="conditions_2" class="conditions">
                        <select id="" class="input-xlarge" name="is_exist">
                            <option value="0">Нет</option>
                            <option selected="selected" value="1">Да</option>
                        </select>
                    </div>
                </div>


                <div id="criteria_3">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_3" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option value="email">Email</option>
                        <option value="name">Имя</option>
                        <option selected="selected" value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>
                    <div id="conditions_3" class="conditions">
                        <select id="3tagsname_modifier" class="input-medium">
                            <option value="tags_include">Включая</option>
                            <option selected="selected" value="tags_exclude">Исключая</option>
                        </select>
                        <select class="input-large" name="tags_exclude_comparison">
                            <option value="and">Каждый из указанных (and)</option>
                            <option value="or">Любой из указанных (or)</option>
                        </select>
                        <input id="3tags" class="select2-input input-xxlarge" type="text" value="4,7" autocomplete="on" name="tags_exclude">
                    </div>
                </div>

                <!-- type = number_with_period (orders_created) -->
                <div id="criteria_4">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_4" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option selected="selected" value="orders_created">Создано заказов</option>
                        <option value="email">Email</option>
                        <option value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>
                    <div id="conditions_4" class="conditions">
                        <select class="input-xlarge" name="orders_created_comparison">
                            <option value="gt">Больше (gt)</option>
                            <option selected="selected" value="gte">Больше или равно (gte)</option>
                            <option value="lt">Меньше (lt)</option>
                            <option value="lte">Меньше или равно (lte)</option>
                            <option value="eq">Равно (eq)</option>
                        </select>
                        <input type="number" required="required" value="3" name="orders_created">
                        <select class="input-xlarge" name="orders_created_period">
                            <option value="all">За всё время</option>
                            <option value="1w">За последнюю неделю</option>
                            <option selected="selected" value="2w">За последние две недели</option>
                            <option value="1m">За последний месяц</option>
                            <option value="2m">За последние два месяца</option>
                            <option value="3m">За последние три месяца</option>
                            <option value="6m">За последние полгода</option>
                            <option value="1y">За последний год</option>
                        </select>
                    </div>
                </div>

                <!-- type = string (name) -->
                <div id="criteria_5">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_5" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option value="email">Email</option>
                        <option selected="selected" value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>
                    <div id="conditions_5" class="conditions">
                        <select class="input-xlarge" name="name_comparison">
                            <option value="is">Полное соответсвие (is)</option>
                            <option selected="selected" value="contains">Содержит (contains)</option>
                            <option value="begin">Начинается с (begin)</option>
                            <option value="is_null">Пусто (is null)</option>
                        </select>
                        <input type="text" value="ва" name="name">
                    </div>
                </div>

                <!-- type = array (email)-->
                <div id="criteria_6">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_6" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option selected="selected" value="email">Email</option>
                        <option value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>

                    <div id="conditions_6" class="conditions">
                        <select class="input-xlarge" name="email[6][comparison]">
                            <option value="contains">Содержит (contains)</option>
                            <option value="not_contains">Не содержит (not_contains)</option>
                            <option value="begin">Начинается с (begin)</option>
                            <option selected="selected" value="not_begin">Не начинается с (not_begin)</option>
                            <option value="end">Кончается (end)</option>
                            <option value="not_end">Не кончается (not_end)</option>
                            <option value="is">Является (is)</option>
                            <option value="not_is">Не является (not_is)</option>
                        </select>
                        <input type="text" value="admin@" name="email[6][value]">
                    </div>
                </div>
                <div id="criteria_7">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_7" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option selected="selected" value="email">Email</option>
                        <option value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option value="birth_date">Возраст</option>
                    </select>

                    <div id="conditions_7" class="conditions">
                        <select class="input-xlarge" name="email[7][comparison]">
                            <option selected="selected" value="contains">Содержит (contains)</option>
                            <option value="not_contains">Не содержит (not_contains)</option>
                            <option value="begin">Начинается с (begin)</option>
                            <option value="not_begin">Не начинается с (not_begin)</option>
                            <option value="end">Кончается (end)</option>
                            <option value="not_end">Не кончается (not_end)</option>
                            <option value="is">Является (is)</option>
                            <option value="not_is">Не является (not_is)</option>
                        </select>
                        <input type="text" value="as" name="email[7][value]">
                    </div>
                </div>

                <!-- type = date_with_range (birth_date) -->
                <div id="criteria_8">
                    <button class="btn btn-danger btn-mini remove" title="Удалить" type="button"><b>x</b></button>
                    <select id="field_7" class="input-large" name="">
                        <option value="0">Выберите условие...</option>
                        <option value="is_exist">Существует</option>
                        <option value="orders_created">Создано заказов</option>
                        <option value="email">Email</option>
                        <option value="name">Имя</option>
                        <option value="tags">Тэги</option>
                        <option value="countries">Страны</option>
                        <option selected="selected" value="birth_date">Возраст</option>
                    </select>

                    <div id="conditions_8" class="conditions">
                        <select class="input-xlarge" name="birth_date_comparison">
                            <option value="age_gt">Старше (age_gt)</option>
                            <option value="age_gte">Старше или равно (age_gte)</option>
                            <option value="age_lt">Младше (age_lt)</option>
                            <option value="age_lte">Младше или равно (age_lte)</option>
                            <option value="age_eq">Равно (age_eq)</option>
                            <option selected="selected" value="range">Диапазон дат рождения (range)</option>
                        </select>
                        <input type="text" required="required" value="1990-01-01 - 2000-01-01" name="birth_date">
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="button_add_and_condition" class="btn btn-info btn-mini" type="button" style="margin-top: 6px; margin-bottom: 16px;">
                    <i class="icon-plus icon-white"></i> Добавить обязательное условия
                </button>
            </div>

            <button class="btn btn-primary btn-large"><i class="icon-search icon-white"></i> Поиск</button>

        </form>

    </div>

    <script type="text/javascript">
        var tags = [
            {id: '2', text: '222'},
            {id: '7', text: '777'},
            {id: '4', text: '444'},
        ];

        var conditions_json = <?php echo json_encode($conditions, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>


        var conditions2_json = <?php echo json_encode($conditions_2, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>


        function MultiAutoComplete(element, placeholder, data) {
            $(element).select2({
                placeholder: placeholder,
                multiple: true,
                data: data
            });
        };

        function MultiAjaxAutoComplete(element, url, placeholder) {
            $(element).select2({
                placeholder: placeholder,
                minimumInputLength: 1,
                multiple: true,

                id: function(e) { return e.id },
                ajax: {
                    url: url,
                    data: function(term, page) {
                        return {
                            q: term,
                            limit: 30
                        };
                    },
                    results: function(data, page) {
                        return {
                            results: data
                        };
                    }
                },
                formatResult: formatResult,
                formatSelection: formatSelection,
                initSelection: function(element, callback) {
                    var data = [];
                    $(element.val().split(',')).each(function(i) {
                        var item = this.split(':');
                        data.push({
                            id: item[0],
                            name: item[1]
                        });
                    });
                    callback(data);
                }
            });
        };

        function formatResult(data) {
            return '<div>' + data.name + '</div>';
        }

        function formatSelection(data) {
            return data.name;
        }

        function assignDaterangepicker(field, singleDatePicker) {
            $('input[name="' + field + '"]').daterangepicker({
                singleDatePicker: singleDatePicker,
                showDropdowns: true,
                //separator: " x ",
                format: 'YYYY-MM-DD',
                //startDate: '1990-01-01',
                //endDate: '2015-01-01',
                locale: {
                    //separator: " - ",
                    applyLabel: "Применить",
                    cancelLabel: "Отменить",
                    fromLabel: "От",
                    toLabel: "До",
                    customRangeLabel: "Custom",
                    daysOfWeek: [
                        "Вс",
                        "Пн",
                        "Вт",
                        "Ср",
                        "Чт",
                        "Пт",
                        "Сб"
                    ],
                    monthNames: [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    firstDay: 1
                }
            });
        }


        $('#button_add_and_condition').click(function() {
            alert('@todo');
        });


        // Demo data
        MultiAutoComplete('#3tags', 'Выбор тэгов', tags);
        assignDaterangepicker('birth_date', false);

    </script>
</body>
</html>
