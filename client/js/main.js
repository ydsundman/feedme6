Pages = {
  SHOPPING: 'SHOPPING',
  EDITING: 'EDITING',
  SETTINGS: 'SETTINGS'
};

Template.nav.events({
  'click .shop': (e) => {
    Session.set('page', Pages.SHOPPING);
    e.preventDefault();
  },
  'click .edit': (e) => {
    Session.set('page', Pages.EDITING);
    e.preventDefault();
  },
  'click .settings': (e) => {
    Session.set('page', Pages.SETTINGS);
    e.preventDefault();
  }
});

Template.bodyTemplate.helpers({
  isLoggedIn() {
    return !!Meteor.userId();
  }
});

const mainAndNavHelpers = {
  editing() {
    return Session.get('page') === Pages.EDITING;
  },
  shopping() {
    return Session.get('page') === Pages.SHOPPING;
  },
  settings() {
    return Session.get('page') === Pages.SETTINGS;
  }
};

Template.main.helpers(mainAndNavHelpers);
Template.navContent.helpers(mainAndNavHelpers);
