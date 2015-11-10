<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Динамическая форма</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="assets/select2/css/select2.min.css" rel="stylesheet">

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

    <script src="assets/select2/select2.full.min.js"></script>

    <script src="assets/bootstrap-daterangepicker/moment.js"></script>
    <script src="assets/bootstrap-daterangepicker/daterangepicker.js"></script>


	<link rel="stylesheet" href="assets/dynamic-form.css">
    <script src="dynamic-form-config.js"></script>
    <script src="dynamic-form.js"></script>
	
	<script>
        var tags_array = [{id: '2', text: '222'},{id: '7', text: '777'},{id: '4', text: '444'}];
		var tags_ajax = [{id: '1', text: 'Москва'},{id: '246', text: 'Другой город'}];
	</script>

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

    <div class="container margtop45">
            <div id="forms_panel"></div>
            <div id="buttons_panel">
                <div class="controls">
                    <div id="add_form_button" class="btn btn-info btn-mini" type="button" style="margin-top: 6px; margin-bottom: 16px;">
                        <i class="icon-plus icon-white"></i> Добавить обязательное условия
                    </div>
                </div>
                <button class="btn btn-primary btn-large" id="search_button"><i class="icon-search icon-white"></i> Поиск</button>
            </div>
    </div>
	</script>
</body>
</html>
