Template.shopShoppingList.helpers({
  list() {
    var query = {included: true};
    return List.find(query);
  },
  showCheckedItems(){
    return Session.get('shouldShowCheckedItems');
  },
  totalNumItems(){
    var query = {included: true};
    return List.find(query).fetch().length;
  },
  notYetCheckedOff(){
    var query = {included: true, $or: [{checked: {$exists: false}}, {checked: false}]};
    return List.find(query).fetch().length;
  }
});

Template.shopShoppingList.events({
    'click #hideShow': function (e) {
      Session.set('shouldShowCheckedItems', !Session.get('shouldShowCheckedItems'));
      e.preventDefault();
    }
  }
);

function toggleChecked(item) {
  List.update({_id: item._id}, {$set: {checked: item.checked ? false : true}});
}

Template.shopShoppingItem.helpers({
  checked() {
    return !!this.checked;
  },
  shouldShow() {
    return !this.checked || Session.get('shouldShowCheckedItems')
  },
  templateGestures: {
    'panend ul li': (e, t) => {
      const leftOrRight = e.direction === Hammer.DIRECTION_RIGHT || e.direction === Hammer.DIRECTION_LEFT;
      if (leftOrRight) {
        toggleChecked(t.data);
      }
      e.preventDefault();
    }
  },
  hammerInitOptions: {
  }
});

Template.shopShoppingItem.events({
  'click .name': function (e, t) {
    if (!touchSupported()) {
      toggleChecked(t.data);
    }
    e.preventDefault();
  }
});
