Template.nav.events({
  'click #shop': (e) => {
    Session.set('page', Pages.SHOPPING);
    e.preventDefault();
  },
  'click #edit': (e) => {
    Session.set('page', Pages.EDITING);
    e.preventDefault();
  }
});

Template.main.helpers({
  editing() {
    return Session.get('page') === Pages.EDITING;
  },
  shopping() {
    return Session.get('page') === Pages.SHOPPING;
  }
});
