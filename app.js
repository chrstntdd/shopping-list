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
    completed: false
  });
}

function retrieveItem (state, itemIndex){
  return state.items[itemIndex];
}

function updateItem(state, itemIndex, newItemState){
  state.items[itemIndex] = newItemState;
}

function deleteItem(state, itemIndex){
  state.items.splice(itemIndex, 1);
}