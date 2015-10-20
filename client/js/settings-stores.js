Template.settingsStores.helpers({
  stores() {
    return Stores.find({});
  }
});

var setDefaultSortingForStore = function(storeId) {
  var index = 0, setInfo = {};
  List.find({}, {sort: {name:1}}).forEach(function(list) {
    setInfo[storeId] = index;
    List.update({_id: list._id}, {$set: setInfo});
    index += 1;
  });
};

Template.settingsStores.events({
  'keypress #new-store': (e, t) => {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        let storeId = Stores.insert({name: input.value, owner: Meteor.userId()});
        input.value = '';
        setDefaultSortingForStore(storeId);
      }
    }
  }
});

Template.settingsStore.events({
  'click a[name="store-name"]': (e,t) => {
    e.currentTarget.classList.toggle("active");
  }
});

Template.settingsStore.rendered = () => {
  $('.collapsible').collapsible({
    accordion : true
  });
};

let item;
Template.storeItems.events({
  'click a[name="store-item"]': (e,t) => {
    if (item) {
      e.currentTarget.parentNode.insertBefore(item, e.currentTarget);
      item.classList.remove("active");
      item = undefined;
    } else {
      e.currentTarget.classList.add("active");
      item = e.currentTarget;
    }
  }
});

Template.storeItems.helpers({
  items() {
    return [{name: "one"}, {name: "two"}, {name: "three"}];
  }
});
