Template.editShoppingList.events({
  'keypress input[name=add]': function(e, t) {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        console.log(input.value);
      }
    }
  }
});
