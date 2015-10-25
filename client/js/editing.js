Meteor.startup(function() {
  Session.set('justShowIncluded', false);
});

Template.editShoppingList.events({
  'keypress input[name=add]': (e, t) => {
    if (e.keyCode === 13) {
      var input = t.find('input[type=text]');
      if (input.value) {
        Materialize.toast('Couldn\'t find ' + input.value, 3000);
        input.value = '';
      }
    }
  },
  'click a[name="clear-all"]': (e) => {
    List.find().forEach(function(list) {
      List.update({_id: list._id}, {$set: {included: false, checked: false, extra: ''}});
    });
  },
  'click input[name="all-included"]': (e) => {
    Session.set('justShowIncluded', e.toElement.checked);
  }
});

Template.editShoppingList.rendered = function() {
  $('input[name=add]').autocomplete({
    autoFocus: true,
    source: function(request, response) {
      var data = (List.find({}, {sort: {name: 1}})).fetch().map(function(item) {
        return {label: item.name, _id: item._id};
      });
      var results = $.ui.autocomplete.filter(data, request.term);
      results = results.sort(function(a, b) {
        return a.label.toLowerCase().indexOf(request.term.toLowerCase()) - b.label.toLowerCase().indexOf(request.term.toLowerCase());
      });
      response(results);
    },
    select: function(event, ui) {
      event.preventDefault();
      List.update({_id: ui.item._id}, {$set: {included: true}});
      this.value = '';
      this.focus();
    }
  });

  var input = this.find('input[name=name]');
  if (input) {
    input.focus();
  }
  var inputExtra = this.find('input[name=extra]');
  if (inputExtra) {
    inputExtra.focus();
  }
};

Template.editShoppingList.helpers({
  list() {
    const justShowIncluded = Session.get("justShowIncluded");
    let sortInfo = {name:1};
    let query = justShowIncluded? {included: true}:{};
    return List.find(query, {sort: sortInfo});
  },
  justShowIncluded() {
    return Session.get("justShowIncluded");
  }
});

Template.editShoppingItem.events({
  'click .name': function (e, t) {
    List.update({_id: t.data._id}, {$set: {included: t.data.included ? false : true}});
    e.preventDefault();
  },

  'click input[name=extra]': function (e) {
    e.stopPropagation();
    e.preventDefault();
  },

  'click .edit-item': function (e, t) {
    const span = e.currentTarget.parentNode.querySelector('span');
    const input = e.currentTarget.parentNode.querySelector('input');
    input.classList.remove('hide');
    span.classList.add('hide');
    input.value = t.data.extra || '';
    input.focus();
    e.stopPropagation();
    e.preventDefault();
  },

  'keypress input[name=extra]': function(e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  'blur input[name=extra]': function(e, t) {
    List.update({_id: t.data._id}, {$set: {extra: e.currentTarget.value}});

    const span = e.currentTarget.parentNode.querySelector('span');
    const input = e.currentTarget.parentNode.querySelector('input');
    input.value = '';
    input.classList.add('hide');
    span.classList.remove('hide');
  }
});


