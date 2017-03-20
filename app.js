var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

var state = {
  items: []
}

//Manage state//

function createItem (state, item) {
  state.items.push({
    item: item,
    purchased: false
  });
}

function retrieveItem (state, itemIndex){
  return state.items[itemIndex];
}

function updateItem(state, itemIndex, newItemState){
  state.items[itemIndex] = newItemState; //TODO: Refactor left side of assignment operation to use retrieveItem if possible.
}

function deleteItem(state, itemIndex){
  state.items.splice(itemIndex, 1);
}

//DOM MANIPULATION

function renderItem(item, itemId, itemTemplate, itemDataAttr) {
  var entry = $(listItemTemplate);
  entry.find('js-shopping-item').text(item.item);
  if (item.purchased) {
    entry.find('js-shopping-item').addClass('shopping-item__checked');
  }
  entry.find('js-shopping-item-toggle'); //
  entry.attr(itemDataAttr, itemId); //
  return entry;
}

function renderList(state, listElement, itemDataAttr) {
  var itemHTML = state.items.map((item, index) =>
    renderItem(item, index, listElement, itemDataAttr));
  listElement.html(itemHTML);
}