Template.shopShoppingList.helpers({
  list() {
    var query = {included: true};
    let sortInfo = {};
    let sortColumn = Session.get('storeId')? Session.get('storeId'):'name';
    sortInfo[sortColumn] = 1;
    return List.find(query, {sort: sortInfo});
  }
});

Template.shoppingNav.helpers({
  stores() {
    return Stores.find();
  },
  isActive(storeId) {
    return storeId == Session.get('storeId');
  },
  totalNumItems(){
    var query = {included: true};
    return List.find(query).fetch().length;
  },
  notYetCheckedOff(){
    var query = {included: true, $or: [{checked: {$exists: false}}, {checked: false}]};
    return List.find(query).fetch().length;
  },
  showCheckedItems(){
    return Session.get('shouldShowCheckedItems');
  },
  storeName(){
    return Session.get('storeName')? Session.get('storeName') : 'Select Store';
  }
});

Template.shoppingNav.events({
  'click a[name=store-name]' : function (e) {
    Session.set('storeId',$(e.currentTarget).attr('data-id'));
    Session.set('storeName', $(e.currentTarget).text());
  },
  'click input[name=show-hide]': function (e) {
    Session.set('shouldShowCheckedItems', e.toElement.checked );
  }
});

Template.shoppingNav.onRendered(()=>{
  $(".dropdown-button").dropdown();
});

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
