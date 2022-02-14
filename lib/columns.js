const columns = {
  id: 'ID',
  key: 'УНО',
  type: 'Тип',
  manufacturer: 'Производитель',
  model: 'Модель',
  serial: 'SN',
  inventory: 'Инв. номер',
  year: 'Год',
  place: 'Место',
};

exports.module = { columns, column: (key) => columns[key] };
