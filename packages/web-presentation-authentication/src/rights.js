export default {

    // Администрирование
    /**
     * Настройка сотрудников Системы – создание/редактирование/удаление сотрудника
     */
    EDIT_EMPLOYEES: 'EDIT_EMPLOYEES',

    /**
     * Просмотр сотрудников Системы
     */
    VIEW_EMPLOYEES: 'VIEW_EMPLOYEES',

    /**
     * Настройка ролей Системы – создание/редактирование/удаление роли и наполнение роли функциональными правами
     */
    EDIT_ROLES: 'EDIT_ROLES',

    /**
     * Просмотр ролей Системы
     */
    VIEW_ROLES: 'VIEW_ROLES',

    /**
     * Назначение ролей "Главный администратор системы" и ""Администратор системы"
     */
    SET_ADMIN_ROLE: 'SET_ADMIN_ROLE',

    /**
     * Настройка учётных записей пользователей Системы – создание/редактирование/удаление учётной записи
     */
    EDIT_USERS: 'EDIT_USERS',

    // Администрирование продуктовых справочников
    /**
     * Настройка продуктовых справочников Системы - создание/редактирование/удаление/настройка печатных форм
     */
    EDIT_PRODUCT_SETTINGS: 'EDIT_PRODUCT_SETTINGS',

    /**
     * Настройка андеррайтерских коэффициентов для страховых продуктов
     */
    EDIT_UNDERWRITING_COEFFICIENTS: 'EDIT_UNDERWRITING_COEFFICIENTS',

    /**
     * Изменение страховых сумм, при которых требуется проведение андеррайтинга
     */
    EDIT_UNDERWRITING_SUMS: 'EDIT_UNDERWRITING_SUMS',

    // Клиентские данные
    /**
     * Поиск и просмотр карточки клиента
     */
    VIEW_CLIENT: 'VIEW_CLIENT',

    /**
     * Просмотр всех договоров страхования, найденного клиента, не зависимо от принадлежности к ВСП
     */
    VIEW_CLIENT_CONTRACTS: 'VIEW_CLIENT_CONTRACTS',

    // Договора страхования
    /**
     * Создание договоров по продуктам, доступных данному пользователю
     */
    CREATE_CONTRACT: 'CREATE_CONTRACT',

    /**
     * Внесение изменений в договора страхования, доступные данному пользователю
     */
    EDIT_CONTRACT: 'EDIT_CONTRACT',

    /**
     * Удаление договоров по продуктам, доступных данному пользователю
     */
    DELETE_CONTRACT: 'DELETE_CONTRACT',

    /**
     * Просмотр списка всех договоров страхования
     */
    VIEW_CONTRACT_LIST_ALL: 'VIEW_CONTRACT_LIST_ALL',

    /**
     * Просмотр списка договоров страхования всех пользователей данного РФ и ВСП
     */
    VIEW_CONTRACT_LIST_RF_VSP: 'VIEW_CONTRACT_LIST_RF_VSP',

    /**
     * Просмотр списка договоров страхования всех пользователей данного ВСП
     */
    VIEW_CONTRACT_LIST_VSP: 'VIEW_CONTRACT_LIST_VSP',

    /**
     * Просмотр списка договоров страхования, оформленных данным Работником
     */
    VIEW_CONTRACT_LIST_OWNER: 'VIEW_CONTRACT_LIST_OWNER',

    /**
     * Формирование отчетов по всем продажам
     */
    VIEW_CONTRACT_REPORT_ALL: 'VIEW_CONTRACT_REPORT_ALL',

    /**
     * Формирование отчетов по продажам по закрепленным РФ и ВСП
     */
    VIEW_CONTRACT_REPORT_RF_VSP: 'VIEW_CONTRACT_REPORT_RF_VSP',

    /**
     * Формирование отчетов по продажам по ВСП
     */
    VIEW_CONTRACT_REPORT_VSP: 'VIEW_CONTRACT_REPORT_VSP',

    /**
     * Формирование отчетов по продажам по своим продажам
     */
    VIEW_CONTRACT_REPORT_OWNER: 'VIEW_CONTRACT_REPORT_OWNER',

    // Андеррайтинг договоров страхования
    /**
     * Просмотр списка договоров в статусе «Требуют проведение андерайтинга» с принадлежностью к ВСП Работника
     */
    VIEW_CONTRACT_REQUIRED_UNDERWRITING: 'VIEW_CONTRACT_REQUIRED_UNDERWRITING',

    /**
     * Перевод договора из статуса «Требует проведение андерайтинга» в другие статусы
     */
    CHANGE_STATE_CONTRACT_REQUIRED_UNDERWRITING: 'CHANGE_STATE_CONTRACT_REQUIRED_UNDERWRITING',

    /**
     * Изменение страховых сумм, состава рисков, тарифов, страховых премий в статусе договора «Требует проведение андерайтинга»
     */
    EDIT_CONTRACT_REQUIRED_UNDERWRITING: 'EDIT_CONTRACT_REQUIRED_UNDERWRITING',

    /**
     * Клиент: просмотр списка договоров
     */
    CLIENT_VIEW_CONTRACTS_LIST: 'CLIENT_VIEW_CONTRACTS_LIST',

    /**
     * Клиент: просмотр информации по договору
     */
    CLIENT_VIEW_CONTRACT: 'CLIENT_VIEW_CONTRACT',

    /**
     * Доступ к клиентам, кроме зарегистрированных в ГО
     * (дает право поиска  и просмотра карточки клиента и  всей информации по клиенту, его продуктам, истории операций)
     */
    ACCESS_CLIENTS_EXCEPT_MAIN_OFFICE: 'ACCESS_CLIENTS_EXCEPT_MAIN_OFFICE',
    /**
     * Доступ к клиентам, зарегистрированным в ГО
     * (дает право поиска  и просмотра карточки клиента и  всей информации по клиенту, его продуктам, истории операций)
     */
    ACCESS_CLIENTS_MAIN_OFFICE: 'ACCESS_CLIENTS_MAIN_OFFICE',
    /**
     * Создание нового клиента
     */
    EXECUTE_CREATE_CLIENT: 'EXECUTE_CREATE_CLIENT',
    /**
     * Редактирование данных клиента
     */
    EXECUTE_EDIT_CLIENT: 'EXECUTE_EDIT_CLIENT',
    /**
     * Выполнение функции контроля в операции «Редактирование данных клиента»
     */
    INSPECT_EDIT_CLIENT: 'INSPECT_EDIT_CLIENT',
    /**
     * Просмотр кодового слова
     */
    VIEW_CODE_WORD: 'VIEW_CODE_WORD',
    /**
     * Доступ к данным сотрудников
     * (продуктовый профиль РФ, в котором работник числится сотрудником)
     */
    ACCESS_EMPLOYEE_PRODUCT_PROFILE: 'ACCESS_EMPLOYEE_PRODUCT_PROFILE',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Открытие вклада»
     */
    EXECUTE_OPEN_DEPOSIT_PROCESS: 'EXECUTE_OPEN_DEPOSIT_PROCESS',
    /**
     * Выполнение функции контроля в операции «Открытие вклада»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_OPEN_DEPOSIT_PROCESS: 'INSPECT_OPEN_DEPOSIT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Открытие вклада»
     */
    ANALYZE_OPEN_DEPOSIT_PROCESS_ERRORS: 'ANALYZE_OPEN_DEPOSIT_PROCESS_ERRORS',
    /**
     * Инициация операции  и выполнение функции ввода и печати документов в операции «Закрытие вклада»
     */
    EXECUTE_CLOSE_DEPOSIT_PROCESS: 'EXECUTE_CLOSE_DEPOSIT_PROCESS',
    /**
     * Выполнение функции контроля в операции «Закрытие вклада»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_CLOSE_DEPOSIT_PROCESS: 'INSPECT_CLOSE_DEPOSIT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Закрытие вклада»
     */
    ANALYZE_CLOSE_DEPOSIT_PROCESS_ERRORS: 'ANALYZE_CLOSE_DEPOSIT_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Переоформление вклада»
     */
    EXECUTE_RENOVATION_DEPOSIT_PROCESS: 'EXECUTE_RENOVATION_DEPOSIT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Переоформление вклада»
     */
    ANALYZE_RENOVATION_DEPOSIT_PROCESS_ERRORS: 'ANALYZE_RENOVATION_DEPOSIT_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Открытие счета»
     */
    EXECUTE_OPEN_ACCOUNT_PROCESS: 'EXECUTE_OPEN_ACCOUNT_PROCESS',
    /**
     * Выполнение функции контроля в операции «Открытие счета»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_OPEN_ACCOUNT_PROCESS: 'INSPECT_OPEN_ACCOUNT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Открытие счета»
     */
    ANALYZE_OPEN_ACCOUNT_PROCESS_ERRORS: 'ANALYZE_OPEN_ACCOUNT_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Закрытие счета»
     */
    EXECUTE_CLOSE_ACCOUNT_PROCESS: 'EXECUTE_CLOSE_ACCOUNT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Закрытие счета»
     */
    ANALYZE_CLOSE_ACCOUNT_PROCESS_ERRORS: 'ANALYZE_CLOSE_ACCOUNT_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Формирование выписки с движением средств по счету и остатком»
     */
    EXECUTE_FUNDS_MOVEMENT_STATEMENT_PROCESS: 'EXECUTE_FUNDS_MOVEMENT_STATEMENT_PROCESS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Формирование выписки с остатком по счету»
     */
    EXECUTE_BALANCE_STATEMENT_PROCESS: 'EXECUTE_BALANCE_STATEMENT_PROCESS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Формирование справки об остатке денежных средств»
     */
    EXECUTE_BALANCE_CERTIFICATE_PROCESS: 'EXECUTE_BALANCE_CERTIFICATE_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Формирование справки об остатке денежных средств»
     */
    ANALYZE_BALANCE_CERTIFICATE_PROCESS_ERRORS: 'ANALYZE_BALANCE_CERTIFICATE_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Оформление доверенности»
     */
    EXECUTE_CREATE_POA_PROCESS: 'EXECUTE_CREATE_POA_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Оформление доверенности»
     */
    ANALYZE_CREATE_POA_PROCESS_ERRORS: 'ANALYZE_CREATE_POA_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Отмена доверенности»
     */
    EXECUTE_CANCEL_POA_PROCESS: 'EXECUTE_CANCEL_POA_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Отмена доверенности»
     */
    ANALYZE_CANCEL_POA_PROCESS_ERRORS: 'ANALYZE_CANCEL_POA_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Оформление завещательного распоряжения»
     */
    EXECUTE_CREATE_DEATH_WISH_PROCESS: 'EXECUTE_CREATE_DEATH_WISH_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Оформление завещательного распоряжения»
     */
    ANALYZE_CREATE_DEATH_WISH_PROCESS_ERRORS: 'ANALYZE_CREATE_DEATH_WISH_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Отмена завещательного распоряжения»
     */
    EXECUTE_CANCEL_DEATH_WISH_PROCESS: 'EXECUTE_CANCEL_DEATH_WISH_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Отмена завещательного распоряжения»
     */
    ANALYZE_CANCEL_DEATH_WISH_PROCESS_ERRORS: 'ANALYZE_CANCEL_DEATH_WISH_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Перевод между счетами клиента»
     */
    EXECUTE_ACCOUNTS_TRANSFER_PROCESS: 'EXECUTE_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции контроля в операции «Перевод между счетами клиента»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_ACCOUNTS_TRANSFER_PROCESS: 'INSPECT_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Перевод между счетами клиента»
     */
    ANALYZE_ACCOUNTS_TRANSFER_PROCESS_ERRORS: 'ANALYZE_ACCOUNTS_TRANSFER_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Перевод со счета клиента на счет другого клиента Банка»
     */
    EXECUTE_INTERNAL_ACCOUNTS_TRANSFER_PROCESS: 'EXECUTE_INTERNAL_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции контроля в операции «Перевод со счета клиента на счет другого клиента Банка»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_INTERNAL_ACCOUNTS_TRANSFER_PROCESS: 'INSPECT_INTERNAL_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Перевод со счета клиента на счет другого клиента Банка»
     */
    ANALYZE_INTERNAL_ACCOUNTS_TRANSFER_PROCESS_ERRORS: 'ANALYZE_INTERNAL_ACCOUNTS_TRANSFER_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Перевод в другой банк по произвольным реквизитам»
     */
    EXECUTE_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS: 'EXECUTE_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции контроля в операции «Перевод в другой банк по произвольным реквизитам»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS: 'INSPECT_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Перевод в другой банк по произвольным реквизитам»
     */
    ANALYZE_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS_ERRORS: 'ANALYZE_EXTERNAL_ACCOUNTS_TRANSFER_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Пополнение счета/вклада наличными денежными средствами»
     */
    EXECUTE_CASH_IN_PROCESS: 'EXECUTE_CASH_IN_PROCESS',
    /**
     * Выполнение функции контроля в операции «Пополнение счета/вклада наличными денежными средствами»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_CASH_IN_PROCESS: 'INSPECT_CASH_IN_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Пополнение счета/вклада наличными денежными средствами»
     */
    ANALYZE_CASH_IN_PROCESS_ERRORS: 'ANALYZE_CASH_IN_PROCESS_ERRORS',
    /**
     * Инициация операции и выполнение функции ввода и печати документов в операции «Снятия со счета/вклада наличных денежных средств»
     */
    EXECUTE_CASH_OUT_PROCESS: 'EXECUTE_CASH_OUT_PROCESS',
    /**
     * Выполнение функции контроля в операции «Снятия со счета/вклада наличных денежных средств»
     * (Пользователь не может быть контролером по операциям, которые сам инициировал)
     */
    INSPECT_CASH_OUT_PROCESS: 'INSPECT_CASH_OUT_PROCESS',
    /**
     * Выполнение функции разбора ошибок в операции «Снятия со счета/вклада наличных денежных средств»
     */
    ANALYZE_CASH_OUT_PROCESS_ERRORS: 'ANALYZE_CASH_OUT_PROCESS_ERRORS',
    /**
     * Работа
     * (доступ, взять задачу на исполнение, выполнение задачи, возврат задачи в пул)
     * с задачами своего подразделения
     */
    TASKS_SELF_MANAGEMENT_IN_DIVISION: 'TASKS_SELF_MANAGEMENT_IN_DIVISION',
    /**
     * Работа
     * (доступ, взять задачу на исполнение, выполнение задачи, возврат задачи в пул)
     * с задачами своего РФ
     */
    TASKS_SELF_MANAGEMENT_IN_FILIAL: 'TASKS_SELF_MANAGEMENT_IN_FILIAL',
    /**
     * Мониторинг и переназначение задач между работниками подразделения
     */
    TASKS_MANAGEMENT: 'TASKS_MANAGEMENT',
    /**
     * Получение отчетности
     */
    REPORTING: 'REPORTING',
    /**
     * Создание и редактирование шаблонов персональных предложений
     * (реализовано в функционале ДБО ФЛ)
     */
    EDIT_PERSONAL_OFFER_TEMPLATE: 'EDIT_PERSONAL_OFFER_TEMPLATE',
    /**
     * Создание и редактирование справочников откликов
     * (реализовано в функционале ДБО ФЛ)
     */
    EDIT_PERSONAL_OFFER_REPLY_DICTIONARIES: 'EDIT_PERSONAL_OFFER_REPLY_DICTIONARIES',
    /**
     * Ведение бизнес-справочников
     * (справочники общие, клиентские, продуктовые)
     */
    EDIT_BUSINESS_DICTIONARIES: 'EDIT_BUSINESS_DICTIONARIES',
    /**
     * Просмотр бизнес-справочников
     */
    VIEW_BUSINESS_DICTIONARIES: 'VIEW_BUSINESS_DICTIONARIES',
    /**
     * Ведение системных справочников
     * (внешние системы, микросервисы, параметры решения и т.п.)
     */
    EDIT_SYSTEM_DICTIONARIES: 'EDIT_SYSTEM_DICTIONARIES',
    /**
     * Настройка протоколирования Системы
     */
    EDIT_LOGGING: 'EDIT_LOGGING',
    /**
     * Просмотр журналов регистрации событий
     */
    VIEW_OPERATIONAL_LOG: 'VIEW_OPERATIONAL_LOG',
    /**
     * Просмотр архивированных журналов регистрации событий
     */
    VIEW_ARCHIVED_LOG: 'VIEW_ARCHIVED_LOG',
    /**
     * Удаление архивированных журналов регистрации событий
     */
    REMOVE_ARCHIVED_LOG: 'REMOVE_ARCHIVED_LOG',
    /**
     * Выгрузка журналов регистрации событий в файл
     */
    DOWNLOAD_LOG: 'DOWNLOAD_LOG',
    /**
     * Настройка операций, выполняющихся задач по расписанию
     */
    EDIT_SCHEDULE_TASK_SETTINGS: 'EDIT_SCHEDULE_TASK_SETTINGS',
    /**
     * Просмотр журнала о выполнении операций по расписанию
     */
    VIEW_SCHEDULE_TASK_LOG: 'VIEW_SCHEDULE_TASK_LOG',
    /**
     * Сброс сессии пользователя
     */
    CANCEL_CLIENT_SESSION: 'CANCEL_CLIENT_SESSION',
    /**
     * Импорт доверенностей сотрудников банка
     */
    IMPORT_EMPLOYEE_POA: 'IMPORT_EMPLOYEE_POA',
    /**
     * Просмотр доверенностей сотрудников банка
     */
    VIEW_EMPLOYEE_POA: 'VIEW_EMPLOYEE_POA',
    /**
     * Просмотр договоров оформленных через кол. центр
     */
    VIEW_CONTRACT_EXECUTED_IN_CALL_CENTER: 'VIEW_CONTRACT_EXECUTED_IN_CALL_CENTER',
    /**
     * Создание договора в кол. центре
     */
    CREATE_CONTRACT_IN_CALL_CENTER: 'CREATE_CONTRACT_IN_CALL_CENTER',
    /**
     * Право установки признака получения полного комплекта документов
     */
    UPDATE_FULL_SET_DOCUMENT: 'UPDATE_FULL_SET_DOCUMENT',
    /**
     * Запуск проверки клиентов в ручном режиме
     */
    MANUAL_CHECK_CLIENT: 'MANUAL_CHECK_CLIENT',

    CONTROL_MOTIVATION_PROGRAMS: 'CONTROL_MOTIVATION_PROGRAMS',

    VIEW_MOTIVATION_PROGRAMS: 'VIEW_MOTIVATION_PROGRAMS',

    TAKE_PART_IN_MOTIVATION_PROGRAMS: 'TAKE_PART_IN_MOTIVATION_PROGRAMS',

    VIEW_PERSONAL_OFFICE: 'VIEW_PERSONAL_OFFICE',

    RESET_CLIENT_PASSWORD: 'RESET_CLIENT_PASSWORD',

    MOTIVATION_REPORT_CREATE: 'MOTIVATION_REPORT_CREATE',

    /**
     * Перевод договора в статус оплачен и расторгнут
     */
    SET_PAYED_AND_FINISHED_STATUS: 'SET_PAYED_AND_FINISHED_STATUS'

};
