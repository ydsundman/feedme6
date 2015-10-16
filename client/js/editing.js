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

Template.editShoppingItem.events({
  'click .name': function (e, t) {
    List.update({_id: t.data._id}, {$set: {included: t.data.included ? false : true}});
    e.preventDefault();
  }
});
