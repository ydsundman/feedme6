Template.shopShoppingList.helpers({
  list() {
    return List.find({});
  },
  showCheckedItems(){
    return Session.get('shouldShowCheckedItems');
  },
  totalNumItems(){
    return List.find({}).fetch().length;
  },
  notYetCheckedOff(){
    var query = {$or: [{checked: {$exists: false}}, {checked: false}]};
    return List.find(query).fetch().length;
  }
});

Template.shopShoppingList.events({
    'click a': function (e) {
      Session.set('shouldShowCheckedItems', !Session.get('shouldShowCheckedItems'));
      e.preventDefault();
    }
  }
);

Template.shopShoppingItem.helpers({
  checked() {
    return !!this.checked;
  },
  shouldShow() {
    return !this.checked || Session.get('shouldShowCheckedItems')
  },
  templateGestures: {
    'panend ul li': (e, t) => {
      const right = e.direction === Hammer.DIRECTION_RIGHT;
      if (right) {
        const item = t.data;
        List.update({_id: item._id}, {$set: {checked: item.checked ? false : true}});
      }
      e.preventDefault();
    }
  }
});

Template.shopShoppingItem.events({
  'click .name': function (e, t) {
    if (!touchSupported()) {
      List.update({_id: t.data._id}, {$set: {checked: t.data.checked ? false : true}});
      e.preventDefault();
    }
  }
});
