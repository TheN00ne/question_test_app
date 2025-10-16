Ques test project - це проект для створення та проходження тестів.

Проект буде мати головну сторінку, сторінку створення/редагування тесту та стрінку певного тесту.

На головній сторінці будуть знаходитись всі тести та рядок пошуку, який буде шукати тест по його назві або описі.

На сторінці створення/редагування тесту можна буде вказати назву та опис тесту, його питання, відповіді на питання та бали на кожне питання.

На сторінці певного тесту можна подивитися повну інформацію про цей тест та питання, які він містить. Також можна пройти тест і після проходження можна подивитися кількість набраних балів.

Тест буде мати такі властивості:

- id
- title
- description
- imgURL
- questionArr
- totalMark
- isSetTimer
- timeout

Питання тесту можуть бути таких типів:

- iSimpleQues
- iMultipleQues
- iMatchQues
- iWrittenQues

Всі питання будуть мати такі властивості:

- id: number;
- question: string;
- imgURL: string | null;

iSimpleQues питання будуть мати такі унікальні властивості:

- optionsArr: iRegularOption[];
- correctOptionId: number;
- optionsCount: number;

де optionsArr - це масив варіантів відповідей, що мають тип iRegularOption:

Тип iRegularOption має такі властивості:

- id: number;
- answer: string;
- isCorrect: boolean;

iMultipleQues питання будуть мати такі унікальні властивості:

- optionsArr: iRegularOption[];
- correctOptionsId: number[];
- optionsCount: number;

де optionsArr - це масив варіантів відповідей, що мають тип iRegularOption

iMatchQues питання будуть мати такі унікальні властивості:

- optionsArr: iMatchOption[];
- answerArr: iMatchAnswer[];
- pairCount: number;

де optionsArr - це масив варіантів питань, що мають тип iMatchOption, а answerArr - це масив варіантів відповідей, що мають тип iMatchAnswer

Тип iMatchOption має такі властивості:

- id: number;
- question: string;

Тип iMatchAnswer має такі властивості:

- id: number;
- answer: string;

iWrittenQues питання будуть мати такі унікальні властивості:

- correctAnswer

Максимальна кількість варіантів відповідей у питаннях типу Simple - 8, у Multiple - 12, а у Match - 10

Редьюсер буде мати наступні дії:

- createTest
- updateTest
- deleteTest

У форми на сторінці створення/редагування тесту будуть такі поля: title, description та img. Також буде панель вибору типу питання (setCurrentQuestionType) та кнопка створення питання, при натисканні на яку, буде створюватися пусте питання обраного типу. Далі створеному пустому питанню в будь-який момент можна буде вказати його поля (question, img, answerArr, currectAnswersArr...). Також питання можна міняти місцями. Той порядок питань, який вказаний на сторінці буде зберігатися в масиві questionArr в тесті, а також на сторінці проходження тесту питання будуть відмальовуватися в такому ж порядку.

При створенні/редагуванні тесту кожна його властивість (title, description, questionArr...) буде зберігатися в окремому useState, а при збережені тесту буде спрацьовувати action createTest і всі дані будуть відправлятися в store.
