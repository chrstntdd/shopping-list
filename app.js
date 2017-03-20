$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');

  var newItemId    = '#js-new-item';
  var removeButton = '.js-shopping-item-delete';
  var itemDataAttr = 'data-list-item-id';
  var toggleButton = '.js-shopping-item-toggle'

  handleItemAdds(formElement, newItemId, itemDataAttr, listElement, state);
  handleItemDeletes(formElement, removeButton, itemDataAttr, listElement, state);
  handleItemToggles(listElement, toggleButton, itemDataAttr, state);
});


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
  var entry = $(itemTemplate);
  entry.find('.js-shopping-item').text(item.item);
  if (item.purchased) {
    entry.find('.js-shopping-item').addClass('shopping-item__checked');
  }
  entry.find('.js-shopping-item-toggle'); //
  entry.attr(itemDataAttr, itemId); //
  return entry;
}

function renderList(state, listElement, itemDataAttr) {
  var itemsHTML = state.items.map((item, index) =>
    renderItem(item, index, listItemTemplate, itemDataAttr));
  listElement.html(itemsHTML);
}

//EVENT LISTENERS

function handleItemAdds(formElement, newItemId, itemDataAttr, listElement, state) {
  formElement.submit(function (e) {
    e.preventDefault();
    var newItem = formElement.find(newItemId).val();
    createItem(state, newItem);
    renderList(state, listElement, itemDataAttr);
    this.reset();
  });
}

function handleItemDeletes(formElement, removeButton, itemDataAttr, listElement, state) {
  listElement.on('click', removeButton, function (e) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
    deleteItem(state, itemIndex);
    renderList(state, listElement, itemDataAttr);
  });
}


function handleItemToggles(listElement, toggleButton, itemDataAttr, state) {
  listElement.on('click', toggleButton, function (e) {
    var itemId = $(this.closest('li')).attr(itemDataAttr);
    var oldItem = retrieveItem(state, itemId);

    updateItem(state, itemId, {
      item: oldItem.item,
      purchased: !oldItem.purchased
    });
    renderList(state, listElement, itemDataAttr)
  });
}