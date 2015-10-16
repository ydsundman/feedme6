Template.shopShoppingList.helpers({
  list() {
    return List.find({});
  }
});

Template.shopShoppingList.events({
    'click a': function (e, t) {
      Session.set('shouldShowCheckedItems', !Session.get('shouldShowCheckedItems'));
      e.preventDefault();
    }
  }
);

Template.shopShoppingItem.helpers({
  checked() {
    return !!this.checked;
  },
  shouldShow(){
    return !this.checked || Session.get('shouldShowCheckedItems')
  }
});

Template.shopShoppingItem.events({
  'click .name': function (e, t) {
      List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
      e.preventDefault();
    }
  }
);
