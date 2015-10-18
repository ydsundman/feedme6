Template.settingsShoppingList.events({
  'keypress #new-item': (e, t) => {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        List.insert({name: input.value, owner: Meteor.userId()});
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
  'click .delete-item': function (e) {
    $($(e.currentTarget).attr('data-modal')).openModal()
  }
});

Template.settings.rendered = () => {
  $(document).ready(function(){
    $('ul.tabs').tabs();
  });
};

Template.settingsStores.helpers({
  stores() {
    return Stores.find({});
  }
});

Template.settingsStores.events({
  'keypress #new-store': (e, t) => {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        Stores.insert({name: input.value, owner: Meteor.userId()});
        input.value = '';
      }
    }
  }
});
