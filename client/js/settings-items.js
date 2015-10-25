Template.settingsItems.events({
  'keypress  #new-item': function(e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },
  'blur  #new-item': function(e, t) {
    var input = t.find('input[type=text]');
    if (input.value) {
      List.insert({name: input.value, owner: Meteor.userId()});
      input.value = '';
    }
  }
});

Template.settingsItems.helpers({
  list() {
    let sortInfo = {name:1};
    return List.find({}, {sort: sortInfo});
  }
});

Template.settingsItem.events({
  'click .confirm-delete-item': function (e, t) {
    List.remove({_id: t.data._id});
    e.preventDefault();
    e.stopPropagation();
  },
  'click .delete-item': function (e) {
    $($(e.currentTarget).attr('data-modal')).openModal()
  },
  'click input[name=edit-name-field]': function (e) {
    e.stopPropagation();
    e.preventDefault();
  },
  'click a[name=edit-name-btn]': function (e, t) {
    const span = e.currentTarget.parentNode.querySelector('span');
    const input = e.currentTarget.parentNode.querySelector('input');
    input.classList.remove('hide');
    span.classList.add('hide');
    input.value = t.data.name || '';
    input.focus();

    e.stopPropagation();
    e.preventDefault();
  },
  'keypress input[name=edit-name-field]': function(e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },
  'blur input[name=edit-name-field]': function(e, t) {
    const input = e.currentTarget;
    List.update({_id: t.data._id}, {$set: {name: input.value}});
    input.value = '';
    input.classList.add('hide');

    const span = e.currentTarget.parentNode.querySelector('span');
    span.classList.remove('hide');
  }
});

