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
