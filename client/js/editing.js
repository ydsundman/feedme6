Template.editShoppingList.events({
  'keypress input[name=add]': (e, t) => {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        var o = {name: input.value};
        List.insert(o);
        input.value = '';
      }
    }
  }
});

Template.editShoppingList.helpers({
  list() {
    return List.find({});
  }
});
