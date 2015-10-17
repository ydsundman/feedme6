Template.settingsShoppingList.events({
  'keypress #new-item': (e, t) => {
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

Template.settingsShoppingList.helpers({
  list() {
    return List.find({});
  }
});

Template.settingsShoppingItem.events({
  'click .confirm-delete-item': function (e, t) {
    List.remove({_id: t.data._id});
    e.preventDefault();
    e.stopPropagation();
  },
  'click .delete-item': function (e, t) {
    $($(e.currentTarget).attr('data-modal')).openModal()
  }
});
