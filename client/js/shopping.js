Template.shopShoppingList.helpers({
  list() {
    return List.find({});
  }
});

Template.shopShoppingItem.helpers({
  checked() {
    return !!this.checked;
  }
});

Template.shopShoppingItem.events({
  'click .name': function (e, t) {
      List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
      e.preventDefault();
    }
  }
);
