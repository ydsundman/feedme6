
Template.nav.events({
  'click .shop': (e) => {
    Session.set('page', "SHOPPING");
    e.preventDefault();
  },
  'click .edit': (e) => {
    Session.set('page', "EDITING");
    e.preventDefault();
  },
  'click .settings': (e) => {
    Session.set('page', "SETTINGS");
    e.preventDefault();
  }
});

Template.bodyTemplate.helpers({
  isLoggedIn() {
    return !!Meteor.userId();
  }
});

const mainAndNavHelpers = {
  pageIs(page) {
    return Session.get('page') === page;
  }
};

Template.main.helpers(mainAndNavHelpers);
Template.navContent.helpers(mainAndNavHelpers);

Template.nav.rendered = () => {
  $(".button-collapse").sideNav();
};
