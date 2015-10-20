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

Template.settingsStore.helpers({
  items(storeId) {
    let sortInfo = {};
    sortInfo[storeId] = 1;
    return List.find({}, {sort: sortInfo});
  }
});

Template.settingsStore.events({
  'click a[name="store-name"]': (e,t) => {
    e.currentTarget.classList.toggle("active");
  },
  'click .confirm-delete-store': function (e, t) {
    Stores.remove({_id: t.data._id});
    List.find().forEach(function(list) {
      var unsetInfo = {};
      unsetInfo[t.data._id] = '';
      List.update({_id: list._id}, {$unset: unsetInfo});
    });

    e.preventDefault();
    e.stopPropagation();
  },
  'click .delete-store': function (e) {
    e.preventDefault();
    e.stopPropagation();
    $($(e.currentTarget).attr('data-modal')).openModal();
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
      Deps.nonreactive(() => {
        let setInfo = {};
        const parent = $(e.currentTarget.parentNode);
        const storeId = parent.attr('store-id');
        parent.children().each(function(index, item) {
          setInfo[storeId] = index;
          List.update({_id: $(item).attr('data-id')}, {$set: setInfo});
        })
      });
      item.classList.remove("active");
      item = undefined;
    } else {
      e.currentTarget.classList.add("active");
      item = e.currentTarget;
    }
  }
});
