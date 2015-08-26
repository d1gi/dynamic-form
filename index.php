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
            'quantity' => 1, // Допускается только одно такое условие в форме.
            'comparisons' => [
                '1' => 'Да',
                '0' => 'Нет',
            ],
        ],
        'orders_created' => [
            'title' => 'Создано заказов',
            'type'  => 'number_with_period',
            'quantity' => 1,
            'default'  => 1,
            'comparisons' => $comparisonsGT,
            'periods' => $periods,
        ],
        'orders_approved' => [
            'title' => 'Оплачено заказов',
            'type'  => 'number_with_period',
            'quantity' => 1,
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
            'quantity' => 'multiple', // Может быть множество условий
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
        'name' => [
            'title' => 'Имя',
            'type'  => 'string',
            'quantity' => 'multiple',
            'comparisons' => [
                'is'        => 'Полное соответсвие (is)',
                'contains'  => 'Содержит (contains)',
                'begin'     => 'Начинается с (begin)',
                'is_null'   => 'Пусто (is null)',
            ],
        ],
        'gender' => [
            'title' => 'Пол',
            'type'  => 'choice',
            'quantity' => 1,
            'comparisons' => [
                '1' => 'Мужской',
                '2' => 'Женский',
            ],
        ],
        // ---------------------------------------------
        'tags' => [
            'title' => 'Тэги',
            'type'  => 'multiselect', // Данные берутся из переменной tags
            'name_modifier' => [
                'tags_include' => 'Включая',
                'tags_exclude' => 'Исключая',
            ],
            'quantity' => 2,
            'comparisons' => [
                'and' => 'Каждый из указанных (and)',
                'or'  => 'Любой из указанных (or)',
            ],
            'data'  => 'tags',
            'hint'  => 'Выбор тэгов',
        ],
        'tags_include' => [ // это мутные костылики ;))
            'modified_for' => 'tags',
            'modifier' => 'tags_include',
        ],
        'tags_exclude' => [
            'modified_for' => 'tags',
            'modifier' => 'tags_exclude',
        ],
        'tags_include_comparison' => [
            'parent' => 'tags',
        ],
        'tags_exclude_comparison' => [
            'parent' => 'tags',
        ],
        // ---------------------------------------------
        'countries' => [
            'title' => 'Страны',
            'type'  => 'ajax', // Данные берутся из аякс запроса.
            'name_modifier' => [
                'countries_include' => 'Включая',
                'countries_exclude' => 'Исключая',
            ],
            'quantity' => 1,
            'url'   => 'countries.php',
            'hint'  => 'Поиск стран по первым символам',
        ],
        'countries_include' => [
            'modified_for' => 'countries',
            'modifier' => 'countries_include',
        ],
        'countries_exclude' => [
            'modified_for' => 'countries',
            'modifier' => 'countries_exclude',
        ],
        // ---------------------------------------------
        'birth_date' => [
            'title' => 'Возраст',
            'type'  => 'date_with_range', // Использовать функцию assignDaterangepicker():
            'quantity' => 1,
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

            <div class="controls" id="and_conditions"></div>

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

    </script>
</body>
</html>
